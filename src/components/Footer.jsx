/**
 * Footer.jsx — Exact match to reference
 * - Giant CTA headline top-left, bracket-arrow top-right
 * - Divider line
 * - 4-column info grid: WORK WITH US / HELLO / SOCIAL / OTHER
 * - Bottom bar: logo left, copyright center, website by right, back to top right
 */

import { Link } from "react-router-dom";
import PillButton from "./PillButton";

function FooterHeading({ children, className = "" }) {
  return (
    <p className={`mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a] md:mb-1 md:text-[clamp(9px,0.78vw,12px)] ${className}`}>
      {children}
    </p>
  );
}

function FooterLink({ href = "#", children }) {
  return (
    <a
      href={href}
      className="text-[11px] font-normal uppercase tracking-[0.12em] text-[#0a0a0a] no-underline transition-opacity duration-300 hover:opacity-50 md:text-[clamp(10px,0.82vw,13px)]"
    >
      {children}
    </a>
  );
}

function FooterText({ children, className = "" }) {
  return (
    <p
      className={`text-[11px] font-normal leading-snug tracking-wide text-[#0a0a0a] md:text-[clamp(10px,0.82vw,13px)] ${className}`}
    >
      {children}
    </p>
  );
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full bg-white font-sans">
      {/* ── TOP SECTION: Headline + Arrow ── */}
      <div className="relative px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-12 md:px-12 md:pb-12 md:pt-16 lg:px-14">
        <h2 className="max-w-[92%] pr-2 text-[clamp(26px,8.5vw,100px)] font-medium uppercase leading-[0.9] tracking-[-0.03em] text-[#0a0a0a] sm:max-w-full sm:leading-[0.88]">
          Ready To Discuss
          <span className="mt-3 block sm:mt-6">Your Next Project?</span>
        </h2>

        <div className="absolute right-5 top-6 hidden h-[56px] w-[56px] sm:right-8 sm:top-10 sm:block sm:h-[80px] sm:w-[80px] md:right-12 md:top-10 md:h-[100px] md:w-[100px] lg:right-14 lg:h-[120px] lg:w-[120px]">
          <span className="absolute left-0 top-0 h-[18px] w-[18px] border-l-[2px] border-t-[2px] border-[#0a0a0a]" />
          <span className="absolute right-0 top-0 h-[18px] w-[18px] border-r-[2px] border-t-[2px] border-[#0a0a0a]" />
          <span className="absolute bottom-0 left-0 h-[18px] w-[18px] border-b-[2px] border-l-[2px] border-[#0a0a0a]" />
          <span className="absolute bottom-0 right-0 h-[18px] w-[18px] border-b-[2px] border-r-[2px] border-[#0a0a0a]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[clamp(28px,5vw,72px)] font-medium leading-none text-[#0a0a0a]">
              ↘
            </span>
          </div>
        </div>
      </div>

      <div className="mx-0 h-px w-full bg-black/12" />

      {/* ── MOBILE: compact 2×2 link grid ── */}
      <div className="px-5 py-8 md:hidden">
        <PillButton to="/contact" className="mb-7">
          Work With Us
        </PillButton>

        <div className="grid grid-cols-2 gap-x-5 gap-y-7">
          <div className="flex flex-col gap-2.5">
            <FooterHeading>Hello</FooterHeading>
            <a
              href="mailto:hello@thirdspace.studio"
              className="text-[11px] font-normal tracking-wide text-[#0a0a0a] no-underline transition-opacity hover:opacity-50"
            >
              hello@thirdspace.studio
            </a>
            <FooterText>
              Headquarters
              <br />
              Belgaum, Karnataka
            </FooterText>
            <FooterText>
              Studios
              <br />
              Belagavi · Pune
            </FooterText>
          </div>

          <div className="flex flex-col gap-2.5">
            <FooterHeading>Social</FooterHeading>
            {["Instagram", "LinkedIn", "Behance"].map((s) => (
              <FooterLink key={s}>{s}</FooterLink>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <FooterHeading>Other</FooterHeading>
            {["Supplier T&C's", "Privacy Policy", "Careers"].map((s) => (
              <FooterLink key={s}>{s}</FooterLink>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <FooterHeading>Opening Hours</FooterHeading>
            <FooterText>
              Monday To Friday
              <br />
              9AM – 6PM IST
            </FooterText>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: 4 columns ── */}
      <div className="hidden px-8 py-16 md:grid md:grid-cols-4 md:gap-6 lg:px-14">
        <div className="flex flex-col justify-start">
          <PillButton to="/contact">Work With Us</PillButton>
        </div>

        <div className="flex flex-col gap-3">
          <FooterHeading>Hello</FooterHeading>
          <a
            href="mailto:hello@thirdspace.studio"
            className="text-[clamp(10px,0.82vw,13px)] font-normal tracking-wide text-[#0a0a0a] no-underline transition-opacity duration-300 hover:opacity-50"
          >
            hello@thirdspace.studio
          </a>
          <FooterText>
            Headquarters
            <br />
            Belgaum, Karnataka
          </FooterText>
          <FooterText>
            Studios
            <br />
            Belagavi · Pune
          </FooterText>
          <FooterHeading className="mt-5">Opening Hours</FooterHeading>
          <FooterText>
            Monday To Friday
            <br />
            9AM – 6PM
          </FooterText>
        </div>

        <div className="flex flex-col gap-3">
          <FooterHeading>Social</FooterHeading>
          {["Instagram", "LinkedIn", "Behance"].map((s) => (
            <FooterLink key={s}>{s}</FooterLink>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <FooterHeading>Other</FooterHeading>
          {["Supplier T&C's", "Privacy Policy", "Careers"].map((s) => (
            <FooterLink key={s}>{s}</FooterLink>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-black/12" />

      {/* ── BOTTOM BAR ── */}
      <div className="px-5 py-5 sm:px-8 md:px-12 md:py-6 lg:px-14">
        {/* Mobile */}
        <div className="flex flex-col gap-5 md:hidden">
          <div className="flex items-start justify-between gap-4">
            <Link to="/home" className="shrink-0">
              <img
                src="/logo.png"
                alt="ThirdSpace Architecture Studio"
                className="h-20 w-auto max-w-[min(320px,78vw)] object-contain object-left opacity-90 sm:h-24"
              />
            </Link>
            <PillButton onClick={scrollToTop} arrow="↑" className="shrink-0">
              Back To Top
            </PillButton>
          </div>
          <div className="space-y-1.5 border-t border-black/10 pt-4">
            <p className="text-[9px] font-normal tracking-[0.1em] text-[#0a0a0a]/65">
              All content © ThirdSpace Architecture Studio 2025
            </p>
            <p className="text-center text-[9px] font-normal tracking-[0.1em] text-[#0a0a0a]/65">
              Designed and developed by{" "}
              <span className="font-semibold text-[#0a0a0a]">TSK</span>
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden flex-wrap items-center justify-between gap-4 md:flex">
          <Link to="/home" className="shrink-0">
            <img
              src="/logo.png"
              alt="ThirdSpace Architecture Studio"
              className="h-24 w-auto max-w-[min(420px,42vw)] object-contain object-left opacity-90 transition-opacity duration-300 hover:opacity-60 md:h-28 lg:h-32"
            />
          </Link>
          <div className="flex flex-1 flex-col items-center justify-center gap-1 text-center">
            <p className="text-[clamp(9px,0.75vw,11px)] font-normal tracking-[0.12em] text-[#0a0a0a]/70">
              All content © ThirdSpace Architecture Studio 2025
            </p>
            <p className="text-[clamp(9px,0.75vw,11px)] font-normal tracking-[0.12em] text-[#0a0a0a]/70">
              Designed and developed by{" "}
              <span className="font-semibold text-[#0a0a0a]">Rohan&amp;co</span>
            </p>
          </div>
          <PillButton onClick={scrollToTop} arrow="↑" className="w-fit shrink-0">
            Back To Top
          </PillButton>
        </div>
      </div>
    </footer>
  );
}
