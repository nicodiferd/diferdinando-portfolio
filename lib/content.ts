import type { StaticImageData } from 'next/image';
import donatoPhoto from '@/lib/Donato.jpeg';
import nicoloPhoto from '@/lib/Nicolo.jpeg';

// Every fact the site shows comes from this file, never from a literal in a
// component. Each block names its source. Sources:
// - Donato and Wedge Golf: https://donatodiferdinando.dev and
//   https://www.wedge-golf.dev, re-fetched 2026-11-07. Donato approves this
//   copy before production.
// - Nicolo: resume-tex data/profile.yaml (branch feat/profile-yaml-pipeline)
//   and the owner rulings of 2026-11-07 (round 3). No certification claims.
// - Zedi: https://zedi.dev, fetched 2026-11-07, and zedi
//   docs/public-facts.yaml (branch chore/context-diet-2026-10-15).
// - BBLMLP: bblmlp docs/public-facts.yaml (branch chore/ml-first-framing).
// - Owner decisions 2026-10-30 and 2026-11-07: San Diego only;
//   contact@diferdinando.com; not for hire; Metric Layer is Donato's (Nicolo
//   collaborates); Wedge Golf is Donato's (Nicolo contributes); the
//   PeopleConnect semantic layer service is both brothers' work, credit not
//   split, and it is the only thing styled as shared.

export type BrotherKey = 'donato' | 'nicolo';
export type Credit = BrotherKey | 'both';

export type Link = { label: string; href: string };
export type Stat = { value: string; label: string; note?: string };

// --- The site ---------------------------------------------------------------

export const site = {
  name: 'DiFerdinando',
  domain: 'diferdinando.com',
  url: 'https://diferdinando.com',
  /** The tab title. */
  title: 'DiFerdinando: Donato and Nicolo',
  location: 'San Diego, CA',
  email: 'contact@diferdinando.com',
  emailHref: 'mailto:contact@diferdinando.com',
  /**
   * The hero line. Owner, 2026-11-07. The no-break space keeps "and AI"
   * together, so the line never ends on a dangling "and".
   */
  headline: 'Data platforms, security and\u00a0AI, built by two brothers.',
  /** Under the headline: parallel, no hierarchy. Owner, 2026-11-07. */
  lede:
    "Donato builds data platforms and analytics: Snowflake and dbt warehouses, semantic layers, forecasting and BI. Nicolo works across security, data and AI: security automation, machine learning and AI tooling. Together they built PeopleConnect's semantic layer service.",
  /** Search and link previews: the lede's own words, under 155 characters. */
  description:
    "Donato builds data platforms and analytics. Nicolo works across security, data and AI. Together they built PeopleConnect's semantic layer service.",
  /** A shorter tagline for tight spots (the footer). */
  tagline: 'Two brothers in San Diego. Data, security and AI.',
  /** The contact band. Not for hire (owner, 2026-11-07). */
  contactHeadline: 'Say hello',
  contactLine: 'Write to us at contact@diferdinando.com.',
  year: '2026',
} as const;

// --- The brothers -----------------------------------------------------------

export type TimelineKind = 'work' | 'education' | 'milestone';

export type TimelineEntry = {
  who: BrotherKey;
  /** Sortable start, YYYY-MM. */
  start: string;
  /** Display range: Jan, Feb, Mar ... Dec, "to", "to now". No dashes. */
  when: string;
  title: string;
  org: string;
  kind: TimelineKind;
  note?: string;
  /** Present role. */
  current?: boolean;
};

export type Brother = {
  key: BrotherKey;
  first: string;
  /** Full name. */
  name: string;
  /** Initial for marks and monograms. */
  initial: string;
  title: string;
  /** The current role, in one line. */
  now: string;
  nowOrg: string;
  nowSince: string;
  /** One sentence for small cards. */
  short: string;
  /** Two short paragraphs for the brothers section. */
  bio: readonly string[];
  /** What he works on, a few words each, in his order. */
  focus: readonly string[];
  stats: readonly Stat[];
  education: readonly { degree: string; school: string; when: string }[];
  links: readonly Link[];
  photo: StaticImageData;
  photoAlt: string;
};

