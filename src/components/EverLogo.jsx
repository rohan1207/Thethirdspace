/**
 * NirlovyaLogo — Premium SVG wordmark
 *
 * Design language:
 *  - Thin-stroke geometric letterforms (~1.4px optical weight at full size)
 *  - Sparing contrast: the 'i' dot is replaced by a solid gold diamond ◆
 *  - A fine horizontal rule beneath the wordmark, fading at both ends
 *  - Sub-caption "RESIDENCES" in extreme tracking, anchored right
 *  - All geometry hand-tuned on a 320 × 56 viewBox (scalable)
 *  - `currentColor` → inherits white on dark, gold or ink on light
 *
 * Usage:
 *   <NirlovyaLogo />                     → 320 × 56, inherits color
 *   <NirlovyaLogo width={200} />         → proportionally scaled
 *   <NirlovyaLogo accent="#c9a96e" />    → custom accent for diamond + rule
 *   <NirlovyaLogo className="text-white" />
 */
export default function NirlovyaLogo({
  className = '',
  width = 320,
  height,
  accent = '#c9a96e',
  showSub = true,
}) {
  const VB_W = 320
  const VB_H = 56
  const h = height ?? Math.round((width / VB_W) * VB_H)

  return (
    <svg
      className={className}
      width={width}
      height={h}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nirlovya"
      role="img"
    >
      {/* ── GRADIENT DEFS for the rule ── */}
      <defs>
        <linearGradient id="ruleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={accent} stopOpacity="0" />
          <stop offset="30%"  stopColor={accent} stopOpacity="0.55" />
          <stop offset="70%"  stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/*
        ── LETTERFORMS ──
        Each letter is drawn on a 34-unit cap-height grid (ascender baseline y=2, foot y=36).
        Stroke weight: 1.3 (hairline luxury feel).
        Letters are spaced ~4 units apart.
        Total advance fits ~320px viewBox.

        N  i  r  l  o  v  y  a
      */}

      <g stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">

        {/* ── N (x: 0 → 26) ── */}
        <line x1="2"  y1="36" x2="2"  y2="2" />
        <line x1="2"  y1="2"  x2="24" y2="36" />
        <line x1="24" y1="36" x2="24" y2="2" />

        {/* ── i (x: 32 → 38) — stem only; dot = gold diamond below ── */}
        <line x1="35" y1="10" x2="35" y2="36" />
        {/* dot replaced by accent diamond */}
        <polygon
          points="35,2 37.2,4.8 35,7.6 32.8,4.8"
          fill={accent}
          stroke="none"
        />

        {/* ── r (x: 44 → 60) ── */}
        <line x1="46" y1="10" x2="46" y2="36" />
        {/* arm: rises to a soft curve suggestion via two lines */}
        <path d="M46 14 Q55 10 60 13" strokeWidth="1.35" fill="none" />

        {/* ── l (x: 66 → 70) ── */}
        <line x1="68" y1="2"  x2="68" y2="36" />

        {/* ── o (x: 76 → 98) ── */}
        <ellipse cx="87" cy="23" rx="11" ry="13.5" />

        {/* ── v (x: 106 → 128) ── */}
        <polyline points="108,10 117,36 126,10" />

        {/* ── y (x: 134 → 156) ── */}
        {/* upper two arms */}
        <line x1="136" y1="10" x2="145" y2="24" />
        <line x1="154" y1="10" x2="145" y2="24" />
        {/* descender */}
        <line x1="145" y1="24" x2="140" y2="44" />

        {/* ── a (x: 162 → 186) ── */}
        {/* Bowl */}
        <path d="M184 14 Q184 10 174 10 Q162 10 162 23 Q162 36 174 36 Q184 36 184 28" fill="none" />
        {/* Stem */}
        <line x1="184" y1="10" x2="184" y2="36" />
        {/* Mid crossbar (optional refinement) */}
        <line x1="162" y1="23" x2="184" y2="23" strokeOpacity="0.35" strokeWidth="0.9" />

      </g>

      {/* ── RULE beneath wordmark ── */}
      <rect x="0" y="41" width="320" height="0.8" fill="url(#ruleGrad)" />

      {/* ── SUB-CAPTION ── */}
      {showSub && (
        <text
          x="320"
          y="52"
          textAnchor="end"
          fontFamily="'Jost', 'Helvetica Neue', sans-serif"
          fontWeight="300"
          fontSize="6.2"
          letterSpacing="4"
          fill={accent}
          opacity="0.75"
        >
          RESIDENCES
        </text>
      )}
    </svg>
  )
}