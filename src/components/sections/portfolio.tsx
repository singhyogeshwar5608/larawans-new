"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";
import { MagneticButton } from "../magnetic-button";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Work that ships,"
          highlight="scales, and survives"
          description="A snapshot of platforms we've shipped across insurance, healthcare, retail, manufacturing, and SaaS. Each one is in production today, handling real revenue and real users."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.08,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-white/20 interactive"
            >
              {/* Big gradient header */}
              <div
                className="relative h-40 overflow-hidden sm:h-44"
                style={{ background: p.accent }}
              >
                {/* Pattern overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.4) 0%, transparent 40%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Floating mock UI */}
                <div className="absolute inset-0 flex items-center justify-center opacity-90">
                  <div className="relative h-24 w-32 rotate-3 rounded-xl border border-white/30 bg-white/10 p-2 backdrop-blur-md transition-all duration-500 group-hover:rotate-0 group-hover:scale-105">
                    <div className="mb-1.5 flex gap-1">
                      <span className="h-1 w-1 rounded-full bg-white/70" />
                      <span className="h-1 w-1 rounded-full bg-white/70" />
                      <span className="h-1 w-1 rounded-full bg-white/70" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 w-3/4 rounded-full bg-white/60" />
                      <div className="h-1.5 w-full rounded-full bg-white/40" />
                      <div className="h-1.5 w-2/3 rounded-full bg-white/40" />
                      <div className="mt-2 h-3 w-1/2 rounded-full bg-white/80" />
                    </div>
                  </div>
                </div>

                <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur">
                  {p.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition-all duration-300 group-hover:border-[#00e0c6]/50 group-hover:bg-[#00e0c6]/10 group-hover:text-[#00e0c6]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 flex justify-center"
        >
          <MagneticButton href="#contact" variant="glass" className="px-7 py-3.5">
            Start your case study
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
