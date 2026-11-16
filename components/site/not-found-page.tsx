import Link from 'next/link';
import { site } from '@/lib/content';
import { BrandMark } from './brand-mark';
import { fraunces, hanken } from './fonts';
import s from './two-halves.module.css';

// The 404 page in the Two Halves look. Old /lab links redirect home
// (public/_redirects); anything else missing lands here.
export function NotFoundPage() {
  return (
    <div className={`${s.root} ${s.nfRoot} ${fraunces.variable} ${hanken.variable}`}>
      <header className={s.header}>
        <div className={s.container}>
          <div className={s.headerRow}>
            <Link href="/" className={s.brand}>
              <BrandMark />
              <span>{site.name}</span>
            </Link>
          </div>
        </div>
      </header>
      <main className={s.nf}>
        <div className={s.nfCard}>
          <h1 className={s.nfHead}>Page not found</h1>
          <p className={s.nfLine}>There is nothing at this address.</p>
          <Link href="/" className={s.headerEmail}>
            Back to the home page
          </Link>
        </div>
      </main>
    </div>
  );
}
