import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "../components/layout/PageLayout";
import Reveal from "../components/layout/Reveal";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import PillButton from "../components/PillButton";
import ProjectImageSlideshow from "../components/ProjectImageSlideshow";
import {
  getAdjacentProjects,
  getProjectById,
  getProjectPath,
  getRelatedProjects,
} from "../constants/projects";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);
  const { prev, next } = getAdjacentProjects(projectId);
  const related = getRelatedProjects(projectId, 3);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const narrative = [
    { title: "Overview", body: project.overview },
    { title: "Challenge", body: project.challenge },
    { title: "Approach", body: project.approach },
  ].filter((block) => block.body);

  return (
    <PageLayout>
      <section className="border-b border-black/10 bg-[#f5f5f3]">
        <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-[max(7.5rem,calc(env(safe-area-inset-top,0px)+6.75rem))] sm:px-8 md:px-12 md:pb-12 lg:px-14">
          <Link
            to="/work"
            className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 transition hover:text-[#0a0a0a]"
          >
            <span aria-hidden>←</span> All Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionEyebrow className="mb-5">{project.category}</SectionEyebrow>
            <h1 className="max-w-[16ch] text-[clamp(2rem,7.5vw,5.5rem)] font-medium uppercase leading-[0.92] tracking-[-0.03em] text-[#0a0a0a]">
              {project.name}
            </h1>
            <p className="mt-4 text-[clamp(13px,1.1vw,16px)] font-normal tracking-wide text-neutral-600">
              {project.location} — {project.year}
            </p>
            <p className="mt-6 max-w-3xl text-[clamp(15px,1.2vw,18px)] leading-relaxed text-[#3a3a3a]">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-8 md:px-12 md:py-14 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <ProjectImageSlideshow images={project.gallery} alt={project.name} />
        </div>
      </section>

      <section className="border-t border-black/10 bg-white px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(280px,34%)] lg:gap-20">
          <div>
            {narrative.map((block, i) => (
              <Reveal key={block.title} delay={i}>
                <h2 className="mb-4 text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                  {block.title}
                </h2>
                <p className="mb-10 max-w-3xl text-base leading-[1.8] text-neutral-600 md:mb-12">
                  {block.body}
                </p>
              </Reveal>
            ))}

            {project.awards && (
              <Reveal>
                <div className="rounded-sm border border-black/10 bg-[#f9f8f6] px-5 py-4 md:px-6 md:py-5">
                  <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Recognition
                  </p>
                  <p className="text-sm leading-relaxed text-[#0a0a0a]">{project.awards}</p>
                </div>
              </Reveal>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionEyebrow className="mb-6">Project Facts</SectionEyebrow>
              <dl className="space-y-5 border-t border-black/10 pt-6">
                {project.details.map((item) => (
                  <div key={item.label} className="grid grid-cols-[minmax(0,38%)_1fr] gap-4">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                      {item.label}
                    </dt>
                    <dd className="text-sm leading-snug text-[#0a0a0a]">{item.value}</dd>
                  </div>
                ))}
                {project.role && (
                  <div className="grid grid-cols-[minmax(0,38%)_1fr] gap-4">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                      Role
                    </dt>
                    <dd className="text-sm leading-snug text-[#0a0a0a]">{project.role}</dd>
                  </div>
                )}
                {project.team && (
                  <div className="grid grid-cols-[minmax(0,38%)_1fr] gap-4">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                      Team
                    </dt>
                    <dd className="text-sm leading-snug text-[#0a0a0a]">{project.team}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-8">
                <PillButton to="/contact">Discuss A Similar Project</PillButton>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {(prev || next) && (
        <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-10 sm:px-8 md:px-12 md:py-12 lg:px-14">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4 sm:flex-row sm:justify-between">
            {prev ? (
              <Link
                to={getProjectPath(prev.id)}
                className="group flex max-w-md flex-col gap-1 rounded-sm border border-black/10 bg-white px-5 py-4 transition hover:border-black/25"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Previous
                </span>
                <span className="text-base font-medium tracking-[-0.02em] text-[#0a0a0a] group-hover:opacity-70">
                  {prev.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={getProjectPath(next.id)}
                className="group flex max-w-md flex-col gap-1 rounded-sm border border-black/10 bg-white px-5 py-4 text-left transition hover:border-black/25 sm:text-right"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Next
                </span>
                <span className="text-base font-medium tracking-[-0.02em] text-[#0a0a0a] group-hover:opacity-70">
                  {next.name}
                </span>
              </Link>
            ) : null}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-black/10 bg-white px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="mb-10">
              <SectionEyebrow className="mb-4">Related Work</SectionEyebrow>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                More in {project.category}
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-10">
              {related.map((item) => (
                <Link key={item.id} to={getProjectPath(item.id)} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 lg:aspect-[4/5]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-3 md:pt-5">
                    <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400 md:text-[10px]">
                      {item.category}
                    </p>
                    <h3 className="text-sm font-medium leading-snug tracking-[-0.02em] text-[#0a0a0a] md:text-lg">
                      {item.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
