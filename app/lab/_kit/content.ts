import type { StaticImageData } from 'next/image';
import donatoPhoto from '@/lib/Donato.jpeg';
import nicoloPhoto from '@/lib/Nicolo.jpeg';

// Every fact a lab variant shows comes from this file, never from a literal
// in the variant (README.md beside this file). Sources:
// - Donato and Wedge Golf: https://donatodiferdinando.dev and
//   https://www.wedge-golf.dev, re-fetched 2026-10-30 (nico-hub snapshot
//   sources/donato-site-2026-10-16.md is unchanged). Donato approves this
//   copy before production.
// - Nicolo: resume-tex data/profile.yaml (branch feat/profile-yaml-pipeline).
//   No certification claims.
// - Owner decisions 2026-10-30: San Diego only; contact@diferdinando.com;
//   Metric Layer is Donato's (Nicolo collaborates); Wedge Golf is Donato's
//   (Nicolo contributes); the PeopleConnect semantic layer service is both
//   brothers' work, credit not split.

export type BrotherKey = 'donato' | 'nicolo';
export type Credit = BrotherKey | 'both';

export type Link = { label: string; href: string };
export type Stat = { value: string; label: string; note?: string };

// --- The practice ---------------------------------------------------------

export const site = {
  name: 'DiFerdinando',
  domain: 'diferdinando.com',
  location: 'San Diego, CA',
  email: 'contact@diferdinando.com',
  emailHref: 'mailto:contact@diferdinando.com',
  /** The hero line. */
  headline: 'Data platforms, software and AI, built by two brothers.',
  /** One sentence under the headline. */
  lede:
    'Donato builds the data platforms a company runs its numbers on. Nicolo builds the software and AI that sit on top of them. Sometimes it is the same system.',
  /** A shorter tagline for tight spots (a header, a footer). */
  tagline: 'Two brothers in San Diego. Data platforms, software and AI.',
  /** The contact band. */
  contactHeadline: 'Working on something with data or AI?',
  contactLine: 'Write to both of us. One inbox, and we read it.',
  year: '2026',
} as const;

// --- The brothers ---------------------------------------------------------

export type TimelineKind = 'work' | 'education' | 'milestone';

export type TimelineEntry = {
  who: BrotherKey;
  /** Sortable start, YYYY-MM. */
  start: string;
  /** Display range, plain words, no dashes. */
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
  /** Full name as the person spells it. */
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
  /** Two short paragraphs for an about section. */
  bio: readonly string[];
  /** What he works on, a few words each. */
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
  // Donato's own site spells it in two words. Open question in the lab
  // brief: one spelling for both brothers on the family site?
  name: 'Donato Di Ferdinando',
  initial: 'D',
  title: 'Data Engineer, BI Lead and Founder of Wedge Golf',
  now: 'Business Intelligence Lead',
  nowOrg: 'PeopleConnect',
  nowSince: 'Mar 2026',
  short:
    'Data engineer and BI lead. He builds the platforms a company runs its numbers on, and he built Wedge Golf.',
  bio: [
    "Donato has worked in data since 2020, at a shipyard, a biotech and now PeopleConnect, where he leads Business Intelligence. He designed and built the company's data platform on Snowflake and dbt, about 1B rows a day, and owns the BI roadmap and the dbt, data modeling and SQL standards.",
    'He works best between business and technology: figuring out what a team is trying to do, then building something people actually use. He also designed and built Wedge Golf, a free golf app for iPhone, from the native app to the backend and website.',
  ],
  focus: ['Data platforms', 'Semantic layers', 'Forecasting', 'BI', 'iOS apps'],
  stats: [
    { value: '6+', label: 'years in data', note: 'Shipyard, biotech, PeopleConnect' },
    { value: '~1B', label: 'rows a day', note: 'Snowflake + dbt' },
    { value: '600+', label: 'governed metrics', note: 'One definition each' },
    { value: '300+', label: 'dbt models', note: '900+ tests' },
  ],
  education: [
    { degree: 'MBA', school: 'National University', when: '2023' },
    { degree: 'B.S. Industrial Engineering', school: 'Cal Poly San Luis Obispo', when: '2020' },
  ],
  links: [
    { label: 'donatodiferdinando.dev', href: 'https://donatodiferdinando.dev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/donato-diferdinando' },
    { label: 'GitHub', href: 'https://github.com/fddiferd' },
  ],
  photo: donatoPhoto,
  photoAlt: 'Donato Di Ferdinando',
};

