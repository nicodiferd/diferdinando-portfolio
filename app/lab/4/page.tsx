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
  timelineAscending,
} from '../_kit';
import type { Brother, Link, Project, Stat, TimelineEntry } from '../_kit';
import { fontVariables } from './fonts';
import { meta } from './meta';
import s from './feature.module.css';

export const metadata: Metadata = labPageMetadata(meta);

// Variant 4, Feature Story: the home page set as a magazine feature. Every
// fact is rendered from the kit; the words in this file are interface words
// (section names, labels) only.

const NAV = [
  { href: '#brothers', label: 'The brothers' },
  { href: '#work', label: 'Featured work' },
  { href: '#brief', label: 'In brief' },
  { href: '#numbers', label: 'By the numbers' },
  { href: '#areas', label: 'What we work on' },
  { href: '#chronology', label: 'Chronology' },
  { href: '#contact', label: 'Write to us' },
] as const;

const KIND_LABEL: Record<TimelineEntry['kind'], string | null> = {
  work: null,
  education: 'Education',
  milestone: 'Milestone',
};

// The page layout of the features: the shared system leads, then two stories
// told by a number, then the products a reader can visit. All six appear.
const lead = featuredProjects.find((p) => p.credit === 'both') ?? featuredProjects[0];
const rest = featuredProjects.filter((p) => p !== lead);
const pair = rest.filter((p) => p.metric && !p.links?.length).slice(0, 2);
const grid = rest.filter((p) => !pair.includes(p));

const years = Array.from(new Set(timelineAscending.map((t) => t.start.slice(0, 4))));

// --- Small parts -------------------------------------------------------------

function Out({ link }: { link: Link }) {
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer">
      {link.label}
      <span className={s.srOnly}> (opens in a new tab)</span>
    </a>
  );
}

function SectionHead({ id, title }: { id: string; title: string }) {
  return (
    <div className={s.sectionHead}>
      <h2 id={id} className={s.sectionTitle}>
        {title}
      </h2>
    </div>
  );
}

function ProjectKicker({ p }: { p: Project }) {
  return (
    <p className={s.kicker}>
      <span>{p.kind}</span>
      {p.org ? <span>{p.org}</span> : null}
      {p.credit === 'both' ? <span className={s.kickerShared}>Shared work</span> : null}
    </p>
  );
}

function Pull({ metric }: { metric: Stat }) {
  return (
    <figure className={s.pull}>
      <p className={s.pullValue}>{metric.value}</p>
      <figcaption className={s.pullLabel}>{metric.label}</figcaption>
    </figure>
  );
}

function Credit({ line }: { line: string }) {
  return (
    <p className={s.byline}>
      <span className={s.label}>Credit</span>
      <span className={s.bylineText}>{line}</span>
    </p>
  );
}

