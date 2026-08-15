"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Github, Instagram, Youtube, Facebook, ArrowUp } from "lucide-react";

const SERVICES = [
  "AI Agent Development",
  "Custom ERP Software",
  "CRM Development",
  "Website Development",
  "Android & iOS Apps",
  "UI/UX Design",
  "SaaS Development",
  "E-Commerce",
  "Digital Marketing",
  "SEO",
  "Branding",
];

const COMPANY = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "AI Solutions", href: "#ai-solutions" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn",
    color: "text-[#0A66C2]",
    bg: "bg-[#0A66C2]/15",
    border: "border-[#0A66C2]/40",
    glow: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.6)]",
  },
  {
    icon: Twitter,
    href: "#",
    label: "Twitter",
    color: "text-[#1DA1F2]",
    bg: "bg-[#1DA1F2]/15",
    border: "border-[#1DA1F2]/40",
    glow: "hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] hover:shadow-[0_0_20px_rgba(29,161,242,0.6)]",
  },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
    color: "text-[#E1306C]",
    bg: "bg-[#E1306C]/15",
    border: "border-[#E1306C]/40",
    glow: "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] hover:shadow-[0_0_20px_rgba(225,48,108,0.6)]",
  },
  {
    icon: Github,
    href: "#",
    label: "GitHub",
    color: "text-[#a855f7]",
    bg: "bg-[#a855f7]/15",
    border: "border-[#a855f7]/40",
    glow: "hover:bg-[#a855f7] hover:text-white hover:border-[#a855f7] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]",
  },
  {
    icon: Youtube,
    href: "#",
    label: "YouTube",
    color: "text-[#FF0000]",
    bg: "bg-[#FF0000]/15",
    border: "border-[#FF0000]/40",
    glow: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]",
  },
  {
    icon: Facebook,
    href: "#",
    label: "Facebook",
    color: "text-[#1877F2]",
    bg: "bg-[#1877F2]/15",
    border: "border-[#1877F2]/40",
    glow: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.6)]",
  },
];

export function Footer() {
  return (
    <footer
      className="relative mt-auto overflow-hidden border-t border-white/[0.08]"
      style={{ borderRadius: "10px 10px 0 0", background: '#050614' }}
    >
      {/* Hero-matching gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,92,255,0.25) 0%, rgba(0,224,198,0.15) 45%, rgba(255,77,210,0.08) 70%, transparent 85%)",
        }}
      />
      {/* Glow top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(124,92,255,0.6),rgba(0,224,198,0.6),transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <a href="#hero" className="group inline-flex items-center gap-2.5 interactive">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl p-[1.5px] shadow-[0_0_24px_rgba(124,92,255,0.5)]" style={{ background: 'linear-gradient(to bottom right, #7c5cff, #00e0c6)' }}>
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#080a1c]">
                  <span className="font-display text-lg font-extrabold text-gradient-aurora">L</span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-base font-bold tracking-tight">
                  Larawans<span className="text-[#00e0c6]">.</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                  Digital
                </span>
              </div>
            </a>
            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-muted-foreground">
              AI-first software development company building websites, mobile apps,
              ERPs, AI agents, and digital solutions that accelerate business growth
              — for modern businesses worldwide.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`interactive flex h-10 w-10 items-center justify-center rounded-xl border ${s.border} ${s.bg} ${s.color} transition-all duration-300 hover:scale-110 ${s.glow}`}
                >
                  <s.icon className="h-4.5 w-4.5 stroke-[2.2]" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-4"
          >
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Services
            </h4>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="interactive text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="lg:col-span-4"
          >
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Company
            </h4>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {COMPANY.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="interactive text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
              <p className="text-[13px] text-muted-foreground">
                Have a project in mind?
              </p>
              <a
                href="#contact"
                className="interactive mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-gradient-aurora"
              >
                Book Free Consultation
                <ArrowUp className="h-3.5 w-3.5 rotate-45" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} Larawans Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[12px] text-muted-foreground">
            <a href="#" className="interactive transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="interactive transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="interactive transition-colors hover:text-foreground">Cookies</a>
          </div>
          <a
            href="#hero"
            className="interactive flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:border-[#00e0c6]/50 hover:bg-[#00e0c6]/10 hover:text-[#00e0c6]"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
