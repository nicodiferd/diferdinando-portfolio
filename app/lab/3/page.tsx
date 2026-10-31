import type { Metadata } from 'next';
import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import {
  LabTag,
  areas,
  brothers,
  creditLabel,
  donato,
  featuredProjects,
  headlineStats,
  labPageMetadata,
  nicolo,
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
import { plexMono, plexSans } from './fonts';
import { meta } from './meta';
import { StatusNav, type StatusNavItem } from './status-nav';
import s from './console.module.css';

export const metadata: Metadata = labPageMetadata(meta);

// Variant 3, Console: the home page as a data engineer's tooling. A tmux
// status bar, a terminal hero, man pages, query results and a git log.
// Prompts and column names are interface words; every output is a kit string.

const NAV: readonly StatusNavItem[] = [
  { id: 'top', label: 'home' },
  { id: 'brothers', label: 'brothers' },
  { id: 'work', label: 'work' },
  { id: 'more', label: 'more' },
  { id: 'numbers', label: 'numbers' },
  { id: 'areas', label: 'areas' },
  { id: 'log', label: 'log' },
  { id: 'contact', label: 'contact' },
];

const BY_KEY: Record<BrotherKey, Brother> = { donato, nicolo };
const LANES: readonly BrotherKey[] = ['donato', 'nicolo'];
const keysOf = (who: Credit): BrotherKey[] => (who === 'both' ? ['donato', 'nicolo'] : [who]);
const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const step = (i: number) => ({ '--i': i }) as CSSProperties;

// --- Small parts -----------------------------------------------------------

function Marks({ who }: { who: Credit }) {
  return (
    <span className={s.marks} aria-hidden="true">
      {keysOf(who).map((k) => (
        <span key={k} className={s.mark} data-who={k}>
          {BY_KEY[k].initial}
        </span>
      ))}
    </span>
  );
}

function CreditTag({ who }: { who: Credit }) {
  return (
    <span className={s.credit}>
      <Marks who={who} />
      {creditLabel[who]}
    </span>
  );
}

function Open({ link }: { link: Link }) {
  return (
    <a className={s.open} href={link.href} {...external}>
      <span className={s.openArrow} aria-hidden="true">
        open -&gt;
      </span>
      <span className={s.openLabel}>{link.label}</span>
    </a>
  );
}

function Opens({ links }: { links: readonly Link[] }) {
  return (
    <ul className={s.opens}>
      {links.map((l) => (
        <li key={l.href}>
          <Open link={l} />
        </li>
      ))}
    </ul>
  );
}

function Tags({ items }: { items: readonly string[] }) {
  return (
    <ul className={s.tags}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

function Head({
  win,
  title,
  cmd,
  count,
}: {
  win: number;
  title: ReactNode;
  cmd?: string;
  count?: string;
}) {
  const id = NAV[win].id;
  return (
    <div className={s.head}>
      <div className={s.headTop} aria-hidden="true">
        <span className={s.headWin}>
          {win}:{NAV[win].label}
        </span>
        <span className={s.headRule} />
        {count && <span>{count}</span>}
      </div>
      <h2 id={`${id}-title`} className={s.h2}>
        {title}
      </h2>
      {cmd && (
        <p className={s.headCmd} aria-hidden="true">
          <span className={s.ps}>$</span> {cmd}
        </p>
      )}
    </div>
  );
}

// --- C: the brothers as man pages ------------------------------------------

function ManPage({ b, tag }: { b: Brother; tag: boolean }) {
  const page = `${b.first.toUpperCase()}(1)`;
  return (
    <article className={s.man} data-who={b.key} aria-labelledby={`man-${b.key}`}>
      {tag && <LabTag id="3K" label="Man page" />}
      <div className={s.manBar} aria-hidden="true">
        <span>{page}</span>
        <span className={s.manBarMid}>{site.name} Manual</span>
        <span>{page}</span>
      </div>
      <dl className={s.manBody}>
        <div className={s.manRow}>
          <dt>NAME</dt>
          <dd className={s.manName}>
            <Image src={b.photo} alt={b.photoAlt} width={88} height={88} className={s.photo} />
            <h3 id={`man-${b.key}`} className={s.manH3}>
              {b.name}
            </h3>
          </dd>
        </div>
        <div className={s.manRow}>
          <dt>TITLE</dt>
          <dd>{b.title}</dd>
        </div>
        <div className={s.manRow}>
          <dt>NOW</dt>
          <dd>
            {b.now} <span className={s.dim}>at</span> {b.nowOrg}
            <span className={s.dim}>, since</span> {b.nowSince}
          </dd>
        </div>
        <div className={s.manRow}>
          <dt>DESCRIPTION</dt>
          <dd className={s.prose}>
            {b.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </dd>
        </div>
        <div className={s.manRow}>
          <dt>FOCUS</dt>
          <dd>
            <Tags items={b.focus} />
          </dd>
        </div>
        <div className={s.manRow}>
          <dt>STATS</dt>
          <dd>
            <dl className={s.kv}>
              {b.stats.map((st) => (
                <div key={st.label} className={s.kvRow}>
                  <dt>{st.label}</dt>
                  <dd>
                    <span className={s.kvVal}>
                      <span className={s.dim} aria-hidden="true">
                        ={' '}
                      </span>
                      {st.value}
                    </span>
                    {st.note && (
                      <span className={s.kvNote}>
                        <span aria-hidden="true"># </span>
                        {st.note}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </dd>
        </div>
        <div className={s.manRow}>
          <dt>EDUCATION</dt>
          <dd>
            <ul className={s.edu}>
              {b.education.map((e) => (
                <li key={e.degree + e.when}>
                  <span className={s.eduDeg}>{e.degree}</span>
                  <span className={s.eduWhen}>{e.when}</span>
                  <span className={s.eduSchool}>{e.school}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={s.manRow}>
          <dt>LINKS</dt>
          <dd>
            <Opens links={b.links} />
          </dd>
        </div>
      </dl>
      <div className={s.manFoot} aria-hidden="true">
        <span>{site.domain}</span>
        <span>{site.year}</span>
        <span>{page}</span>
      </div>
    </article>
  );
}

// --- D: featured work as records -------------------------------------------

function Field({
  k,
  children,
  className,
}: {
  k: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ? `${s.field} ${className}` : s.field}>
      <dt>{k}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Record({ p, n, tag }: { p: Project; n: number; tag: boolean }) {
  return (
    <article className={s.record} data-who={p.credit} aria-labelledby={`rec-${p.id}`}>
      {tag && <LabTag id="3L" label="Record card" />}
      <div className={s.recHead}>
        <span className={s.recId}>
          <span className={s.recNo} aria-hidden="true">
            {String(n).padStart(2, '0')}
          </span>
          {p.id}
        </span>
        <CreditTag who={p.credit} />
      </div>
      <h3 id={`rec-${p.id}`} className={s.recTitle}>
        {p.title}
      </h3>
      <dl className={s.fields}>
        <Field k="kind">{p.kind}</Field>
        {p.org && <Field k="org">{p.org}</Field>}
        <Field k="summary" className={s.fieldProse}>
          {p.summary}
        </Field>
        <Field k="credit">{p.creditLine}</Field>
        {p.metric && (
          <Field k="metric" className={s.fieldHi}>
            <span className={s.metricVal}>{p.metric.value}</span> {p.metric.label}
          </Field>
        )}
        <Field k="stack">
          <Tags items={p.stack} />
        </Field>
        {p.pending && (
          <Field k="pending" className={s.fieldNote}>
            {p.pending}
          </Field>
        )}
      </dl>
      <details className={s.more}>
        <summary>read more</summary>
        <p>{p.body}</p>
      </details>
      {p.links && p.links.length > 0 && (
        <div className={s.recFoot}>
          <Opens links={p.links} />
        </div>
      )}
    </article>
  );
}

// --- H: both careers as one git log ----------------------------------------

/** Newest first, ties in the kit's order. */
const LOG: readonly TimelineEntry[] = timeline
  .map((t, i) => ({ t, i }))
  .sort((a, b) => b.t.start.localeCompare(a.t.start) || a.i - b.i)
  .map(({ t }) => t);

/** First (newest) and last (oldest) row of each brother's branch. */
const SPAN = Object.fromEntries(
  LANES.map((k) => {
    const rows = LOG.flatMap((t, r) => (t.who === k ? [r] : []));
    return [k, { head: rows[0], root: rows[rows.length - 1] }];
  }),
) as Record<BrotherKey, { head: number; root: number }>;

/** Where both brothers work now: the stretch of the log they share. */
const SHARED_ORG = donato.nowOrg === nicolo.nowOrg ? donato.nowOrg : undefined;
const KINDS = Array.from(new Set(timeline.map((t) => t.kind)));

/**
 * The graph cell of one log row. With an entry, row r carries that commit;
 * without one, it is a label row sitting between rows r - 1 and r.
 */
function Graph({ r, t }: { r: number; t?: TimelineEntry }) {
  const other = t ? LANES.find((k) => k !== t.who) : undefined;
  const xref = t && other && t.note ? t.note.includes(BY_KEY[other].first) : false;
  return (
    <span className={s.graph} aria-hidden="true">
      {LANES.map((k, lane) => {
        const { head, root } = SPAN[k];
        const active = t ? r >= head && r <= root : r > head && r <= root;
        if (!active) return null;
        const here = t?.who === k;
        return (
          <span key={k} className={s.lane} data-lane={lane} data-who={k}>
            {(!here || r > head) && <span className={s.up} />}
            {(!here || r < root) && <span className={s.down} />}
            {here && t && <span className={s.dot} data-kind={t.kind} />}
          </span>
        );
      })}
      {xref && other && <span className={s.xref} data-to={LANES.indexOf(other)} />}
    </span>
  );
}

function GitLog() {
  const rows: ReactNode[] = [];
  LOG.forEach((t, r) => {
    const inBand = SHARED_ORG !== undefined && t.org === SHARED_ORG;
    const prevIn = r > 0 && LOG[r - 1].org === SHARED_ORG;
    const nextIn = r < LOG.length - 1 && LOG[r + 1].org === SHARED_ORG;
    if (inBand && !prevIn) {
      rows.push(
        <li key={`band-${r}`} className={s.bandHead} aria-hidden="true">
          <Graph r={r} />
          <span className={s.bandName}>{SHARED_ORG}</span>
          <span>{creditLabel.both}</span>
        </li>,
      );
    }
    const cls = [s.commit, inBand && s.inBand, inBand && !nextIn && s.bandLast]
      .filter(Boolean)
      .join(' ');
    rows.push(
      <li key={`${t.who}-${t.start}-${t.title}`} className={cls} data-who={t.who}>
        <Graph r={r} t={t} />
        <span className={s.cWhen}>{t.when}</span>
        <span className={s.cWho} data-who={t.who}>
          {BY_KEY[t.who].first}
        </span>
        <span className={s.cTitle}>
          {t.title}
          <span className={s.srOnly}> ({t.kind})</span>
        </span>
        <span className={s.cOrg}>{t.org}</span>
        {t.note && <span className={s.cNote}>{t.note}</span>}
      </li>,
    );
  });

  return (
    <div className={s.logPanel}>
      <div className={s.legend} aria-hidden="true">
        {LANES.map((k) => (
          <span key={k} className={s.legendItem}>
            <span className={s.legendLane} data-who={k} />
            {k}
          </span>
        ))}
        <span className={s.legendGap} />
        {KINDS.map((kind) => (
          <span key={kind} className={s.legendItem}>
            <span className={s.legendDot} data-kind={kind} />
            {kind}
          </span>
        ))}
      </div>
      <ol className={s.log}>{rows}</ol>
    </div>
  );
}

// --- The page ----------------------------------------------------------------

export default function LabVariant3Page() {
  return (
    <div className={`${s.root} ${plexMono.variable} ${plexSans.variable}`}>
      <a className={s.skip} href="#main">
        Skip to content
      </a>

      {/* A: header, a tmux status bar */}
      <div className={s.tagSlot}>
        <LabTag id="3A" label="Header" />
      </div>
      <header className={s.status}>
        <div className={s.statusInner}>
          <a className={s.session} href="#top">
            [{site.name}]
          </a>
          <StatusNav items={NAV} />
          <a className={s.statusMail} href={site.emailHref}>
            {site.email}
          </a>
        </div>
      </header>

      <main id="main">
        {/* B: hero, a terminal with two panes */}
        <section id="top" className={s.hero} aria-labelledby="top-title">
          <LabTag id="3B" label="Hero" />
          <div className={s.term}>
            <div className={s.termBar} aria-hidden="true">
              <span>~/{site.domain}</span>
              <span>
                {brothers.length} {brothers.length === 1 ? 'session' : 'sessions'}
              </span>
            </div>
            <div className={s.panes}>
              <div className={s.paneMain}>
                <p className={`${s.prompt} ${s.reveal}`} style={step(0)} aria-hidden="true">
                  <span className={s.ps}>$</span> whoami
                </p>
                <h1 id="top-title" className={`${s.h1} ${s.reveal}`} style={step(1)}>
                  {site.headline}
                </h1>
                <p className={`${s.prompt} ${s.reveal}`} style={step(2)} aria-hidden="true">
                  <span className={s.ps}>$</span> cat lede.txt
                </p>
                <p className={`${s.lede} ${s.reveal}`} style={step(3)}>
                  {site.lede}
                </p>
                <p className={`${s.prompt} ${s.reveal}`} style={step(4)} aria-hidden="true">
                  <span className={s.ps}>$</span> <span className={s.cursor} />
                </p>
              </div>
              <div className={s.paneSide}>
                <p className={s.prompt} aria-hidden="true">
                  <span className={s.ps}>$</span> who
                </p>
                <ul className={s.who}>
                  {brothers.map((b) => (
                    <li key={b.key} data-who={b.key}>
                      <a className={s.whoUser} href="#brothers">
                        {b.key}
                      </a>
                      <span className={s.whoRole}>{b.now}</span>
                      <span className={s.whoOrg}>
                        {b.nowOrg}, since {b.nowSince}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className={s.prompt} aria-hidden="true">
                  <span className={s.ps}>$</span> echo $LOCATION
                </p>
                <p className={s.loc}>{site.location}</p>
              </div>
            </div>
          </div>
        </section>

        {/* C: the brothers */}
        <section id="brothers" className={s.section} aria-labelledby="brothers-title">
          <LabTag id="3C" label="The brothers" />
          <Head
            win={1}
            title="The brothers"
            cmd={`man ${brothers.map((b) => b.key).join(' ')}`}
            count={`${brothers.length} pages`}
          />
          <div className={s.manGrid}>
            {brothers.map((b, i) => (
              <ManPage key={b.key} b={b} tag={i === 0} />
            ))}
          </div>
        </section>

        {/* D: featured work */}
        <section id="work" className={s.section} aria-labelledby="work-title">
          <LabTag id="3D" label="Featured work" />
          <Head
            win={2}
            title="Featured work"
            cmd="select * from projects where featured;"
            count={`${featuredProjects.length} rows`}
          />
          <ol className={s.records}>
            {featuredProjects.map((p, i) => (
              <li key={p.id}>
                <Record p={p} n={i + 1} tag={i === 0} />
              </li>
            ))}
          </ol>
        </section>

        {/* E: more work */}
        <section id="more" className={s.section} aria-labelledby="more-title">
          <LabTag id="3E" label="More work" />
          <Head
            win={3}
            title="More work"
            cmd="select title, kind, org, credit, summary from projects where not featured;"
            count={`${otherProjects.length} rows`}
          />
          <div className={s.tableWrap}>
            <table className={s.results} aria-labelledby="more-title">
              <thead>
                <tr>
                  <th scope="col">title</th>
                  <th scope="col">kind</th>
                  <th scope="col">org</th>
                  <th scope="col">credit</th>
                  <th scope="col">summary</th>
                </tr>
              </thead>
              <tbody>
                {otherProjects.map((p) => (
                  <tr key={p.id}>
                    <th scope="row" data-label="title">
                      {p.title}
                    </th>
                    <td data-label="kind">{p.kind}</td>
                    <td data-label="org">{p.org ?? <span className={s.null}>NULL</span>}</td>
                    <td data-label="credit">
                      <CreditTag who={p.credit} />
                    </td>
                    <td data-label="summary" className={s.cellProse}>
                      {p.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={s.rowsFoot} aria-hidden="true">
              ({otherProjects.length} rows)
            </p>
          </div>
        </section>

        {/* F: by the numbers */}
        <section id="numbers" className={s.section} aria-labelledby="numbers-title">
          <LabTag id="3F" label="By the numbers" />
          <Head
            win={4}
            title="By the numbers"
            cmd="status --all"
            count={`${headlineStats.length} gauges`}
          />
          <ul className={s.gauges}>
            {headlineStats.map((st, i) => (
              <li key={st.label} className={s.gauge}>
                <span className={s.gaugeBar} aria-hidden="true">
                  {keysOf(st.who).map((k) => (
                    <span key={k} data-who={k} />
                  ))}
                </span>
                <span className={s.gaugeIdx} aria-hidden="true">
                  [{i + 1}/{headlineStats.length}]
                </span>
                <span className={s.gaugeVal}>{st.value}</span>
                <span className={s.gaugeLabel}>{st.label}</span>
                {st.note && (
                  <span className={s.gaugeNote}>
                    <span aria-hidden="true"># </span>
                    {st.note}
                  </span>
                )}
                <span className={s.gaugeBy}>
                  <span className={s.dim}>by</span> <CreditTag who={st.who} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* G: what we work on */}
        <section id="areas" className={s.section} aria-labelledby="areas-title">
          <LabTag id="3G" label="What we work on" />
          <Head win={5} title="What we work on" cmd="ls -l areas/" count={`total ${areas.length}`} />
          <ul className={s.ls}>
            {areas.map((a) => (
              <li key={a.id} className={s.lsRow}>
                <span className={s.lsName} aria-hidden="true">
                  {a.id}/
                </span>
                <div className={s.lsMain}>
                  <h3 className={s.lsTitle}>{a.title}</h3>
                  <p className={s.lsLine}>{a.line}</p>
                  <p className={s.lsProof}>
                    <span aria-hidden="true"># </span>
                    {a.proof}
                  </p>
                </div>
                <span className={s.lsOwner}>
                  <CreditTag who={a.who} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* H: timeline, a git log graph */}
        <section id="log" className={s.section} aria-labelledby="log-title">
          <LabTag id="3H" label="Timeline" />
          <Head
            win={6}
            title="Timeline"
            cmd="git log --graph --all"
            count={`${timeline.length} commits`}
          />
          <GitLog />
        </section>

        {/* I: contact */}
        <section id="contact" className={s.section} aria-labelledby="contact-title">
          <LabTag id="3I" label="Contact" />
          <Head win={7} title={site.contactHeadline} />
          <div className={s.contact}>
            <p className={s.contactLine}>{site.contactLine}</p>
            <p className={s.mailLine}>
              <span className={s.mailCmd} aria-hidden="true">
                <span className={s.ps}>$</span> mail
              </span>
              <a className={s.mail} href={site.emailHref}>
                {site.email}
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* J: footer, the bottom status bar */}
      <footer className={s.footer}>
        <LabTag id="3J" label="Footer" />
        <div className={s.footBar}>
          <span className={s.footSession}>[{site.name}]</span>
          <span>
            &copy; {site.year} {site.name}
          </span>
          <span className={s.footSites}>
            {brothers.map((b) => (
              <Open key={b.key} link={b.links[0]} />
            ))}
          </span>
          <span className={s.footRight}>
            <span>&quot;{site.location}&quot;</span>
            <a className={s.footMail} href={site.emailHref}>
              {site.email}
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
