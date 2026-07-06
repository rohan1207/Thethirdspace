import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import Reveal from "../components/layout/Reveal";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import PillButton from "../components/PillButton";
import { FIRM_HQ, FIRM_STUDIOS } from "../constants/firm";
import { PAGE_HERO_IMAGES } from "../constants/heroImages";

const CONTACT_CHANNELS = [
  {
    label: "General Enquiries",
    value: "hello@thirdspace.studio",
    href: "mailto:hello@thirdspace.studio",
  },
  {
    label: "New Projects",
    value: "projects@thirdspace.studio",
    href: "mailto:projects@thirdspace.studio",
  },
  {
    label: "Press & Media",
    value: "press@thirdspace.studio",
    href: "mailto:press@thirdspace.studio",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    type: "New Project",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <PageHero
        eyebrow="Connect"
        title="Contact"
        subtitle="We welcome conversations about educational campuses, institutional buildings, interiors, and urban studies."
        image={PAGE_HERO_IMAGES.contact}
        align="left"
      />

      <section className="border-t border-black/10 bg-white px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-[1fr_minmax(300px,38%)] lg:gap-20">
          {/* Form */}
          <Reveal>
            <SectionEyebrow className="mb-6">Enquiry</SectionEyebrow>
            <h2 className="mb-8 text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
              Tell us about your project
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-sm border border-black/10 bg-[#f5f5f3] p-10"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                  Message sent
                </p>
                <p className="mt-3 text-xl font-medium tracking-[-0.02em] text-[#0a0a0a]">
                  Thank you — we&apos;ll be in touch within two business days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <FormField label="Name" name="name" value={form.name} onChange={handleChange} required />
                  <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <FormField label="Organisation" name="company" value={form.company} onChange={handleChange} />

                <div>
                  <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Enquiry Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["New Project", "Collaboration", "Press", "Other"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, type }))}
                        className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
                          form.type === type
                            ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                            : "border-black/20 text-[#0a0a0a] hover:border-black/40"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none border-b border-black/15 bg-transparent py-3 text-sm text-[#0a0a0a] outline-none transition-colors placeholder:text-neutral-400 focus:border-[#0a0a0a]"
                    placeholder="Describe your project, timeline, and location..."
                  />
                </div>

                <PillButton type="submit" arrow="↗">
                  Send Message
                </PillButton>
              </form>
            )}
          </Reveal>

          {/* Info sidebar */}
          <Reveal delay={1}>
            <div className="lg:sticky lg:top-28">
              <SectionEyebrow className="mb-6">Direct</SectionEyebrow>

              <div className="space-y-8 border-t border-black/10">
                {CONTACT_CHANNELS.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    className="group block border-b border-black/10 py-6 no-underline"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      {ch.label}
                    </p>
                    <p className="mt-1 text-base font-medium text-[#0a0a0a] transition-opacity duration-300 group-hover:opacity-50">
                      {ch.value}
                    </p>
                  </a>
                ))}
              </div>

              <div className="mt-10 space-y-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Headquarters
                  </p>
                  <p className="mt-2 text-base text-[#0a0a0a]">{FIRM_HQ}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Studios
                  </p>
                  <p className="mt-2 text-base text-[#0a0a0a]">
                    {FIRM_STUDIOS.join(" · ")}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Opening Hours
                  </p>
                  <p className="mt-2 text-base text-[#0a0a0a]">
                    Monday – Friday
                    <br />
                    9AM – 6PM IST
                  </p>
                </div>
              </div>

              <div className="relative mt-12 aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                  src={PAGE_HERO_IMAGES.contactSide}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

function FormField({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full border-b border-black/15 bg-transparent py-3 text-sm text-[#0a0a0a] outline-none transition-colors placeholder:text-neutral-400 focus:border-[#0a0a0a]"
      />
    </div>
  );
}
