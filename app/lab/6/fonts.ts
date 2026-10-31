import { Archivo } from 'next/font/google';

// Variant 6 type: Archivo with its width axis. Display text is set expanded
// (font-stretch 112% to 125%), body text at the normal width (100%).
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo-l6',
});
