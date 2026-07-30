"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./magnetic-button";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "AI Solutions", href: "#ai-solutions" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Tech", href: "#tech-stack" },
  { label: "FAQ", href: "#faq" },
];

/* ── Animation variants ── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const menuVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: 0.15 + i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -20,
    filter: "blur(6px)",
    transition: { duration: 0.25, delay: i * 0.03 },
  }),
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 },
  },
};

const iconVariants = {
  closed: { rotate: 0, scale: 1 },
  open: { rotate: 90, scale: 0.85 },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when menu open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "border border-white/10 bg-[#0a0c20]/70 shadow-[0_12px_40px_-12px_rgba(124,92,255,0.35)] backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          )}
        >
          {/* Logo */}
          <a href="#hero" className="group flex items-center gap-2.5 interactive">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-gradient-to-br from-[#7c5cff] to-[#00e0c6] p-[1.5px] shadow-[0_0_24px_rgba(124,92,255,0.5)]">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#080a1c]">
                <span className="font-display text-base font-extrabold text-gradient-aurora">L</span>
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-bold tracking-tight">
                Larawans<span className="text-[#00e0c6]">.</span>
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Digital
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="interactive relative rounded-full px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-4 bottom-1 h-px scale-x-0 bg-gradient-to-r from-[#7c5cff] to-[#00e0c6] transition-transform duration-300 hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <MagneticButton
              href="#contact"
              variant="neon"
              className="hidden px-5 py-2.5 text-[13px] sm:inline-flex"
            >
              Book Free Consultation
            </MagneticButton>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="interactive relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground backdrop-blur lg:hidden"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Full-screen Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dark overlay backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-40 bg-[#050614]/80 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-x-4 top-[90px] bottom-4 z-50 flex flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0c20]/98 shadow-[0_32px_80px_-16px_rgba(124,92,255,0.4)] backdrop-blur-2xl lg:hidden"
            >
              {/* Top accent glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-48 w-[300px] -translate-x-1/2 opacity-30 blur-[80px]"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(124,92,255,0.5), rgba(0,224,198,0.3), transparent 70%)",
                }}
              />

              {/* Navigation links */}
              <div className="relative flex flex-1 flex-col justify-center px-6 py-8">
                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={() => setOpen(false)}
                      className="group relative flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:bg-white/[0.04]"
                    >
                      {/* Left accent line */}
                      <span className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[#7c5cff] to-[#00e0c6] opacity-0 transition-all duration-300 group-hover:h-8" />

                      {/* Link number */}
                      <span className="text-[11px] font-bold tabular-nums text-white/20 transition-colors duration-300 group-hover:text-[#7c5cff]/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Link label */}
                      <span className="flex-1 text-[17px] font-semibold tracking-tight text-white/80 transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
                        {l.label}
                      </span>

                      {/* Arrow icon */}
                      <ArrowUpRight className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:text-[#00e0c6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Bottom CTA section */}
              <div className="relative border-t border-white/[0.06] px-6 py-6">
                <motion.a
                  href="#contact"
                  variants={ctaVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setOpen(false)}
                  className="interactive relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#7c5cff] to-[#00e0c6] px-6 py-4 text-[15px] font-bold text-white shadow-[0_0_32px_rgba(124,92,255,0.4)] transition-shadow duration-300 hover:shadow-[0_0_48px_rgba(124,92,255,0.6)]"
                >
                  {/* Shimmer on CTA */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative">Book Free Consultation</span>
                  <ArrowUpRight className="relative h-4 w-4" />
                </motion.a>

                {/* Bottom tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-center text-[11px] tracking-widest text-white/25 uppercase"
                >
                  Building the future, one pixel at a time
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
