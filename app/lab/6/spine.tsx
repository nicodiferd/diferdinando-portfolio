import type { TimelineEntry } from '../_kit';
import { donato, nicolo, timelineAscending } from '../_kit';
import { MeetSvg, NowSvg, meeting } from './lines';
import styles from './two-lines.module.css';

// The timeline as the page's spine: oldest first, Donato's entries on the
// left rail (solid), Nicolo's on the right rail (dashed), years between. A
// rail starts at its brother's first entry. At the meeting the rails bend
// closer and run side by side to "now". On phones both rails sit at the left
// of a single column and every entry keeps its own rail.

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

type Row =
  | {
      kind: 'entry';
      e: TimelineEntry;
      year?: string;
      post: boolean;
      dOn: boolean;
      nOn: boolean;
      dStart: boolean;
      nStart: boolean;
    }
  | { kind: 'meet' }
  | { kind: 'now' };

function buildRows(): Row[] {
  const rows: Row[] = [];
  let lastYear = '';
  let seenD = false;
  let seenN = false;
  let post = false;
  for (const e of timelineAscending) {
    if (!post && meeting && e === meeting.last) {
      rows.push({ kind: 'meet' });
      post = true;
      lastYear = meeting.year;
    }
    const year = e.start.slice(0, 4);
    const dStart = e.who === 'donato' && !seenD;
    const nStart = e.who === 'nicolo' && !seenN;
    if (e.who === 'donato') seenD = true;
    else seenN = true;
    rows.push({
      kind: 'entry',
      e,
      year: year !== lastYear ? year : undefined,
      post,
      dOn: seenD,
      nOn: seenN,
      dStart,
      nStart,
    });
    lastYear = year;
  }
  rows.push({ kind: 'now' });
  return rows;
}

function Node({ e }: { e: TimelineEntry }) {
  return <span className={styles.node} data-kind={e.kind} data-current={e.current ? '' : undefined} />;
}

export function Spine() {
  const rows = buildRows();
  return (
    <ol className={styles.spine}>
      {rows.map((r, i) => {
        if (r.kind === 'meet') {
          return (
            <li key="meet" className={styles.meetRow}>
              <span className={cx(styles.track, styles.trackD, styles.on)} aria-hidden="true" />
              <span className={cx(styles.track, styles.trackN, styles.on)} aria-hidden="true" />
              <MeetSvg />
              {meeting && (
                <div className={styles.meetCell}>
                  <p className={styles.meetLabel}>
                    <mark className={styles.mark}>{meeting.org}</mark> <span className={styles.meetYear}>{meeting.year}</span>
                  </p>
                  <p className={styles.meetNote}>The lines meet</p>
                </div>
              )}
            </li>
          );
        }
        if (r.kind === 'now') {
          return (
            <li key="now" className={styles.endRow}>
              <span className={cx(styles.track, styles.trackD, styles.on)} aria-hidden="true" />
              <span className={cx(styles.track, styles.trackN, styles.on)} aria-hidden="true" />
              <NowSvg />
              <div className={styles.endCell}>
                <mark className={styles.mark}>now</mark>
              </div>
            </li>
          );
        }
        const { e } = r;
        const who = e.who === 'donato' ? donato : nicolo;
        return (
          <li
            key={`${e.who}-${e.start}-${i}`}
            className={cx(styles.row, r.post && styles.post, r.year && styles.hasYear)}
          >
            <span className={cx(styles.track, styles.trackD, r.dOn && styles.on, r.dStart && styles.start)} aria-hidden="true">
              {e.who === 'donato' && <Node e={e} />}
            </span>
            <span className={cx(styles.track, styles.trackN, r.nOn && styles.on, r.nStart && styles.start)} aria-hidden="true">
              {e.who === 'nicolo' && <Node e={e} />}
            </span>
            {r.year && <span className={styles.year}>{r.year}</span>}
            <div className={cx(styles.cell, e.who === 'donato' ? styles.cellD : styles.cellN)}>
              <p className={styles.when}>
                <span className={styles.whoName}>{who.first}</span> {e.when}
              </p>
              <p className={styles.tTitle}>{e.current ? <mark className={styles.mark}>{e.title}</mark> : e.title}</p>
              <p className={styles.tOrg}>
                {e.org}
                {e.kind !== 'work' && <span className={styles.kindTag}>{e.kind}</span>}
              </p>
              {e.note && <p className={styles.tNote}>{e.note}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
