import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { FIRM_ABOUT, FIRM_LEGACY } from "../constants/firm";
import { PRACTICE_CATEGORY_IMAGES } from "../constants/heroImages";
import { getWorkCategoryPath } from "../constants/projects";

const collections = [
  { name: "Educational", image: PRACTICE_CATEGORY_IMAGES.educational, category: "Education" },
  { name: "Architecture", image: PRACTICE_CATEGORY_IMAGES.architecture, category: "Architecture" },
  { name: "Interiors", image: PRACTICE_CATEGORY_IMAGES.interiors, category: "Interiors" },
  { name: "Urbanism", image: PRACTICE_CATEGORY_IMAGES.urbanism, category: "Urbanism" },
];

const FLOATING_OBJECTS = [
  {
    src: "/obj1.png",
    alt: "Architectural form study",
    top: "6%",
    right: "26%",
    width: "clamp(110px, 16vw, 200px)",
    depth: 48,
    rotateY: -14,
    rotateX: 8,
    duration: 5.8,
    delay: 0,
    drift: 22,
  },
  {
    src: "/obj2.png",
    alt: "Spatial composition",
    top: "56%",
    right: "2%",
    width: "clamp(130px, 18vw, 230px)",
    depth: 72,
    rotateY: 12,
    rotateX: -6,
    duration: 7.2,
    delay: 1.1,
    drift: 18,
  },
];

function FloatingObject({
  src,
  alt,
  top,
  right,
  width,
  depth,
  rotateY,
  rotateX,
  duration,
  delay,
  drift,
}) {
  return (
    <Motion.div
      className="pointer-events-none absolute select-none"
      style={{ top, right, width, zIndex: depth }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          y: [0, -drift, 0, drift * 0.6, 0],
          rotateY: [rotateY, rotateY + 7, rotateY - 5, rotateY + 4, rotateY],
          rotateX: [rotateX, rotateX - 6, rotateX + 5, rotateX - 3, rotateX],
          rotateZ: [0, 2.5, -2, 1.5, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1],
          delay,
        }}
      >
        <Motion.img
          src={src}
          alt={alt}
          draggable={false}
          className="h-auto w-full"
          style={{
            transform: `translateZ(${depth}px)`,
            filter:
              "drop-shadow(0 32px 48px rgba(0,0,0,0.13)) drop-shadow(0 10px 20px rgba(0,0,0,0.07))",
            willChange: "transform",
          }}
          animate={{ scale: [1, 1.035, 1, 0.975, 1] }}
          transition={{
            duration: duration * 1.35,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1],
            delay: delay + 0.3,
          }}
        />
      </Motion.div>
    </Motion.div>
  );
}

function MobileFloatingObject({
  src,
  alt,
  className = "",
  duration,
  delay,
  drift,
  rotateY,
  rotateX,
}) {
  return (
    <Motion.div
      className={`pointer-events-none relative select-none ${className}`}
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Motion.div
        animate={{
          y: [0, -drift, 0, drift * 0.55, 0],
          rotateY: [rotateY, rotateY + 6, rotateY - 4, rotateY + 3, rotateY],
          rotateX: [rotateX, rotateX - 5, rotateX + 4, rotateX - 2, rotateX],
          rotateZ: [0, 2, -1.5, 1, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1],
          delay,
        }}
      >
        <Motion.img
          src={src}
          alt={alt}
          draggable={false}
          className="h-auto w-full"
          style={{
            filter:
              "drop-shadow(0 20px 32px rgba(0,0,0,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.06))",
            willChange: "transform",
          }}
          animate={{ scale: [1, 1.03, 1, 0.98, 1] }}
          transition={{
            duration: duration * 1.3,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1],
            delay: delay + 0.25,
          }}
        />
      </Motion.div>
    </Motion.div>
  );
}

function PracticeCard({ item, index, onCardEnter, onCardLeave }) {
  return (
    <Link
      to={getWorkCategoryPath(item.category)}
      className="group block cursor-pointer no-underline"
    >
    <Motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -6 }}
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 rounded-sm shadow-none group-hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-500 md:aspect-[4/5]">
        <Motion.img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-500" aria-hidden />
      </div>

      <div className="pt-2.5 pb-1 md:pt-4 md:pb-2">
        <p
          className="uppercase text-neutral-900 text-[9px] tracking-[0.18em] md:text-[11px] md:tracking-[0.22em]"
          style={{ fontWeight: 300 }}
        >
          {item.name}
        </p>
      </div>
    </Motion.article>
    </Link>
  );
}

