import type { BrotherKey, Credit, TimelineEntry } from '../_kit';
import { donato, nicolo, projects, timelineAscending } from '../_kit';
import styles from './two-lines.module.css';

// The two career lines, drawn from the kit's timeline. Donato is the solid
// line, Nicolo the dashed one. They start at each brother's first entry and
// meet where both work now, then run side by side to "now". Every label is a
// kit string (names, orgs, years cut from `start`); geometry is computed.

const r1 = (n: number) => Math.round(n * 10) / 10;

export const yearOf = (start: string) => start.slice(0, 4);

export function toYear(start: string): number {
  const [y, m] = start.split('-').map(Number);
  return y + ((m || 1) - 1) / 12;
}

export const entriesOf = (who: BrotherKey) => timelineAscending.filter((t) => t.who === who);

export type Meeting = { org: string; first: TimelineEntry; last: TimelineEntry; year: string };

/** Where the lines meet: the later arrival at the org both brothers work at now. */
function findMeeting(): Meeting | null {
  if (donato.nowOrg !== nicolo.nowOrg) return null;
  const org = donato.nowOrg;
  const d = entriesOf('donato').find((t) => t.org === org);
  const n = entriesOf('nicolo').find((t) => t.org === org);
  if (!d || !n) return null;
  const [first, last] = d.start <= n.start ? [d, n] : [n, d];
  return { org, first, last, year: yearOf(last.start) };
}

export const meeting = findMeeting();

const sharedProject = projects.find((p) => p.credit === 'both');

/** A short sample of a line: solid, dashed, or both for shared work. */
export function Swatch({ who }: { who: Credit }) {
  return <span className={styles.swatch} data-who={who} aria-hidden="true" />;
}

// --- Geometry ---------------------------------------------------------------

type Cfg = {
  W: number;
  H: number;
  L: number;
  R: number;
  yD: number;
  yN: number;
  sD: number;
  sN: number;
  axisY: number;
  dot: number;
  full: boolean;
};

const FULL: Cfg = { W: 1200, H: 392, L: 96, R: 88, yD: 120, yN: 288, sD: 194, sN: 214, axisY: 364, dot: 4, full: true };
const COMPACT: Cfg = { W: 360, H: 228, L: 14, R: 44, yD: 58, yN: 156, sD: 100, sN: 114, axisY: 204, dot: 3, full: false };

type Line = { who: BrotherKey; xs: number; y: number; s: number; xb: number; xm: number; xe: number };

type Frame = { t0: number; t1: number; x: (t: number) => number; xm: number; xe: number; d: Line; n: Line };

function frame(c: Cfg, m: Meeting): Frame {
  const starts = timelineAscending.map((t) => toYear(t.start));
  const t0 = Math.floor(Math.min(...starts));
  const t1 = Math.max(...starts) + 2 / 12;
  const x = (t: number) => c.L + ((t - t0) / (t1 - t0)) * (c.W - c.L - c.R);
  const xb = x(toYear(m.first.start));
  const xm = x(toYear(m.last.start));
  const xe = c.W - c.R;
  const line = (who: BrotherKey): Line => {
    const xs = x(toYear(entriesOf(who)[0].start));
    const isD = who === 'donato';
    return { who, xs, y: isD ? c.yD : c.yN, s: isD ? c.sD : c.sN, xb: Math.max(xb, xs), xm, xe };
  };
  return { t0, t1, x, xm, xe, d: line('donato'), n: line('nicolo') };
}

function pathOf(l: Line): string {
  const mid = (l.xb + l.xm) / 2;
  return `M${r1(l.xs)} ${l.y} H${r1(l.xb)} C${r1(mid)} ${l.y} ${r1(mid)} ${l.s} ${r1(l.xm)} ${l.s} H${r1(l.xe)}`;
}

