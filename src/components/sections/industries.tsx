"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

/** Unique neon accent per industry card — top bar color */
const cardAccents = [
  "#7c5cff", "#00e0c6", "#ff4dd2", "#ffb14d", "#4dc4ff",
  "#00e0ff", "#7c5cff", "#ff4dd2",
];

export function Industries() {
  return (
    <section id="industries" className="relative bg-[#f8f9fc] py-[40px] sm:py-[60px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Light-theme heading overrides */}
        <div className="[&_.rounded-full]:border-neutral-200 [&_.rounded-full]:bg-white [&_.rounded-full]:text-neutral-500 [&_h2]:text-neutral-900 [&_p]:text-neutral-600">
          <SectionHeading
            eyebrow="Industries"
            title="Deep expertise across"
            highlight="multi sector"
            description={undefined}
          />
        </div>

        {/* Flex-wrap — centered rows, more cards per row on desktop */}
        <div className="mt-16 flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 5) * 0.08,
              }}
              className="ind-card group relative flex w-[165px] flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-400 hover:scale-[1.03] sm:w-[200px] lg:w-[220px]"
              style={{
                borderTop: `3px solid ${cardAccents[i]}`,
              }}
            >
              {/* Background number watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -bottom-2 select-none font-display text-[4rem] font-black leading-none text-white/[0.03] transition-colors duration-400 group-hover:text-white/[0.06]"
              >
                0{i + 1}
              </span>

              {/* Content */}
              <div className="relative flex flex-col gap-1.5 p-4 sm:p-5 lg:p-6">
                {/* Icon */}
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-400 sm:h-10 sm:w-10"
                  style={{ backgroundColor: `${cardAccents[i]}15` }}
                >
                  <ind.icon
                    className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                    strokeWidth={1.6}
                    style={{ color: cardAccents[i] }}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-[14px] font-bold tracking-tight text-neutral-800 sm:text-[15px]">
                  {ind.name}
                </h3>

                {/* Blurb — description */}
                <p className="mt-0.5 flex-1 text-[12px] leading-relaxed text-neutral-500 sm:text-[13px]">
                  {ind.blurb}
                </p>

                {/* Explore tag — bottom */}
                <div className="mt-auto flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 transition-colors duration-400 group-hover:text-neutral-600">
                  <span>Explore</span>
                  <svg
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
