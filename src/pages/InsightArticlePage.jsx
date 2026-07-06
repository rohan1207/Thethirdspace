import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "../components/layout/PageLayout";
import Reveal from "../components/layout/Reveal";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import PillButton from "../components/PillButton";
import {
  getAdjacentInsights,
  getInsightById,
  getInsightPath,
  getRelatedInsights,
} from "../constants/insights";
import { getProjectPath } from "../constants/projects";

export default function InsightArticlePage() {
  const { articleId } = useParams();
  const article = getInsightById(articleId);
  const { prev, next } = getAdjacentInsights(articleId);
  const related = getRelatedInsights(articleId, 3);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  return (
    <PageLayout>
      <section className="border-b border-black/10 bg-[#f5f5f3]">
        <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-[max(7.5rem,calc(env(safe-area-inset-top,0px)+6.75rem))] sm:px-8 md:px-12 md:pb-12 lg:px-14">
          <Link
            to="/insights"
            className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 transition hover:text-[#0a0a0a]"
          >
            <span aria-hidden>←</span> All Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex flex-wrap items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400 sm:gap-3 sm:text-[10px] sm:tracking-[0.2em]">
              <SectionEyebrow className="mb-0">{article.category}</SectionEyebrow>
              <span className="hidden h-1 w-1 rounded-full bg-neutral-300 sm:block" />
              <span>{article.date}</span>
              <span className="hidden h-1 w-1 rounded-full bg-neutral-300 sm:block" />
              <span>{article.readTime} read</span>
            </div>

            <h1 className="max-w-[20ch] text-[clamp(1.85rem,6.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#0a0a0a]">
              {article.title}
            </h1>

            <p className="mt-5 max-w-2xl text-[clamp(15px,1.2vw,18px)] leading-relaxed text-neutral-600">
              {article.excerpt}
            </p>

            {article.author && (
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                By {article.author}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-5 py-8 sm:px-8 md:px-12 md:py-12 lg:px-14">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            className="relative aspect-[16/10] overflow-hidden bg-neutral-100 sm:aspect-[21/9]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={article.image}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-white px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(220px,28%)] lg:gap-16">
          <article className="min-w-0">
            {article.sections.map((section, i) => (
              <Reveal key={section.title ?? i} delay={i}>
                {section.title && (
                  <h2 className="mb-4 mt-2 text-[clamp(1.2rem,2.2vw,1.65rem)] font-medium tracking-[-0.03em] text-[#0a0a0a] first:mt-0">
                    {section.title}
                  </h2>
                )}
                <div className="mb-10 space-y-5 last:mb-0">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-[15px] leading-[1.85] text-neutral-600 md:text-base md:leading-[1.9]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionEyebrow className="mb-5">In this article</SectionEyebrow>
              <ul className="space-y-3 border-t border-black/10 pt-5">
                {article.sections
                  .filter((section) => section.title)
                  .map((section) => (
                    <li
                      key={section.title}
                      className="text-sm leading-snug text-neutral-600"
                    >
                      {section.title}
                    </li>
                  ))}
              </ul>

              {article.relatedProjectId && (
                <div className="mt-8 border-t border-black/10 pt-6">
                  <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Related Project
                  </p>
                  <PillButton to={getProjectPath(article.relatedProjectId)} arrow="→">
                    View Project
                  </PillButton>
                </div>
              )}

              <div className="mt-8">
                <PillButton to="/contact">Discuss With Us</PillButton>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {(prev || next) && (
        <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-10 sm:px-8 md:px-12 md:py-12 lg:px-14">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4 sm:flex-row sm:justify-between">
            {prev ? (
              <Link
                to={getInsightPath(prev.id)}
                className="group flex max-w-md flex-col gap-1 rounded-sm border border-black/10 bg-white px-5 py-4 transition hover:border-black/25"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Previous
                </span>
                <span className="text-sm font-medium leading-snug tracking-[-0.02em] text-[#0a0a0a] group-hover:opacity-70 md:text-base">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={getInsightPath(next.id)}
                className="group flex max-w-md flex-col gap-1 rounded-sm border border-black/10 bg-white px-5 py-4 text-left transition hover:border-black/25 sm:text-right"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Next
                </span>
                <span className="text-sm font-medium leading-snug tracking-[-0.02em] text-[#0a0a0a] group-hover:opacity-70 md:text-base">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-black/10 bg-white px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
          <div className="mx-auto max-w-[1200px]">
            <Reveal className="mb-10">
              <SectionEyebrow className="mb-4">Continue Reading</SectionEyebrow>
              <h2 className="text-[clamp(1.35rem,3vw,2rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                More in {article.category}
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((item) => (
                <Link key={item.id} to={getInsightPath(item.id)} className="group">
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    {item.category} · {item.date}
                  </p>
                  <h3 className="text-base font-medium leading-snug tracking-[-0.02em] text-[#0a0a0a] md:text-lg">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