/** The line's height at x, solving the bend's cubic where needed. */
function yAt(l: Line, px: number): number {
  if (px <= l.xb) return l.y;
  if (px >= l.xm) return l.s;
  const mid = (l.xb + l.xm) / 2;
  const bx = (u: number) => {
    const v = 1 - u;
    return v * v * v * l.xb + 3 * v * v * u * mid + 3 * v * u * u * mid + u * u * u * l.xm;
  };
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 32; i++) {
    const u = (lo + hi) / 2;
    if (bx(u) < px) lo = u;
    else hi = u;
  }
  const u = (lo + hi) / 2;
  const v = 1 - u;
  return v * v * v * l.y + 3 * v * v * u * l.y + 3 * v * u * u * l.s + u * u * u * l.s;
}

// --- Labels -------------------------------------------------------------------

type Box = { x0: number; y0: number; x1: number; y1: number };
type Label = { lines: string[]; anchor: 'start' | 'end'; box: Box; leader?: { x: number; y0: number; y1: number } };

const FS = 12.5;
const LH = 15;
const CHAR = 6.9;
const DIGIT = 7.6;
const GAP = 12;

function wrap(text: string, max: number): string[] {
  const out: string[] = [];
  let cur = '';
  for (const word of text.split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > max && cur) {
      out.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) out.push(cur);
  return out;
}

function measure(lines: string[]) {
  const w = Math.max(...lines.map((l, i) => l.length * (i === 0 ? DIGIT : CHAR)));
  return { w, h: lines.length * LH };
}

const hits = (b: Box, taken: Box[]) =>
  taken.find((o) => b.x0 < o.x1 + 6 && o.x0 < b.x1 + 6 && b.y0 < o.y1 + 3 && o.y0 < b.y1 + 3);

const within = (b: Box, k: Box) => b.x0 >= k.x0 && b.x1 <= k.x1 && b.y0 >= k.y0 && b.y1 <= k.y1;

/** Put a stop's label beside its dot: out from the line first, then inside, then stacked. */
function placeLabel(px: number, py: number, dir: -1 | 1, lines: string[], taken: Box[], bounds: Box): Label | null {
  const { w, h } = measure(lines);
  const outY = dir < 0 ? py - GAP - h : py + GAP;
  const inY = dir < 0 ? py + GAP : py - GAP - h;
  const rightX = px - 3;
  const leftX = px - 4 - w;
  const tries: [number, number, 'start' | 'end'][] = [
    [rightX, outY, 'start'],
    [rightX, inY, 'start'],
    [leftX, outY, 'end'],
    [leftX, inY, 'end'],
  ];
  for (const [x0, y0, anchor] of tries) {
    const box = { x0, y0, x1: x0 + w, y1: y0 + h };
    if (within(box, bounds) && !hits(box, taken)) return { lines, anchor, box };
  }
  let box = { x0: rightX, y0: outY, x1: rightX + w, y1: outY + h };
  for (let i = 0; i < 8; i++) {
    const hit = hits(box, taken);
    if (!hit) break;
    const y0 = dir < 0 ? hit.y0 - 6 - h : hit.y1 + 6;
    box = { ...box, y0, y1: y0 + h };
  }
  if (!within(box, bounds) || hits(box, taken)) return null;
  return {
    lines,
    anchor: 'start',
    box,
    leader: { x: px, y0: dir < 0 ? py - 6 : py + 6, y1: dir < 0 ? box.y1 + 2 : box.y0 - 2 },
  };
}

function LabelText({ label, tone }: { label: Label; tone: 'stop' | 'meet' | 'plain' }) {
  const tx = r1(label.anchor === 'start' ? label.box.x0 : label.box.x1);
  return (
    <g>
      {label.leader && (
        <line
          className={styles.leader}
          x1={r1(label.leader.x)}
          x2={r1(label.leader.x)}
          y1={r1(label.leader.y0)}
          y2={r1(label.leader.y1)}
        />
      )}
      <text className={styles.svgLabel} textAnchor={label.anchor} fontSize={FS}>
        {label.lines.map((s, i) => (
          <tspan
            key={i}
            x={tx}
            y={r1(label.box.y0 + LH * (i + 1) - 3.5)}
            className={tone === 'plain' ? undefined : i === 0 ? styles.svgYear : tone === 'meet' ? styles.svgStrong : undefined}
          >
            {s}
          </tspan>
        ))}
      </text>
    </g>
  );
}

