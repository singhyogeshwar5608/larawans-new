"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Monitor } from "lucide-react";
import { SectionHeading } from "../section-heading";
import { MagneticButton } from "../magnetic-button";

/* ── Types ── */
export type ShowcaseProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: string; // tailwind gradient
  screenshots: { src: string; alt: string }[];
  stats: { value: string; label: string }[];
};

/* ── Data ── */
const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "pollution-erp",
    title: "Pollution ERP",
    category: "Environment & Compliance",
    description:
      "End-to-end pollution monitoring and compliance management platform — real-time emissions tracking, customer lifecycle management, automated expiry alerts, and integrated payment processing for regulatory bodies.",
    tags: ["Laravel", "MySQL", "Real-time Dashboard"],
    accent: "linear-gradient(135deg, #7c5cff 0%, #00e0c6 100%)",
    screenshots: [
      { src: "/showcase/pollution-erp/pollution-login.PNG", alt: "Pollution ERP — Login Page" },
      { src: "/showcase/pollution-erp/pollution-dashboard.PNG", alt: "Pollution ERP — Dashboard" },
      { src: "/showcase/pollution-erp/pollution-customer.PNG", alt: "Pollution ERP — Customer Management" },
      { src: "/showcase/pollution-erp/pollution-payments.PNG", alt: "Pollution ERP — Payments" },
      { src: "/showcase/pollution-erp/pollution-expiry.PNG", alt: "Pollution ERP — Expiry Tracking" },
      { src: "/showcase/pollution-erp/pollution-profile.PNG", alt: "Pollution ERP — Profile" },
    ],
    stats: [
      { value: "100+", label: "Clients Managed" },
      { value: "24/7", label: "Real-time Tracking" },
      { value: "98%", label: "Compliance Rate" },
    ],
  },
];

/* ── Slide Timer ── */
const AUTO_SLIDE_MS = 4000;

export function ProjectShowcase() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const project = showcaseProjects[projectIndex];
  const totalSlides = project.screenshots.length;

  /* Auto-advance slides */
  const advanceSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSlideIndex((prev) => (prev + 1) % totalSlides);
      setIsTransitioning(false);
    }, 300);
  }, [totalSlides]);

  useEffect(() => {
    timerRef.current = setInterval(advanceSlide, AUTO_SLIDE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advanceSlide]);

  /* Reset slide when project changes */
  useEffect(() => {
    setSlideIndex(0);
  }, [projectIndex]);

  const goNextSlide = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    advanceSlide();
    timerRef.current = setInterval(advanceSlide, AUTO_SLIDE_MS);
  }, [advanceSlide]);

  const goPrevSlide = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTransitioning(true);
    setTimeout(() => {
      setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      setIsTransitioning(false);
    }, 300);
    timerRef.current = setInterval(advanceSlide, AUTO_SLIDE_MS);
  }, [advanceSlide, totalSlides]);

  return (
    <section id="showcase" className="relative overflow-hidden bg-[#050614] py-24 sm:py-32">
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 grid-pattern" aria-hidden />

      {/* Top accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(124,92,255,0.5) 30%, rgba(0,224,198,0.5) 50%, rgba(124,92,255,0.5) 70%, transparent 95%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <SectionHeading
          eyebrow="Showcase"
          title="See our work"
          highlight="in action"
          description="Real products. Real users. Real results. Explore live demos of platforms we've shipped — watch them breathe, navigate, and perform."
        />

        {/* ── Main Showcase Area ── */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Project Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              {/* Category badge */}
              <span
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-violet-200/70 backdrop-blur"
              >
                <Monitor className="h-3 w-3 text-[#00e0c6]" />
                {project.category}
              </span>

              {/* Title */}
              <h3 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.8rem]">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {project.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center backdrop-blur"
                  >
                    <div className="font-display text-xl font-bold text-gradient-cyan sm:text-2xl">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <MagneticButton href="#contact" variant="neon" className="px-7 py-3.5 text-[14px]">
                  Start a Similar Project
                  <ExternalLink className="h-4 w-4" />
                </MagneticButton>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: Laptop Mockup + Slideshow */}
          <div className="relative flex items-center justify-center">
            {/* Glow behind laptop */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 scale-110 rounded-full blur-[120px] opacity-50"
              style={{ background: project.accent }}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[640px]"
            >
              {/* ── Laptop Frame ── */}
              <div className="showcase-laptop-float relative">
                {/* Laptop screen bezel */}
                <div className="relative rounded-t-xl border-[3px] border-neutral-700/80 bg-neutral-800 shadow-[0_0_60px_rgba(124,92,255,0.15)]">
                  {/* Top bar — camera dot */}
                  <div className="flex items-center justify-center py-1.5">
                    <div className="h-1 w-1 rounded-full bg-neutral-500" />
                  </div>

                  {/* Screen area — screenshot slideshow */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0b1e]">
                    {/* Screenshot slides */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={project.screenshots[slideIndex].src}
                        src={project.screenshots[slideIndex].src}
                        alt={project.screenshots[slideIndex].alt}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{
                          opacity: isTransitioning ? 0 : 1,
                          scale: isTransitioning ? 0.95 : 1,
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    </AnimatePresence>

                    {/* Ken Burns slow zoom overlay effect */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(5,6,20,0.4) 100%)",
                      }}
                    />

                    {/* Slide counter badge */}
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur">
                      {slideIndex + 1} / {totalSlides}
                    </div>
                  </div>
                </div>

                {/* Laptop base — bottom chin */}
                <div className="mx-auto h-3 max-w-[85%] rounded-b-lg bg-gradient-to-b from-neutral-700 to-neutral-800" />
                {/* Laptop hinge */}
                <div className="mx-auto h-1.5 max-w-[60%] rounded-b bg-neutral-600" />
              </div>

              {/* ── Slide Navigation ── */}
              <div className="mt-6 flex items-center justify-center gap-4">
                {/* Prev arrow */}
                <button
                  onClick={goPrevSlide}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 backdrop-blur transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {project.screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (timerRef.current) clearInterval(timerRef.current);
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setSlideIndex(i);
                          setIsTransitioning(false);
                        }, 200);
                        timerRef.current = setInterval(advanceSlide, AUTO_SLIDE_MS);
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === slideIndex
                          ? "w-8 bg-[#00e0c6] shadow-[0_0_10px_rgba(0,224,198,0.5)]"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                {/* Next arrow */}
                <button
                  onClick={goNextSlide}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 backdrop-blur transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Project Thumbnails Strip ── */}
        {showcaseProjects.length > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4 overflow-x-auto px-4 pb-2">
            {showcaseProjects.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => setProjectIndex(i)}
                className={`flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  i === projectIndex
                    ? "border-[#00e0c6] shadow-[0_0_20px_rgba(0,224,198,0.3)]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <img
                  src={p.screenshots[0].src}
                  alt={p.title}
                  className="h-16 w-24 object-cover"
                />
                <div className="bg-white/[0.05] px-2 py-1 text-[10px] font-medium text-white/70">
                  {p.title}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