export const nicolo: Brother = {
  key: 'nicolo',
  first: 'Nicolo',
  name: 'Nicolo DiFerdinando',
  initial: 'N',
  title: 'AI/ML and data engineer',
  now: 'AI-Driven Solutions Analyst',
  nowOrg: 'PeopleConnect',
  nowSince: 'Aug 2026',
  short:
    'AI/ML and data engineer. He ships production systems end to end and measures them with numbers.',
  bio: [
    'Nicolo builds LLM-powered automation, dbt and Snowflake pipelines, a semantic layer served over MCP, and calibrated ML models. He is an AI-Driven Solutions Analyst at PeopleConnect and a Cal Poly Industrial Engineering graduate (June 2026).',
    'On his own he built Zedi, a personal finance SaaS, and runs a single-node homelab. Security automation is his supporting depth: he automated SOC 2 audit reporting (audit done in 4 weeks against a projected 10).',
  ],
  focus: ['AI automation', 'Full-stack software', 'Machine learning', 'Data pipelines', 'Security automation'],
  stats: [
    { value: '4 weeks', label: 'SOC 2 audit', note: 'Against a projected 10' },
    { value: '50+', label: 'incidents a week', note: 'Cal Poly ITS SOC' },
    { value: '200+', label: 'endpoints scanned', note: 'Vulnerability scanning' },
    { value: '139', label: 'model features', note: 'LightGBM ties a tuned Elo' },
  ],
  education: [
    {
      degree: 'B.S. Industrial Engineering',
      school: 'California Polytechnic State University, San Luis Obispo',
      when: 'June 2026',
    },
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

// --- Shared numbers (a "by the numbers" band) -----------------------------

export const headlineStats: readonly (Stat & { who: Credit })[] = [
  { value: '~1B', label: 'rows a day', note: 'Snowflake + dbt platform', who: 'donato' },
  { value: '600+', label: 'governed metrics', note: 'Semantic layer, served to AI', who: 'both' },
  { value: '4 weeks', label: 'SOC 2 audit, against a projected 10', note: 'Audit reporting automated', who: 'nicolo' },
  { value: 'Sep 2026', label: 'Wedge Golf on the App Store', note: 'Free on iPhone', who: 'donato' },
];

// --- What we work on --------------------------------------------------------

export type Area = {
  id: string;
  title: string;
  line: string;
  who: Credit;
  /** Names of projects below that show this area. */
  proof: string;
};

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
    line: 'Full-stack web and iOS products, from the first commit to production.',
    who: 'both',
    proof: 'Zedi (Nicolo) and Wedge Golf (Donato)',
  },
  {
    id: 'ml',
    title: 'Machine learning and forecasting',
    line: 'Lifetime value, retention and revenue forecasts; calibrated models with leakage tests.',
    who: 'both',
    proof: 'LTV forecasting (Donato), BBLMLP (Nicolo)',
  },
  {
    id: 'automation',
    title: 'AI automation',
    line: 'LLM-powered tools and agents that take repeat work off a team.',
    who: 'both',
    proof: 'AI tooling across Growth, BI and Operations (Nicolo); 12 agents on Claude Managed Agents (Donato)',
  },
  {
    id: 'security',
    title: 'Security and infrastructure',
    line: 'Security automation, audit reporting and self-hosted infrastructure.',
    who: 'nicolo',
    proof: 'SOC 2 audit in 4 weeks against a projected 10',
  },
];