// --- Marks --------------------------------------------------------------------

function Dot({ e, cx, cy, r }: { e: TimelineEntry; cx: number; cy: number; r: number }) {
  const x = r1(cx);
  const y = r1(cy);
  if (e.current) return <circle className={styles.dotNow} cx={x} cy={y} r={r * 1.4} />;
  if (e.kind === 'milestone')
    return (
      <rect
        className={styles.dotWork}
        x={r1(x - r * 0.85)}
        y={r1(y - r * 0.85)}
        width={r1(r * 1.7)}
        height={r1(r * 1.7)}
        transform={`rotate(45 ${x} ${y})`}
      />
    );
  if (e.kind === 'education') return <circle className={styles.dotEdu} cx={x} cy={y} r={r - 0.5} />;
  return <circle className={styles.dotWork} cx={x} cy={y} r={r} />;
}

function Drawing({ c, m, id }: { c: Cfg; m: Meeting; id: string }) {
  const f = frame(c, m);
  const years: number[] = [];
  for (let y = f.t0; y <= Math.floor(f.t1); y++) years.push(y);
  const mid = (c.sD + c.sN) / 2;
  const pillW = c.full ? 50 : 36;
  const pillH = c.full ? 24 : 18;
  const pillX = f.xe + (c.full ? 10 : 4);
  const jw = c.full ? 9 : 6;
  const jh = c.full ? 12 : 8;
  const dFirst = entriesOf('donato')[0];
  const nFirst = entriesOf('nicolo')[0];
  const title = `${donato.first}: the solid line, from ${yearOf(dFirst.start)}. ${nicolo.first}: the dashed line, from ${yearOf(nFirst.start)}. The lines meet at ${m.org} in ${m.year} and run side by side to now.`;

  // Stops worth a label: org changes before the meeting, milestones left as dots.
  const stops = (line: Line) => {
    const out: TimelineEntry[] = [];
    for (const e of entriesOf(line.who)) {
      if (e.start >= m.last.start || e.kind === 'milestone') continue;
      if (out.length && out[out.length - 1].org === e.org) continue;
      out.push(e);
    }
    return out;
  };

  const labels: { key: string; label: Label; tone: 'stop' | 'meet' | 'plain' }[] = [];
  if (c.full) {
    const nameW = (s: string) => s.length * 15.5;
    const taken: Box[] = [
      { x0: f.d.xs - 14 - nameW(donato.first), y0: f.d.y - 16, x1: f.d.xs - 14, y1: f.d.y + 8 },
      { x0: f.n.xs - 14 - nameW(nicolo.first), y0: f.n.y - 16, x1: f.n.xs - 14, y1: f.n.y + 8 },
      { x0: f.d.xs, y0: f.d.y - 4, x1: f.d.xb, y1: f.d.y + 4 },
      { x0: f.n.xs, y0: f.n.y - 4, x1: f.n.xb, y1: f.n.y + 4 },
      { x0: f.d.xb + 4, y0: f.d.y - 4, x1: f.xm, y1: c.sD + 4 },
      { x0: f.n.xb + 4, y0: c.sN - 4, x1: f.xm, y1: f.n.y + 4 },
      { x0: f.xm - 12, y0: c.sD - 50, x1: c.W, y1: c.sN + 46 },
    ];
    const bounds = { x0: 2, y0: 2, x1: c.W - 2, y1: c.axisY - 8 };
    for (const line of [f.d, f.n]) {
      for (const e of stops(line)) {
        const px = f.x(toYear(e.start));
        const lines = [yearOf(e.start), ...wrap(e.org, 16)];
        const label = placeLabel(px, yAt(line, px), line.who === 'donato' ? -1 : 1, lines, taken, bounds);
        if (label) {
          taken.push(label.box);
          labels.push({ key: `${e.who}-${e.start}`, label, tone: 'stop' });
        }
      }
    }
    const meetLines = [m.year, m.org];
    const mm = measure(meetLines);
    labels.push({
      key: 'meet',
      tone: 'meet',
      label: {
        lines: meetLines,
        anchor: 'start',
        box: { x0: f.xm + 16, y0: c.sD - 14 - mm.h, x1: f.xm + 16 + mm.w, y1: c.sD - 14 },
      },
    });
    if (sharedProject) {
      const pl = wrap(sharedProject.title, 18);
      const pm = measure(pl);
      labels.push({
        key: 'shared',
        tone: 'plain',
        label: { lines: pl, anchor: 'start', box: { x0: f.xm + 16, y0: c.sN + 14, x1: f.xm + 16 + pm.w, y1: c.sN + 14 + pm.h } },
      });
    }
  }

  return (
    <svg
      className={c.full ? styles.drawFull : styles.drawCompact}
      viewBox={`0 0 ${c.W} ${c.H}`}
      role="img"
      aria-labelledby={id}
    >
      <title id={id}>{title}</title>

      <line className={styles.axis} x1={c.L} x2={r1(f.xe)} y1={c.axisY} y2={c.axisY} />
      {years.map((y) => {
        const px = r1(f.x(y));
        const show = c.full || y % 2 === 0;
        return (
          <g key={y}>
            <line className={styles.axis} x1={px} x2={px} y1={c.axisY} y2={c.axisY + 5} />
            {show && (
              <text className={styles.axisLabel} x={px} y={c.axisY + 18} textAnchor="middle" fontSize={c.full ? 12 : 11.5}>
                {y}
              </text>
            )}
          </g>
        );
      })}

      <path className={styles.pathD} d={pathOf(f.d)} />
      <path className={styles.pathN} d={pathOf(f.n)} />

      {[f.d, f.n].map((line) =>
        entriesOf(line.who)
          .filter((e) => e !== m.last)
          .map((e) => {
            const px = f.x(toYear(e.start));
            return <Dot key={`${e.who}-${e.start}-${e.title}`} e={e} cx={px} cy={yAt(line, px)} r={c.dot} />;
          }),
      )}

      <rect
        className={styles.junction}
        x={r1(f.xm - jw)}
        y={c.sD - jh}
        width={jw * 2}
        height={c.sN - c.sD + jh * 2}
        rx={jw}
      />
      <rect className={styles.pill} x={r1(pillX)} y={mid - pillH / 2} width={pillW} height={pillH} rx={pillH / 2} />
      <text
        className={styles.pillText}
        x={r1(pillX + pillW / 2)}
        y={r1(mid + (c.full ? 4.5 : 4))}
        textAnchor="middle"
        fontSize={c.full ? 13 : 11}
      >
        now
      </text>

      {c.full ? (
        <>
          <text className={styles.svgName} x={r1(f.d.xs - 14)} y={f.d.y + 7} textAnchor="end" fontSize={22}>
            {donato.first}
          </text>
          <text className={styles.svgName} x={r1(f.n.xs - 14)} y={f.n.y + 7} textAnchor="end" fontSize={22}>
            {nicolo.first}
          </text>
          {labels.map((l) => (
            <LabelText key={l.key} label={l.label} tone={l.tone} />
          ))}
        </>
      ) : (
        <>
          <text className={styles.svgName} x={r1(f.d.xs - 3)} y={c.yD - 24} fontSize={16}>
            {donato.first}
          </text>
          <text className={styles.svgLabel} x={r1(f.d.xs - 3)} y={c.yD - 9} fontSize={12.5}>
            <tspan className={styles.svgYear}>{yearOf(dFirst.start)}</tspan>
          </text>
          <text className={styles.svgLabel} x={r1(f.n.xs - 3)} y={c.yN + 19} fontSize={12.5}>
            <tspan className={styles.svgYear}>{yearOf(nFirst.start)}</tspan>
          </text>
          <text className={styles.svgName} x={r1(f.n.xs - 3)} y={c.yN + 36} fontSize={16}>
            {nicolo.first}
          </text>
          <line className={styles.leader} x1={r1(f.xm)} x2={r1(f.xm)} y1={c.sD - jh - 3} y2={c.yD - 4} />
          <text className={styles.svgLabel} x={c.W - 2} y={c.yD - 24} textAnchor="end" fontSize={12.5}>
            <tspan className={styles.svgYear}>{m.year}</tspan>
          </text>
          <text className={styles.svgLabel} x={c.W - 2} y={c.yD - 9} textAnchor="end" fontSize={12.5}>
            <tspan className={styles.svgStrong}>{m.org}</tspan>
          </text>
        </>
      )}
    </svg>
  );
}

