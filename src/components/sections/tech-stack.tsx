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
    <section id="tech-stack" className="relative overflow-hidden bg-[#050614] py-[30px]">
      {/* Dark gradient orbs — hero-style background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {/* Large violet orb */}
        <div className="absolute -left-20 -top-10 h-[500px] w-[500px] rounded-full" style={{ background: 'rgba(124,92,255,0.25)', filter: 'blur(120px)' }} />
        {/* Cyan orb */}
        <div className="absolute -right-16 top-1/4 h-[420px] w-[420px] rounded-full" style={{ background: 'rgba(0,224,198,0.2)', filter: 'blur(110px)' }} />
        {/* Magenta orb */}
        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full" style={{ background: 'rgba(255,77,210,0.12)', filter: 'blur(100px)' }} />
        {/* Central aurora glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse at center, rgba(124,92,255,0.35) 0%, rgba(0,224,198,0.2) 40%, rgba(255,77,210,0.1) 65%, transparent 85%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          title="Built on the"
          highlight="right tools for the job"
          description={undefined}
        />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
                  delay: (i % 6) * 0.06,
                }}
                whileHover={{ y: -6, scale: 1.05 }}
                className="tech-card group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl p-5 transition-all duration-500 interactive"
                style={{
                  background: `linear-gradient(145deg, ${t.color}12 0%, ${t.color}04 60%, rgba(255,255,255,0.02) 100%)`,
                  border: `1px solid ${t.color}18`,
                }}
              >
                {/* Top color bar */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
                />

                {/* Icon glow ring */}
                <div
                  aria-hidden
                  className="absolute flex h-16 w-16 items-center justify-center rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100 sm:h-18 sm:w-18"
                  style={{
                    background: `radial-gradient(circle, ${t.color}20, transparent 70%)`,
                    filter: "blur(8px)",
                  }}
                />

                <Icon
                  className="transition-all duration-500 group-hover:scale-110"
                  style={{ color: t.color, width: "48px", height: "48px" }}
                  strokeWidth={1.6}
                />
                <span className="font-display text-[11px] font-semibold tracking-wider uppercase text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs">
                  {t.name}
                </span>

                {/* Hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${t.color}15, transparent 70%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
