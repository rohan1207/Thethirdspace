/**
 * Territory.jsx → ThirdSpace practice domains
 *
 * Changes from original:
 * 1. MORE SCROLL SENSITIVE — each step triggers after 0.5vh of scroll
 *    (was 1vh per step). Feels immediate and smooth.
 * 2. BIGGER RIGHT IMAGE — width clamp raised from 18vw→26vw, aspect-ratio 4/3→3/2
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { TERRITORY_SERVICE_IMAGES } from "../constants/heroImages";

const SERVICES = [
  {
    label: "Architecture",
    image: TERRITORY_SERVICE_IMAGES[0],
    items: [
      "Context-Driven Design",
      "Multi-Scale Projects",
      "Award-Winning Built Work",
      "National & Global Discourse",
    ],
  },
  {
    label: "Interiors",
    image: TERRITORY_SERVICE_IMAGES[1],
    items: [
      "Spatial Narratives",
      "Material & Detail",
      "Environmental Comfort",
      "Integrated Environments",
    ],
  },
  {
    label: "Urbanism",
    image: TERRITORY_SERVICE_IMAGES[2],
    items: [
      "Indian Urban Context",
      "Localized Engagement",
      "Public Realm",
      "Experimental Outlook",
    ],
  },
  {
    label: "Education",
    image: TERRITORY_SERVICE_IMAGES[3],
    items: [
      "Schools & Campuses",
      "Student Hostels",
      "Technology Institutes",
      "Institutional Planning",
    ],
  },
  {
    label: "Research",
    image: TERRITORY_SERVICE_IMAGES[4],
    items: [
      "Design Experimentation",
      "Published Work",
      "Built & Unbuilt Studies",
      "Practice-Led Inquiry",
    ],
  },
];

const TOTAL = SERVICES.length;

/** Scroll distance (in vh) per breakpoint — shared formula for lock + unlock */
const SCROLL_DESKTOP = { entry: 0.35, step: 0.55, exit: 0.55 };
const SCROLL_MOBILE = { entry: 0.2, step: 0.38, exit: 0.38 };

function computeSectionHeightVh({ entry, step, exit }) {
  // 1vh sticky panel + entry lead-in + (n-1) steps + exit hold on last item
  return 1 + entry + (TOTAL - 1) * step + exit;
}

function indexFromScroll(scrollY, sectionTop, vh, { entry, step }) {
  const scrollPast = scrollY - sectionTop - entry * vh;
  return Math.min(
    TOTAL - 1,
    Math.max(0, Math.floor(scrollPast / (step * vh)))
  );
}

