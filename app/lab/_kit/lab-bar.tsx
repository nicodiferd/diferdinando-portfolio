'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LAB_COUNT } from './lab-entry';
import { TAGS_KEY, THEME_KEY, applyTheme, type ThemePref } from './theme';

const NEXT_PREF: Record<ThemePref, ThemePref> = { auto: 'light', light: 'dark', dark: 'auto' };
const PREF_LABEL: Record<ThemePref, string> = { auto: 'Auto', light: 'Light', dark: 'Dark' };

function read(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private windows can refuse storage; the choice then lasts this page.
  }
}

// The floating lab bar on every /lab page: previous and next variant, the
// index, the theme (Auto, Light, Dark) and the lab tags on or off. Lab
// chrome only, styled by lab.css; it never appears outside /lab.
export function LabBar() {
  const pathname = usePathname() ?? '/lab';
  const match = pathname.match(/^\/lab\/(\d+)\/?$/);
  const n = match ? Number(match[1]) : null;
  const [pref, setPref] = useState<ThemePref>('auto');
  const [tags, setTags] = useState<'on' | 'off'>('on');

  useEffect(() => {
    setPref(read(THEME_KEY, 'auto') as ThemePref);
    setTags(read(TAGS_KEY, 'on') === 'off' ? 'off' : 'on');
  }, []);

  useEffect(() => {
    applyTheme(pref);
    if (pref !== 'auto') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('auto');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [pref]);

  useEffect(() => {
    document.documentElement.setAttribute('data-lab-tags', tags);
  }, [tags]);

  const cycleTheme = () => {
    const next = NEXT_PREF[pref];
    write(THEME_KEY, next);
    setPref(next);
  };
  const toggleTags = () => {
    const next = tags === 'on' ? 'off' : 'on';
    write(TAGS_KEY, next);
    setTags(next);
  };

  const prev = n && n > 1 ? `/lab/${n - 1}` : null;
  const next = n && n < LAB_COUNT ? `/lab/${n + 1}` : n === null ? '/lab/1' : null;

  return (
    <nav className="lab-bar" aria-label="Lab">
      <Link href="/lab">Lab</Link>
      {n !== null && (
        <>
          {prev ? (
            <Link href={prev} aria-label="Previous variant">
              &larr;
            </Link>
          ) : (
            <span aria-disabled="true" className="lab-bar-count">
              &larr;
            </span>
          )}
          <span className="lab-bar-count">
            {n}/{LAB_COUNT}
          </span>
        </>
      )}
      {next ? (
        <Link href={next} aria-label="Next variant">
          &rarr;
        </Link>
      ) : (
        <span aria-disabled="true" className="lab-bar-count">
          &rarr;
        </span>
      )}
      <button type="button" onClick={cycleTheme} aria-label={`Theme: ${PREF_LABEL[pref]}. Change theme`}>
        {PREF_LABEL[pref]}
      </button>
      <button type="button" onClick={toggleTags} aria-pressed={tags === 'on'}>
        Tags {tags === 'on' ? 'on' : 'off'}
      </button>
    </nav>
  );
}
