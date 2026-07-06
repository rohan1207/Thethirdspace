/**
 * Reviews.jsx — ThirdSpace client & collaborator voices
 */

import { useEffect, useRef } from "react";

const REVIEWS = [
  {
    quote:
      "ThirdSpace brought a rare rigour to our campus masterplan — every court, corridor, and classroom feels shaped by climate, use, and the life of the institution.",
    name: "Institutional Client",
    industry: "Educational Campus, Karnataka",
  },
  {
    quote:
      "Their work on our technology institute balances experiment and pragmatism. The result is architecture that feels distinctly of this place, yet entirely contemporary.",
    name: "Academic Board",
    industry: "Technology Institute, Belagavi",
  },
  {
    quote:
      "The hostel design understands student life beyond the brief — shared spaces, shade, and privacy are resolved with remarkable sensitivity.",
    name: "Campus Development Team",
    industry: "Student Housing, Pune",
  },
  {
    quote:
      "ThirdSpace engages urban questions with depth. Their research-led approach helped us see our city project not as a building, but as part of a larger civic narrative.",
    name: "Urban Development Authority",
    industry: "Urban Intervention, Maharashtra",
  },
  {
    quote:
      "Across scales and typologies, the studio maintains a consistent intelligence — grounded in Indian urban realities while speaking to wider architectural discourse.",
    name: "Design Journal Editor",
    industry: "Publication & Research",
  },
  {
    quote:
      "Our school campus feels open, humane, and durable. Parents, teachers, and students all respond to the clarity of the spaces ThirdSpace created.",
    name: "School Trustees",
    industry: "School Campus, Karnataka",
  },
  {
    quote:
      "They listen carefully, then push the idea further than we imagined. That balance of restraint and invention is what defines their practice.",
    name: "Institutional Client",
    industry: "Headquarters, Belgaum",
  },
  {
    quote:
      "Award-winning work that never feels like spectacle for its own sake — every decision reads as purposeful, contextual, and beautifully resolved.",
    name: "Architecture Critic",
    industry: "National Publication",
  },
];

// Duplicate for seamless loop
const ALL = [...REVIEWS, ...REVIEWS];

export default function Reviews() {
  const trackRef   = useRef(null);
  const rafRef     = useRef(null);
  const posRef     = useRef(0);
  const dirRef     = useRef(-1);
  const pausedRef  = useRef(false);
  const halfRef    = useRef(0);

  const SPEED = 0.55;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    const tick = () => {
      posRef.current += dirRef.current * SPEED;

      const half = halfRef.current;

      if (posRef.current <= -half) {
        posRef.current = -half;
        dirRef.current = 1;
      }
      if (posRef.current >= 0) {
        posRef.current = 0;
        dirRef.current = -1;
      }

      if (track) {
        track.style.transform = `translateX(${posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <>
      <style>{`
        .rv-section {
          width: 100%;
          background: #fff;
          padding: clamp(64px, 10vh, 120px) 0;
          overflow: hidden;
          font-family: var(--font-sans);
        }

        .rv-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(28px, 5vw, 80px);
          margin-bottom: clamp(40px, 6vh, 72px);
        }

        .rv-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-sans);
          font-size: clamp(9px, 0.75vw, 11px);
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #0a0a0a;
        }

        .rv-title {
          font-family: var(--font-sans);
          font-size: clamp(28px, 4vw, 56px);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #0a0a0a;
          line-height: 1;
        }

        .rv-mask {
          position: relative;
          overflow: hidden;
        }
        .rv-mask::before,
        .rv-mask::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: clamp(60px, 8vw, 140px);
          z-index: 2;
          pointer-events: none;
        }
        .rv-mask::before {
          left: 0;
          background: linear-gradient(to right, #fff 0%, transparent 100%);
        }
        .rv-mask::after {
          right: 0;
          background: linear-gradient(to left, #fff 0%, transparent 100%);
        }

        .rv-track {
          display: flex;
          gap: clamp(16px, 2vw, 28px);
          width: max-content;
          will-change: transform;
          padding: 4px 0;
        }

        .rv-card {
          flex-shrink: 0;
          width: clamp(280px, 30vw, 440px);
          border: 1px solid rgba(0,0,0,0.1);
          padding: clamp(28px, 3.5vw, 44px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 32px;
          background: #fff;
          transition: border-color 0.3s ease;
          cursor: default;
        }
        .rv-card:hover {
          border-color: rgba(0,0,0,0.25);
        }

        .rv-quote {
          font-family: var(--font-sans);
          font-size: clamp(13px, 1.1vw, 16px);
          font-weight: 400;
          line-height: 1.72;
          color: #0a0a0a;
          letter-spacing: -0.01em;
        }

        .rv-quote::before {
          content: '"';
          font-family: var(--font-sans);
          font-size: 1.4em;
          font-weight: 500;
          line-height: 0;
          vertical-align: -0.3em;
          margin-right: 2px;
          color: #0a0a0a;
          opacity: 0.35;
        }

        .rv-author-name {
          font-family: var(--font-sans);
          font-size: clamp(10px, 0.85vw, 13px);
          font-weight: 500;
          color: #0a0a0a;
          letter-spacing: 0.02em;
          margin-bottom: 3px;
        }

        .rv-author-industry {
          font-family: var(--font-sans);
          font-size: clamp(9px, 0.75vw, 11px);
          font-weight: 400;
          color: #0a0a0a;
          opacity: 0.38;
          letter-spacing: 0.04em;
        }

        @media (max-width: 640px) {
          .rv-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            padding: 0 clamp(20px, 5vw, 28px);
          }
          .rv-card {
            width: clamp(220px, 72vw, 300px);
            padding: clamp(20px, 4vw, 28px);
            gap: 24px;
          }
          .rv-quote {
            font-size: 12px;
            line-height: 1.65;
          }
          .rv-mask::before,
          .rv-mask::after {
            width: clamp(32px, 10vw, 60px);
          }
        }
      `}</style>

      <section className="rv-section">
        <div className="rv-header">
          <div className="rv-label">
            <span style={{ display:"block", width:20, height:1, background:"#0a0a0a", opacity:0.3 }} />
            Recognition
          </div>
          <h2 className="rv-title">What collaborators say</h2>
        </div>

        <div
          className="rv-mask"
          onMouseEnter={() => { pausedRef.current = true;  }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          <div ref={trackRef} className="rv-track">
            {ALL.map((r, i) => (
              <div key={i} className="rv-card">
                <p className="rv-quote">{r.quote}</p>
                <div>
                  <p className="rv-author-name">{r.name}</p>
                  <p className="rv-author-industry">{r.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
