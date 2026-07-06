/**
 * Featured Interior Projects — scroll-driven (no wheel hijack).
 * Tall section: each ~1 viewport of scroll advances project index.
 * Left: transparent, name / description / details + minimal View control.
 * Right: full-bleed image with bottom↔top slide by scroll direction.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProjects, getProjectPath } from "../constants/projects";
import PillButton from "./PillButton";

const PROJECTS = getFeaturedProjects();

const TOTAL = PROJECTS.length;
const ANIM_MS = 720;

export default function Architecture() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);
  const indexRef = useRef(0);
  const animTimerRef = useRef(null);
  const rafRef = useRef(null);

  const goToIndex = useCallback((next, dir) => {
    if (next === indexRef.current) return;
    const from = indexRef.current;
    indexRef.current = next;
    setDirection(dir);
    setPrev(from);
    setCurrent(next);
    if (animTimerRef.current) clearTimeout(animTimerRef.current);
    animTimerRef.current = window.setTimeout(() => {
      setPrev(null);
      animTimerRef.current = null;
    }, ANIM_MS);
  }, []);

  /** Map scroll position → project index (natural page scroll — no body/wheel lock). */
  useEffect(() => {
    const readIndex = () => {
      const el = containerRef.current;
      if (!el) return;
      const vh = window.innerHeight || 1;
      const elTop = el.getBoundingClientRect().top + window.scrollY;
      const scrollPast = window.scrollY - elTop + vh * 0.1;
      const next = Math.min(
        TOTAL - 1,
        Math.max(0, Math.floor(scrollPast / vh))
      );
      if (next !== indexRef.current) {
        goToIndex(next, next > indexRef.current ? 1 : -1);
      }
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(readIndex);
    };

    readIndex();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", readIndex, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", readIndex);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, [goToIndex]);

  const activeProject = PROJECTS[current];
  const prevProject = prev !== null ? PROJECTS[prev] : null;

  return (
    <>
      <style>{`
        .fi-heading {
          font-family: var(--font-sans);
          font-weight: 500;
          letter-spacing: -0.03em;
        }
        .fi-sans {
          font-family: var(--font-sans);
        }
        .fi-proj-info-enter-down {
          animation: fiProjInDown 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .fi-proj-info-enter-up {
          animation: fiProjInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .fi-proj-info-exit-down {
          animation: fiProjOutDown 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .fi-proj-info-exit-up {
          animation: fiProjOutUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes fiProjInDown {
          from { opacity: 0; transform: translateY(1.25rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fiProjInUp {
          from { opacity: 0; transform: translateY(-1.25rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fiProjOutDown {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-1rem); }
        }
        @keyframes fiProjOutUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(1rem); }
        }

        .fi-img-enter-down {
          animation: fiImgInDown 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .fi-img-exit-down {
          animation: fiImgOutDown 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .fi-img-enter-up {
          animation: fiImgInUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .fi-img-exit-up {
          animation: fiImgOutUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes fiImgInDown {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fiImgOutDown {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }
        @keyframes fiImgInUp {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes fiImgOutUp {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }
      `}</style>

      {/* Scroll height: one viewport per project — sticky panel pins while you scroll through */}
      <section
        ref={containerRef}
        id="work"
        className="relative w-full bg-white fi-sans"
        style={{
          height: `${TOTAL * 100}vh`,
        }}
      >
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden bg-white max-lg:overflow-y-auto">
          {/* Eyebrow — larger, sits slightly lower for clear hierarchy */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center gap-3 px-6 pt-12 md:px-12 md:pt-16 lg:pt-[4.25rem]">
            <span className="block h-px w-8 bg-black" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black md:text-xs md:tracking-[0.24em]">
              Featured projects
            </span>
          </div>

          <div className="grid flex-1 min-h-0 grid-cols-1 lg:grid-cols-2 lg:pt-[4.5rem]">
            {/* MOBILE — intro → image → details */}
            <div className="flex flex-col lg:hidden">
              <div className="relative px-6 pb-4 pt-[5.5rem]">
                {prevProject && (
                  <div
                    key={`m-intro-prev-${prev}`}
                    className={
                      direction === 1
                        ? "fi-proj-info-exit-down"
                        : "fi-proj-info-exit-up"
                    }
                    style={{
                      position: "absolute",
                      left: "1.5rem",
                      right: "1.5rem",
                      top: "5.5rem",
                      pointerEvents: "none",
                    }}
                  >
                    <ProjectIntro project={prevProject} />
                  </div>
                )}
                <div
                  key={`m-intro-curr-${current}`}
                  className={
                    prev === null
                      ? ""
                      : direction === 1
                        ? "fi-proj-info-enter-down"
                        : "fi-proj-info-enter-up"
                  }
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <ProjectIntro project={activeProject} />
                </div>
              </div>

              <ProjectImagePanel
                activeProject={activeProject}
                prevProject={prevProject}
                prev={prev}
                direction={direction}
                className="relative min-h-[38vh] w-full shrink-0 overflow-hidden bg-neutral-100"
              />

              <div className="relative px-6 py-4">
                {prevProject && (
                  <div
                    key={`m-cta-prev-${prev}`}
                    className={
                      direction === 1
                        ? "fi-proj-info-exit-down"
                        : "fi-proj-info-exit-up"
                    }
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "1rem",
                      pointerEvents: "none",
                    }}
                  >
                    <div className="flex justify-center">
                      <PillButton to={getProjectPath(prevProject.id)} className="w-fit">
                        View Project
                      </PillButton>
                    </div>
                  </div>
                )}
                <div
                  key={`m-cta-curr-${current}`}
                  className={
                    prev === null
                      ? "flex justify-center"
                      : `flex justify-center ${
                          direction === 1
                            ? "fi-proj-info-enter-down"
                            : "fi-proj-info-enter-up"
                        }`
                  }
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <PillButton to={getProjectPath(activeProject.id)} className="w-fit">
                    View Project
                  </PillButton>
                </div>
              </div>

              <div className="relative px-6 pb-5 pt-1">
                {prevProject && (
                  <div
                    key={`m-details-prev-${prev}`}
                    className={
                      direction === 1
                        ? "fi-proj-info-exit-down"
                        : "fi-proj-info-exit-up"
                    }
                    style={{
                      position: "absolute",
                      left: "1.5rem",
                      right: "1.5rem",
                      top: "1.25rem",
                      pointerEvents: "none",
                    }}
                  >
                    <ProjectDetails project={prevProject} entering={false} showButton={false} />
                  </div>
                )}
                <div
                  key={`m-details-curr-${current}`}
                  className={
                    prev === null
                      ? ""
                      : direction === 1
                        ? "fi-proj-info-enter-down"
                        : "fi-proj-info-enter-up"
                  }
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <ProjectDetails project={activeProject} entering showButton={false} />
                </div>
              </div>

              <div className="mt-auto px-6 pb-8 pt-2">
                <ProgressBar current={current} total={TOTAL} />
              </div>
            </div>

            {/* DESKTOP — left copy + image side by side */}
            <div className="relative hidden flex-col justify-center px-6 pb-16 pt-24 md:px-12 md:pb-20 md:pt-28 lg:flex lg:pr-10">
              {/* exiting copy */}
              {prevProject && (
                <div
                  key={`left-prev-${prev}`}
                  className={
                    direction === 1
                      ? "fi-proj-info-exit-down"
                      : "fi-proj-info-exit-up"
                  }
                  style={{
                    position: "absolute",
                    left: "clamp(1.5rem, 5vw, 3rem)",
                    right: "clamp(1.5rem, 4vw, 2.5rem)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <LeftCopy project={prevProject} entering={false} />
                </div>
              )}

              {/* active copy */}
              <div
                key={`left-curr-${current}`}
                className={
                  prev === null
                    ? ""
                    : direction === 1
                      ? "fi-proj-info-enter-down"
                      : "fi-proj-info-enter-up"
                }
                style={{ position: "relative", zIndex: 1 }}
              >
                <LeftCopy project={activeProject} entering />
              </div>

              {/* progress */}
              <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12">
                <ProgressBar current={current} total={TOTAL} />
              </div>
            </div>

            {/* DESKTOP — image */}
            <ProjectImagePanel
              activeProject={activeProject}
              prevProject={prevProject}
              prev={prev}
              direction={direction}
              className="relative hidden min-h-0 flex-1 overflow-hidden bg-neutral-100 lg:block"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ProgressBar({ current, total }) {
  return (
    <>
      <div className="relative h-px bg-black/10">
        <div
          className="absolute bottom-0 left-0 h-px bg-black transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-[13px] text-black md:text-sm">
        <span className="font-medium tracking-wide">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black md:text-[11px]">
          Scroll
        </span>
      </div>
    </>
  );
}

function ProjectImagePanel({
  activeProject,
  prevProject,
  prev,
  direction,
  className,
}) {
  return (
    <div className={className}>
      {prevProject && (
        <div
          key={`img-prev-${prev}`}
          className={direction === 1 ? "fi-img-exit-down" : "fi-img-exit-up"}
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        >
          <img
            src={prevProject.image}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      )}
      <Link
        to={getProjectPath(activeProject.id)}
        key={`img-curr-${activeProject.id}`}
        className={
          prev === null
            ? "absolute inset-0 block"
            : direction === 1
              ? "fi-img-enter-down absolute inset-0 block"
              : "fi-img-enter-up absolute inset-0 block"
        }
        style={{ zIndex: 2 }}
      >
        <img
          src={activeProject.image}
          alt={activeProject.name}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-transparent lg:block"
          aria-hidden
        />
      </Link>
    </div>
  );
}

function ProjectIntro({ project }) {
  return (
    <div className="flex flex-col gap-0 text-black">
      <div className="mb-4 flex flex-wrap items-center gap-3 md:mb-7 md:gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black md:text-xs md:tracking-[0.22em]">
          {project.category}
        </span>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
        <span className="fi-heading text-lg font-medium text-black md:text-xl">
          {project.index}
        </span>
      </div>

      <h2 className="fi-heading mb-2 text-[clamp(1.5rem,6vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-black lg:text-[clamp(1.75rem,4.2vw,3.5rem)]">
        {project.name}
      </h2>

      <p className="mb-0 max-w-md text-[11px] font-semibold uppercase tracking-[0.16em] text-black md:text-xs">
        {project.location} — {project.year}
      </p>

      <p className="mb-0 mt-4 max-w-md text-[14px] font-normal leading-relaxed text-black md:text-base lg:mb-8">
        {project.description}
      </p>
    </div>
  );
}

function ProjectDetails({ project, entering, showButton = true }) {
  return (
    <>
      <div className="grid max-w-lg grid-cols-1 gap-5 border-t border-black/15 pt-5 sm:grid-cols-3 sm:gap-8 lg:mb-10 lg:gap-8 lg:pt-6">
        {project.details.map((d) => (
          <div key={d.label}>
            <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-black md:text-[10px]">
              {d.label}
            </p>
            <p className="text-[13px] font-medium leading-snug text-black md:text-sm">
              {d.value}
            </p>
          </div>
        ))}
      </div>

      {entering && showButton && (
        <PillButton to={getProjectPath(project.id)} className="mt-6 w-fit lg:mt-0">
          View Project
        </PillButton>
      )}
    </>
  );
}

function LeftCopy({ project, entering }) {
  return (
    <div className="flex flex-col gap-0 text-black">
      <ProjectIntro project={project} />
      <ProjectDetails project={project} entering={entering} />
    </div>
  );
}
