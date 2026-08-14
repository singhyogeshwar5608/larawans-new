"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  Bot,
  Boxes,
  Users,
  Globe,
  Smartphone,
  Apple,
  Palette,
  Cloud,
  ShoppingBag,
  Megaphone,
  Search,
  Zap,
  ShieldCheck,
  Rocket,
  Building2,
  Truck,
  Factory,
  Store,
  Banknote,
  GraduationCap,
  HeartPulse,
  Database,
  Workflow,
  Code2,
  Compass,
  BarChart,
  TestTube,
  Headphones,
  FileText,
  Clock,
  Tag,
  MessageSquare,
  Plus,
  Minus,
  ArrowUpRight,
  Calendar,
  Shield,
  PhoneCall,
  ChevronLeft,
  Activity,
  Layers,
  Cpu,
  Layers3,
  Terminal,
  CheckSquare,
} from "lucide-react";

import type { ServiceDetail } from "@/lib/service-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Rocket,
  Building2,
  ShoppingBag,
  Cloud,
  Layers: Boxes,
  Users,
  Bot,
  Sparkles,
  Database,
  Workflow,
  Code2,
  MessageSquare,
  Compass,
  BarChart,
  TestTube,
  Headphones,
  Globe,
  ShieldCheck,
  Zap,
  Factory,
  Truck,
  Store,
  Banknote,
  GraduationCap,
  HeartPulse,
  Smartphone,
  Apple,
  Palette,
  Megaphone,
  Search,
  Tag,
  Clock,
  FileText,
  Cpu,
};

function DynamicIcon({ name, className = "h-4 w-4", size }: { name: string; className?: string; size?: number }) {
  const IconComponent = ICON_MAP[name] || Sparkles;
  return <IconComponent className={className} size={size} />;
}

