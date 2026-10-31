#!/usr/bin/env node
// Checks the redesign lab's rules (app/lab/_kit/README.md) on every lab file:
// no em or en dashes, no banned claims, facts and links only from the kit,
// one meta.ts per variant matching its directory. Exit 1 on any finding.
// Run: node scripts/check-lab.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const LAB = join(ROOT, 'app', 'lab');
const DOCS = join(ROOT, 'docs', 'lab');
const COUNT = 6;

const findings = [];
const flag = (file, line, msg) => findings.push(`${relative(ROOT, file)}:${line}  ${msg}`);

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

// Every lab file and the lab docs.
const DASHES = /\u2014|\u2013|&mdash;|&ndash;|\\u2014|\\u2013|&#821[12];/;

// Every lab code file (the docs state these rules, so they are not scanned).
const CLAIMS = [
  [/splunk[^\n]{0,40}certif/i, 'certification claim'],
  [/security\+/i, 'certification claim'],
  [/comptia/i, 'certification claim'],
  [/finishing (up )?my 5th year/i, 'stale: graduated June 2026'],
  [/zedi\.sneeks\.ai/i, 'use https://zedi.dev'],
  [/www\.nicolod\.org/i, 'no DNS: use https://nicolod.org'],
  [/proxmox cluster/i, 'single node'],
  [/\b12\+? ?-?services?\b/i, 'stale homelab count'],
  [/soc ?2[^\n]{0,80}\bclosed\b/i, 'SOC 2 phrasing: "audit done in 4 weeks against a projected 10"'],
  [/\bbet(s|ting)?\b|\bwager/i, 'no betting language'],
  [/california, usa|los angeles/i, 'location is San Diego, CA only'],
];

// Variant directories only (app/lab/<n>/): facts come from the kit.
const VARIANT_ONLY = [
  [/https?:\/\//, 'external URL literal: links come from ../_kit (content.ts)'],
  [/mailto:/, 'mailto literal: use site.emailHref'],
  [/@diferdinando\.com|@gmail\.com/i, 'email literal: use site.email'],
  [/~1B\b|\b1B rows|600\+|300\+|900\+|50\+|200\+|\b139\b|180,000/, 'fact number literal: use the kit'],
  [/certif/i, 'no certifications on this site'],
  [/\bstudent\b/i, 'Nicolo graduated June 2026'],
  [/@import\s+url|fonts\.googleapis|fonts\.gstatic/i, 'fonts through next/font only'],
  [/\binfinite\b|animate-(spin|ping|pulse|bounce)/, 'no endless animation'],
  [/\b100vw\b|w-screen/, 'no 100vw (horizontal scroll)'],
  [/from ['"]\.\.\/\d+\//, 'never import from another variant'],
  [/from ['"]@\/(components|lib\/data)/, 'never import the old site; use ../_kit'],
];

const files = [...walk(LAB), ...walk(DOCS)].filter((f) => /\.(tsx?|css|md|mjs|json)$/.test(f));
for (const file of files) {
  const rel = relative(LAB, file);
  const inVariant = /^\d+\//.test(rel.split(sep).join('/'));
  const isCode = /\.(tsx?|css)$/.test(file);
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((text, i) => {
    if (DASHES.test(text)) flag(file, i + 1, 'em or en dash (use commas, colons, parentheses, "to")');
    if (isCode) for (const [re, msg] of CLAIMS) if (re.test(text)) flag(file, i + 1, msg);
    if (inVariant) for (const [re, msg] of VARIANT_ONLY) if (re.test(text)) flag(file, i + 1, msg);
  });
}

// One meta.ts and page.tsx per variant, n matching the directory, and the
// registry listing 1 to COUNT.
for (let n = 1; n <= COUNT; n++) {
  const dir = join(LAB, String(n));
  for (const name of ['meta.ts', 'page.tsx']) {
    if (!existsSync(join(dir, name))) flag(dir, 0, `missing ${name}`);
  }
  const meta = join(dir, 'meta.ts');
  if (existsSync(meta) && !new RegExp(`\\bn:\\s*${n}\\b`).test(readFileSync(meta, 'utf8'))) {
    flag(meta, 0, `meta.n must be ${n}`);
  }
  const page = join(dir, 'page.tsx');
  if (existsSync(page) && !/labPageMetadata\(meta\)/.test(readFileSync(page, 'utf8'))) {
    flag(page, 0, 'keep export const metadata = labPageMetadata(meta)');
  }
}
const extra = readdirSync(LAB).filter((d) => /^\d+$/.test(d) && (Number(d) < 1 || Number(d) > COUNT));
for (const d of extra) flag(join(LAB, d), 0, `only variants 1 to ${COUNT}`);
const registry = readFileSync(join(LAB, 'registry.ts'), 'utf8');
for (let n = 1; n <= COUNT; n++) {
  if (!registry.includes(`./${n}/meta`)) flag(join(LAB, 'registry.ts'), 0, `registry misses variant ${n}`);
}

if (findings.length) {
  console.error(`check-lab: ${findings.length} finding(s)\n` + findings.join('\n'));
  process.exit(1);
}
console.log(`check-lab: ${files.length} files clean`);
