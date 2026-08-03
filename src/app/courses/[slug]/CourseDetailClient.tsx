"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Clock,
  Users,
  BookOpen,
  CheckCircle2,
  Zap,
  Star,
  Play,
  Sparkles,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Globe,
  ShoppingCart,
  BarChart3,
  FileText,
  Layout,
  Code,
  Search,
  Target,
  Share2,
  Mail,
  PenTool,
  Mic,
  MessageCircle,
  Cloud,
  Shield,
  Activity,
  Utensils,
  PieChart,
  UsersRound,
  UserPlus,
  Smartphone,
  Layers,
  ShoppingBag,
  Box,
  Palette,
  Image as ImageIcon,
  GitBranch,
  FileCode,
  RefreshCw,
  Calendar,
  MapPin,
  Award,
  Infinity as InfinityIcon,
  Headphones,
  Briefcase,
  HelpCircle,
  Download,
  Terminal,
  Cpu,
  Bot,
  Binary,
  Check,
  Building2,
  Compass,
  Laptop,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import NextLink from "next/link";
import { ALL_COURSES } from "@/lib/course-data";
import type { CourseItem } from "@/lib/course-data";

/* ── Tech Icon Mapping ── */
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

type TechIconComponent = React.ComponentType<{ size?: number; color?: string }>;

const TECH_ICON_MAP: Record<string, TechIconComponent> = {
  Laravel: SiLaravel,
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  MySQL: SiMysql,
  Vercel: SiVercel,
  Docker: SiDocker,
  ChatGPT: SiOpenai,
  "OpenAI API": SiOpenai,
  "DALL-E": SiOpenai,
  "Hugging Face": SiOpenai,
  Python: SiPython,
  Flutter: SiFlutter,
  Dart: SiFlutter,
  Firebase: SiFirebase,
  "Google Cloud": SiGooglecloud,
  Figma: SiFigma,
  Framer: SiFramer,
  Notion: SiNotion,
  AWS: SiGooglecloud,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  Grafana: SiGrafana,
  Prometheus: SiPrometheus,
  Linux: SiLinux,
  Zapier: SiZapier,
  Slack: SiSlack,
  "Google Analytics": SiGoogleanalytics,
  "Google Ads": SiGoogleads,
  Canva: SiCanva,
  WordPress: SiWordpress,
  Blender: SiBlender,
};

/* ── Project Icons ── */
const PROJECT_ICONS: Record<string, React.ElementType> = {
  globe: Globe,
  "shopping-cart": ShoppingCart,
  "bar-chart": BarChart3,
  "file-text": FileText,
  layout: Layout,
  code: Code,
  search: Search,
  target: Target,
  "share-2": Share2,
  mail: Mail,
  "pen-tool": PenTool,
  mic: Mic,
  "message-circle": MessageCircle,
  cloud: Cloud,
  shield: Shield,
  activity: Activity,
  utensils: Utensils,
  "pie-chart": PieChart,
  users: UsersRound,
  "user-plus": UserPlus,
  smartphone: Smartphone,
  layers: Layers,
  "shopping-bag": ShoppingBag,
  box: Box,
  palette: Palette,
  image: ImageIcon,
};

/* ── FAQ Data ── */
const FAQ_DATA = [
  {
    q: "Do I need prior coding or technical experience to join?",
    a: "No prior experience is required! The curriculum is designed from scratch, starting with fundamental concepts and progressively building up to industry-level mastery.",
  },
  {
    q: "What hardware and software tools will I need?",
    a: "You only need a standard computer or laptop with at least 8GB RAM and a stable internet connection. All software tools, SDKs, and IDEs used in the course are free or open-source.",
  },
  {
    q: "Will I receive a verified certificate upon completion?",
    a: "Yes! Upon successfully completing the course modules and capstone project, you will receive a verified digital certificate that you can attach to your LinkedIn and resume.",
  },
  {
    q: "How many hours per week should I dedicate to learning?",
    a: "We recommend spending about 6 to 8 hours per week for optimal learning, including watching video lectures, completing hands-on exercises, and building capstone projects.",
  },
  {
    q: "Do I get lifetime access to course updates and materials?",
    a: "Absolutely. Enrolling gives you lifetime access to all current and future video lessons, code repositories, exercise templates, and community discussion channels.",
  },
  {
    q: "Is there 1-on-1 mentor guidance available?",
    a: "Yes! You will have direct access to senior mentors and industry software engineers for code reviews, doubt clearance, portfolio feedback, and interview prep.",
  },
  {
    q: "What kind of portfolio projects will I build?",
    a: "You will build 6 to 8 real-world, production-ready applications complete with full documentation, clean codebase, and live cloud deployment URL to showcase to employers.",
  },
  {
    q: "What if I am not satisfied with the course?",
    a: "We offer a 7-day money-back guarantee. If you feel the course doesn't match your expectations within the first week, you can request a 100% full refund.",
  },
];

