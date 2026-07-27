"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import {
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiGooglecloud,
  SiMysql,
  SiPostgresql,
} from "react-icons/si";
import { Cloud, BrainCircuit, Database, Server } from "lucide-react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const TECH: { name: string; Icon: IconType; color: string }[] = [
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Flutter", Icon: SiFlutter, color: "#54C5F8" },
  { name: "OpenAI", Icon: BrainCircuit, color: "#FFFFFF" },
  { name: "AWS", Icon: Cloud, color: "#FF9900" },
  { name: "Azure", Icon: Server, color: "#0078D4" },
  { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
];

export function TrustedCompanies() {
  const items = [...TECH, ...TECH];

  return (
    <section id="trusted-companies" className="relative border-y border-white/[0.06] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-9 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground"
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
                <t.Icon
                  className="h-7 w-7 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
                  style={{ color: t.color }}
                  strokeWidth={1.8}
                />
                <span className="font-display text-lg font-semibold tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
