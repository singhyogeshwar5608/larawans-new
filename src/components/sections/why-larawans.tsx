"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../section-heading";

const TEAM_MEMBERS = [
  {
    name: "Lena Pearce",
    role: "Creative Director",
    bio: "Crafting visual identities and user experiences that connect brands with their audience on an emotional level.",
    blobColor: "#0EA5E9",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Sophia Bach",
    role: "Lead Engineer",
    bio: "Architecting scalable systems with clean code and modern frameworks that power enterprise-grade applications.",
    blobColor: "#22C55E",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    featured: true,
  },
  {
    name: "Arielle Cooper",
    role: "Product Strategist",
    bio: "Turning complex business requirements into intuitive product roadmaps that drive measurable growth outcomes.",
    blobColor: "#14B8A6",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
];

export function WhyLarawans() {
  return (
    <section id="why-larawans" className="relative bg-[#f8f9fc] pt-[30px] md:pt-[50px] lg:pt-[50px] pb-[30px] sm:pb-[50px]">
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
            title="The team behind"
            highlight="compounding outcomes"
            description={undefined}
          />
        </div>

        {/* Team member profile cards */}
        <div className="mt-[82px] grid grid-cols-1 gap-[82px] sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="group relative mx-auto w-full max-w-[260px]"
            >
              {/* Colorful rounded square — slight tilt, only corners peek out */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: member.blobColor,
                  borderRadius: "28px",
                  width: "100%",
                  height: "100%",
                  transform: "translate(-50%, -50%) rotate(11deg)",
                }}
              />

              {/* White card */}
              <div className="relative z-[1] flex min-h-[280px] flex-col rounded-2xl bg-white p-4 pt-[112px] text-center shadow-[0_10px_40px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] sm:p-5 sm:pt-[116px] sm:min-h-[320px]">
                {/* Avatar — overlaps top edge */}
                <div className="absolute left-1/2 top-0 z-[2] -translate-x-1/2 -translate-y-[28%]">
                  <div
                    className="h-[120px] w-[120px] overflow-hidden rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <h4 className="font-display text-xl font-semibold tracking-tight text-neutral-900">
                  {member.name}
                </h4>
                <p className="mt-1 text-[15px] italic text-neutral-500">
                  {member.role}
                </p>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-neutral-400">
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
