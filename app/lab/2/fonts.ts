import { Fraunces, Hanken_Grotesk } from 'next/font/google';

// Variant 2 type: Fraunces for display (variable, with the optical size and
// SOFT axes so the big names read warm and round), Hanken Grotesk for body
// and interface text. Both land as CSS variables on the variant's root.

export const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});