export const donato: Brother = {
  key: 'donato',
  first: 'Donato',
  // Owner ruling 2026-11-07: "DiFerdinando for both". Donato's own site
  // writes "Di Ferdinando"; Donato confirms the spelling in his review.
  name: 'Donato DiFerdinando',
  initial: 'D',
  title: 'Data engineer and BI lead',
  now: 'Business Intelligence Lead',
  nowOrg: 'PeopleConnect',
  nowSince: 'Mar 2026',
  short:
    'Data engineer and BI lead. He builds the platforms a company runs its numbers on, and he built Wedge Golf.',
  bio: [
    "Donato has worked in data since 2020, at a shipyard, a biotech and now PeopleConnect, where he leads Business Intelligence. He designed and built the company's data platform on Snowflake and dbt, about 1B rows a day, and owns the BI roadmap and the dbt, data modeling and SQL standards.",
    'He works best between business and technology: figuring out what a team is trying to do, then building something people actually use. He also designed and built Wedge Golf, an iPhone golf app, free to download, from the native app to the backend and website.',
  ],
  focus: ['Data platforms', 'Semantic layers', 'Forecasting', 'BI', 'iOS apps'],
  // Each number says where and when (owner, 2026-11-07). Dates from
  // donatodiferdinando.dev: in data since Jul 2020, PeopleConnect since 2024.
  stats: [
    { value: '6+', label: 'years in data', note: 'Since 2020: shipyard, biotech, PeopleConnect' },
    { value: '~1B', label: 'rows a day', note: 'PeopleConnect platform, 2024 to now' },
    { value: '600+', label: 'governed metrics', note: 'PeopleConnect semantic layer, shared with Nicolo' },
    { value: '300+', label: 'dbt models', note: 'PeopleConnect platform, 900+ tests' },
  ],
  // His site: "I earned my B.S. in Industrial Engineering in June 2020"; the
  // MBA gives only the year.
  education: [
    { degree: 'MBA', school: 'National University', when: '2023' },
    { degree: 'B.S. Industrial Engineering', school: 'Cal Poly San Luis Obispo', when: 'Jun 2020' },
  ],
  links: [
    { label: 'donatodiferdinando.dev', href: 'https://donatodiferdinando.dev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/donato-diferdinando' },
    { label: 'GitHub', href: 'https://github.com/fddiferd' },
  ],
  photo: donatoPhoto,
  photoAlt: 'Donato DiFerdinando',
};

