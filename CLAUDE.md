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
- **HeroSection.tsx** - Animated hero with blob backgrounds
- **ServicesSection.tsx** - Service cards with icon mapping
- **AboutSection.tsx** - Team member profiles with social links
- **ProjectsSection.tsx** - Filterable project gallery
- **ContactSection.tsx** - Contact information and expertise summary

### Styling Approach
- Tailwind CSS v4 with @import syntax
- Custom gradient utilities (.gradient-text, .gradient-border)
- Blob animations for hero section backgrounds
- Dark mode CSS variables (unused but defined)

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