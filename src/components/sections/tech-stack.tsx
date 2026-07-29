"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import {
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiNodedotjs,
  SiPython,
  SiDotnet,
  SiFirebase,
  SiMysql,
  SiPostgresql,
} from "react-icons/si";
import { Cloud, Server } from "lucide-react";
import { techStack } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

type IconType = ComponentType<
  SVGProps<SVGSVGElement> & { className?: string; style?: React.CSSProperties }
>;

const ICON_MAP: Record<string, IconType> = {
  Laravel: SiLaravel,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Flutter: SiFlutter,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  ".NET": SiDotnet,
  AWS: Cloud,
  Azure: Server,
  Firebase: SiFirebase,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
};

export function TechStack() {
  return (
    <section id="tech-stack" className="relative py-[30px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Built on the"
          highlight="right tools for the job"
          description={undefined}
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {techStack.map((t, i) => {
            const Icon = ICON_MAP[t.name];
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 28, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (i % 7) * 0.05,
                }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="tech-card group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-5 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_32px_-8px_rgba(124,92,255,0.2)] interactive"
              >
                {/* Glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${t.color}33, transparent 60%)`,
                  }}
                />

                <Icon
                  className="h-10 w-10 opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 sm:h-11 sm:w-11"
                  style={{ color: t.color }}
                  strokeWidth={1.6}
                />
                <span className="font-display text-[11px] font-semibold tracking-wider uppercase text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs">
                  {t.name}
                </span>

                {/* Bottom accent */}
                <span
                  aria-hidden
                  className="absolute inset-x-3 bottom-2.5 h-[2px] origin-center scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${t.color}, ${t.color}88)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
