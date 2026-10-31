# diferdinando.com redesign lab (2026-10-30)

Owner, 2026-10-30: not a fan of any current version (live, `fix/nicolo-facts-2026-10`, `redesign/drafting-sheet`). Live is a build from before July 2025 that still lists certifications Nicolo does not hold. So instead of fixing either branch, a lab: six genuinely different full-page drafts of the home page on the same facts, side by side at `/lab/1` to `/lab/6` on a Pages preview; the owner names the sections and cards to keep; the final home page is assembled from those picks on this branch. Neither old branch's design is a starting point; their `lib/data.ts` was read for content only.

## The site's job

diferdinando.com is the family practice site for two brothers in San Diego:

- **Donato** builds data platforms: Snowflake and dbt, semantic layers, forecasting, BI. He built Wedge Golf.
- **Nicolo** builds software and AI: LLM automation, full-stack products (Zedi), ML, with security automation and infrastructure as supporting depth.
- Some work is both of theirs: the PeopleConnect semantic layer service.

A visitor (a recruiter, a possible collaborator or client, someone who searched the family name) should know in five seconds who the two are and what they build, see proof (numbers with their source, live links, honest credit), and find one way to write (contact@diferdinando.com). The site sends people on: to donatodiferdinando.dev, nicolod.org, zedi.dev, wedge-golf.dev. It never originates a fact.

## Sources (the truth rule)

All copy lives in `app/lab/_kit/content.ts`, each block with its source:

| Facts about | Source |
|---|---|
| Donato, Wedge Golf | https://donatodiferdinando.dev and https://www.wedge-golf.dev, re-fetched 2026-10-30 (unchanged from the nico-hub snapshot `sources/donato-site-2026-10-16.md`) |
| Nicolo | resume-tex `data/profile.yaml` (branch `feat/profile-yaml-pipeline`) |
| Shared and framing | owner decisions 2026-10-30 (below) and nico-hub `rules/public-claims.md` |

Owner decisions applied: San Diego, CA only. Contact is contact@diferdinando.com. Metric Layer (metric-layer.ai) is presented as Donato's, Nicolo collaborating. Wedge Golf is Donato's app, Nicolo contributes. The PeopleConnect semantic layer service (dbt, MCP connectors, Slack bot) is credited to both, never split. SOC 2 reads "automated SOC 2 audit reporting (audit done in 4 weeks against a projected 10)". No certification claims for Nicolo; no certifications shown at all.

## Shared rules every variant follows

The full list is `app/lab/_kit/README.md`; `node scripts/check-lab.mjs` enforces what a script can. In short:

1. Same facts everywhere, imported from the kit, never retyped; only interface words are the variant's own.
2. Ten required sections, tagged on the page so the owner can name picks: A header, B hero, C the brothers, D featured work, E more work, F by the numbers, G what we work on, H timeline, I contact, J footer (extra card tags from K).
3. Every project shows its credit. The shared card reads as shared.
4. Light and dark both designed (the lab bar switches Auto, Light, Dark), 375px and 1440px, no horizontal scroll, 16px gutters on phones.
5. No em or en dashes, no certifications, no gambling words, no location but San Diego, no external images or font CDNs, motion optional and off under reduced motion.
6. Each variant lives in its own `app/lab/<n>/` and touches nothing else.

## The six variants

| # | Name | The one idea | Look |
|---|---|---|---|
| 1 | Ledger | Swiss editorial grid: facts as hairline-ruled rows, numbers set large, one signal color | Grotesk and mono, paper and ink, one red |
| 2 | Two Halves | The page is split by brother: each has a color and a side, shared work sits on the seam | Serif display, ocean blue and ember |
| 3 | Console | A data engineer's console: a terminal hero, record-style cards, a git-log timeline | Plex Mono and Sans, phosphor green on graphite |
| 4 | Feature Story | A magazine feature about the two of them: masthead, standfirst, photos, pull-quote numbers | Serif text, cream and deep green |
| 5 | Bento | A product-style bento grid: tiles of different sizes, big stat tiles, colored tiles for projects | Rounded grotesk, soft color tiles |
| 6 | Two Lines | Chronology first: two career lines from 2016 that meet at the shared system | Geometric sans, monochrome with one marker color |

