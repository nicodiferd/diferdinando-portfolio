import type { Metadata } from 'next';
import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  LabTag,
  areas,
  brothers,
  creditLabel,
  featuredProjects,
  headlineStats,
  labPageMetadata,
  otherProjects,
  site,
} from '../_kit';
import type { Brother, Credit, Project } from '../_kit';
import { archivo } from './fonts';
import { BrandMark, EndpointSvg, HeroDrawing, PayoffSvg, Swatch } from './lines';
import { meta } from './meta';
import { Spine } from './spine';
import styles from './two-lines.module.css';

export const metadata: Metadata = labPageMetadata(meta);

// Variant 6, Two Lines. Chronology first: Donato is a solid line, Nicolo a
// dashed line, shared work carries both. The lines start apart in the hero,
// run down the timeline spine, meet in the shared card and end in one point,
// the email. Every fact comes from ../_kit; the words here are interface only.

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

const NAV = [
  { href: '#brothers', label: 'Brothers' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#work', label: 'Work' },
  { href: '#numbers', label: 'Numbers' },
  { href: '#areas', label: 'Areas' },
  { href: '#contact', label: 'Contact' },
];

const LINE_WORD: Record<Credit, string> = { donato: 'Solid line', nicolo: 'Dashed line', both: 'Both lines' };

function Ext({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a className={styles.ext} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
      {children}
      <span className={styles.arrow} aria-hidden="true">
        {'↗'}
      </span>
    </a>
  );
}

function CreditLine({ who, children }: { who: Credit; children: ReactNode }) {
  return (
    <p className={styles.credit}>
      <Swatch who={who} />
      <span>{children}</span>
    </p>
  );
}

function Legend() {
  return (
    <ul className={styles.legend} aria-label="Line key">
      {(['donato', 'nicolo', 'both'] as const).map((w) => (
        <li key={w}>
          <Swatch who={w} />
          {creditLabel[w]}
        </li>
      ))}
    </ul>
  );
}

function SectionHead({ id, title, note }: { id: string; title: string; note?: ReactNode }) {
  return (
    <div className={styles.sectionHead}>
      <h2 id={id} className={styles.h2}>
        {title}
      </h2>
      {note && <div className={styles.headNote}>{note}</div>}
    </div>
  );
}

function Stack({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.slashList} aria-label="Stack">
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ p }: { p: Project }) {
  if (!p.links?.length) return null;
  return (
    <ul className={styles.links}>
      {p.links.map((l) => (
        <li key={l.href}>
          <Ext href={l.href} label={`${p.title}: ${l.label}`}>
            {l.label}
          </Ext>
        </li>
      ))}
    </ul>
  );
}

// --- C: the brothers ---------------------------------------------------------

