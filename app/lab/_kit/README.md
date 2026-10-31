# Redesign lab: rules for a variant

`/lab` lists six drafts of the diferdinando.com home page, `/lab/1` to `/lab/6`. Each is a full page with the same facts and its own layout, type, color and card design. The brief and the judging are in `docs/lab/2026-10-30-redesign-lab.md`; read it first.

## Where you work

- Only `app/lab/<n>/`, your own number. `page.tsx` and `meta.ts` are yours; add any other files there (components, a `*.module.css`, `fonts.ts`).
- Never touch `_kit/`, `registry.ts`, `layout.tsx`, the index `page.tsx`, another variant, `app/globals.css`, `app/layout.tsx`, `components/`, `lib/`, `public/`, `package.json` or `scripts/`. Need something the kit lacks? Say so in your report.
- `meta.ts`: set `name` (two or three words), `oneLiner` (one sentence) and `style` (a few words: type, palette, layout); keep `n`.
- `page.tsx` keeps `export const metadata: Metadata = labPageMetadata(meta);`. It is a server component; client parts (a tab switch, a disclosure) go in their own `'use client'` files in your directory. No extra routes (no nested `page`, `layout`, `route`, OG or icon files).

## Truth

- Every fact, number, name, title, date, link and email comes from `../_kit` (`content.ts`): `site`, `donato`, `nicolo`, `brothers`, `creditLabel`, `headlineStats`, `areas`, `projects`, `featuredProjects`, `otherProjects`, `timeline`, `timelineFor`, `timelineAscending`. Render the strings; never retype or reword a fact in your files. Your own words are only interface words (section names such as "Work" or "The brothers", button labels, "Visit", "Read more").
- No URL, `mailto:` or email literal in your files; links are `link.href` and `site.emailHref` from the kit. External links open in a new tab with `rel="noopener noreferrer"`.
- Show every project's credit (`creditLine`, or `creditLabel[credit]`). The semantic layer card is both brothers' work: never split it. Wedge Golf and Metric Layer read as Donato's.
- No certifications, no "student", no location but `site.location`, no gambling words, no em or en dashes (characters or entities) anywhere, comments included. Date ranges use "to".

## Required sections, in any order and any form

Every variant has all of these, so the owner can compare the same piece across drafts:

| Tag | Section | Content from the kit |
|---|---|---|
| A | Header | `site.name`, anchor links to your sections, the email |
| B | Hero | `site.headline`, `site.lede`, `site.location` |
| C | The brothers | for each of `brothers`: name, title, `now` at `nowOrg` since `nowSince`, `short` or `bio`, `focus`, `stats`, `education`, `links`, and the `photo` (optional) |
| D | Featured work | the six `featuredProjects` with title, kind, creditLine, summary, the metric when there is one, stack and links |
| E | More work | the six `otherProjects`, compact is fine |
| F | By the numbers | the four `headlineStats` |
| G | What we work on | the six `areas` |
| H | Timeline | `timeline` (both brothers, or `timelineFor` each) |
| I | Contact | `site.contactHeadline`, `site.contactLine`, `site.email` as a mailto link |
| J | Footer | `site.name`, `site.year`, `site.location`, the email |

Put `<LabTag id="<n><letter>" label="<Section>" />` (from `../_kit`) at the top of each section, so variant 3's hero is `<LabTag id="3B" label="Hero" />`. If you design a card worth naming on its own, tag the first card too with the next free letter (K, L, ...) and say so in your report. Tags are lab chrome: never style them.

## Look

- Make it genuinely yours: the direction you were given, done with conviction. No generic template look, no gradients-on-black like the old site, no "drafting sheet" or blueprint look (the owner rejected the July redesign).
- Fonts through `next/font/google` in your own `fonts.ts`, as CSS variables on your root element. No `@import`, `@font-face` or font CDN. Geist and Geist Mono are already on `<body>` as `--font-geist-sans` and `--font-geist-mono`.
- Photos: `donato.photo` and `nicolo.photo` (800 by 800 headshots) through `next/image` with `alt={b.photoAlt}`. No other images; pictures beyond that are CSS or inline SVG. Add nothing to `public/`.
- Styling: a CSS module (`<name>.module.css`) is the easy path for your own palette; Tailwind utilities also work. Define your colors as custom properties on your root class.
- Light and dark: the lab sets `html[data-theme]` to `light` or `dark` before paint (the lab bar switches it). Write the light tokens on your root class and the dark ones under `:global(html[data-theme='dark']) .root { ... }`. Both themes must be designed, not inverted: check contrast (4.5:1 for body text).
- Your root element paints its own background and text color and is at least `min-height: 100vh` (the old site's body is black).
- Mobile first: 375px wide first, 16px side gutters at phone width, no horizontal scroll from 320px to 1440px (no `100vw`; a wide thing scrolls inside its own box). Check 1440px too: content should use the width well, not float in a narrow column unless that is the idea.
- Leave 72px of room at the bottom of the page for the floating lab bar.
- Motion: optional, transform and opacity only, nothing looping forever, and none under `prefers-reduced-motion: reduce`.
- Accessibility: one `h1`, headings in order, visible focus styles, links that say where they go, `lang` already set.

## Checks on your own files

```bash
node scripts/check-lab.mjs
npx tsc --noEmit --incremental false
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100/lab/<n>
```

The dev server is already running on port 3100 (do not start another, do not run `next build`). A 200 means it compiled; a 500 prints the error in the body. Do not use a browser: the lab owner checks every variant in the in-app browser at 375px and 1440px, light and dark.
