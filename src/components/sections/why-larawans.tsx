"use client";

import { motion } from "framer-motion";
import { Counter } from "../counter";
import { stats } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

const HIGHLIGHTS = [
  {
    title: "AI-First by Default",
    body: "Every project ships with LLMs, RAG, and automation baked into the architecture — not bolted on later. Your software gets smarter the longer you use it.",
    icon: "✦",
    accent: "#7c5cff",
  },
  {
    title: "Senior-Only Engineers",
    body: "No juniors learning on your budget. Every line of code is written by engineers with 6+ years of production experience across 12+ industries.",
    icon: "◆",
    accent: "#00e0c6",
  },
  {
    title: "Transparent Delivery",
    body: "Weekly demos, GitHub access, Slack channels, and real-time dashboards. You always know what we're building, why, and how it maps to your KPIs.",
    icon: "▲",
    accent: "#ff4dd2",
  },
  {
    title: "Long-Term Partnership",
    body: "92% of our clients renew after the first project. We're not a vendor — we're the team you call when something needs to ship, scale, or survive.",
    icon: "●",
    accent: "#ffb14d",
  },
];

export function WhyLarawans() {
  return (
    <section id="why-larawans" className="relative pt-24 sm:pt-32 pb-[30px] sm:pb-[50px]">
      {/* Soft glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,92,255,0.4), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Larawans"
          title="The team behind"
          highlight="compounding outcomes"
          description={undefined}
        />

        {/* Animated stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-6 text-center backdrop-blur sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-50"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,#7c5cff,#00e0c6,transparent)",
                }}
              />
              <div className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                <span className="text-gradient-aurora">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
              </div>
              <div className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                style={{ background: "#7c5cff" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Highlight pillars */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur transition-colors hover:border-white/15"
            >
              <div
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl text-base font-bold"
                style={{
                  color: h.accent,
                  background: `${h.accent}1a`,
                  boxShadow: `0 0 18px ${h.accent}55`,
                }}
              >
                {h.icon}
              </div>
              <h4 className="font-display text-base font-semibold tracking-tight">
                {h.title}
              </h4>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {h.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
