import { donato, nicolo } from '@/lib/content';
import s from './two-halves.module.css';

/** The DN monogram: Donato's half in ocean blue, Nicolo's in ember. */
export function BrandMark() {
  return (
    <span className={s.brandMark} aria-hidden="true">
      <span>{donato.initial}</span>
      <span>{nicolo.initial}</span>
    </span>
  );
}
