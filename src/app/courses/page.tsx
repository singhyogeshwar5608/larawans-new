"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Code2,
  BrainCircuit,
  TrendingUp,
  Palette,
  Cloud,
  Zap,
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  FolderGit2,
  ChevronRight,
  Sparkles,
  Star,
  FolderOpen,
  BarChart3,
  LayoutGrid,
  List,
  X,
  GraduationCap,
  SlidersHorizontal,
  CheckCircle2,
  Award,
  Home,
  ArrowLeft,
} from "lucide-react";
import {
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiVercel,
  SiDocker,
  SiOpenaigym as SiOpenai,
  SiPython,
  SiFlutter,
  SiFirebase,
  SiGooglecloud,
  SiFigma,
  SiFramer,
  SiNotion,
  SiKubernetes,
  SiTerraform,
  SiGrafana,
  SiPrometheus,
  SiLinux,
  SiZapier,
  SiSlackware as SiSlack,
  SiGoogleanalytics,
  SiGoogleads,
  SiCanvas as SiCanva,
  SiWordpress,
  SiBlender,
} from "react-icons/si";
import { ALL_COURSES } from "@/lib/course-data";
import type { CourseItem } from "@/lib/course-data";

// ─── Category Mapping ─────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, string[]> = {
  Development: [
    "full-stack-web-development",
    "mobile-app-development-flutter",
  ],
  AI: ["ai-prompt-engineering", "ai-automation-zapier"],
  Marketing: ["digital-marketing-mastery"],
  Design: ["ui-ux-design-figma", "3d-design-blender"],
  Cloud: ["devops-cloud-engineering"],
  Data: ["data-analytics-python"],
  SEO: ["digital-marketing-mastery"],
};

// ─── Category Tabs Config ──────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "All Courses", value: "all", icon: Zap },
  { label: "Development", value: "Development", icon: Code2 },
  { label: "AI & Automation", value: "AI", icon: BrainCircuit },
  { label: "Marketing", value: "Marketing", icon: TrendingUp },
  { label: "UI/UX & 3D", value: "Design", icon: Palette },
  { label: "Cloud & DevOps", value: "Cloud", icon: Cloud },
  { label: "Data Science", value: "Data", icon: BarChart3 },
];

// ─── Stats Config ─────────────────────────────────────────────────────────────

const STATS = [
  { icon: BookOpen, value: "9", label: "Industry Courses", gradient: "linear-gradient(135deg, #6366F1, #818CF8)" },
  { icon: Clock, value: "300+", label: "Learning Hours", gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)" },
  { icon: Users, value: "10,000+", label: "Active Students", gradient: "linear-gradient(135deg, #10B981, #34D399)" },
  { icon: FolderGit2, value: "100+", label: "Real Projects", gradient: "linear-gradient(135deg, #EC4899, #F472B6)" },
];

// ─── Tech Icon Mapping ──────────────────────────────────────────────────────────

type TechIconComponent = React.ComponentType<{ size?: number; color?: string }>;

