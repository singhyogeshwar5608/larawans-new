"use client";

import { useRef, useEffect, useState } from "react";
import {
  BookOpen,
  Clock,
  ArrowRight,
  GraduationCap,
  Code2,
  BrainCircuit,
  Server,
  Users,
  Trophy,
  Zap,
  CheckCircle2,
  Sparkles,
  Play,
  Flame,
  Megaphone,
} from "lucide-react";

/* ── Course Data (4 cards with images) ── */
const COURSES = [
  {
    title: "Web Development",
    subtitle: "Laravel · React · Next.js",
    category: "Full-Stack Engineering",
    description: "From backend architecture to frontend interfaces — master the complete web stack.",
    topics: ["Advanced Eloquent", "React Patterns", "RESTful APIs", "Streaming SSR", "State Management"],
    duration: "16 Weeks",
    level: "All Levels",
    modules: 50,
    icon: Code2,
    gradient: "linear-gradient(135deg, #F59E0B, #F97316)",
    glow: "rgba(245, 158, 11, 0.15)",
    accent: "#F59E0B",
    tagColor: "#FEF3C7",
    tagText: "#92400E",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=200&fit=crop",
  },
  {
    title: "AI Integration",
    subtitle: "LLMs · RAG · Agents",
    category: "Artificial Intelligence",
    description: "Embed intelligence into any app — orchestrate LLMs, build RAG pipelines, and ship AI agents.",
    topics: ["LLM APIs & Prompts", "RAG Pipelines", "AI Chatbots", "Automation"],
    duration: "10 Weeks",
    level: "All Levels",
    modules: 30,
    icon: BrainCircuit,
    gradient: "linear-gradient(135deg, #0D9488, #06B6D4)",
    glow: "rgba(13, 148, 136, 0.15)",
    accent: "#0D9488",
    tagColor: "#CCFBF1",
    tagText: "#065F46",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop",
  },
  {
    title: "Digital Marketing",
    subtitle: "SEO · Analytics · Growth",
    category: "Marketing & Growth",
    description: "Data-driven marketing strategies — SEO, paid campaigns, analytics, and conversion optimization.",
    topics: ["SEO Mastery", "Google Analytics", "Social Media Ads", "Content Strategy", "CRO"],
    duration: "8 Weeks",
    level: "Beginner",
    modules: 22,
    icon: Megaphone,
    gradient: "linear-gradient(135deg, #EC4899, #F472B6)",
    glow: "rgba(236, 72, 153, 0.15)",
    accent: "#EC4899",
    tagColor: "#FCE7F3",
    tagText: "#9D174D",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
  },
  {
    title: "DevOps & Cloud",
    subtitle: "Docker · CI/CD · AWS",
    category: "Infrastructure",
    description: "CI/CD pipelines, containers, cloud architecture — ship with confidence and automate everything.",
    topics: ["Docker", "GitHub Actions", "AWS / GCP", "Monitoring"],
    duration: "6 Weeks",
    level: "Beginner",
    modules: 18,
    icon: Server,
    gradient: "linear-gradient(135deg, #EF4444, #F97316)",
    glow: "rgba(239, 68, 68, 0.15)",
    accent: "#EF4444",
    tagColor: "#FEE2E2",
    tagText: "#991B1B",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=200&h=200&fit=crop",
  },
];

const FEATURES = [
  { icon: Play, text: "Project-based learning" },
  { icon: Users, text: "1-on-1 mentorship" },
  { icon: Trophy, text: "Certificate on completion" },
  { icon: Zap, text: "Lifetime access" },
];

const HIGHLIGHTS = [
  { icon: BookOpen, value: 120, suffix: "+", label: "Modules" },
  { icon: Clock, value: 300, suffix: "+", label: "Learning Hours" },
  { icon: Users, value: 500, suffix: "+", label: "Active Learners" },
  { icon: Flame, value: 100, suffix: "%", label: "Hands-on Projects" },
];

