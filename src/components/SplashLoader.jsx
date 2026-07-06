import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HERO_PRIORITY_IMAGES,
  HERO_BACKGROUND_IMAGES,
} from "../constants/heroImages";
import {
  preloadImages,
  preloadImagesInBackground,
} from "../utils/preloadImages";

const SPLASH_DURATION_MS = 4000;
const EXIT_DURATION_MS = 700;

const ROTATING_WORDS = [
  "spaces",
  "experiences",
  "sanctuaries",
  "environments",
  "landmarks",
  "interiors",
  "habitats",
  "narratives",
  "atmospheres",
  "legacies",
  "visions",
  "communities",
];

const rotatingVariants = {
  enter: { opacity: 0, y: 14 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function SplashLoader({ onComplete }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const start = performance.now();
    let rafId;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / SPLASH_DURATION_MS) * 100);
      setProgress(pct);
      if (elapsed < SPLASH_DURATION_MS) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 520);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const preloadPromise = preloadImages([
        ...HERO_PRIORITY_IMAGES,
        "/logo.png",
      ]);

      preloadImagesInBackground(HERO_BACKGROUND_IMAGES);

      await Promise.all([preloadPromise, delay(SPLASH_DURATION_MS)]);

      if (cancelled) return;

      setExiting(true);
      await delay(EXIT_DURATION_MS);
      if (!cancelled) onComplete();
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-white font-sans"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: EXIT_DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
      aria-busy="true"
      aria-label="Loading Third Space Architecture Studio"
      role="status"
    >
      <div className="flex flex-col items-center px-8 text-center">
        <motion.img
          src="/logo.png"
          alt="ThirdSpace Architecture Studio"
          className="mb-14 h-auto w-[min(78vw,480px)] max-w-full object-contain md:mb-16 md:w-[min(62vw,520px)]"
          initial={{ opacity: 0, y: 32, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          draggable={false}
        />

        <motion.div
          className="flex items-baseline justify-center gap-[0.35em] text-[clamp(1rem,2.2vw,1.25rem)] font-medium tracking-[-0.02em] text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <span>We create</span>
          <span className="relative inline-block h-[1.4em] min-w-[10.5ch] overflow-hidden text-left text-[#0a0a0a]">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING_WORDS[wordIndex]}
                variants={rotatingVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute left-0 top-0 whitespace-nowrap"
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 md:px-16 md:pb-12">
        <div className="mx-auto max-w-xl">
          <div className="mb-3 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] text-neutral-400">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-px w-full overflow-hidden bg-neutral-200">
            <motion.div
              className="h-full origin-left bg-[#0a0a0a]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
