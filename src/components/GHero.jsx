import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_IMAGES } from "../constants/heroImages";

/** "THIRD SPACE" — 11 characters including the space */
const SEQUENCE = "THIRD SPACE".split("");

/** Slide / letter step — faster on compact card + during zoom-in */
const BEAT_MS_COMPACT = 800;
/** Slower image changes only while fullscreen (expanded / pinned / shrinking back) */
const BEAT_MS_FULLSCREEN = 1400;

/** Smooth, symmetric zoom — no positional drift */
const expandTransition = {
  duration: 1.05,
  ease: [0.22, 1, 0.36, 1],
};

const EXPAND_DURATION_MS = Math.round(expandTransition.duration * 1000);

function getScrollbarWidth() {
  if (typeof window === "undefined") return 0;
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
}

/** Freeze page scroll (trackpad/wheel still fires — must pair with preventDefault listeners). */
function applyHardScrollLock(scrollY) {
  const y = typeof scrollY === "number" ? scrollY : window.scrollY;
  const sb = getScrollbarWidth();
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.overscrollBehavior = "none";
  document.body.style.overflow = "hidden";
  // Prevent touch panning jitter during fixed-body lock on mobile browsers.
  document.body.style.touchAction = "none";
  document.body.style.paddingRight = sb > 0 ? `${sb}px` : "";
  document.body.style.position = "fixed";
  document.body.style.top = `-${y}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.documentElement.dataset.gheroLockY = String(y);
}

function releaseHardScrollLock() {
  const raw = document.documentElement.dataset.gheroLockY ?? "0";
  const parsed = Number.parseInt(raw, 10);
  const y = Number.isFinite(parsed) ? parsed : 0;
  document.documentElement.style.overflow = "";
  document.documentElement.style.overscrollBehavior = "";
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
  document.body.style.paddingRight = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  delete document.documentElement.dataset.gheroLockY;
  requestAnimationFrame(() => {
    window.scrollTo(0, y);
  });
}

function applySoftScrollLock() {
  const sb = getScrollbarWidth();
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = sb > 0 ? `${sb}px` : "";
}

function releaseSoftScrollLock() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

/** Compact card width — narrower on phone for vertical portrait frame */
function getCompactFrameWidth(vw) {
  if (vw < 640) return Math.min(vw * 0.68, 420);
  if (vw < 1024) return Math.min(vw * 0.68, 580);
  return Math.min(vw * 0.52, 580);
}

/** Compact card height from width — portrait on phone */
function getCompactFrameHeight(w, vw) {
  if (vw < 640) return (w * 4) / 3;
  return (w * 10) / 16;
}

/** Cover scale: uniform zoom so the compact frame fills the viewport (like object-cover). */
function getCoverScale() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = getCompactFrameWidth(vw);
  const h = getCompactFrameHeight(w, vw);
  return Math.max(vw / w, vh / h) * 1.015;
}

/**
 * Phases:
 * - idle: compact center frame
 * - expanding: first scroll down → fullscreen (in-flow)
 * - expanded: fullscreen in document flow; user can scroll away
 * - reverse_fixed: hero fully in view again → fixed overlay, viewport filled with image
 * - shrinking: second reverse gesture → animate back to compact
 */
export default function GHero() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const sectionRef = useRef(null);
  const spacerRef = useRef(null);
  const wasBelowHeroRef = useRef(false);
  const reverseFixedEnteredRef = useRef(false);
  const hasExpandedOnceRef = useRef(false);
  /** Ignore intersection flicker right after unlock — prevents false jump to reverse_fixed */
  const expandedUnlockedAtRef = useRef(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const [coverScale, setCoverScale] = useState(() =>
    typeof window !== "undefined" ? getCoverScale() : 1.5
  );

  const expanded = phase === "expanded";
  const expanding = phase === "expanding";
  const reverseFixed = phase === "reverse_fixed";
  const shrinking = phase === "shrinking";

  /** Full-bleed image (not the compact card) */
  const isFullBleedVisual =
    expanding || expanded || reverseFixed || shrinking;

  const handleExpandDone = useCallback(() => {
    hasExpandedOnceRef.current = true;
    expandedUnlockedAtRef.current =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    setPhase("expanded");
  }, []);

  const handleShrinkDone = useCallback(() => {
    const scrollY = window.scrollY;
    setPhase("idle");
    reverseFixedEnteredRef.current = false;
    if (spacerRef.current) {
      spacerRef.current.remove();
      spacerRef.current = null;
    }
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }, []);

  /** Keep cover zoom math in sync on resize (compact: min(52vw, 580px) × 16:10) */
  useEffect(() => {
    const update = () => setCoverScale(getCoverScale());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /**
   * Image slideshow: faster on small card; slower only after fill is complete
   * (expanded / reverse_fixed / shrinking). Expanding keeps fast until zoom ends.
   */
  useEffect(() => {
    const slow =
      phase === "expanded" ||
      phase === "reverse_fixed" ||
      phase === "shrinking";
    const beatMs = slow ? BEAT_MS_FULLSCREEN : BEAT_MS_COMPACT;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SEQUENCE.length);
    }, beatMs);
    return () => window.clearInterval(id);
  }, [phase]);

  /** Ensure scroll locks are cleared if the component unmounts mid-flow */
  useEffect(() => {
    return () => {
      releaseHardScrollLock();
      releaseSoftScrollLock();
    };
  }, []);

  /**
   * First paint: lock scroll at top (hero intro) — same hard lock as expand uses.
   */
  useEffect(() => {
    if (phase !== "idle" || hasExpandedOnceRef.current) return undefined;
    applyHardScrollLock(0);
    return undefined;
  }, [phase]);

  /**
   * During expand animation: page must not move — overflow alone does not stop wheel/trackpad.
   * Block wheel + touchmove; body stays position:fixed until we release on "expanded".
   */
  useEffect(() => {
    if (phase !== "expanding") return undefined;

    applyHardScrollLock(window.scrollY);

    const prevent = (e) => {
      e.preventDefault();
    };

    const opts = { passive: false };
    document.addEventListener("wheel", prevent, opts);
    document.addEventListener("touchmove", prevent, opts);

    return () => {
      document.removeEventListener("wheel", prevent, opts);
      document.removeEventListener("touchmove", prevent, opts);
    };
  }, [phase]);

  /** Expand animation finished — unlock document scroll (lower sections appear only after this). */
  useEffect(() => {
    if (phase !== "expanded") return undefined;
    releaseHardScrollLock();
    return undefined;
  }, [phase]);

  /** Reverse overlay phases: soft lock (hero is already fixed in layout). */
  useEffect(() => {
    if (phase !== "reverse_fixed" && phase !== "shrinking") return undefined;
    applySoftScrollLock();
    return () => {
      releaseSoftScrollLock();
    };
  }, [phase]);

  /**
   * When user has scrolled down past the hero, then brings it fully into view again → reverse_fixed.
   * IMPORTANT: Do NOT set wasBelowHero from intersectionRatio alone — layout, mobile chrome, and the
   * expand animation can briefly dip below 0.99 and falsely trigger the “scroll back” overlay + soft lock
   * (feels like: can’t scroll down until you scroll up).
   */
  useEffect(() => {
    if (phase !== "expanded") return undefined;
    const el = sectionRef.current;
    if (!el) return undefined;

    const COOLDOWN_MS = 900;
    const PAST_HERO_PX = 64;

    const userHasScrolledPastHero = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const bottom = top + el.offsetHeight;
      return window.scrollY + window.innerHeight > bottom + PAST_HERO_PX;
    };

    const tryEnterReverseFixed = (entry) => {
      const ratio = entry.intersectionRatio;
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      if (now - expandedUnlockedAtRef.current < COOLDOWN_MS) return;

      if (ratio < 0.92) return;

      if (
        ratio >= 0.99 &&
        wasBelowHeroRef.current &&
        phaseRef.current === "expanded" &&
        !reverseFixedEnteredRef.current
      ) {
        reverseFixedEnteredRef.current = true;
        wasBelowHeroRef.current = false;

        const h = el.offsetHeight || window.innerHeight;
        const spacer = document.createElement("div");
        spacer.setAttribute("aria-hidden", "true");
        spacer.style.height = `${h}px`;
        spacer.style.width = "100%";
        spacer.className = "ghero-scroll-spacer";
        el.parentNode?.insertBefore(spacer, el);
        spacerRef.current = spacer;

        requestAnimationFrame(() => {
          if (phaseRef.current === "expanded") {
            setPhase("reverse_fixed");
          }
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (phaseRef.current !== "expanded") return;
        if (userHasScrolledPastHero()) {
          wasBelowHeroRef.current = true;
        }
        tryEnterReverseFixed(entry);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 0.92, 0.99, 1] }
    );

    const onScroll = () => {
      if (phaseRef.current !== "expanded") return;
      if (userHasScrolledPastHero()) {
        wasBelowHeroRef.current = true;
      }
    };

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [phase]);

  /** First scroll down: idle → expanding */
  useEffect(() => {
    const onWheel = (e) => {
      if (phase !== "idle") return;
      if (e.deltaY <= 0) return;
      e.preventDefault();
      setPhase("expanding");
    };

    let touchY = null;
    const onTouchStart = (e) => {
      touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e) => {
      if (phase !== "idle" || touchY == null) return;
      const y = e.touches[0]?.clientY ?? touchY;
      if (touchY - y > 40) {
        e.preventDefault();
        setPhase("expanding");
        touchY = null;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [phase]);

  /** reverse_fixed: wheel up → shrink to compact */
  useEffect(() => {
    if (phase !== "reverse_fixed") return undefined;

    const onWheel = (e) => {
      if (e.deltaY >= 0) return;
      e.preventDefault();
      setPhase("shrinking");
    };

    let touchY = null;
    const onTouchStart = (e) => {
      touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e) => {
      if (touchY == null) return;
      const y = e.touches[0]?.clientY ?? touchY;
      if (y - touchY > 40) {
        e.preventDefault();
        setPhase("shrinking");
        touchY = null;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [phase]);

  const letter = SEQUENCE[index];
  const showLetter = letter !== " ";
  /** White center letters only on card + while zooming; hidden once fullscreen is reached */
  const showCenterLetterOverlay =
    showLetter && (phase === "idle" || phase === "expanding");

  /** Compact = scale 1; full bleed = uniform cover scale; shrink animates back to 1 */
  const isCompactVisual =
    phase === "idle" || phase === "shrinking";

  const targetScale = isCompactVisual ? 1 : coverScale;

  const pinnedOverlay = reverseFixed || shrinking;

  return (
    <section
      ref={sectionRef}
      className={`overflow-x-clip overflow-hidden bg-white ${
        pinnedOverlay
          ? "fixed inset-0 z-[9990] h-screen min-h-0 w-full max-w-none"
          : expanded && !reverseFixed && !shrinking
            ? "relative min-h-screen w-screen max-w-[100vw] ml-[calc(50%-50vw)]"
            : "relative h-screen w-screen max-w-[100vw] ml-[calc(50%-50vw)]"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-5 top-[6.25rem] z-[20] select-none md:hidden"
        animate={{
          opacity: expanding || isFullBleedVisual ? 0.08 : 1,
        }}
        transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="flex flex-col gap-1">
          <span className="block text-[clamp(1.85rem,8.8vw,3.05rem)] font-medium leading-[1.08] tracking-[-0.04em] text-black">
            THIRD
          </span>
          <span className="block text-[clamp(1.85rem,8.8vw,3.05rem)] font-medium leading-[1.08] tracking-[-0.04em] text-black">
            SPACE
          </span>
        </div>
        <p className="mt-3 max-w-[13rem] text-[11px] font-medium uppercase leading-[1.55] tracking-[0.16em] text-black">
          An architecture <span className="font-bold">studio since 2002</span>
        </p>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-4 top-14 z-[1] hidden select-none md:left-8 md:top-20 md:block"
        animate={{
          opacity: expanding || isFullBleedVisual ? 0.08 : 1,
        }}
        transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
      >
        <span className="block text-[clamp(2rem,9vw,7rem)] font-medium leading-[0.9] tracking-[-0.04em] text-black">
          THIRD SPACE
        </span>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-x-5 bottom-[5.75rem] z-[20] select-none md:hidden"
        animate={{
          opacity: expanding || isFullBleedVisual ? 0.08 : 1,
        }}
        transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="flex flex-col items-end gap-2.5 text-right">
          <p className="max-w-[13rem] text-[11px] font-medium uppercase leading-[1.55] tracking-[0.16em] text-black">
            Belagavi <span className="font-bold">& Pune</span>
          </p>
          <span className="block max-w-full text-[clamp(1.5rem,6.6vw,2.55rem)] font-medium leading-[1.08] tracking-[-0.02em] text-black">
            ARCHITECTURE
          </span>
        </div>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-16 right-8 z-[1] hidden select-none md:block"
        animate={{
          opacity: expanding || isFullBleedVisual ? 0.08 : 1,
        }}
        transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
      >
        <span className="block text-right text-[clamp(2rem,9vw,7rem)] font-medium leading-[0.9] tracking-[-0.04em] text-black">
          ARCHITECTURE
        </span>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 right-0 z-[5] hidden items-center justify-between px-4 md:flex md:px-10"
        animate={{
          opacity: expanding || isFullBleedVisual ? 0.15 : 1,
        }}
        transition={{ duration: 0.85 }}
      >
        <p className="max-w-[140px] text-[10px] font-medium uppercase leading-relaxed tracking-[0.25em] text-black md:max-w-[180px] md:text-[11px]">
          An architecture <span className="font-bold">studio since 2002</span>
        </p>
        <p className="max-w-[140px] text-right text-[10px] font-medium uppercase leading-relaxed tracking-[0.25em] text-black md:max-w-[180px] md:text-[11px]">
          Belagavi <span className="font-bold">& Pune</span>
        </p>
      </motion.div>

      <div
        className={`absolute inset-0 z-[15] flex items-center justify-center max-md:px-4 max-md:pt-[8.75rem] max-md:pb-[6.5rem] ${
          isCompactVisual
            ? "pt-[clamp(0.75rem,2.5vh,2.25rem)]"
            : ""
        }`}
      >
        <motion.div
          className={`relative aspect-[3/4] w-[min(68vw,420px)] origin-center overflow-hidden will-change-transform sm:w-[min(68vw,580px)] md:aspect-[16/10] md:w-[min(52vw,580px)] ${
            isCompactVisual ? "shadow-2xl shadow-black/15" : "shadow-none"
          }`}
          initial={false}
          animate={{
            scale: targetScale,
            borderRadius: isCompactVisual ? 4 : 0,
          }}
          transition={expandTransition}
          style={{
            transformOrigin: "50% 50%",
            backfaceVisibility: "hidden",
          }}
        >
          <ExpandCompleteListener
            active={phase === "expanding"}
            onDone={handleExpandDone}
          />
          <ShrinkCompleteListener
            active={phase === "shrinking"}
            onDone={handleShrinkDone}
          />

          <AnimatePresence mode="sync">
            <motion.img
              key={index}
              src={HERO_IMAGES[index % HERO_IMAGES.length]}
              alt=""
              className="h-full w-full object-cover"
              initial={{ opacity: 0.9, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.07, ease: "linear" }}
              draggable={false}
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/5">
            <AnimatePresence mode="wait">
              {showCenterLetterOverlay && (
                <motion.span
                  key={`${index}-${letter}`}
                  initial={{ opacity: 0.5, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.06 }}
                  className="select-none text-[clamp(4rem,18vw,14rem)] font-medium leading-none tracking-tighter text-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.4)]"
                  style={{ textShadow: "0 2px 60px rgba(0,0,0,0.3)" }}
                >
                  {letter}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {phase === "idle" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
          className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-[9px] font-medium uppercase tracking-[0.32em] text-neutral-400 md:bottom-8 md:text-[10px] md:tracking-[0.35em]"
        >
          Scroll
        </motion.div>
      )}
    </section>
  );
}

function ExpandCompleteListener({ active, onDone }) {
  const doneRef = useRef(false);
  useEffect(() => {
    if (!active) {
      doneRef.current = false;
      return;
    }
    const t = window.setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            onDone();
          });
        });
      }
    }, EXPAND_DURATION_MS);
    return () => window.clearTimeout(t);
  }, [active, onDone]);
  return null;
}

function ShrinkCompleteListener({ active, onDone }) {
  const doneRef = useRef(false);
  useEffect(() => {
    if (!active) {
      doneRef.current = false;
      return;
    }
    const t = window.setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            onDone();
          });
        });
      }
    }, EXPAND_DURATION_MS);
    return () => window.clearTimeout(t);
  }, [active, onDone]);
  return null;
}
