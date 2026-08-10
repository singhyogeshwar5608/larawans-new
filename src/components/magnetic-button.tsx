"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * MagneticButton — premium button that subtly follows the cursor (magnetic effect),
 * with neon or glass variants.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "neon",
  className,
  strength = 18,
  icon,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "neon" | "glass";
  className?: string;
  strength?: number;
  icon?: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({
      x: (x / rect.width) * strength,
      y: (y / rect.height) * strength,
    });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  const baseClass =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 will-change-transform interactive";

  const variantClass =
    variant === "neon" ? "btn-neon" : "btn-ghost-glass";

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon}
      </span>
      {variant === "neon" && (
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_36px_rgba(0,224,198,0.55)]" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.4 }}
        className={cn(baseClass, variantClass, className)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.4 }}
      className={cn(baseClass, variantClass, className)}
    >
      {content}
    </motion.button>
  );
}