function BrotherCard({ b }: { b: Brother }) {
  return (
    <article className={styles.brother} aria-labelledby={`l6-${b.key}`}>
      <div className={styles.brotherRule}>
        <span className={cx(styles.rule, styles.ruleThick)} data-who={b.key} aria-hidden="true" />
        <span className={styles.ruleWord}>{LINE_WORD[b.key]}</span>
      </div>
      <div className={styles.brotherHead}>
        <div className={styles.photoWrap}>
          <Image src={b.photo} alt={b.photoAlt} className={styles.photo} sizes="(min-width: 960px) 144px, 88px" />
        </div>
        <div>
          <h3 id={`l6-${b.key}`} className={styles.brotherName}>
            {b.name}
          </h3>
          <p className={styles.brotherTitle}>{b.title}</p>
        </div>
      </div>
      <p className={styles.now}>
        <span className={styles.nowTag}>Now</span>
        <span>
          {b.now} at {b.nowOrg}, since {b.nowSince}
        </span>
      </p>
      <div className={styles.bio}>
        {b.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className={styles.block}>
        <h4 className={styles.label}>Focus</h4>
        <ul className={styles.slashList}>
          {b.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
      <div className={styles.block}>
        <h4 className={styles.label}>In numbers</h4>
        <ul className={styles.bStats}>
          {b.stats.map((s) => (
            <li key={s.label}>
              <span className={styles.bStatValue}>{s.value}</span>
              <span className={styles.bStatLabel}>{s.label}</span>
              {s.note && <span className={styles.bStatNote}>{s.note}</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.block}>
        <h4 className={styles.label}>Education</h4>
        <ul className={styles.edu}>
          {b.education.map((ed) => (
            <li key={ed.degree}>
              <span className={styles.eduDegree}>{ed.degree}</span>
              <span>{ed.school}</span>
              <span className={styles.eduWhen}>{ed.when}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.block}>
        <h4 className={styles.label}>Links</h4>
        <ul className={styles.links}>
          {b.links.map((l) => (
            <li key={l.href}>
              <Ext href={l.href} label={`${b.first}: ${l.label}`}>
                {l.label}
              </Ext>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// --- D: featured work --------------------------------------------------------

function SharedCard({ p, tag }: { p: Project; tag?: ReactNode }) {
  return (
    <article className={styles.shared} aria-labelledby={`l6-p-${p.id}`}>
      {tag}
      <span className={cx(styles.rule, styles.ruleThick)} data-who="both" aria-hidden="true" />
      <div className={styles.sharedGrid}>
        <div className={styles.sharedText}>
          <p className={styles.eyebrow}>Where the lines meet</p>
          <p className={styles.kind}>
            {p.kind}
            {p.org && <span> · {p.org}</span>}
          </p>
          <h3 id={`l6-p-${p.id}`} className={styles.sharedTitle}>
            {p.title}
          </h3>
          <CreditLine who={p.credit}>{p.creditLine}</CreditLine>
          <p className={styles.sharedSummary}>{p.summary}</p>
          <p className={styles.sharedBody}>{p.body}</p>
          <Stack items={p.stack} />
          <ProjectLinks p={p} />
        </div>
        <div className={styles.sharedVisual}>
          <PayoffSvg />
          {p.metric && (
            <p className={styles.sharedMetric}>
              <mark className={styles.bigMark}>{p.metric.value}</mark>
              <span className={styles.sharedMetricLabel}>{p.metric.label}</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ p, tag }: { p: Project; tag?: ReactNode }) {
  return (
    <article className={styles.card} aria-labelledby={`l6-p-${p.id}`}>
      {tag}
      <span className={styles.rule} data-who={p.credit} aria-hidden="true" />
      <p className={styles.kind}>
        {p.kind}
        {p.org && <span> · {p.org}</span>}
      </p>
      <h3 id={`l6-p-${p.id}`} className={styles.cardTitle}>
        {p.title}
      </h3>
      <CreditLine who={p.credit}>{p.creditLine}</CreditLine>
      <p className={styles.cardSummary}>{p.summary}</p>
      {p.metric && (
        <p className={styles.metric}>
          <span className={styles.metricValue}>{p.metric.value}</span>
          <span className={styles.metricLabel}>{p.metric.label}</span>
        </p>
      )}
      <Stack items={p.stack} />
      <ProjectLinks p={p} />
    </article>
  );
}

export default function LabVariant6Page() {
  const shared = featuredProjects.filter((p) => p.credit === 'both');
  const solo = (['donato', 'nicolo'] as const)
    .map((who) => ({ who, items: featuredProjects.filter((p) => p.credit === who) }))
    .filter((g) => g.items.length);
  const firstSolo = solo[0]?.items[0];

  return (
    <div className={cx(styles.root, archivo.variable)}>
      {/* A: header */}
      <header className={styles.header}>
        <div className={styles.wrap}>
          <LabTag id="6A" label="Header" />
          <div className={styles.headerRow}>
            <a className={styles.brand} href="#top">
              <BrandMark />
              <span>{site.name}</span>
            </a>
            <nav className={styles.nav} aria-label="Sections">
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <a className={styles.headerEmail} href={site.emailHref}>
              {site.email}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* B: hero */}
        <section id="top" className={styles.hero} aria-labelledby="l6-h1">
          <div className={styles.wrap}>
            <LabTag id="6B" label="Hero" />
            <div className={styles.heroText}>
              <p className={styles.location}>{site.location}</p>
              <h1 id="l6-h1" className={styles.h1}>
                {site.headline}
              </h1>
              <p className={styles.lede}>{site.lede}</p>
            </div>
            <figure className={styles.heroFigure}>
              <HeroDrawing />
              <figcaption className={styles.caption}>
                <Legend />
                <span>Each dot is an entry on the timeline below. Yellow marks where the lines meet, and now.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* C: the brothers */}
        <section id="brothers" className={styles.section} aria-labelledby="l6-brothers">
          <div className={styles.wrap}>
            <LabTag id="6C" label="The brothers" />
            <SectionHead id="l6-brothers" title="The brothers" note="Two lines, introduced. The solid one is Donato, the dashed one is Nicolo." />
            <div className={styles.brothers}>
              {brothers.map((b) => (
                <BrotherCard key={b.key} b={b} />
              ))}
            </div>
          </div>
        </section>

        {/* H: timeline, the spine */}
        <section id="timeline" className={styles.section} aria-labelledby="l6-timeline">
          <div className={styles.wrap}>
            <LabTag id="6H" label="Timeline" />
            <SectionHead
              id="l6-timeline"
              title="Timeline"
              note={
                <>
                  <p>Oldest first. Every entry sits on its own line.</p>
                  <Legend />
                </>
              }
            />
            <Spine />
          </div>
        </section>

        {/* D: featured work */}
        <section id="work" className={styles.section} aria-labelledby="l6-work">
          <div className={styles.wrap}>
            <LabTag id="6D" label="Featured work" />
            <SectionHead id="l6-work" title="Featured work" note="Each piece keeps the line of the one who built it. A doubled line is shared." />
            {shared.map((p, i) => (
              <SharedCard key={p.id} p={p} tag={i === 0 ? <LabTag id="6K" label="Shared card" /> : undefined} />
            ))}
            {solo.map((g) => (
              <div key={g.who} className={styles.group}>
                <p className={styles.groupHead}>
                  <Swatch who={g.who} />
                  <span>{creditLabel[g.who]}</span>
                </p>
                <div className={styles.cards}>
                  {g.items.map((p) => (
                    <ProjectCard
                      key={p.id}
                      p={p}
                      tag={p === firstSolo ? <LabTag id="6L" label="Work card" /> : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* E: more work */}
        <section id="more" className={styles.section} aria-labelledby="l6-more">
          <div className={styles.wrap}>
            <LabTag id="6E" label="More work" />
            <SectionHead id="l6-more" title="More work" />
            <ul className={styles.moreList}>
              {otherProjects.map((p) => (
                <li key={p.id} className={styles.moreRow}>
                  <Swatch who={p.credit} />
                  <div className={styles.moreHead}>
                    <h3 className={styles.moreTitle}>{p.title}</h3>
                    <p className={styles.kind}>
                      {p.kind}
                      {p.org && <span> · {p.org}</span>}
                    </p>
                  </div>
                  <p className={styles.moreSummary}>{p.summary}</p>
                  <div className={styles.moreMeta}>
                    {p.metric && (
                      <p className={styles.moreMetric}>
                        <span className={styles.metricValue}>{p.metric.value}</span>{' '}
                        <span className={styles.metricLabel}>{p.metric.label}</span>
                      </p>
                    )}
                    <p className={styles.moreCredit}>{p.creditLine}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* F: by the numbers */}
        <section id="numbers" className={styles.section} aria-labelledby="l6-numbers">
          <div className={styles.wrap}>
            <LabTag id="6F" label="By the numbers" />
            <SectionHead id="l6-numbers" title="By the numbers" note="Each number keeps the line of the work it comes from." />
            <ul className={styles.stats}>
              {headlineStats.map((s) => (
                <li key={s.label} className={styles.stat}>
                  <p className={styles.statValue}>
                    <mark className={styles.mark}>{s.value}</mark>
                  </p>
                  <p className={styles.statLabel}>{s.label}</p>
                  {s.note && <p className={styles.statNote}>{s.note}</p>}
                  <CreditLine who={s.who}>{creditLabel[s.who]}</CreditLine>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* G: what we work on */}
        <section id="areas" className={styles.section} aria-labelledby="l6-areas">
          <div className={styles.wrap}>
            <LabTag id="6G" label="What we work on" />
            <SectionHead id="l6-areas" title="What we work on" note="Credited by line." />
            <ul className={styles.areas}>
              {areas.map((a) => (
                <li key={a.id} className={styles.area}>
                  <Swatch who={a.who} />
                  <div>
                    <p className={styles.areaCredit}>{creditLabel[a.who]}</p>
                    <h3 className={styles.areaTitle}>{a.title}</h3>
                    <p className={styles.areaLine}>{a.line}</p>
                    <p className={styles.areaProof}>
                      <span className={styles.areaProofLabel}>Seen in</span> {a.proof}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* I: contact */}
        <section id="contact" className={styles.contact} aria-labelledby="l6-contact">
          <div className={styles.wrap}>
            <LabTag id="6I" label="Contact" />
            <h2 id="l6-contact" className={styles.contactHead}>
              {site.contactHeadline}
            </h2>
            <p className={styles.contactLine}>{site.contactLine}</p>
            <p className={styles.endpoint}>
              <EndpointSvg />
              <a className={styles.email} href={site.emailHref}>
                {site.email}
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* J: footer */}
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <LabTag id="6J" label="Footer" />
          <div className={styles.footRow}>
            <p className={styles.footBrand}>
              <BrandMark />
              <span>{site.name}</span>
            </p>
            <p>{site.location}</p>
            <a className={styles.footEmail} href={site.emailHref}>
              {site.email}
            </a>
            <p>
              {'©'} {site.year}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