// --- Work -----------------------------------------------------------------

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
  /** Two or three sentences. */
  body: string;
  metric?: Stat;
  stack: readonly string[];
  links?: readonly Link[];
  /** The top cards; the rest are secondary. */
  featured?: boolean;
  /** Copy that still needs Donato's wording before production. */
  pending?: string;
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
      'A dbt MetricFlow semantic layer with one shared definition for each of 600+ governed metrics, and the service that serves it to AI: MCP connectors for Claude and ChatGPT, and a Slack bot. Anyone in the company can ask about the business and get the same answer.',
    metric: { value: '600+', label: 'governed metrics' },
    stack: ['dbt MetricFlow', 'Snowflake', 'MCP', 'Slack', 'Claude', 'ChatGPT'],
    featured: true,
  },
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
    creditLine: "Donato's app. Nicolo contributes.",
    summary: 'A free iPhone app for playing golf with your friends.',
    body:
      'Live scoring, GPS shot tracking with no clip-on sensors, Nassau and match play games that settle themselves, multi-day tournaments, a feed of your friends’ rounds, and rounds that post straight to GHIN for an official handicap. Donato designed and built it, from the native app to the backend, website and infrastructure.',
    metric: { value: 'Sep 2026', label: 'launched on the App Store' },
    stack: ['SwiftUI', 'FastAPI', 'Google Cloud Run', 'Postgres on Cloud SQL', 'Next.js', 'Terraform'],
    links: [
      { label: 'wedge-golf.dev', href: 'https://www.wedge-golf.dev' },
      { label: 'App Store', href: 'https://apps.apple.com/us/app/wedge-golf/id6761741539' },
    ],
    featured: true,
  },
  {
    id: 'zedi',
    title: 'Zedi',
    kind: 'Personal finance SaaS',
    credit: 'nicolo',
    creditLine: 'Nicolo',
    summary: 'A full-stack personal finance platform, built end to end and shipped.',
    body:
      'A Rust/Axum API, a Next.js and TypeScript frontend, PostgreSQL with row-level multi-tenancy, Claude Vision receipt OCR and Stripe billing.',
    stack: ['Rust / Axum', 'Next.js', 'TypeScript', 'PostgreSQL', 'Claude Vision', 'Stripe'],
    links: [{ label: 'zedi.dev', href: 'https://zedi.dev' }],
    featured: true,
  },
  {
    id: 'metric-layer',
    title: 'Metric Layer',
    kind: 'Metrics product',
    credit: 'donato',
    creditLine: "Donato's project. Nicolo collaborates.",
    summary: "Donato's product for governed metrics on top of a semantic layer.",
    body:
      'The same idea as the PeopleConnect semantic layer, one definition per metric, built as a product of its own. Donato leads it; Nicolo collaborates.',
    stack: ['Semantic layer', 'Governed metrics'],
    links: [{ label: 'metric-layer.ai', href: 'https://metric-layer.ai' }],
    featured: true,
    pending: 'No public source describes Metric Layer yet; Donato words this card.',
  },
  {
    id: 'bblmlp',
    title: 'BBLMLP',
    kind: 'Baseball ML prediction',
    credit: 'nicolo',
    creditLine: 'Nicolo',
    summary: 'A machine learning pipeline that is honest about what it finds.',
    body:
      'Statcast ingest into DuckDB, point-in-time features with leakage tests, walk-forward backtests and Brier and reliability calibration. The finding: a 139-feature LightGBM ties a tuned Elo baseline.',
    metric: { value: '139', label: 'features, tied with a tuned Elo' },
    stack: ['Python', 'DuckDB', 'LightGBM', 'Statcast'],
    featured: true,
  },
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
    id: 'ai-automation',
    title: 'AI automation',
    kind: 'LLM tooling',
    org: 'PeopleConnect',
    credit: 'nicolo',
    creditLine: 'Nicolo',
    summary: 'LLM-powered tools that automate work across Growth, BI and Operations.',
    body:
      'Tools and Python scripts built on OpenAI, Claude, Zapier and Airflow. The work runs as structured experiments, measured on time saved, revenue lift and cost efficiency.',
    stack: ['OpenAI', 'Claude', 'Python', 'Zapier', 'Airflow'],
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
    metric: { value: '12', label: 'agents' },
    stack: ['Claude Managed Agents', 'Google Cloud Run', 'Asana'],
  },
  {
    id: 'security',
    title: 'Security automation',
    kind: 'Security',
    credit: 'nicolo',
    creditLine: 'Nicolo',
    summary: 'Automated SOC 2 audit reporting (audit done in 4 weeks against a projected 10).',
    body:
      'At PeopleConnect: Bash scripts that automated SOC 2 audit reporting, and vulnerability scanning rolled out across 200+ endpoints. Before that, at the Cal Poly ITS SOC: a Python Slack app wiring Splunk SOAR playbooks into incident response, and 50+ incidents a week.',
    metric: { value: '4 weeks', label: 'SOC 2 audit, against a projected 10' },
    stack: ['Bash', 'Python', 'Splunk SOAR', 'Slack Bolt'],
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
  {
    id: 'flora',
    title: 'Flora',
    kind: 'Senior capstone',
    org: 'Bloomfilter',
    credit: 'nicolo',
    creditLine: 'Nicolo',
    summary: 'HCI design for AI agents inside project management tools.',
    body:
      'A year-long senior group project with Bloomfilter on how AI agents fit into project management software, aimed at user adoption in enterprise tools.',
    stack: ['HCI research', 'AI agents'],
  },
];

