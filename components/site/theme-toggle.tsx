'use client';

import { useEffect, useState } from 'react';
import { THEME_PREFS, applyTheme, readThemePref, writeThemePref, type ThemePref } from './theme';
import s from './two-halves.module.css';

const LABEL: Record<ThemePref, string> = { light: 'Light', dark: 'Dark', auto: 'Auto' };

// Light, Dark or Auto, in the footer. The pressed look comes from
// html[data-theme-pref] (set before paint by THEME_INIT), so it is right
// before this hydrates; aria-pressed follows once it has.
export function ThemeToggle() {
  const [pref, setPref] = useState<ThemePref | null>(null);

  useEffect(() => {
    setPref(readThemePref());
  }, []);

  useEffect(() => {
    if (pref !== 'auto') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('auto');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [pref]);

  const choose = (next: ThemePref) => {
    writeThemePref(next);
    applyTheme(next);
    setPref(next);
  };

  return (
    <div className={s.themeToggle} role="group" aria-label="Color theme">
      {THEME_PREFS.map((p) => (
        <button
          key={p}
          type="button"
          className={s.themeBtn}
          data-pref={p}
          aria-pressed={pref === null ? undefined : pref === p}
          onClick={() => choose(p)}
        >
          {LABEL[p]}
        </button>
      ))}
    </div>
  );
}