function Stack({ items }: { items: readonly string[] }) {
  return (
    <div className={s.metaRow}>
      <p className={s.label}>Built with</p>
      <ul className={s.inlineList}>
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function Visit({ links }: { links: readonly Link[] }) {
  return (
    <div className={s.metaRow}>
      <p className={s.label}>Visit</p>
      <ul className={s.linkList}>
        {links.map((l) => (
          <li key={l.href}>
            <Out link={l} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Story teaser (the lead, the pair, the grid) ----------------------------

type StoryVariant = 'lead' | 'pair' | 'grid';
const STORY_CLASS: Record<StoryVariant, string> = {
  lead: s.storyLead,
  pair: s.storyPair,
  grid: s.storyGrid,
};

function Story({ p, variant, tag }: { p: Project; variant: StoryVariant; tag?: ReactNode }) {
  const titleId = `story-${p.id}`;
  return (
    <article className={`${s.story} ${STORY_CLASS[variant]}`} aria-labelledby={titleId}>
      {tag}
      <div className={s.storyInner}>
        <header className={s.storyHead}>
          <ProjectKicker p={p} />
          <h3 id={titleId} className={s.storyTitle}>
            {p.title}
          </h3>
          <p className={s.dek}>{p.summary}</p>
        </header>
        {p.metric ? <Pull metric={p.metric} /> : null}
        <div className={s.storyBody}>
          <p className={variant === 'lead' ? `${s.storyText} ${s.dropcap}` : s.storyText}>{p.body}</p>
          {p.pending ? (
            <p className={s.editorNote}>
              <span className={s.label}>Editor’s note</span> {p.pending}
            </p>
          ) : null}
        </div>
        <footer className={s.storyFoot}>
          <Credit line={p.creditLine} />
          <Stack items={p.stack} />
          {p.links?.length ? <Visit links={p.links} /> : null}
        </footer>
      </div>
    </article>
  );
}

// --- Profile (the brothers spread) -------------------------------------------

function Profile({ b, tag }: { b: Brother; tag?: ReactNode }) {
  const id = `profile-${b.key}`;
  return (
    <article className={s.profile} aria-labelledby={id}>
      <h3 id={id} className={s.profileName}>
        {b.name}
      </h3>
      <p className={s.profileTitle}>{b.title}</p>
      <p className={s.nowLine}>
        <span className={s.label}>Now</span> {b.now} at {b.nowOrg}, since {b.nowSince}
      </p>
      <div className={s.bio}>
        {b.bio.map((para, i) => (
          <p key={i} className={i === 0 ? s.dropcap : undefined}>
            {para}
          </p>
        ))}
      </div>
      <aside className={s.factBox} aria-labelledby={`${id}-facts`}>
        {tag}
        <h4 id={`${id}-facts`} className={s.factTitle}>
          {b.first} at a glance
        </h4>
        <ul className={s.factStats}>
          {b.stats.map((st) => (
            <li key={st.label} className={s.factStat}>
              <span className={s.factValue}>{st.value}</span>
              <span className={s.factLabel}>{st.label}</span>
              {st.note ? <span className={s.factNote}>{st.note}</span> : null}
            </li>
          ))}
        </ul>
        <dl className={s.factRows}>
          <div className={s.factRow}>
            <dt className={s.label}>Focus</dt>
            <dd>
              <ul className={s.inlineList}>
                {b.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className={s.factRow}>
            <dt className={s.label}>Education</dt>
            <dd>
              <ul className={s.eduList}>
                {b.education.map((e) => (
                  <li key={`${e.degree}-${e.school}`}>
                    {e.degree}, <i>{e.school}</i>, {e.when}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className={s.factRow}>
            <dt className={s.label}>Links</dt>
            <dd>
              <ul className={s.linkList}>
                {b.links.map((l) => (
                  <li key={l.href}>
                    <Out link={l} />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </aside>
    </article>
  );
}

// --- Chronology entry ----------------------------------------------------------

function Event({ t }: { t: TimelineEntry }) {
  const kind = KIND_LABEL[t.kind];
  return (
    <li className={t.current ? `${s.event} ${s.eventCurrent}` : s.event}>
      <p className={s.eventWhen}>
        <span className={s.eventWho}>{creditLabel[t.who]}</span>
        <span>{t.when}</span>
        {kind ? <span className={s.eventKind}>{kind}</span> : null}
      </p>
      <p className={s.eventTitle}>{t.title}</p>
      <p className={s.eventOrg}>{t.org}</p>
      {t.note ? <p className={s.eventNote}>{t.note}</p> : null}
    </li>
  );
}

// --- The page --------------------------------------------------------------------

export default function LabVariant4Page() {
  return (
    <div className={`${s.root} ${fontVariables}`}>
      {/* A: the masthead */}
      <header className={s.masthead} id="top">
        <div className={s.wrap}>
          <LabTag id="4A" label="Header" />
          <div className={s.dateline}>
            <p className={s.datelineParts}>
              <span>{site.location}</span>
              <span>{site.year}</span>
            </p>
            <a href={site.emailHref} className={s.datelineEmail}>
              {site.email}
            </a>
          </div>
          <p className={s.plate}>
            {/* The nameplate spans the measure at any width: textLength fits the
                name to the viewBox (Instrument Serif sets it at about 4.72em). */}
            <svg className={s.plateSvg} viewBox="0 0 1000 174" role="img" aria-label={site.name}>
              <text x="0" y="166" textLength="1000" lengthAdjust="spacing" className={s.plateText}>
                {site.name}
              </text>
            </svg>
          </p>
          <p className={s.tagline}>{site.tagline}</p>
          <nav aria-label="Sections" className={s.nav}>
            <ul className={s.navList}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* B: the opener */}
        <section className={s.hero} id="feature" aria-labelledby="headline">
          <div className={s.wrap}>
            <LabTag id="4B" label="Hero" />
            <p className={s.kicker}>
              <span>Cover story</span>
            </p>
            <h1 id="headline" className={s.headline}>
              {site.headline}
            </h1>
            <div className={s.heroGrid}>
              <div className={s.standfirstCol}>
                <p className={s.standfirst}>
                  <span className={s.placeline}>{site.location}</span> {site.lede}
                </p>
                <p className={s.jump}>
                  <a href="#brothers">Read their profiles</a>
                </p>
              </div>
              <div className={s.photos}>
                {brothers.map((b) => (
                  <figure key={b.key} className={s.figure}>
                    <div className={s.photoFrame}>
                      <Image
                        src={b.photo}
                        alt={b.photoAlt}
                        sizes="(min-width: 1000px) 33vw, 50vw"
                        className={s.photo}
                        priority
                      />
                    </div>
                    <figcaption className={s.caption}>
                      <span className={s.captionName}>{b.name}</span>
                      <span className={s.captionTitle}>{b.title}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* C: the profile spread */}
        <section className={s.section} id="brothers" aria-labelledby="brothers-title">
          <div className={s.wrap}>
            <LabTag id="4C" label="The brothers" />
            <SectionHead id="brothers-title" title="The brothers" />
            <div className={s.spread}>
              {brothers.map((b, i) => (
                <Profile
                  key={b.key}
                  b={b}
                  tag={i === 0 ? <LabTag id="4K" label="Fact box" /> : undefined}
                />
              ))}
            </div>
          </div>
        </section>

        {/* D: the features */}
        <section className={s.section} id="work" aria-labelledby="work-title">
          <div className={s.wrap}>
            <LabTag id="4D" label="Featured work" />
            <SectionHead id="work-title" title="Featured work" />
            <Story p={lead} variant="lead" tag={<LabTag id="4L" label="Lead story" />} />
            <div className={s.pairRow}>
              {pair.map((p, i) => (
                <Story
                  key={p.id}
                  p={p}
                  variant="pair"
                  tag={i === 0 ? <LabTag id="4M" label="Story teaser" /> : undefined}
                />
              ))}
            </div>
            <div className={s.gridRow}>
              {grid.map((p) => (
                <Story key={p.id} p={p} variant="grid" />
              ))}
            </div>
          </div>
        </section>

        {/* E: in brief */}
        <section className={s.section} id="brief" aria-labelledby="brief-title">
          <div className={s.wrap}>
            <LabTag id="4E" label="More work" />
            <SectionHead id="brief-title" title="In brief" />
            <div className={s.briefs}>
              {otherProjects.map((p) => (
                <article key={p.id} className={s.brief} aria-labelledby={`brief-${p.id}`}>
                  <ProjectKicker p={p} />
                  <h3 id={`brief-${p.id}`} className={s.briefTitle}>
                    {p.title}
                  </h3>
                  <p className={s.briefSummary}>{p.summary}</p>
                  <p className={s.briefBody}>{p.body}</p>
                  {p.metric ? (
                    <p className={s.briefFigure}>
                      <span className={s.briefFigureValue}>{p.metric.value}</span> {p.metric.label}
                    </p>
                  ) : null}
                  <Credit line={p.creditLine} />
                  <Stack items={p.stack} />
                  {p.links?.length ? <Visit links={p.links} /> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* F: the numbers page */}
        <section className={s.band} id="numbers" aria-labelledby="numbers-title">
          <div className={s.wrap}>
            <LabTag id="4F" label="By the numbers" />
            <h2 id="numbers-title" className={s.bandTitle}>
              By the numbers
            </h2>
            <ul className={s.figures}>
              {headlineStats.map((st) => (
                <li key={st.label} className={s.figureItem}>
                  <span className={s.figureValue}>{st.value}</span>
                  <span className={s.figureLabel}>{st.label}</span>
                  {st.note ? <span className={s.figureNote}>{st.note}</span> : null}
                  <span className={s.figureWho}>{creditLabel[st.who]}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* G: contents */}
        <section className={s.section} id="areas" aria-labelledby="areas-title">
          <div className={s.wrap}>
            <LabTag id="4G" label="What we work on" />
            <SectionHead id="areas-title" title="What we work on" />
            <ul className={s.contents}>
              {areas.map((a) => (
                <li key={a.id} className={s.contentsItem}>
                  <div className={s.contentsLine}>
                    <h3 className={s.contentsTitle}>{a.title}</h3>
                    <span className={s.leader} aria-hidden="true" />
                    <span className={s.contentsWho}>{creditLabel[a.who]}</span>
                  </div>
                  <p className={s.contentsText}>{a.line}</p>
                  <p className={s.contentsProof}>
                    <span className={s.label}>Proof</span> {a.proof}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* H: chronology */}
        <section className={s.section} id="chronology" aria-labelledby="chronology-title">
          <div className={s.wrap}>
            <LabTag id="4H" label="Timeline" />
            <SectionHead id="chronology-title" title="Chronology" />
            <div className={s.chrono}>
              <div className={s.chronoHead} aria-hidden="true">
                <span />
                {brothers.map((b) => (
                  <span key={b.key} className={s.label}>
                    {b.name}
                  </span>
                ))}
              </div>
              {years.map((y) => (
                <div key={y} className={s.yearRow}>
                  <h3 className={s.year}>{y}</h3>
                  {brothers.map((b) => {
                    const items = timelineAscending.filter(
                      (t) => t.who === b.key && t.start.startsWith(y),
                    );
                    if (!items.length) return null;
                    return (
                      <ul key={b.key} className={s.yearCol} data-who={b.key}>
                        {items.map((t) => (
                          <Event key={`${t.who}-${t.start}-${t.title}`} t={t} />
                        ))}
                      </ul>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* I: write to us */}
        <section className={s.section} id="contact" aria-labelledby="contact-title">
          <div className={s.wrap}>
            <LabTag id="4I" label="Contact" />
            <div className={s.letter}>
              <div className={s.letterHead}>
                <p className={s.kicker}>
                  <span>Write to us</span>
                </p>
                <h2 id="contact-title" className={s.letterTitle}>
                  {site.contactHeadline}
                </h2>
              </div>
              <div className={s.letterBody}>
                <p className={s.letterLine}>{site.contactLine}</p>
                <p className={s.letterAddress}>
                  <a href={site.emailHref}>{site.email}</a>
                </p>
                <p className={s.letterSign}>
                  {creditLabel.both}, {site.location}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* J: colophon */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <LabTag id="4J" label="Footer" />
          <div className={s.footInner}>
            <div>
              <p className={s.footPlate}>{site.name}</p>
              <p className={s.footTagline}>{site.tagline}</p>
            </div>
            <div className={s.footMeta}>
              <p>
                © {site.year} {site.name}, {site.location}
              </p>
              <p>
                <a href={site.emailHref}>{site.email}</a>
              </p>
            </div>
            <div className={s.footMeta}>
              <p className={s.colophon}>Set in Newsreader, Instrument Sans and Instrument Serif.</p>
              <p>
                <a href="#top">Back to the top</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
