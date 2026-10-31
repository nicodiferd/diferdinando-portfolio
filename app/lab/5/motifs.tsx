// Variant 5's drawings: one small motif per featured project, one icon per
// area, and a few interface glyphs. All inline SVG in currentColor, so each
// one takes the ink of the tile or panel it sits on, in light and dark.

type SvgProps = { className?: string };

const base = {
  'aria-hidden': true,
  focusable: false,
} as const;

/** Bars rising: the warehouse that carries the numbers. */
function Bars({ className }: SvgProps) {
  return (
    <svg {...base} viewBox="0 0 120 100" className={className} fill="currentColor">
      <rect x="6" y="62" width="12" height="30" rx="3" opacity="0.35" />
      <rect x="26" y="48" width="12" height="44" rx="3" opacity="0.5" />
      <rect x="46" y="54" width="12" height="38" rx="3" opacity="0.5" />
      <rect x="66" y="34" width="12" height="58" rx="3" opacity="0.7" />
      <rect x="86" y="22" width="12" height="70" rx="3" opacity="0.85" />
      <rect x="106" y="6" width="12" height="86" rx="3" />
      <rect x="2" y="95" width="118" height="3" rx="1.5" opacity="0.5" />
    </svg>
  );
}

/** A hub and its connections: one definition, many askers. */
function Nodes({ className }: SvgProps) {
  const leaves: [number, number, number][] = [
    [34, 36, 7],
    [92, 16, 6],
    [164, 30, 8],
    [184, 96, 6],
    [142, 142, 7],
    [58, 132, 8],
    [16, 94, 5],
  ];
  return (
    <svg {...base} viewBox="0 0 200 160" className={className}>
      <circle cx="100" cy="80" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.45" />
      <g stroke="currentColor" strokeWidth="2" opacity="0.55" fill="none" strokeLinecap="round">
        {leaves.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M100 80 L${x} ${y}`} />
        ))}
        <path d="M34 36 L92 16 M164 30 L184 96 M142 142 L58 132 M16 94 L58 132" />
      </g>
      <g fill="currentColor">
        {leaves.map(([x, y, r]) => (
          <circle key={`n-${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
        <circle cx="100" cy="80" r="15" />
      </g>
      <circle cx="100" cy="80" r="23" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** A phone with a pin and a flag on its screen. */
function Phone({ className }: SvgProps) {
  return (
    <svg {...base} viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="34" y="5" width="52" height="110" rx="13" strokeWidth="3" />
      <path d="M52 14 H68" strokeWidth="3" />
      <path d="M58 86 V38" strokeWidth="2.5" />
      <path d="M58 38 L77 45 L58 52 Z" fill="currentColor" strokeWidth="2" />
      <ellipse cx="60" cy="88" rx="13" ry="4" strokeWidth="2" opacity="0.6" />
      <path d="M44 104 Q41 82 54 70" strokeWidth="2" strokeDasharray="2 5" opacity="0.7" />
    </svg>
  );
}

/** A card and a ledger: money in, money out. */
function Card({ className }: SvgProps) {
  return (
    <svg {...base} viewBox="0 0 120 100" className={className} fill="none" stroke="currentColor" strokeLinecap="round">
      <rect x="24" y="8" width="88" height="56" rx="10" fill="currentColor" stroke="none" opacity="0.3" />
      <rect x="8" y="28" width="92" height="62" rx="11" strokeWidth="3" fill="currentColor" fillOpacity="0.08" />
      <rect x="8" y="40" width="92" height="10" fill="currentColor" stroke="none" />
      <path d="M20 64 H52 M20 76 H40" strokeWidth="3" />
      <rect x="72" y="66" width="16" height="12" rx="3" strokeWidth="2.5" />
    </svg>
  );
}

/** A reliability curve that hugs the diagonal. */
function Curve({ className }: SvgProps) {
  const dots: [number, number][] = [
    [28, 95],
    [44, 81],
    [60, 63],
    [76, 47],
    [92, 31],
    [106, 17],
  ];
  return (
    <svg {...base} viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M14 8 V106 H112" strokeWidth="2.5" />
      <path d="M14 106 L112 8" strokeWidth="2" strokeDasharray="4 5" opacity="0.5" />
      <path d="M14 106 C36 94 52 70 70 52 S96 22 112 10" strokeWidth="3" />
      <g fill="currentColor" stroke="none">
        {dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />
        ))}
      </g>
    </svg>
  );
}

/** Three stacked planes: metrics on top of a model. */
function Layers({ className }: SvgProps) {
  const plane = 'M60 10 L108 34 L60 58 L12 34 Z';
  return (
    <svg {...base} viewBox="0 0 120 110" className={className} stroke="currentColor" strokeLinejoin="round">
      <path d={plane} transform="translate(0 44)" fill="currentColor" fillOpacity="0.25" strokeWidth="2" />
      <path d={plane} transform="translate(0 22)" fill="currentColor" fillOpacity="0.5" strokeWidth="2" />
      <path d={plane} fill="currentColor" strokeWidth="2" />
    </svg>
  );
}

const projectMotifs: Record<string, (p: SvgProps) => React.JSX.Element> = {
  'data-platform': Bars,
  'semantic-layer': Nodes,
  wedge: Phone,
  zedi: Card,
  bblmlp: Curve,
  'metric-layer': Layers,
};

export function ProjectMotif({ id, className }: { id: string; className?: string }) {
  const M = projectMotifs[id];
  return M ? <M className={className} /> : null;
}

const areaPaths: Record<string, React.ReactNode> = {
  'data-platforms': (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
  'semantic-ai': (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z" />
      <circle cx="8.5" cy="10" r="1.2" fill="currentColor" />
      <circle cx="15.5" cy="10" r="1.2" fill="currentColor" />
      <path d="M9.7 10h4.6" />
    </>
  ),
  software: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 8.5h18" />
      <path d="M10 12.5l-2 2 2 2M14 12.5l2 2-2 2" />
    </>
  ),
  ml: (
    <>
      <path d="M4 19l5-6 4 3 7-9" />
      <circle cx="9" cy="13" r="1.4" fill="currentColor" />
      <circle cx="13" cy="16" r="1.4" fill="currentColor" />
      <circle cx="20" cy="7" r="1.4" fill="currentColor" />
    </>
  ),
  automation: <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />,
  security: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

export function AreaIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      {...base}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {areaPaths[id]}
    </svg>
  );
}

/** Sun over the water, for the location tile. */
export function Coast({ className }: SvgProps) {
  return (
    <svg {...base} viewBox="0 0 120 80" className={className} fill="none" stroke="currentColor" strokeLinecap="round">
      <circle cx="82" cy="30" r="17" fill="currentColor" stroke="none" />
      <path d="M4 54q9-8 18 0t18 0t18 0t18 0t18 0t18 0" strokeWidth="3" />
      <path d="M4 68q9-8 18 0t18 0t18 0t18 0t18 0t18 0" strokeWidth="3" opacity="0.55" />
    </svg>
  );
}

export function ArrowUpRight({ className }: SvgProps) {
  return (
    <svg {...base} viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11L11 5M6 5h5v5" />
    </svg>
  );
}

export function CopyGlyph({ className }: SvgProps) {
  return (
    <svg {...base} viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <rect x="5.5" y="5.5" width="8" height="8" rx="2" />
      <path d="M10.5 3.5V3a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
    </svg>
  );
}

export function CheckGlyph({ className }: SvgProps) {
  return (
    <svg {...base} viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}
