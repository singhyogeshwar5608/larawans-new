"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SectionHeading — premium section header with eyebrow pill + gradient title + supporting text.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
  titleStyle,
  eyebrowStyle,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  titleStyle?: React.CSSProperties;
  eyebrowStyle?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-200/80 backdrop-blur"
          style={eyebrowStyle}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00e0c6] shadow-[0_0_10px_#00e0c6]" />
          {eyebrow}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
        style={titleStyle}
      >
        {title}{" "}
        {highlight && <span className="text-gradient-aurora">{highlight}</span>}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
