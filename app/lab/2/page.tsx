import type { Metadata } from 'next';
import Image from 'next/image';
import {
  LabTag,
  labPageMetadata,
  site,
  brothers,
  donato,
  nicolo,
  creditLabel,
  headlineStats,
  areas,
  featuredProjects,
  otherProjects,
  timelineAscending,
  type Brother,
  type BrotherKey,
  type Credit,
  type Link as KitLink,
  type Project,
  type TimelineEntry,
  type TimelineKind,
} from '../_kit';
import { fraunces, hanken } from './fonts';
import { meta } from './meta';
import s from './two-halves.module.css';

export const metadata: Metadata = labPageMetadata(meta);

// Variant 2, Two Halves: the page is split by brother. Donato owns the left
// and ocean blue, Nicolo the right and ember; anything credited to both sits
// on the seam between them and wears both colors.

const tone: Record<Credit, string> = { donato: s.toneD, nicolo: s.toneN, both: s.toneB };
const side: Record<BrotherKey, string> = { donato: s.sideD, nicolo: s.sideN };
const SIDES: readonly BrotherKey[] = ['donato', 'nicolo'];
const CREDIT_ORDER: readonly Credit[] = ['donato', 'both', 'nicolo'];

const NAV = [
  { href: '#brothers', label: 'The brothers' },
  { href: '#work', label: 'Work' },
  { href: '#numbers', label: 'Numbers' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#contact', label: 'Contact' },
] as const;

const KIND_WORD: Record<TimelineKind, string | null> = {
  work: null,
  education: 'Education',
  milestone: 'Milestone',
};

function initialsFor(credit: Credit): string {
  if (credit === 'donato') return donato.initial;
  if (credit === 'nicolo') return nicolo.initial;
  return `${donato.initial}${nicolo.initial}`;
}

function Mark({ who, className }: { who: Credit; className?: string }) {
  return <span className={`${s.mark} ${tone[who]} ${className ?? ''}`} aria-hidden="true" />;
}

function Out({ link, className, owner }: { link: KitLink; className?: string; owner?: string }) {
  const named = owner ? `${link.label} (${owner})` : link.label;
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? s.textLink}
      aria-label={`${named} (opens in a new tab)`}
    >
      {link.label}
    </a>
  );
}

function BrandMark() {
  return (
    <span className={s.brandMark} aria-hidden="true">
      <span>{donato.initial}</span>
      <span>{nicolo.initial}</span>
    </span>
  );
}

function KindRow({ p }: { p: Project }) {
  return (
    <p className={s.kindRow}>
      <span>{p.kind}</span>
      {p.org ? <span className={s.org}>{p.org}</span> : null}
    </p>
  );
}

function Stack({ items }: { items: readonly string[] }) {
  return (
    <p className={s.stack}>
      <span className={s.stackLabel}>Built with</span> {items.join(', ')}
    </p>
  );
}

function LinkRow({ links }: { links: readonly KitLink[] }) {
  return (
    <ul className={s.linkRow}>
      {links.map((l) => (
        <li key={l.href}>
          <Out link={l} />
        </li>
      ))}
    </ul>
  );
}

// --- Hero ------------------------------------------------------------------

function Half({ b }: { b: Brother }) {
  return (
    <div className={`${s.half} ${tone[b.key]} ${b.key === 'donato' ? s.halfD : s.halfN}`}>
      <div className={s.halfInner}>
        <div className={s.portrait}>
          <Image
            src={b.photo}
            alt={b.photoAlt}
            sizes="(min-width: 720px) 168px, 76px"
            className={s.portraitImg}
            priority
          />
        </div>
        <div className={s.halfText}>
          <p className={s.first}>{b.first}</p>
          <p className={s.halfTitle}>{b.title}</p>
        </div>
      </div>
    </div>
  );
}

// --- The brothers ----------------------------------------------------------

