import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PillButton from "./PillButton";
import { NAV_LINKS, CONTACT_PATH } from "../constants/nav";

export default function Navbar({ solid = false }) {
  const [scrolled, setScrolled] = useState(solid);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const timerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (solid) setScrolled(true);
  }, [solid]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(solid || y > 40);

      if (y < lastY.current || y < 80) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastY.current = y;

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(true), 800);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timerRef.current);
    };
  }, [solid]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const isSolid = scrolled || menuOpen || solid;

  return (
    <>
      <style>{`
        .nv-roll {
          position: relative;
          display: inline-block;
          overflow: hidden;
          line-height: 1;
          cursor: pointer;
          text-decoration: none;
        }
        .nv-roll-stack {
          display: flex;
          flex-direction: column;
          transition: transform 0.42s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
        }
        .nv-roll:hover .nv-roll-stack {
          transform: translateY(-50%);
        }
        .nv-roll-label {
          display: block;
          white-space: nowrap;
          flex-shrink: 0;
        }
      `}</style>

      <nav
        className={[
          "fixed top-0 left-0 right-0 z-[9999] font-sans overflow-visible",
          "flex items-center justify-between",
          "px-4 sm:px-6 md:px-10 lg:px-14",
          "min-h-[72px] py-2.5 sm:min-h-[72px] sm:py-0 md:h-[84px] lg:h-[96px]",
          "max-md:pt-[max(14px,calc(env(safe-area-inset-top,0px)+0.5rem))]",
          "max-md:pb-3",
          "transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
          isSolid
            ? "bg-white/92 backdrop-blur-xl border-b border-black/[0.07] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]"
            : "bg-transparent border-b border-transparent",
          !visible && !menuOpen ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        <Link
          to="/home"
          onClick={closeMenu}
          className="flex items-center shrink-0 origin-[left_center] max-md:py-1 max-md:pl-0.5 scale-[1.82] sm:scale-[1.2] md:scale-[1.4] lg:scale-[1.45]"
        >
          <img
            src="/logo.png"
            alt="ThirdSpace Architecture Studio"
            className="h-[62px] sm:h-[56px] md:h-[72px] lg:h-[80px] w-auto max-w-[min(350px,86vw)] sm:max-w-[min(280px,42vw)] md:max-w-[min(460px,54vw)] object-contain object-left transition-opacity duration-300 hover:opacity-60"
          />
        </Link>

        {/* Desktop nav */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex md:gap-12 lg:gap-16">
          {NAV_LINKS.map(({ label, to }) => (
            <NavRoll key={to} label={label} to={to} />
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="hidden md:block w-px h-[18px] bg-black/15" />
          <div className="hidden sm:block">
            <PillButton to={CONTACT_PATH}>Contact</PillButton>
          </div>

          <button
            type="button"
            className="relative z-[10002] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-px w-5 bg-[#0a0a0a] transition-all duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-[#0a0a0a] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-[#0a0a0a] transition-all duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[9998] bg-white transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-[max(2.75rem,calc(env(safe-area-inset-bottom,0px)+2.25rem))] pt-[max(7.25rem,calc(env(safe-area-inset-top,0px)+6.25rem))] sm:px-8">
          <div className="flex flex-col gap-8 pt-2">
            {NAV_LINKS.map(({ label, to }, i) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className="text-3xl font-medium tracking-[-0.03em] text-[#0a0a0a] opacity-0 animate-fade-in [animation-fill-mode:forwards]"
                style={{ animationDelay: menuOpen ? `${i * 0.05}s` : "0s" }}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-6 border-t border-black/10 pt-8 pb-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
              ThirdSpace Architecture Studio
            </p>
            <PillButton to={CONTACT_PATH} onClick={closeMenu}>
              Contact
            </PillButton>
          </div>
        </div>
      </div>
    </>
  );
}

function NavRoll({ label, to }) {
  const textClass =
    "text-[clamp(10px,0.82vw,13px)] font-semibold tracking-[0.16em] uppercase text-[#0a0a0a] leading-none";

  return (
    <Link to={to} className="nv-roll" style={{ height: "1em" }}>
      <div className="nv-roll-stack">
        <span className="nv-roll-label" style={{ height: "1em", lineHeight: "1em" }}>
          <span className={textClass}>{label}</span>
        </span>
        <span className="nv-roll-label" style={{ height: "1em", lineHeight: "1em" }}>
          <span className={textClass}>{label}</span>
        </span>
      </div>
    </Link>
  );
}