const TECH_ICON_MAP: Record<string, TechIconComponent> = {
  Laravel: SiLaravel, React: SiReact, "Next.js": SiNextdotjs, TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss, MySQL: SiMysql, Vercel: SiVercel, Docker: SiDocker,
  ChatGPT: SiOpenai, "OpenAI API": SiOpenai, "DALL-E": SiOpenai, "Hugging Face": SiOpenai,
  Python: SiPython, Flutter: SiFlutter, Dart: SiFlutter, Firebase: SiFirebase,
  "Google Cloud": SiGooglecloud, Figma: SiFigma, Framer: SiFramer, "Adobe XD": SiFigma,
  Notion: SiNotion, AWS: SiGooglecloud, Kubernetes: SiKubernetes, Terraform: SiTerraform,
  Grafana: SiGrafana, Prometheus: SiPrometheus, Linux: SiLinux, Zapier: SiZapier,
  "GitHub Actions": SiNotion, OpenAI: SiOpenai, Slack: SiSlack,
  "Google Analytics": SiGoogleanalytics, "Google Ads": SiGoogleads, Ahrefs: SiGoogleanalytics,
  Canva: SiCanva, WordPress: SiWordpress, Blender: SiBlender, Photoshop: SiCanva,
  "Google Sheets": SiGooglecloud, "Meta Ads": SiGoogleads, SEMrush: SiGoogleanalytics,
  Pandas: SiPython, "Power BI": SiGrafana, NumPy: SiPython, Matplotlib: SiPython,
  Seaborn: SiPython, Jupyter: SiPython, "Scikit-learn": SiPython,
  "After Effects": SiBlender, "Substance Painter": SiBlender, "Premiere Pro": SiBlender,
  "DaVinci Resolve": SiBlender, Make: SiZapier, Airtable: SiFirebase,
  Riverpod: SiFlutter, SQLite: SiMysql, Hive: SiFirebase, Miro: SiFramer,
  Principle: SiFramer, Mailchimp: SiCanva, LangChain: SiPython, Midjourney: SiOpenai,
};

// ─── Badge Color Map ────────────────────────────────────────────────────────────

const BADGE_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Popular: { bg: "#F3E8FF", text: "#6D28D9", border: "#DDD6FE", dot: "#7C3AED" },
  Trending: { bg: "#ECFDF5", text: "#047857", border: "#A7F3D0", dot: "#10B981" },
  Bestseller: { bg: "#FEF3C7", text: "#B45309", border: "#FDE68A", dot: "#F59E0B" },
  New: { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE", dot: "#3B82F6" },
};

// ─── Level Colors ─────────────────────────────────────────────────────────────

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: "#ECFDF5", text: "#047857" },
  Intermediate: { bg: "#EFF6FF", text: "#1D4ED8" },
  Advanced: { bg: "#FDF2F8", text: "#BE185D" },
  "All Levels": { bg: "#F3E8FF", text: "#6B21A8" },
};

// ─── Unified Tech Stack Chip Component ────────────────────────────────────────

