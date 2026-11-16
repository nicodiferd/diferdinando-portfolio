// The site's theme: html[data-theme] is always the resolved theme, 'light' or
// 'dark', so the page styles dark mode with one selector,
// :global(html[data-theme='dark']) .root { ... }. html[data-theme-pref] is the
// visitor's choice (auto, light or dark), kept in localStorage; auto follows
// prefers-color-scheme. THEME_INIT runs inline in <head> before the page
// paints, so there is no flash. Storage can throw (private windows, blocked
// site data): every access is wrapped, and the page then follows the system.

export const THEME_KEY = 'diferdinando-theme';

export type ThemePref = 'auto' | 'light' | 'dark';

export const THEME_PREFS: readonly ThemePref[] = ['light', 'dark', 'auto'];

/** The page background in each theme, also the browser bar color. */
export const THEME_COLOR = { light: '#fbfaf8', dark: '#121212' } as const;

/** Our own theme-color tag, present only while Light or Dark is chosen. */
const CHOICE_ID = 'theme-color-choice';

// The browser bar: Next's two theme-color tags follow prefers-color-scheme.
// When the visitor picks Light or Dark, one more tag (no media query) goes
// first in <head>; the first matching tag wins, so the bar follows the
// choice. Next's own tags are never edited, so hydration leaves them alone.
export const THEME_INIT = `(function(){var d=document.documentElement,p='auto';try{p=localStorage.getItem('${THEME_KEY}')||'auto'}catch(e){}if(p!=='light'&&p!=='dark')p='auto';var k=p==='dark'||(p==='auto'&&window.matchMedia('(prefers-color-scheme: dark)').matches);d.setAttribute('data-theme',k?'dark':'light');d.setAttribute('data-theme-pref',p);d.style.colorScheme=k?'dark':'light';if(p!=='auto'){var m=document.createElement('meta');m.name='theme-color';m.id='${CHOICE_ID}';m.content=k?'${THEME_COLOR.dark}':'${THEME_COLOR.light}';document.head.prepend(m)}})()`;

export function readThemePref(): ThemePref {
  try {
    const p = localStorage.getItem(THEME_KEY);
    return p === 'light' || p === 'dark' ? p : 'auto';
  } catch {
    return 'auto';
  }
}

export function writeThemePref(pref: ThemePref): void {
  try {
    if (pref === 'auto') localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, pref);
  } catch {
    // Storage refused: the choice lasts until the page reloads.
  }
}

export function applyTheme(pref: ThemePref): void {
  const dark =
    pref === 'dark' || (pref === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const root = document.documentElement;
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  root.setAttribute('data-theme-pref', pref);
  root.style.colorScheme = dark ? 'dark' : 'light';
  let choice = document.getElementById(CHOICE_ID);
  if (pref === 'auto') {
    choice?.remove();
    return;
  }
  if (!choice) {
    choice = document.createElement('meta');
    choice.setAttribute('name', 'theme-color');
    choice.id = CHOICE_ID;
    document.head.prepend(choice);
  }
  choice.setAttribute('content', dark ? THEME_COLOR.dark : THEME_COLOR.light);
}
