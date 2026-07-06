/**
 * ScrollNarrative — one word changes per scroll step, then
 * straight-axis image collage converges (no rotation).
 */

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  NARRATIVE_IMAGES,
  NARRATIVE_LINES,
  NARRATIVE_SCROLL_VH,
} from "../constants/scrollNarrative";

gsap.registerPlugin(ScrollTrigger);

const IMAGE_COUNT = NARRATIVE_IMAGES.length;

/** Clockwise x/y positions only — images stay axis-aligned */
function getImageLayout(isMobile) {
  const unit = isMobile ? 0.72 : 1;
  const spread = isMobile
    ? [
        { x: -0.28, y: -0.14 },
        { x: 0.26, y: -0.12 },
        { x: 0.3, y: 0.04 },
        { x: -0.08, y: 0.18 },
        { x: -0.3, y: 0.06 },
      ]
    : [
        { x: -0.36, y: -0.24 },
        { x: 0.34, y: -0.2 },
        { x: 0.38, y: 0.06 },
        { x: -0.1, y: 0.3 },
        { x: -0.38, y: 0.1 },
      ];

  const entry = spread.map((p) => ({
    x: p.x + (p.x >= 0 ? 0.85 : -0.85) * unit,
    y: p.y + (p.y >= 0 ? 0.65 : -0.65) * unit,
  }));

  const orbit = spread.map((p, i) => {
    const next = spread[(i + 1) % spread.length];
    return {
      x: (p.x + next.x) * 0.42,
      y: (p.y + next.y) * 0.42,
    };
  });

  const stack = Array.from({ length: IMAGE_COUNT }, () => ({ x: 0, y: 0 }));

  return { spread, entry, orbit, stack };
}

