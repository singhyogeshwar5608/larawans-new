"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

/** Unique neon accent per industry card — top bar color */
const cardAccents = [
  "#7c5cff", "#00e0c6", "#ff4dd2", "#ffb14d", "#4dc4ff",
  "#9dff5c", "#00e0ff", "#7c5cff", "#ff4dd2",
];

export function Industries() {
  return (
    <section id="industries" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Industries"
          title="Deep expertise across"
          highlight="9 verticals"
          description={undefined}
        />

        <div className="mt-16 grid grid-cols-2 place-items-center gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.1,
              }}
              className="ind-card group relative flex w-full max-w-[220px] flex-col overflow-hidden rounded-xl bg-[#0e1029] aspect-square transition-all duration-400 hover:scale-[1.03] sm:max-w-[260px] lg:max-w-[280px]"
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
              <div className="relative flex flex-col gap-1.5 p-3.5 sm:p-4">
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
                <h3 className="font-display text-[15px] font-bold tracking-tight text-foreground/95 sm:text-base">
                  {ind.name}
                </h3>

                {/* Blurb */}
                <p className="text-[12px] leading-relaxed text-muted-foreground/60 sm:text-[13px]">
                  {ind.blurb}
                </p>

                {/* Explore tag — bottom */}
                <div className="mt-auto flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/40 transition-colors duration-400 group-hover:text-muted-foreground/80">
                  <span>Explore</span>
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
