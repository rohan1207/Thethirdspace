const MARQUEE_ITEMS = [
  "Third Space Architecture",
  "Architecture · Interiors · Urbanism",
  "Belagavi & Pune",
  "Founded 2002",
  "Educational Design",
  "Experimental Practice",
  "Context-Led Design",
  "Award-Winning Work",
  "Campus & Institutions",
  "Indian Urbanism",
  "Built & Unbuilt",
  "Spaces With Intent",
  "Spatial Narratives",
  "Design Research",
  "Multi-Scale Projects",
];

export default function MarqueeStrip() {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <>
      <style>{`
        @keyframes ts-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ts-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: ts-marquee 48s linear infinite;
        }

        .ts-marquee:hover .ts-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <section
        className="ts-marquee relative w-full overflow-hidden border-t border-black/10 bg-white py-5 md:py-6"
        aria-label="ThirdSpace practice highlights"
      >
        <div className="ts-marquee-track">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="shrink-0 whitespace-nowrap px-8 text-[clamp(1.1rem,2.2vw,1.75rem)] font-bold uppercase tracking-[-0.02em] text-[#0a0a0a] md:px-12"
              aria-hidden={i >= MARQUEE_ITEMS.length}
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
