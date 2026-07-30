"use client";

import { useRef, useEffect, useState } from "react";
import {
  BookOpen,
  Clock,
  ArrowRight,
  GraduationCap,
  Code2,
  BrainCircuit,
  Monitor,
  Server,
  Users,
  Trophy,
} from "lucide-react";

/* ── Data ── */
const COURSES = [
  {
    title: "Laravel Mastery",
    category: "Backend Engineering",
    icon: Code2,
    gradient: "linear-gradient(135deg, #F59E0B, #F97316)",
  },
  {
    title: "AI Integration Blueprint",
    category: "Artificial Intelligence",
    icon: BrainCircuit,
    gradient: "linear-gradient(135deg, #0D9488, #06B6D4)",
  },
  {
    title: "React & Next.js Pro",
    category: "Frontend Development",
    icon: Monitor,
    gradient: "linear-gradient(135deg, #7C3AED, #A855F7)",
  },
  {
    title: "DevOps & Cloud Engineering",
    category: "Infrastructure",
    icon: Server,
    gradient: "linear-gradient(135deg, #EF4444, #F97316)",
  },
];

const HIGHLIGHTS = [
  { icon: BookOpen, value: "98+", label: "Modules" },
  { icon: Clock, value: "235+", label: "Hours" },
  { icon: Users, value: "500+", label: "Learners" },
  { icon: Trophy, value: "100%", label: "Hands-on" },
];

/* ── Intersection Observer hook ── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ── Counter animation hook ── */
function useCounter(target: number, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTs: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

/* ── Main Courses Section ── */
export function Courses() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      id="courses"
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "#FAFAF5" }}
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[350px] w-[350px] rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: "#F59E0B" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-10 h-[300px] w-[300px] rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: "#0D9488" }}
      />

      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1A1A2E 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            className="course-fade-up mt-5 font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]"
            style={{ color: "#1A1A2E", animationDelay: "0.08s" }}
          >
            Industry-crafted courses, built by{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-teal-500 bg-clip-text text-transparent">
              practitioners
            </span>
          </h2>

          {/* Description */}
          <p
            className="course-fade-up mt-4 text-[15px] leading-relaxed sm:text-base"
            style={{ color: "#6B7280", animationDelay: "0.16s" }}
          >
            From backend architecture to AI integration — master the exact
            frameworks, patterns, and tools we use to ship real products for real
            clients. Every course is designed for hands-on learners.
          </p>
        </div>

        {/* ── Course Grid (compact pills) ── */}
        <div
          className="course-fade-up mt-12 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4"
          style={{ animationDelay: "0.24s" }}
        >
          {COURSES.map((course, i) => {
            const Icon = course.icon;
            return (
              <div
                key={course.title}
                className="course-pill group relative flex items-center gap-3.5 rounded-2xl border px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-5 sm:py-5"
                style={{
                  background: "#FFFFFF",
                  borderColor: "rgba(0,0,0,0.06)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                  animationDelay: `${0.24 + i * 0.08}s`,
                }}
              >
                {/* Icon */}
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md transition-transform duration-300 group-hover:scale-110"
                  style={{ background: course.gradient }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h3
                    className="text-[14px] font-bold leading-snug sm:text-[15px]"
                    style={{ color: "#1A1A2E" }}
                  >
                    {course.title}
                  </h3>
                  <p
                    className="mt-0.5 text-[11px] font-medium tracking-wide"
                    style={{ color: "#9CA3AF" }}
                  >
                    {course.category}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight
                  className="ml-auto h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: "#D1D5DB" }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Stats Strip ── */}
        <div
          className="course-fade-up mt-10 flex flex-wrap items-center justify-center gap-6 rounded-2xl border px-6 py-5 sm:mt-12 sm:gap-10 sm:px-8 sm:py-6"
          style={{
            background: "#FFFFFF",
            borderColor: "rgba(0,0,0,0.06)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
            animationDelay: "0.36s",
          }}
        >
          {HIGHLIGHTS.map((stat, i) => {
            const Icon = stat.icon;
            const numericValue = parseInt(stat.value);
            const count = useCounter(numericValue, 1200, inView);
            const displayValue = stat.value.includes("+")
              ? `${count}+`
              : stat.value.includes("%")
              ? `${count}%`
              : `${count}`;

            return (
              <div key={stat.label} className="flex items-center gap-3">
                {i > 0 && (
                  <div
                    className="mr-3 h-7 w-px"
                    style={{ background: "rgba(0,0,0,0.08)" }}
                  />
                )}
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: "#FEF3C7" }}
                >
                  <Icon className="h-4 w-4" style={{ color: "#F59E0B" }} />
                </div>
                <div>
                  <span
                    className="block text-lg font-bold leading-none"
                    style={{ color: "#1A1A2E" }}
                  >
                    {displayValue}
                  </span>
                  <span
                    className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: "#9CA3AF" }}
                  >
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div
          className="course-fade-up mt-10 flex flex-col items-center gap-2 sm:mt-12"
          style={{ animationDelay: "0.44s" }}
        >
          <button
            className="group flex items-center gap-2.5 rounded-2xl px-7 py-3 text-[13px] font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #0D9488, #06B6D4)",
            }}
          >
            Explore Our Courses
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p
            className="text-[11px] tracking-wide"
            style={{ color: "#9CA3AF" }}
          >
            No prerequisites — start from any level
          </p>
        </div>
      </div>
    </section>
  );
}