/* ── Intersection Observer ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Counter Animation ── */
function useCounter(target: number, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTs: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

/* ── Course Card ── */
function CourseCard({ course, index, inView }: {
  course: typeof COURSES[number];
  index: number;
  inView: boolean;
}) {
  const Icon = course.icon;
  return (
    <div
      className="course-card group relative flex items-center gap-3.5 rounded-xl border px-4 py-3.5 transition-all duration-500 hover:-translate-y-1 sm:gap-4 sm:px-5 sm:py-4"
      style={{
        background: "#FFFFFF",
        borderColor: "rgba(0,0,0,0.06)",
        boxShadow: `0 2px 12px rgba(0,0,0,0.03)`,
        animationDelay: `${0.2 + index * 0.08}s`,
      }}
    >
      {/* Shimmer sweep on hover */}
      <div className="course-card-shimmer absolute inset-0 rounded-xl overflow-hidden pointer-events-none" aria-hidden>
        <div className="course-shimmer-bar absolute inset-0" />
      </div>

      {/* Image + Icon combo */}
      <div className="relative flex shrink-0 items-center justify-center">
        {/* Background image (blurred, clipped) */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-110"
          style={{ width: "44px", height: "44px" }}
        >
          <img
            src={course.image}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.7) saturate(1.3)" }}
          />
        </div>
        {/* Gradient overlay on image */}
        <div
          className="absolute rounded-lg"
          style={{ width: "44px", height: "44px", background: course.gradient, opacity: 0.55 }}
        />
        {/* Icon on top */}
        <div className="relative flex h-11 w-11 items-center justify-center">
          <Icon className="h-5 w-5 text-white drop-shadow-lg" />
        </div>
      </div>

      {/* Content */}
      <div className="relative min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className="text-[14px] font-bold leading-snug sm:text-[15px]"
            style={{ color: "#1A1A2E" }}
          >
            {course.title}
          </h3>
          <span
            className="hidden shrink-0 rounded-md px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider sm:inline-block"
            style={{ background: course.tagColor, color: course.tagText }}
          >
            {course.level}
          </span>
        </div>
        {/* Subtitle line */}
        <p className="mt-0.5 text-[10px] font-semibold tracking-wide" style={{ color: course.accent }}>
          {course.subtitle}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: "#9CA3AF" }}>
            <Clock className="h-2.5 w-2.5" />
            {course.duration}
          </span>
          <span className="text-[10px]" style={{ color: "#D1D5DB" }}>·</span>
          <span className="text-[10px] font-medium" style={{ color: "#9CA3AF" }}>
            {course.modules} Modules
          </span>
        </div>
        {/* Topics inline chips */}
        <div className="mt-2 flex flex-wrap gap-1">
          {course.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-medium"
              style={{ background: "rgba(0,0,0,0.04)", color: "#4B5563" }}
            >
              <CheckCircle2 className="h-2 w-2" style={{ color: course.accent }} />
              {topic}
            </span>
          ))}
          {course.topics.length > 3 && (
            <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-medium" style={{ color: "#9CA3AF" }}>
              +{course.topics.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Enroll button */}
      <button
        className="course-enroll-btn group/btn relative shrink-0 flex items-center gap-1 rounded-lg px-3 py-2 text-[11px] font-bold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 sm:px-3.5"
        style={{ background: course.gradient }}
      >
        Enroll
        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>

      {/* Glow on hover */}
      <div
        className="course-card-glow pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 8px 28px ${course.glow}` }}
        aria-hidden
      />
    </div>
  );
}

