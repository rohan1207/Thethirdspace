import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import Reveal from "../components/layout/Reveal";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import PillButton from "../components/PillButton";
import MarqueeStrip from "../components/MarqueeStrip";
import { CAPABILITIES } from "../constants/capabilities";
import { PAGE_HERO_IMAGES } from "../constants/heroImages";

export default function CapabilitiesPage() {
  const [active, setActive] = useState(0);
  const current = CAPABILITIES[active];

  return (
    <PageLayout>
      <PageHero
        eyebrow="Services"
        title="Capabilities"
        subtitle="Architecture, interiors, urbanism, education, and research — a multi-scale practice grounded in Indian urban realities."
        image={PAGE_HERO_IMAGES.capabilities}
      />

      {/* Interactive capability selector */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,42%)]">
            {/* Left — word list */}
            <div className="flex flex-col justify-center px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
              <Reveal className="mb-10">
                <SectionEyebrow className="mb-4">What We Do</SectionEyebrow>
              </Reveal>

              <div className="flex flex-col gap-1">
                {CAPABILITIES.map((cap, i) => (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className="group text-left"
                  >
                    <motion.span
                      className="block py-1 text-[clamp(1.75rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] transition-colors duration-500"
                      animate={{
                        color: i === active ? "#0a0a0a" : "#e0e0e0",
                        fontWeight: i === active ? 700 : 300,
                      }}
                      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                    >
                      {cap.label}
                    </motion.span>
                  </button>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                  ({String(active + 1).padStart(2, "0")}) {current.label}
                </span>
              </div>
            </div>

            {/* Right — detail panel */}
            <div className="relative min-h-[50vh] overflow-hidden bg-[#f5f5f3] lg:min-h-[70vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={current.image}
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/75 via-[#0a0a0a]/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="relative flex h-full min-h-[50vh] flex-col justify-end p-8 md:p-12 lg:min-h-[70vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                      {current.tagline}
                    </p>
                    <p className="mb-6 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                      {current.description}
                    </p>
                    <ul className="space-y-2">
                      {current.items.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.4 }}
                          className="flex items-center gap-3 text-sm text-white/90"
                        >
                          <span className="h-px w-4 bg-white/40" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full capability cards */}
      <section className="border-t border-black/10 bg-white px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-12 md:mb-16">
            <SectionEyebrow className="mb-4">In Detail</SectionEyebrow>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
              Practice domains
            </h2>
          </Reveal>

          <div className="flex flex-col gap-20 md:gap-28">
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.id} delay={i % 2}>
                <div
                  className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <motion.img
                      src={cap.image}
                      alt={cap.label}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <div>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                      0{i + 1} — {cap.label}
                    </p>
                    <h3 className="mb-4 text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                      {cap.tagline}
                    </h3>
                    <p className="mb-6 max-w-lg text-base leading-relaxed text-neutral-600">
                      {cap.description}
                    </p>
                    <ul className="space-y-3 border-t border-black/10 pt-6">
                      {cap.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm text-[#0a0a0a]"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a0a0a]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-16 sm:px-8 md:px-12 md:py-20 lg:px-14">
        <Reveal className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
              Ready to collaborate?
            </h2>
            <p className="mt-3 max-w-md text-neutral-600">
              Tell us about your project — we respond to every enquiry within two business days.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PillButton to="/work">View Work</PillButton>
            <PillButton to="/contact">Contact Us</PillButton>
          </div>
        </Reveal>
      </section>

      <MarqueeStrip />
    </PageLayout>
  );
}