/** The hero drawing: a labelled wide version, and a simpler one for narrow screens. */
export function HeroDrawing() {
  if (!meeting) return null;
  return (
    <>
      <Drawing c={FULL} m={meeting} id="l6-lines-full" />
      <Drawing c={COMPACT} m={meeting} id="l6-lines-compact" />
    </>
  );
}

// --- Small drawings -------------------------------------------------------------

/** Timeline junction (wide screens): the two rails bend together into the meeting. */
export function MeetSvg() {
  if (!meeting) return null;
  return (
    <svg className={styles.meetSvg} width={152} height={120} viewBox="0 0 152 120" aria-hidden="true">
      <path className={styles.pathD} d="M14 0 V14 C14 40 42 34 42 60 V120" />
      <path className={styles.pathN} d="M138 0 V14 C138 40 110 34 110 60 V120" />
      <rect className={styles.junction} x={8} y={64} width={136} height={42} rx={4} />
      <text className={styles.pillText} x={76} y={82} textAnchor="middle" fontSize={13.5}>
        {meeting.org}
      </text>
      <text className={styles.pillSub} x={76} y={98} textAnchor="middle" fontSize={12}>
        {meeting.year}
      </text>
    </svg>
  );
}

/** Timeline end (wide screens): both rails run into "now". */
export function NowSvg() {
  return (
    <svg className={styles.endSvg} width={96} height={44} viewBox="0 0 96 44" aria-hidden="true">
      <path className={styles.pathD} d="M14 0 V20" />
      <path className={styles.pathN} d="M82 0 V20" />
      <rect className={styles.pill} x={4} y={14} width={88} height={26} rx={13} />
      <text className={styles.pillText} x={48} y={31.5} textAnchor="middle" fontSize={13}>
        now
      </text>
    </svg>
  );
}

