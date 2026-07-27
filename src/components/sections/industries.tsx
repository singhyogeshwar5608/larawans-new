"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

export function Industries() {
  return (
    <section id="industries" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Industries"
          title="Deep expertise across"
          highlight="9 verticals"
          description="We don't write generic software. Every industry comes with its own regulations, workflows, and edge cases — and we've shipped production systems in all of them."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.08,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-[#7c5cff]/40 interactive sm:p-7"
            >
              {/* Animated radial hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                style={{
                  background:
                    "radial-gradient(circle,#7c5cff 0%,transparent 70%)",
                }}
              />

              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#7c5cff]/20 to-[#00e0c6]/10 text-[#00e0c6] transition-all duration-500 group-hover:scale-110 group-hover:text-white">
                  <ind.icon className="h-5.5 w-5.5" strokeWidth={1.8} />
                </div>
                <span className="font-mono text-[11px] text-muted-foreground/60">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                {ind.name}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {ind.blurb}
              </p>

              {/* Bottom accent line on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#7c5cff] to-[#00e0c6] transition-transform duration-500 group-hover:scale-x-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
