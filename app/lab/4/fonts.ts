import { Instrument_Sans, Instrument_Serif, Newsreader } from 'next/font/google';

// Variant 4 type. Newsreader carries text and display (variable optical size,
// real italics); Instrument Sans sets kickers, labels and bylines in caps;
// Instrument Serif sets the nameplate only. Each is a CSS variable that the
// page root picks up (feature.module.css).

export const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--v4-news',
  display: 'swap',
});

export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--v4-label',
  display: 'swap',
});

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--v4-plate',
  display: 'swap',
});

export const fontVariables = `${newsreader.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`;