export default function Territory() {
  const [active, setActive] = useState(0);

  const sectionRef = useRef(null);
  const indexRef   = useRef(0);
  const rafRef     = useRef(null);

  const scrollParamsRef = useRef(SCROLL_DESKTOP);
  const [sectionHeightVh, setSectionHeightVh] = useState(
    computeSectionHeightVh(SCROLL_DESKTOP)
  );

  const readIndexFromScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const vh = window.innerHeight || 1;
    const params = scrollParamsRef.current;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const next = indexFromScroll(window.scrollY, sectionTop, vh, params);
    if (next !== indexRef.current) {
      indexRef.current = next;
      setActive(next);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => {
      const params = mq.matches ? SCROLL_MOBILE : SCROLL_DESKTOP;
      scrollParamsRef.current = params;
      setSectionHeightVh(computeSectionHeightVh(params));
      readIndexFromScroll();
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [readIndexFromScroll]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(readIndexFromScroll);
    };
    readIndexFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", readIndexFromScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", readIndexFromScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [readIndexFromScroll]);

  const current = SERVICES[active];

  return (
    <>
      <style>{`
        .svc-word {
          font-family: var(--font-sans);
          font-size: clamp(28px, 5.8vw, 88px);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.03em;
          cursor: default;
          transition: color 0.5s cubic-bezier(0.76, 0, 0.24, 1),
            font-weight 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          display: block;
          white-space: nowrap;
        }
        @media (max-width: 1023px) {
          .svc-word {
            font-size: clamp(24px, 7.6vw, 38px);
            line-height: 1.12;
            white-space: normal;
            text-align: center;
          }
          .svc-word.inactive {
            color: #ececec;
          }
          .svc-img-wrap {
            width: 100%;
            max-width: 100%;
            aspect-ratio: 3 / 4;
            min-height: clamp(300px, 52vh, 460px);
            flex: 1 1 auto;
            margin-bottom: 16px;
            margin-left: auto;
            margin-right: auto;
          }
          .svc-item {
            font-size: 15px;
            line-height: 1.55;
            text-align: center;
          }
          .svc-counter {
            font-size: 11px;
            text-align: center;
            width: 100%;
          }
          .svc-eyebrow {
            font-size: 10px !important;
          }
          .svc-mobile-grid {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            flex: 1;
            width: 100%;
            height: auto;
            min-height: 0;
            overflow: hidden;
          }
          .svc-mobile-left {
            justify-content: flex-start !important;
            align-items: center !important;
            text-align: center;
            width: 100%;
            padding: 4.5rem 0.75rem 0.5rem !important;
            flex-shrink: 0;
          }
          .svc-mobile-left > div:first-child {
            margin-bottom: 0.875rem !important;
            justify-content: center;
          }
          .svc-mobile-words {
            gap: 4px;
            align-items: center;
            width: 100%;
          }
          .svc-mobile-right {
            padding: 0 0.75rem 0.5rem !important;
            align-items: center !important;
            text-align: center;
            width: 100%;
            flex: 1 1 auto;
            min-height: 0;
            display: flex;
            flex-direction: column;
          }
          .svc-mobile-right > div:last-child {
            align-items: center;
            width: 100%;
          }
          .svc-mobile-bottom {
            padding: 0.25rem 0.75rem 1rem !important;
            flex-shrink: 0;
            margin-top: auto;
            justify-content: center !important;
            width: 100%;
          }
          .svc-sticky-mobile {
            height: auto !important;
            min-height: 100vh !important;
            max-height: 100vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            overscroll-behavior: contain;
          }
        }
        .svc-word.active {
          color: #0a0a0a;
          font-weight: 700;
        }
        .svc-word.inactive {
          color: #e8e8e8;
          font-weight: 300;
        }

        /* ── Image: desktop only ── */
        @media (min-width: 1024px) {
          .svc-img-wrap {
            position: relative;
            width: clamp(200px, 26vw, 360px);
            aspect-ratio: 3/2;
            overflow: hidden;
            border-radius: 2px;
            margin-bottom: 24px;
          }
        }
        .svc-img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }
        .svc-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.45s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .svc-img.show { opacity: 1; }
        .svc-img.hide { opacity: 0; }

        .svc-item {
          font-family: var(--font-sans);
          font-size: clamp(11px, 0.95vw, 14px);
          font-weight: 400;
          color: #0a0a0a;
          line-height: 1.9;
          opacity: 0;
          transform: translateY(8px);
          animation: itemIn 0.45s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @keyframes itemIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .svc-counter {
          font-family: var(--font-sans);
          font-size: clamp(9px, 0.72vw, 11px);
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0a0a0a;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full bg-white"
        style={{
          height: `${sectionHeightVh * 100}vh`,
          minHeight: "100vh",
        }}
      >
        <div
          className="svc-sticky-mobile sticky top-0 flex min-h-0 w-full flex-col bg-white lg:!h-screen lg:!min-h-screen lg:!max-h-none lg:overflow-visible"
          style={{ height: "100vh", minHeight: "100vh" }}
        >
          <div
            className="svc-mobile-grid grid h-full min-h-0 flex-1 grid-cols-1 grid-rows-[1fr_auto] lg:grid-cols-[1fr_minmax(220px,28vw)]"
            style={{ maxWidth: "100%" }}
          >
            {/* LEFT */}
            <div
              className="svc-mobile-left flex min-h-0 flex-col justify-center overflow-hidden lg:row-start-1 lg:col-start-1"
              style={{
                padding:
                  "clamp(48px, 9vh, 100px) clamp(24px, 5vw, 80px) clamp(16px, 3vh, 32px)",
              }}
            >
              <div
                className="flex items-center gap-2.5 max-lg:mb-4 max-lg:justify-center"
                style={{ marginBottom: "clamp(24px, 4vh, 48px)" }}
              >
                <span className="block h-px w-5 bg-black" style={{ flexShrink: 0 }} />
                <span
                  className="svc-eyebrow"
                  style={{
                    fontFamily:    "var(--font-sans)",
                    fontSize:      "clamp(9px, 0.75vw, 11px)",
                    fontWeight:    600,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color:         "#0a0a0a",
                  }}
                >
                  What We Do
                </span>
              </div>

              <div className="svc-mobile-words flex flex-col">
                {SERVICES.map((s, i) => (
                  <span
                    key={s.label}
                    className={`svc-word ${i === active ? "active" : "inactive"}`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div
              className="svc-mobile-right flex min-h-0 flex-col items-center justify-center overflow-hidden px-6 pb-6 pt-8 sm:pr-8 md:pr-12 lg:items-start lg:px-0 lg:pb-0 lg:pt-24"
            >
              <div className="svc-img-wrap">
                {SERVICES.map((s, i) => (
                  <img
                    key={s.label}
                    src={s.image}
                    alt=""
                    className={`svc-img ${i === active ? "show" : "hide"}`}
                    draggable={false}
                  />
                ))}
              </div>

              <div key={`items-${active}`} className="flex w-full flex-col items-center max-lg:items-center lg:items-start">
                {current.items.map((item, i) => (
                  <span
                    key={item}
                    className="svc-item"
                    style={{ animationDelay: `${i * 55}ms` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* BOTTOM */}
            <div className="svc-mobile-bottom col-span-1 flex items-end justify-center gap-4 px-6 pb-6 sm:px-8 lg:justify-between lg:px-12 lg:pb-8 lg:col-span-2 lg:row-start-2 lg:col-start-1">
              <span className="svc-counter">
                ({String(active + 1).padStart(2, "0")}){" "}
                {SERVICES[active].label.toUpperCase()}
              </span>
              <div className="hidden items-center gap-1.5 sm:flex">
                {SERVICES.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      display:    "block",
                      width:      i === active ? 14 : 3,
                      height:     1,
                      background: "#0a0a0a",
                      opacity:    i === active ? 0.55 : 0.12,
                      transition: "width 0.45s cubic-bezier(0.76,0,0.24,1), opacity 0.45s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}