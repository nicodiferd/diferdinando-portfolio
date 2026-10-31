// The lab's theme: html[data-theme] is always the resolved theme, 'light' or
// 'dark', so a variant styles dark mode with one selector,
// :global(html[data-theme='dark']) .root { ... }. The visitor's choice
// (auto, light or dark) lives in localStorage; auto follows the system.
// THEME_INIT runs inline before the page paints, so there is no flash.

export const THEME_KEY = 'lab-theme';
export const TAGS_KEY = 'lab-tags';

export type ThemePref = 'auto' | 'light' | 'dark';

export const THEME_INIT = `(function(){var d=document.documentElement,p='auto',t='on';try{p=localStorage.getItem('${THEME_KEY}')||'auto';t=localStorage.getItem('${TAGS_KEY}')||'on'}catch(e){}var k=p==='dark'||(p!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);d.setAttribute('data-theme',k?'dark':'light');d.setAttribute('data-theme-pref',p);d.setAttribute('data-lab-tags',t);d.style.colorScheme=k?'dark':'light'})()`;

export function applyTheme(pref: ThemePref): void {
  const dark =
    pref === 'dark' || (pref === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const root = document.documentElement;
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  root.setAttribute('data-theme-pref', pref);
  root.style.colorScheme = dark ? 'dark' : 'light';
}