export default function ServiceDetailClient({ service }: { service: ServiceDetail }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "process" | "cases" | "faq">("overview");

  return (
    <div className="min-h-screen bg-[#060814] text-white font-sans selection:bg-[#7c5cff] selection:text-white overflow-x-hidden antialiased">
      {/* Global Navigation */}
      <Navbar />

      {/* Atmospheric Background Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-linear-to-b from-[#7c5cff]/20 via-[#00e0c6]/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-[#7c5cff]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 -left-40 w-[450px] h-[450px] bg-[#00e0c6]/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_80%,transparent_100%)]" />
      </div>

      {/* Main Container with Tight Professional Spacing */}
      <main className="relative z-10 pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
        
        {/* ─── TOP HEADER & BREADCRUMBS BAR ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <motion.nav 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400"
          >
            <a 
              href="/#services" 
              className="inline-flex items-center gap-1.5 hover:text-[#00e0c6] transition-colors py-1 px-3 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#00e0c6]/40"
            >
              <ChevronLeft size={14} />
              <span>Services</span>
            </a>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 font-bold tracking-wide truncate">{service.title}</span>
          </motion.nav>

          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Q3/Q4 Projects
            </span>
          </div>
        </div>

        {/* ─── HERO SECTION: ULTRA STYLISH DUAL PANEL ──────────────────────── */}
        <section className="relative rounded-3xl bg-linear-to-br from-[#0c0f28]/95 via-[#090b1e]/90 to-[#060814]/95 border border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden">
          {/* Animated Neon Top Glow Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#7c5cff] via-[#00e0c6] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Hero Text & Actions */}
            <div className="lg:col-span-7 space-y-5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-[#7c5cff]/20 to-[#00e0c6]/20 border border-[#7c5cff]/30 text-white text-[11px] font-extrabold uppercase tracking-widest shadow-[0_0_20px_rgba(124,92,255,0.25)]"
              >
                <Sparkles size={12} className="text-[#00e0c6]" />
                <span className="text-[#00e0c6] font-bold">
                  {service.badge}
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white"
              >
                {service.title.split(" ").length > 1 ? (
                  <>
                    <span className="text-white">{service.title.split(" ")[0]}</span>{" "}
                    <span className="text-[#00e0c6]">{service.title.split(" ").slice(1).join(" ")}</span>
                  </>
                ) : (
                  <span className="text-white">{service.title}</span>
                )}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl"
              >
                {service.subtitle}
              </motion.p>

              {/* Compact Key Highlights Pills */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"
              >
                {service.pills.map((pill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#7c5cff]/40 text-xs font-bold text-slate-200 transition-colors"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#7c5cff]/20 text-[#00e0c6] shrink-0 border border-[#7c5cff]/30">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="truncate">{pill}</span>
                  </div>
                ))}
              </motion.div>

              {/* Primary Call To Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <a
                  href="/#contact"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-linear-to-r from-[#7c5cff] to-[#00e0c6] hover:from-[#8c6fff] hover:to-[#1fe8d0] text-white font-extrabold text-xs shadow-[0_0_30px_rgba(124,92,255,0.35)] hover:shadow-[0_0_45px_rgba(0,224,198,0.5)] transition-all cursor-pointer overflow-hidden"
                >
                  <span>Start Project Consultation</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/15 hover:border-white/30 text-white font-extrabold text-xs hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
                >
                  <PhoneCall size={14} className="text-[#00e0c6]" />
                  <span>Download Architecture Spec</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Holographic Showcase Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl bg-linear-to-br from-[#121538] via-[#0d0f2b] to-[#080a1d] border border-white/15 p-6 space-y-5 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 h-36 w-36 bg-[#7c5cff]/20 rounded-full blur-2xl pointer-events-none group-hover:bg-[#00e0c6]/20 transition-all duration-500" />

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-tr from-[#7c5cff] to-[#00e0c6] text-white shadow-md shadow-[#7c5cff]/30">
                      <DynamicIcon name={service.whoIsThisFor[0]?.iconName || "Bot"} size={22} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white">{service.title}</h3>
                      <p className="text-[11px] text-[#00e0c6] font-bold">Production Grade Engine</p>
                    </div>
                  </div>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                </div>

                {/* Mini Metric Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Deployment Time</span>
                    <span className="text-sm font-black text-white">2 - 4 Weeks</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Code Ownership</span>
                    <span className="text-sm font-black text-emerald-400">100% IP Handover</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Security Standard</span>
                    <span className="text-sm font-black text-white">SOC2 & ISO Ready</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Scalability</span>
                    <span className="text-sm font-black text-[#00e0c6]">Infinite Cloud</span>
                  </div>
                </div>

                {/* Micro Tech Tags */}
                <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/10">
                  {service.techStack.slice(0, 5).map((t, i) => (
                    <span key={i} className="text-[10px] font-bold text-slate-300 bg-white/[0.06] border border-white/10 px-2.5 py-1 rounded-lg">
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 2. QUICK NAVIGATION TABS (TIGHT & ACCESSIBLE) ───────────────── */}
        <div className="sticky top-20 z-20 flex items-center justify-start sm:justify-center gap-1 overflow-x-auto p-1.5 rounded-2xl bg-[#0c0f28]/80 border border-white/10 backdrop-blur-xl shadow-lg no-scrollbar">
          {[
            { id: "overview", label: "Architecture", icon: Layers3 },
            { id: "features", label: "Capabilities", icon: Zap },
            { id: "process", label: "Pipeline", icon: Workflow },
            { id: "cases", label: "Case Studies", icon: Terminal },
            { id: "faq", label: "FAQs", icon: MessageSquare },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  const el = document.getElementById(`section-${tab.id}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-linear-to-r from-[#7c5cff] to-[#00e0c6] text-white shadow-md shadow-[#7c5cff]/30"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <IconComp size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─── 3. ARCHITECTURE OVERVIEW & TARGET AUDIENCE ───────────────────── */}
        <section id="section-overview" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Solution Architecture */}
          <div className="lg:col-span-6 rounded-2xl bg-linear-to-b from-[#0e112e]/90 to-[#080a1d]/90 border border-white/10 p-5 sm:p-7 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-1 rounded-full bg-[#00e0c6]" />
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Solution <span className="text-[#00e0c6]">Architecture</span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {service.about.p1}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {service.about.p2}
              </p>

              <div className="space-y-2 pt-2">
                {service.about.checkmarks.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="flex h-4 w-4 items-center justify-center rounded-md bg-[#00e0c6]/20 text-[#00e0c6] shrink-0 mt-0.5 border border-[#00e0c6]/30">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span className="text-xs text-slate-200 font-bold leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff]/20 text-[#00e0c6] shrink-0 border border-[#7c5cff]/30">
                <ShieldCheck size={18} />
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Built with automated unit tests, strict type-safety, and fail-safe fallback routes.</p>
            </div>
          </div>

          {/* Right: Who Is This Built For? */}
          <div className="lg:col-span-6 rounded-2xl bg-linear-to-b from-[#0e112e]/90 to-[#080a1d]/90 border border-white/10 p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-1 rounded-full bg-[#7c5cff]" />
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Who Is <span className="text-[#7c5cff]">This Built For?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.whoIsThisFor.map((aud, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#7c5cff]/40 hover:bg-white/[0.05] transition-all space-y-1.5 group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c5cff]/20 text-[#00e0c6] border border-[#7c5cff]/30 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={aud.iconName} size={15} />
                  </div>
                  <h3 className="text-xs font-black text-white">{aud.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{aud.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. DELIVERABLES & KEY CAPABILITIES ───────────────────────────── */}
        <section id="section-features" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: What You'll Receive */}
          <div className="lg:col-span-6 rounded-2xl bg-linear-to-b from-[#0e112e]/90 to-[#080a1d]/90 border border-white/10 p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-1 rounded-full bg-[#00e0c6]" />
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Deliverables <span className="text-[#00e0c6]">& Handover</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.whatYouGet.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#00e0c6]/40 transition-all flex items-start gap-3"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00e0c6]/20 text-[#00e0c6] shrink-0 mt-0.5 border border-[#00e0c6]/30">
                    <DynamicIcon name={item.iconName} size={15} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Key Capabilities */}
          <div className="lg:col-span-6 rounded-2xl bg-linear-to-b from-[#0e112e]/90 to-[#080a1d]/90 border border-white/10 p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-1 rounded-full bg-[#7c5cff]" />
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Key <span className="text-[#7c5cff]">Capabilities</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#7c5cff]/40 hover:bg-white/[0.05] transition-all space-y-1.5 group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c5cff]/20 text-[#00e0c6] border border-[#7c5cff]/30 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={feat.iconName} size={15} />
                  </div>
                  <h3 className="text-xs font-black text-white">{feat.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. EXECUTION PIPELINE (HIGH DENSITY STEPPER) ──────────────────── */}
        <section id="section-process" className="rounded-2xl bg-linear-to-b from-[#0e112e]/90 to-[#080a1d]/90 border border-white/10 p-5 sm:p-7 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Engineering <span className="text-[#00e0c6]">Execution Pipeline</span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">Agile milestone-based roadmap built for total transparency.</p>
            </div>
            <span className="text-xs font-bold text-[#00e0c6] bg-[#00e0c6]/10 border border-[#00e0c6]/20 px-3 py-1 rounded-full w-fit">
              7-Stage Quality Control
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {service.process.map((stepItem, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3 space-y-2 flex flex-col justify-between hover:border-[#7c5cff]/50 hover:bg-white/[0.06] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-linear-to-tr from-[#7c5cff] to-[#00e0c6] text-white font-black text-[11px] shadow-sm">
                    {stepItem.step}
                  </span>
                  {idx < service.process.length - 1 && (
                    <ArrowRight size={12} className="text-slate-600 hidden lg:block group-hover:text-[#00e0c6] transition-colors" />
                  )}
                </div>

                <div>
                  <h3 className="text-xs font-black text-white">{stepItem.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                    {stepItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 6. TECH STACK & WHY LARAWANS ─────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tech Ecosystem */}
          <div className="lg:col-span-6 rounded-2xl bg-linear-to-b from-[#0e112e]/90 to-[#080a1d]/90 border border-white/10 p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-1 rounded-full bg-[#00e0c6]" />
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Tech <span className="text-[#00e0c6]">Ecosystem</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {service.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-bold text-slate-200 hover:border-[#00e0c6]/40 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#00e0c6]/20 text-[#00e0c6] shrink-0 border border-[#00e0c6]/30">
                    <DynamicIcon name={tech.iconName} size={13} />
                  </div>
                  <span className="truncate">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Partner With Us */}
          <div className="lg:col-span-6 rounded-2xl bg-linear-to-b from-[#0e112e]/90 to-[#080a1d]/90 border border-white/10 p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-1 rounded-full bg-[#7c5cff]" />
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Why Choose <span className="text-[#7c5cff]">Larawans Digital</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.whyChooseUs.map((val, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#7c5cff]/40 hover:bg-white/[0.05] transition-all space-y-1.5 group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c5cff]/20 text-[#00e0c6] border border-[#7c5cff]/30">
                    <DynamicIcon name={val.iconName} size={15} />
                  </div>
                  <h3 className="text-xs font-black text-white">{val.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 7. RECENT CASE STUDIES ────────────────────────────────────────── */}
        <section id="section-cases" className="rounded-2xl bg-linear-to-b from-[#0e112e]/90 to-[#080a1d]/90 border border-white/10 p-5 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Recent <span className="text-[#00e0c6]">Case Studies</span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">Production platforms engineered for global clients.</p>
            </div>

            <a
              href="/#portfolio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 hover:border-white/30 text-white text-xs font-bold transition-all"
            >
              <span>View All</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.projects.map((proj, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:bg-white/[0.05] hover:border-[#7c5cff]/40 transition-all flex flex-col justify-between group"
              >
                <div className={`h-24 w-full bg-linear-to-br ${proj.gradient} p-3 flex flex-col justify-end text-white relative`}>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-black/50 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded w-fit">
                    Case Study
                  </span>
                </div>

                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-black text-white group-hover:text-[#00e0c6] transition-colors">{proj.title}</h3>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{proj.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-bold text-[#00e0c6] bg-[#00e0c6]/10 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 8. FAQS & CONVERSION LAUNCHPAD ────────────────────────────────── */}
        <section id="section-faq" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* FAQ Accordion */}
          <div className="lg:col-span-7 rounded-2xl bg-linear-to-b from-[#0e112e]/90 to-[#080a1d]/90 border border-white/10 p-5 sm:p-7 shadow-xl space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Frequently <span className="text-[#00e0c6]">Asked Questions</span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">Clear answers regarding contracts, code ownership & support.</p>
            </div>

            <div className="space-y-2.5">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className={`rounded-xl border transition-all cursor-pointer overflow-hidden ${
                      isOpen
                        ? "border-[#7c5cff] bg-[#7c5cff]/10"
                        : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="p-3.5 flex items-center justify-between gap-3">
                      <h3 className="text-xs font-black text-white leading-snug">{faq.q}</h3>
                      <div className={`flex h-5 w-5 items-center justify-center rounded text-xs shrink-0 ${isOpen ? "bg-[#7c5cff] text-white" : "bg-white/10 text-slate-400"}`}>
                        {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-3.5 pb-3 text-xs text-slate-300 border-t border-white/10 pt-2 leading-relaxed"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High Conversion CTA Box */}
          <div className="lg:col-span-5 rounded-2xl bg-linear-to-br from-[#121538] via-[#0d0f2b] to-[#080a1d] border border-white/15 p-5 sm:p-7 text-white space-y-5 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="space-y-3 relative z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-[#7c5cff] to-[#00e0c6] text-white shadow-md">
                <Calendar size={20} />
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
                {service.ctaTitle}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {service.ctaSubtitle}
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="/#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-linear-to-r from-[#7c5cff] to-[#00e0c6] hover:from-[#8c6fff] hover:to-[#1fe8d0] text-white text-xs font-black shadow-lg shadow-[#7c5cff]/30 transition-all cursor-pointer"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight size={15} />
                </a>

                <a
                  href="/#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/15 hover:bg-white/10 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <PhoneCall size={14} className="text-[#00e0c6]" />
                  <span>Get Custom Quote</span>
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold text-slate-400 relative z-10">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-[#00e0c6]" /> No Obligation
              </span>
              <span className="flex items-center gap-1">
                <Zap size={11} className="text-amber-400" /> Fast Response
              </span>
              <span className="flex items-center gap-1">
                <Shield size={11} className="text-[#7c5cff]" /> NDA Guaranteed
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