function TechPill({ name, color }: { name: string; color: string }) {
  const IconComponent = TECH_ICON_MAP[name];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all duration-200"
      style={{
        backgroundColor: `${color}12`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {IconComponent ? (
        <IconComponent size={13} color={color} />
      ) : (
        <span className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      )}
      <span>{name}</span>
    </span>
  );
}

// ─── Horizontal Course Card Component (1 Per Row Layout) ─────────────────────────

function CourseCardHorizontal({ course, index }: { course: CourseItem; index: number }) {
  const tc = course.themeColor || "#6366F1";
  const badgeStyle = course.badge ? BADGE_COLORS[course.badge] || BADGE_COLORS.Popular : null;
  const levelStyle = LEVEL_COLORS[course.level] || LEVEL_COLORS["All Levels"];
  const rating = (4.8 + (index % 3) * 0.1).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative rounded-2xl sm:rounded-3xl bg-white border-2 border-slate-200/90 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:ring-4 hover:ring-indigo-500/10 shadow-xs hover:shadow-xl"
    >
      {/* Top Accent Color Line */}
      <div className="h-1.5 w-full" style={{ backgroundColor: tc }} />

      <div className="flex flex-col lg:flex-row items-stretch">
        {/* ── 1. Left Visual & Quick Specs Column ── */}
        <div
          className="lg:w-64 shrink-0 p-3.5 sm:p-5 lg:p-6 flex flex-row lg:flex-col justify-between items-center text-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200/80 gap-3"
          style={{
            background: `linear-gradient(135deg, ${tc}18 0%, ${tc}08 100%)`,
          }}
        >
          {/* Subtle Glow Circle */}
          <div
            className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-30 blur-2xl pointer-events-none"
            style={{ backgroundColor: tc }}
          />

          {/* Mobile Layout: Emoji + Category on Left, Price + Level on Right */}
          <div className="flex items-center gap-3 lg:flex-col lg:w-full relative z-10">
            {/* Emoji Spotlight Box */}
            <div
              className="flex h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-2xl sm:text-3xl lg:text-4xl bg-white shadow-sm border-2 border-slate-100 transition-transform duration-300 group-hover:scale-105"
              style={{
                boxShadow: `0 8px 20px ${tc}25`,
              }}
            >
              {course.emoji}
            </div>

            {/* Badges Stack */}
            <div className="flex flex-wrap items-center gap-1.5 lg:justify-center lg:w-full">
              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold bg-white shadow-2xs text-slate-800 border border-slate-200/80">
                {course.category}
              </span>
              {course.badge && badgeStyle && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-2xs"
                  style={{
                    backgroundColor: badgeStyle.bg,
                    color: badgeStyle.text,
                    border: `1px solid ${badgeStyle.border}`,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: badgeStyle.dot }} />
                  {course.badge}
                </span>
              )}
            </div>
          </div>

          {/* Price Tag & Rating */}
          <div className="flex lg:flex-col items-end lg:items-center justify-end lg:w-full border-l lg:border-l-0 lg:border-t border-slate-200/80 pl-3 lg:pl-0 lg:mt-3 lg:pt-3 relative z-10 gap-1.5 lg:space-y-1.5 shrink-0">
            <span className="inline-flex items-center rounded-lg sm:rounded-xl bg-slate-900 px-3 py-1 text-xs sm:text-sm font-black text-white shadow-2xs">
              {course.price}
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-slate-600">
              <span
                className="px-1.5 sm:px-2 py-0.5 rounded-md"
                style={{ backgroundColor: levelStyle.bg, color: levelStyle.text }}
              >
                {course.level}
              </span>
              <span>•</span>
              <span className="text-amber-600 font-extrabold flex items-center gap-1">
                <Star size={11} fill="#F59E0B" />
                {rating}
              </span>
            </div>
          </div>
        </div>

        {/* ── 2. Middle Main Body ── */}
        <div className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col justify-between bg-white space-y-3 sm:space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Career Track Program
              </span>
            </div>

            <Link href={`/courses/${course.slug}`}>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-1.5 sm:mb-2">
                {course.title}
              </h3>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
              {course.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <Clock size={15} className="shrink-0" style={{ color: tc }} />
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">Duration</span>
                  <span className="text-[11px] sm:text-xs font-black text-slate-800">{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen size={15} className="shrink-0" style={{ color: tc }} />
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">Modules</span>
                  <span className="text-[11px] sm:text-xs font-black text-slate-800">{course.modules} Modules</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FolderOpen size={15} className="shrink-0" style={{ color: tc }} />
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">Projects</span>
                  <span className="text-[11px] sm:text-xs font-black text-slate-800">{course.projects.length} Practical Apps</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users size={15} className="shrink-0 text-emerald-600" />
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">Learners</span>
                  <span className="text-[11px] sm:text-xs font-black text-slate-800">{course.students} Enrolled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
              Tech Stack & Tools Covered
            </span>
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              {course.techStack.map((tech) => (
                <TechPill key={tech.name} name={tech.name} color={tech.color} />
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. Right Action & Value Column ── */}
        <div className="lg:w-64 shrink-0 p-4 sm:p-5 lg:p-6 bg-slate-50/90 border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col justify-between space-y-3 sm:space-y-4">
          <div className="space-y-2.5 sm:space-y-3">
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 space-y-0.5 sm:space-y-1">
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-indigo-600 tracking-wider block">
                Primary Outcome
              </span>
              <p className="text-xs font-extrabold text-slate-800 leading-snug">
                {course.outcome}
              </p>
            </div>

            <ul className="space-y-1.5 text-[11px] font-semibold text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>1-on-1 Mentorship & Code Reviews</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>6+ Production Portfolio Projects</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>Verified Certificate of Mastery</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-row lg:flex-col gap-2 pt-1 sm:pt-2">
            <Link
              href={`/courses/${course.slug}`}
              className="group/btn flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-black text-white shadow-xs transition-all duration-300 hover:opacity-95 hover:shadow-md cursor-pointer"
              style={{
                backgroundColor: tc,
              }}
            >
              <span>Explore Course</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>

            <Link
              href={`/courses/${course.slug}`}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 sm:py-2 px-3 text-[11px] font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <span>Download Syllabus</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Aliases to maintain component compatibility
const CourseCardGrid = CourseCardHorizontal;
const CourseCardList = CourseCardHorizontal;

// ─── Main Courses Page Component ─────────────────────────────────────────────

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_COURSES.length };
    CATEGORIES.forEach((cat) => {
      if (cat.value !== "all" && CATEGORY_MAP[cat.value]) {
        const slugs = CATEGORY_MAP[cat.value];
        counts[cat.value] = ALL_COURSES.filter((c) => slugs.includes(c.slug)).length;
      }
    });
    return counts;
  }, []);

  // Filter and Sort Logic
  const filteredCourses = useMemo(() => {
    let courses = [...ALL_COURSES];

    // Category Filter
    if (activeCategory !== "all" && CATEGORY_MAP[activeCategory]) {
      const slugs = CATEGORY_MAP[activeCategory];
      courses = courses.filter((c) => slugs.includes(c.slug));
    }

    // Level Filter
    if (levelFilter !== "all") {
      courses = courses.filter((c) => c.level.toLowerCase() === levelFilter.toLowerCase());
    }

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.techStack.some((t) => t.name.toLowerCase().includes(q))
      );
    }

    // Sort Logic
    if (sortBy === "price-low") {
      courses.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, "")) - parseInt(b.price.replace(/[^\d]/g, "")));
    } else if (sortBy === "price-high") {
      courses.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, "")) - parseInt(a.price.replace(/[^\d]/g, "")));
    } else if (sortBy === "duration") {
      courses.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    }

    return courses;
  }, [activeCategory, searchQuery, levelFilter, sortBy]);

  const hasActiveFilters = activeCategory !== "all" || searchQuery !== "" || levelFilter !== "all" || sortBy !== "default";

  const clearAllFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setLevelFilter("all");
    setSortBy("default");
  };

  return (
    <main className="min-h-screen bg-[#F1F5F9] text-slate-800">
      {/* ─── Top Header Navigation Bar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 shadow-2xs">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c5cff] to-[#00e0c6] text-white font-extrabold text-base shadow-sm">
              L
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                Larawans<span className="text-emerald-500">.</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                Digital Academy
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 px-3 py-2 sm:px-4 text-xs font-bold text-slate-700 transition-colors border border-slate-200/80 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero Banner Section ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 pb-10 sm:pb-14 border-b border-slate-200 bg-white">
        {/* Subtle Gradient Ambient Mesh Backgrounds */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
          style={{ background: "linear-gradient(135deg, #818CF8, #C084FC)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full opacity-25 blur-[120px]"
          style={{ background: "linear-gradient(135deg, #34D399, #FBBF24)" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6 text-xs text-slate-500 font-semibold"
          >
            <Link href="/" className="inline-flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-bold transition-colors cursor-pointer">
              <Home size={13} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-indigo-600 font-bold uppercase tracking-wider text-[11px]">
              All Courses
            </span>
          </motion.div>

          {/* Hero Header Layout */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200/80 px-3.5 py-1.5 text-xs font-bold text-indigo-700 mb-4 shadow-2xs">
                <Sparkles size={14} className="text-indigo-600" />
                <span>Industry-Curated Career Track Programs</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Explore Our{" "}
                <span className="bg-linear-to-r bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Professional Courses
                </span>
              </h1>

              <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-medium">
                Hands-on, project-based training programs designed by industry software engineers and tech mentors. Master in-demand skills, build a job-ready portfolio, and accelerate your career.
              </p>
            </motion.div>

            {/* Quick Hero Badge Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="hidden lg:flex items-center gap-3 p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-md max-w-xs shrink-0"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-xl shadow-md">
                🎓
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">100% Practical Training</p>
                <p className="text-[11px] text-slate-500 font-medium">Build real projects & get certified</p>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5"
          >
            {STATS.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3.5 rounded-2xl bg-white border-2 border-slate-200 p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl text-white shrink-0 shadow-sm"
                    style={{ background: stat.gradient }}
                  >
                    <StatIcon size={20} />
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-black text-slate-900 leading-none">
                      {stat.value}
                    </span>
                    <span className="block text-[11px] font-bold text-slate-500 mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Filter & Search Bar Section ──────────────────────────────────────── */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 py-3 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.value;
                const count = categoryCounts[cat.value] || 0;

                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-extrabold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search + View Mode Switcher */}
            <div className="flex items-center gap-2.5 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 lg:w-72">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search courses, tech stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/15"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 border-2 border-slate-200 shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-indigo-600 shadow-sm font-bold"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="List View"
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-white text-indigo-600 shadow-sm font-bold"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Filter Row: Level & Sorting */}
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 mt-2.5 text-xs text-slate-500 flex-wrap gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-extrabold text-slate-800 flex items-center gap-1">
                <SlidersHorizontal size={13} className="text-indigo-600" />
                <span>Level:</span>
              </span>
              {["all", "Beginner", "Intermediate", "All Levels"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`capitalize font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    levelFilter === lvl
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "hover:text-slate-900 text-slate-600"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Right: Results Count & Clear Button */}
            <div className="flex items-center gap-3 ml-auto">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
                >
                  <X size={13} />
                  <span>Reset Filters</span>
                </button>
              )}
              <span className="font-semibold text-slate-600">
                Showing <strong className="text-slate-900">{filteredCourses.length}</strong> of {ALL_COURSES.length} courses
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Course Display Section ─────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredCourses.length > 0 ? (
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                {filteredCourses.map((course, idx) =>
                  viewMode === "grid" ? (
                    <CourseCardGrid key={course.slug} course={course} index={idx} />
                  ) : (
                    <CourseCardList key={course.slug} course={course} index={idx} />
                  )
                )}
              </motion.div>
            ) : (
              /* Empty Search Results State */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border-2 border-slate-200 shadow-md max-w-md mx-auto my-8 p-8"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 border border-indigo-100">
                  <Search size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No courses found</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-5">
                  We couldn&apos;t find any course matching your current filter criteria or search query.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  <X size={14} />
                  <span>Clear All Filters</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Bottom Consultation Callout Banner ─────────────────────────────── */}
      <section className="pb-16 sm:pb-20 bg-[#F1F5F9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative rounded-3xl overflow-hidden px-6 sm:px-12 py-10 sm:py-12 shadow-xl border-2 border-indigo-900/40"
            style={{
              background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)",
            }}
          >
            {/* Ambient Background Lights */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-25 blur-3xl"
              style={{ backgroundColor: "#818CF8" }}
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: "#EC4899" }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Column: Icon & Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 max-w-2xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white text-3xl shrink-0 shadow-lg border border-white/10">
                  <GraduationCap size={32} className="text-indigo-200" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    Need Help Choosing the Right Learning Path?
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-indigo-200 leading-relaxed">
                    Book a free 1-on-1 career consultation with our senior advisors. We&apos;ll help evaluate your career goals and match you with the perfect course.
                  </p>
                </div>
              </div>

              {/* Right Column: CTA */}
              <div className="shrink-0">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-extrabold text-indigo-900 shadow-xl transition-all duration-300 hover:bg-indigo-50 hover:-translate-y-0.5"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
