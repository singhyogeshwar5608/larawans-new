"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./magnetic-button";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "AI Solutions", href: "/#ai-solutions" },
  { label: "Process", href: "/#process" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Tech", href: "/#tech-stack" },
  { label: "FAQ", href: "/#faq" },
];

/* ── Animation variants ── */
const EASE_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
};

const menuVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: EASE_CUBIC,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.94,
    rotateX: -5,
    transition: { duration: 0.35 },
  },
};

const linkContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_CUBIC },
  },
  exit: {
    opacity: 0,
    y: 15,
    scale: 0.97,
    filter: "blur(4px)",
    transition: { duration: 0.2 },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.6, ease: EASE_CUBIC },
  },
  exit: {
    opacity: 0,
    y: 15,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const dividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.5, ease: EASE_CUBIC },
  },
  exit: {
    scaleX: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const taglineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.9, ease: EASE_CUBIC },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const orbVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: [0.15, 0.35, 0.2][i] ?? 0.2,
    scale: 1,
    transition: { duration: 1.2, delay: 0.3 + i * 0.15 },
  }),
  exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const menuRef = useRef<HTMLDivElement>(null);

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

  /* Track mouse for glow follow effect */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

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
          <a href="/" className="group flex items-center gap-2.5 interactive">
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
                    transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}
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
              className="fixed inset-0 z-40 bg-[#050614]/85 backdrop-blur-md lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              ref={menuRef}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseMove={handleMouseMove}
              className="fixed inset-x-3 top-[88px] bottom-3 z-50 flex flex-col overflow-hidden rounded-[32px] border border-white/[0.06] bg-[#0a0c20]/[0.97] shadow-[0_40px_100px_-20px_rgba(124,92,255,0.5),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-2xl lg:hidden"
              style={{ perspective: 1000 }}
            >
              {/* Animated rotating gradient border glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-[1px] rounded-[33px] opacity-50"
                style={{
                  background: "conic-gradient(from var(--menu-angle, 0deg), transparent 30%, rgba(124,92,255,0.4) 50%, rgba(0,224,198,0.3) 70%, transparent 90%)",
                  animation: "menu-border-spin 4s linear infinite",
                  zIndex: -1,
                }}
              />

              {/* Mouse-follow glow */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute h-[250px] w-[250px] rounded-full opacity-0 blur-[80px] transition-opacity duration-700 lg:hidden"
                style={{
                  background: "radial-gradient(circle, rgba(124,92,255,0.25), rgba(0,224,198,0.15), transparent 60%)",
                  x: springX,
                  y: springY,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              />
              <style>{`
                @keyframes menu-border-spin {
                  to { --menu-angle: 360deg; }
                }
                @property --menu-angle {
                  syntax: '<angle>';
                  initial-value: 0deg;
                  inherits: false;
                }
              `}</style>

              {/* Floating ambient orbs */}
              {[
                { color: "#7c5cff", size: 120, top: "10%", left: "15%", delay: 0 },
                { color: "#00e0c6", size: 80, top: "60%", right: "10%", delay: 1 },
                { color: "#7c5cff", size: 60, bottom: "20%", left: "50%", delay: 2 },
              ].map((orb, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={orbVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  aria-hidden
                  className="pointer-events-none absolute rounded-full blur-[60px]"
                  style={{
                    width: orb.size,
                    height: orb.size,
                    background: orb.color,
                    top: orb.top,
                    left: orb.left,
                    right: orb.right,
                    bottom: orb.bottom,
                    animation: `menu-orb-float-${i} ${6 + i * 2}s ease-in-out infinite`,
                  }}
                />
              ))}

              {/* Top decorative line */}
              <motion.div
                aria-hidden
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />

              {/* Corner accent dots */}
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 15 }}
                className="pointer-events-none absolute left-6 top-4 h-1.5 w-1.5 rounded-full bg-[#7c5cff]/60"
              />
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 15 }}
                className="pointer-events-none absolute right-6 top-4 h-1.5 w-1.5 rounded-full bg-[#00e0c6]/60"
              />

              {/* Navigation links */}
              <div className="relative flex flex-1 flex-col justify-center px-5 py-8 sm:px-7">
                <motion.nav
                  variants={linkContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-1"
                >
                  {NAV_LINKS.map((l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      variants={linkVariants}
                      onClick={() => setOpen(false)}
                      whileHover={{ scale: 1.02, x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group relative flex items-center gap-4 rounded-2xl px-5 py-[14px] transition-colors duration-300"
                    >
                      {/* Animated gradient hover background */}
                      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7c5cff]/0 via-[#7c5cff]/0 to-[#00e0c6]/0 opacity-0 transition-all duration-500 group-hover:from-[#7c5cff]/20 group-hover:via-[#7c5cff]/10 group-hover:to-transparent group-hover:opacity-100" />

                      {/* Animated underline sweep */}
                      <span className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-[#7c5cff]/60 via-[#00e0c6]/40 to-transparent origin-left scale-x-0 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />

                      {/* Dot indicator */}
                      <motion.span
                        className="relative flex h-2 w-2 items-center justify-center"
                        whileHover={{ scale: 1.5 }}
                      >
                        <span className="absolute h-full w-full rounded-full bg-[#7c5cff]/30 transition-all duration-500 group-hover:bg-[#7c5cff]/60 group-hover:shadow-[0_0_8px_rgba(124,92,255,0.5)]" />
                        <span className="h-1 w-1 rounded-full bg-[#7c5cff]/0 transition-all duration-500 group-hover:bg-[#7c5cff]" />
                      </motion.span>

                      {/* Link label */}
                      <span className="relative flex-1 text-[17px] font-semibold tracking-tight text-white/60 transition-all duration-500 group-hover:text-white">
                        {l.label}
                      </span>

                      {/* Arrow icon with spring animation */}
                      <motion.span
                        className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.03] transition-all duration-500 group-hover:bg-[#00e0c6]/10"
                        whileHover={{ rotate: 45, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5 text-white/15 transition-all duration-500 group-hover:text-[#00e0c6]" />
                      </motion.span>
                    </motion.a>
                  ))}
                </motion.nav>
              </div>

              {/* Animated gradient divider */}
              <motion.div
                variants={dividerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                aria-hidden
                className="mx-6 h-px bg-gradient-to-r from-transparent via-[#7c5cff]/30 to-transparent"
              />

              {/* Bottom CTA section */}
              <div className="relative px-6 py-6 sm:px-7">
                <motion.a
                  href="#contact"
                  variants={ctaVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="interactive relative flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#7c5cff] to-[#00e0c6] px-6 py-4 text-[15px] font-bold text-white shadow-[0_0_40px_rgba(124,92,255,0.35)] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(124,92,255,0.55)]"
                >
                  {/* Multi-layer shimmer */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <span className="pointer-events-none absolute inset-0 translate-x-full animate-[shimmer_2.5s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <Sparkles className="relative h-4 w-4" />
                  <span className="relative">Book Free Consultation</span>
                  <ArrowUpRight className="relative h-4 w-4" />
                </motion.a>

                {/* Bottom tagline */}
                <motion.p
                  variants={taglineVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-4 flex items-center justify-center gap-2 text-[11px] tracking-widest text-white/20 uppercase"
                >
                  <span className="h-px w-6 bg-gradient-to-r from-transparent to-white/15" />
                  Building the future, one pixel at a time
                  <span className="h-px w-6 bg-gradient-to-l from-transparent to-white/15" />
                </motion.p>
              </div>

              {/* Bottom decorative line */}
              <motion.div
                aria-hidden
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
