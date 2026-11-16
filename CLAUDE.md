# CLAUDE.md

diferdinando.com: the family site of brothers Donato and Nicolo DiFerdinando. One page, Next.js 15 static export (`output: 'export'` to `out/`), deployed on Cloudflare Pages (project `diferdinando-portfolio`). The design is "Two Halves" (lab variant 2, promoted 2026-11-07): Fraunces and Hanken Grotesk, ocean blue for Donato on the left, ember for Nicolo on the right, shared work on the seam.

## Commands

- `npm run dev`: dev server at http://localhost:3000
- `npm run build`: static export to `out/`, then `scripts/check-site.mjs` runs on it (postbuild)
- `npm run check`: the copy check alone (needs a fresh `out/`)
- `npm run lint`, `npx tsc --noEmit`
- Preview deploy (never production without the owner's go): `BRANCH=<preview-name> npm run deploy:preview` (builds, then `wrangler pages deploy out --branch <preview-name>`; it refuses main, master and production). There is no production deploy script.

## Layout

| Path | Holds |
|---|---|
| `lib/content.ts` | every fact, number, name, date, link and email on the site, each block with its source |
| `components/site/home-page.tsx` | the page (server component); words here are interface words only |
| `components/site/not-found-page.tsx`, `app/not-found.tsx` | the 404 page in the same design; `public/_redirects` sends old `/lab` links home |
| `components/site/two-halves.module.css` | the design: light tokens on `.root`, dark under `html[data-theme='dark']` |
| `components/site/theme.ts`, `theme-toggle.tsx` | theme script run before paint, and the Light/Dark/Auto switch in the footer |
| `app/layout.tsx` | metadata (title, description, canonical, Open Graph) and the theme script |
| `scripts/check-site.mjs` | scans `out/**/*.html` for the copy rules below |
| `lib/Donato.jpeg`, `lib/Nicolo.jpeg` (336px), `public/og.png`, `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` | the only images |

## Copy rules

- Facts come from sources, never from memory: Donato and Wedge Golf from https://donatodiferdinando.dev and https://www.wedge-golf.dev; Nicolo from resume-tex `data/profile.yaml`; Zedi from zedi.dev and zedi `docs/public-facts.yaml`; BBLMLP from bblmlp `docs/public-facts.yaml`; framing from nico-hub `rules/public-claims.md` and its `decisions/`. Donato approves every line about him and Wedge Golf.
- No em or en dashes anywhere (code comments included). No certification claims. No betting words. San Diego, CA is the only location. contact@diferdinando.com is the only email. The surname is "DiFerdinando" for both. Not for hire: no services, clients or hire wording.
- Credit: the PeopleConnect semantic layer is both brothers' work and the only thing styled as shared; Wedge Golf and Metric Layer are Donato's (Nicolo contributes, collaborates); areas that pair two solo projects use the "each" credit (two separate marks).
- Light and dark, 375px and 1440px, no horizontal scroll, 16px phone gutters, motion only under `prefers-reduced-motion: no-preference`.
