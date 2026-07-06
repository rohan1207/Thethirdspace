import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import Reveal, { RevealStagger, revealItem } from "../components/layout/Reveal";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import PillButton from "../components/PillButton";
import MarqueeStrip from "../components/MarqueeStrip";
import { INSIGHTS, getInsightPath } from "../constants/insights";import { PAGE_HERO_IMAGES } from "../constants/heroImages";

const CATEGORIES = ["All", "Essay", "Project Note", "Studio", "Research", "Urbanism"];

export default function InsightsPage() {
  const [active, setActive] = useState("All");
  const featured = INSIGHTS.find((a) => a.featured) || INSIGHTS[0];
  const rest = INSIGHTS.filter((a) => !a.featured);

  const filtered =
    active === "All"
      ? rest
      : rest.filter((a) => a.category === active);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Journal"
        title="Insights"
        subtitle="Essays, project notes, and research from the studio — on architecture, education, urbanism, and the practice of design in India."
        image={PAGE_HERO_IMAGES.insights}
      />

      {/* Featured article */}
      <section className="border-t border-black/10 bg-white px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <SectionEyebrow className="mb-8">Featured</SectionEyebrow>
          </Reveal>

          <Reveal delay={1}>
            <Link
              to={getInsightPath(featured.id)}
              className="group grid grid-cols-1 gap-8 no-underline lg:grid-cols-2 lg:gap-14"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 lg:aspect-auto lg:min-h-[420px]">
                <motion.img
                  src={featured.image}
                  alt=""
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  <span>{featured.category}</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-300" />
                  <span>{featured.date}</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-300" />
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#0a0a0a] transition-opacity duration-300 group-hover:opacity-70">
                  {featured.title}
                </h2>
                <p className="mb-8 max-w-lg text-base leading-relaxed text-neutral-600">
                  {featured.excerpt}
                </p>
                <span className="pill-btn inline-flex items-center gap-[0.35em] rounded-full border bg-transparent px-5 py-[0.55em] transition-all duration-300">
                  <span className="pill-btn-text text-[clamp(10px,0.82vw,13px)] font-semibold uppercase tracking-[0.16em]">
                    →
                  </span>
                  <span className="pill-btn-text text-[clamp(10px,0.82vw,13px)] font-semibold uppercase tracking-[0.16em]">
                    Read Article
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>        </div>
      </section>

      {/* Article grid */}
      <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow className="mb-4">All Articles</SectionEyebrow>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                Recent writing
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={`rounded-full border px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-4 sm:py-2 sm:text-[10px] ${
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

          <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {filtered.map((article) => (
              <motion.article key={article.id} variants={revealItem}>
                <Link
                  to={getInsightPath(article.id)}
                  className="group block no-underline"
                >
                  <div className="relative mb-3 aspect-[16/10] overflow-hidden bg-neutral-200 md:mb-5">
                    <motion.img
                      src={article.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400 md:gap-2 md:text-[10px] md:tracking-[0.2em]">
                    <span>{article.category}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="mt-1.5 text-base font-medium leading-snug tracking-[-0.02em] text-[#0a0a0a] transition-opacity duration-300 group-hover:opacity-60 md:mt-2 md:text-xl">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                    {article.excerpt}
                  </p>
                  <span className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a] opacity-70 transition-opacity duration-300 group-hover:opacity-100 md:mt-4">
                    Read →
                  </span>
                </Link>
              </motion.article>
            ))}
          </RevealStagger>        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-black/10 bg-[#0a0a0a] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <Reveal className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionEyebrow className="mb-4 [&_span]:bg-white [&_span:last-child]:text-white/60">
                Newsletter
              </SectionEyebrow>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-[-0.03em] text-white">
                Stay informed
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/55">
                Occasional updates on new projects, publications, and studio research — no spam, ever.
              </p>
            </div>
            <form
              className="flex flex-col justify-center gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full border-b border-white/25 bg-transparent py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/60"
              />
              <PillButton variant="light" type="submit" className="w-fit">
                Subscribe
              </PillButton>
            </form>
          </div>
        </Reveal>
      </section>

      <MarqueeStrip />
    </PageLayout>
  );
}