// Positioning (owner, 2026-11-07, the order chosen on 2026-10-30): security,
// then data and ML, then AI.
export const nicolo: Brother = {
  key: 'nicolo',
  first: 'Nicolo',
  name: 'Nicolo DiFerdinando',
  initial: 'N',
  title: 'Security, data and AI engineer',
  now: 'AI-Driven Solutions Analyst',
  nowOrg: 'PeopleConnect',
  nowSince: 'Aug 2026',
  short:
    'Security, data and AI engineer. He builds automation end to end and measures it with numbers.',
  // \u00a0 is a no-break space: "SOC 2" and "4 weeks" never split across
  // lines.
  bio: [
    'Nicolo started in security: SOC work at Cal Poly ITS and security internships at loanDepot and PeopleConnect, where the team finished a SOC\u00a02 audit in 4\u00a0weeks against a projected 10 by automating the compliance evidence with scripts that pulled it from each system, kept in GitHub. That led into data and machine learning: dashboards and dbt pipelines at PeopleConnect, and BBLMLP, a baseball model scored for calibration.',
    'Today he is an AI-Driven Solutions Analyst at PeopleConnect, building LLM-powered tools. He built Zedi, a personal finance web app at zedi.dev, and runs a homelab. Cal Poly Industrial Engineering graduate (June 2026).',
  ],
  focus: ['Security automation', 'Data pipelines', 'Machine learning', 'AI automation', 'Full-stack software'],
  stats: [
    { value: '600+', label: 'governed metrics', note: 'PeopleConnect semantic layer, shared with Donato' },
    { value: '4\u00a0weeks', label: 'SOC\u00a02 audit, compliance evidence automated', note: 'Against a projected 10, PeopleConnect 2025' },
    // profile.yaml, Business Intelligence Intern, Dashboard Development bullet.
    { value: '50+', label: 'stakeholders on his dashboards', note: 'PeopleConnect BI, 2025 to 2026' },
    { value: '200+', label: 'endpoints scanned', note: 'PeopleConnect, 2025' },
  ],
  education: [
    // The short school name, as in Donato's column and the timeline.
    { degree: 'B.S. Industrial Engineering', school: 'Cal Poly San Luis Obispo', when: 'Jun 2026' },
  ],
  links: [
    { label: 'nicolod.org', href: 'https://nicolod.org' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicolo-diferdinando/' },
    { label: 'GitHub', href: 'https://github.com/nicodiferd' },
  ],
  photo: nicoloPhoto,
  photoAlt: 'Nicolo DiFerdinando',
};

export const brothers: readonly Brother[] = [donato, nicolo];

/** Who gets the credit, in words. */
export const creditLabel: Record<Credit, string> = {
  donato: 'Donato',
  nicolo: 'Nicolo',
  both: 'Donato and Nicolo',
};

// --- Headline numbers --------------------------------------------------------

export const headlineStats: readonly (Stat & { who: Credit })[] = [
  { value: '~1B', label: 'rows a day', note: 'PeopleConnect data platform, 2024 to now', who: 'donato' },
  { value: 'Sep 2026', label: 'Wedge Golf on the App Store', note: 'Free to download on iPhone', who: 'donato' },
  { value: '600+', label: 'governed metrics', note: 'PeopleConnect semantic layer', who: 'both' },
  // The note says what his part was: the team finished the audit, he wrote
  // the evidence scripts (profile.yaml, Cybersecurity & IT Intern).
  { value: '4\u00a0weeks', label: 'SOC\u00a02 audit, against a projected 10', note: 'He automated the compliance evidence, PeopleConnect 2025', who: 'nicolo' },
  // zedi docs/product-state-2026-10-12.md, "Update 2026-10-14": production
  // serves zedi.dev; zedi.dev answered on 2026-11-07.
  { value: 'Oct 2026', label: 'Zedi live at zedi.dev', note: 'Free to start, on the web', who: 'nicolo' },
];

// --- What we work on ---------------------------------------------------------

/**
 * An area is one brother's, both brothers' (the semantic layer only), or
 * "each": two solo projects, one per brother, shown as two separate marks
 * and never in the shared style.
 */
export type Area = {
  id: string;
  title: string;
  line: string;
} & (
  | { who: Credit; proof: string }
  | { who: 'each'; proof: Readonly<Record<BrotherKey, string>> }
);

export const areas: readonly Area[] = [
  {
    id: 'data-platforms',
    title: 'Data platforms',
    line: 'Snowflake and dbt warehouses with ingestion, tests, CI/CD and freshness checks.',
    who: 'donato',
    proof: 'The PeopleConnect platform, about 1B rows a day',
  },
  {
    id: 'semantic-ai',
    title: 'Semantic layers and AI assistants',
    line: 'One definition per metric, served to AI over MCP and Slack so every answer matches.',
    who: 'both',
    proof: '600+ governed metrics at PeopleConnect',
  },
  {
    id: 'software',
    title: 'Software and apps',
    // What was built, not an offering: the site is not for hire.
    line: 'Two shipped apps: an iPhone golf app and a personal finance web app.',
    who: 'each',
    proof: { donato: 'Wedge Golf', nicolo: 'Zedi' },
  },
  {
    id: 'ml',
    title: 'Machine learning and forecasting',
    line: 'Lifetime value, retention and revenue forecasts; models scored for calibration with leakage tests.',
    who: 'each',
    proof: { donato: 'LTV forecasting', nicolo: 'BBLMLP' },
  },
  {
    id: 'automation',
    title: 'AI automation',
    line: 'LLM tools and agents built for teams at PeopleConnect.',
    who: 'each',
    proof: { donato: '12 AI agents', nicolo: 'AI spend tracking and data checks at PeopleConnect' },
  },
  {
    id: 'security',
    title: 'Security and infrastructure',
    line: 'Security automation, compliance evidence and self-hosted infrastructure.',
    who: 'nicolo',
    // Owner wording, 2026-11-07.
    proof: 'SOC\u00a02 audit in 4\u00a0weeks against a projected 10, with the compliance evidence automated',
  },
];

// --- Work -------------------------------------------------------------------

export type Project = {
  id: string;
  title: string;
  /** What kind of thing it is, two or three words. */
  kind: string;
  org?: string;
  credit: Credit;
  /** Credit in words, as the owner set it. */
  creditLine: string;
  /** One sentence. */
  summary: string;
  /** A status line shown under the title. */
  status?: string;
  /** Two or three sentences. */
  body: string;
  /** One more line after the body (who built it, the price). */
  detail?: string;
  metric?: Stat;
  /** Tools only; a card with no tools listed shows no "Built with" row. */
  stack?: readonly string[];
  links?: readonly Link[];
  /** The top cards (three per brother and the shared one); the rest are secondary. */
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    id: 'semantic-layer',
    title: 'Semantic layer and AI assistant',
    kind: 'Data and AI',
    org: 'PeopleConnect',
    credit: 'both',
    creditLine: 'Built by Donato and Nicolo',
    summary:
      'Everyone from execs to marketing gets the same numbers when they ask AI about the business.',
    body:
      'A dbt MetricFlow semantic layer with one shared definition for each of 600+ governed metrics, and the service that serves it to AI: MCP connectors for Claude and ChatGPT, and a Slack bot.',
    metric: { value: '600+', label: 'governed metrics' },
    stack: ['dbt MetricFlow', 'Snowflake', 'MCP', 'Slack', 'Claude', 'ChatGPT'],
    featured: true,
  },
  // Donato's three featured cards, in the order they pair with Nicolo's.
  {
    id: 'data-platform',
    title: 'Snowflake + dbt data platform',
    kind: 'Data platform',
    org: 'PeopleConnect',
    credit: 'donato',
    creditLine: 'Donato',
    summary: "The platform behind the company's reports, forecasts and AI answers.",
    body:
      'Designed and built on Snowflake and dbt, orchestrated in dbt Cloud: 300+ dbt models, a custom Python ingestion layer for sources Fivetran does not cover, CI/CD from staging to prod, 900+ dbt tests, freshness SLAs on core tables and a daily AI job that checks the metrics for problems.',
    metric: { value: '~1B', label: 'rows a day' },
    stack: ['Snowflake', 'dbt', 'dbt Cloud', 'Python', 'Fivetran', 'GitHub CI/CD'],
    featured: true,
  },
  {
    id: 'wedge',
    title: 'Wedge Golf',
    kind: 'iPhone app',
    credit: 'donato',
    creditLine: 'Donato, with contributions from Nicolo',
    summary: 'An iPhone app for playing golf with your friends, free to download.',
    body:
      'Live scoring, GPS shot tracking with no clip-on sensors, match play and Nassau scoring, multi-day tournaments, a feed of your friends’ rounds, and rounds that post straight to GHIN for an official handicap.',
    // No "designed and built by Donato" line here: it would contradict the
    // credit band, and his bio already says it.
    metric: { value: 'Sep 2026', label: 'launched on the App Store' },
    stack: ['SwiftUI', 'FastAPI', 'Google Cloud Run', 'Postgres on Cloud SQL', 'Next.js', 'Terraform'],
    links: [
      { label: 'wedge-golf.dev', href: 'https://www.wedge-golf.dev' },
      { label: 'App Store', href: 'https://apps.apple.com/us/app/wedge-golf/id6761741539' },
    ],
    featured: true,
  },
  // Owner, 2026-11-07: "keep with his wording". No public page describes
  // Metric Layer yet (metric-layer.ai shows only a sign-in), so Donato words
  // this card in his review; until his words are in, it does not go to
  // production. No stack: none is public.
  {
    id: 'metric-layer',
    title: 'Metric Layer',
    kind: 'Metrics product',
    credit: 'donato',
    creditLine: 'Donato, with Nicolo collaborating',
    summary: "Donato's product for governed metrics on top of a semantic layer.",
    body: 'Donato leads it; Nicolo collaborates.',
    links: [{ label: 'metric-layer.ai (sign-in)', href: 'https://metric-layer.ai' }],
    featured: true,
  },
  // Nicolo's three featured cards, in the order they pair with Donato's:
  // data platform with BBLMLP (pipelines), Wedge Golf with Zedi (apps),
  // Metric Layer with AI automation.
  // bblmlp public-facts.yaml: a stacked LightGBM; 6,751 grid-unseen games
  // (2024 to 2026), the LightGBM and the tuned Elo both at Brier 0.24554.
  // Status line: owner, 2026-10-30 (nico-hub decisions, N4).
  {
    id: 'bblmlp',
    title: 'BBLMLP',
    kind: 'Baseball ML prediction',
    credit: 'nicolo',
    creditLine: 'Nicolo',
    summary: 'A baseball win-probability pipeline that is honest about what it finds.',
    status: 'Research project · model not shipped · off-season since mid-September 2026',
    body:
      'Statcast ingest into DuckDB, point-in-time features with leakage tests, walk-forward backtests and Brier and reliability checks. The finding: a stacked LightGBM ties a tuned Elo baseline on Brier score across 6,751 held-out games (2024 to 2026).',
    metric: { value: '6,751', label: 'held-out games (2024 to 2026), LightGBM ties a tuned Elo' },
    stack: ['Python', 'DuckDB', 'LightGBM', 'Statcast'],
    featured: true,
  },
  // From zedi.dev (pricing re-read 2026-11-15: Pro $5 a month or $48 a year,
  // bank sync through Plaid included in Pro, no second bill). Rules (zedi
  // public-facts.yaml): never Investments; never "run by one person"; never
  // "nothing counted twice". zedi.dev: "450+ default
  // merchant and keyword rules", "your fixes can become rules".
  {
    id: 'zedi',
    title: 'Zedi',
    kind: 'Personal finance web app',
    credit: 'nicolo',
    creditLine: 'Nicolo',
    summary: 'A personal finance web app that puts your checking, cards, Venmo and receipts in one place.',
    body:
      'Upload the statements your bank already gives you, or turn on read-only bank sync through Plaid on Pro, and Zedi sorts your transactions with 450+ built-in rules plus the fixes you make, and reads receipts line by line. A People tab keeps a running balance with everyone you split costs with, and Analytics shows income, spending and your savings rate for any dates.',
    detail:
      'Free to start; Pro is $5 a month or $48 a year and includes bank sync and unlimited receipt scans, with a 30-day free trial.',
    metric: { value: 'Oct 2026', label: 'live at zedi.dev' },
    stack: ['Rust / Axum', 'Next.js', 'TypeScript', 'PostgreSQL', 'Claude Vision', 'Stripe'],
    links: [{ label: 'zedi.dev', href: 'https://zedi.dev' }],
    featured: true,
  },
  // profile.yaml, AI-Driven Solutions Analyst (since Aug 2026); stack per
  // owner ruling 2026-11-07.
  {
    id: 'ai-automation',
    title: 'Data problems, found and fixed',
    kind: 'AI and analytics',
    org: 'PeopleConnect',
    credit: 'nicolo',
    creditLine: 'Nicolo',
    // Owner's own bullets for this role, 2026-11-15 (bullets 2 and 3; bullet 1,
    // the AI assistants, overlaps the shared semantic layer card).
    summary: 'His current role at PeopleConnect, since Aug 2026: finding and fixing problems hiding in the data.',
    body:
      'With Marketing, Finance and Customer Care, he detected card-testing bot attacks and recommended the fix that blocked every bot card attempt the following day, and caught a data feed silently losing ~97% of its records. He also built a Snowflake cost optimization plan, set up AI spend tracking by person and model, and co-teaches company-wide AI training.',
    stack: ['Claude', 'MCP', 'Snowflake', 'dbt', 'Google Cloud', 'Sigma'],
    featured: true,
  },
  // More work. Donato's: donatodiferdinando.dev, Projects.
  {
    id: 'forecasting',
    title: 'Forecasting and lifetime value',
    kind: 'Machine learning',
    org: 'PeopleConnect',
    credit: 'donato',
    creditLine: 'Donato',
    summary: 'Forecasts used by marketing, FP&A and the exec team.',
    body:
      'Cohort-based models that predict customer lifetime value, retention and revenue, built with XGBoost, Prophet and Snowpark, plus a value-based bidding model for Google Ads.',
    stack: ['XGBoost', 'Prophet', 'Snowpark', 'Snowflake', 'Google Ads'],
  },
  {
    id: 'revenue-data',
    title: 'Revenue and payments data',
    kind: 'Data engineering',
    org: 'PeopleConnect',
    credit: 'donato',
    creditLine: 'Donato',
    summary: 'The data Accounting uses to reconcile revenue.',
    body:
      "He leads the data engineering behind subscription revenue, connecting orders and subscriptions with the payment processors. Accounting reconciles revenue on his data, tied out to the processors' statements, and he built the deferred revenue model.",
    stack: ['Snowflake', 'dbt'],
  },
  {
    id: 'agents',
    title: '12 AI agents',
    kind: 'AI agents',
    org: 'PeopleConnect',
    credit: 'donato',
    creditLine: 'Donato',
    summary: 'Agents that each cover a different job function and work alongside the team.',
    body: 'Built on Claude Managed Agents, running on Google Cloud Run and hooked into Asana.',
    stack: ['Claude Managed Agents', 'Google Cloud Run', 'Asana'],
  },
  // profile.yaml, Cybersecurity & IT Intern ("200+ endpoints") and Assistant
  // Student SOC Analyst ("50+ weekly security incidents"); the compliance
  // evidence wording and the stack are the owner's (2026-11-07). No metric:
  // the summary already carries the SOC 2 number.
  {
    id: 'security',
    title: 'Security automation',
    kind: 'Security',
    org: 'PeopleConnect and Cal Poly ITS',
    credit: 'nicolo',
    creditLine: 'Nicolo',
    summary: 'Automated the SOC\u00a02 compliance evidence; the audit finished in 4\u00a0weeks against a projected 10.',
    body:
      'At PeopleConnect: scripts that pulled compliance evidence from each system, kept in GitHub, and vulnerability scanning across 200+ endpoints. Before that, at the Cal Poly ITS SOC: a Python Slack app wiring Splunk SOAR playbooks into incident response, and triage of 50+ security incidents a week.',
    stack: ['Bash', 'Python', 'GitHub', 'CrowdStrike', 'Splunk SOAR', 'Slack Bolt'],
  },
  {
    id: 'homelab',
    title: 'HomeLab',
    kind: 'Infrastructure',
    credit: 'nicolo',
    creditLine: 'Nicolo',
    summary: 'A single-node lab with configs and runbooks in git.',
    body:
      'Proxmox running Tailscale, n8n automation, Telegraf into ClickHouse, Proxmox Backup Server, llama.cpp OCR on a GPU container and a self-hosted Zedi.',
    stack: ['Proxmox', 'Tailscale', 'n8n', 'ClickHouse', 'llama.cpp'],
  },
  // Owner, 2026-10-30 (P5) and 2026-11-07: Best in Lab; under NDA. No stack:
  // the work is research, not tools.
  {
    id: 'flora',
    title: 'Flora',
    kind: 'HCI research',
    org: 'Cal Poly capstone with Bloomfilter',
    credit: 'nicolo',
    creditLine: 'Nicolo, with a Cal Poly team',
    summary: 'HCI design for AI agents inside project management tools.',
    body:
      'A year-long group project with Bloomfilter on how AI agents fit into project management software, aimed at user adoption in enterprise tools. Won Best in Lab. The work is under NDA, so only the overview is public.',
  },
];

