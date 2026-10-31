'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckGlyph, CopyGlyph } from './motifs';
import s from './bento.module.css';

type State = 'idle' | 'copied' | 'failed';

/** Copies the practice email, then says so for two seconds. */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [state, setState] = useState<State>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      setState('failed');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 2000);
  }

  const label = state === 'copied' ? 'Copied' : state === 'failed' ? 'Select the address to copy' : 'Copy email';

  return (
    <>
      <button type="button" className={className} onClick={copy} data-state={state}>
        {state === 'copied' ? <CheckGlyph className={s.btnGlyph} /> : <CopyGlyph className={s.btnGlyph} />}
        <span>{label}</span>
      </button>
      <span className={s.srOnly} aria-live="polite">
        {state === 'copied' ? 'Email address copied' : ''}
      </span>
    </>
  );
}