(Names and one-liners are final in each variant's `meta.ts`; the `/lab` index reads them.)

## How cards and sections are judged

The owner picks, per tag, against five lenses (suggested picks below):

1. **Five-second clarity**: does a stranger get who these two are and what they build?
2. **Proof**: numbers carry their context, links are one tap away, credit is honest and visible.
3. **Balance**: both brothers read as equals; shared work reads as shared, not as one brother's.
4. **Craft**: type, spacing, rhythm and color hold up in light and dark, at 375px and 1440px.
5. **Fit**: can this piece join one type and color system with pieces from other variants?

The final page uses one type and color system: picking a card from variant 5 and a hero from variant 2 means the card's structure moves, restyled in the chosen system.

## After the picks

1. Assemble the final home page on `lab/redesign-2026-10` from the named tags, in one system, with `content.ts` as the site's data. The site has one page (the home page), so that is the whole site; the lab is removed in the same change.
2. Donato approves every line about him and Wedge Golf (the open items from the 2026-10-17 drift list in nico-hub, `reports/2026-10-17-donato-copy-drift.md` on branch `claude/backlog-worker-2026-10-17`, carry over where they still apply).
3. The owner approves; only then a merge to `main` and a production deploy. The lab never ships to production.

## Open questions for the owner

1. Donato's surname: his site writes "Di Ferdinando"; Nicolo's sources write "DiFerdinando". The lab follows each brother's own spelling. One spelling on the family site?
2. Metric Layer: no public page describes it yet (metric-layer.ai renders no text). The card says only that it is Donato's metrics product built on the semantic layer idea; Donato words it.
3. Photos: the two headshots in `lib/` came with the 2025 site. Keep, replace or drop?
4. Preview builds: see the preview section below.

## Suggested picks (lab runner, 2026-10-30)

Every variant was checked on localhost in the in-app browser at 1440px and 375px, light and dark: all ten sections tagged, one `h1`, no horizontal scroll, no dashes in the rendered text, `check-lab`, `tsc` and the static export clean. A suggestion per section, for the owner to overrule:

| Tag | Suggest | Why | Runner-up |
|---|---|---|---|
| A Header | 1A | quiet, scannable, email always visible | 4A masthead, if the page goes editorial |
| B Hero | 2B | two faces, two names, one line: who and what in five seconds | 6B, the two-lines drawing |
| C Brothers | 1C | key/value rows read fastest and compare the two side by side | 4C with the 4K fact box |
| D Featured work | 2K for the shared card, 1K rows for the rest | the seam card makes shared credit visible; the rows carry credit and metric columns | 5D bento tiles |
| E More work | 1E | compact index, nothing competes with D | 4E "In brief" |
| F Numbers | 6F | four marked numerals, each with its credit line | 5F color tiles |
| G Areas | 1G | numbered grid with proof under each area | 2G |
| H Timeline | 2H | two lanes, one per brother, easiest to read | 3H git-log graph, the most distinctive |
| I Contact | 2I | the two colors meeting at one email | 1I giant email |
| J Footer | 1J | | |

Known lab-only details: Metric Layer's pending note is visible on variants 1 to 5 (dropped in the final page); variant 5's numerals had their tracking opened so "~1B" reads.

## Preview

Branch `lab/redesign-2026-10` (pushed 2026-10-30). Preview: https://lab-redesign-2026-10.diferdinando-portfolio.pages.dev/lab, variants at `/lab/1` to `/lab/6` (robots noindex).

The Pages Git integration did not build the pushed branch: no check run on the commit and no deployment several minutes after the push (nothing has built from Git since 2025-07-14). So the preview was uploaded directly: `npm run build`, then `wrangler pages deploy out --project-name diferdinando-portfolio --branch lab-redesign-2026-10`, with a `_redirects` added to the upload only (`/` to `/lab`) so the preview does not serve this branch's old home page. Git previews come back once the owner reconnects the GitHub integration in the Cloudflare dashboard (Workers & Pages, diferdinando-portfolio, Settings, Builds); check there that the root directory is empty (the app is at the repo root; `cloudflare.md` still says `diferdinando-portfolio`), the build command is `npm run build` and the output directory is `out`.
