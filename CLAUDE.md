# CLAUDE.md

Guidance for Claude Code in this repository.

## Project

diferdinando.com: the DiFerdinando Brothers page (Nicolo and Donato), a single static page built with Next.js 15.3.5 (App Router, `output: 'export'`), Tailwind CSS v4 and Framer Motion, hosted on Cloudflare Pages. Owned by Nicolo; coordinated from nico-hub.

## Commands

- `npm ci` once, then `npm run dev` (Turbopack, http://localhost:3000)
- `npm run build`: static export to `out/`; the only gate today (type check included)
- `npm run preview`: build, then `wrangler pages dev out`
- `npm run deploy`: build, then Direct Upload (see Deployment)
- `npm run lint` is broken: `next lint` with no ESLint installed or configured

## Rules for every change

1. No em-dashes (U+2014) anywhere: copy, code comments, docs, commit messages. Use commas, colons or parentheses.
2. Public claims about Nicolo follow `/Users/nicolodiferdinando/Developer/personal/nico-hub/rules/public-claims.md`; scan with every regex in `nico-hub/rules/banned-claims.txt` (scope `all`) over `app/ components/ lib/ public/` and the built `out/index.html` before shipping. In short: no certification claims, Nicolo is a graduate with a current role (not a student), Zedi links go to `https://zedi.dev`, and the homelab is described as a single Proxmox node with no service count.
3. Nicolo's facts come from source files, never memory: `resume-tex/data/profile.yaml` (canonical; until it lands, the resume .tex and nicolod.org), homelab facts from `showcase/homelab.html`, Zedi facts from `zedi/docs/public-facts.yaml`.

## Approvals

| Content | Who approves |
|---|---|
| Copy about Donato (bio, role, revisions, on-record numbers, Donato-led projects) and the shared services copy | Donato. Agents may only replace em-dashes there. |
| The anthony.diferdinando.com card | Anthony, for anything said about him |
| Facts about Nicolo, links, technical fixes, punctuation | Coordinator (nico-hub), no extra sign-off |
| Merge to `main` and production deploys | Coordinator, per `nico-hub/CHARTER.md` |

## Deployment (verified 2026-10-15)

- Cloudflare Pages project `diferdinando-portfolio` serves https://diferdinando.com (apex only; `www` has no DNS) and https://diferdinando-portfolio.pages.dev.
- Static export: `next.config.ts` sets `output: 'export'`, so `npm run build` writes `out/`; `wrangler.toml` has `pages_build_output_dir = "out"`. There is no next-on-pages or edge runtime (the 2025 `.vercel/` folder is a stale local artifact).
- Pushing does NOT deploy. No commit on GitHub carries a Cloudflare check run, status or deployment, and the 2026-06-25 push (c2a8cdc) never went live: on 2026-10-15 both hosts still served the 2025-07-14 build (896de7b, title "DiFerdinando Brothers - Full-Stack Development & Data Engineering"). Branches get no automatic preview URLs. `cloudflare.md` records 2025 dashboard build settings that no longer fire.
- Deploy by Direct Upload with wrangler (needs `wrangler login` or `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`; the local OAuth token was expired on 2026-10-15):
  - Preview: `npm run build && npx wrangler pages deploy out --project-name diferdinando-portfolio --branch <name>` serves `https://<name>.diferdinando-portfolio.pages.dev` (slashes become dashes).
  - Production: same command with `--branch main` (assumes the project's production branch is `main`; confirm in the dashboard first).
  - `npm run deploy` runs the same upload and lets wrangler take the branch from git.
- Verify: `curl -s https://diferdinando.com | grep -o '<title>[^<]*</title>'` and check the changed copy in the HTML.

## Code map

- `lib/data.ts`: all copy (services, both profiles, projects). Edit content here, not in components.
- `types/index.ts`: `Service`, `Project`, `TeamMember` (`certifications` is optional; Nicolo has none listed, by rule).
- `components/*Section.tsx`: client components with Framer Motion (Hero, Services, About, Projects, Contact) plus `Navigation.tsx`.
- `app/layout.tsx`: metadata, OpenGraph/Twitter (`public/og.png`), Geist fonts.
- Styling: dark theme, Tailwind v4 via `@tailwindcss/postcss`, gradient utilities in `app/globals.css`.

## Status

- This is the design on `origin/main` (c2a8cdc, 2026-06-25), which was pushed but never deployed.
- The July 2026 drafting-sheet redesign lives on branch `redesign/drafting-sheet` (f130bae plus fact fixes); local `main` also holds f130bae unpushed.