export const featuredProjects: readonly Project[] = projects.filter((p) => p.featured);
export const otherProjects: readonly Project[] = projects.filter((p) => !p.featured);

// --- Timeline ---------------------------------------------------------------

// Donato's rows: donatodiferdinando.dev timeline. Nicolo's: profile.yaml.
// One month style: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov,
// Dec; "to now" for a present role.
export const timeline: readonly TimelineEntry[] = [
  { who: 'donato', start: '2016-09', when: '2016 to Jun 2020', title: 'B.S. Industrial Engineering', org: 'Cal Poly San Luis Obispo', kind: 'education' },
  { who: 'donato', start: '2018-06', when: 'Summer 2018', title: 'Industrial Real Estate Intern', org: 'Savills', kind: 'work' },
  { who: 'donato', start: '2019-06', when: 'Summer 2019', title: 'Operations Intern', org: 'Callaway Golf', kind: 'work' },
  { who: 'donato', start: '2020-07', when: 'Jul 2020 to Jul 2021', title: 'Professional Development Program', org: 'General Dynamics NASSCO', kind: 'work', note: 'A year rotating through every department at the shipyard.' },
  { who: 'donato', start: '2021-07', when: 'Jul 2021 to Jul 2023', title: 'Data Engineer', org: 'General Dynamics NASSCO', kind: 'work', note: 'Started and ran the BI Center of Excellence.' },
  { who: 'nicolo', start: '2021-09', when: 'Sep 2021 to Jun 2026', title: 'B.S. Industrial Engineering', org: 'Cal Poly San Luis Obispo', kind: 'education' },
  { who: 'donato', start: '2021-09', when: 'Sep 2021 to 2023', title: 'MBA', org: 'National University', kind: 'education', note: 'Earned while working full time.' },
  { who: 'nicolo', start: '2022-06', when: 'Summer 2022', title: 'Cybersecurity Intern', org: 'loanDepot', kind: 'work' },
  { who: 'donato', start: '2023-07', when: 'Jul 2023 to Feb 2024', title: 'Senior Business Intelligence Analyst', org: 'Maravai LifeSciences', kind: 'work' },
  { who: 'donato', start: '2024-01', when: 'Jan 2024', title: 'Started building Wedge Golf', org: 'Wedge Golf', kind: 'milestone' },
  { who: 'nicolo', start: '2024-04', when: 'Apr 2024 to Jun 2025', title: 'Assistant Student SOC Analyst', org: 'Cal Poly ITS', kind: 'work', note: '50+ security incidents a week.' },
  { who: 'donato', start: '2024-05', when: 'May 2024 to Mar 2026', title: 'Principal Business Intelligence Analyst', org: 'PeopleConnect', kind: 'work', note: 'Built the semantic layer service together.' },
  { who: 'nicolo', start: '2025-06', when: 'Jun 2025 to Sep 2025', title: 'Cybersecurity & IT Intern', org: 'PeopleConnect', kind: 'work', note: 'Automated the SOC\u00a02 compliance evidence; the audit finished in 4\u00a0weeks against a projected 10.' },
  { who: 'nicolo', start: '2025-10', when: 'Oct 2025 to Jun 2026', title: 'Business Intelligence Intern', org: 'PeopleConnect', kind: 'work', note: 'Built the semantic layer service together.' },
  { who: 'donato', start: '2026-03', when: 'Mar 2026 to now', title: 'Business Intelligence Lead', org: 'PeopleConnect', kind: 'work', current: true },
  // zedi public-facts.yaml: "The repo history starts 2026-01-10".
  { who: 'nicolo', start: '2026-01', when: 'Jan 2026', title: 'Started building Zedi', org: 'Zedi', kind: 'milestone' },
  { who: 'nicolo', start: '2026-08', when: 'Aug 2026 to now', title: 'AI-Driven Solutions Analyst', org: 'PeopleConnect', kind: 'work', current: true },
  { who: 'donato', start: '2026-09', when: 'Sep 2026', title: 'Launched Wedge Golf on the App Store', org: 'Wedge Golf', kind: 'milestone' },
  { who: 'nicolo', start: '2026-10', when: 'Oct 2026', title: 'Zedi live at zedi.dev', org: 'Zedi', kind: 'milestone' },
];

/** One brother's entries, newest first. */
export function timelineFor(who: BrotherKey): TimelineEntry[] {
  return timeline.filter((t) => t.who === who).sort((a, b) => b.start.localeCompare(a.start));
}

/** Both brothers' entries, oldest first. */
export const timelineAscending: readonly TimelineEntry[] = [...timeline].sort((a, b) =>
  a.start.localeCompare(b.start),
);