export const featuredProjects: readonly Project[] = projects.filter((p) => p.featured);
export const otherProjects: readonly Project[] = projects.filter((p) => !p.featured);

// --- Timeline -------------------------------------------------------------

export const timeline: readonly TimelineEntry[] = [
  { who: 'donato', start: '2016-09', when: '2016 to 2020', title: 'B.S. Industrial Engineering', org: 'Cal Poly San Luis Obispo', kind: 'education' },
  { who: 'donato', start: '2020-07', when: 'Jul 2020 to Jul 2021', title: 'Professional Development Program', org: 'General Dynamics NASSCO', kind: 'work', note: 'A year rotating through every department at the shipyard.' },
  { who: 'donato', start: '2021-07', when: 'Jul 2021 to Jul 2023', title: 'Data Engineer', org: 'General Dynamics NASSCO', kind: 'work', note: 'Started and ran the BI Center of Excellence.' },
  { who: 'nicolo', start: '2021-09', when: 'Sept 2021 to June 2026', title: 'B.S. Industrial Engineering', org: 'Cal Poly San Luis Obispo', kind: 'education' },
  { who: 'donato', start: '2021-09', when: '2021 to 2023', title: 'MBA', org: 'National University', kind: 'education', note: 'Earned while working full time.' },
  { who: 'nicolo', start: '2022-06', when: 'Summer 2022', title: 'Cybersecurity Intern', org: 'loanDepot', kind: 'work' },
  { who: 'donato', start: '2023-07', when: 'Jul 2023 to Feb 2024', title: 'Senior Business Intelligence Analyst', org: 'Maravai LifeSciences', kind: 'work' },
  { who: 'donato', start: '2024-01', when: 'Jan 2024', title: 'Started building Wedge Golf', org: 'Wedge Golf', kind: 'milestone' },
  { who: 'nicolo', start: '2024-04', when: 'Apr 2024 to June 2025', title: 'Assistant Student SOC Analyst', org: 'Cal Poly ITS', kind: 'work', note: '50+ security incidents a week.' },
  { who: 'donato', start: '2024-05', when: 'May 2024 to Mar 2026', title: 'Principal Business Intelligence Analyst', org: 'PeopleConnect', kind: 'work' },
  { who: 'nicolo', start: '2025-06', when: 'June 2025 to Sept 2025', title: 'Cybersecurity & IT Intern', org: 'PeopleConnect', kind: 'work', note: 'SOC 2 audit done in 4 weeks against a projected 10.' },
  { who: 'nicolo', start: '2025-10', when: 'Oct 2025 to June 2026', title: 'Business Intelligence Intern', org: 'PeopleConnect', kind: 'work', note: 'The semantic layer service, with Donato.' },
  { who: 'donato', start: '2026-03', when: 'Mar 2026 to now', title: 'Business Intelligence Lead', org: 'PeopleConnect', kind: 'work', current: true },
  { who: 'nicolo', start: '2026-08', when: 'Aug 2026 to now', title: 'AI-Driven Solutions Analyst', org: 'PeopleConnect', kind: 'work', current: true },
  { who: 'donato', start: '2026-09', when: 'Sep 2026', title: 'Launched Wedge Golf on the App Store', org: 'Wedge Golf', kind: 'milestone' },
];

/** One brother's entries, newest first. */
export function timelineFor(who: BrotherKey): TimelineEntry[] {
  return timeline.filter((t) => t.who === who).sort((a, b) => b.start.localeCompare(a.start));
}

/** Both brothers' entries, oldest first. */
export const timelineAscending: readonly TimelineEntry[] = [...timeline].sort((a, b) =>
  a.start.localeCompare(b.start),
);
