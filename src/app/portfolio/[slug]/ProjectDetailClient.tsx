"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Globe,
  MapPin,
  Shield,
  Zap,
  Cpu,
  BarChart,
  Users,
  Database,
  Sparkles,
  Lock,
  UserCheck,
  FileCheck,
  CloudCog,
  ShieldCheck,
  Check,
  Heart,
  FlaskConical,
  Pill,
  CreditCard,
  Link,
  RefreshCw,
  Layers,
  Building2,
  Stethoscope,
  Microscope,
  Syringe,
  Receipt,
  UserCog,
  Settings,
  Eye,
  Search,
  PenTool,
  Code2,
  Rocket,
  Monitor,
  Server,
  Infinity,
  Mic,
  BedDouble,
  Menu,
  X,
} from "lucide-react";
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
  SiDocker,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiRedux,
} from "react-icons/si";
import { projects, type Project } from "@/lib/site-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { ProjectSimulator } from "@/components/project-simulator";
import { MagneticButton } from "@/components/magnetic-button";

const ICON_MAP: Record<string, any> = {
  Shield,
  Zap,
  Cpu,
  BarChart,
  Users,
  Database,
};

const TECH_ICON_MAP: Record<string, any> = {
  Laravel: SiLaravel,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Next.js 15": SiNextdotjs,
  Flutter: SiFlutter,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  ".NET": SiDotnet,
  Firebase: SiFirebase,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  Stripe: SiStripe,
};

