#!/usr/bin/env node
// Checks the built site (out/, written by `npm run build`) against the copy
// rules. It reads what a visitor or a crawler can read in every out/**/*.html
// file (the text, and the alt, title, aria-label and meta content
// attributes) and flags: em or en dashes, certification claims, "student"
// outside the job title "Assistant Student SOC Analyst", betting words, any
// location but San Diego ("San Luis Obispo" only inside a school name), the
// surname in two words, any email but the contact one, the retired for-hire
// and lab words, and the retired claims. It also checks the home page's
// title, canonical link, Open Graph tags and indexability, and the source
// files for dash characters (comments included). Exit 1 on any finding.
// Run: npm run check (it also runs after npm run build).

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'out');
const SOURCE_DIRS = ['app', 'components', 'lib', 'scripts', 'docs'].map((d) => join(ROOT, d));

const EMAIL = 'contact@diferdinando.com';
const TITLE = 'DiFerdinando: Donato and Nicolo';
const CANONICAL = 'https://diferdinando.com';

const findings = [];
const flag = (file, msg, context = '') =>
  findings.push(`${relative(ROOT, file)}  ${msg}${context ? `  [${context}]` : ''}`);

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function decode(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, '&');
}

/** What a reader sees: text nodes and the readable attributes, decoded. */
function readable(html) {
  const bare = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, '');
  const attrs = [...bare.matchAll(/\s(?:alt|title|aria-label|content|placeholder)="([^"]*)"/gi)].map((m) => m[1]);
  const text = bare.replace(/<[^>]+>/g, ' ');
  // No-break spaces (in "SOC 2", "4 weeks") read as plain spaces.
  return decode([text, ...attrs].join('\n'))
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ');
}

const around = (text, index, length) =>
  text.slice(Math.max(0, index - 40), index + length + 40).replace(/\s+/g, ' ').trim();

// Allowed phrases are removed before the scan: the real job title and the
// two ways the school is named.
const ALLOWED = [
  /Assistant Student SOC Analyst/g,
  /Cal Poly San Luis Obispo/g,
  /California Polytechnic State University, San Luis Obispo/g,
];

const RULES = [
  [/[\u2013\u2014]/, 'em or en dash (use commas, colons, parentheses, "to")'],
  [/certifi/i, 'no certification claims'],
  [/security\s*\+/i, 'no certification claims'],
  [/comptia/i, 'no certification claims'],
  [/\bstudents?\b/i, '"student" only inside "Assistant Student SOC Analyst"'],
  [/\bbet(s|ting|tor|tors)?\b/i, 'no betting words'],
  [/\bwager/i, 'no betting words'],
  [/\bodds\b/i, 'no betting words'],
  [/\bmoney games?\b/i, 'no betting words'],
  [/\bsettl(e|es|ed|ing|ement)\b/i, 'no betting words ("settle")'],
  [/\bbankroll\b/i, 'no betting words'],
  [/\bkelly\b|\bp&l\b/i, 'no betting words'],
  [/los angeles/i, 'location is San Diego, CA only'],
  [/san luis obispo/i, '"San Luis Obispo" only inside a school name'],
  [/california, usa/i, 'location is San Diego, CA only'],
  [/Di Ferdinando/, 'one spelling, "DiFerdinando" (owner, 2026-11-07)'],
  [/cover story/i, 'retired interface words'],
  [/\bpractice\b/i, 'retired interface words (not for hire)'],
  [/\bclients?\b/i, 'retired interface words (not for hire)'],
  [/\bservices\b/i, 'retired interface words (not for hire)'],
  [/\bhire\b/i, 'retired interface words (not for hire)'],
  [/one inbox|write to both of us|working on something with data or ai/i, 'retired contact copy'],
  [/on his own|supporting depth|calibrated ml models/i, 'retired copy (owner, 2026-11-07)'],
  [/\b139\b/, 'retired BBLMLP feature count'],
  [/\bzapier\b|\bairflow\b/i, 'not in the stack (owner, 2026-11-07)'],
  [/finishing (up )?my 5th year|senior at cal poly/i, 'graduated June 2026'],
  [/run by one person|counted twice|\binvestments?\b/i, 'Zedi wording rule (zedi public-facts.yaml)'],
  [/zedi\.sneeks\.ai/i, 'use https://zedi.dev'],
  [/www\.nicolod\.org/i, 'no DNS: use https://nicolod.org'],
  [/proxmox cluster|\b12\+? ?-?services?\b/i, 'single-node homelab'],
  [/\bclosed\b[^\n]{0,40}soc ?2|soc ?2[^\n]{0,80}\bclosed\b/i, 'SOC 2: the audit finished, it was not "closed"'],
];

const LAB_REMNANTS = /data-lab-tag|lab-bar|href="\/lab\b/;

// --- The built pages ----------------------------------------------------------

const pages = walk(OUT).filter((f) => f.endsWith('.html'));
if (!existsSync(join(OUT, 'index.html'))) {
  flag(OUT, 'no out/index.html: run npm run build first');
}

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  if (/&mdash;|&ndash;|&#821[12];|&#x201[34];|[\u2013\u2014]/i.test(html)) {
    const i = html.search(/&mdash;|&ndash;|&#821[12];|&#x201[34];|[\u2013\u2014]/i);
    flag(file, 'em or en dash in the HTML source', around(html, i, 8));
  }
  if (LAB_REMNANTS.test(html)) flag(file, 'lab chrome left in the page');

  let text = readable(html);
  for (const re of ALLOWED) text = text.replace(re, ' ');
  for (const [re, msg] of RULES) {
    const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : `${re.flags}g`);
    for (const m of text.matchAll(g)) flag(file, msg, around(text, m.index, m[0].length));
  }
  for (const m of text.matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g)) {
    if (m[0].toLowerCase() !== EMAIL) flag(file, `only ${EMAIL} on this site`, m[0]);
  }
}

// --- The home page's head -------------------------------------------------------

const home = join(OUT, 'index.html');
if (existsSync(home)) {
  const html = readFileSync(home, 'utf8');
  const title = html.match(/<title>([^<]*)<\/title>/);
  if (!title || decode(title[1]) !== TITLE) flag(home, `title must be "${TITLE}"`, title ? title[1] : 'none');
  if (!new RegExp(`<link rel="canonical" href="${CANONICAL}/?"`).test(html)) {
    flag(home, `canonical link must be ${CANONICAL}`);
  }
  for (const prop of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type']) {
    if (!html.includes(`property="${prop}"`)) flag(home, `missing ${prop}`);
  }
  if (!/<meta name="description" content="[^"]+"/.test(html)) flag(home, 'missing meta description');
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) flag(home, 'production must be indexable');
  const h1 = (html.match(/<h1\b/g) || []).length;
  if (h1 !== 1) flag(home, `exactly one h1 (found ${h1})`);
  if (!html.includes(`mailto:${EMAIL}`)) flag(home, `no mailto:${EMAIL} link`);
}

// --- Source files: no dash characters, comments included -------------------------

const sources = SOURCE_DIRS.flatMap(walk).filter((f) => /\.(tsx?|css|mjs|md|json)$/.test(f));
for (const file of sources) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (/[\u2013\u2014]/.test(line)) flag(file, `line ${i + 1}: em or en dash`);
    });
}

if (findings.length) {
  console.error(`check-site: ${findings.length} finding(s)\n` + findings.join('\n'));
  process.exit(1);
}
console.log(`check-site: ${pages.length} page(s) and ${sources.length} source files clean`);
