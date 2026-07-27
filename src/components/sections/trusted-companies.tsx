"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiGooglecloud,
  SiMysql,
  SiPostgresql,
} from "react-icons/si";
import { BrainCircuit, Cloud, Server } from "lucide-react";

type IconType = ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>;

const TECH: { name: string; Icon: IconType; color: string }[] = [
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#171717" },
  { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
  { name: "OpenAI", Icon: BrainCircuit, color: "#171717" },
  { name: "AWS", Icon: Cloud, color: "#FF9900" },
  { name: "Azure", Icon: Server, color: "#0078D4" },
  { name: "GCP", Icon: SiGooglecloud, color: "#4285F4" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
];

export function TrustedCompanies() {
  const items = [...TECH, ...TECH];

  return (
    <section
      id="trusted-companies"
      className="relative border-y border-neutral-200 bg-[#f8f9fc] py-14"
    >
      {/* Subtle top highlight line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(124,92,255,0.35) 30%, rgba(0,224,198,0.35) 50%, rgba(124,92,255,0.35) 70%, transparent 95%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-9 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500"
        >
          Trusted by forward-thinking teams · Powered by best-in-class tech
        </motion.p>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-14">
            {items.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="group flex shrink-0 items-center gap-3 interactive"
              >
                {/* Icon container with light shadow card */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.1),0_0_0_1px_rgba(124,92,255,0.15)] group-hover:scale-105">
                  <t.Icon
                    className="h-6 w-6 transition-all duration-300"
                    style={{ color: t.color }}
                    strokeWidth={1.8}
                  />
                </div>
                <span className="font-display text-lg font-semibold tracking-tight text-neutral-700 transition-colors group-hover:text-neutral-900">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle bottom highlight line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(124,92,255,0.35) 30%, rgba(0,224,198,0.35) 50%, rgba(124,92,255,0.35) 70%, transparent 95%)",
        }}
      />
    </section>
  );
}
