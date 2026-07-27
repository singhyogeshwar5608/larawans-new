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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              className="interactive inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground backdrop-blur lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 top-[78px] z-40 rounded-3xl border border-white/10 bg-[#0a0c20]/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="interactive flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground"
                >
                  {l.label}
                  <ArrowUpRight className="h-4 w-4 opacity-50" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="interactive mt-2 rounded-2xl btn-neon px-5 py-3 text-center text-sm font-semibold"
              >
                Book Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
