import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function LeadershipCard({ person, index }) {
  return (
    <motion.article
      className="group flex h-full w-full flex-col overflow-hidden border border-black/[0.08] bg-[#fafaf9]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, delay: index * 0.1, ease }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 sm:aspect-[4/5]">
        <motion.img
          src={person.image}
          alt={person.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          loading="lazy"
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <p className="absolute bottom-2 left-2 text-[7px] font-semibold uppercase tracking-[0.16em] text-white/0 transition-all duration-500 group-hover:text-white/90 sm:bottom-3 sm:left-3 sm:text-[8px]">
          {person.studio}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5 md:p-6 lg:p-8">
        <p className="mb-1 text-[7px] font-semibold uppercase tracking-[0.18em] text-neutral-400 sm:mb-1.5 sm:text-[9px] sm:tracking-[0.22em]">
          {person.role}
        </p>
        <h3 className="mb-2 text-[13px] font-medium leading-snug tracking-[-0.02em] text-[#0a0a0a] sm:mb-3 sm:text-base md:text-lg lg:text-xl">
          {person.name}
        </h3>
        <p className="mb-3 flex-1 text-[10px] leading-[1.65] text-neutral-600 sm:mb-4 sm:text-xs sm:leading-[1.75] md:text-sm md:leading-[1.8]">
          {person.bio}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {person.focus.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/10 bg-white px-2 py-0.5 text-[6px] font-semibold uppercase tracking-[0.1em] text-neutral-500 sm:px-2.5 sm:py-1 sm:text-[7px] md:text-[8px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
