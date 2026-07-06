/**
 * ArchitectureHero.jsx — ThirdSpace studio statement
 */

import { FIRM_TAGLINE } from "../constants/firm";
import PillButton from "./PillButton";

export default function ArchitectureHero() {
  return (
    <>
      <style>{`
        .ah-root {
          position:        relative;
          width:           100%;
          min-height:      100vh;
          background:      #f5f5f3;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          font-family:     var(--font-sans);
          overflow:        hidden;
          padding:         clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px);
        }

        .ah-eyebrow {
          position:      absolute;
          top:           clamp(28px, 4vh, 52px);
          left:          50%;
          transform:     translateX(-50%);
          font-size:     clamp(9px, 0.78vw, 12px);
          font-weight:   400;
          letter-spacing: 0.18em;
          color:         #111;
          white-space:   nowrap;
          text-transform: uppercase;
        }
        .ah-eyebrow strong {
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .ah-headline {
          text-align:     center;
          font-size:      clamp(36px, 7.2vw, 108px);
          font-weight:    500;
          line-height:    0.92;
          letter-spacing: -0.025em;
          color:          #0a0a0a;
          text-transform: uppercase;
          margin:         0 0 clamp(28px, 4vh, 48px);
          padding:        0 2vw;
          user-select:    none;
          max-width:      14ch;
        }

        .ah-body {
          text-align:     center;
          max-width:      min(680px, 92vw);
          font-size:      clamp(13px, 1.15vw, 17px);
          font-weight:    400;
          line-height:    1.75;
          letter-spacing: -0.01em;
          color:          #3a3a3a;
          margin:         0 0 clamp(20px, 3vh, 36px);
        }

        .ah-meta {
          display:        flex;
          flex-wrap:      wrap;
          justify-content: center;
          gap:            clamp(20px, 4vw, 48px);
          margin-bottom:  clamp(32px, 5vh, 56px);
        }

        .ah-meta-item {
          text-align:     center;
        }

        .ah-meta-label {
          display:        block;
          font-size:      clamp(8px, 0.68vw, 10px);
          font-weight:    600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color:          #888;
          margin-bottom:  6px;
        }

        .ah-meta-value {
          display:        block;
          font-size:      clamp(11px, 0.95vw, 14px);
          font-weight:    500;
          letter-spacing: 0.04em;
          color:          #0a0a0a;
        }

        .ah-side {
          position:    absolute;
          top:         50%;
          transform:   translateY(-50%);
          font-size:   clamp(8px, 0.72vw, 11px);
          font-weight: 400;
          letter-spacing: 0.18em;
          color:       #0a0a0a;
          text-transform: uppercase;
          white-space: nowrap;
          line-height: 1.5;
        }
        .ah-side strong {
          font-weight: 700;
        }
        .ah-side-left  { left:  clamp(20px, 3vw, 52px); }
        .ah-side-right { right: clamp(20px, 3vw, 52px); }

        @media (max-width: 767px) {
          .ah-side { display: none; }
          .ah-root {
            min-height: auto;
            justify-content: flex-start;
            padding: 5.25rem 1.25rem 2.75rem;
            padding-top: max(5.25rem, calc(env(safe-area-inset-top, 0px) + 4.75rem));
          }
          .ah-eyebrow {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            margin: 0 0 1.5rem;
            font-size: 8px;
            letter-spacing: 0.14em;
            white-space: normal;
            text-align: center;
            max-width: 100%;
          }
          .ah-headline {
            max-width: 100%;
            font-size: clamp(28px, 9.2vw, 44px);
            line-height: 0.95;
            margin: 0 0 1.25rem;
            padding: 0;
          }
          .ah-body {
            font-size: 14px;
            line-height: 1.65;
            margin: 0 0 1.5rem;
          }
          .ah-meta {
            gap: 1rem 1.75rem;
            margin-bottom: 1.75rem;
          }
          .ah-meta-label {
            margin-bottom: 4px;
          }
        }
      `}</style>

      <section className="ah-root">
        <p className="ah-eyebrow">
          (<strong>THIRDSPACE</strong> ARCHITECTURE STUDIO)
        </p>

        <p className="ah-side ah-side-left">
          Founded<br />
          <strong>2002</strong>
        </p>
        <p className="ah-side ah-side-right">
          Studios<br />
          <strong>Belagavi · Pune</strong>
        </p>

        <h1 className="ah-headline">
          Exploring The<br />
          Interstices<br />
          Of Space
        </h1>

        <p className="ah-body">{FIRM_TAGLINE}</p>

        <div className="ah-meta">
          <div className="ah-meta-item">
            <span className="ah-meta-label">Headquarters</span>
            <span className="ah-meta-value">Belgaum, Karnataka</span>
          </div>
          <div className="ah-meta-item">
            <span className="ah-meta-label">Founded</span>
            <span className="ah-meta-value">2002</span>
          </div>
          <div className="ah-meta-item">
            <span className="ah-meta-label">Studios</span>
            <span className="ah-meta-value">Belagavi & Pune</span>
          </div>
        </div>

        <PillButton href="#work">Explore Our Work</PillButton>
      </section>
    </>
  );
}