/* ── Motion Helper ── */
const fadeUp = (delay = 0) => ({
  initial: { y: 15 },
  whileInView: { y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay },
});

/* ── Hero Vector Laptop Illustration ── */
function HeroLaptopSVG() {
  return (
    <svg viewBox="0 0 540 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-lg mx-auto">
      <defs>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>
        <linearGradient id="lidFrame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="aiCardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>

      {/* Ambient background glow */}
      <circle cx="270" cy="220" r="180" fill="#818CF8" opacity="0.12" />
      <circle cx="420" cy="140" r="90" fill="#C084FC" opacity="0.15" />
      <circle cx="120" cy="320" r="100" fill="#34D399" opacity="0.1" />

      {/* Grid Pattern Dots */}
      <g opacity="0.3">
        {Array.from({ length: 30 }).map((_, i) => {
          const r = Math.floor(i / 6);
          const c = i % 6;
          return <circle key={i} cx={400 + c * 18} cy={40 + r * 18} r="1.8" fill="#818CF8" />;
        })}
      </g>

      {/* Laptop Base Shadow */}
      <ellipse cx="270" cy="385" rx="210" ry="18" fill="#0F172A" opacity="0.12" />

      {/* Laptop Screen Body */}
      <rect x="110" y="80" width="320" height="230" rx="16" fill="url(#lidFrame)" stroke="#475569" strokeWidth="2" />
      <rect x="122" y="94" width="296" height="202" rx="8" fill="url(#screenGrad)" />

      {/* Laptop Screen Content - IDE & UI Mock */}
      <circle cx="136" cy="106" r="3.5" fill="#EF4444" />
      <circle cx="147" cy="106" r="3.5" fill="#F59E0B" />
      <circle cx="158" cy="106" r="3.5" fill="#10B981" />

      {/* Code Lines inside screen */}
      <rect x="136" y="122" width="90" height="8" rx="3" fill="#6366F1" opacity="0.8" />
      <rect x="136" y="136" width="140" height="6" rx="2" fill="#94A3B8" opacity="0.5" />
      <rect x="136" y="147" width="110" height="6" rx="2" fill="#94A3B8" opacity="0.35" />
      <rect x="136" y="158" width="160" height="6" rx="2" fill="#34D399" opacity="0.6" />

      {/* AI Center Badge on Screen */}
      <rect x="220" y="180" width="100" height="90" rx="16" fill="url(#aiCardGrad)" />
      <text x="270" y="238" textAnchor="middle" fontFamily="sans-serif" fontSize="36" fontWeight="900" fill="#FFFFFF">
        AI
      </text>

      {/* Laptop Keyboard Base */}
      <path d="M70,310 L470,310 L490,325 L50,325 Z" fill="#CBD5E1" />
      <path d="M50,325 L490,325 L480,335 L60,335 Z" fill="#94A3B8" />

      {/* Floating Graphic Pill 1: Code */}
      <g transform="translate(45, 110)">
        <rect width="100" height="64" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="30" cy="32" r="16" fill="#EEF2FF" />
        <text x="30" y="37" textAnchor="middle" fontFamily="monospace" fontSize="14" fontWeight="800" fill="#4F46E5">
          &lt;/&gt;
        </text>
        <rect x="54" y="24" width="36" height="6" rx="2" fill="#1E293B" />
        <rect x="54" y="35" width="28" height="5" rx="2" fill="#94A3B8" />
      </g>

      {/* Floating Graphic Pill 2: Analytics Chart */}
      <g transform="translate(390, 200)">
        <rect width="110" height="74" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="18" y="44" width="12" height="18" rx="3" fill="#818CF8" />
        <rect x="36" y="32" width="12" height="30" rx="3" fill="#F59E0B" />
        <rect x="54" y="24" width="12" height="38" rx="3" fill="#4F46E5" />
        <rect x="72" y="16" width="12" height="46" rx="3" fill="#10B981" />
      </g>

      {/* Floating Idea Bulb Badge */}
      <g transform="translate(410, 70)">
        <circle cx="28" cy="28" r="28" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="2" />
        <text x="28" y="36" textAnchor="middle" fontSize="24">
          💡
        </text>
      </g>
    </svg>
  );
}