/* ── Main Section ── */
export function Courses() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="courses"
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "#FAFAF5" }}
    >
      {/* Background decorations */}
      <div aria-hidden className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full opacity-[0.06] blur-[120px]" style={{ background: "#F59E0B" }} />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-[350px] w-[350px] rounded-full opacity-[0.05] blur-[120px]" style={{ background: "#0D9488" }} />

      {/* Animated floating shapes */}
      <div aria-hidden className="course-float-1 pointer-events-none absolute right-[15%] top-[20%] h-3 w-3 rounded-full opacity-30" style={{ background: "#F59E0B" }} />
      <div aria-hidden className="course-float-2 pointer-events-none absolute left-[10%] top-[45%] h-2 w-2 rounded-full opacity-25" style={{ background: "#0D9488" }} />
      <div aria-hidden className="course-float-3 pointer-events-none absolute right-[8%] bottom-[25%] h-2.5 w-2.5 rounded-full opacity-20" style={{ background: "#EC4899" }} />

      {/* Dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, #1A1A2E 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div
            className="course-fade-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ background: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" }}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Learn &amp; Grow with Larawans
          </div>

          {/* Heading */}
          <h2
            className="course-fade-up mt-5 font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.8rem]"
            style={{ color: "#1A1A2E", animationDelay: "0.08s" }}
          >
            Don&apos;t just learn —{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-teal-500 bg-clip-text text-transparent">
              build real products
            </span>
          </h2>

          {/* Description */}
          <p
            className="course-fade-up mt-4 text-[15px] leading-relaxed sm:text-base"
            style={{ color: "#6B7280", animationDelay: "0.14s" }}
          >
            Industry-crafted courses designed by practitioners who ship production code daily.
            Master the exact frameworks, patterns, and tools we use to build for real clients —
            and start building from day one.
          </p>
        </div>

        {/* ── Features Strip ── */}
        <div
          className="course-fade-up mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12 sm:gap-6"
          style={{ animationDelay: "0.18s" }}
        >
          {FEATURES.map((feat, i) => {
            const FIcon = feat.icon;
            return (
              <div key={feat.text} className="flex items-center gap-2">
                {i > 0 && <div className="hidden h-4 w-px sm:block" style={{ background: "rgba(0,0,0,0.1)" }} />}
                <div className="flex items-center gap-2 rounded-full border px-3.5 py-2 transition-colors duration-300 hover:border-amber-300" style={{ background: "#FFFFFF", borderColor: "rgba(0,0,0,0.06)" }}>
                  <FIcon className="h-3.5 w-3.5" style={{ color: "#F59E0B" }} />
                  <span className="text-[12px] font-semibold" style={{ color: "#374151" }}>{feat.text}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Course Cards Grid ── */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 lg:gap-4">
          {COURSES.map((course, i) => (
            <CourseCard key={course.title} course={course} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Stats Bar ── */}
        <div
          className="course-fade-up mt-14 overflow-hidden rounded-2xl border p-1 sm:mt-16"
          style={{ background: "#FFFFFF", borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 6px 30px rgba(0,0,0,0.03)" }}
        >
          <div
            className="relative rounded-xl px-6 py-6 sm:px-8 sm:py-7"
            style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(13,148,136,0.06) 100%)" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {HIGHLIGHTS.map((stat, i) => {
                const SIcon = stat.icon;
                const count = useCounter(stat.value, 1400, inView);
                return (
                  <div key={stat.label} className="flex flex-col items-center text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(245,158,11,0.12)" }}>
                      <SIcon className="h-5 w-5" style={{ color: "#F59E0B" }} />
                    </div>
                    <span className="mt-2 text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                      {count}{stat.suffix}
                    </span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#9CA3AF" }}>
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── CTA Footer ── */}
        <div
          className="course-fade-up mt-12 flex flex-col items-center gap-3 sm:mt-14"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="course-cta-pulse relative">
            <button
              className="group relative flex items-center gap-2.5 rounded-2xl px-8 py-4 text-[14px] font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #0D9488, #06B6D4)" }}
            >
              <Sparkles className="h-4 w-4" />
              Start Learning Today
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "#0D9488" }} />
            <p className="text-[12px] font-medium" style={{ color: "#6B7280" }}>
              No prerequisites required — start from any level
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex -space-x-2">
              {["bg-amber-400", "bg-teal-400", "bg-pink-400", "bg-red-400"].map((bg, i) => (
                <div key={i} className={`h-6 w-6 rounded-full border-2 border-[#FAFAF5] ${bg} flex items-center justify-center`}>
                  <span className="text-[8px] font-bold text-white">
                    {["A", "R", "S", "K"][i]}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-[11px] font-medium" style={{ color: "#9CA3AF" }}>
              Joined by <strong style={{ color: "#374151" }}>500+</strong> learners this month
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
