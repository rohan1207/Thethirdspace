/**
 * CollectionsBento.jsx — ThirdSpace practice domains
 *
 * Hover effect:
 * - Each card has its own image
 * - On hover → that card's image scales to fill the ENTIRE bento section
 *   as a background layer (opacity 0 → 1, scale 1.04 → 1)
 * - Cards sit above it, the hovered card glows, others dim slightly
 * - On leave → background fades out
 *
 * Categories: Residential · Office · Hospitality · Retail · Healthcare
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GALLERY_DOMAIN_IMAGES } from "../constants/heroImages";
import { getWorkCategoryPath, GALLERY_DOMAIN_LINKS } from "../constants/projects";
import PillButton from "./PillButton";

const CATEGORIES = [
  {
    id:    "education",
    label: "Education",
    sub:   "Schools, Hostels & Institutes",
    image: GALLERY_DOMAIN_IMAGES.education,
    bg:    "rgba(240,237,232,0.92)",
    text:  "#0a0a0a",
  },
  {
    id:    "architecture",
    label: "Architecture",
    sub:   "Built & Unbuilt Work",
    image: GALLERY_DOMAIN_IMAGES.architecture,
    bg:    "rgba(18,18,18,0.82)",
    text:  "#ffffff",
  },
  {
    id:    "interiors",
    label: "Interiors",
    sub:   "Spatial & Material Studies",
    image: GALLERY_DOMAIN_IMAGES.interiors,
    bg:    "rgba(240,237,232,0.92)",
    text:  "#0a0a0a",
  },
  {
    id:    "urbanism",
    label: "Urbanism",
    sub:   "City & Public Realm",
    image: GALLERY_DOMAIN_IMAGES.urbanism,
    bg:    "rgba(240,237,232,0.92)",
    text:  "#0a0a0a",
  },
  {
    id:    "research",
    label: "Research",
    sub:   "Experimental Practice",
    image: GALLERY_DOMAIN_IMAGES.research,
    bg:    "rgba(18,18,18,0.82)",
    text:  "#ffffff",
  },
];

export default function CollectionsBento() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const hoveredCat = CATEGORIES.find(c => c.id === hovered);

  return (
    <>
      <style>{`
        .bento-root {
          width: 100%;
          background: #f9f8f6;
          padding: clamp(56px,9vh,110px) clamp(20px,4vw,64px);
          font-family: var(--font-sans);
        }

        .bento-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: clamp(28px,4vh,52px);
        }

        .bento-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(9px,0.72vw,11px);
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #0a0a0a;
          opacity: 0.4;
          margin-bottom: 10px;
        }

        .bento-title {
          font-family: var(--font-sans);
          font-size: clamp(32px, 4.5vw, 68px);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #0a0a0a;
          line-height: 1;
        }

        /* ── Grid wrapper: position relative so bg image sits inside it ── */
        .bento-grid-wrap {
          position: relative;
          overflow: hidden;
        }

        /* Full-section background image on hover */
        .bento-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .bento-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.04);
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94),
                      opacity 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
          opacity: 0;
        }
        .bento-bg.visible img {
          opacity: 1;
          transform: scale(1);
        }
        /* Dark scrim over bg so cards remain legible */
        .bento-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.38);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .bento-bg.visible::after {
          opacity: 1;
        }

        /* ── Grid ── */
        .bento-grid {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 2px;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 340px 340px;
        }
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 260px 260px 260px;
          }
        }
        @media (max-width: 580px) {
          .bento-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: unset;
            gap: 3px;
          }
          .bento-grid > * {
            height: 148px;
            grid-column: auto !important;
            grid-row: auto !important;
          }
          .bento-card-body {
            padding: 12px;
          }
          .bento-card-label {
            font-size: 14px;
            margin-bottom: 2px;
          }
          .bento-card-sub {
            font-size: 7px;
            letter-spacing: 0.14em;
            margin-bottom: 8px;
          }
          .bento-card-cta {
            display: none;
          }
        }

        /* ── Card ── */
        .bento-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          isolation: isolate;
        }

        /* Card own image — always present */
        .bento-card-img {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .bento-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1);
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .bento-card:hover .bento-card-img img {
          transform: scale(1.06);
        }

        /* Gradient overlay */
        .bento-card-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
          transition: opacity 0.4s ease;
        }

        /* Card text */
        .bento-card-body {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(18px,2.5vw,32px);
        }

        .bento-card-label {
          font-family: var(--font-sans);
          font-size: clamp(18px,2.2vw,32px);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1;
          margin-bottom: 5px;
          transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
        }
        .bento-card:hover .bento-card-label {
          transform: translateY(-3px);
        }

        .bento-card-sub {
          font-size: clamp(8px,0.68vw,10px);
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 14px;
          transition: transform 0.4s cubic-bezier(0.76,0,0.24,1) 0.03s;
        }
        .bento-card:hover .bento-card-sub {
          transform: translateY(-3px);
        }

        .bento-card-cta {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.76,0,0.24,1);
        }
        .bento-card:hover .bento-card-cta {
          opacity: 1;
          transform: translateY(0);
        }

        /* When ANY card is hovered, all cards dim except the hovered one */
        .bento-grid.has-hover .bento-card:not(.is-hovered) .bento-card-overlay {
          opacity: 0.55;
        }
        .bento-grid.has-hover .bento-card:not(.is-hovered) .bento-card-img img {
          filter: brightness(0.6);
        }
        .bento-card.is-hovered .bento-card-overlay {
          opacity: 0.2;
        }
      `}</style>

      <section className="bento-root">

        {/* Header */}
        <div className="bento-header">
          <div>
            <div className="bento-eyebrow">
              <span style={{ display:"block", width:18, height:1, background:"#0a0a0a" }} />
              Our Domains
            </div>
            <h2 className="bento-title">Practice Domains</h2>
          </div>
          <PillButton to="/work">View All Work</PillButton>
        </div>

        {/* Grid wrapper — bg image lives here */}
        <div className="bento-grid-wrap">

          {/* Full-section background image */}
          <div className={`bento-bg ${hovered ? "visible" : ""}`}>
            {CATEGORIES.map(c => (
              <img
                key={c.id}
                src={c.image}
                alt=""
                draggable={false}
                style={{
                  position:   "absolute",
                  inset:      0,
                  opacity:    hovered === c.id ? 1 : 0,
                  transform:  hovered === c.id ? "scale(1)" : "scale(1.04)",
                  transition: "opacity 0.55s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
                  width:      "100%",
                  height:     "100%",
                  objectFit:  "cover",
                  display:    "block",
                }}
              />
            ))}
            {/* Scrim */}
            <div style={{
              position:   "absolute",
              inset:      0,
              background: "rgba(0,0,0,0.35)",
              opacity:    hovered ? 1 : 0,
              transition: "opacity 0.5s ease",
            }} />
          </div>

          {/* Cards grid */}
          <div className={`bento-grid ${hovered ? "has-hover" : ""}`}>
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                role="link"
                tabIndex={0}
                className={`bento-card ${hovered === cat.id ? "is-hovered" : ""}`}
                style={{
                  // Layout:
                  // Row 1: Residential(col1) | Office(col2) | Hospitality(col3, rows1-2)
                  // Row 2: Retail(col1)      | Healthcare(col2) |  ^
                  gridColumn: i === 0 ? "1"     : i === 1 ? "2"     : i === 2 ? "3" : i === 3 ? "1 / 3" : "3",
                  gridRow:    i === 0 ? "1"     : i === 1 ? "1"     : i === 2 ? "1" : i === 3 ? "2"     : "2",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(getWorkCategoryPath(GALLERY_DOMAIN_LINKS[cat.id]))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(getWorkCategoryPath(GALLERY_DOMAIN_LINKS[cat.id]));
                  }
                }}
              >
                {/* Card's own image */}
                <div className="bento-card-img">
                  <img src={cat.image} alt={cat.label} draggable={false} />
                </div>

                {/* Gradient */}
                <div className="bento-card-overlay" />

                {/* Text */}
                <div className="bento-card-body">
                  <p className="bento-card-sub">{cat.sub}</p>
                  <h3 className="bento-card-label">{cat.label}</h3>
                  <div className="bento-card-cta">
                    <PillButton
                      to={getWorkCategoryPath(GALLERY_DOMAIN_LINKS[cat.id])}
                      variant="light"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore
                    </PillButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}