import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from './_kit';
import { LAB_VARIANTS } from './registry';
import styles from './index.module.css';

// The lab index: one row per variant from registry.ts (each variant's own
// meta.ts), how to pick, and a note that every page here is a draft. It is
// the only page that links the variants; nothing outside /lab links here.
export const metadata: Metadata = {
  title: 'Redesign lab',
  description: `Drafts of the ${site.domain} home page, side by side. Not the live site.`,
};

export default function LabIndexPage() {
  return (
    <main className={styles.root}>
      <div className={styles.wrap}>
        <p className={styles.kicker}>{site.domain}</p>
        <h1 className={styles.title}>Redesign lab</h1>
        <p role="note" className={styles.note}>
          Six drafts of the home page, each with the same facts and a different layout, type, color and card
          design. None of them is the live site, and the copy about Donato still needs his approval.
        </p>

        <ol className={styles.list}>
          {LAB_VARIANTS.map((variant) => (
            <li key={variant.n}>
              <Link href={`/lab/${variant.n}`} className={styles.card}>
                <span className={styles.cardHead}>
                  <span className={styles.num}>{variant.n}</span>
                  <span className={styles.name}>{variant.name}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    &rarr;
                  </span>
                </span>
                <span className={styles.one}>{variant.oneLiner}</span>
                <span className={styles.style}>{variant.style}</span>
              </Link>
            </li>
          ))}
        </ol>

        <section className={styles.how} aria-labelledby="how">
          <h2 id="how">How to pick</h2>
          <ol>
            <li>
              Every section carries a yellow tag such as <code>3B</code>: variant 3, section B. Name the tags you
              want to keep, for example &ldquo;hero 4A, brothers 2C, work cards 5D&rdquo;.
            </li>
            <li>
              The bar at the bottom moves between drafts, switches Auto, Light and Dark, and hides the tags.
            </li>
            <li>Look at each one on a phone too. The final page takes the picked pieces and one type and color system.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
