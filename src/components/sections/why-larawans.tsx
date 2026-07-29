"use client";

import { motion } from "framer-motion";
import { Counter } from "../counter";
import { stats } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

const TEAM_MEMBERS = [
  {
    name: "Lena Pearce",
    role: "Creative Director",
    bio: "Crafting visual identities and user experiences that connect brands with their audience on an emotional level.",
    blobColor: "#0EA5E9",
  },
  {
    name: "Sophia Bach",
    role: "Lead Engineer",
    bio: "Architecting scalable systems with clean code and modern frameworks that power enterprise-grade applications.",
    blobColor: "#22C55E",
    featured: true,
  },
  {
    name: "Arielle Cooper",
    role: "Product Strategist",
    bio: "Turning complex business requirements into intuitive product roadmaps that drive measurable growth outcomes.",
    blobColor: "#14B8A6",
  },
];

export function WhyLarawans() {
  return (
    <section id="why-larawans" className="relative bg-[#f8f9fc] pt-24 sm:pt-32 pb-[30px] sm:pb-[50px]">
      {/* Soft glow background — light theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,92,255,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Light-theme heading overrides */}
        <div className="[&_.rounded-full]:border-neutral-200 [&_.rounded-full]:bg-white [&_.rounded-full]:text-neutral-500 [&_h2]:text-neutral-900 [&_p]:text-neutral-600">
          <SectionHeading
            eyebrow="Why Larawans"
            title="The team behind"
            highlight="compounding outcomes"
            description={undefined}
          />
        </div>

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
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a1a] p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:p-8"
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
              <div className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-neutral-400">
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

        {/* Team member profile cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="group relative mx-auto w-full max-w-[340px]"
            >
              {/* Colorful blob behind card */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                style={{
                  background: member.blobColor,
                  borderRadius: "58% 42% 55% 45% / 52% 58% 42% 48%",
                  top: "-6%",
                  left: "-4%",
                  right: "-4%",
                  bottom: "-8%",
                  transform: `rotate(${i === 0 ? "-6deg" : i === 2 ? "6deg" : "0deg"})`,
                }}
              />

              {/* White card */}
              <div className="relative z-[1] rounded-3xl bg-white p-6 pt-[72px] text-center shadow-[0_10px_40px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] sm:p-8 sm:pt-[76px]">
                {/* Avatar — overlaps top edge */}
                <div className="absolute left-1/2 top-0 z-[2] -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="flex h-[100px] w-[100px] items-center justify-center rounded-full border-[3px] border-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
                    style={{ background: `linear-gradient(145deg, ${member.blobColor}40, ${member.blobColor}20)` }}
                  >
                    <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="18" r="8" fill={member.blobColor} opacity="0.8" />
                      <path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" fill={member.blobColor} opacity="0.5" />
                    </svg>
                  </div>
                </div>

                <h4 className="font-display text-xl font-semibold tracking-tight text-neutral-900">
                  {member.name}
                </h4>
                <p className="mt-1 text-[15px] italic text-neutral-500">
                  {member.role}
                </p>
                <p className="mt-4 text-[13px] leading-relaxed text-neutral-400">
                  {member.bio}
                </p>
              </div>

              {/* Star badge (featured card only) */}
              {member.featured && (
                <div className="absolute -bottom-5 left-1/2 z-[3] -translate-x-1/2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
