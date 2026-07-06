import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import Reveal, { RevealStagger, revealItem } from "../components/layout/Reveal";
import RevealClip from "../components/layout/RevealClip";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import PillButton from "../components/PillButton";
import MarqueeStrip from "../components/MarqueeStrip";
import AboutStatsStrip from "../components/about/AboutStatsStrip";
import LeadershipCard from "../components/about/LeadershipCard";
import {
  ScrollRevealHeading,
  ScrollRevealParagraph,
} from "../components/about/ScrollRevealText";
import {
  FIRM_ABOUT,
  FIRM_LEGACY,
  FIRM_TAGLINE,
  FIRM_FOUNDED,
  FIRM_HQ,
  FIRM_STUDIOS,
} from "../constants/firm";
import { STUDIO_VALUES } from "../constants/capabilities";
import { LEADERSHIP, TEAM_MEMBERS } from "../constants/team";
import { PAGE_HERO_IMAGES } from "../constants/heroImages";

const MILESTONES = [
  { year: "2002", label: "ThirdSpace founded in Belagavi" },
  { year: "2008", label: "First major educational campus completed" },
  { year: "2014", label: "Pune studio established" },
  { year: "2019", label: "Award-winning institutional headquarters" },
  { year: "2022", label: "Technology institute campus delivered" },
];

const STATS = [
  { value: FIRM_FOUNDED, label: "Founded" },
  { value: "2", label: "Studios" },
  { value: "20+", label: "Years of practice" },
  { value: "50+", label: "Built & unbuilt projects" },
];

const timelineItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutPage() {
  const storyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Studio"
        title="The Practice"
        subtitle={FIRM_TAGLINE}
        image={PAGE_HERO_IMAGES.about}
      />

      {/* Story */}
      <section
        ref={storyRef}
        className="border-t border-black/10 bg-white px-5 py-16 sm:px-8 md:px-12 md:py-28 lg:px-14"
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionEyebrow className="mb-5">Our Story</SectionEyebrow>
              <RevealClip delay={0.05}>
                <p
                  className="max-w-lg text-[clamp(1.35rem,2.4vw,2rem)] font-light leading-[1.22] tracking-[-0.025em] text-[#0a0a0a]"
                  style={{ fontWeight: 300 }}
                >
                  An architecture studio exploring the spaces between disciplines.
                </p>
              </RevealClip>
            </Reveal>

            <div className="flex flex-col gap-5">
              <ScrollRevealHeading delay={0.1}>
                <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-[#0a0a0a]">
                  Rooted in context,
                  <br />
                  reaching outward.
                </h2>
              </ScrollRevealHeading>

              <motion.div
                className="relative aspect-[4/3] overflow-hidden bg-neutral-100 sm:aspect-[16/11]"
                style={{ y: imageY }}
              >
                <motion.img
                  src={PAGE_HERO_IMAGES.aboutStory}
                  alt="ThirdSpace studio and built work"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:pt-4">
            <ScrollRevealParagraph
              text={FIRM_ABOUT}
              className="mb-8 text-[15px] leading-[1.9] text-neutral-600 md:text-base md:leading-[1.85]"
              delay={0}
            />
            <ScrollRevealParagraph
              text={FIRM_LEGACY}
              className="text-[15px] leading-[1.9] text-neutral-600 md:text-base md:leading-[1.85]"
              delay={0.15}
            />
          </div>
        </div>
      </section>

      <AboutStatsStrip stats={STATS} />

      {/* Leadership */}
      <section className="border-t border-black/10 bg-white px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-12 md:mb-16">
            <SectionEyebrow className="mb-4">Leadership</SectionEyebrow>
            <RevealClip>
              <h2 className="max-w-2xl text-[clamp(1.75rem,3.8vw,3rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                The people behind the practice
              </h2>
            </RevealClip>
            <motion.p
              className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base md:leading-[1.75]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Founded by Praveen Bavadekar and co-led with Namrata Betigiri, Thirdspace is shaped by two distinct sensibilities united by a shared commitment to context, craft, and collaborative inquiry across Belagavi and Pune.
            </motion.p>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:gap-10">
            {LEADERSHIP.map((person, i) => (
              <LeadershipCard key={person.id} person={person} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-12 md:mb-14">
            <SectionEyebrow className="mb-4">Our Team</SectionEyebrow>
            <RevealClip>
              <h2 className="max-w-xl text-[clamp(1.75rem,3.8vw,3rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                A multidisciplinary studio
              </h2>
            </RevealClip>
            <motion.p
              className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-600 md:text-base"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Architects and studio professionals working across Belagavi and Pune.
            </motion.p>
          </Reveal>

          <RevealStagger
            className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14"
            stagger={0.08}
          >
            {TEAM_MEMBERS.map((member) => (
              <motion.article key={member.id} variants={revealItem} className="group">
                <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-neutral-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.04]" />
                </div>
                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  {member.studio}
                </p>
                <h3 className="mb-1 text-base font-medium tracking-[-0.02em] text-[#0a0a0a] md:text-lg">
                  {member.name}
                </h3>
                <p className="text-[11px] font-normal uppercase tracking-[0.12em] text-neutral-500 md:text-xs">
                  {member.role}
                </p>
              </motion.article>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-12 md:mb-14">
            <SectionEyebrow className="mb-4">Philosophy</SectionEyebrow>
            <RevealClip>
              <h2 className="max-w-lg text-[clamp(1.75rem,3.8vw,3rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                How we work
              </h2>
            </RevealClip>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {STUDIO_VALUES.map((value) => (
              <motion.div
                key={value.title}
                variants={revealItem}
                className="group bg-[#f5f5f3] p-6 transition-colors duration-500 hover:bg-white sm:p-8"
              >
                <span className="mb-4 block h-px w-6 bg-[#0a0a0a] transition-all duration-500 group-hover:w-10 md:mb-5" />
                <h3 className="mb-2 text-sm font-medium tracking-[-0.02em] text-[#0a0a0a] md:text-base">
                  {value.title}
                </h3>
                <p className="text-xs leading-relaxed text-neutral-600 md:text-sm">
                  {value.body}
                </p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-black/10 bg-white px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-12">
            <SectionEyebrow className="mb-4">Timeline</SectionEyebrow>
            <RevealClip>
              <h2 className="text-[clamp(1.75rem,3.8vw,3rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                Two decades of practice
              </h2>
            </RevealClip>
          </Reveal>

          <div className="relative">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-black/10 md:left-8 md:block" />
            <RevealStagger className="flex flex-col gap-8 md:gap-10">
              {MILESTONES.map((m) => (
                <motion.div
                  key={m.year}
                  variants={timelineItem}
                  className="grid grid-cols-1 gap-2 md:grid-cols-[120px_1fr] md:gap-12 md:pl-16"
                >
                  <p className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                    {m.year}
                  </p>
                  <p className="self-center text-sm text-neutral-600 md:text-base">{m.label}</p>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Studios */}
      <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionEyebrow className="mb-4">Studios</SectionEyebrow>
              <RevealClip>
                <h2 className="mb-6 text-[clamp(1.75rem,3.8vw,3rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                  Belagavi & Pune
                </h2>
              </RevealClip>
              <motion.p
                className="mb-8 max-w-md text-sm leading-relaxed text-neutral-600 md:text-base"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Two studios, one practice — engaging distinct urban contexts across Karnataka and Maharashtra while maintaining a unified design ethos.
              </motion.p>
              <div className="space-y-5">
                {FIRM_STUDIOS.map((studio) => (
                  <div key={studio} className="border-t border-black/10 pt-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                      Studio
                    </p>
                    <p className="mt-1 text-lg font-medium tracking-[-0.02em] text-[#0a0a0a] md:text-xl">
                      {studio}
                    </p>
                  </div>
                ))}
                <div className="border-t border-black/10 pt-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                    Headquarters
                  </p>
                  <p className="mt-1 text-lg font-medium tracking-[-0.02em] text-[#0a0a0a] md:text-xl">
                    {FIRM_HQ}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <PillButton to="/contact">Get In Touch</PillButton>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 lg:aspect-[5/4]">
                <motion.img
                  src={PAGE_HERO_IMAGES.aboutStudios}
                  alt="ThirdSpace studio work"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MarqueeStrip />
    </PageLayout>
  );
}