// ─── Main Course Detail Component ──────────────────────────────────────────────

export default function CourseDetailClient({ course }: { course: CourseItem }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeModule, setActiveModule] = useState<number | null>(0);

  const tc = course.themeColor || "#6366F1";

  // Calculate learning path steps from topics with pastel styling matching reference image
  const learningSteps = [
    { num: "01", title: "Introduction to AI & ML", icon: Laptop, bg: "bg-purple-100/90 border-purple-200 text-purple-700", ring: "ring-purple-200" },
    { num: "02", title: "Prompt Engineering Mastery", icon: Code, bg: "bg-indigo-100/90 border-indigo-200 text-indigo-700", ring: "ring-indigo-200" },
    { num: "03", title: "LLM APIs (OpenAI, Claude)", icon: Cpu, bg: "bg-orange-100/90 border-orange-200 text-orange-700", ring: "ring-orange-200" },
    { num: "04", title: "RAG Pipelines & Vector DBs", icon: Binary, bg: "bg-sky-100/90 border-sky-200 text-sky-700", ring: "ring-sky-200" },
    { num: "05", title: "AI Agent Building", icon: Bot, bg: "bg-pink-100/90 border-pink-200 text-pink-700", ring: "ring-pink-200" },
    { num: "06", title: "Chatbot Development", icon: Layers, bg: "bg-violet-100/90 border-violet-200 text-violet-700", ring: "ring-violet-200" },
    { num: "07", title: "AI Automation Flows", icon: Shield, bg: "bg-emerald-100/90 border-emerald-200 text-emerald-700", ring: "ring-emerald-200" },
    { num: "08", title: "Ethics & Safety", icon: Cloud, bg: "bg-blue-100/90 border-blue-200 text-blue-700", ring: "ring-blue-200" },
  ];

  // Projects list
  const projectsList = course.projects.length >= 6 ? course.projects : [
    ...course.projects,
    {
      name: "SaaS Analytics Dashboard",
      description: "Build a real-time analytics portal with custom charting, user authentication, and data export.",
      icon: "bar-chart",
    },
    {
      name: "AI Email & Copywriting Assistant",
      description: "Smart text generation tool that composes professional marketing emails and social media posts.",
      icon: "mail",
    },
    {
      name: "Automated Workflow Engine",
      description: "Task automation platform connecting third-party webhooks, databases, and notification services.",
      icon: "activity",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      {/* ─── 0. Top Navigation Bar ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <NextLink href="/" className="flex items-center gap-2 text-slate-900 font-black text-lg">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-sm shadow-sm">
              LA
            </div>
            <span>Larawans Digital Academy</span>
          </NextLink>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <NextLink href="/" className="hover:text-indigo-600 transition-colors cursor-pointer">Home</NextLink>
            <NextLink href="/#services" className="hover:text-indigo-600 transition-colors">Services</NextLink>
            <NextLink href="/courses" className="text-indigo-600 font-extrabold border-b-2 border-indigo-600 pb-0.5">Courses</NextLink>
            <NextLink href="/#why-larawans" className="hover:text-indigo-600 transition-colors">About Us</NextLink>
            <NextLink href="/#portfolio" className="hover:text-indigo-600 transition-colors">Portfolio</NextLink>
            <NextLink href="/#contact" className="hover:text-indigo-600 transition-colors">Contact</NextLink>
          </nav>

          <NextLink
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors"
          >
            <span>Book Free Consultation</span>
            <ArrowRight size={14} />
          </NextLink>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* ─── 1. HERO SECTION ───────────────────────────────────────────────── */}
        <section className="relative rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <NextLink href="/" className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1 font-bold cursor-pointer">
                  <Home size={13} />
                  <span>Home</span>
                </NextLink>
                <span>/</span>
                <NextLink href="/courses" className="hover:text-indigo-600 transition-colors font-bold">
                  Courses
                </NextLink>
                <span>/</span>
                <span className="text-indigo-600 font-bold">{course.title}</span>
              </div>

              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200/60 px-3.5 py-1 text-xs font-bold text-indigo-700">
                <Sparkles size={14} />
                <span className="uppercase tracking-wider text-[11px]">{course.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {course.longDescription}
              </p>

              {/* Stats Bar Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <Clock size={18} className="text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{course.duration}</p>
                    <p className="text-[10px] text-slate-500 font-medium">Duration</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <BookOpen size={18} className="text-purple-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{course.modules} Modules</p>
                    <p className="text-[10px] text-slate-500 font-medium">Curriculum</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <Users size={18} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{course.students}</p>
                    <p className="text-[10px] text-slate-500 font-medium">Students</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <Star size={18} className="text-amber-500 fill-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">4.9 / 5.0</p>
                    <p className="text-[10px] text-slate-500 font-medium">Rating</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
                  <span>Enroll Now — {course.price}</span>
                  <ArrowRight size={16} />
                </button>

                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-50 border border-indigo-200 px-6 py-3.5 text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition-colors">
                  <Play size={16} className="fill-indigo-700" />
                  <span>Watch Preview</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Graphic Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroLaptopSVG />
            </div>
          </div>
        </section>

        {/* ─── 2. ABOUT THIS COURSE (EXPANDED & DETAILED) ───────────────────────── */}
        <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Detailed Course Narrative & Deep-Dive */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block pb-1 border-b-2 border-indigo-600">
                <h2 className="text-2xl font-black text-slate-900">About This Course</h2>
              </div>

              {/* Main Course Intro */}
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {course.aboutText}
              </p>

              {/* In-depth Skillset Breakdown */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles size={18} className="text-indigo-600" />
                  <span>Comprehensive & Industry-Driven Learning</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  In today's fast-evolving technology landscape, learning theoretical concepts alone is no longer enough to secure top tier engineering roles. The <strong>{course.title}</strong> curriculum is engineered in direct collaboration with lead software architects, CTOs, and senior product engineers. You won't just learn basic syntax; you will master enterprise design patterns, high-performance data structures, API orchestration, and modern cloud deployment pipelines.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Throughout this program, you will actively work with cutting-edge tools including <strong>{course.techStack.map((t) => t.name).join(", ")}</strong>. Starting from foundational building blocks, you will progressively tackle complex challenges such as scalability, state management, security protocols, and automated testing frameworks.
                </p>
              </div>

              {/* Practical Hands-on Strategy */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Target size={18} className="text-indigo-600" />
                  <span>Real-World Projects & Portfolio Strategy</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Every module in <strong>{course.title}</strong> culminates in hands-on coding assignments and real-world capstone projects. By the time you graduate, you will possess a verified GitHub portfolio featuring <strong>6+ production-ready applications</strong> deployed live on cloud platforms. This concrete proof of capability demonstrates to recruiters and hiring managers that you possess the practical experience needed to hit the ground running on day one.
                </p>
              </div>

              {/* Career Support & Mentorship */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Briefcase size={18} className="text-indigo-600" />
                  <span>Personalized 1-on-1 Mentorship & Career Support</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  You won't be learning in isolation. Our experienced industry mentors provide regular 1-on-1 code reviews, architectural feedback, and dedicated doubt clearance sessions. Additionally, our career service team guides you through resume engineering, LinkedIn profile optimization, salary negotiation, and technical mock interviews to ensure you land your dream job or land high-paying freelance clients.
                </p>
              </div>
            </div>

            {/* Right Column: Perfect For Card & Quick Course Specifications */}
            <div className="lg:col-span-5 space-y-6">
              {/* Perfect For Card */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <GraduationCap size={20} className="text-indigo-600 shrink-0" />
                  <h3 className="text-base font-black text-slate-900">Who This Course Is Perfect For</h3>
                </div>
                <ul className="space-y-3 text-xs font-semibold text-slate-700">
                  {[
                    "Students & Freshers aiming to land their first high-paying tech job",
                    "Working IT Professionals seeking rapid promotion or skill upgrades",
                    "Software Developers updating their stack to modern industry tools",
                    "Freelancers & Agencies wanting to deliver high-ticket client builds",
                    "Tech Founders & Entrepreneurs building their own SaaS startups",
                    "Career Switchers transitioning from non-tech backgrounds to IT",
                    "Anyone passionate about mastering software engineering & AI",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Course Specifications Box */}
              <div className="rounded-2xl bg-indigo-50/60 border border-indigo-100 p-6 space-y-3">
                <h3 className="text-xs font-black text-indigo-900 uppercase tracking-wider">
                  Course Specifications
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-indigo-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Skill Level</span>
                    <span className="font-extrabold text-slate-800">{course.level}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-indigo-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Duration</span>
                    <span className="font-extrabold text-slate-800">{course.duration}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-indigo-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Modules</span>
                    <span className="font-extrabold text-slate-800">{course.modules} Modules</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-indigo-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Language</span>
                    <span className="font-extrabold text-slate-800">English / Hindi</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-indigo-100 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Primary Learning Outcome</span>
                  <p className="font-bold text-slate-800 leading-snug">{course.outcome}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Pillars of Learning Grid */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-black text-slate-900 text-center mb-6">
              Core Pillars of the {course.title} Program
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-indigo-300 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-xs">
                  <Target size={20} />
                </div>
                <h4 className="text-xs font-extrabold text-slate-900">Industry-Aligned Syllabus</h4>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  Curriculum updated every quarter to match 2026 tech trends, enterprise standards, and hiring criteria.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-indigo-300 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white font-bold shadow-xs">
                  <Code size={20} />
                </div>
                <h4 className="text-xs font-extrabold text-slate-900">Production Capstone Projects</h4>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  Build 6+ real-world applications with clean code architecture, live cloud hosting, and full documentation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-indigo-300 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold shadow-xs">
                  <Users size={20} />
                </div>
                <h4 className="text-xs font-extrabold text-slate-900">1-on-1 Code Reviews</h4>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  Receive personalized feedback from senior software architects to eliminate bad coding habits.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-indigo-300 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white font-bold shadow-xs">
                  <Briefcase size={20} />
                </div>
                <h4 className="text-xs font-extrabold text-slate-900">Career & Placement Assistance</h4>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  Resume optimization, LinkedIn branding, mock interviews, and direct referrals to hiring partners.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Feature Badges below */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
            {[
              { icon: Users, label: "Beginner Friendly", desc: "No prior coding required" },
              { icon: Layers, label: "Hands-on Projects", desc: "Build real production apps" },
              { icon: GraduationCap, label: "Industry Mentors", desc: "1-on-1 feedback & reviews" },
              { icon: Award, label: "Verified Certificate", desc: "LinkedIn shareable badge" },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-2xs border border-indigo-100 shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{feat.label}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 3. WHAT YOU WILL LEARN (Numbered Process Path with Dotted Line & Pastel Circles) ────────────────── */}
        <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-2">What You Will Learn</h2>
          <p className="text-xs text-slate-500 font-medium mb-10 max-w-xl mx-auto">
            Step-by-step structured learning path designed to take you from core fundamentals to advanced application architecture.
          </p>

          {/* Process Nodes with Dotted Connector Line */}
          <div className="relative">
            {/* Dotted connecting line behind nodes on desktop */}
            <div className="hidden lg:block absolute top-7 left-10 right-10 h-0.5 border-t-2 border-dashed border-slate-200 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-4 relative z-10">
              {learningSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    <div className="relative mb-3">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.bg} border ${step.ring} group-hover:scale-110 transition-transform shadow-2xs`}>
                        <Icon size={24} />
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-400 mb-1 uppercase tracking-wider">
                      {step.num}
                    </span>
                    <h4 className="text-xs font-black text-slate-800 leading-snug max-w-[120px]">
                      {step.title}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 4. TECH STACK YOU WILL MASTER (Colorful Badges) ─────────────────── */}
        <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Tech Stack You Will Master</h2>
          <p className="text-xs text-slate-500 font-medium mb-8">
            Industry-standard frameworks, libraries, databases, and tools used by top tech companies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {course.techStack.map((tech) => {
              const IconComp = TECH_ICON_MAP[tech.name];
              return (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all group cursor-default shadow-2xs"
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${tech.color}18` }}
                  >
                    {IconComp ? (
                      <IconComp size={20} color={tech.color} />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tech.color }} />
                    )}
                  </div>
                  <span className="text-xs font-black text-slate-800 tracking-tight">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 5. REAL PROJECTS YOU WILL BUILD (Pastel Color Cards) ────────────────── */}
        <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">Real Projects You Will Build</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Gain practical hands-on experience by constructing industry-standard capstone applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectsList.map((proj, idx) => {
              const IconComponent = PROJECT_ICONS[proj.icon] || Code;
              const pastelStyles = [
                { bg: "bg-purple-50/80 border-purple-100", iconBg: "bg-purple-100 text-purple-700" },
                { bg: "bg-emerald-50/80 border-emerald-100", iconBg: "bg-emerald-100 text-emerald-700" },
                { bg: "bg-amber-50/80 border-amber-100", iconBg: "bg-amber-100 text-amber-700" },
                { bg: "bg-blue-50/80 border-blue-100", iconBg: "bg-blue-100 text-blue-700" },
                { bg: "bg-pink-50/80 border-pink-100", iconBg: "bg-pink-100 text-pink-700" },
                { bg: "bg-orange-50/80 border-orange-100", iconBg: "bg-orange-100 text-orange-700" },
                { bg: "bg-violet-50/80 border-violet-100", iconBg: "bg-violet-100 text-violet-700" },
                { bg: "bg-teal-50/80 border-teal-100", iconBg: "bg-teal-100 text-teal-700" },
              ];
              const style = pastelStyles[idx % pastelStyles.length];

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl ${style.bg} border hover:shadow-md transition-all group`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.iconBg} mb-4 group-hover:scale-110 transition-transform shadow-2xs`}>
                    <IconComponent size={22} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mb-1.5">{proj.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{proj.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 6. COMPLETE CURRICULUM (Expandable Modules) ──────────────────── */}
        <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Complete Course Curriculum</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Comprehensive step-by-step syllabus covering {course.modules} modules and hands-on exercises.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl shrink-0">
              {course.duration} Total Duration
            </span>
          </div>

          <div className="space-y-3">
            {course.topics.map((topic, idx) => {
              const isOpen = activeModule === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveModule(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-black shrink-0">
                        {idx + 1}
                      </span>
                      <span>{topic}</span>
                    </div>
                    {isOpen ? <ChevronUp size={18} className="text-indigo-600" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-4 pt-1 text-xs text-slate-600 space-y-2 border-t border-slate-200/60 bg-white"
                      >
                        <p className="font-semibold text-slate-700">In this module, you will cover:</p>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          <li>Theoretical foundations and core architecture principles</li>
                          <li>Guided code walkthroughs and interactive sandbox exercises</li>
                          <li>Building and deploying a mini-project for your portfolio</li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 7. WHY THIS COURSE STANDS OUT ──────────────────────────────────── */}
        <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Why This Course Stands Out</h2>
          <p className="text-xs text-slate-500 font-medium mb-8">
            Designed to maximize learning efficiency and career transformation.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100">
              <span className="text-3xl font-black text-indigo-600">80+</span>
              <span className="block text-xs font-bold text-slate-700 mt-1">Learning Hours</span>
            </div>
            <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-100">
              <span className="text-3xl font-black text-purple-600">30+</span>
              <span className="block text-xs font-bold text-slate-700 mt-1">Modules</span>
            </div>
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-100">
              <span className="text-3xl font-black text-amber-600">15+</span>
              <span className="block text-xs font-bold text-slate-700 mt-1">Assignments</span>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-3xl font-black text-emerald-600">8+</span>
              <span className="block text-xs font-bold text-slate-700 mt-1">Real Projects</span>
            </div>
          </div>
        </section>

        {/* ─── 8. FINAL CTA BANNER ────────────────────────────────────────────── */}
        <section
          className="relative rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl"
          style={{
            background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)",
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                Ready to start your journey in {course.title}?
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200 font-medium">
                Join {course.students} students and advance your career with job-ready tech skills.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-xs font-black text-indigo-950 shadow-md hover:bg-indigo-50 transition-colors">
                <span>Enroll Now — {course.price}</span>
                <ArrowRight size={15} />
              </button>

              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-5 py-3.5 text-xs font-bold text-white hover:bg-white/20 transition-colors">
                <Download size={15} />
                <span>Download Syllabus</span>
              </button>
            </div>
          </div>
        </section>

        {/* ─── 9. FREQUENTLY ASKED QUESTIONS ─────────────────────────────────── */}
        <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-all cursor-pointer hover:border-indigo-200"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{faq.q}</h3>
                    {isOpen ? <ChevronUp size={16} className="text-indigo-600 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
                  </div>
                  {isOpen && (
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium pt-2 border-t border-slate-200/60">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 10. RELATED COURSES ────────────────────────────────────────────── */}
        <section className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Explore Related Courses</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALL_COURSES.filter((c) => c.slug !== course.slug)
              .slice(0, 3)
              .map((rel) => (
                <NextLink
                  key={rel.slug}
                  href={`/courses/${rel.slug}`}
                  className="group rounded-2xl border border-slate-200 p-5 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{rel.emoji}</span>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md">
                        {rel.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 font-medium mb-4">
                      {rel.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-200/60">
                    <span className="font-black text-slate-900">{rel.price}</span>
                    <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Course <ArrowRight size={13} />
                    </span>
                  </div>
                </NextLink>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
