"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import type { CourseItem } from "@/lib/course-data";
import {
  House,
  ChevronRight,
  Star,
  Users,
  Play,
  Laptop,
  Briefcase,
  GraduationCap,
  Handshake,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Flame,
  Clock,
  Smartphone,
  Award,
  Download,
  ClipboardList,
  Tag,
  ShoppingCart,
  Link2,
  Headset,
  Shield,
  RotateCcw,
  Lock,
  Video,
  FileText,
  Infinity,
  Trophy,
  Zap,
  BookOpen,
  TrendingUp,
  Target,
  MessageSquare,
  Code2,
  BarChart3,
  Sparkle,
  Brain,
  Palette,
} from "lucide-react";

type TabId = "overview" | "curriculum" | "instructor" | "reviews" | "faq";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "curriculum", label: "Curriculum", icon: FileText },
  { id: "instructor", label: "Instructor", icon: GraduationCap },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
  { id: "faq", label: "FAQ", icon: MessageSquare },
];

const INSTRUCTOR = {
  name: "Larawans Digital",
  role: "Industry Expert",
  avatar:
    "https://ui-avatars.com/api/?name=LD&background=4f46e5&color=fff&size=200&bold=true",
  bio: "Experienced professional with years of industry expertise. Has trained thousands of students and worked with top organizations worldwide.",
  students: "50K+",
  courses: "15+",
  rating: "4.9",
};

const REVIEWS = [
  {
    name: "Rahul Sharma",
    avatar: "https://ui-avatars.com/api/?name=RS&background=10b981&color=fff&bold=true",
    rating: 5,
    time: "2 weeks ago",
    text: "Excellent course! The instructor explains everything in a very practical way. Projects are really helpful to understand real-world concepts.",
  },
  {
    name: "Priya Patel",
    avatar: "https://ui-avatars.com/api/?name=PP&background=8b5cf6&color=fff&bold=true",
    rating: 5,
    time: "1 month ago",
    text: "This course transformed my career. The hands-on projects and real-world examples made learning so effective. Highly recommended!",
  },
  {
    name: "Amit Kumar",
    avatar: "https://ui-avatars.com/api/?name=AK&background=3b82f6&color=fff&bold=true",
    rating: 4,
    time: "3 weeks ago",
    text: "Great content and well-structured curriculum. The support team is very responsive. Would definitely recommend.",
  },
];

const FAQS = [
  { q: "Who is this course for?", a: "This course is designed for beginners as well as intermediate learners who want to build professional skills." },
  { q: "Do I need any prior experience?", a: "No prior experience is required. We start from the very basics and gradually progress to advanced topics." },
  { q: "Will I get a certificate?", a: "Yes! Upon successful completion of all modules and projects, you will receive a certificate of completion." },
  { q: "How long do I have access?", a: "You get lifetime access to the course content. Learn at your own pace, revisit any module, and access all future updates." },
  { q: "Is there a money-back guarantee?", a: "Yes, we offer a 30-day money-back guarantee. If you are not satisfied within the first 30 days, you can request a full refund." },
  { q: "Can I access the course on mobile?", a: "Yes, the course is fully responsive and can be accessed on any device — desktop, tablet, or mobile." },
];

const RATING_BARS = [
  { star: 5, pct: 81 },
  { star: 4, pct: 14 },
  { star: 3, pct: 3 },
  { star: 2, pct: 1 },
  { star: 1, pct: 1 },
];

