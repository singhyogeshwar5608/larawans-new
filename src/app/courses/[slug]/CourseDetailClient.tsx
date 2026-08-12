"use client";

import { useState, useEffect, useMemo, useRef, Fragment } from "react";
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
  Wallet,
  Globe,
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
  Eye,
  FolderOpen,
  Rocket,
  Lightbulb,
  MonitorSmartphone,
  Megaphone,
  Paintbrush,
  Gift,
  Send,
  ArrowRight,
  Compass,
  BookMarked,
  Footprints,
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
  const [expandedOverviewMods, setExpandedOverviewMods] = useState<Record<number, boolean>>({ 0: true });
  const [overviewExpandAll, setOverviewExpandAll] = useState(false);
  const [countdown, setCountdown] = useState({ days: 2, hours: 10, mins: 24, secs: 32 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  // Remove dark class from <html> for light-themed course page
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark');
    document.body.style.backgroundColor = '#ffffff';
    return () => {
      html.classList.add('dark');
      document.body.style.backgroundColor = '';
    };
  }, []);

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
    const fallbackTopics = [
      "Introduction & Core Concepts",
      "Hands-on Practice Exercises",
      "Real-world Case Studies",
      "Advanced Techniques & Best Practices",
      "Module Summary & Quiz",
    ];
    return Array.from({ length: mc }, (_, i) => {
      const lc = (i + 1) * 3 + 2;
      const tm = lc * 12 + i * 15;
      const sliced = course.topics.slice(i * tpm, (i + 1) * tpm).filter(Boolean);
      while (sliced.length < 5) sliced.push(fallbackTopics[sliced.length]);
      return {
        title: course.topics[i * tpm] || "Module " + (i + 1),
        lectures: lc,
        duration: Math.floor(tm / 60) + "h " + (tm % 60) + "m",
        topics: sliced,
      };
    });
  }, [course.modules, course.topics]);

  const totalLectures = curriculumModules.reduce((s, m) => s + m.lectures, 0);
  const totalMins = curriculumModules.reduce((s, m) => {
    const p = m.duration.match(/(\d+)h (\d+)m/);
    return s + parseInt(p?.[1] || "0") * 60 + parseInt(p?.[2] || "0");
  }, 0);
  const totalDuration = Math.floor(totalMins / 60) + "h " + (totalMins % 60) + "m";

  // Generate lecture data for overview curriculum
  const curriculumWithLectures = useMemo(() => {
    return curriculumModules.map((mod: any, mi: number) => {
      const lectures: { title: string; duration: string }[] = [];
      const topicList = mod.topics.filter(Boolean);
      topicList.forEach((topic: string, li: number) => {
        const mins = 8 + ((mi * 7 + li * 13) % 20);
        lectures.push({
          title: topic,
          duration: mins + ":" + String(((mi + li) * 7) % 60).padStart(2, "0"),
        });
      });
      return { ...mod, lectureItems: lectures };
    });
  }, [curriculumModules]);

  const roadmapPhases = useMemo(() => {
    const weeks = parseInt(course.duration) || 8;
    const phases = [
      {
        num: '01', title: 'Foundation', weeks: 'Week 1–2',
        desc: 'Build a strong foundation in AI, LLMs and prompt engineering basics.',
        outcomes: ['AI & LLM Fundamentals', 'How Prompts Work', 'Types of Prompts', 'Best Practices'],
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        num: '02', title: 'Prompting Skills', weeks: 'Week 3–4',
        desc: 'Learn core prompting techniques to get accurate and reliable AI responses.',
        outcomes: ['Zero-shot & Few-shot', 'Role Prompting', 'Chain-of-Thought', 'Context Engineering'],
        icon: <Brain className="w-5 h-5" />,
      },
      {
        num: '03', title: 'Advanced', weeks: 'Week 5–6',
        desc: 'Explore advanced prompting strategies and improve output quality.',
        outcomes: ['Advanced Techniques', 'Structured Output', 'Prompt Chaining', 'Evaluation & Optimization'],
        icon: <Zap className="w-5 h-5" />,
      },
      {
        num: '04', title: 'Projects', weeks: 'Week 7',
        desc: 'Apply your skills to real-world projects and solve practical problems.',
        outcomes: ['Hands-on Projects', 'AI Tools Integration', 'Workflow Automation', 'Project Optimization'],
        icon: <Code2 className="w-5 h-5" />,
      },
      {
        num: '05', title: 'Mastery', weeks: 'Week 8',
        desc: 'Master the art of prompt engineering and become industry ready.',
        outcomes: ['Capstone Project', 'Testing & Evaluation', 'Deployment', 'Career Preparation'],
        icon: <Trophy className="w-5 h-5" />,
      },
    ];
    return { phases, weeks, phaseCount: phases.length };
  }, [course.duration]);

  const projectsData = [
    {
      num: '01', title: 'AI Content Generator', difficulty: 'Beginner', diffColor: '#10B981', diffBg: '#ECFDF5',
      desc: 'Build an AI-powered content generator that creates blog posts, social media captions, and marketing content.',
      tools: ['ChatGPT', 'LangChain', 'Streamlit'], duration: '4–6 Hours', accent: '#10B981',
      visualBg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
    },
    {
      num: '02', title: 'Customer Support AI Assistant', difficulty: 'Intermediate', diffColor: '#8B5CF6', diffBg: '#F5F3FF',
      desc: 'Create an intelligent customer support assistant that can understand queries and provide accurate responses.',
      tools: ['OpenAI API', 'Pinecone', 'FastAPI'], duration: '6–8 Hours', accent: '#8B5CF6',
      visualBg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
    },
    {
      num: '03', title: 'AI Research Assistant', difficulty: 'Intermediate', diffColor: '#3B82F6', diffBg: '#EFF6FF',
      desc: 'Develop a research assistant that can analyze topics, summarize information, and provide source-backed insights.',
      tools: ['LangChain', 'Web Search', 'OpenAI'], duration: '6–10 Hours', accent: '#3B82F6',
      visualBg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    },
    {
      num: '04', title: 'Automated Marketing Workflow', difficulty: 'Advanced', diffColor: '#F59E0B', diffBg: '#FFF7ED',
      desc: 'Build an end-to-end automated marketing workflow using AI for content creation, audience analysis, and automation.',
      tools: ['Make.com', 'OpenAI API', 'Airtable'], duration: '8–12 Hours', accent: '#F59E0B',
      visualBg: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)',
    },
  ];

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
    <div className="min-h-screen bg-white text-gray-900 antialiased" style={{ fontFamily: "'Poppins', sans-serif" }}>
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
                <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.06),0_0_12px_rgba(0,0,0,0.08)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.1),0_0_18px_rgba(0,0,0,0.12)] hover:border-slate-300 transition-all cursor-default">
                  <Code2 className="w-4 h-4 text-emerald-500" /> Practical Projects
                </span>
                <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.06),0_0_12px_rgba(0,0,0,0.08)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.1),0_0_18px_rgba(0,0,0,0.12)] hover:border-slate-300 transition-all cursor-default">
                  <Briefcase className="w-4 h-4 text-violet-500" /> Industry Tools
                </span>
                <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.06),0_0_12px_rgba(0,0,0,0.08)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.1),0_0_18px_rgba(0,0,0,0.12)] hover:border-slate-300 transition-all cursor-default">
                  <Award className="w-4 h-4 text-emerald-500" /> Certificate
                </span>
                <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.06),0_0_12px_rgba(0,0,0,0.08)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.1),0_0_18px_rgba(0,0,0,0.12)] hover:border-slate-300 transition-all cursor-default">
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
      <div className="bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.1)] relative overflow-hidden">
            {/* Thin green accent at top */}
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #10B981, #10B981aa, #10B981)" }} />

            {/* LEFT — Pricing */}
            <div className="flex items-center gap-6 px-7 py-6 lg:py-7 w-full lg:w-auto">
              {/* Discount Badge */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-emerald-100">
                <Eye className="w-3.5 h-3.5" /> {discount}% OFF
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-[2rem] lg:text-[2.25rem] font-extrabold text-gray-900 leading-none">{course.price}</span>
                  <span className="text-lg text-slate-400 line-through font-medium">{originalPrice}</span>
                </div>
                <p className="text-[13px] text-red-500 font-semibold mt-1.5 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> Limited Time Offer!
                </p>
              </div>
            </div>

            {/* Vertical separator */}
            <div className="hidden lg:block w-px h-16 bg-slate-100" />

            {/* CENTER — Countdown */}
            <div className="flex flex-col items-center gap-3 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-slate-200" />
                <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Offer ends in</span>
                <div className="h-px w-8 bg-slate-200" />
              </div>
              <div className="flex gap-2.5">
                {["Days", "Hours", "Mins", "Secs"].map((label, i) => {
                  const val = [countdown.days, countdown.hours, countdown.mins, countdown.secs][i];
                  return (
                    <div key={label} className="text-center bg-indigo-50/70 rounded-xl px-3.5 py-2.5 min-w-[58px] border border-indigo-100/60">
                      <div className="text-xl font-extrabold text-indigo-600 font-mono leading-none">{pad(val)}</div>
                      <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-medium">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vertical separator */}
            <div className="hidden lg:block w-px h-16 bg-slate-100" />

            {/* RIGHT — CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 px-7 py-6 lg:py-7 w-full lg:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white font-bold text-[0.95rem] py-3.5 px-8 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200/60 active:scale-[0.98]" style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}>
                <Zap className="w-5 h-5" /> Enroll Now
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-[0.95rem] py-3.5 px-8 rounded-xl transition-all duration-200 hover:shadow-md active:scale-[0.98] text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50">
                <ShoppingCart className="w-4.5 h-4.5" /> Add to Cart
              </button>
              <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                <Shield className="w-3.5 h-3.5" /> 30-Day Money Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== TABS + CONTENT (FULL WIDTH) ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
            {/* Course Description */}
            <section>
              <div className="rounded-2xl p-8 sm:p-10 relative overflow-hidden bg-white" style={{ border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 6px 32px rgba(0,0,0,0.1)', fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

                {/* Decorative SVGs */}
                <svg className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-[0.04]" viewBox="0 0 200 200"><circle cx="150" cy="50" r="120" fill="#10B981"/><circle cx="180" cy="150" r="80" fill="#8B5CF6"/></svg>
                <svg className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none opacity-[0.03]" viewBox="0 0 200 200"><circle cx="50" cy="150" r="100" fill="#3B82F6"/></svg>
                <svg className="absolute top-8 right-8 pointer-events-none opacity-[0.06]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <svg className="absolute bottom-6 right-12 pointer-events-none opacity-[0.05]" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>

                {/* Section Header */}
                <div className="flex items-center gap-3.5 mb-7 relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)' }}>
                    <BookOpen className="w-5.5 h-5.5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-[1.4rem] font-bold text-gray-900 leading-tight" style={{ letterSpacing: '-0.02em' }}>Course Description</h2>
                    <div className="w-10 h-[3px] rounded-full mt-1.5" style={{ background: 'linear-gradient(90deg, #10B981, #059669)' }} />
                  </div>
                </div>

                {/* Description Body */}
                <div className="space-y-5 leading-[1.8] text-[0.975rem] text-slate-600 relative z-10">
                  <p>{course.longDescription}</p>
                  <p>{course.aboutText}</p>
                </div>
              </div>
            </section>

            {/* ===== COURSE CURRICULUM (OVERVIEW) ===== */}
            <section>
              <div className="rounded-2xl p-5 sm:p-6 bg-white" style={{ border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 6px 32px rgba(0,0,0,0.1)' }}>

                {/* Compact Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-[1.15rem] font-bold text-gray-900 leading-tight">Course Curriculum</h2>
                      <div className="w-8 h-[2.5px] rounded-full bg-emerald-500 mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {[
                      { v: curriculumWithLectures.length + ' Modules', bg: '#ECFDF5', color: '#059669' },
                      { v: totalLectures + ' Lectures', bg: '#F5F3FF', color: '#7C3AED' },
                      { v: totalDuration, bg: '#FFF7ED', color: '#D97706' },
                    ].map((s: any, si: number) => (
                      <span key={si} className="text-[0.72rem] font-semibold px-3 py-1.5 rounded-full" style={{ background: s.bg, color: s.color }}>{s.v}</span>
                    ))}
                  </div>
                </div>

                {/* Compact Module Rows */}
                <div className="space-y-[10px]">
                  {curriculumWithLectures.map((mod: any, idx: number) => {
                    const isExpanded = !!expandedOverviewMods[idx];
                    const colors = ['#10B981','#8B5CF6','#3B82F6','#F59E0B','#EC4899','#14B8A6','#7C3AED','#D97706','#06B6D4'];
                    const numColor = colors[idx % colors.length];
                    return (
                      <div key={idx} className="rounded-lg overflow-hidden transition-all duration-200 bg-white"
                        style={{
                          border: isExpanded ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(0,0,0,0.05)',
                          boxShadow: isExpanded ? '0 2px 8px rgba(16,185,129,0.06)' : 'none',
                        }}
                      >
                        <button
                          onClick={() => setExpandedOverviewMods((prev: any) => { const next = prev[idx] ? {} : { [idx]: true }; return next; })}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left"
                        >
                          {/* Number Badge */}
                          <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 text-[0.75rem] font-bold text-white"
                            style={{ background: numColor }}
                          >
                            {String(idx + 1).padStart(2, '0')}
                          </div>
                          {/* Title + Subtitle */}
                          <div className="flex-1 min-w-0">
                            <div className="text-[0.88rem] font-semibold text-gray-900 leading-tight truncate">{mod.title}</div>
                            {mod.topics[1] && <div className="text-[0.73rem] text-gray-400 mt-0.5 truncate">{mod.topics[1]}</div>}
                          </div>
                          {/* Right Meta */}
                          <div className="flex items-center gap-2.5 shrink-0">
                            <span className="text-[0.68rem] font-semibold px-2.5 py-1 rounded-full" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                              {mod.lectures} Lectures
                            </span>
                            <span className="text-[0.75rem] text-gray-400 font-medium hidden sm:block">{mod.duration}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} style={{ color: isExpanded ? '#059669' : '#9CA3AF' }} />
                          </div>
                        </button>

                        {/* Expanded Topics — compact */}
                        {isExpanded && (
                          <div className="px-4 pb-3 pt-0">
                            <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                              {(mod.topics || []).filter(Boolean).map((topic: string, ti: number) => (
                                <div key={ti} className="flex items-center gap-2.5 py-1.5">
                                  <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                                  <span className="text-[0.8rem] text-gray-600 leading-snug">{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            {/* ===== LEARNING JOURNEY / COURSE ROADMAP ===== */}
            <section className="-mx-5 sm:mx-0">
              <div className="sm:rounded-2xl px-6 py-8 sm:px-10 sm:py-10" style={{ background: '#FAFBFF', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
                  <div>
                    <h2 className="text-[1.35rem] font-bold text-gray-900 leading-tight">Learning Journey / Course Roadmap</h2>
                    <p className="text-[0.85rem] text-gray-500 mt-1.5 leading-relaxed">Your structured learning path to master the course step by step.</p>
                  </div>
                  <span className="text-[0.78rem] font-semibold px-4 py-2 rounded-full shrink-0" style={{ background: '#EDE9FE', color: '#6366F1' }}>{roadmapPhases.weeks} Weeks • {roadmapPhases.phaseCount} Phases • Hands-on Learning</span>
                </div>

                {/* Horizontal Stepper — hidden on mobile */}
                <div className="hidden md:flex items-start justify-between mb-10 px-2">
                  {roadmapPhases.phases.map((phase: any, i: number) => {
                    const isActive = i === 0;
                    return (
                      <Fragment key={i}>
                        <div className="flex flex-col items-center" style={{ flex: '1 1 0%' }}>
                          {/* Circle */}
                          <div className="relative mb-2">
                            <div className="w-11 h-11 rounded-full flex items-center justify-center text-[0.82rem] font-bold transition-all"
                              style={{
                                background: isActive ? '#10B981' : '#F3F0FF',
                                color: isActive ? '#fff' : '#7C3AED',
                                boxShadow: isActive ? '0 0 0 4px rgba(16,185,129,0.15)' : 'none',
                              }}
                            >{phase.num}</div>
                            {isActive && <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-emerald-500" />}
                          </div>
                          {/* Title & Week */}
                          <div className="text-center">
                            <div className="text-[0.82rem] font-bold" style={{ color: isActive ? '#059669' : '#374151' }}>{phase.title}</div>
                            <div className="text-[0.72rem] text-gray-400 mt-0.5">{phase.weeks}</div>
                          </div>
                        </div>
                        {/* Dotted connector */}
                        {i < roadmapPhases.phases.length - 1 && (
                          <div className="flex-1 flex items-center justify-center pt-5" style={{ minWidth: '40px' }}>
                            <div className="w-full" style={{ borderTop: '2px dotted #D1D5DB' }} />
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
                </div>

                {/* Mobile Vertical Stepper */}
                <div className="md:hidden mb-8">
                  {roadmapPhases.phases.map((phase: any, i: number) => {
                    const isActive = i === 0;
                    return (
                      <div key={i} className="flex items-center gap-4 mb-1">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-[0.78rem] font-bold"
                            style={{ background: isActive ? '#10B981' : '#F3F0FF', color: isActive ? '#fff' : '#7C3AED' }}
                          >{phase.num}</div>
                          {i < roadmapPhases.phases.length - 1 && <div className="w-0.5 h-6 my-1" style={{ background: 'repeating-linear-gradient(to bottom, #D1D5DB 0 3px, transparent 3px 6px)' }} />}
                        </div>
                        <div>
                          <div className="text-[0.85rem] font-bold" style={{ color: isActive ? '#059669' : '#374151' }}>{phase.title}</div>
                          <div className="text-[0.75rem] text-gray-400">{phase.weeks}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Roadmap Cards */}
                <div className="flex gap-3 mb-10 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {roadmapPhases.phases.map((phase: any, i: number) => {
                    const isActive = i === 0;
                    return (
                      <Fragment key={i}>
                        <div className="rounded-xl p-5 transition-all duration-200 hover:shadow-lg shrink-0 w-[85%] sm:w-full lg:w-auto snap-start"
                          style={{
                            background: '#FFFFFF',
                            border: isActive ? '1.5px solid rgba(16,185,129,0.35)' : '1px solid rgba(0,0,0,0.06)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            flex: '1 1 0%',
                            minWidth: '200px',
                          }}
                        >
                          {/* Icon + Week badge */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ background: isActive ? '#ECFDF5' : '#F3F0FF', color: isActive ? '#059669' : '#7C3AED' }}
                            >{phase.icon}</div>
                            <span className="text-[0.7rem] font-semibold px-2.5 py-1 rounded-full"
                              style={{ background: isActive ? '#ECFDF5' : '#F3F0FF', color: isActive ? '#059669' : '#7C3AED' }}
                            >{phase.weeks}</span>
                          </div>
                          {/* Title */}
                          <h3 className="text-[0.95rem] font-bold text-gray-900 mb-1.5">{phase.title}</h3>
                          {/* Desc */}
                          <p className="text-[0.8rem] text-gray-500 leading-relaxed mb-3">{phase.desc}</p>
                          {/* Divider */}
                          <div className="mb-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} />
                          {/* Outcomes */}
                          <div className="space-y-2">
                            {phase.outcomes.map((o: string, oi: number) => (
                              <div key={oi} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: '#10B981' }} />
                                <span className="text-[0.78rem] text-gray-600 leading-snug">{o}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Arrow between cards — desktop only */}
                        {i < roadmapPhases.phases.length - 1 && (
                          <div className="hidden lg:flex items-center shrink-0">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center"
                              style={{ background: '#F3F0FF' }}
                            >
                              <ArrowRight className="w-3.5 h-3.5" style={{ color: '#7C3AED' }} />
                            </div>
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
                </div>

                {/* Bottom Benefit Strip */}
                <div className="rounded-xl overflow-x-auto lg:overflow-visible no-scrollbar" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div className="flex lg:flex-row" style={{ minWidth: 'max-content' }}>
                    {[
                      { I: Footprints, t: 'Step-by-Step Learning', d: 'Follow a structured path designed for effective learning.', color: '#10B981', bg: '#ECFDF5' },
                      { I: Handshake, t: 'Practical & Hands-on', d: 'Work on real projects and build practical skills.', color: '#3B82F6', bg: '#EFF6FF' },
                      { I: BarChart3, t: 'Track Your Progress', d: 'Track milestones and measure your growth.', color: '#8B5CF6', bg: '#F5F3FF' },
                      { I: Rocket, t: 'Industry Ready', d: 'Build in-demand skills and advance your career.', color: '#F59E0B', bg: '#FFF7ED' },
                    ].map((b: any, bi: number) => (
                      <Fragment key={bi}>
                        <div className="flex items-center gap-3.5 px-6 py-5 flex-1 shrink-0 w-[200px] lg:w-auto">
                          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: b.bg }}>
                            <b.I className="w-5 h-5" style={{ color: b.color }} />
                          </div>
                          <div>
                            <div className="text-[0.88rem] font-bold text-gray-900 leading-tight">{b.t}</div>
                            <div className="text-[0.78rem] text-gray-500 mt-0.5 leading-relaxed">{b.d}</div>
                          </div>
                        </div>
                        {bi < 3 && <div className="hidden lg:block" style={{ borderLeft: '1px solid rgba(0,0,0,0.06)', alignSelf: 'stretch' }} />}
                      </Fragment>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* What You Will Learn */}
            <section>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.1)] p-8 sm:p-10">
                {/* Section Header */}
                <div className="flex items-center gap-3.5 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Target className="w-5.5 h-5.5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-[1.4rem] font-bold text-gray-900 leading-tight">What You Will Learn</h2>
                    <div className="w-10 h-[3px] rounded-full bg-emerald-500 mt-1.5" />
                  </div>
                </div>
                {/* Learning Outcomes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.topics.map((tp: string, i: number) => (
                    <div key={i} className="flex items-center gap-3.5 bg-white rounded-lg px-4 py-2.5 transition-all duration-200" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-[0.925rem] text-slate-700 font-medium leading-[1.25]">{tp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Course Highlights */}
            <section>
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.07)] relative overflow-hidden">
                {/* Dot grid pattern - top right */}
                <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, #2563eb 2px, transparent 2px)', backgroundSize: '14px 14px', backgroundPosition: '0 0' }} />
                {/* Subtle gradient overlay top-right */}
                <div className="absolute top-0 right-0 w-56 h-56 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(37,99,235,0.06) 0%, transparent 70%)' }} />
                
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-7 px-8 sm:px-10 pt-8 relative">
                  <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Sparkle className="w-5 h-5 text-white" fill="white" />
                  </div>
                  <div>
                    <h2 className="text-[1.35rem] font-bold text-gray-900 leading-tight">Course Highlights</h2>
                    <div className="w-10 h-[3px] rounded-full bg-blue-600 mt-1.5" />
                  </div>
                </div>

                {/* Grid */}
                <style>{`
                  .hl-item { border-right: 1px solid rgba(0,0,0,0.08); }
                  .hl-item:nth-child(2) { border-right: 1px solid rgba(0,0,0,0.08); }
                  .hl-item:nth-child(4n) { border-right: none; }
                  @media (min-width: 640px) and (max-width: 1023px) {
                    .hl-item:nth-child(odd) { border-right: 1px solid rgba(0,0,0,0.08); }
                    .hl-item:nth-child(even) { border-right: none; }
                  }
                `}</style>
                <div className="grid grid-cols-2 lg:grid-cols-4 relative">
                  {course.highlights.map((h: any, i: number) => {
                    const cfg = [
                      { I: FolderOpen, color: '#2563eb', bg: '#2563eb' },
                      { I: BookOpen, color: '#8b5cf6', bg: '#8b5cf6' },
                      { I: Clock, color: '#10b981', bg: '#10b981' },
                      { I: Award, color: '#f59e0b', bg: '#f59e0b' },
                    ][i % 4];
                    const Ic = cfg.I;
                    return (
                      <div key={i} className="hl-item flex flex-col items-center text-center px-6 py-7">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: cfg.bg }}>
                          <Ic className="w-6 h-6 text-white" strokeWidth={1.8} />
                        </div>
                        <div className="text-[1.75rem] font-extrabold leading-none mb-1.5" style={{ color: cfg.color }}>{h.value}</div>
                        <div className="text-[0.85rem] text-gray-700 font-semibold">{h.label}</div>
                        <div className="text-[0.78rem] text-gray-400 mt-1 leading-relaxed">{h.value === 'Included' ? 'On completion' : 'Comprehensive coverage'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Feature Cards */}
            <section>
              <div className="rounded-2xl shadow-[0_-1px_0_0_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.08),0_1px_0_0_rgba(0,0,0,0.04)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #faf5ff 100%)' }}>
                {[
                  { I: Laptop, t: "Hands-on Projects", d: "Build real-world apps", color: "#10b981", bg: "#ecfdf5" },
                  { I: Briefcase, t: "Job Ready Skills", d: "Industry-relevant tools", color: "#3b82f6", bg: "#eff6ff" },
                  { I: GraduationCap, t: "Expert Guidance", d: "Learn from industry pros", color: "#8b5cf6", bg: "#f5f3ff" },
                  { I: Handshake, t: "Career Support", d: "Resume and interview help", color: "#f97316", bg: "#fff7ed" },
                ].map(({ I, t, d, color, bg }: any, idx: number) => (
                  <div key={t} className={`group p-6 lg:p-7 transition-all duration-300 hover:bg-gray-50/50 ${idx < 3 ? 'lg:border-r' : ''} ${idx < 2 ? 'sm:border-r' : ''}`} style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: bg }}><I className="w-6 h-6" style={{ color }} /></div>
                    <h4 className="font-bold text-gray-900 text-[0.95rem]">{t}</h4>
                    <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{d}</p>
                    <div className="w-8 h-[3px] rounded-full mt-4" style={{ background: color }} />
                  </div>
                ))}
              </div>
            </section>

            {/* Tech Stack */}
            <section>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.05)] p-8 sm:p-10">
                <div className="flex items-center gap-3.5 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Code2 className="w-5.5 h-5.5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-[1.4rem] font-bold text-gray-900 leading-tight">Tech Stack You Will Master</h2>
                    <div className="w-10 h-[3px] rounded-full bg-emerald-500 mt-1.5" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {course.techStack.filter((t: any) => t.name !== "Midjourney").map((tech: any, i: number) => {
                    const slugMap: Record<string, string> = {
                      "Laravel": "laravel", "React": "react", "Next.js": "nextdotjs",
                      "TypeScript": "typescript", "Tailwind CSS": "tailwindcss", "MySQL": "mysql",
                      "Vercel": "vercel", "Docker": "docker", "ChatGPT": "openai",
                      "LangChain": "langchain", "Python": "python",
                      "OpenAI API": "openai", "DALL-E": "openai", "Hugging Face": "huggingface",
                      "Node.js": "nodedotjs", "MongoDB": "mongodb", "Redis": "redis",
                      "GraphQL": "graphql", "Git": "git", "GitHub": "github",
                      "AWS": "amazonaws", "Firebase": "firebase", "Figma": "figma",
                      "Flutter": "flutter", "Swift": "swift", "Kotlin": "kotlin",
                    };
                    const slug = slugMap[tech.name] || tech.name.toLowerCase().replace(/[^a-z0-9]/g, "");
                    const iconUrl = `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@latest/icons/${slug}.svg`;
                    return (
                      <div key={i} className="inline-flex items-center gap-2.5 rounded-full pl-1.5 pr-4 py-1.5 transition-all duration-200 border hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]" style={{ background: tech.color + "10", borderColor: tech.color + "30" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = tech.color + "20" }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = tech.color + "10" }}>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: tech.color + "20" }}>
                          <div className="w-4 h-4" style={{ backgroundColor: tech.color, WebkitMaskImage: `url(${iconUrl})`, maskImage: `url(${iconUrl})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
                        </div>
                        <span className="text-[0.875rem] font-semibold" style={{ color: tech.color }}>{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

                        {/* ===== PROJECTS YOU'LL BUILD ===== */}
            <section>
              <div className="rounded-2xl p-8 sm:p-10" style={{ background: '#FAFBFF', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h2 className="text-[1.35rem] font-bold text-gray-900 leading-tight">Projects You'll Build</h2>
                    </div>
                    <p className="text-[0.85rem] text-gray-500 leading-relaxed ml-14">Apply your learning with real-world projects and build a strong portfolio that showcases your AI Prompt Engineering skills.</p>
                  </div>
                  <span className="text-[0.78rem] font-semibold px-4 py-2 rounded-full shrink-0 flex items-center gap-2" style={{ background: '#EDE9FE', color: '#6366F1' }}>
                    <Sparkle className="w-3.5 h-3.5" />
                    Hands-on • Practical • Portfolio Ready
                  </span>
                </div>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                  {projectsData.map((p, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg"
                      style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                    >
                      {/* Visual Preview Area */}
                      <div className="relative h-40 p-4 flex items-center justify-center" style={{ background: p.visualBg }}>
                        {/* Difficulty badge */}
                        <span className="absolute top-3 left-3 text-[0.68rem] font-semibold px-2.5 py-1 rounded-full" style={{ background: p.diffBg, color: p.diffColor }}>{p.difficulty}</span>
                        {/* Visual Illustration */}
                        <div className="w-4/5 h-3/4 rounded-xl bg-white/70 backdrop-blur flex items-center justify-center" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                          {i === 0 && <div className="flex flex-col gap-2 w-[85%]">
                            <div className="h-2.5 rounded-full" style={{ background: p.accent + '40', width: '70%' }} />
                            <div className="h-2 rounded-full" style={{ background: '#E5E7EB', width: '100%' }} />
                            <div className="h-2 rounded-full" style={{ background: '#E5E7EB', width: '85%' }} />
                            <div className="h-2 rounded-full" style={{ background: '#E5E7EB', width: '60%' }} />
                            <div className="flex gap-1.5 mt-1"><div className="h-5 w-14 rounded-md" style={{ background: p.accent + '25' }} /><div className="h-5 w-14 rounded-md" style={{ background: p.accent + '15' }} /></div>
                          </div>}
                          {i === 1 && <div className="flex flex-col gap-2 w-[85%]">
                            <div className="h-2.5 rounded-full" style={{ background: p.accent + '40', width: '55%' }} />
                            <div className="flex gap-2 items-end"><div className="h-8 w-2/3 rounded-lg" style={{ background: p.accent + '15' }} /><div className="h-8 w-2/3 rounded-lg self-end" style={{ background: '#F3F4F6' }} /></div>
                            <div className="h-5 w-1/2 rounded-md" style={{ background: '#E5E7EB' }} />
                          </div>}
                          {i === 2 && <div className="flex flex-col gap-2 w-[85%]">
                            <div className="h-6 rounded-lg flex items-center px-2 gap-1.5" style={{ background: '#F3F4F6' }}><div className="w-3 h-3 rounded-full" style={{ background: '#D1D5DB' }} /><div className="h-2 rounded-full" style={{ background: '#D1D5DB', width: '60%' }} /></div>
                            <div className="h-3 rounded-full" style={{ background: p.accent + '30', width: '80%' }} />
                            <div className="h-3 rounded-full" style={{ background: '#E5E7EB', width: '90%' }} />
                            <div className="h-3 rounded-full" style={{ background: '#E5E7EB', width: '50%' }} />
                          </div>}
                          {i === 3 && <div className="flex items-center gap-3 w-[85%]">
                            <div className="flex flex-col items-center gap-1"><div className="w-8 h-8 rounded-lg" style={{ background: p.accent + '30' }} /><div className="h-2 rounded-full" style={{ background: '#D1D5DB', width: '28px' }} /></div>
                            <ArrowRight className="w-4 h-4 text-gray-300" />
                            <div className="flex flex-col items-center gap-1"><div className="w-8 h-8 rounded-lg" style={{ background: p.accent + '20' }} /><div className="h-2 rounded-full" style={{ background: '#D1D5DB', width: '28px' }} /></div>
                            <ArrowRight className="w-4 h-4 text-gray-300" />
                            <div className="flex flex-col items-center gap-1"><div className="w-8 h-8 rounded-lg" style={{ background: p.accent + '15' }} /><div className="h-2 rounded-full" style={{ background: '#D1D5DB', width: '28px' }} /></div>
                          </div>}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[0.85rem] font-bold" style={{ color: p.accent }}>{p.num}</span>
                          <h3 className="text-[1rem] font-bold text-gray-900 leading-tight">{p.title}</h3>
                        </div>
                        <p className="text-[0.8rem] text-gray-500 leading-relaxed mb-3">{p.desc}</p>
                        {/* Tools */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.tools.map((t, ti) => (
                            <span key={ti} className="text-[0.7rem] font-medium px-2.5 py-1 rounded-full" style={{ background: '#F3F4F6', color: '#4B5563' }}>{t}</span>
                          ))}
                        </div>
                        {/* Divider */}
                        <div className="mb-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} />
                        {/* Duration + View Details */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-[0.78rem] font-medium text-gray-500">{p.duration}</span>
                          </div>
                          <span className="text-[0.78rem] font-semibold flex items-center gap-1 transition-colors" style={{ color: p.accent }}>
                            View Details <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Feature Cards + Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  {[
                    { I: Trophy, t: 'Build Real Projects', d: 'Hands-on projects to strengthen your portfolio and practical skills.', color: '#10B981', bg: '#ECFDF5', border: 'rgba(16,185,129,0.2)' },
                    { I: Briefcase, t: 'Industry Relevant', d: 'Projects designed for real-world industry use cases.', color: '#3B82F6', bg: '#EFF6FF', border: 'rgba(59,130,246,0.2)' },
                    { I: BarChart3, t: 'Portfolio Ready', d: 'Showcase your work and stand out in the job market.', color: '#8B5CF6', bg: '#F5F3FF', border: 'rgba(139,92,246,0.2)' },
                  ].map((f: any, fi: number) => (
                    <div key={fi} className="rounded-xl p-5 transition-all duration-200 hover:shadow-md" style={{ background: '#FFFFFF', border: '1px solid ' + f.border, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: f.bg }}>
                        <f.I className="w-5 h-5" style={{ color: f.color }} />
                      </div>
                      <div className="text-[0.92rem] font-bold text-gray-900 leading-tight mb-1">{f.t}</div>
                      <div className="text-[0.8rem] text-gray-500 leading-relaxed">{f.d}</div>
                    </div>
                  ))}
                </div>

                {/* Stats Bar */}
                <div className="rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 sm:gap-16 px-6 py-5" style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 50%, #EFF6FF 100%)', border: '1px solid rgba(16,185,129,0.1)' }}>
                  <div className="text-center">
                    <div className="text-[1.6rem] font-extrabold" style={{ color: '#059669' }}>4</div>
                    <div className="text-[0.78rem] text-gray-500 font-medium">Practical Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[1.6rem] font-extrabold" style={{ color: '#059669' }}>24–36</div>
                    <div className="text-[0.78rem] text-gray-500 font-medium">Hands-on Learning</div>
                  </div>
                </div>

              </div>
            </section>
            {/* Who This Course Is For */}
            <section>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.03)] p-7 sm:p-8 relative overflow-hidden">
                {/* Decorative dots top-right */}
                <div className="absolute top-3 right-3 w-20 h-20 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #6b7280 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-[1.375rem] font-bold text-gray-900 leading-tight">Who This Course Is For</h2>
                  </div>
                  <div className="w-12 h-1 rounded-full bg-emerald-500 mb-6 ml-[52px]" />

                  {/* List */}
                  <div className="space-y-4 relative pl-1">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[18px] top-3 bottom-3 w-[2px] bg-emerald-500" />
                    {course.audience.map((item: string, i: number) => {
                      const cfg = [
                        { I: Megaphone, color: "#8B5CF6", bg: "#EDE9FE" },
                        { I: Laptop, color: "#6366F1", bg: "#EEF2FF" },
                        { I: Briefcase, color: "#10B981", bg: "#D1FAE5" },
                        { I: Paintbrush, color: "#A855F7", bg: "#F3E8FF" },
                        { I: GraduationCap, color: "#6366F1", bg: "#EEF2FF" },
                      ];
                      const c = cfg[i % cfg.length];
                      const Ic = c.I;
                      return (
                        <div key={i} className="flex items-center gap-4 relative z-10">
                          {/* Number Badge - rounded rectangle */}
                          <div className="w-9 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[13px] shrink-0">{String(i + 1).padStart(2, "0")}</div>
                          {/* Text */}
                          <p className="text-[0.9375rem] text-gray-700 leading-relaxed flex-1 font-medium">{item}</p>
                          {/* Right Icon */}
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.bg }}>
                            <Ic className="w-6 h-6" style={{ color: c.color }} fill={c.color} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>

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
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.07)] p-8 sm:p-10">
            <div className="flex items-center gap-3.5 mb-7">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-[1.35rem] font-bold text-gray-900 leading-tight">This Course Includes</h2>
                <div className="w-10 h-[3px] rounded-full bg-emerald-500 mt-1.5" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { I: Video, v: totalDuration.replace("h ", "h ").replace("m", "m"), l: "On-demand video" },
                { I: FileText, v: totalLectures + " lectures", l: "In-depth learning" },
                { I: Download, v: course.topics.length + " downloadable", l: "Resources" },
                { I: Smartphone, v: "Access on", l: "Mobile & TV" },
                { I: Infinity, v: "Full lifetime", l: "Access" },
                { I: Trophy, v: "Certificate of", l: "Completion" },
              ].map(({ I, v, l }: any) => (
                <div key={v} className="flex flex-col items-center text-center p-5 rounded-xl bg-[#F9FAFB]" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                    <I className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-[0.95rem] font-bold text-gray-900 leading-tight">{v}</div>
                  <div className="text-[0.78rem] text-gray-500 mt-1">{l}</div>
                  <div className="w-6 h-[3px] rounded-full bg-emerald-500 mt-3" />
                </div>
              ))}
            </div>
          </div>
        </section>

                {/* ===== CAREER OUTCOMES ===== */}
        <section>
          <div className="rounded-2xl p-8 sm:p-10" style={{ background: '#FAFBFF', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 6px 32px rgba(0,0,0,0.1)' }}>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-[1.35rem] font-bold text-gray-900 leading-tight">Career Outcomes</h2>
                </div>
                <p className="text-[0.85rem] text-gray-500 leading-relaxed ml-14">This course prepares you for in-demand roles in AI and opens doors to exciting career opportunities.</p>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl shrink-0" style={{ background: '#F3F4F6' }}>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <span className="text-[0.8rem] text-gray-600 leading-snug">AI Jobs are growing <span className="font-bold text-emerald-600">4X faster</span> than the average tech roles.</span>
              </div>
            </div>

            {/* 5 Outcome Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
              {[
                { icon: <Target className="w-5 h-5" />, title: 'High Demand', desc: 'AI Prompt Engineering skills are in high demand across industries.', color: '#10B981', bg: '#ECFDF5' },
                { icon: <Wallet className="w-5 h-5" />, title: 'Lucrative Salaries', desc: 'Competitive salaries with excellent growth potential.', color: '#8B5CF6', bg: '#F5F3FF' },
                { icon: <Rocket className="w-5 h-5" />, title: 'Future-Proof Career', desc: 'Stay ahead in the AI era with future-proof skills and knowledge.', color: '#F59E0B', bg: '#FFF7ED' },
                { icon: <Globe className="w-5 h-5" />, title: 'Work Anywhere', desc: 'Remote-friendly roles with global opportunities and flexibility.', color: '#3B82F6', bg: '#EFF6FF' },
                { icon: <Users className="w-5 h-5" />, title: 'Make an Impact', desc: 'Build solutions that solve real-world problems and create value.', color: '#EC4899', bg: '#FDF2F8' },
              ].map((c: any, ci: number) => (
                <div key={ci} className="rounded-xl p-5 transition-all duration-200 hover:shadow-lg relative overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
                  <h3 className="text-[0.95rem] font-bold text-gray-900 mb-1.5">{c.title}</h3>
                  <p className="text-[0.8rem] text-gray-500 leading-relaxed">{c.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl" style={{ background: c.color }} />
                </div>
              ))}
            </div>

            {/* Two-Column: Career Roles + What You'll Achieve */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

              {/* Left — Career Roles */}
              <div className="rounded-xl p-6" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="flex items-center gap-3 mb-1">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-[1.05rem] font-bold text-gray-900">Top Career Roles You Can Get</h3>
                </div>
                <p className="text-[0.8rem] text-gray-500 mb-5 ml-8">Explore the most in-demand roles in AI Prompt Engineering.</p>

                <div className="space-y-0">
                  {[
                    { role: 'AI Prompt Engineer', salary: '₹8 – ₹20 LPA' },
                    { role: 'AI Content Strategist', salary: '₹6 – ₹15 LPA' },
                    { role: 'AI Solutions Consultant', salary: '₹10 – ₹22 LPA' },
                    { role: 'Generative AI Specialist', salary: '₹12 – ₹25 LPA' },
                    { role: 'AI Product Manager', salary: '₹15 – ₹30 LPA' },
                  ].map((r: any, ri: number) => (
                    <Fragment key={ri}>
                      <div className="flex items-center justify-between py-3.5" style={{ borderBottom: ri < 4 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#ECFDF5' }}>
                            <Code2 className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="text-[0.88rem] font-semibold text-gray-900 truncate">{r.role}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                          <span className="text-[0.82rem] font-medium text-gray-600">{r.salary}</span>
                          <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: '#ECFDF5', color: '#059669' }}>
                            <TrendingUp className="w-3 h-3" /> High Demand
                          </span>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Star className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[0.72rem] text-gray-400">Salaries vary based on experience, location, and company.</span>
                </div>
              </div>

              {/* Right — What You'll Achieve */}
              <div className="rounded-xl p-6" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="flex items-center gap-3 mb-1">
                  <Trophy className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-[1.05rem] font-bold text-gray-900">What You'll Achieve</h3>
                </div>
                <p className="text-[0.8rem] text-gray-500 mb-5 ml-8">Skills and benefits you'll gain from this course.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3 mb-5">
                  {[
                    'Master AI prompting techniques and best practices',
                    'Build real-world projects for your portfolio',
                    'Work with cutting-edge AI tools and technologies',
                    'Enhance problem-solving and critical thinking',
                    'Increase your career opportunities and earning potential',
                    'Join a community of AI professionals and learners',
                  ].map((item: string, ii: number) => (
                    <div key={ii} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#10B981' }}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-[0.82rem] text-gray-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Box */}
                <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: '#10B981' }}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[0.92rem] font-bold text-gray-900 mb-1">Invest in your future and unlock endless opportunities</div>
                      <div className="text-[0.8rem] text-gray-500 leading-relaxed">Become a valuable AI professional in today's competitive job market.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Statistics Strip */}
            <div className="rounded-xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div className="flex flex-col sm:flex-row">
                {[
                  { I: Users, stat: '2M+', label: 'Job Openings', desc: 'AI & ML related roles worldwide', color: '#10B981', bg: '#ECFDF5' },
                  { I: TrendingUp, stat: '35%', label: 'Higher Salary', desc: 'Compared to traditional roles', color: '#8B5CF6', bg: '#F5F3FF' },
                  { I: Zap, stat: '4X', label: 'Faster Growth', desc: 'Than average tech jobs', color: '#F59E0B', bg: '#FFF7ED' },
                  { I: Globe, stat: '150+', label: 'Countries Hiring', desc: 'Global opportunities await', color: '#3B82F6', bg: '#EFF6FF' },
                ].map((s: any, si: number) => (
                  <Fragment key={si}>
                    <div className="flex items-center gap-4 px-6 py-5 flex-1">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                        <s.I className="w-5 h-5" style={{ color: s.color }} />
                      </div>
                      <div>
                        <div className="text-[1.4rem] font-extrabold leading-none" style={{ color: s.color }}>{s.stat}</div>
                        <div className="text-[0.85rem] font-bold text-gray-900 mt-0.5">{s.label}</div>
                        <div className="text-[0.75rem] text-gray-500 mt-0.5">{s.desc}</div>
                      </div>
                    </div>
                    {si < 3 && <div className="hidden sm:block" style={{ borderLeft: '1px solid rgba(0,0,0,0.06)', alignSelf: 'stretch' }} />}
                  </Fragment>
                ))}
              </div>
            </div>

          </div>
        </section>

{/* ===== INSTRUCTOR + SHARE ROW ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Instructor Card */}
          <div className="rounded-2xl overflow-hidden" style={{ background: '#F3EEFF' }}>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#5B4DFF' }}>
                  <span className="text-white font-bold text-lg">LD</span>
                </div>
                <div>
                  <h3 className="text-[1.1rem] font-bold" style={{ color: '#1A1A2E' }}>{INSTRUCTOR.name}</h3>
                  <span className="text-[0.8rem] font-semibold px-2.5 py-0.5 rounded-full inline-block mt-1" style={{ background: '#ECFDF5', color: '#10B981' }}>{INSTRUCTOR.role}</span>
                </div>
              </div>
              <p className="text-[0.85rem] leading-relaxed" style={{ color: '#4A4A68' }}>{INSTRUCTOR.bio}</p>
            </div>
            <div className="bg-white mx-4 mb-4 rounded-xl px-5 py-4">
              <div className="grid grid-cols-3 gap-4">
                {[{ I: Users, v: INSTRUCTOR.students, l: "Students" }, { I: BookOpen, v: INSTRUCTOR.courses, l: "Courses" }, { I: Star, v: INSTRUCTOR.rating, l: "Rating" }].map((s: any, si: number) => (
                  <div key={s.l} className={"flex flex-col items-center text-center " + (si < 2 ? 'border-r' : '')} style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
                    <s.I className="w-4 h-4 mb-1.5" style={{ color: '#6366F1' }} />
                    <span className="text-[0.95rem] font-bold" style={{ color: '#1A1A2E' }}>{s.v}</span>
                    <span className="text-[0.72rem] mt-0.5" style={{ color: '#6B7280' }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Share This Course */}
          <div className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.07)] relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-[1.2rem] font-bold" style={{ color: '#111827' }}>Share This Course</h3>
              <p className="text-[0.85rem] mt-2 mb-5" style={{ color: '#6B7280' }}>Share with friends who might benefit from this course.</p>
              <div className="flex items-center gap-3">
                {[{ l: 'f', bg: '#1877F2' }, { l: 'X', bg: '#000000' }, { l: 'in', bg: '#0A66C2' }, { l: 'WA', bg: '#25D366' }].map(({ l, bg }: any) => (
                  <button key={l} className="w-10 h-10 rounded-full flex items-center justify-center text-[0.65rem] font-bold text-white transition-transform hover:scale-110 hover:shadow-lg" style={{ background: bg }}>{l}</button>
                ))}
                <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-200" style={{ background: '#F3F4F6', border: '1px solid #E5E7EB' }}>
                  <Link2 className="w-4 h-4" style={{ color: '#374151' }} />
                </button>
              </div>
            </div>
            {/* Decorative dashed line + paper plane */}
            <div className="absolute top-6 right-6 pointer-events-none">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-20">
                <path d="M10 60 Q30 40 50 30 T70 10" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="70" cy="10" r="8" fill="#10B981" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ===== NEED HELP ===== */}
        <div className="mt-8 rounded-2xl overflow-hidden relative" style={{ background: '#ECFDF5' }}>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: '#D1FAE5' }}>
                <Headset className="w-5 h-5" style={{ color: '#10B981' }} />
              </div>
              <div>
                <h3 className="text-[1.1rem] font-bold" style={{ color: '#064E3B' }}>Need help deciding?</h3>
                <p className="text-[0.85rem] mt-0.5" style={{ color: '#047857' }}>Talk to our course advisor and find the perfect course for your goals.</p>
              </div>
            </div>
            <button className="text-white font-semibold py-2.5 px-7 rounded-full text-[0.9rem] transition-all duration-200 hover:shadow-lg flex items-center gap-2.5 shrink-0" style={{ background: '#10B981', boxShadow: '0 6px 20px rgba(16,185,129,0.35)' }}>
              <Headset className="w-4 h-4" /> Contact Advisor
            </button>
          </div>
        </div>
      </div>

      {/* ==================== TRUST / GUARANTEE ==================== */}
      <div className="mt-8">
        <div className="rounded-2xl relative overflow-hidden" style={{ background: '#F8FAFC' }}>
          {/* Bottom gradient accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, #8B5CF6, #10B981)' }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <style>{`
              .trust-item { border-right: 1px solid rgba(0,0,0,0.06); }
              .trust-item:last-child { border-right: none; }
              @media (max-width: 767px) {
                .trust-item { border-right: none; }
              }
            `}</style>
            {[
              { I: Shield, t: '30-Day Money-Back Guarantee', d: 'Full refund if you are not satisfied', bg: '#EDE9FE', ic: '#6D28D9' },
              { I: RotateCcw, t: 'Lifetime Access', d: 'Learn at your own pace, forever', bg: '#E0E7FF', ic: '#4338CA' },
              { I: Lock, t: 'Secure Payment', d: '100% secure checkout process', bg: '#DBEAFE', ic: '#1D4ED8' },
            ].map(({ I, t, d, bg, ic }: any) => (
              <div key={t} className="trust-item flex items-center gap-4 px-8 py-7">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: bg }}><I className="w-5 h-5" style={{ color: ic }} /></div>
                <div>
                  <h4 className="font-bold text-[0.9rem]" style={{ color: '#1E293B' }}>{t}</h4>
                  <p className="text-[0.8rem] mt-1" style={{ color: '#64748B' }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
