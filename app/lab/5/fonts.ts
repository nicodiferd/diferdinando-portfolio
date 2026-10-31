import { Bricolage_Grotesque } from 'next/font/google';

// Variant 5 display face. The variable font carries the width (wdth 75 to
// 100) and optical size (opsz 12 to 96) axes, so headlines can run condensed
// and heavy while small labels stay open. Body stays on Geist from <body>.
export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-bricolage',
  display: 'swap',
});