const Categories = () => {
  const gridRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [useCustomCursor, setUseCustomCursor] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const col1Y = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [16, -16]);

  const leftColumn = collections.filter((_, i) => i % 2 === 0);
  const rightColumn = collections.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setUseCustomCursor(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onMouseMove  = useCallback((e) => {
    if (!useCustomCursor) return;
    setCursor((p) => ({ ...p, x: e.clientX, y: e.clientY }));
  }, [useCustomCursor]);
  const onCardEnter  = useCallback((e) => {
    if (!useCustomCursor) return;
    setCursor({ x: e.clientX, y: e.clientY, visible: true });
  }, [useCustomCursor]);
  const onCardLeave  = useCallback(() => {
    if (!useCustomCursor) return;
    setCursor((p) => ({ ...p, visible: false }));
  }, [useCustomCursor]);

  return (
    <section
      className="w-full py-12 lg:py-24 px-4 sm:px-6 lg:px-10 xl:px-20 font-sans"
      style={{
        backgroundColor: "white",
      }}
    >
      <div className="max-w-[1600px] mx-auto">
        <header className="relative mb-10 lg:mb-14 xl:mb-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,38%)] xl:grid-cols-[minmax(0,1fr)_minmax(320px,42%)]">
            <div>
              <p
                className="uppercase text-neutral-500 mb-4"
                style={{ fontSize: "11px", fontWeight: 300, letterSpacing: "0.22em" }}
              >
                Our Practice
              </p>
              <p
                className="text-neutral-800 max-w-3xl xl:max-w-4xl"
                style={{
                  fontSize: "clamp(22px, 2.4vw, 40px)",
                  fontWeight: 200,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.18,
                }}
              >
                Architecture, interiors and urbanism across scales and geographies.
              </p>
              <p
                className="mt-8 max-w-3xl text-neutral-600"
                style={{
                  fontSize: "clamp(14px, 1.1vw, 17px)",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  letterSpacing: "-0.01em",
                }}
              >
                {FIRM_ABOUT}
              </p>
              <p
                className="mt-6 max-w-3xl text-neutral-600"
                style={{
                  fontSize: "clamp(14px, 1.1vw, 17px)",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  letterSpacing: "-0.01em",
                }}
              >
                {FIRM_LEGACY}
              </p>
            </div>

            <div
              className="relative flex min-h-[clamp(120px,30vw,170px)] items-center justify-center gap-6 py-2 sm:gap-8 lg:hidden"
              style={{ perspective: "1200px" }}
              aria-hidden
            >
              <MobileFloatingObject
                {...FLOATING_OBJECTS[0]}
                className="w-[clamp(88px,24vw,130px)] -translate-y-3 self-start"
              />
              <MobileFloatingObject
                {...FLOATING_OBJECTS[1]}
                className="w-[clamp(100px,28vw,150px)] translate-y-5 self-end"
              />
            </div>

            <div
              className="relative hidden min-h-[min(52vh,480px)] lg:block"
              style={{ perspective: "1400px", perspectiveOrigin: "50% 40%" }}
              aria-hidden
            >
              {FLOATING_OBJECTS.map((obj) => (
                <FloatingObject key={obj.src} {...obj} />
              ))}
            </div>
          </div>
        </header>

        <div ref={gridRef}>
          {useCustomCursor && (
            <div
              className="fixed left-0 top-0 w-0 h-0 pointer-events-none z-[10000]"
              style={{ transform: `translate(${cursor.x}px, ${cursor.y}px) translate(-50%, -50%)` }}
            >
              <div
                className={`flex items-center justify-center rounded-full transition-opacity duration-200 ${
                  cursor.visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ width: 52, height: 52, backgroundColor: "#141625" }}
              >
                <span style={{ color: "#fff", fontSize: 28, fontWeight: 200, lineHeight: 1, marginTop: -2 }}>
                  +
                </span>
              </div>
            </div>
          )}

          {/* Mobile — 2 columns with scroll parallax */}
          <div
            className={`grid grid-cols-2 gap-3 sm:gap-6 lg:hidden ${useCustomCursor && cursor.visible ? "cursor-none" : ""}`}
            onMouseMove={onMouseMove}
          >
            <Motion.div className="flex flex-col gap-3 sm:gap-6" style={{ y: col1Y }}>
              {leftColumn.map((item, i) => (
                <PracticeCard
                  key={item.name}
                  item={item}
                  index={i * 2}
                  onCardEnter={onCardEnter}
                  onCardLeave={onCardLeave}
                />
              ))}
            </Motion.div>
            <Motion.div className="flex flex-col gap-3 sm:gap-6" style={{ y: col2Y }}>
              {rightColumn.map((item, i) => (
                <PracticeCard
                  key={item.name}
                  item={item}
                  index={i * 2 + 1}
                  onCardEnter={onCardEnter}
                  onCardLeave={onCardLeave}
                />
              ))}
            </Motion.div>
          </div>

          {/* Desktop — 4 column grid */}
          <div
            className={`hidden lg:grid lg:grid-cols-4 lg:gap-8 xl:gap-10 ${useCustomCursor && cursor.visible ? "cursor-none" : ""}`}
            onMouseMove={onMouseMove}
          >
          {collections.map((item, index) => (
            <PracticeCard
              key={item.name}
              item={item}
              index={index}
              onCardEnter={onCardEnter}
              onCardLeave={onCardLeave}
            />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;