export default function ScrollNarrative() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const textLayerRef = useRef(null);
  const wordOutRefs = useRef([]);
  const wordInRefs = useRef([]);
  const imageRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return undefined;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(max-width: 767px)");
    const getMobile = () => mq.matches;

    let ctx;

    const build = () => {
      ctx?.revert();

      const isMobile = getMobile();
      const { spread, entry, orbit, stack } = getImageLayout(isMobile);
      const scrollVh = isMobile ? NARRATIVE_SCROLL_VH.mobile : NARRATIVE_SCROLL_VH.desktop;
      const vh = window.innerHeight;
      const toPx = (p) => ({ x: p.x * vh, y: p.y * vh });

      ctx = gsap.context(() => {
        if (textLayerRef.current) {
          gsap.set(textLayerRef.current, { opacity: 1, y: 0, scale: 1 });
        }

        wordOutRefs.current.forEach((el) => {
          if (!el) return;
          gsap.set(el, { opacity: 1, y: 0 });
        });
        wordInRefs.current.forEach((el) => {
          if (!el) return;
          gsap.set(el, { opacity: 0, y: 28 });
        });

        imageRefs.current.forEach((el, i) => {
          if (!el) return;
          const start = toPx(entry[i]);
          gsap.set(el, {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            x: start.x,
            y: start.y,
            rotation: 0,
            scale: 1,
            opacity: 0,
            zIndex: i + 1,
          });
        });

        if (prefersReduced) {
          wordOutRefs.current.forEach((el) => gsap.set(el, { opacity: 0 }));
          wordInRefs.current.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
          imageRefs.current.forEach((el, i) => {
            if (!el) return;
            gsap.set(el, {
              left: "50%",
              top: "50%",
              xPercent: -50,
              yPercent: -50,
              x: 0,
              y: 0,
              rotation: 0,
              scale: isMobile ? 1.04 : 1,
              opacity: 1,
              zIndex: i + 1,
            });
          });
          if (textLayerRef.current) gsap.set(textLayerRef.current, { opacity: 0 });
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${scrollVh * 100}%`,
            pin,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const wordDur = 1;
        const wordGap = 0.2;

        NARRATIVE_LINES.forEach((_, i) => {
          const outEl = wordOutRefs.current[i];
          const inEl = wordInRefs.current[i];
          if (!outEl || !inEl) return;

          const at = i * (wordDur + wordGap);

          tl.to(outEl, { opacity: 0, y: -28, duration: wordDur, ease: "power2.inOut" }, at);
          tl.fromTo(
            inEl,
            { opacity: 0, y: 28, immediateRender: false },
            { opacity: 1, y: 0, duration: wordDur, ease: "power2.inOut", immediateRender: false },
            at
          );
        });

        const textEnd = (NARRATIVE_LINES.length - 1) * (wordDur + wordGap) + wordDur;

        const imageStart = textEnd + 0.35;
        const enterDur = 1.1;
        const orbitDur = 1.45;
        const stackDur = 1.15;

        imageRefs.current.forEach((el, i) => {
          if (!el) return;
          const spreadPx = toPx(spread[i]);

          tl.to(el, { opacity: 1, duration: 0.3 }, imageStart + i * 0.1);
          tl.to(
            el,
            {
              x: spreadPx.x,
              y: spreadPx.y,
              rotation: 0,
              scale: 1,
              duration: enterDur,
              ease: "power2.out",
            },
            imageStart + i * 0.12
          );
        });

        const orbitStart = imageStart + enterDur + 0.2;
        imageRefs.current.forEach((el, i) => {
          if (!el) return;
          const orbitPx = toPx(orbit[i]);
          tl.to(
            el,
            {
              x: orbitPx.x,
              y: orbitPx.y,
              rotation: 0,
              scale: 1,
              duration: orbitDur,
              ease: "power1.inOut",
            },
            orbitStart + i * 0.05
          );
        });

        const stackStart = orbitStart + orbitDur + 0.12;

        if (textLayerRef.current) {
          tl.to(
            textLayerRef.current,
            {
              opacity: 0,
              duration: stackDur * 0.7,
              ease: "power2.in",
            },
            stackStart
          );
        }

        [...wordOutRefs.current, ...wordInRefs.current].forEach((el) => {
          if (!el) return;
          tl.to(el, { opacity: 0, duration: stackDur * 0.7, ease: "power2.in" }, stackStart);
        });

        imageRefs.current.forEach((el, i) => {
          if (!el) return;
          tl.to(
            el,
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: isMobile ? 1.04 : 1.14,
              opacity: 1,
              zIndex: 50 + i,
              duration: stackDur,
              ease: "power3.inOut",
            },
            stackStart + (IMAGE_COUNT - 1 - i) * 0.07
          );
        });

        tl.to({}, { duration: 0.35 }, stackStart + stackDur);
      }, section);
    };

    build();
    const onResize = () => {
      build();
      ScrollTrigger.refresh();
    };
    mq.addEventListener("change", onResize);
    window.addEventListener("resize", onResize);

    return () => {
      mq.removeEventListener("change", onResize);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        .sn-root {
          position: relative;
          width: 100%;
          background: #f5f5f3;
        }
        .sn-pin {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sn-stage {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 1600px;
          margin: 0 auto;
        }
        .sn-text-layer {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
          pointer-events: none;
          padding: clamp(64px, 11vh, 96px) 0.75rem clamp(40px, 8vh, 72px);
          will-change: transform, opacity;
        }
        .sn-text-block {
          text-align: center;
          max-width: 96vw;
          padding: 0 0.25rem;
        }
        .sn-line-wrap {
          position: relative;
          min-height: clamp(2.35rem, 11vw, 4.5rem);
          margin-bottom: 0.01em;
        }
        .sn-line {
          display: block;
          position: relative;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height: 0.9;
          color: #0a0a0a;
          user-select: none;
          white-space: nowrap;
          will-change: transform, opacity;
        }
        .sn-line--incoming {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
        }
        .sn-line--sans {
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: clamp(2.2rem, 10.5vw, 4.35rem);
        }
        .sn-line--serif {
          font-family: Georgia, "Times New Roman", Times, serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(2.3rem, 11.5vw, 4.55rem);
          letter-spacing: -0.02em;
        }
        .sn-images {
          position: absolute;
          inset: 0;
          z-index: 45;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sn-image-wrap {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(52vw, 255px);
          height: min(69vw, 340px);
          margin: 0;
          will-change: transform, opacity;
        }
        @media (min-width: 768px) {
          .sn-text-layer {
            padding: clamp(72px, 14vh, 120px) clamp(16px, 4vw, 48px) clamp(48px, 10vh, 96px);
          }
          .sn-line-wrap {
            min-height: clamp(3rem, 8vw, 7.5rem);
            margin-bottom: 0.02em;
          }
          .sn-line {
            line-height: 0.95;
          }
          .sn-line--sans {
            font-size: clamp(2rem, 8.5vw, 6.75rem);
          }
          .sn-line--serif {
            font-size: clamp(2.1rem, 9vw, 7.25rem);
          }
          .sn-image-wrap {
            width: min(26vw, 360px);
            height: min(19.5vw, 270px);
          }
        }
        .sn-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
          box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.28);
        }
        .sn-vignette {
          position: absolute;
          inset: 0;
          z-index: 15;
          pointer-events: none;
          background: radial-gradient(ellipse 82% 72% at 50% 58%, transparent 42%, rgba(245, 245, 243, 0.45) 100%);
        }
      `}</style>

      <section ref={sectionRef} className="sn-root" aria-label="Studio narrative">
        <div ref={pinRef} className="sn-pin">
          <div className="sn-stage">
            <div ref={textLayerRef} className="sn-text-layer">
              <div className="sn-text-block" aria-live="polite">
                {NARRATIVE_LINES.map((line, i) => (
                  <div key={line.id} className="sn-line-wrap">
                    <span
                      ref={(el) => {
                        wordOutRefs.current[i] = el;
                      }}
                      className={`sn-line sn-line--${line.initialStyle}`}
                    >
                      {line.initial}
                    </span>
                    <span
                      ref={(el) => {
                        wordInRefs.current[i] = el;
                      }}
                      className={`sn-line sn-line--incoming sn-line--${line.finalStyle}`}
                      aria-hidden="true"
                    >
                      {line.final}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sn-images" aria-hidden>
              {NARRATIVE_IMAGES.map((src, i) => (
                <div
                  key={src}
                  ref={(el) => {
                    imageRefs.current[i] = el;
                  }}
                  className="sn-image-wrap"
                >
                  <img src={src} alt="" className="sn-image" draggable={false} loading="lazy" />
                </div>
              ))}
            </div>

            <div className="sn-vignette" />
          </div>
        </div>
      </section>
    </>
  );
}
