'use client';

import { useEffect, useState } from 'react';
import s from './console.module.css';

export type StatusNavItem = { id: string; label: string };

// The header's window list, tmux style: "0:home* 1:brothers 2:work". The
// section in the middle of the viewport is the current window and gets the
// star. Without JavaScript it is a plain list of anchor links.
export function StatusNav({ items }: { items: readonly StatusNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const els = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0 || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    els.forEach((el) => observer.observe(el));

    // The last section can be too short to reach the middle band.
    const last = els[els.length - 1];
    const onScroll = () => {
      const bottom = window.innerHeight + window.scrollY;
      if (bottom >= document.documentElement.scrollHeight - 4) setActive(last.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [items]);

  return (
    <nav className={s.windows} aria-label="Sections">
      <ol>
        {items.map((item, i) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={current ? `${s.window} ${s.windowOn}` : s.window}
                aria-current={current ? 'location' : undefined}
              >
                <span className={s.windowIdx} aria-hidden="true">
                  {i}:
                </span>
                {item.label}
                <span className={s.windowFlag} aria-hidden="true">
                  {current ? '*' : ''}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
