import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';

// Variant 3 type: Plex Mono for headings, labels, data and the hero; Plex
// Sans for every paragraph of body text. Both self-hosted by next/font and
// exposed as CSS variables on the variant's root element.
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--c3-mono',
  display: 'swap',
});

export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--c3-sans',
  display: 'swap',
});
