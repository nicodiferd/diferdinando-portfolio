import type { Metadata } from 'next';
import Image from 'next/image';
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
  timelineAscending,
} from '../_kit';
import type { Brother, BrotherKey, Credit, Link, Project, TimelineKind } from '../_kit';
import { CopyEmail } from './copy-email';
import { bricolage } from './fonts';
import { meta } from './meta';
import { AreaIcon, ArrowUpRight, Coast, ProjectMotif } from './motifs';
import s from './bento.module.css';

export const metadata: Metadata = labPageMetadata(meta);

// Variant 5, Bento. Every fact sits in its own tile, and tile color carries
// credit: sky is Donato, peach is Nicolo, lilac is work they share, lime is
// the practice itself (where they are, how to write).

const tone: Record<Credit, string> = { donato: s.sky, nicolo: s.peach, both: s.lilac };
const byKey: Record<BrotherKey, Brother> = { donato, nicolo };
const keysOf = (who: Credit): BrotherKey[] => (who === 'both' ? ['donato', 'nicolo'] : [who]);

/** Featured tile spans: the shared semantic layer is the big one. */
const featuredSpan: Record<string, string> = {
  'semantic-layer': s.spanLead,
  'data-platform': s.spanSide,
  wedge: s.spanSide,
  zedi: s.spanThird,
  'metric-layer': s.spanThird,
  bblmlp: s.spanThirdWide,
};

const kindLabel: Record<TimelineKind, string> = {
  work: 'Work',
  education: 'Education',
  milestone: 'Milestone',
};

const nav = [
  { href: '#work', label: 'Work' },
  { href: '#numbers', label: 'Numbers' },
  { href: '#brothers', label: 'Brothers' },
  { href: '#areas', label: 'Areas' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#contact', label: 'Contact' },
];

/** Numerals size to their tile; long values ("4 weeks") get a smaller step. */
const isLong = (value: string) => value.length > 4;

function Mark() {
  return (
    <span className={s.mark} aria-hidden="true">
      <i className={s.lime} />
      <i className={s.lilac} />
      <i className={s.sky} />
      <i className={s.peach} />
    </span>
  );
}

function Avatars({ who, size }: { who: Credit; size?: 'lg' }) {
  return (
    <span className={`${s.avatars} ${size === 'lg' ? s.avatarsLg : ''}`} aria-hidden="true">
      {keysOf(who).map((k) => (
        <span key={k} className={`${s.avatar} ${tone[k]}`}>
          {byKey[k].initial}
        </span>
      ))}
    </span>
  );
}

function CreditMark({ who, text }: { who: Credit; text?: string }) {
  return (
    <span className={s.credit}>
      <Avatars who={who} />
      <span>{text ?? creditLabel[who]}</span>
    </span>
  );
}

function ExtLink({ link, className, prefix }: { link: Link; className?: string; prefix?: string }) {
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {prefix ? <span className={s.srOnly}>{prefix} </span> : null}
      <span>{link.label}</span>
      <ArrowUpRight className={s.arrow} />
      <span className={s.srOnly}> (opens in a new tab)</span>
    </a>
  );
}

function SectionHead({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className={s.head}>
      <h2 className={s.h2}>{title}</h2>
      {children}
    </div>
  );
}

function Legend() {
  return (
    <ul className={s.legend} aria-label="Tile colors">
      {(['donato', 'nicolo', 'both'] as const).map((who) => (
        <li key={who}>
          <span className={`${s.swatch} ${tone[who]}`} aria-hidden="true" />
          {creditLabel[who]}
        </li>
      ))}
    </ul>
  );
}