const MOBILE_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "AI Solutions", href: "/#ai-solutions" },
  { label: "Process", href: "/#process" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Tech Stack", href: "/#tech-stack" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function ProjectDetailClient({ project }: { project: Project }) {
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Remove dark class from <html> for light-themed page
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark');
    document.body.style.backgroundColor = '#ffffff';
    return () => {
      html.classList.add('dark');
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      {/* ── MOBILE HAMBURGER BUTTON (light theme) ── */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-4 right-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-lg sm:hidden"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" style={{ color: '#4F46E5' }} />
      </button>

      {/* ── MOBILE ANIMATED MENU PANEL ── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm sm:hidden"
            onClick={() => setMobileMenuOpen(false)}
            style={{ animation: 'fadeIn 0.3s ease forwards' }}
          />
          {/* Slide-in Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 z-[80] w-[280px] bg-white shadow-2xl flex flex-col sm:hidden"
            style={{ animation: 'slideInRight 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <a href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'linear-gradient(135deg, #7c5cff, #00e0c6)' }}>
                  <span className="text-white font-extrabold text-sm">L</span>
                </div>
                <span className="font-display text-sm font-bold text-gray-900">Larawans<span style={{ color: '#00e0c6' }}>.</span></span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                aria-label="Close menu"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-3 px-3">
              {MOBILE_NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200"
                  style={{
                    color: '#334155',
                    animation: `fadeSlideUp 0.35s ${0.05 + i * 0.04}s cubic-bezier(0.22, 1, 0.36, 1) both`,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#F5F3FF'; (e.currentTarget as HTMLElement).style.color = '#4F46E5'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#334155'; }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#C4B5FD' }} />
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100" style={{ color: '#A78BFA' }} />
                </a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="px-5 py-4 border-t border-gray-100">
              <a
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl py-3 text-[14px] font-bold text-white"
                style={{ background: 'linear-gradient(to right, #6366F1, #A855F7)' }}
              >
                <Sparkles className="h-4 w-4" />
                Book Consultation
              </a>
            </div>
          </div>

          {/* Keyframe animations */}
          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
            @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
          `}</style>
        </>
      )}

      <main className="relative pt-16 pb-12">
        {/* Background decorative blob - bottom right */}
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(ellipse at center, #EDE9FE 0%, #EDE9FE 40%, transparent 70%)" }} aria-hidden />
        {/* Subtle top-left blob */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full opacity-40" style={{ background: "radial-gradient(circle, #EEF2FF 0%, transparent 70%)" }} aria-hidden />

        {/* ── Breadcrumb & Back Navigation ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-2">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-gray-100 pb-3">
            <a
              href="/#portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 sm:text-gray-500 sm:hover:text-indigo-600"
              style={{ color: '#6366F1' }}
            >
              <ArrowLeft className="h-3.5 w-3.5 text-indigo-600" />
              <span>Back to All Work</span>
            </a>

            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
              <a href="/" className="hover:text-indigo-600 transition-colors">
                Home
              </a>
              <span>/</span>
              <a href="/#portfolio" className="hover:text-indigo-600 transition-colors">
                Portfolio
              </a>
              <span>/</span>
              <span className="font-semibold text-indigo-600 truncate max-w-[180px] sm:max-w-none">
                {project.title}
              </span>
            </div>
          </div>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Header info */}
            <div className="lg:col-span-5 space-y-4">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span>{project.category}</span>
              </div>

              {/* Title & Tagline */}
              <h1
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]"
                style={{
                  backgroundImage: "linear-gradient(to right, #0f172a, #1e293b, #4f46e5)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {project.title}
              </h1>

              <p className="text-[13px] sm:text-base sm:text-lg text-slate-500 leading-relaxed font-normal">
                {project.description}
              </p>

              {/* Meta information chips */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                <div className="rounded-xl border border-gray-100 sm:bg-gray-50 p-2 sm:p-3" style={{ background: '#F8FAFC' }}>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    <Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-indigo-600" />
                    <span>Client</span>
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-bold text-gray-900 truncate">{project.client}</div>
                </div>

                <div className="rounded-xl border border-gray-100 sm:bg-gray-50 p-2 sm:p-3" style={{ background: '#F8FAFC' }}>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-indigo-600" />
                    <span>Timeline</span>
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-bold text-gray-900">{project.duration}</div>
                </div>

                <div className="rounded-xl border border-gray-100 sm:bg-gray-50 p-2 sm:p-3" style={{ background: '#F8FAFC' }}>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-indigo-600" />
                    <span>Location</span>
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-bold text-gray-900 truncate">{project.location}</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-indigo-50 text-indigo-700 rounded-lg px-3 py-1 text-xs font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right KPI Impact Cards */}
            <div className="lg:col-span-7">
              <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 sm:grid sm:grid-cols-3 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide">
                {project.impactMetrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 group min-w-[200px] sm:min-w-0 snap-start flex-shrink-0 sm:flex-shrink"
                  >
                    <div className="text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-wider text-gray-400">
                      {m.label}
                    </div>
                    <div
                      className="mt-1.5 sm:mt-2 font-display text-xl sm:text-3xl font-extrabold"
                      style={{
                        backgroundImage: "linear-gradient(to right, #4f46e5, #6366f1)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {m.value}
                    </div>
                    <div className="mt-2 sm:mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[10.5px] font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      <span>{m.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── INTERACTIVE SIMULATOR PREVIEW SECTION ── */}
          <div className="mt-8">
            <div className="mb-4 text-center sm:text-left">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
                Project Interface Simulator
              </h2>
              <p className="mt-1 text-sm text-slate-500 sm:block hidden">
                Experience the live interface behavior in real-time across both Desktop Console and Mobile device views.
              </p>
            </div>

            <ProjectSimulator project={project} />
          </div>
        </section>

        {/* ── PROJECT OVERVIEW & STORY SECTION ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Overview Story */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Case Study Overview
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                Engineering a Resilient Solution for {project.client}
              </h2>
              <p className="text-base text-slate-500 leading-relaxed font-normal">
                {project.overview}
              </p>

              {/* Challenges & Solutions */}
              <div className="space-y-4 pt-4">
                <h3 className="font-display text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  Key Challenges & Architecture Solutions
                </h3>

                <div className="space-y-3">
                  {project.challengesAndSolutions.map((cs, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2"
                    >
                      <div className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <span>Challenge: {cs.challenge}</span>
                      </div>
                      <div className="text-xs text-slate-500 pl-3.5 border-l border-emerald-200">
                        <span className="font-semibold text-emerald-600">Solution: </span>
                        {cs.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Workflow Pipeline */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Execution Workflow
              </span>
              <h2 className="font-display text-2xl font-bold text-gray-900">
                4-Step Technical Architecture
              </h2>

              {/* Desktop: vertical cards with light bg */}
              <div className="hidden lg:block space-y-4 rounded-2xl p-4 sm:p-5" style={{ background: '#EEF2FF' }}>
                {project.workflowSteps.map((wf) => (
                  <div
                    key={wf.step}
                    className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 hover:border-indigo-200 hover:shadow-sm transition-colors"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white shadow-md"
                      style={{ background: "linear-gradient(to top right, #4f46e5, #8B5CF6)" }}
                    >
                      {wf.step}
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-bold text-gray-900">{wf.title}</h4>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{wf.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: 2x2 grid tabs with light bg */}
              <div className="grid grid-cols-2 gap-2 rounded-2xl p-3 lg:hidden" style={{ background: '#EEF2FF' }}>
                {project.workflowSteps.map((wf) => (
                  <div
                    key={wf.step}
                    className="flex flex-col items-center text-center rounded-xl border border-gray-100 bg-white p-3"
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white shadow-sm"
                      style={{ background: "linear-gradient(to top right, #4f46e5, #8B5CF6)" }}
                    >
                      {wf.step}
                    </span>
                    <h4 className="mt-1.5 font-display text-[11px] font-bold text-gray-900 leading-tight">{wf.title}</h4>
                    <p className="mt-1 text-[9px] text-slate-500 leading-tight line-clamp-3">{wf.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── KEY FEATURES GRID ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 border-t border-gray-100">
          {/* Section Header */}
          <div className="text-center max-w-[700px] mx-auto">
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.08em]" style={{ background: '#F3E8FF', color: '#7C3AED' }}>
              <Sparkles className="h-3.5 w-3.5" />
              <span>Capabilities</span>
            </div>
            {/* Heading with partial gradient */}
            <h2 className="mt-4 font-display text-[1.75rem] sm:text-[3rem] font-extrabold leading-[1.1] tracking-tight">
              <span style={{ color: '#1E293B' }}>Core Platform </span>
              <span style={{ backgroundImage: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Features</span>
            </h2>
            {/* Description */}
            <p className="mt-4 text-[15px] sm:text-[17px] leading-[1.6]" style={{ color: '#64748B' }}>
              A comprehensive suite of features designed to streamline hospital operations, enhance patient care, and improve overall efficiency.
            </p>
            {/* Decorative Underline */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="block h-1 w-20 rounded-full" style={{ background: '#7C3AED' }} />
              <span className="block h-2 w-2 rounded-full" style={{ background: '#7C3AED' }} />
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {project.keyFeatures.map((feat, i) => {
              const featureIcons: Record<string, any> = {
                Shield: <Shield className="h-7 w-7" />,
                Cpu: <Mic className="h-7 w-7" />,
                Users: <BedDouble className="h-7 w-7" />,
                Zap: <FlaskConical className="h-7 w-7" />,
                BarChart: <BarChart className="h-7 w-7" />,
              };
              const IconEl = featureIcons[feat.iconName] || <Zap className="h-7 w-7" />;
              const badges = ['HL7 FHIR Ready', 'AI Powered', 'Real-time Sync', 'Automated Sync'];
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 sm:p-7 relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 20px -4px rgba(124, 58, 237, 0.08)' }}
                >
                  {/* Number Badge - top right */}
                  <span className="absolute top-5 right-5 text-[13px] font-bold" style={{ color: '#C4B5FD' }}>0{i + 1}</span>
                  {/* Icon Circle */}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full mb-5"
                    style={{ background: '#F5F3FF', color: '#7C3AED' }}
                  >
                    {IconEl}
                  </div>
                  {/* Title */}
                  <h3 className="text-[17px] sm:text-[18px] font-bold leading-tight" style={{ color: '#1E293B' }}>{feat.title}</h3>
                  {/* Purple underline */}
                  <div className="mt-3 mb-4 h-1 w-10 rounded-full" style={{ background: '#7C3AED' }} />
                  {/* Description */}
                  <p className="text-[13px] sm:text-[13.5px] leading-[1.7]" style={{ color: '#64748B' }}>
                    {feat.description}
                  </p>
                  {/* Bottom Badge */}
                  <div className="mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{badges[i] || 'Featured'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Benefits Bar */}
          <div className="mt-10 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8" style={{ background: '#FAF5FF' }}>
            {[
              { icon: <Rocket className="h-5 w-5" />, title: 'Built for Scale', desc: 'Designed to scale with growing hospital networks.' },
              { icon: <ShieldCheck className="h-5 w-5" />, title: 'Secure & Reliable', desc: 'Enterprise-grade security with 99.8% system uptime.' },
              { icon: <BarChart className="h-5 w-5" />, title: 'Operational Efficiency', desc: 'Automate workflows and reduce manual tasks significantly.' },
              { icon: <Users className="h-5 w-5" />, title: 'Better Patient Care', desc: 'Empowering healthcare teams to deliver exceptional care.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[14px] sm:text-[15px] font-bold" style={{ color: '#1E293B' }}>{item.title}</h4>
                  <p className="mt-1 text-[12px] sm:text-[13px] leading-[1.6]" style={{ color: '#64748B' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECURITY & COMPLIANCE ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 my-6 rounded-3xl bg-white" style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.10), 0 1px 8px rgba(0,0,0,0.06)' }}>
          {/* Section Header */}
          <div className="text-center max-w-[650px] mx-auto">
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ background: '#EDE9FE', color: '#4F46E5' }}>
              <Shield className="h-3.5 w-3.5" />
              <span>Security & Compliance</span>
            </div>
            {/* Heading */}
            <h2 className="mt-4 font-display text-[2.5rem] sm:text-[3rem] font-extrabold leading-[1.1] tracking-tight" style={{ color: '#111827' }}>
              Security & Compliance
            </h2>
            {/* Description */}
            <p className="mt-4 text-[17px] leading-[1.6]" style={{ color: '#6B7280' }}>
              {project.title} is built with enterprise-grade security and follows global compliance standards to protect sensitive business and user data.
            </p>
            {/* Decorative Underline */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="block h-1 w-14 rounded-full" style={{ background: '#6366F1' }} />
              <span className="block h-2 w-2 rounded-full" style={{ background: '#6366F1' }} />
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="h-8 w-8" />, title: 'HIPAA Compliant', desc: 'Fully compliant with HIPAA standards to ensure the privacy and security of patient data.' },
              { icon: <UserCheck className="h-8 w-8" />, title: 'Role-Based Access', desc: 'Granular role-based access control ensures users only access the data and features they need.' },
              { icon: <Lock className="h-8 w-8" />, title: 'Data Encryption', desc: 'End-to-end encryption for data in transit and at rest using industry-standard encryption protocols.' },
              { icon: <FileCheck className="h-8 w-8" />, title: 'Audit Logs', desc: 'Comprehensive audit logs track all system activities to ensure transparency and accountability.' },
              { icon: <CloudCog className="h-8 w-8" />, title: 'Backup & Recovery', desc: 'Automated backups and disaster recovery ensure business continuity and zero data loss.' },
              { icon: <ShieldCheck className="h-8 w-8" />, title: 'Secure Infrastructure', desc: 'Hosted on secure, certified infrastructure with 24/7 monitoring and advanced threat protection.' },
            ].map((card, i) => (
              <div
                key={i}
                className="flex items-start gap-5 rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_6px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300"
                style={{ border: '1px solid #F3F4F6', background: '#F5F3FF' }}
              >
                {/* Icon Circle */}
                <div className="relative shrink-0">
                  <div
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
                    style={{ background: '#EEF2FF', color: '#4F46E5' }}
                  >
                    {card.icon}
                  </div>
                  {/* Verification Badge */}
                  <div
                    className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full text-white"
                    style={{ background: '#6366F1' }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                </div>
                {/* Text */}
                <div className="pt-1">
                  <h3 className="text-[18px] font-bold" style={{ color: '#111827' }}>{card.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.6]" style={{ color: '#6B7280' }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Certification Banner */}
          <div
            className="mt-10 flex flex-col md:flex-row items-center gap-8 rounded-2xl p-8 sm:p-10"
            style={{ background: '#FAF5FF' }}
          >
            {/* Shield Illustration */}
            <div className="relative shrink-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
                <ShieldCheck className="h-12 w-12 text-white" />
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-2 -left-2 h-3 w-3 rounded-full" style={{ background: '#C4B5FD' }} />
              <div className="absolute -bottom-1 -right-3 h-2 w-2 rounded-full" style={{ background: '#DDD6FE' }} />
              <div className="absolute top-0 -right-4 h-2.5 w-2.5 rounded-full" style={{ background: '#A78BFA' }} />
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-[22px] font-bold" style={{ color: '#111827' }}>
                Your Data is Always Protected
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] max-w-[450px]" style={{ color: '#4B5563' }}>
                We follow best practices and industry standards to deliver a secure, reliable, and compliant platform for your business.
              </p>
            </div>

            {/* Certification Badges */}
            <div className="flex flex-wrap items-center justify-center gap-5 shrink-0">
              {[
                { label: 'HIPAA', sub: 'COMPLIANT', color: '#2563EB' },
                { label: 'ISO', sub: '27001', color: '#1E40AF' },
                { label: 'SOC 2', sub: 'TYPE II', color: '#3B82F6' },
                { label: 'GDPR', sub: 'READY', color: '#4F46E5' },
              ].map((cert) => (
                <div key={cert.label} className="flex flex-col items-center gap-1">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-[11px] font-bold text-white"
                    style={{ borderColor: cert.color, background: cert.color }}
                  >
                    {cert.label}
                  </div>
                  <span className="text-[9px] font-bold tracking-wider" style={{ color: '#6B7280' }}>{cert.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH STACK BREAKDOWN ── */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20 border-t border-gray-100">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: '#EEF2FF', border: '1px solid #E0E7FF' }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold shadow-md" style={{ background: '#4F46E5' }}>
                <Code2 className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#4338CA' }}>Technology Stack</span>
            </div>

            {/* Main Title */}
            <h2 className="mt-5 font-display text-[2rem] sm:text-[3rem] md:text-[3.5rem] font-extrabold tracking-tight leading-tight">
              <span style={{ color: '#1E293B' }}>Frameworks & </span>
              <span style={{ backgroundImage: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Infrastructure</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium" style={{ color: '#64748B' }}>
              A modern, secure and scalable technology stack built to handle enterprise-level hospital operations with ease.
            </p>

            {/* Decorative Underline */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <div className="h-1.5 w-24 rounded-full" style={{ background: 'linear-gradient(to right, #6366F1, #A855F7)' }} />
              <div className="h-2 w-2 rounded-full" style={{ background: '#9333EA' }} />
            </div>
          </div>

          {/* Cards Grid: 2-column on lg+, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

            {/* ── LEFT CARD: Frontend ── */}
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{
                boxShadow: '0 10px 40px -10px rgba(99, 102, 241, 0.15)',
                borderBottom: '4px solid #6366F1',
              }}
            >
              {/* Card Header */}
              <div className="flex items-start gap-4 sm:gap-5 mb-6 sm:mb-8">
                {/* Icon Container */}
                <div
                  className="flex-shrink-0 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl"
                  style={{ background: '#EEF2FF', color: '#4F46E5' }}
                >
                  <Monitor className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#0F172A' }}>Frontend</h3>
                  <p className="mt-1 text-[13px] sm:text-[15px] font-medium leading-relaxed" style={{ color: '#64748B' }}>
                    Modern, responsive and intuitive interfaces for seamless user experience.
                  </p>
                </div>
              </div>

              {/* Tech Items List */}
              <div className="space-y-3 sm:space-y-4">
                {/* Next.js 15 */}
                <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl transition-all duration-200 hover:translate-x-0.5">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full" style={{ background: '#000000' }}>
                    <span className="text-white font-bold text-base sm:text-lg">N</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] sm:text-base" style={{ color: '#0F172A' }}>Next.js 15</h4>
                    <p className="text-[12px] sm:text-sm font-medium" style={{ color: '#64748B' }}>React Framework</p>
                  </div>
                </div>

                {/* Tailwind CSS */}
                <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl transition-colors duration-200 hover:translate-x-0.5">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full" style={{ background: '#ECFEFF' }}>
                    <SiTailwindcss className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: '#06B6D4' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] sm:text-base" style={{ color: '#0F172A' }}>Tailwind CSS</h4>
                    <p className="text-[12px] sm:text-sm font-medium" style={{ color: '#64748B' }}>Utility-first CSS Framework</p>
                  </div>
                </div>

                {/* TypeScript */}
                <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl transition-colors duration-200 hover:translate-x-0.5">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full" style={{ background: '#2563EB' }}>
                    <span className="text-white font-bold text-sm sm:text-base">TS</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] sm:text-base" style={{ color: '#0F172A' }}>TypeScript</h4>
                    <p className="text-[12px] sm:text-sm font-medium" style={{ color: '#64748B' }}>Typed JavaScript</p>
                  </div>
                </div>

                {/* Redux Toolkit */}
                <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl transition-colors duration-200 hover:translate-x-0.5">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full" style={{ background: '#F3E8FF' }}>
                    <Infinity className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#7C3AED' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] sm:text-base" style={{ color: '#0F172A' }}>Redux Toolkit</h4>
                    <p className="text-[12px] sm:text-sm font-medium" style={{ color: '#64748B' }}>State Management</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT CARD: Backend & Infrastructure ── */}
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{
                boxShadow: '0 10px 40px -10px rgba(99, 102, 241, 0.15)',
                borderBottom: '4px solid #A855F7',
              }}
            >
              {/* Card Header */}
              <div className="flex items-start gap-4 sm:gap-5 mb-6 sm:mb-8">
                {/* Icon Container */}
                <div
                  className="flex-shrink-0 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl"
                  style={{ background: '#FAF5FF', color: '#9333EA' }}
                >
                  <Server className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#0F172A' }}>Backend & Infrastructure</h3>
                  <p className="mt-1 text-[13px] sm:text-[15px] font-medium leading-relaxed" style={{ color: '#64748B' }}>
                    Robust backend and cloud infrastructure ensuring performance and reliability.
                  </p>
                </div>
              </div>

              {/* Tech Items List */}
              <div className="space-y-3 sm:space-y-4">
                {/* .NET 8 Web API */}
                <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl transition-colors duration-200 hover:translate-x-0.5">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full" style={{ background: '#7C3AED' }}>
                    <span className="text-white font-bold text-[10px] sm:text-xs">.NET</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] sm:text-base" style={{ color: '#0F172A' }}>.NET 8 Web API</h4>
                    <p className="text-[12px] sm:text-sm font-medium" style={{ color: '#64748B' }}>RESTful API Framework</p>
                  </div>
                </div>

                {/* Azure SQL Database */}
                <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl transition-colors duration-200 hover:translate-x-0.5">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full" style={{ background: '#FEF2F2' }}>
                    <Database className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#EF4444' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] sm:text-base" style={{ color: '#0F172A' }}>Azure SQL Database</h4>
                    <p className="text-[12px] sm:text-sm font-medium" style={{ color: '#64748B' }}>Managed Cloud Database</p>
                  </div>
                </div>

                {/* Microsoft Azure */}
                <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl transition-colors duration-200 hover:translate-x-0.5">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full" style={{ background: '#EFF6FF' }}>
                    <CloudCog className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#2563EB' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] sm:text-base" style={{ color: '#0F172A' }}>Microsoft Azure</h4>
                    <p className="text-[12px] sm:text-sm font-medium" style={{ color: '#64748B' }}>Cloud Hosting & Services</p>
                  </div>
                </div>

                {/* Docker */}
                <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl transition-colors duration-200 hover:translate-x-0.5">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full" style={{ background: '#EFF6FF' }}>
                    <SiDocker className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: '#2563EB' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] sm:text-base" style={{ color: '#0F172A' }}>Docker</h4>
                    <p className="text-[12px] sm:text-sm font-medium" style={{ color: '#64748B' }}>Containerization</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── INTEGRATIONS & CONNECTED SYSTEMS ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 border-t border-gray-100">
          {/* Section Header */}
          <div className="text-center max-w-[700px] mx-auto">
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ background: '#EDE9FE', color: '#4F46E5' }}>
              <Link className="h-3.5 w-3.5" />
              <span>Integrations</span>
            </div>
            {/* Heading with partial gradient */}
            <h2 className="mt-4 font-display text-[1.75rem] sm:text-[2.5rem] font-extrabold leading-[1.15] tracking-tight">
              <span style={{ color: '#111827' }}>Integrations &amp; </span>
              <span style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #818CF8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Connected Systems</span>
            </h2>
            {/* Description */}
            <p className="mt-4 text-[15px] sm:text-[17px] leading-[1.6]" style={{ color: '#6B7280' }}>
              {project.title} seamlessly integrates with all critical systems to streamline workflows and improve operational efficiency.
            </p>
            {/* Decorative Underline */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="block h-1 w-14 rounded-full" style={{ background: '#6366F1' }} />
              <span className="block h-2 w-2 rounded-full" style={{ background: '#6366F1' }} />
            </div>
          </div>

          {/* Integration Cards + Central Hub Layout */}
          <div className="mt-14 relative">
            {/* Desktop: 3-col grid with center hub | Mobile: single column */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-y-8 gap-x-6 xl:gap-x-10 items-start">

              {/* ── LEFT COLUMN (3 cards) ── */}
              <div className="flex flex-col gap-6">
                {[
                  {
                    icon: <Heart className="h-6 w-6" style={{ color: '#1D4ED8' }} />,
                    iconBg: '#DBEAFE',
                    title: 'EMR / EHR Systems',
                    desc: 'Seamless patient data synchronization with existing EMR/EHR platforms.',
                    tag: 'Real-time Sync',
                    tagBg: '#DBEAFE',
                    tagColor: '#1D4ED8',
                    dotColor: '#3B82F6',
                  },
                  {
                    icon: <FlaskConical className="h-6 w-6" style={{ color: '#047857' }} />,
                    iconBg: '#D1FAE5',
                    title: 'Laboratory Systems',
                    desc: 'Bi-directional integration with lab systems for test orders & results.',
                    tag: 'HL7 / FHIR Ready',
                    tagBg: '#D1FAE5',
                    tagColor: '#047857',
                    dotColor: '#10B981',
                  },
                  {
                    icon: <ShieldCheck className="h-6 w-6" style={{ color: '#7E22CE' }} />,
                    iconBg: '#F3E8FF',
                    title: 'Insurance & TPAs',
                    desc: 'Verify insurance, manage claims and approvals in real-time.',
                    tag: 'Secure API Integration',
                    tagBg: '#F3E8FF',
                    tagColor: '#7E22CE',
                    dotColor: '#8B5CF6',
                  },
                ].map((card, i) => (
                  <div
                    key={`l-${i}`}
                    className="flex items-start gap-4 rounded-2xl bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05), 0 4px 6px -1px rgba(0,0,0,0.05)',
                    }}
                  >
                    {/* Icon Box */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: card.iconBg }}
                    >
                      {card.icon}
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[16px] sm:text-[17px] font-bold" style={{ color: '#1E293B' }}>{card.title}</h3>
                      <p className="mt-1.5 text-[13px] sm:text-[14px] leading-[1.55]" style={{ color: '#64748B' }}>{card.desc}</p>
                      {/* Tag Pill */}
                      <span
                        className="mt-3 inline-block rounded-full px-3 py-1 text-[11px] font-semibold"
                        style={{ background: card.tagBg, color: card.tagColor }}
                      >
                        {card.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── CENTER HUB (desktop only) ── */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative">
                  {/* Connecting dotted lines - left side */}
                  <svg className="absolute top-1/2 right-full w-[40px] xl:w-[56px] h-[2px] -translate-y-[70%]" style={{ overflow: 'visible' }}>
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6,4" />
                    <circle cx="0" cy="0" r="4" fill="#3B82F6" />
                  </svg>
                  <svg className="absolute top-1/2 right-full w-[40px] xl:w-[56px] h-[2px] -translate-y-[6%]" style={{ overflow: 'visible' }}>
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6,4" />
                    <circle cx="0" cy="0" r="4" fill="#10B981" />
                  </svg>
                  <svg className="absolute top-1/2 right-full w-[40px] xl:w-[56px] h-[2px] translate-y-[58%]" style={{ overflow: 'visible' }}>
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6,4" />
                    <circle cx="0" cy="0" r="4" fill="#8B5CF6" />
                  </svg>
                  {/* Connecting dotted lines - right side */}
                  <svg className="absolute top-1/2 left-full w-[40px] xl:w-[56px] h-[2px] -translate-y-[70%]" style={{ overflow: 'visible' }}>
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6,4" />
                    <circle cx="100%" cy="0" r="4" fill="#F97316" />
                  </svg>
                  <svg className="absolute top-1/2 left-full w-[40px] xl:w-[56px] h-[2px] -translate-y-[6%]" style={{ overflow: 'visible' }}>
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6,4" />
                    <circle cx="100%" cy="0" r="4" fill="#6366F1" />
                  </svg>
                  <svg className="absolute top-1/2 left-full w-[40px] xl:w-[56px] h-[2px] translate-y-[58%]" style={{ overflow: 'visible' }}>
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6,4" />
                    <circle cx="100%" cy="0" r="4" fill="#EAB308" />
                  </svg>

                  {/* Hub Circle */}
                  <div
                    className="flex flex-col items-center justify-center w-[240px] xl:w-[280px] h-[240px] xl:h-[280px] rounded-full"
                    style={{ background: '#EEF2FF', border: '2px solid #C7D2FE' }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl mb-3" style={{ background: '#EDE9FE', color: '#6366F1' }}>
                      <Building2 className="h-7 w-7" />
                    </div>
                    <span className="text-[15px] sm:text-[16px] font-bold text-center px-4" style={{ color: '#1E293B' }}>
                      {project.title}
                    </span>
                    <span
                      className="mt-2.5 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide"
                      style={{ background: '#6366F1', color: '#FFFFFF' }}
                    >
                      Centralized &bull; Secure &bull; Connected
                    </span>
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN (3 cards) ── */}
              <div className="flex flex-col gap-6">
                {[
                  {
                    icon: <Pill className="h-6 w-6" style={{ color: '#C2410C' }} />,
                    iconBg: '#FFEDD5',
                    title: 'Pharmacy Management',
                    desc: 'Real-time inventory, prescriptions and drug interaction checks.',
                    tag: 'Auto Sync',
                    tagBg: '#FFEDD5',
                    tagColor: '#C2410C',
                  },
                  {
                    icon: <CreditCard className="h-6 w-6" style={{ color: '#6D28D9' }} />,
                    iconBg: '#EDE9FE',
                    title: 'Billing & Payments',
                    desc: 'Integrated billing, invoicing and multiple payment gateways.',
                    tag: '100% Reconciled',
                    tagBg: '#EDE9FE',
                    tagColor: '#6D28D9',
                  },
                  {
                    icon: <BarChart className="h-6 w-6" style={{ color: '#A16207' }} />,
                    iconBg: '#FEF9C3',
                    title: 'Reporting & Analytics',
                    desc: 'Unified data analytics and reporting across all departments.',
                    tag: 'Real-time Insights',
                    tagBg: '#FEF9C3',
                    tagColor: '#A16207',
                  },
                ].map((card, i) => (
                  <div
                    key={`r-${i}`}
                    className="flex items-start gap-4 rounded-2xl bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05), 0 4px 6px -1px rgba(0,0,0,0.05)',
                    }}
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: card.iconBg }}
                    >
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[16px] sm:text-[17px] font-bold" style={{ color: '#1E293B' }}>{card.title}</h3>
                      <p className="mt-1.5 text-[13px] sm:text-[14px] leading-[1.55]" style={{ color: '#64748B' }}>{card.desc}</p>
                      <span
                        className="mt-3 inline-block rounded-full px-3 py-1 text-[11px] font-semibold"
                        style={{ background: card.tagBg, color: card.tagColor }}
                      >
                        {card.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile-only center hub (shown below cards on mobile) */}
            <div className="mt-8 flex lg:hidden justify-center">
              <div
                className="flex flex-col items-center justify-center w-[200px] h-[200px] rounded-full"
                style={{ background: '#EEF2FF', border: '2px solid #C7D2FE' }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-2" style={{ background: '#EDE9FE', color: '#6366F1' }}>
                  <Building2 className="h-6 w-6" />
                </div>
                <span className="text-[14px] font-bold text-center px-4" style={{ color: '#1E293B' }}>
                  {project.title}
                </span>
                <span
                  className="mt-2 rounded-full px-3 py-1 text-[9px] font-semibold tracking-wide"
                  style={{ background: '#6366F1', color: '#FFFFFF' }}
                >
                  Centralized &bull; Secure &bull; Connected
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Feature Bar */}
          <div
            className="mt-12 rounded-2xl p-6 sm:p-8"
            style={{ background: '#F8FAFC' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  icon: <Link className="h-5 w-5" style={{ color: '#3B82F6' }} />,
                  title: 'Seamless Connectivity',
                  desc: 'Connect and sync data across all hospital systems effortlessly.',
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" style={{ color: '#10B981' }} />,
                  title: 'Standard Protocols',
                  desc: 'Supports HL7, FHIR and other industry-standard protocols.',
                },
                {
                  icon: <Lock className="h-5 w-5" style={{ color: '#6366F1' }} />,
                  title: 'Secure Data Exchange',
                  desc: 'Encrypted, secure and compliant data exchange between systems.',
                },
                {
                  icon: <RefreshCw className="h-5 w-5" style={{ color: '#F97316' }} />,
                  title: 'Real-time Sync',
                  desc: 'Real-time data synchronization to ensure accuracy and timely updates.',
                },
                {
                  icon: <Layers className="h-5 w-5" style={{ color: '#3B82F6' }} />,
                  title: 'Scalable Integrations',
                  desc: 'Built to scale and integrate with new systems as your hospital grows.',
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-3 lg:py-0 px-4 lg:border-r last:lg:border-r-0"
                  style={{ borderColor: '#E2E8F0', borderRightStyle: i < 4 ? 'solid' : 'none' }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: '#EEF2FF' }}>
                    {feat.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[13px] sm:text-[14px] font-bold" style={{ color: '#1E293B' }}>{feat.title}</h4>
                    <p className="mt-1 text-[11.5px] sm:text-[12.5px] leading-[1.5]" style={{ color: '#64748B' }}>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── USER ROLES & ACCESS ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 border-t border-gray-100">
          {/* Section Header */}
          <div className="text-center max-w-[700px] mx-auto">
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ background: '#EDE9FE', color: '#4F46E5' }}>
              <Shield className="h-3.5 w-3.5" />
              <span>User Roles &amp; Access</span>
            </div>
            {/* Heading with partial color */}
            <h2 className="mt-4 font-display text-[1.75rem] sm:text-[2.5rem] font-extrabold leading-[1.15] tracking-tight">
              <span style={{ color: '#111827' }}>User Roles &amp; </span>
              <span style={{ color: '#6366F1' }}>Access</span>
            </h2>
            {/* Description */}
            <p className="mt-4 text-[15px] sm:text-[17px] leading-[1.6]" style={{ color: '#6B7280' }}>
              {project.title} is designed for every professional.
              <br className="hidden sm:block" />
              Role-based access ensures the right people have the right access.
            </p>
            {/* Decorative Underline */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="block h-1 w-14 rounded-full" style={{ background: '#6366F1' }} />
              <span className="block h-2 w-2 rounded-full" style={{ background: '#9CA3AF' }} />
            </div>
          </div>

          {/* Role Cards Grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[
              {
                icon: <Stethoscope className="h-7 w-7" />,
                iconBg: '#DBEAFE', iconColor: '#3B82F6',
                title: 'Doctors', titleColor: '#2563EB',
                desc: 'Access patient records, schedule appointments and manage treatment plans.',
                features: ['Patient Consultation', 'Medical History', 'Prescriptions', 'Reports & Analytics'],
                badge: 'Role-Based Access', badgeBg: '#DBEAFE', badgeColor: '#2563EB',
              },
              {
                icon: <Users className="h-7 w-7" />,
                iconBg: '#D1FAE5', iconColor: '#10B981',
                title: 'Nurses', titleColor: '#059669',
                desc: 'Manage patient care, monitor vitals and assist with daily operations.',
                features: ['Patient Care', 'Vitals Monitoring', 'Medicine Administration', 'Task Management'],
                badge: 'Role-Based Access', badgeBg: '#D1FAE5', badgeColor: '#059669',
              },
              {
                icon: <Microscope className="h-7 w-7" />,
                iconBg: '#F3E8FF', iconColor: '#8B5CF6',
                title: 'Lab Staff', titleColor: '#7C3AED',
                desc: 'Access lab orders, update test results and manage lab inventory.',
                features: ['Lab Orders', 'Test Results', 'Inventory Management', 'Reports'],
                badge: 'Role-Based Access', badgeBg: '#F3E8FF', badgeColor: '#7C3AED',
              },
              {
                icon: <Pill className="h-7 w-7" />,
                iconBg: '#FFEDD5', iconColor: '#F97316',
                title: 'Pharmacy', titleColor: '#EA580C',
                desc: 'Manage medicines, track stock and process prescriptions efficiently.',
                features: ['Prescription Management', 'Inventory Tracking', 'Drug Interaction Check', 'Stock Alerts'],
                badge: 'Role-Based Access', badgeBg: '#FFEDD5', badgeColor: '#EA580C',
              },
              {
                icon: <Receipt className="h-7 w-7" />,
                iconBg: '#CFFAFE', iconColor: '#06B6D4',
                title: 'Billing Team', titleColor: '#0891B2',
                desc: 'Handle billing, insurance claims and payment reconciliation.',
                features: ['Invoice Generation', 'Payment Processing', 'Insurance Claims', 'Reports & Statements'],
                badge: 'Role-Based Access', badgeBg: '#CFFAFE', badgeColor: '#0891B2',
              },
              {
                icon: <UserCog className="h-7 w-7" />,
                iconBg: '#FCE7F3', iconColor: '#EC4899',
                title: 'Hospital Admin', titleColor: '#DB2777',
                desc: 'Manage users, departments, permissions and system settings.',
                features: ['User Management', 'Role & Permissions', 'System Settings', 'Audit Logs'],
                badge: 'Full System Access', badgeBg: '#FCE7F3', badgeColor: '#DB2777',
              },
            ].map((role, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              >
                {/* Icon Circle */}
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full mb-5"
                  style={{ background: role.iconBg, color: role.iconColor }}
                >
                  {role.icon}
                </div>
                {/* Title */}
                <h3 className="text-[18px] font-bold text-center mb-3" style={{ color: role.titleColor }}>
                  {role.title}
                </h3>
                {/* Description */}
                <p className="text-[13px] text-center leading-[1.6] mb-6 flex-1" style={{ color: '#6B7280' }}>
                  {role.desc}
                </p>
                {/* Feature List */}
                <ul className="w-full space-y-2.5 mb-6">
                  {role.features.map((feat, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-[13px]" style={{ color: '#4B5563' }}>
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: role.iconColor }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                {/* Badge Pill */}
                <div className="mt-auto pt-3">
                  <span
                    className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold"
                    style={{ background: role.badgeBg, color: role.badgeColor }}
                  >
                    {role.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ── DEVELOPMENT JOURNEY ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 border-t border-gray-100">
          {/* Section Header */}
          <div className="text-center max-w-[700px] mx-auto">
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.08em]" style={{ background: '#F3E8FF', color: '#7C3AED' }}>
              <Rocket className="h-3.5 w-3.5" />
              <span>Development Journey</span>
            </div>
            {/* Heading with partial color */}
            <h2 className="mt-4 font-display text-[1.75rem] sm:text-[3rem] font-extrabold leading-[1.1] tracking-tight">
              <span style={{ color: '#1E293B' }}>Our </span>
              <span style={{ color: '#7C3AED' }}>Development</span>
              <span style={{ color: '#1E293B' }}> Journey</span>
            </h2>
            {/* Description */}
            <p className="mt-4 text-[15px] sm:text-[18px] leading-[1.6]" style={{ color: '#64748B' }}>
              A structured approach that ensures we deliver secure, scalable and high-performance solutions tailored to your needs.
            </p>
            {/* Decorative Underline */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="block h-1 w-20 rounded-full" style={{ background: '#7C3AED' }} />
              <span className="block h-2 w-2 rounded-full" style={{ background: '#7C3AED' }} />
            </div>
          </div>

          {/* Timeline + Cards */}
          <div className="mt-14">
            {/* Desktop: 6-col horizontal timeline */}
            <div className="hidden xl:block relative">
              {/* Dashed connector line */}
              <div className="absolute top-6 left-[8.33%] right-[8.33%]" style={{ borderTop: '2px dashed #CBD5E1' }} />
              <div className="grid grid-cols-6 gap-5 items-stretch">
                {[
                  {
                    num: '01', color: '#7C3AED', iconBg: '#F5F3FF',
                    icon: <Search className="h-8 w-8" />,
                    title: 'Discovery',
                    desc: 'We understand your goals, challenges and requirements through in-depth research.',
                    items: ['Stakeholder Interviews', 'Requirement Analysis', 'Process Study', 'Project Roadmap'],
                  },
                  {
                    num: '02', color: '#2563EB', iconBg: '#EFF6FF',
                    icon: <PenTool className="h-8 w-8" />,
                    title: 'Architecture',
                    desc: 'We design a robust and scalable architecture that ensures security and flexibility.',
                    items: ['System Architecture', 'Technology Selection', 'Database Design', 'Integration Planning'],
                  },
                  {
                    num: '03', color: '#059669', iconBg: '#ECFDF5',
                    icon: <Layers className="h-8 w-8" />,
                    title: 'UI/UX Design',
                    desc: 'We create intuitive and engaging interfaces focused on user experience.',
                    items: ['User Flow & Wireframes', 'UI Design', 'Prototype', 'Usability Testing'],
                  },
                  {
                    num: '04', color: '#EA580C', iconBg: '#FFF7ED',
                    icon: <Code2 className="h-8 w-8" />,
                    title: 'Development',
                    desc: 'Our team builds clean, secure and high-performance code using best practices.',
                    items: ['Backend Development', 'Frontend Development', 'API Integration', 'Code Review'],
                  },
                  {
                    num: '05', color: '#7C3AED', iconBg: '#F5F3FF',
                    icon: <ShieldCheck className="h-8 w-8" />,
                    title: 'Testing',
                    desc: 'We rigorously test every module to ensure quality, performance and security.',
                    items: ['Functional Testing', 'Performance Testing', 'Security Testing', 'Bug Fixing'],
                  },
                  {
                    num: '06', color: '#DB2777', iconBg: '#FDF2F8',
                    icon: <Rocket className="h-8 w-8" />,
                    title: 'Deployment',
                    desc: 'We deploy the solution seamlessly and provide ongoing support.',
                    items: ['Live Deployment', 'Data Migration', 'Training & Handover', 'Post-Launch Support'],
                  },
                ].map((step, i) => (
                  <div key={i} className="relative flex flex-col items-center">
                    {/* Number Circle */}
                    <div
                      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-[15px] font-bold text-white"
                      style={{ background: step.color }}
                    >
                      {step.num}
                    </div>
                    {/* Card */}
                    <div
                      className="mt-5 w-full h-full rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative overflow-hidden"
                      style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                    >
                      {/* Bottom accent bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: step.color, borderRadius: '0 0 16px 16px' }} />
                      {/* Icon Circle */}
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-full mx-auto mb-4"
                        style={{ background: step.iconBg, color: step.color }}
                      >
                        {step.icon}
                      </div>
                      {/* Title */}
                      <h3 className="text-[17px] font-bold text-center mb-4" style={{ color: '#1E293B' }}>{step.title}</h3>
                      {/* Checklist */}
                      <ul className="space-y-2.5 mt-auto">
                        {step.items.map((item, fi) => (
                          <li key={fi} className="flex items-center gap-2.5 text-[13px] font-medium" style={{ color: '#334155' }}>
                            <CheckCircle2 className="h-[18px] w-[18px] shrink-0" style={{ color: step.color }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tablet: 3-col grid (no timeline) */}
            <div className="hidden sm:grid xl:hidden grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {[
                {
                  num: '01', color: '#7C3AED', iconBg: '#F5F3FF',
                  icon: <Search className="h-7 w-7" />,
                  title: 'Discovery',
                  desc: 'We understand your goals, challenges and requirements through in-depth research.',
                  items: ['Stakeholder Interviews', 'Requirement Analysis', 'Process Study', 'Project Roadmap'],
                },
                {
                  num: '02', color: '#2563EB', iconBg: '#EFF6FF',
                  icon: <PenTool className="h-7 w-7" />,
                  title: 'Architecture',
                  desc: 'We design a robust and scalable architecture that ensures security and flexibility.',
                  items: ['System Architecture', 'Technology Selection', 'Database Design', 'Integration Planning'],
                },
                {
                  num: '03', color: '#059669', iconBg: '#ECFDF5',
                  icon: <Layers className="h-7 w-7" />,
                  title: 'UI/UX Design',
                  desc: 'We create intuitive and engaging interfaces focused on user experience.',
                  items: ['User Flow & Wireframes', 'UI Design', 'Prototype', 'Usability Testing'],
                },
                {
                  num: '04', color: '#EA580C', iconBg: '#FFF7ED',
                  icon: <Code2 className="h-7 w-7" />,
                  title: 'Development',
                  desc: 'Our team builds clean, secure and high-performance code using best practices.',
                  items: ['Backend Development', 'Frontend Development', 'API Integration', 'Code Review'],
                },
                {
                  num: '05', color: '#7C3AED', iconBg: '#F5F3FF',
                  icon: <ShieldCheck className="h-7 w-7" />,
                  title: 'Testing',
                  desc: 'We rigorously test every module to ensure quality, performance and security.',
                  items: ['Functional Testing', 'Performance Testing', 'Security Testing', 'Bug Fixing'],
                },
                {
                  num: '06', color: '#DB2777', iconBg: '#FDF2F8',
                  icon: <Rocket className="h-7 w-7" />,
                  title: 'Deployment',
                  desc: 'We deploy the solution seamlessly and provide ongoing support.',
                  items: ['Live Deployment', 'Data Migration', 'Training & Handover', 'Post-Launch Support'],
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative overflow-hidden"
                  style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: step.color, borderRadius: '0 0 16px 16px' }} />
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-bold text-white shrink-0"
                      style={{ background: step.color }}
                    >
                      {step.num}
                    </div>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ background: step.iconBg, color: step.color }}
                    >
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-[16px] font-bold mb-3" style={{ color: '#1E293B' }}>{step.title}</h3>
                  <ul className="space-y-2 mt-auto">
                    {step.items.map((item, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-[12px] font-medium" style={{ color: '#334155' }}>
                        <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: step.color }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile: vertical timeline on left */}
            <div className="sm:hidden relative pl-10">
              {/* Vertical dashed line */}
              <div className="absolute left-[19px] top-0 bottom-0" style={{ width: '2px', borderLeft: '2px dashed #CBD5E1' }} />
              {[
                {
                  num: '01', color: '#7C3AED', iconBg: '#F5F3FF',
                  icon: <Search className="h-6 w-6" />,
                  title: 'Discovery',
                  desc: 'We understand your goals, challenges and requirements through in-depth research.',
                  items: ['Stakeholder Interviews', 'Requirement Analysis', 'Process Study', 'Project Roadmap'],
                },
                {
                  num: '02', color: '#2563EB', iconBg: '#EFF6FF',
                  icon: <PenTool className="h-6 w-6" />,
                  title: 'Architecture',
                  desc: 'We design a robust and scalable architecture that ensures security and flexibility.',
                  items: ['System Architecture', 'Technology Selection', 'Database Design', 'Integration Planning'],
                },
                {
                  num: '03', color: '#059669', iconBg: '#ECFDF5',
                  icon: <Layers className="h-6 w-6" />,
                  title: 'UI/UX Design',
                  desc: 'We create intuitive and engaging interfaces focused on user experience.',
                  items: ['User Flow & Wireframes', 'UI Design', 'Prototype', 'Usability Testing'],
                },
                {
                  num: '04', color: '#EA580C', iconBg: '#FFF7ED',
                  icon: <Code2 className="h-6 w-6" />,
                  title: 'Development',
                  desc: 'Our team builds clean, secure and high-performance code using best practices.',
                  items: ['Backend Development', 'Frontend Development', 'API Integration', 'Code Review'],
                },
                {
                  num: '05', color: '#7C3AED', iconBg: '#F5F3FF',
                  icon: <ShieldCheck className="h-6 w-6" />,
                  title: 'Testing',
                  desc: 'We rigorously test every module to ensure quality, performance and security.',
                  items: ['Functional Testing', 'Performance Testing', 'Security Testing', 'Bug Fixing'],
                },
                {
                  num: '06', color: '#DB2777', iconBg: '#FDF2F8',
                  icon: <Rocket className="h-6 w-6" />,
                  title: 'Deployment',
                  desc: 'We deploy the solution seamlessly and provide ongoing support.',
                  items: ['Live Deployment', 'Data Migration', 'Training & Handover', 'Post-Launch Support'],
                },
              ].map((step, i) => (
                <div key={i} className="relative mb-6 last:mb-0">
                  {/* Number Circle on timeline */}
                  <div
                    className="absolute -left-10 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: step.color }}
                  >
                    {step.num}
                  </div>
                  {/* Card */}
                  <div
                    className="rounded-2xl p-5 flex flex-col transition-all duration-300 hover:shadow-md relative overflow-hidden"
                    style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: step.color, borderRadius: '0 0 16px 16px' }} />
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full"
                        style={{ background: step.iconBg, color: step.color }}
                      >
                        {step.icon}
                      </div>
                      <h3 className="text-[16px] font-bold" style={{ color: '#1E293B' }}>{step.title}</h3>
                    </div>
                    <ul className="space-y-2 mt-auto">
                      {step.items.map((item, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-[12px] font-medium" style={{ color: '#334155' }}>
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: step.color }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OTHER PROJECTS / CASE STUDIES ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 border-t border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Explore More
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-gray-900">
                Related Case Studies
              </h2>
            </div>
            <a
              href="/#portfolio"
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              View All Projects
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((op) => (
              <a
                key={op.slug}
                href={`/portfolio/${op.slug}`}
                className="group block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                  {op.category}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                  <span>{op.title}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">{op.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {op.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] text-indigo-700 font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── CONSULTATION CTA ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center"
            style={{ background: "linear-gradient(to right, #EDE9FE, #EEF2FF, #EDE9FE)" }}
          >
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-gray-900">
              Want to build a platform like {project.title}?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
              Schedule a technical consultation with our engineering leads to review your requirements, architecture, and timeline.
            </p>
            <div className="mt-8 flex justify-center">
              <MagneticButton href="/#contact" variant="neon" className="px-8 py-4 text-sm font-bold">
                Book Architecture Call
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
