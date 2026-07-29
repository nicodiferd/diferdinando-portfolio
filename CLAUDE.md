# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website for the DiFerdinando Brothers, showcasing their services in web/mobile development, data engineering, cybersecurity, and AI solutions. Built with Next.js 15.3.5 and deployed on Cloudflare Pages.

## Essential Commands

### Development
- `npm run dev` - Start development server with Turbopack at http://localhost:3000
- `npm run build` - Create production build
- `npm run lint` - Run Next.js linter

### Cloudflare Deployment
- `npm run pages:build` - Build for Cloudflare Pages using @cloudflare/next-on-pages
- `npm run preview` - Build and preview locally with wrangler
- `npm run deploy` - Build and deploy to Cloudflare Pages

## Architecture & Key Files

### Core Configuration
- **next.config.ts** - Next.js configuration (images unoptimized for Cloudflare)
- **wrangler.toml** - Cloudflare Pages configuration with nodejs_compat flag
- **postcss.config.mjs** - Uses @tailwindcss/postcss for Tailwind CSS v4

### Data Structure
- **lib/data.ts** - Central data source containing:
  - Services offered (6 categories)
  - Team member profiles (Nicolo & Donato)
  - Project showcase data
- **types/index.ts** - TypeScript interfaces for Service, Project, and TeamMember

### Component Architecture
All components use client-side rendering ('use client') with Framer Motion animations:
- **Navigation.tsx** - Fixed navigation with scroll effects
- **HeroSection.tsx** - Wide-caps headline, dimension line, title-block strip (the site's signature element)
- **ServicesSection.tsx** - Capabilities as a numbered spec-division index (rows, not cards)
- **AboutSection.tsx** - Brother profiles with "revision history" career tables and accent colors
- **ProjectsSection.tsx** - Project index with N/D lead marks; Wedge featured with screenshots
- **ContactSection.tsx** - Large email link plus a title-block detail grid

### Styling Approach (drafting-sheet identity)
- Tailwind CSS v4; design tokens in `@theme` in globals.css
- Palette: vellum paper (#eeefe9), graphite ink, checker red (Nicolo), blueprint blue (Donato)
- Fonts via next/font: Archivo variable (wdth axis, `.display-wide`), IBM Plex Sans (body), IBM Plex Mono (labels)
- IMPORTANT: font tokens live in `@theme inline` because next/font variables are defined on `<body>`, not `:root` — plain `@theme` silently falls back to system fonts
- Recurring devices: title block, hairline rules, `.label-mono` annotations, `.grid-drafting` background

## Deployment Notes

The site is configured for Cloudflare Pages deployment:
- Build output directory: `.vercel/output/static`
- Uses @cloudflare/next-on-pages adapter
- Static export disabled to support Cloudflare's edge runtime
- Environment variable: `NEXT_TELEMETRY_DISABLED=1`

## Key Dependencies
- **UI**: lucide-react, @heroicons/react for icons
- **Animation**: framer-motion for page transitions
- **Styling**: Tailwind CSS v4 with PostCSS
- **Deployment**: @cloudflare/next-on-pages, wrangler

## Deployment Status
Last deployment: January 13, 2025 - Cloudflare Pages
July 29, 2026: full drafting-sheet redesign committed but NOT yet deployed. Before deploying: regenerate `public/og.png` (still shows the old dark design).