function BrotherColumn({ b }: { b: Brother }) {
  return (
    <article className={`${s.bro} ${tone[b.key]} ${side[b.key]}`} aria-labelledby={`bro-${b.key}`}>
      <div className={s.broInner}>
        <h3 id={`bro-${b.key}`} className={s.broName}>
          {b.name}
        </h3>
        <p className={s.broTitle}>{b.title}</p>
        <p className={s.broNow}>
          <span className={s.nowTag}>Now</span>
          <span>
            {b.now} at {b.nowOrg}, since {b.nowSince}
          </span>
        </p>

        <div className={s.bio}>
          {b.bio.map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
        </div>

        <ul className={s.broStats}>
          {b.stats.map((st) => (
            <li key={st.label} className={s.broStat}>
              <span className={s.broStatValue}>{st.value}</span>
              <span className={s.broStatLabel}>{st.label}</span>
              {st.note ? <span className={s.broStatNote}>{st.note}</span> : null}
            </li>
          ))}
        </ul>

        <h4 className={s.h4}>Focus</h4>
        <ul className={s.pills}>
          {b.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h4 className={s.h4}>Education</h4>
        <ul className={s.edu}>
          {b.education.map((e) => (
            <li key={`${e.degree}-${e.when}`}>
              <span className={s.eduDegree}>{e.degree}</span>
              <span className={s.eduWhen}>{e.when}</span>
              <span className={s.eduSchool}>{e.school}</span>
            </li>
          ))}
        </ul>

        <h4 className={s.h4}>Find {b.first}</h4>
        <ul className={s.broLinks}>
          {b.links.map((l) => (
            <li key={l.href}>
              <Out link={l} owner={b.first} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// --- Work ------------------------------------------------------------------

function SeamCard({ p, tagged }: { p: Project; tagged: boolean }) {
  return (
    <article className={s.seamCard} aria-labelledby={`p-${p.id}`}>
      {tagged ? <LabTag id="2K" label="Seam card" /> : null}
      <KindRow p={p} />
      <h3 id={`p-${p.id}`} className={s.seamTitle}>
        {p.title}
      </h3>
      <p className={s.splitPill}>{p.creditLine}</p>
      {p.metric ? (
        <p className={s.seamMetric}>
          <span className={s.splitValue}>{p.metric.value}</span>
          <span className={s.seamMetricLabel}>{p.metric.label}</span>
        </p>
      ) : null}
      <p className={s.seamSummary}>{p.summary}</p>
      <p className={s.seamBody}>{p.body}</p>
      <div className={s.seamFoot}>
        <Stack items={p.stack} />
        {p.links ? <LinkRow links={p.links} /> : null}
      </div>
    </article>
  );
}

function WorkCard({ p, tagged }: { p: Project; tagged: boolean }) {
  return (
    <article className={`${s.card} ${tone[p.credit]}`} aria-labelledby={`p-${p.id}`}>
      {tagged ? (
        <div className={s.cardTag}>
          <LabTag id="2L" label="Credit band card" />
        </div>
      ) : null}
      <p className={s.band}>
        <span className={s.bandMark} aria-hidden="true">
          {initialsFor(p.credit)}
        </span>
        <span>{p.creditLine}</span>
      </p>
      <div className={s.cardBody}>
        <KindRow p={p} />
        <h3 id={`p-${p.id}`} className={s.cardTitle}>
          {p.title}
        </h3>
        {p.metric ? (
          <p className={s.metric}>
            <span className={s.metricValue}>{p.metric.value}</span>
            <span className={s.metricLabel}>{p.metric.label}</span>
          </p>
        ) : null}
        <p className={s.summary}>{p.summary}</p>
        <p className={s.bodyText}>{p.body}</p>
        <div className={s.cardFoot}>
          <Stack items={p.stack} />
          {p.links ? <LinkRow links={p.links} /> : null}
          {p.pending ? (
            <p className={s.pending}>
              <span className={s.stackLabel}>Lab note</span> {p.pending}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

// --- Timeline --------------------------------------------------------------

type YearRow = { year: string; donato: TimelineEntry[]; nicolo: TimelineEntry[] };

function byYear(entries: readonly TimelineEntry[]): YearRow[] {
  const rows: YearRow[] = [];
  for (const e of entries) {
    const year = e.start.slice(0, 4);
    let row = rows.find((r) => r.year === year);
    if (!row) {
      row = { year, donato: [], nicolo: [] };
      rows.push(row);
    }
    row[e.who].push(e);
  }
  return rows;
}

function Entry({ e }: { e: TimelineEntry }) {
  const kind = KIND_WORD[e.kind];
  return (
    <li className={`${s.tlEntry} ${tone[e.who]} ${e.who === 'donato' ? s.tlEntryD : s.tlEntryN}`}>
      <p className={s.tlMeta}>
        <span className={s.tlWho}>{creditLabel[e.who]}</span>
        <span>{e.when}</span>
        {kind ? <span className={s.tlKind}>{kind}</span> : null}
        {e.current ? <span className={s.tlNow}>Now</span> : null}
      </p>
      <p className={s.tlTitle}>{e.title}</p>
      <p className={s.tlOrg}>{e.org}</p>
      {e.note ? <p className={s.tlNote}>{e.note}</p> : null}
    </li>
  );
}

// --- Page ------------------------------------------------------------------

export default function LabVariant2Page() {
  const sharedWork = featuredProjects.filter((p) => p.credit === 'both');
  const sharedOther = otherProjects.filter((p) => p.credit === 'both');
  const stats = CREDIT_ORDER.flatMap((who) => headlineStats.filter((st) => st.who === who));
  const statPlace: Record<Credit, string> = { donato: s.numD, both: s.numB, nicolo: s.numN };
  const years = byYear(timelineAscending);

  return (
    <div id="top" className={`${s.root} ${fraunces.variable} ${hanken.variable}`}>
      <a href="#main" className={s.skip}>
        Skip to content
      </a>

      {/* A: header */}
      <header className={s.header}>
        <div className={s.container}>
          <LabTag id="2A" label="Header" />
          <div className={s.headerRow}>
            <a href="#top" className={s.brand}>
              <BrandMark />
              <span>{site.name}</span>
            </a>
            <nav className={s.nav} aria-label="Sections">
              <ul className={s.navList}>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
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

      <main id="main">
        {/* B: hero */}
        <section className={s.hero} aria-labelledby="hero-title">
          <div className={s.tagSlot}>
            <LabTag id="2B" label="Hero" />
          </div>
          <div className={s.halves}>
            {brothers.map((b) => (
              <Half key={b.key} b={b} />
            ))}
          </div>
          <div className={s.heroBand}>
            <h1 id="hero-title" className={s.headline}>
              {site.headline}
            </h1>
            <p className={s.lede}>{site.lede}</p>
            <p className={s.location}>
              <Mark who="both" />
              {site.location}
            </p>
          </div>
        </section>

        {/* C: the brothers */}
        <section id="brothers" className={s.brosSection} aria-labelledby="brothers-title">
          <div className={s.container}>
            <LabTag id="2C" label="The brothers" />
            <h2 id="brothers-title" className={s.h2}>
              The brothers
            </h2>
          </div>
          <div className={s.bros}>
            {brothers.map((b) => (
              <BrotherColumn key={b.key} b={b} />
            ))}
          </div>
        </section>

        {/* D: featured work */}
        <section id="work" className={s.section} aria-labelledby="work-title">
          <div className={s.container}>
            <LabTag id="2D" label="Featured work" />
            <h2 id="work-title" className={s.h2}>
              Featured work
            </h2>
            <ul className={s.legend} aria-label="Color key">
              {CREDIT_ORDER.map((who) => (
                <li key={who}>
                  <Mark who={who} />
                  {creditLabel[who]}
                </li>
              ))}
            </ul>
            <div className={s.workGrid}>
              {sharedWork.map((p, i) => (
                <SeamCard key={p.id} p={p} tagged={i === 0} />
              ))}
              {SIDES.map((who) => (
                <div key={who} className={`${s.workSide} ${side[who]}`}>
                  {featuredProjects
                    .filter((p) => p.credit === who)
                    .map((p, i) => (
                      <WorkCard key={p.id} p={p} tagged={who === 'donato' && i === 0} />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* E: more work */}
        <section id="more-work" className={`${s.section} ${s.sectionTight}`} aria-labelledby="more-title">
          <div className={s.container}>
            <LabTag id="2E" label="More work" />
            <h2 id="more-title" className={s.h2}>
              More work
            </h2>
            {sharedOther.length > 0 ? (
              <ul className={`${s.moreList} ${s.moreShared}`}>
                {sharedOther.map((p) => (
                  <li key={p.id} className={s.moreItem}>
                    <h3 className={s.moreTitle}>{p.title}</h3>
                    <p className={s.moreCredit}>{p.creditLine}</p>
                    <p className={s.moreSummary}>{p.summary}</p>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className={s.moreGrid}>
              {SIDES.map((who) => (
                <div key={who} className={`${s.moreCol} ${tone[who]}`}>
                  <h3 className={s.moreHead}>
                    <Mark who={who} className={s.markLg} />
                    {creditLabel[who]}
                  </h3>
                  <ul className={s.moreList}>
                    {otherProjects
                      .filter((p) => p.credit === who)
                      .map((p) => (
                        <li key={p.id} className={s.moreItem}>
                          <h4 className={s.moreTitle}>{p.title}</h4>
                          <KindRow p={p} />
                          <p className={s.moreSummary}>{p.summary}</p>
                          {p.metric ? (
                            <p className={s.moreFig}>
                              <span className={s.moreFigValue}>{p.metric.value}</span>
                              <span>{p.metric.label}</span>
                            </p>
                          ) : null}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* F: by the numbers */}
        <section id="numbers" className={`${s.section} ${s.numbersSection}`} aria-labelledby="numbers-title">
          <div className={s.container}>
            <LabTag id="2F" label="By the numbers" />
            <h2 id="numbers-title" className={s.h2}>
              By the numbers
            </h2>
            <ul className={s.numbers}>
              {stats.map((st) => (
                <li key={st.label} className={`${s.num} ${tone[st.who]} ${statPlace[st.who]}`}>
                  <span className={`${s.numValue} ${st.who === 'both' ? s.splitText : ''}`}>{st.value}</span>
                  <span className={s.numLabel}>{st.label}</span>
                  {st.note ? <span className={s.numNote}>{st.note}</span> : null}
                  <span className={s.numWho}>
                    <Mark who={st.who} />
                    {creditLabel[st.who]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* G: what we work on */}
        <section id="areas" className={s.section} aria-labelledby="areas-title">
          <div className={s.container}>
            <LabTag id="2G" label="What we work on" />
            <h2 id="areas-title" className={s.h2}>
              What we work on
            </h2>
            <ul className={s.areas}>
              {areas.map((a) => (
                <li key={a.id} className={`${s.area} ${tone[a.who]}`}>
                  <p className={s.areaWho}>
                    <Mark who={a.who} className={s.markXl} />
                    {creditLabel[a.who]}
                  </p>
                  <h3 className={s.areaTitle}>{a.title}</h3>
                  <p className={s.areaLine}>{a.line}</p>
                  <p className={s.areaProof}>
                    <span className={s.stackLabel}>Seen in</span> {a.proof}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* H: timeline */}
        <section id="timeline" className={`${s.section} ${s.sectionTight}`} aria-labelledby="timeline-title">
          <div className={s.container}>
            <LabTag id="2H" label="Timeline" />
            <h2 id="timeline-title" className={s.h2}>
              How we got here
            </h2>
            <div className={s.tl}>
              <div className={s.tlHeads} aria-hidden="true">
                <span className={`${s.tlHead} ${s.toneD}`}>{donato.first}</span>
                <span />
                <span className={`${s.tlHead} ${s.toneN}`}>{nicolo.first}</span>
              </div>
              {years.map((row) => (
                <div key={row.year} className={s.tlRow}>
                  <h3 className={s.tlYear}>{row.year}</h3>
                  {SIDES.map((who) =>
                    row[who].length > 0 ? (
                      <ul key={who} className={`${s.tlLane} ${who === 'donato' ? s.tlLaneD : s.tlLaneN}`}>
                        {row[who].map((e) => (
                          <Entry key={`${e.who}-${e.start}-${e.title}`} e={e} />
                        ))}
                      </ul>
                    ) : null,
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* I: contact */}
        <section id="contact" className={s.contact} aria-labelledby="contact-title">
          <div className={`${s.container} ${s.contactInner}`}>
            <LabTag id="2I" label="Contact" />
            <h2 id="contact-title" className={s.contactHead}>
              {site.contactHeadline}
            </h2>
            <p className={s.contactLine}>{site.contactLine}</p>
            <a href={site.emailHref} className={s.emailCapsule}>
              {site.email}
            </a>
          </div>
        </section>
      </main>

      {/* J: footer */}
      <footer className={s.footer}>
        <div className={s.container}>
          <LabTag id="2J" label="Footer" />
          <div className={s.footRow}>
            <p className={s.footBrand}>
              <BrandMark />
              <span>{site.name}</span>
            </p>
            <p>{site.tagline}</p>
            <p>
              &copy; {site.year} {site.name}, {site.location}
            </p>
            <a href={site.emailHref} className={s.headerEmail}>
              {site.email}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
