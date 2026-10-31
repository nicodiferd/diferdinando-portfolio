import type { Metadata } from 'next';
import Image from 'next/image';
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
  timeline,
  type Brother,
  type BrotherKey,
  type Credit,
  type Link,
  type Project,
  type TimelineEntry,
} from '../_kit';
import { ledgerMono, ledgerSans } from './fonts';
import { meta } from './meta';
import s from './ledger.module.css';

export const metadata: Metadata = labPageMetadata(meta);

// Variant 1, Ledger. Every fact is a row: a key in mono, a value in Inter
// Tight, a hairline above. Numbers are set large in mono. The one red marks
// what is current, the featured metrics, and hover and focus.

const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(' ');
const pad = (n: number) => String(n).padStart(2, '0');
/** A lab tag id for this variant, such as the hero's B. */
const tag = (letter: string) => `${meta.n}${letter}`;

const NAV = [
  { href: '#brothers', label: 'Brothers' },
  { href: '#work', label: 'Work' },
  { href: '#numbers', label: 'Numbers' },
  { href: '#areas', label: 'Areas' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#contact', label: 'Contact' },
] as const;

/** A figure with its digits set large and any word in it set small. */
function Figure({ value }: { value: string }) {
  const parts = value.split(' ');
  return (
    <span className={s.figure}>
      {parts.map((part, i) => (
        <span key={i} className={s.figurePart}>
          {i > 0 ? <span className={s.figureUnit}> </span> : null}
          <span className={/\d/.test(part) ? s.figureNum : s.figureUnit}>{part}</span>
        </span>
      ))}
    </span>
  );
}

/** Who did it, as the two initials with the credited ones set in ink. */
function CreditMarks({ credit }: { credit: Credit }) {
  return (
    <span className={s.marks} aria-hidden="true">
      {brothers.map((b) => (
        <span key={b.key} className={credit === 'both' || credit === b.key ? s.markOn : s.markOff}>
          {b.initial}
        </span>
      ))}
    </span>
  );
}

function OutLink({ link, owner }: { link: Link; owner?: string }) {
  return (
    <a className={s.outLink} href={link.href} target="_blank" rel="noopener noreferrer">
      {link.label}
      {owner ? <span className={s.srOnly}>, {owner}</span> : null}
      <span className={s.arrow} aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

function SectionHead({
  id,
  index,
  kicker,
  title,
  aside,
}: {
  id: string;
  index: number;
  kicker: string;
  title: string;
  aside?: string;
}) {
  return (
    <header className={s.sectionHead}>
      <p className={s.sectionIndex}>
        <span className={s.sectionNo}>{pad(index)}</span> {kicker}
      </p>
      <h2 id={id} className={s.sectionTitle}>
        {title}
      </h2>
      {aside ? <p className={s.sectionAside}>{aside}</p> : null}
    </header>
  );
}

// --- C: one brother's ledger ------------------------------------------------

function BrotherLedger({ b, tagStats }: { b: Brother; tagStats: boolean }) {
  return (
    <article className={s.brother} aria-labelledby={`l1-${b.key}`}>
      <div className={s.brotherHead}>
        <Image
          src={b.photo}
          alt={b.photoAlt}
          className={s.photo}
          sizes="(min-width: 900px) 128px, 88px"
          placeholder="blur"
        />
        <div>
          <h3 id={`l1-${b.key}`} className={s.brotherName}>
            {b.name}
          </h3>
          <p className={s.brotherTitle}>{b.title}</p>
        </div>
      </div>

      <p className={s.brotherShort}>{b.short}</p>

      <dl className={s.ledger}>
        <div className={s.ledgerRow}>
          <dt className={s.key}>Now</dt>
          <dd>
            <span className={s.nowDot} aria-hidden="true" />
            {b.now} <span className={s.muted}>at</span> {b.nowOrg}
          </dd>
        </div>
        <div className={s.ledgerRow}>
          <dt className={s.key}>Since</dt>
          <dd className={s.monoValue}>{b.nowSince}</dd>
        </div>
        <div className={s.ledgerRow}>
          <dt className={s.key}>Focus</dt>
          <dd>
            <ul className={s.slashList}>
              {b.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={s.ledgerRow}>
          <dt className={s.key}>Education</dt>
          <dd>
            <ul className={s.stackedList}>
              {b.education.map((e) => (
                <li key={e.degree + e.school}>
                  {e.degree}
                  <span className={s.subValue}>
                    {e.school}, <span className={s.monoInline}>{e.when}</span>
                  </span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={s.ledgerRow}>
          <dt className={s.key}>Links</dt>
          <dd>
            <ul className={s.stackedList}>
              {b.links.map((l) => (
                <li key={l.href}>
                  <OutLink link={l} owner={b.first} />
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <div className={s.statsWrap}>
        {tagStats ? <LabTag id={tag('L')} label="Stat block" /> : null}
        <ul className={s.stats}>
          {b.stats.map((st) => (
            <li key={st.label} className={s.stat}>
              <span className={s.statValue}>
                <Figure value={st.value} />
              </span>
              <span className={s.statLabel}>{st.label}</span>
              {st.note ? <span className={s.statNote}>{st.note}</span> : null}
            </li>
          ))}
        </ul>
      </div>

      <details className={s.bio}>
        <summary className={s.bioSummary}>
          <span>Full bio</span>
          <span className={s.bioIcon} aria-hidden="true">
            +
          </span>
        </summary>
        <div className={s.bioBody}>
          {b.bio.map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
        </div>
      </details>
    </article>
  );
}

// --- D: one featured project as a ledger row -------------------------------

function ProjectRow({ p, n }: { p: Project; n: number }) {
  const links = p.links ?? [];
  return (
    <article className={s.row} aria-labelledby={`l1-p-${p.id}`}>
      <p className={s.rowNo}>{pad(n)}</p>
      <div className={s.rowMain}>
        <p className={s.rowKind}>
          {p.kind}
          {p.org ? (
            <>
              <span aria-hidden="true"> · </span>
              <span className={s.srOnly}>, </span>
              {p.org}
            </>
          ) : null}
        </p>
        <h3 id={`l1-p-${p.id}`} className={s.rowTitle}>
          {p.title}
        </h3>
        <p className={s.rowSummary}>{p.summary}</p>
        <ul className={s.stack} aria-label={`${p.title} stack`}>
          {p.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {p.pending ? (
          <p className={s.pending}>
            <span className={s.pendingKey}>Draft</span> {p.pending}
          </p>
        ) : null}
      </div>

      <div className={cx(s.cell, s.rowCredit)}>
        <span className={s.cellKey}>Credit</span>
        <span className={s.cellValue}>
          <CreditMarks credit={p.credit} />
          <span className={p.credit === 'both' ? s.creditShared : undefined}>{p.creditLine}</span>
        </span>
      </div>

      {p.metric ? (
        <div className={cx(s.cell, s.rowMetric)}>
          <span className={s.cellKey}>Metric</span>
          <span className={s.cellValue}>
            <span className={s.metricValue}>
              <Figure value={p.metric.value} />
            </span>
            <span className={s.metricLabel}>{p.metric.label}</span>
          </span>
        </div>
      ) : null}

      {links.length ? (
        <div className={cx(s.cell, s.rowLinks)}>
          <span className={s.cellKey}>Links</span>
          <ul className={cx(s.cellValue, s.stackedList)}>
            {links.map((l) => (
              <li key={l.href}>
                <OutLink link={l} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

// --- H: the timeline, grouped by year, newest first ------------------------

const timelineDesc: readonly TimelineEntry[] = [...timeline].sort((a, b) => b.start.localeCompare(a.start));
const years: readonly string[] = Array.from(new Set(timelineDesc.map((t) => t.start.slice(0, 4))));
const entriesFor = (year: string, who: BrotherKey) =>
  timelineDesc.filter((t) => t.who === who && t.start.startsWith(year));

function TimelineItem({ t, b }: { t: TimelineEntry; b: Brother }) {
  return (
    <li className={s.tlEntry}>
      <p className={s.tlWho}>
        <span className={s.srOnly}>{b.first}: </span>
        <span aria-hidden="true">{b.first}</span>
      </p>
      <div className={s.tlBody}>
        <p className={s.tlWhen}>
          {t.current ? (
            <span className={s.nowMark}>
              <span className={s.nowDot} aria-hidden="true" />
              Now
            </span>
          ) : null}
          <span>{t.when}</span>
          <span className={s.tlKind}>{t.kind}</span>
        </p>
        <p className={s.tlTitle}>{t.title}</p>
        <p className={s.tlOrg}>{t.org}</p>
        {t.note ? <p className={s.tlNote}>{t.note}</p> : null}
      </div>
    </li>
  );
}

// --- The page ----------------------------------------------------------------

export default function LabVariant1Page() {
  const [emailLocal, emailDomain] = site.email.split('@');
  const headlineEndsWithStop = site.headline.endsWith('.');
  const headlineText = headlineEndsWithStop ? site.headline.slice(0, -1) : site.headline;
  const firstYear = years[years.length - 1];
  const lastYear = years[0];

  return (
    <div id="top" className={cx(s.root, ledgerSans.variable, ledgerMono.variable)}>
      {/* A: header */}
      <header className={s.header}>
        <div className={s.wrap}>
          <LabTag id={tag('A')} label="Header" />
          <div className={s.headerBar}>
            <a href="#top" className={s.brand}>
              {site.name}
            </a>
            <nav className={s.nav} aria-label="Sections">
              <ul className={s.navList}>
                {NAV.map((item, i) => (
                  <li key={item.href}>
                    <a href={item.href} className={s.navLink}>
                      <span className={s.navNo} aria-hidden="true">
                        {pad(i + 1)}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={site.emailHref} className={s.headerEmail}>
              {site.email}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* B: hero */}
        <section className={s.hero} aria-labelledby="l1-hero">
          <div className={s.wrap}>
            <div className={s.columns} aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <LabTag id={tag('B')} label="Hero" />
            <h1 id="l1-hero" className={s.headline}>
              {headlineText}
              {headlineEndsWithStop ? <span className={s.stop}>.</span> : null}
            </h1>
            <div className={s.heroBody}>
              <p className={s.lede}>{site.lede}</p>
              <dl className={s.heroFacts}>
                <div className={s.ledgerRow}>
                  <dt className={s.key}>Based in</dt>
                  <dd>{site.location}</dd>
                </div>
                {brothers.map((b) => (
                  <div key={b.key} className={s.ledgerRow}>
                    <dt className={s.key}>{b.first}</dt>
                    <dd>{b.title}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* C: the brothers */}
        <section id="brothers" className={s.section} aria-labelledby="l1-brothers-h">
          <div className={s.wrap}>
            <LabTag id={tag('C')} label="The brothers" />
            <SectionHead
              id="l1-brothers-h"
              index={1}
              kicker="People"
              title="The brothers"
              aside={`${pad(brothers.length)} profiles, same rows`}
            />
            <div className={s.brothers}>
              {brothers.map((b, i) => (
                <BrotherLedger key={b.key} b={b} tagStats={i === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* D: featured work */}
        <section id="work" className={s.section} aria-labelledby="l1-work-h">
          <div className={s.wrap}>
            <LabTag id={tag('D')} label="Featured work" />
            <SectionHead
              id="l1-work-h"
              index={2}
              kicker="Work"
              title="Featured work"
              aside={`${pad(featuredProjects.length)} entries`}
            />
            <div className={s.tableHead} aria-hidden="true">
              <span className={s.thNo}>No.</span>
              <span className={s.thMain}>Project</span>
              <span className={s.thCredit}>Credit</span>
              <span className={s.thMetric}>Metric</span>
              <span className={s.thLinks}>Links</span>
            </div>
            <ol className={s.rows}>
              {featuredProjects.map((p, i) => (
                <li key={p.id}>
                  {i === 0 ? <LabTag id={tag('K')} label="Project row" /> : null}
                  <ProjectRow p={p} n={i + 1} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* E: more work */}
        <section className={s.section} aria-labelledby="l1-more-h">
          <div className={s.wrap}>
            <LabTag id={tag('E')} label="More work" />
            <SectionHead
              id="l1-more-h"
              index={3}
              kicker="Index"
              title="More work"
              aside={`${pad(otherProjects.length)} entries`}
            />
            <ol className={s.index}>
              {otherProjects.map((p, i) => (
                <li key={p.id} className={s.indexItem}>
                  <p className={s.indexNo}>{pad(featuredProjects.length + i + 1)}</p>
                  <div className={s.indexBody}>
                    <h3 className={s.indexTitle}>{p.title}</h3>
                    <p className={s.indexKind}>
                      {p.kind}
                      {p.org ? (
                        <>
                          <span aria-hidden="true"> · </span>
                          <span className={s.srOnly}>, </span>
                          {p.org}
                        </>
                      ) : null}
                    </p>
                    <p className={s.indexSummary}>{p.summary}</p>
                    {p.metric ? (
                      <p className={s.indexMetric}>
                        <span className={s.indexMetricValue}>
                          <Figure value={p.metric.value} />
                        </span>{' '}
                        {p.metric.label}
                      </p>
                    ) : null}
                    <p className={s.credit}>
                      <CreditMarks credit={p.credit} />
                      {p.creditLine}
                    </p>
                    {p.links?.length ? (
                      <ul className={s.inlineLinks}>
                        {p.links.map((l) => (
                          <li key={l.href}>
                            <OutLink link={l} />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* F: by the numbers */}
        <section id="numbers" className={s.section} aria-labelledby="l1-numbers-h">
          <div className={s.wrap}>
            <LabTag id={tag('F')} label="By the numbers" />
            <SectionHead
              id="l1-numbers-h"
              index={4}
              kicker="Proof"
              title="By the numbers"
              aside={`${pad(headlineStats.length)} figures`}
            />
            <ul className={s.numbers}>
              {headlineStats.map((st, i) => (
                <li key={st.label} className={s.numberCell}>
                  <p className={s.numberIndex}>{pad(i + 1)}</p>
                  <p className={s.bigFigure}>
                    <Figure value={st.value} />
                  </p>
                  <p className={s.numberLabel}>{st.label}</p>
                  {st.note ? <p className={s.numberNote}>{st.note}</p> : null}
                  <p className={s.credit}>
                    <CreditMarks credit={st.who} />
                    {creditLabel[st.who]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* G: what we work on */}
        <section id="areas" className={s.section} aria-labelledby="l1-areas-h">
          <div className={s.wrap}>
            <LabTag id={tag('G')} label="What we work on" />
            <SectionHead
              id="l1-areas-h"
              index={5}
              kicker="Practice"
              title="What we work on"
              aside={`${pad(areas.length)} areas`}
            />
            <ol className={s.areas}>
              {areas.map((a, i) => (
                <li key={a.id} className={s.area}>
                  <p className={s.areaNo}>{pad(i + 1)}</p>
                  <h3 className={s.areaTitle}>{a.title}</h3>
                  <p className={s.areaLine}>{a.line}</p>
                  <p className={s.areaProof}>
                    <span className={s.key}>Proof</span>
                    <span>{a.proof}</span>
                  </p>
                  <p className={s.credit}>
                    <CreditMarks credit={a.who} />
                    {creditLabel[a.who]}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* H: timeline */}
        <section id="timeline" className={s.section} aria-labelledby="l1-timeline-h">
          <div className={s.wrap}>
            <LabTag id={tag('H')} label="Timeline" />
            <SectionHead
              id="l1-timeline-h"
              index={6}
              kicker="Record"
              title="Timeline"
              aside={`${firstYear} to ${lastYear}, newest first`}
            />
            <div className={s.tlHead} aria-hidden="true">
              <span className={s.tlHeadYear}>Year</span>
              {brothers.map((b) => (
                <span key={b.key} className={b.key === 'donato' ? s.tlColD : s.tlColN}>
                  {b.first}
                </span>
              ))}
            </div>
            <ol className={s.tl}>
              {years.map((year) => (
                <li key={year} className={s.tlRow}>
                  <h3 className={s.tlYear}>{year}</h3>
                  {brothers.map((b) => {
                    const items = entriesFor(year, b.key);
                    const col = cx(s.tlCell, b.key === 'donato' ? s.tlColD : s.tlColN);
                    if (!items.length) return <div key={b.key} className={col} aria-hidden="true" />;
                    return (
                      <ul key={b.key} className={col}>
                        {items.map((t) => (
                          <TimelineItem key={t.start + t.title} t={t} b={b} />
                        ))}
                      </ul>
                    );
                  })}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* I: contact */}
        <section id="contact" className={s.section} aria-labelledby="l1-contact-h">
          <div className={s.wrap}>
            <LabTag id={tag('I')} label="Contact" />
            <SectionHead id="l1-contact-h" index={7} kicker="Contact" title={site.contactHeadline} />
            <div className={s.contactBody}>
              <p className={s.contactLine}>{site.contactLine}</p>
              <a href={site.emailHref} className={s.email}>
                <span className={s.emailLocal}>{emailLocal}</span>
                <wbr />
                <span className={s.emailDomain}>@{emailDomain}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* J: footer */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <LabTag id={tag('J')} label="Footer" />
          <div className={s.footerGrid}>
            <p className={s.footerName}>{site.name}</p>
            <p className={s.footerItem}>{site.location}</p>
            <a href={site.emailHref} className={s.footerItem}>
              {site.email}
            </a>
            <p className={s.footerItem}>© {site.year}</p>
            <a href="#top" className={cx(s.footerItem, s.footerTop)}>
              Top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
