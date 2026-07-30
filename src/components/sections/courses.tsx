"use client";

import { useRef, useEffect, useState } from "react";
import {
  BookOpen,
  Clock,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Code2,
  BrainCircuit,
  Server,
} from "lucide-react";

/* ── Data ── */
const COURSES = [
  {
    title: "Laravel Mastery",
    category: "Backend Engineering",
    description:
      "Deep-dive into Laravel's architecture — from Eloquent ORM patterns to API design, queue systems, and building production-grade applications that scale effortlessly.",
    topics: [
      "Advanced Eloquent & Database Design",
      "RESTful API Architecture",
      "Queue Systems & Background Jobs",
      "Testing, Caching & Performance",
    ],
    duration: "8 Weeks",
    level: "Intermediate → Advanced",
    modules: "24 Modules",
    hours: "60+ Hours",
    accent: "linear-gradient(135deg, #F59E0B, #F97316)",
    accentLight: "#FEF3C7",
    icon: Code2,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  },
  {
    title: "AI Integration Blueprint",
    category: "Artificial Intelligence",
    description:
      "Learn to embed intelligence into any application — LLM orchestration, RAG pipelines, prompt engineering, and building AI-powered features that users actually love.",
    topics: [
      "LLM APIs & Prompt Engineering",
      "RAG Pipelines & Vector Databases",
      "Building AI Chatbots & Agents",
      "AI-Driven Automation Workflows",
    ],
    duration: "10 Weeks",
    level: "Beginner → Advanced",
    modules: "30 Modules",
    hours: "80+ Hours",
    accent: "linear-gradient(135deg, #0D9488, #06B6D4)",
    accentLight: "#CCFBF1",
    icon: BrainCircuit,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
  {
    title: "React & Next.js Pro",
    category: "Frontend Development",
    description:
      "Master modern frontend — component architecture, server-side rendering, real-time data patterns, and building blazing-fast interfaces with Next.js 14+ and React 19.",
    topics: [
      "Component Architecture & Patterns",
      "Server Components & Streaming SSR",
      "State Management at Scale",
      "Performance Optimization & Core Web Vitals",
    ],
    duration: "8 Weeks",
    level: "Intermediate → Advanced",
    modules: "26 Modules",
    hours: "55+ Hours",
    accent: "linear-gradient(135deg, #7C3AED, #A855F7)",
    accentLight: "#F3E8FF",
    icon: BookOpen,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
  },
  {
    title: "DevOps & Cloud Engineering",
    category: "Infrastructure & Deployment",
    description:
      "Ship with confidence — CI/CD pipelines, container orchestration, cloud architecture, monitoring, and building deployment workflows that teams actually enjoy using.",
    topics: [
      "Docker & Container Orchestration",
      "CI/CD with GitHub Actions",
      "Cloud Architecture (AWS / GCP)",
      "Monitoring, Logging & Incident Response",
    ],
    duration: "6 Weeks",
    level: "Beginner → Intermediate",
    modules: "18 Modules",
    hours: "40+ Hours",
    accent: "linear-gradient(135deg, #EF4444, #F97316)",
    accentLight: "#FEE2E2",
    icon: Server,
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop",
  },
];

/* ── Intersection Observer hook ── */
function useInView(threshold = 0.2) {
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

/* ── Counter animation hook ── */
function useCounter(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTs: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

/* ── Stat Counter Component ── */
function StatCounter({ value, label, suffix = "", inView }: { value: number; label: string; suffix?: string; inView: boolean }) {
  const count = useCounter(value, 1200, inView);
  return (
    <div className="flex flex-col items-center rounded-xl px-4 py-3" style={{ background: "rgba(0,0,0,0.04)" }}>
      <span className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
        {count}
        {suffix}
      </span>
      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#9CA3AF" }}>
        {label}
      </span>
    </div>
  );
}

/* ── Course Panel Component ── */
function CoursePanel({ course, index, inView }: { course: typeof COURSES[number]; index: number; inView: boolean }) {
  const isEven = index % 2 === 0;
  const IconComp = course.icon;

  return (
    <div
      className={`course-panel flex flex-col gap-6 lg:gap-10 lg:flex-row lg:items-center ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
      style={{
        animationDelay: inView ? `${index * 0.15}s` : "0s",
      }}
    >
      {/* Image Side */}
      <div className="relative w-full lg:w-1/2">
        <div className="group relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 z-[1] opacity-40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: course.accent }}
          />
          {/* Image */}
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Floating icon badge */}
          <div
            className="absolute left-4 top-4 z-[2] flex h-10 w-10 items-center justify-center rounded-xl shadow-lg"
            style={{ background: course.accent }}
          >
            <IconComp className="h-5 w-5 text-white" />
          </div>
          {/* Category badge */}
          <div className="absolute bottom-4 left-4 z-[2] rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-800 backdrop-blur">
            {course.category}
          </div>
        </div>
        {/* Decorative shape */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full opacity-20 blur-2xl lg:h-32 lg:w-32"
          style={{ background: course.accent }}
        />
      </div>

      {/* Content Side */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Course title */}
        <h3
          className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "#1A1A2E" }}
        >
          {course.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#6B7280" }}>
          {course.description}
        </p>

        {/* Topics */}
        <ul className="mt-6 space-y-3">
          {course.topics.map((topic, i) => (
            <li
              key={topic}
              className="course-topic flex items-start gap-3"
              style={{ animationDelay: inView ? `${index * 0.15 + 0.3 + i * 0.1}s` : "0s" }}
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: "#0D9488" }}
              />
              <span className="text-[14px] font-medium" style={{ color: "#374151" }}>
                {topic}
              </span>
            </li>
          ))}
        </ul>

        {/* Stats Row */}
        <div className="mt-6 flex gap-3">
          <div
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold"
            style={{ background: course.accentLight, color: "#1A1A2E" }}
          >
            <BookOpen className="h-3.5 w-3.5" />
            {course.modules}
          </div>
          <div
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold"
            style={{ background: course.accentLight, color: "#1A1A2E" }}
          >
            <Clock className="h-3.5 w-3.5" />
            {course.hours}
          </div>
          <div
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold"
            style={{ background: course.accentLight, color: "#1A1A2E" }}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            {course.level}
          </div>
        </div>

        {/* Duration + CTA */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-[13px] font-medium" style={{ color: "#9CA3AF" }}>
            {course.duration}
          </span>
          <button
            className="group/btn flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: course.accent }}
          >
            Explore Course
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Courses Section ── */
export function Courses() {
  const { ref, inView } = useInView(0.1);

  const totalModules = 98;
  const totalHours = 235;

  return (
    <section
      id="courses"
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "#FAFAF5" }}
    >
      {/* Decorative background elements */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: "#F59E0B" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-20 h-[350px] w-[350px] rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: "#0D9488" }}
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div
            className="course-fade-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{
              background: "#FEF3C7",
              color: "#92400E",
              border: "1px solid #FDE68A",
            }}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Learn &amp; Grow
          </div>

          {/* Heading */}
          <h2
            className="course-fade-up mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]"
            style={{ color: "#1A1A2E", animationDelay: "0.1s" }}
          >
            Master the skills that{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-teal-500 bg-clip-text text-transparent">
              matter
            </span>
          </h2>

          {/* Description */}
          <p
            className="course-fade-up mt-5 text-base leading-relaxed sm:text-lg"
            style={{ color: "#6B7280", animationDelay: "0.2s" }}
          >
            Industry-crafted courses designed by practitioners, not professors. Learn the exact frameworks,
            patterns, and tools we use to ship real products for real clients.
          </p>
        </div>

        {/* ── Course Panels ── */}
        <div className="mt-16 flex flex-col gap-16 lg:gap-24">
          {COURSES.map((course, i) => (
            <div key={course.title} className="relative">
              {/* Panel divider (not on first) */}
              {i > 0 && (
                <div
                  aria-hidden
                  className="course-divider absolute -top-8 left-0 right-0 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.2), rgba(13,148,136,0.2), transparent)",
                  }}
                />
              )}
              <CoursePanel course={course} index={i} inView={inView} />
            </div>
          ))}
        </div>

        {/* ── Stats Banner ── */}
        <div
          className="course-fade-up mt-20 flex flex-col items-center gap-6 rounded-2xl border p-8 sm:p-10"
          style={{
            background: "#FFFFFF",
            borderColor: "rgba(0,0,0,0.06)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.04)",
            animationDelay: "0.4s",
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <StatCounter value={totalModules} label="Total Modules" suffix="+" inView={inView} />
            <div className="h-8 w-px bg-gray-200 hidden sm:block" />
            <StatCounter value={totalHours} label="Learning Hours" suffix="+" inView={inView} />
            <div className="h-8 w-px bg-gray-200 hidden sm:block" />
            <StatCounter value={4} label="Expert Courses" inView={inView} />
            <div className="h-8 w-px bg-gray-200 hidden sm:block" />
            <StatCounter value={100} label="Hands-on Projects" suffix="%" inView={inView} />
          </div>
        </div>

        {/* ── Section Footer CTA ── */}
        <div className="course-fade-up mt-14 flex flex-col items-center gap-4" style={{ animationDelay: "0.5s" }}>
          <button
            className="group flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-[14px] font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #0D9488, #06B6D4)" }}
          >
            Start Learning Today
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="text-[12px] tracking-wide" style={{ color: "#9CA3AF" }}>
            No prerequisites required — start from any level
          </p>
        </div>
      </div>
    </section>
  );
}
