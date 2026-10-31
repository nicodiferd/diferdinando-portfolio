import { Inter_Tight, JetBrains_Mono } from 'next/font/google';

// Variant 1 (Ledger) type: Inter Tight for display and text, JetBrains Mono
// for numerals, labels and metadata. Both self-hosted by next/font and
// exposed as CSS variables on the variant's root element.

export const ledgerSans = Inter_Tight({
  subsets: ['latin'],
  variable: '--l1-sans',
  display: 'swap',
});

export const ledgerMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--l1-mono',
  display: 'swap',
});
