"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";
import { ArrowUpRight } from "lucide-react";

/** Bold warm/bright gradients — completely different from site's dark neon theme */
const cardBgs = [
  "linear-gradient(135deg, #ff6b6b, #ee5a24)",
  "linear-gradient(135deg, #00b894, #00cec9)",
  "linear-gradient(135deg, #6c5ce7, #a855f7)",
  "linear-gradient(135deg, #f9a825, #ff9f43)",
  "linear-gradient(135deg, #74b9ff, #0984e3)",
  "linear-gradient(135deg, #55efc4, #00b894)",
  "linear-gradient(135deg, #fd79a8, #e84393)",
  "linear-gradient(135deg, #5f27cd, #7c5cff)",
  "linear-gradient(135deg, #a8e063, #56ab2f)",
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

        {/* Flex-wrap layout — centered rows, fills available space */}
        <div className="mt-16 flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 5) * 0.07,
              }}
              className="ind-card-tile group relative flex aspect-square w-[105px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-3.5 shadow-lg transition-all duration-400 hover:shadow-2xl hover:scale-[1.05] sm:w-[125px] sm:p-4 md:w-[140px] lg:w-[150px]"
              style={{ background: cardBgs[i] }}
            >
              {/* Large faded number in background */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-2 -right-1 select-none font-display text-[3.5rem] font-black leading-none text-white/10 transition-all duration-400 group-hover:text-white/20 sm:text-[4rem]"
              >
                0{i + 1}
              </span>

              {/* Top — Icon */}
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 sm:h-9 sm:w-9">
                <ind.icon className="h-4 w-4 text-white sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
              </div>

              {/* Bottom — Title + Arrow */}
              <div className="relative flex flex-col gap-1.5">
                <h3 className="font-display text-[12px] font-bold leading-tight tracking-tight text-white sm:text-[13px]">
                  {ind.name}
                </h3>
                <div className="flex items-center gap-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                    Explore
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