export default function CourseDetailClient({ course }: { course: CourseItem }) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({ 0: true });
  const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({ 0: true });
  const [showAllCurriculum, setShowAllCurriculum] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [countdown, setCountdown] = useState({ days: 2, hours: 10, mins: 24, secs: 32 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  const primary = course.themeColor || "#4f46e5";

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((p) => {
        let { days, hours, mins, secs } = p;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrentReview((p) => (p + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    tabRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeTab]);

  const priceNum = parseInt(course.price.replace(/[^\d]/g, "")) || 9999;
  const originalPrice = String.fromCodePoint(8377) + (priceNum * 3.6).toLocaleString("en-IN");
  const discount = Math.round((1 - priceNum / (priceNum * 3.6)) * 100);

  const curriculumModules = useMemo(() => {
    const mc = Math.min(course.modules || 5, 9);
    const tpm = Math.ceil(course.topics.length / mc);
    return Array.from({ length: mc }, (_, i) => {
      const lc = (i + 1) * 3 + 2;
      const tm = lc * 12 + i * 15;
      return {
        title: course.topics[i * tpm] || "Module " + (i + 1),
        lectures: lc,
        duration: Math.floor(tm / 60) + "h " + (tm % 60) + "m",
        topics: course.topics.slice(i * tpm, (i + 1) * tpm),
      };
    });
  }, [course.modules, course.topics]);

  const totalLectures = curriculumModules.reduce((s, m) => s + m.lectures, 0);
  const totalMins = curriculumModules.reduce((s, m) => {
    const p = m.duration.match(/(\d+)h (\d+)m/);
    return s + parseInt(p?.[1] || "0") * 60 + parseInt(p?.[2] || "0");
  }, 0);
  const totalDuration = Math.floor(totalMins / 60) + "h " + (totalMins % 60) + "m";

  const getLevelTag = (l: string) => {
    const lw = l.toLowerCase();
    if (lw.includes("beginner") || l === "All Levels") return "Beginner Friendly";
    if (lw.includes("intermediate")) return "Intermediate";
    return "Advanced";
  };
  const tog = (set: React.Dispatch<React.SetStateAction<Record<number, boolean>>>, idx: number) =>
    set((p) => ({ ...p, [idx]: !p[idx] }));
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
            {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-white">
        {/* Background decorative blob */}
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, #EDE9FE 0%, #EDE9FE 40%, transparent 70%)" }} />
        {/* Subtle top-left blob */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40" style={{ background: "radial-gradient(circle, #EEF2FF 0%, transparent 70%)" }} />

        <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-8 sm:pt-10 lg:pt-14 pb-16 lg:pb-24">
          {/* Breadcrumbs */}
          <nav className="flex mb-7">
            <ol className="inline-flex items-center gap-1.5 text-[13px]">
              <li>
                <a href="/" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-indigo-600 transition-colors font-medium">
                  <House className="w-3.5 h-3.5" /> Home
                </a>
              </li>
              <li><ChevronRight className="w-3 h-3 text-gray-300" /></li>
              <li>
                <a href="/courses" className="text-gray-400 hover:text-indigo-600 transition-colors font-medium">{course.category}</a>
              </li>
              <li><ChevronRight className="w-3 h-3 text-gray-300" /></li>
              <li className="text-indigo-600 font-semibold truncate max-w-[220px]">{course.title}</li>
            </ol>
          </nav>

          {/* Hero two-column */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* LEFT COLUMN */}
            <div className="flex-1 min-w-0">
              {/* Category Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-[7px] rounded-full bg-emerald-50 text-emerald-700">
                  <Zap className="w-3.5 h-3.5" /> {course.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-[7px] rounded-full bg-blue-50 text-blue-700">
                  <Users className="w-3.5 h-3.5" /> {getLevelTag(course.level)}
                </span>
                {course.badge && (
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-[7px] rounded-full bg-amber-50 text-amber-700">
                    <Flame className="w-3.5 h-3.5" /> {course.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.75rem] font-extrabold leading-[1.08] tracking-tight mb-2" style={{ backgroundImage: "linear-gradient(to right, #0f172a, #1e293b, #4f46e5)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                {course.title}
              </h1>

              {/* Hand-drawn underline accent */}
              <div className="mb-6 mt-1">
                <svg width="120" height="12" viewBox="0 0 120 12" fill="none" className="ml-1">
                  <path d="M2 8C15 3 35 2 60 5C85 8 100 4 118 7" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 3" opacity="0.7"/>
                </svg>
              </div>

              {/* Description */}
              <p className="text-[17px] leading-[1.7] text-slate-500 max-w-[580px] mb-7">{course.description}</p>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1,2,3,4].map(n => <Star key={n} className="w-[18px] h-[18px] text-amber-400 fill-amber-400" />)}
                    <Star className="w-[18px] h-[18px] text-amber-400/40 fill-amber-400/40" />
                  </div>
                  <span className="font-bold text-slate-800">4.8</span>
                  <span className="text-slate-400 text-[13px]">(2,456)</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-slate-500 font-medium">
                  <Users className="w-4 h-4 text-indigo-500" /> {course.students}
                </div>
                <div className="flex items-center gap-2 text-[14px] text-slate-500 font-medium">
                  <Clock className="w-4 h-4 text-indigo-500" /> {course.duration}
                </div>
                <div className="flex items-center gap-2 text-[14px] text-slate-500 font-medium">
                  <BarChart3 className="w-4 h-4 text-indigo-500" /> {course.level}
                </div>
              </div>

              {/* Feature Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-default">
                  <Code2 className="w-4 h-4 text-emerald-500" /> Practical Projects
                </span>
                <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-default">
                  <Briefcase className="w-4 h-4 text-violet-500" /> Industry Tools
                </span>
                <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-default">
                  <Award className="w-4 h-4 text-emerald-500" /> Certificate
                </span>
                <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-default">
                  <Infinity className="w-4 h-4 text-orange-500" /> Lifetime Access
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-white px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200 active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}>
                  <GraduationCap className="w-[18px] h-[18px]" /> Enroll Now
                </button>
                <button className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-slate-700 px-7 py-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 active:scale-[0.98]">
                  <ShoppingCart className="w-[18px] h-[18px]" /> Add to Cart
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN — Illustration */}
            <div className="w-full lg:w-[480px] shrink-0 flex items-center justify-center">
              <div className="relative w-full max-w-[440px]">
                {/* Floating AI Prompt Card */}
                <div className="absolute -left-6 top-[30%] z-20 w-[200px] rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl shadow-indigo-100/50 p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Sparkle className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-[12px] font-bold text-slate-800">AI Prompt</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl px-3 py-2.5 text-[11px] text-slate-400 leading-relaxed border border-slate-100">
                    Write a creative marketing headline...<span className="inline-block w-[1.5px] h-3 bg-indigo-500 ml-0.5 animate-pulse align-middle" />
                  </div>
                  <button className="mt-2.5 w-full text-[11px] font-bold text-white py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5">
                    <Zap className="w-3 h-3" /> Generate
                  </button>
                </div>

                {/* Floating tech icons */}
                <div className="absolute -right-2 top-[8%] z-10 w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center shadow-lg shadow-teal-100/50">
                  <Brain className="w-6 h-6 text-teal-600" />
                </div>
                <div className="absolute -right-4 top-[25%] z-10 w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center shadow-lg shadow-purple-100/50">
                  <Palette className="w-5.5 h-5.5 text-purple-600" />
                </div>
                <div className="absolute left-2 bottom-[18%] z-10 w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shadow-lg shadow-amber-100/50">
                  <Code2 className="w-5.5 h-5.5 text-amber-600" />
                </div>

                {/* Main Robot SVG Illustration */}
                <div className="relative z-0 flex items-center justify-center py-4">
                  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[360px]" style={{ filter: "drop-shadow(0 20px 40px rgba(99,102,241,0.15))" }}>
                    {/* Background circle */}
                    <circle cx="200" cy="200" r="190" fill="#F5F3FF" opacity="0.5"/>
                    <circle cx="200" cy="200" r="160" fill="#EDE9FE" opacity="0.4"/>
                    {/* Robot body */}
                    <rect x="140" y="180" width="120" height="130" rx="24" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
                    {/* Body accent stripe */}
                    <rect x="140" y="180" width="120" height="20" rx="24" fill={primary} opacity="0.15"/>
                    {/* Robot head */}
                    <rect x="148" y="100" width="104" height="90" rx="22" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
                    {/* Visor/Screen */}
                    <rect x="162" y="115" width="76" height="50" rx="14" fill="#1E1B4B"/>
                    {/* Eyes - happy curve */}
                    <path d="M178 142C182 136 190 134 200 134C210 134 218 136 222 142" stroke="#818CF8" strokeWidth="3" strokeLinecap="round"/>
                    {/* Eye dots */}
                    <circle cx="188" cy="130" r="3" fill="#818CF8"/>
                    <circle cx="212" cy="130" r="3" fill="#818CF8"/>
                    {/* Antenna */}
                    <line x1="200" y1="100" x2="200" y2="78" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="200" cy="72" r="8" fill="#8B5CF6" opacity="0.8"/>
                    <circle cx="200" cy="72" r="4" fill="#A78BFA"/>
                    {/* Left arm */}
                    <rect x="108" y="195" width="36" height="16" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
                    {/* Right arm (raised, pointing up) */}
                    <rect x="256" y="155" width="16" height="50" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2" transform="rotate(-15 264 155)"/>
                    {/* Pointing finger */}
                    <circle cx="258" cy="148" r="6" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
                    {/* Lightbulb above finger */}
                    <g className="animate-pulse">
                      <circle cx="258" cy="120" r="18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
                      <path d="M253 118C253 112 258 108 258 108C258 108 263 112 263 118" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" fill="none"/>
                      <line x1="258" y1="100" x2="258" y2="96" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="272" y1="106" x2="275" y2="103" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="244" y1="106" x2="241" y2="103" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                    </g>
                    {/* Legs */}
                    <rect x="162" y="305" width="24" height="40" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
                    <rect x="214" y="305" width="24" height="40" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
                    {/* Feet */}
                    <rect x="155" y="338" width="38" height="14" rx="7" fill="#E2E8F0"/>
                    <rect x="207" y="338" width="38" height="14" rx="7" fill="#E2E8F0"/>
                    {/* Body details - buttons */}
                    <circle cx="175" cy="225" r="5" fill="#8B5CF6" opacity="0.3"/>
                    <circle cx="200" cy="225" r="5" fill="#10B981" opacity="0.4"/>
                    <circle cx="225" cy="225" r="5" fill="#F59E0B" opacity="0.3"/>
                    {/* Heart on chest */}
                    <path d="M193 255C193 248 200 244 200 244C200 244 207 248 207 255C207 260 200 266 200 266C200 266 193 260 193 255Z" fill={primary} opacity="0.2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom curved wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full block">
            <path d="M0 60V30C360 0 720 10 1080 30C1260 40 1380 35 1440 30V60H0Z" fill="white"/>
          </svg>
        </div>

        {/* Purple swoosh line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg, transparent 5%, #8B5CF6 30%, #6366F1 50%, #8B5CF6 70%, transparent 95%)" }} />
      </section>

{/* ==================== PRICING CTA BAR ==================== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl shadow-lg shadow-slate-200/60 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg, " + primary + ", " + primary + "44, " + primary + ")" }} />
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-gray-900">{course.price}</span>
                  <span className="text-xl text-slate-400 line-through">{originalPrice}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-sm font-bold px-3 py-1 rounded-lg mt-2">
                  <Flame className="w-4 h-4" /> {discount}% OFF — Limited Time
                </div>
              </div>
              <div className="hidden md:block w-px h-16 bg-slate-200" />
              <div className="flex gap-2">
                {["Days", "Hours", "Mins", "Secs"].map((label, i) => {
                  const val = [countdown.days, countdown.hours, countdown.mins, countdown.secs][i];
                  return (
                    <div key={label} className="text-center bg-slate-900 rounded-xl px-3 py-2.5 min-w-[56px]">
                      <div className="text-xl font-extrabold text-white font-mono">{pad(val)}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider font-medium">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-initial text-white font-bold text-[0.95rem] py-3.5 px-8 rounded-xl transition-all duration-200 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2.5" style={{ background: "linear-gradient(135deg, " + primary + ", " + primary + "bb)", boxShadow: "0 8px 24px " + primary + "40" }}>
                <Zap className="w-5 h-5" /> Enroll Now
              </button>
              <button className="flex-1 md:flex-initial font-bold text-[0.95rem] py-3.5 px-8 rounded-xl transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2 text-gray-700 bg-slate-100 hover:bg-slate-200">
                <ShoppingCart className="w-4.5 h-4.5" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== TABS + CONTENT (FULL WIDTH) ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab bar */}
        <div ref={tabRef} className="inline-flex flex-wrap gap-1 p-1.5 rounded-2xl bg-slate-100 mb-10">
          {TABS.map((tab) => {
            const Ic = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={"flex items-center gap-2 px-5 py-3 rounded-xl text-[0.95rem] font-semibold transition-all duration-200 " + (active ? "text-white shadow-lg" : "text-slate-500 hover:text-slate-800 hover:bg-white/60")} style={active ? { background: primary, boxShadow: "0 8px 24px " + primary + "50" } : {}}>
                <Ic className="w-[18px] h-[18px]" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ========== OVERVIEW TAB ========== */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Course Description */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><BookOpen className="w-5 h-5" style={{ color: primary }} /></div>
                <h2 className="text-2xl font-bold text-gray-900">Course Description</h2>
              </div>
              <div className="text-gray-600 space-y-5 leading-[1.8] text-[1.05rem] pl-14">
                <p>{course.longDescription}</p>
                <p>{course.aboutText}</p>
              </div>
            </section>

            {/* What You Will Learn */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><Target className="w-5 h-5" style={{ color: primary }} /></div>
                <h2 className="text-2xl font-bold text-gray-900">What You Will Learn</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 pl-14">
                {(() => {
                  const h = Math.ceil(course.topics.length / 2);
                  const L = course.topics.slice(0, h);
                  const R = course.topics.slice(h);
                  return (
                    <>
                      <ul className="space-y-3.5">{L.map((tp, i) => (
                        <li key={i} className="flex items-start gap-3.5 text-[0.95rem] text-gray-700 leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: primary }} />{tp}
                        </li>
                      ))}</ul>
                      <ul className="space-y-3.5">{R.map((tp, i) => (
                        <li key={i} className="flex items-start gap-3.5 text-[0.95rem] text-gray-700 leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: primary }} />{tp}
                        </li>
                      ))}</ul>
                    </>
                  );
                })()}
              </div>
            </section>

            {/* Course Highlights */}
            <section className="rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, " + primary + ", #312e81 70%, #0f172a)" }}>
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.08] pointer-events-none" style={{ background: "radial-gradient(circle, white, transparent 70%)", transform: "translate(30%, -30%)" }} />
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2.5"><TrendingUp className="w-6 h-6" /> Course Highlights</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {course.highlights.map((h: any, i: number) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-extrabold mb-1.5">{h.value}</div>
                    <div className="text-[0.95rem] text-white/60 font-medium">{h.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Feature Cards */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { I: Laptop, t: "Hands-on Projects", d: "Build real-world apps" },
                  { I: Briefcase, t: "Job Ready Skills", d: "Industry-relevant tools" },
                  { I: GraduationCap, t: "Expert Guidance", d: "Learn from industry pros" },
                  { I: Handshake, t: "Career Support", d: "Resume and interview help" },
                ].map(({ I, t, d }: any) => (
                  <div key={t} className="group p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: primary + "12" }}><I className="w-6 h-6" style={{ color: primary }} /></div>
                    <h4 className="font-bold text-gray-900 text-[0.95rem]">{t}</h4>
                    <p className="text-sm text-gray-500 mt-1.5">{d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tech Stack */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><Code2 className="w-5 h-5" style={{ color: primary }} /></div>
                <h2 className="text-2xl font-bold text-gray-900">Tech Stack You Will Master</h2>
              </div>
              <div className="flex flex-wrap gap-3 pl-14">
                {course.techStack.map((tech: any, i: number) => (
                  <div key={i} className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 rounded-full px-5 py-3 transition-colors">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ background: tech.color }} />
                    <span className="text-[0.95rem] font-medium text-gray-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Who This Course Is For */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><Users className="w-5 h-5" style={{ color: primary }} /></div>
                <h2 className="text-2xl font-bold text-gray-900">Who This Course Is For</h2>
              </div>
              <div className="space-y-3.5 pl-14">
                {course.audience.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5" style={{ background: primary }}>{i + 1}</div>
                    <p className="text-[0.95rem] text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========== CURRICULUM TAB ========== */}
        {activeTab === "curriculum" && (
          <section>
            <div className="flex flex-wrap justify-between items-end mb-6 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><FileText className="w-5 h-5" style={{ color: primary }} /></div>
                <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
              </div>
              <span className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-lg font-medium">{curriculumModules.length} Sections · {totalLectures} Lectures · {totalDuration}</span>
            </div>
            <div className="space-y-3">
              {(showAllCurriculum ? curriculumModules : curriculumModules.slice(0, 5)).map((mod: any, idx: number) => {
                const isOpen = expandedSections[idx];
                return (
                  <div key={idx} className={"rounded-xl overflow-hidden transition-all " + (isOpen ? "shadow-md bg-white" : "bg-slate-50 hover:bg-slate-100")}>
                    <button onClick={() => tog(setExpandedSections, idx)} className="w-full flex justify-between items-center p-5 text-left font-medium transition-colors">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: isOpen ? primary : primary + "40" }}>{idx + 1}</div>
                        <span className="text-gray-900 text-[0.95rem]">{mod.title}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-500 font-normal">
                        <span className="hidden sm:inline text-sm">{mod.lectures} Lectures · {mod.duration}</span>
                        {isOpen ? <ChevronUp className="w-5 h-5" style={{ color: primary }} /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 bg-white">
                        <ul className="space-y-1">
                          {mod.topics.map((tp: string, ti: number) => (
                            <li key={ti} className="flex items-center gap-3.5 py-3 text-[0.95rem] text-gray-600">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100"><Play className="w-3 h-3" style={{ color: primary }} /></div>
                              {tp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {curriculumModules.length > 5 && (
              <div className="text-center mt-8">
                <button onClick={() => setShowAllCurriculum(!showAllCurriculum)} className="inline-flex items-center gap-2 text-[0.95rem] font-semibold hover:underline" style={{ color: primary }}>
                  {showAllCurriculum ? "Show less" : "Show all " + curriculumModules.length + " sections"}
                </button>
              </div>
            )}
          </section>
        )}

        {/* ========== INSTRUCTOR TAB ========== */}
        {activeTab === "instructor" && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><GraduationCap className="w-5 h-5" style={{ color: primary }} /></div>
              <h2 className="text-2xl font-bold text-gray-900">Meet Your Instructor</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <div className="relative">
                <img src={INSTRUCTOR.avatar} alt={INSTRUCTOR.name} className="w-32 h-32 rounded-2xl object-cover shadow-xl" />
                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-lg" style={{ background: primary }}><CheckCircle2 className="w-5 h-5" /></div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">{INSTRUCTOR.name}</h3>
                <p className="text-lg font-semibold mt-1" style={{ color: primary }}>{INSTRUCTOR.role}</p>
                <p className="text-gray-600 mt-4 leading-relaxed text-[1.05rem]">{INSTRUCTOR.bio}</p>
                <div className="flex flex-wrap gap-8 mt-7">
                  {[{ l: "Students", v: INSTRUCTOR.students }, { l: "Courses", v: INSTRUCTOR.courses }, { l: "Rating", v: INSTRUCTOR.rating + " \u2605" }].map((s: any) => (
                    <div key={s.l} className="text-center px-6 py-3.5 rounded-xl bg-slate-50">
                      <div className="text-2xl font-bold text-gray-900">{s.v}</div>
                      <div className="text-sm text-slate-500 mt-0.5 font-medium">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========== REVIEWS TAB ========== */}
        {activeTab === "reviews" && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><MessageSquare className="w-5 h-5" style={{ color: primary }} /></div>
              <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3 flex flex-col items-center md:items-start">
                <div className="text-7xl font-extrabold mb-3" style={{ color: primary }}>4.8</div>
                <div className="flex text-amber-400 text-2xl mb-3">
                  {[1,2,3,4].map(n => <Star key={n} className="w-6 h-6 fill-amber-400" />)}
                  <Star className="w-6 h-6 fill-amber-400/50" />
                </div>
                <p className="text-slate-500 mb-7 font-medium">(2,456 reviews)</p>
                <div className="w-full space-y-3">
                  {RATING_BARS.map(({ star, pct }: any) => (
                    <div key={star} className="flex items-center">
                      <span className="w-4 text-gray-700 font-semibold text-sm">{star}</span>
                      <Star className="w-3.5 h-3.5 text-amber-400 mx-2 fill-amber-400" />
                      <div className="flex-1 bg-slate-100 rounded-full h-2.5 mx-1">
                        <div className="h-2.5 rounded-full transition-all" style={{ width: pct + "%", background: primary }} />
                      </div>
                      <span className="w-10 text-right text-slate-500 text-sm">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="bg-slate-50 rounded-2xl p-7">
                  <div className="flex items-start gap-4">
                    <img alt="Reviewer" className="w-16 h-16 rounded-xl object-cover shadow-md" src={REVIEWS[currentReview].avatar} />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{REVIEWS[currentReview].name}</h4>
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1 font-semibold"><CheckCircle2 className="w-3 h-3" /> Verified</span>
                      </div>
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_: any, i: number) => (
                            <Star key={i} className={"w-4.5 h-4.5 " + (i < REVIEWS[currentReview].rating ? "fill-amber-400" : "text-slate-200")} />
                          ))}
                        </div>
                        <span className="text-slate-400 text-sm">{REVIEWS[currentReview].time}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-[1.05rem]">{REVIEWS[currentReview].text}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-6 gap-2.5">
                  {REVIEWS.map((_: any, i: number) => (
                    <button key={i} onClick={() => setCurrentReview(i)} className="h-2.5 rounded-full transition-all duration-300" style={{ width: i === currentReview ? 28 : 10, background: i === currentReview ? primary : "#cbd5e1" }} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========== FAQ TAB ========== */}
        {activeTab === "faq" && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><MessageSquare className="w-5 h-5" style={{ color: primary }} /></div>
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq: any, idx: number) => {
                const isOpen = expandedFaqs[idx];
                return (
                  <div key={idx} className={"rounded-xl overflow-hidden transition-all " + (isOpen ? "shadow-md bg-white" : "bg-slate-50 hover:bg-slate-100")}>
                    <button onClick={() => tog(setExpandedFaqs, idx)} className="w-full flex justify-between items-center p-5 text-left text-[0.95rem] font-semibold text-gray-900 transition-colors">
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-5 h-5 shrink-0 ml-4" style={{ color: primary }} /> : <ChevronDown className="w-5 h-5 shrink-0 ml-4 text-slate-400" />}
                    </button>
                    {isOpen && <div className="px-6 pb-5 bg-white"><p className="text-[0.95rem] text-gray-600 leading-relaxed">{faq.a}</p></div>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== COURSE INCLUDES ===== */}
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><CheckCircle2 className="w-5 h-5" style={{ color: primary }} /></div>
            <h2 className="text-2xl font-bold text-gray-900">This Course Includes</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { I: Video, t: totalDuration.replace("h ", " hours ") + " on-demand video" },
              { I: FileText, t: totalLectures + " lectures" },
              { I: Download, t: course.topics.length + " downloadable resources" },
              { I: Smartphone, t: "Access on mobile and TV" },
              { I: Infinity, t: "Full lifetime access" },
              { I: Trophy, t: "Certificate of completion" },
            ].map(({ I, t }: any) => (
              <div key={t} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
                <I className="w-5 h-5 shrink-0" style={{ color: primary }} />
                <span className="text-[0.9rem] text-gray-700 font-medium">{t}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== INSTRUCTOR + SHARE ROW ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="flex items-start gap-5 p-6 rounded-2xl bg-slate-50">
            <img alt="Instructor" className="w-20 h-20 rounded-2xl object-cover shadow-md" src={INSTRUCTOR.avatar} />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">{INSTRUCTOR.name}</h3>
              <p className="text-sm font-semibold" style={{ color: primary }}>{INSTRUCTOR.role}</p>
              <p className="text-[0.9rem] text-slate-500 mt-2 leading-relaxed line-clamp-2">{INSTRUCTOR.bio}</p>
              <div className="flex gap-6 mt-3">
                <span className="text-sm font-bold text-gray-900">{INSTRUCTOR.students} Students</span>
                <span className="text-sm font-bold text-gray-900">{INSTRUCTOR.courses} Courses</span>
                <span className="text-sm font-bold text-gray-900 flex items-center gap-1">{INSTRUCTOR.rating} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /></span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-50">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Share This Course</h3>
              <p className="text-[0.9rem] text-slate-500 mb-4">Share with friends who might benefit from this course.</p>
            </div>
            <div className="flex items-center gap-3">
              {[{ l: "f", bg: "#1877F2" }, { l: "X", bg: "#000" }, { l: "in", bg: "#0A66C2" }, { l: "WA", bg: "#25D366" }].map(({ l, bg }: any) => (
                <button key={l} className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold text-white transition-transform hover:scale-110 hover:shadow-lg" style={{ background: bg }}>{l}</button>
              ))}
              <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="w-11 h-11 rounded-xl bg-white text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <Link2 className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== NEED HELP ===== */}
        <div className="mt-8 p-8 rounded-2xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, " + primary + "0c, " + primary + "04)" }}>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Need help deciding?</h3>
              <p className="text-[0.95rem] text-gray-600">Talk to our course advisor and find the perfect course for your goals.</p>
            </div>
            <button className="text-white font-semibold py-3 px-8 rounded-xl text-[0.95rem] transition-all duration-200 hover:shadow-lg flex items-center gap-2.5 shrink-0" style={{ background: primary, boxShadow: "0 8px 24px " + primary + "40" }}>
              <Headset className="w-5 h-5" /> Contact Advisor
            </button>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-[0.05]">
            <Headset className="w-36 h-36" style={{ color: primary }} />
          </div>
        </div>
      </div>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-slate-50 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { I: Shield, t: "30-Day Money-Back Guarantee", d: "Full refund if you are not satisfied" },
              { I: RotateCcw, t: "Lifetime Access", d: "Learn at your own pace, forever" },
              { I: Lock, t: "Secure Payment", d: "100% secure checkout process" },
            ].map(({ I, t, d }: any) => (
              <div key={t} className="flex items-start gap-4 p-5 rounded-xl hover:bg-white transition-colors">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: primary + "12" }}><I className="w-6 h-6" style={{ color: primary }} /></div>
                <div>
                  <h4 className="font-bold text-gray-900">{t}</h4>
                  <p className="text-slate-500 mt-1.5">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
