import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import Reveal from "../components/layout/Reveal";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import PillButton from "../components/PillButton";
import MarqueeStrip from "../components/MarqueeStrip";
import { WORK_PROJECTS, WORK_CATEGORIES, getProjectPath } from "../constants/projects";
import { HERO_IMAGES } from "../constants/heroImages";

export default function WorkPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialCategory =
    categoryParam && WORK_CATEGORIES.includes(categoryParam) ? categoryParam : "All";
  const [active, setActive] = useState(initialCategory);

  useEffect(() => {
    if (categoryParam && WORK_CATEGORIES.includes(categoryParam)) {
      setActive(categoryParam);
    }
  }, [categoryParam]);

  const filtered =
    active === "All"
      ? WORK_PROJECTS
      : WORK_PROJECTS.filter((p) => p.category === active);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Portfolio"
        title="Selected Work"
        subtitle="Built and unbuilt projects across education, architecture, interiors, and urbanism — spanning two decades of practice in India."
        image={HERO_IMAGES[0]}
      />

      <section className="border-t border-black/10 bg-white px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow className="mb-4">Projects</SectionEyebrow>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                {filtered.length} {active === "All" ? "Projects" : active}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {WORK_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                    active === cat
                      ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                      : "border-black/20 bg-transparent text-[#0a0a0a] hover:border-black/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-10">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={getProjectPath(project.id)} className="group block cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 lg:aspect-[4/5]">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.08]" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
                        {project.location} — {project.year}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 md:pt-5">
                    <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400 md:mb-2 md:text-[10px] md:tracking-[0.22em]">
                      {project.category}
                    </p>
                    <h3 className="mb-1 text-sm font-medium leading-snug tracking-[-0.02em] text-[#0a0a0a] md:mb-2 md:text-[clamp(1.1rem,1.8vw,1.35rem)]">
                      {project.name}
                    </h3>
                    <p className="hidden line-clamp-2 text-sm leading-relaxed text-neutral-500 md:block">
                      {project.description}
                    </p>
                  </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <Reveal className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <SectionEyebrow className="mb-4">Commission</SectionEyebrow>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              We welcome conversations about educational campuses, institutional buildings, interiors, and urban studies.
            </p>
          </div>
          <PillButton to="/contact">Start A Conversation</PillButton>
        </Reveal>
      </section>

      <MarqueeStrip />
    </PageLayout>
  );
}