/** The shared card's picture: two lines arrive apart and leave together. */
export function PayoffSvg() {
  return (
    <svg className={styles.payoffSvg} viewBox="0 0 480 180" aria-hidden="true">
      <path className={styles.pathD} d="M0 34 H140 C214 34 214 80 288 80 H480" />
      <path className={styles.pathN} d="M0 146 H140 C214 146 214 100 288 100 H480" />
      <rect className={styles.junction} x={276} y={66} width={24} height={48} rx={12} />
    </svg>
  );
}

/** Contact: the two lines end in one point. */
export function EndpointSvg() {
  return (
    <svg className={styles.endpointSvg} viewBox="0 0 160 96" aria-hidden="true">
      <path className={styles.pathD} d="M2 18 H44 C96 18 104 48 144 48" />
      <path className={styles.pathN} d="M2 78 H44 C96 78 104 48 144 48" />
      <circle className={styles.junction} cx={150} cy={48} r={9} />
    </svg>
  );
}

/** The wordmark's small mark: solid and dashed lines meeting in a point. */
export function BrandMark() {
  return (
    <svg className={styles.brandMark} viewBox="0 0 32 18" aria-hidden="true">
      <path className={styles.markD} d="M1 3 H8 C16 3 18 9 26 9" />
      <path className={styles.markN} d="M1 15 H8 C16 15 18 9 26 9" />
      <circle className={styles.junctionSmall} cx={28} cy={9} r={3} />
    </svg>
  );
}