function ProjectTile({ p, tag }: { p: Project; tag?: boolean }) {
  const lead = p.id === 'semantic-layer';
  return (
    <article className={`${s.tile} ${s.project} ${s.lift} ${lead ? s.projectLead : ''} ${featuredSpan[p.id] ?? ''}`}>
      {tag ? <LabTag id="5K" label="Project tile" /> : null}
      <div className={s.split}>
        <div className={s.projBody}>
          <div className={s.projMeta}>
            <span className={s.chip}>{p.kind}</span>
            {p.org ? <span className={s.org}>{p.org}</span> : null}
          </div>
          <h3 className={s.projTitle}>{p.title}</h3>
          <p className={s.summary}>{p.summary}</p>
          {lead ? <p className={s.body}>{p.body}</p> : null}
          <ul className={s.stack} aria-label="Stack">
            {p.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {p.pending ? <p className={s.pending}>{p.pending}</p> : null}
          <div className={s.projFoot}>
            <CreditMark who={p.credit} text={p.creditLine} />
            {p.links?.length ? (
              <ul className={s.linkRow}>
                {p.links.map((l) => (
                  <li key={l.href}>
                    <ExtLink link={l} className={s.pill} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div className={`${s.panel} ${p.metric ? '' : s.panelBare} ${tone[p.credit]}`}>
          <ProjectMotif id={p.id} className={s.motif} />
          {p.metric ? (
            <p className={s.metric}>
              <span className={`${s.metricValue} ${isLong(p.metric.value) ? s.long : ''}`}>{p.metric.value}</span>
              <span className={s.metricLabel}>{p.metric.label}</span>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function BrotherBlock({ b }: { b: Brother }) {
  const headingId = `b5-${b.key}`;
  return (
    <article className={s.brother} aria-labelledby={headingId}>
      <div className={`${s.tile} ${s.profile}`}>
        <div className={s.profileHead}>
          <span className={`${s.mono} ${tone[b.key]}`} aria-hidden="true">
            {b.initial}
          </span>
          <div>
            <h3 id={headingId} className={s.profileName}>
              {b.name}
            </h3>
            <p className={s.profileTitle}>{b.title}</p>
          </div>
        </div>
        <p className={s.now}>
          <span className={s.nowChip}>
            <span className={s.nowDot} aria-hidden="true" />
            Now
          </span>
          <span>
            <strong>{b.now}</strong> at {b.nowOrg}, since {b.nowSince}
          </span>
        </p>
        <div className={s.bio}>
          {b.bio.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
        <ul className={s.focus} aria-label={`${b.first}'s focus`}>
          {b.focus.map((f) => (
            <li key={f} className={s.chip}>
              {f}
            </li>
          ))}
        </ul>
      </div>
      {b.stats.map((st) => (
        <div key={st.label} className={`${s.tile} ${s.bstat} ${s.lift} ${tone[b.key]}`}>
          <p className={`${s.bstatValue} ${isLong(st.value) ? s.long : ''}`}>{st.value}</p>
          <p className={s.bstatLabel}>{st.label}</p>
          {st.note ? <p className={s.bstatNote}>{st.note}</p> : null}
        </div>
      ))}
      <div className={`${s.tile} ${s.edu}`}>
        <h4 className={s.h4}>Education</h4>
        <ul className={s.eduList}>
          {b.education.map((e) => (
            <li key={e.degree + e.school}>
              <span className={s.eduDegree}>{e.degree}</span>
              <span className={s.eduSchool}>{e.school}</span>
              <span className={s.eduWhen}>{e.when}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${s.tile} ${s.links}`}>
        <h4 className={s.h4}>Find {b.first}</h4>
        <ul className={s.linkList}>
          {b.links.map((l) => (
            <li key={l.href}>
              <ExtLink link={l} className={`${s.pill} ${s.pillSoft}`} prefix={`${b.first} on`} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function LabVariant5Page() {
  const shared = headlineStats.find((st) => st.who === 'both') ?? headlineStats[0];
  const elsewhere: { link: Link; who: Credit }[] = [
    { link: donato.links[0], who: 'donato' },
    { link: nicolo.links[0], who: 'nicolo' },
    ...featuredProjects.flatMap((p) => (p.links?.length ? [{ link: p.links[0], who: p.credit }] : [])),
  ];

  return (
    <div id="top" className={`${bricolage.variable} ${s.root}`}>
      <div className={s.wrap}>
        {/* A: header */}
        <header className={s.header}>
          <LabTag id="5A" label="Header" />
          <div className={`${s.tile} ${s.bar}`}>
            <a href="#top" className={s.brand}>
              <Mark />
              <span>{site.name}</span>
            </a>
            <nav className={s.nav} aria-label="Sections">
              <ul>
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={site.emailHref} className={`${s.emailPill} ${s.lime}`}>
              {site.email}
            </a>
          </div>
        </header>

        <main className={s.main}>
          {/* B: hero */}
          <section className={s.section} aria-labelledby="b5-hero">
            <LabTag id="5B" label="Hero" />
            <div className={`${s.grid} ${s.hero}`}>
              <div className={`${s.tile} ${s.heroMain}`}>
                <div className={s.heroTop}>
                  <CreditMark who="both" />
                  <span className={s.chip}>{site.domain}</span>
                </div>
                <h1 id="b5-hero" className={s.h1}>
                  {site.headline}
                </h1>
                <div className={s.heroFoot}>
                  <p className={s.lede}>{site.lede}</p>
                  <div className={s.ctas}>
                    <a href="#work" className={`${s.btn} ${s.btnInk}`}>
                      See the work
                    </a>
                    <a href={site.emailHref} className={`${s.btn} ${s.btnLine}`}>
                      Write to us
                    </a>
                  </div>
                </div>
              </div>

              {brothers.map((b, i) => (
                <figure key={b.key} className={`${s.tile} ${s.portrait} ${s.lift}`}>
                  {i === 0 ? (
                    <div className={s.portraitTagSlot}>
                      <LabTag id="5M" label="Portrait tile" />
                    </div>
                  ) : null}
                  <Image
                    src={b.photo}
                    alt={b.photoAlt}
                    fill
                    priority
                    sizes="(min-width: 1100px) 25vw, 50vw"
                    className={s.portraitImg}
                  />
                  <figcaption className={s.portraitCap}>
                    <Avatars who={b.key} />
                    <span className={s.portraitText}>
                      <span className={s.portraitName}>{b.first}</span>
                      <span className={s.portraitTitle}>{b.title}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}

              <div className={`${s.tile} ${s.heroLoc} ${s.lime}`}>
                <Coast className={s.coast} />
                <p className={s.locText}>
                  <span className={s.tileLabel}>Based in</span>
                  <span className={s.locValue}>{site.location}</span>
                </p>
              </div>

              <div className={`${s.tile} ${s.heroStat} ${tone[shared.who]}`}>
                <div className={s.heroStatTop}>
                  <Avatars who={shared.who} />
                  <span className={s.tileLabel}>{creditLabel[shared.who]}</span>
                </div>
                <p className={s.heroStatValue}>{shared.value}</p>
                <p className={s.heroStatLabel}>
                  {shared.label}
                  {shared.note ? <span className={s.heroStatNote}>{shared.note}</span> : null}
                </p>
              </div>
            </div>
          </section>

          {/* D: featured work */}
          <section id="work" className={s.section} aria-labelledby="b5-work">
            <LabTag id="5D" label="Featured work" />
            <div className={s.head}>
              <h2 id="b5-work" className={s.h2}>
                Featured work
              </h2>
              <Legend />
            </div>
            <div className={s.grid}>
              {featuredProjects.map((p, i) => (
                <ProjectTile key={p.id} p={p} tag={i === 0} />
              ))}
            </div>
          </section>

          {/* E: more work */}
          <section id="more" className={s.section} aria-labelledby="b5-more">
            <LabTag id="5E" label="More work" />
            <div className={s.head}>
              <h2 id="b5-more" className={s.h2}>
                More work
              </h2>
            </div>
            <div className={s.grid}>
              {otherProjects.map((p) => (
                <article key={p.id} className={`${s.tile} ${s.mini} ${s.lift}`}>
                  <div className={s.miniTop}>
                    <span className={`${s.chip} ${s.chipTone} ${tone[p.credit]}`}>{p.kind}</span>
                    {p.org ? <span className={s.org}>{p.org}</span> : null}
                  </div>
                  <h3 className={s.miniTitle}>{p.title}</h3>
                  <p className={s.miniSummary}>{p.summary}</p>
                  {p.metric ? (
                    <p className={s.miniMetric}>
                      <span className={s.miniMetricValue}>{p.metric.value}</span>
                      <span className={s.miniMetricLabel}>{p.metric.label}</span>
                    </p>
                  ) : null}
                  <div className={s.miniFoot}>
                    <CreditMark who={p.credit} text={p.creditLine} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* F: by the numbers */}
          <section id="numbers" className={s.section} aria-labelledby="b5-numbers">
            <LabTag id="5F" label="By the numbers" />
            <SectionHead title="By the numbers" />
            <div className={s.grid}>
              {headlineStats.map((st, i) => (
                <article key={st.label} className={`${s.tile} ${s.stat} ${s.lift} ${tone[st.who]}`}>
                  {i === 0 ? <LabTag id="5L" label="Stat tile" /> : null}
                  <div className={s.statTop}>
                    <Avatars who={st.who} />
                    <span className={s.srOnly}>{creditLabel[st.who]}</span>
                  </div>
                  <p className={`${s.statValue} ${isLong(st.value) ? s.long : ''}`}>{st.value}</p>
                  <h3 className={s.statLabel}>{st.label}</h3>
                  {st.note ? <p className={s.statNote}>{st.note}</p> : null}
                </article>
              ))}
            </div>
          </section>

          {/* C: the brothers */}
          <section id="brothers" className={s.section} aria-labelledby="b5-brothers">
            <LabTag id="5C" label="The brothers" />
            <div className={s.head}>
              <h2 id="b5-brothers" className={s.h2}>
                The brothers
              </h2>
            </div>
            <div className={s.grid}>
              {brothers.map((b) => (
                <BrotherBlock key={b.key} b={b} />
              ))}
            </div>
          </section>

          {/* G: what we work on */}
          <section id="areas" className={s.section} aria-labelledby="b5-areas">
            <LabTag id="5G" label="What we work on" />
            <div className={s.head}>
              <h2 id="b5-areas" className={s.h2}>
                What we work on
              </h2>
            </div>
            <div className={s.grid}>
              {areas.map((a) => (
                <article key={a.id} className={`${s.tile} ${s.area} ${s.lift}`}>
                  <div className={s.areaTop}>
                    <span className={`${s.areaIcon} ${tone[a.who]}`}>
                      <AreaIcon id={a.id} className={s.areaGlyph} />
                    </span>
                    <CreditMark who={a.who} />
                  </div>
                  <h3 className={s.areaTitle}>{a.title}</h3>
                  <p className={s.areaLine}>{a.line}</p>
                  <p className={s.proof}>{a.proof}</p>
                </article>
              ))}
            </div>
          </section>

          {/* H: timeline */}
          <section id="timeline" className={s.section} aria-labelledby="b5-timeline">
            <LabTag id="5H" label="Timeline" />
            <div className={s.head}>
              <h2 id="b5-timeline" className={s.h2}>
                Timeline
              </h2>
            </div>
            <div className={`${s.tile} ${s.tlTile}`}>
              <div className={s.tlHead}>
                <ul className={s.legend} aria-label="Whose entry">
                  {brothers.map((b) => (
                    <li key={b.key}>
                      <Avatars who={b.key} />
                      {b.first}
                    </li>
                  ))}
                </ul>
                <p className={s.tlHint}>Oldest first. Scroll sideways for the rest.</p>
              </div>
              <div className={s.tlScroll} tabIndex={0} role="region" aria-label="Timeline, oldest first">
                <ol className={s.tl}>
                  {timelineAscending.map((t) => (
                    <li key={`${t.who}-${t.start}-${t.title}`} className={s.tlItem}>
                      <span className={`${s.tlDot} ${tone[t.who]}`} aria-hidden="true" />
                      <div className={`${s.tlCard} ${t.kind === 'milestone' ? s.tlMilestone : ''}`}>
                        <div className={s.tlTop}>
                          <Avatars who={t.who} />
                          <span className={s.srOnly}>{byKey[t.who].first}: </span>
                          <span className={s.tlWhen}>{t.when}</span>
                        </div>
                        <h3 className={s.tlTitle}>{t.title}</h3>
                        <p className={s.tlOrg}>{t.org}</p>
                        {t.note ? <p className={s.tlNote}>{t.note}</p> : null}
                        <div className={s.tlTags}>
                          <span className={s.chip}>{kindLabel[t.kind]}</span>
                          {t.current ? <span className={`${s.chip} ${s.chipTone} ${s.lime}`}>Now</span> : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* I: contact */}
          <section id="contact" className={s.section} aria-labelledby="b5-contact">
            <LabTag id="5I" label="Contact" />
            <div className={s.grid}>
              <div className={`${s.tile} ${s.contact} ${s.lime}`}>
                <div className={s.contactTop}>
                  <Avatars who="both" size="lg" />
                </div>
                <h2 id="b5-contact" className={s.contactH}>
                  {site.contactHeadline}
                </h2>
                <p className={s.contactLine}>{site.contactLine}</p>
                <a href={site.emailHref} className={s.contactEmail}>
                  {site.email}
                </a>
                <div className={s.contactActions}>
                  <CopyEmail email={site.email} className={`${s.btn} ${s.btnInk}`} />
                </div>
              </div>
              <div className={`${s.tile} ${s.elsewhere}`}>
                <h3 className={s.elsewhereH}>Elsewhere</h3>
                <ul className={s.elseList}>
                  {elsewhere.map(({ link, who }) => (
                    <li key={link.href}>
                      <Avatars who={who} />
                      <ExtLink link={link} className={s.elseLink} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>

        {/* J: footer */}
        <footer className={`${s.section} ${s.footer}`}>
          <LabTag id="5J" label="Footer" />
          <div className={`${s.tile} ${s.footTile}`}>
            <p className={s.wordmark} aria-hidden="true">
              {site.name}
            </p>
            <div className={s.footRow}>
              <span className={s.footBrand}>
                <Mark />
                &copy; {site.year} {site.name}
              </span>
              <span>{site.location}</span>
              <a href={site.emailHref} className={s.footLink}>
                {site.email}
              </a>
              <a href="#top" className={s.footLink}>
                Back to top
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
