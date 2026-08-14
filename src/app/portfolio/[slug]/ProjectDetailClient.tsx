"use client";

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

export default function ProjectDetailClient({ project }: { project: Project }) {
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050614] text-foreground antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <main className="relative pt-16 pb-12">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" aria-hidden />

        {/* Ambient top light beam */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-full max-w-7xl opacity-25 blur-3xl"
          style={{ background: project.accent }}
        />

        {/* ── Breadcrumb & Back Navigation ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-2">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-white/10 pb-3">
            <a
              href="/#portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-neutral-300 backdrop-blur transition-all duration-200 hover:border-cyan-500/50 hover:bg-white/[0.08] hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-cyan-400" />
              <span>Back to All Work</span>
            </a>

            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <a href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </a>
              <span>/</span>
              <a href="/#portfolio" className="hover:text-cyan-400 transition-colors">
                Portfolio
              </a>
              <span>/</span>
              <span className="font-semibold text-white truncate max-w-[180px] sm:max-w-none">
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
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>{project.category}</span>
              </div>

              {/* Title & Tagline */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
                {project.description}
              </p>

              {/* Meta information chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    <Globe className="h-3 w-3 text-cyan-400" />
                    <span>Client</span>
                  </div>
                  <div className="mt-1 text-xs font-bold text-white truncate">{project.client}</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    <Clock className="h-3 w-3 text-cyan-400" />
                    <span>Timeline</span>
                  </div>
                  <div className="mt-1 text-xs font-bold text-white">{project.duration}</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    <MapPin className="h-3 w-3 text-cyan-400" />
                    <span>Location</span>
                  </div>
                  <div className="mt-1 text-xs font-bold text-white">{project.location}</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-neutral-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right KPI Impact Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.impactMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/[0.06] to-white/[0.02] p-5 backdrop-blur group hover:border-cyan-500/40 transition-all duration-300"
                >
                  <div className="text-[10.5px] font-semibold uppercase tracking-wider text-neutral-400">
                    {m.label}
                  </div>
                  <div className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-gradient-cyan">
                    {m.value}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-300">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span>{m.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── INTERACTIVE SIMULATOR PREVIEW SECTION ── */}
          <div className="mt-8">
            <div className="mb-4 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Live Interactive Demonstration
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                Project Interface Simulator
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Experience the live interface behavior in real-time across both Desktop Console and Mobile device views.
              </p>
            </div>

            <ProjectSimulator project={project} />
          </div>
        </section>

        {/* ── PROJECT OVERVIEW & STORY SECTION ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Overview Story */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Case Study Overview
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                Engineering a Resilient Solution for {project.client}
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed font-normal">
                {project.overview}
              </p>

              {/* Challenges & Solutions */}
              <div className="space-y-4 pt-4">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Key Challenges & Architecture Solutions
                </h3>

                <div className="space-y-3">
                  {project.challengesAndSolutions.map((cs, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2 backdrop-blur"
                    >
                      <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-rose-400" />
                        <span>Challenge: {cs.challenge}</span>
                      </div>
                      <div className="text-xs text-neutral-300 pl-3.5 border-l border-emerald-500/40">
                        <span className="font-semibold text-emerald-300">Solution: </span>
                        {cs.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Workflow Pipeline */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Execution Workflow
              </span>
              <h2 className="font-display text-2xl font-bold text-white">
                4-Step Technical Architecture
              </h2>

              <div className="space-y-4">
                {project.workflowSteps.map((wf) => (
                  <div
                    key={wf.step}
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur hover:border-cyan-500/40 transition-colors"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-violet-600 to-cyan-500 text-xs font-bold text-white shadow-md">
                      {wf.step}
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">{wf.title}</h4>
                      <p className="mt-1 text-xs text-neutral-400 leading-relaxed">{wf.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── KEY FEATURES GRID ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 border-t border-white/10">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Capabilities
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
              Core Platform Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.keyFeatures.map((feat, i) => {
              const IconComponent = ICON_MAP[feat.iconName] || Zap;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.05] to-white/[0.02] p-6 backdrop-blur hover:border-cyan-500/50 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white">{feat.title}</h3>
                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── TECH STACK BREAKDOWN ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 border-t border-white/10">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Technology Stack
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
              Frameworks & Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.techStackDetailed.map((cat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur space-y-4"
              >
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cyan-300 border-b border-white/10 pb-3">
                  {cat.category}
                </h3>

                <div className="space-y-3">
                  {cat.items.map((item) => {
                    const Icon = TECH_ICON_MAP[item.name] || Zap;
                    return (
                      <div key={item.name} className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-cyan-400">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{item.name}</span>
                            {item.version && (
                              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9.5px] font-mono text-neutral-300">
                                {item.version}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-neutral-400">{item.role}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── OTHER PROJECTS / CASE STUDIES ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 border-t border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Explore More
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                Related Case Studies
              </h2>
            </div>
            <a
              href="/#portfolio"
              className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
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
                className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur hover:border-cyan-500/50 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                  {op.category}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>{op.title}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="mt-2 text-xs text-neutral-400 line-clamp-2">{op.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {op.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-neutral-300"
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
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-linear-to-r from-violet-950/80 via-[#0b0f24] to-cyan-950/80 p-8 sm:p-12 text-center backdrop-blur">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              Want to build a platform like {project.title}?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto">
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
