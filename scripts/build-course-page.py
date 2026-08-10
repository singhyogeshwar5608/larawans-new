import os

COMPONENT = '''"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import type { CourseItem } from "@/lib/course-data";
import {
  House, ChevronRight, Star, Users, Play, Laptop, Briefcase,
  GraduationCap, Handshake, CheckCircle2, ChevronDown, ChevronUp,
  Flame, Clock, Smartphone, Award, Download, ClipboardList, Tag,
  ShoppingCart, Link2, Headset, Shield, RotateCcw, Lock,
  Video, FileText, Infinity, Trophy, Zap, BookOpen,
  TrendingUp, Target, ArrowRight, MessageSquare, Code2, BarChart3,
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
  avatar: "https://ui-avatars.com/api/?name=LD&background=4f46e5&color=fff&size=200&bold=true",
  bio: "Experienced professional with years of industry expertise. Has trained thousands of students and worked with top organizations worldwide.",
  students: "50K+",
  courses: "15+",
  rating: "4.9",
};

const REVIEWS = [
  { name: "Rahul Sharma", avatar: "https://ui-avatars.com/api/?name=RS&background=10b981&color=fff&bold=true", rating: 5, time: "2 weeks ago", text: "Excellent course! The instructor explains everything in a very practical way. Projects are really helpful to understand real-world concepts." },
  { name: "Priya Patel", avatar: "https://ui-avatars.com/api/?name=PP&background=8b5cf6&color=fff&bold=true", rating: 5, time: "1 month ago", text: "This course transformed my career. The hands-on projects and real-world examples made learning so effective. Highly recommended!" },
  { name: "Amit Kumar", avatar: "https://ui-avatars.com/api/?name=AK&background=3b82f6&color=fff&bold=true", rating: 4, time: "3 weeks ago", text: "Great content and well-structured curriculum. The support team is very responsive. Would definitely recommend." },
];

const FAQS = [
  { q: "Who is this course for?", a: "This course is designed for beginners as well as intermediate learners who want to build professional skills." },
  { q: "Do I need any prior experience?", a: "No prior experience is required. We start from the very basics and gradually progress to advanced topics." },
  { q: "Will I get a certificate?", a: "Yes! Upon successful completion of all modules and projects, you will receive a certificate of completion." },
  { q: "How long do I have access?", a: "You get lifetime access to the course content. Learn at your own pace, revisit any module, and access all future updates." },
  { q: "Is there a money-back guarantee?", a: "Yes, we offer a 30-day money-back guarantee. If you are not satisfied within the first 30 days, you can request a full refund." },
  { q: "Can I access the course on mobile?", a: "Yes, the course is fully responsive and can be accessed on any device \u2014 desktop, tablet, or mobile." },
];

const RATING_BARS = [
  { star: 5, pct: 81 }, { star: 4, pct: 14 }, { star: 3, pct: 3 }, { star: 2, pct: 1 }, { star: 1, pct: 1 },
];

function HalfStar({ className }: { className?: string }) {
  return (
    <span className={"relative inline-block " + (className || "")}>
      <Star className="w-full h-full text-gray-300" />
      <span className="absolute inset-0 overflow-hidden w-1/2">
        <Star className="w-full h-full fill-amber-400 text-amber-400" />
      </span>
    </span>
  );
}

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
        secs--; if (secs < 0) { secs = 59; mins--; } if (mins < 0) { mins = 59; hours--; } if (hours < 0) { hours = 23; days--; }
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

  const priceNum = parseInt(course.price.replace(/[^\d]/g, "")) || 9999;
  const originalPrice = String.fromCodePoint(8377) + (priceNum * 3.6).toLocaleString("en-IN");
  const discount = Math.round((1 - priceNum / (priceNum * 3.6)) * 100);

  const curriculumModules = useMemo(() => {
    const mc = Math.min(course.modules || 5, 9);
    const tpm = Math.ceil(course.topics.length / mc);
    return Array.from({ length: mc }, (_, i) => {
      const lc = (i + 1) * 3 + 2;
      const tm = lc * 12 + i * 15;
      return { title: course.topics[i * tpm] || ("Module " + (i + 1)), lectures: lc, duration: (Math.floor(tm / 60) + "h " + (tm % 60) + "m"), topics: course.topics.slice(i * tpm, (i + 1) * tpm) };
    });
  }, [course.modules, course.topics]);

  const totalLectures = curriculumModules.reduce((s, m) => s + m.lectures, 0);
  const totalMins = curriculumModules.reduce((s, m) => { const p = m.duration.match(/(\d+)h (\d+)m/); return s + (parseInt(p?.[1] || "0") * 60) + parseInt(p?.[2] || "0"); }, 0);
  const totalDuration = Math.floor(totalMins / 60) + "h " + (totalMins % 60) + "m";

  const getLevelTag = (l: string) => { const lw = l.toLowerCase(); if (lw.includes("beginner") || l === "All Levels") return "Beginner Friendly"; if (lw.includes("intermediate")) return "Intermediate"; return "Advanced"; };
  const tog = (set: React.Dispatch<React.SetStateAction<Record<number, boolean>>>, idx: number) => set((p) => ({ ...p, [idx]: !p[idx] }));
  const pad = (n: number) => n.toString().padStart(2, "0");

  useEffect(() => { tabRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 antialiased">
      {/* HERO */}
      <div className="relative overflow-hidden" style={{ background: ("linear-gradient(135deg, " + primary + " 0%, " + primary + "cc 40%, #1e1b4b 100%)") }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full" style={{ background: ("radial-gradient(circle, " + primary + "44, transparent 70%)") }} />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full" style={{ background: ("radial-gradient(circle, " + primary + "22, transparent 70%)") }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
          <nav className="flex text-sm mb-8">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li><a href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors"><House className="w-3.5 h-3.5 mr-1.5" /> Home</a></li>
              <li><ChevronRight className="w-3 h-3 text-white/40" /></li>
              <li><a href="/courses" className="text-white/70 hover:text-white transition-colors">{course.category}</a></li>
              <li><ChevronRight className="w-3 h-3 text-white/40" /></li>
              <li className="text-white font-medium truncate max-w-[200px] sm:max-w-none">{course.title}</li>
            </ol>
          </nav>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/10"><Zap className="w-3 h-3" /> {course.category}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/10">{getLevelTag(course.level)}</span>
                {course.badge && <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30"><Star className="w-3 h-3 fill-amber-400" /> {course.badge}</span>}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 tracking-tight">{course.emoji} {course.title}</h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl mb-8">{course.description}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
                <div className="flex items-center gap-2"><div className="flex text-amber-400"><Star className="w-5 h-5 fill-amber-400" /><Star className="w-5 h-5 fill-amber-400" /><Star className="w-5 h-5 fill-amber-400" /><Star className="w-5 h-5 fill-amber-400" /><HalfStar className="w-5 h-5" /></div><span className="text-white font-bold">4.8</span><span className="text-white/60 text-sm">(2,456)</span></div>
                <div className="flex items-center gap-2 text-white/80 text-sm"><Users className="w-4 h-4" /> {course.students} students</div>
                <div className="flex items-center gap-2 text-white/80 text-sm"><Clock className="w-4 h-4" /> {course.duration}</div>
                <div className="flex items-center gap-2 text-white/80 text-sm"><BarChart3 className="w-4 h-4" /> {course.level}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Certificate Included", "Lifetime Access", (course.projects.length + "+ Projects"), "1:1 Mentorship"].map((t: string, i: number) => (<span key={i} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/10 text-white/90 border border-white/10">{t}</span>))}
              </div>
            </div>
            <div className="w-full lg:w-[440px] shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 group cursor-pointer aspect-video bg-gray-900 border border-white/10">
                {!course.image.startsWith("/") && <img alt="Preview" className={"w-full h-full object-cover transition-all duration-500 group-hover:scale-105 " + (imgLoaded ? "opacity-100" : "opacity-0")} src={course.image} onLoad={() => setImgLoaded(true)} />}
                <div className={"absolute inset-0 transition-opacity duration-500 " + (imgLoaded && !course.image.startsWith("/") ? "opacity-0" : "opacity-100")} style={{ background: ("linear-gradient(135deg, " + primary + "88, #1e1b4b)") }}><div className="absolute inset-0 flex items-center justify-center"><span className="text-8xl opacity-30">{course.emoji}</span></div></div>
                <div className="absolute inset-0 flex items-center justify-center"><div className="bg-white rounded-full flex items-center justify-center shadow-2xl shadow-black/20 group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/20" style={{ width: 72, height: 72 }}><Play className="w-8 h-8 ml-1" style={{ color: primary, fill: primary }} /></div></div>
                <div className="absolute bottom-4 left-4"><span className="bg-black/60 text-white text-sm px-4 py-2 rounded-xl font-medium backdrop-blur-md border border-white/10">Preview this course</span></div>
                <div className="absolute top-4 right-4"><span className="bg-black/60 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">{totalDuration} content</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 60" fill="none" className="w-full block"><path d="M0 60V30C240 5 480 0 720 15C960 30 1200 45 1440 30V60H0Z" fill="#f8fafc" /></svg></div>
      </div>

      {/* MAIN */}
      <div ref={tabRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 lg:w-2/3 min-w-0">
            {/* TABS */}
            <div className="bg-white rounded-2xl shadow-md shadow-gray-200/60 border border-gray-100 p-1.5 mb-8 flex flex-wrap gap-1">
              {TABS.map((tab) => { const Ic = tab.icon; const active = activeTab === tab.id; return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={"flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 " + (active ? "text-white shadow-md" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50")} style={active ? { background: ("linear-gradient(135deg, " + primary + ", " + primary + "dd)"), boxShadow: ("0 4px 14px " + primary + "40") } : {}}>
                  <Ic className="w-4 h-4" />{tab.label}
                </button>
              ); })}
            </div>

            {/* OVERVIEW */}
            {activeTab === "overview" && (<div className="space-y-8">
              <section className="bg-white p-8 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><BookOpen className="w-5 h-5" style={{ color: primary }} /></div><h2 className="text-xl font-bold text-gray-900">Course Description</h2></div>
                <div className="text-gray-600 space-y-4 leading-relaxed"><p>{course.longDescription}</p><p>{course.aboutText}</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  {[{ I: Laptop, t: "Hands-on Projects", d: "Build real-world apps" }, { I: Briefcase, t: "Job Ready Skills", d: "Industry-relevant tools" }, { I: GraduationCap, t: "Expert Guidance", d: "Learn from industry pros" }, { I: Handshake, t: "Career Support", d: "Resume and interview help" }].map(({ I, t, d }: any) => (
                    <div key={t} className="group p-4 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" style={{ background: primary + "08", borderColor: primary + "20" }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: primary + "15" }}><I className="w-5 h-5" style={{ color: primary }} /></div>
                      <h4 className="font-semibold text-gray-900 text-sm">{t}</h4><p className="text-xs text-gray-500 mt-1">{d}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section className="bg-white p-8 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><Target className="w-5 h-5" style={{ color: primary }} /></div><h2 className="text-xl font-bold text-gray-900">What You will Learn</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {(() => { const h = Math.ceil(course.topics.length / 2); const L = course.topics.slice(0, h); const R = course.topics.slice(h); return (<><ul className="space-y-3">{L.map((tp: string, i: number) => (<li key={i} className="flex items-start gap-3 text-sm text-gray-700"><div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: primary + "15" }}><CheckCircle2 className="w-3.5 h-3.5" style={{ color: primary }} /></div>{tp}</li>))}</ul><ul className="space-y-3">{R.map((tp: string, i: number) => (<li key={i} className="flex items-start gap-3 text-sm text-gray-700"><div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: primary + "15" }}><CheckCircle2 className="w-3.5 h-3.5" style={{ color: primary }} /></div>{tp}</li>))}</ul></>); })()}
                </div>
              </section>
              <section className="rounded-2xl p-8 text-white relative overflow-hidden" style={{ background: ("linear-gradient(135deg, " + primary + ", " + primary + "bb 60%, #312e81)") }}>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Course Highlights</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">{course.highlights.map((h: any, i: number) => (<div key={i} className="text-center"><div className="text-3xl font-extrabold mb-1">{h.value}</div><div className="text-sm text-white/70">{h.label}</div></div>))}</div>
              </section>
              <section className="bg-white p-8 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><Code2 className="w-5 h-5" style={{ color: primary }} /></div><h2 className="text-xl font-bold text-gray-900">Tech Stack You will Master</h2></div>
                <div className="flex flex-wrap gap-3">{course.techStack.map((tech: any, i: number) => (<div key={i} className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 rounded-full px-5 py-2.5 border border-gray-100 transition-colors"><span className="w-3 h-3 rounded-full" style={{ background: tech.color }} /><span className="text-sm font-medium text-gray-700">{tech.name}</span></div>))}</div>
              </section>
              <section className="bg-white p-8 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><Users className="w-5 h-5" style={{ color: primary }} /></div><h2 className="text-xl font-bold text-gray-900">Who This Course Is For</h2></div>
                <div className="space-y-3">{course.audience.map((item: string, i: number) => (<div key={i} className="flex items-start gap-4 p-4 rounded-xl border transition-colors hover:border-gray-200" style={{ background: primary + "05", borderColor: primary + "15" }}><div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5" style={{ background: primary }}>{i + 1}</div><p className="text-sm text-gray-600 leading-relaxed">{item}</p></div>))}</div>
              </section>
            </div>)}

            {/* CURRICULUM */}
            {activeTab === "curriculum" && (<section className="bg-white p-8 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
              <div className="flex flex-wrap justify-between items-end mb-6 gap-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><FileText className="w-5 h-5" style={{ color: primary }} /></div><h2 className="text-xl font-bold text-gray-900">Course Curriculum</h2></div><span className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">{curriculumModules.length} Sections \u00b7 {totalLectures} Lectures \u00b7 {totalDuration}</span></div>
              <div className="space-y-3">{(showAllCurriculum ? curriculumModules : curriculumModules.slice(0, 5)).map((mod: any, idx: number) => { const isOpen = expandedSections[idx]; return (
                <div key={idx} className="rounded-xl border overflow-hidden transition-all" style={{ borderColor: isOpen ? primary + "30" : "rgb(229,231,235)" }}>
                  <button onClick={() => tog(setExpandedSections, idx)} className="w-full flex justify-between items-center p-4 text-left text-sm font-medium hover:bg-gray-50/80 transition-colors" style={{ background: isOpen ? primary + "08" : "" }}>
                    <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: isOpen ? primary : primary + "40" }}>{idx + 1}</div><span className="text-gray-900">{mod.title}</span></div>
                    <div className="flex items-center gap-4 text-gray-500 font-normal"><span className="hidden sm:inline text-xs">{mod.lectures} Lectures \u00b7 {mod.duration}</span>{isOpen ? <ChevronUp className="w-4 h-4" style={{ color: primary }} /> : <ChevronDown className="w-4 h-4" />}</div>
                  </button>
                  {isOpen && (<div className="px-4 pb-4 border-t" style={{ borderColor: primary + "15" }}><ul className="divide-y divide-gray-100 pt-2">{mod.topics.map((tp: string, ti: number) => (<li key={ti} className="flex items-center gap-3 py-3 text-sm text-gray-600"><div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: primary + "10" }}><Play className="w-3 h-3" style={{ color: primary }} /></div>{tp}</li>))}</ul></div>)}
                </div>); })}</div>
              {curriculumModules.length > 5 && (<div className="text-center mt-6"><button onClick={() => setShowAllCurriculum(!showAllCurriculum)} className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: primary }}>{showAllCurriculum ? "Show less" : "Show all " + curriculumModules.length + " sections"}</button></div>)}
            </section>)}

            {/* INSTRUCTOR */}
            {activeTab === "instructor" && (<section className="bg-white p-8 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><GraduationCap className="w-5 h-5" style={{ color: primary }} /></div><h2 className="text-xl font-bold text-gray-900">Meet Your Instructor</h2></div>
              <div className="flex flex-col sm:flex-row items-start gap-8">
                <div className="relative"><img src={INSTRUCTOR.avatar} alt={INSTRUCTOR.name} className="w-28 h-28 rounded-2xl object-cover border-4 shadow-lg" style={{ borderColor: primary + "30" }} /><div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md" style={{ background: primary }}><CheckCircle2 className="w-4 h-4" /></div></div>
                <div className="flex-1"><h3 className="text-2xl font-bold text-gray-900">{INSTRUCTOR.name}</h3><p className="font-medium mt-1" style={{ color: primary }}>{INSTRUCTOR.role}</p><p className="text-gray-600 mt-4 leading-relaxed">{INSTRUCTOR.bio}</p>
                  <div className="flex flex-wrap gap-6 mt-6">{[{ l: "Students", v: INSTRUCTOR.students }, { l: "Courses", v: INSTRUCTOR.courses }, { l: "Rating", v: INSTRUCTOR.rating + " \u2605" }].map((s: any) => (<div key={s.l} className="text-center px-5 py-3 rounded-xl" style={{ background: primary + "08" }}><div className="text-xl font-bold text-gray-900">{s.v}</div><div className="text-xs text-gray-500 mt-0.5">{s.l}</div></div>))}</div>
                </div>
              </div>
            </section>)}

            {/* REVIEWS */}
            {activeTab === "reviews" && (<section className="bg-white p-8 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><MessageSquare className="w-5 h-5" style={{ color: primary }} /></div><h2 className="text-xl font-bold text-gray-900">Student Reviews</h2></div>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start">
                  <div className="text-7xl font-extrabold mb-3" style={{ color: primary }}>4.8</div>
                  <div className="flex text-amber-400 text-xl mb-3"><Star className="w-6 h-6 fill-amber-400" /><Star className="w-6 h-6 fill-amber-400" /><Star className="w-6 h-6 fill-amber-400" /><Star className="w-6 h-6 fill-amber-400" /><HalfStar className="w-6 h-6" /></div>
                  <p className="text-gray-500 text-sm mb-6">(2,456 reviews)</p>
                  <div className="w-full space-y-2.5">{RATING_BARS.map(({ star, pct }: any) => (<div key={star} className="flex items-center text-sm"><span className="w-4 text-gray-600 font-medium">{star}</span><Star className="w-3 h-3 text-amber-400 mx-1.5 fill-amber-400" /><div className="w-full bg-gray-100 rounded-full h-2.5 mx-2"><div className="h-2.5 rounded-full transition-all" style={{ width: pct + "%", background: primary }} /></div><span className="w-10 text-right text-gray-500 text-xs">{pct}%</span></div>))}</div>
                </div>
                <div className="md:w-2/3">
                  <div className="border border-gray-100 rounded-2xl p-6" style={{ background: primary + "04" }}>
                    <div className="flex items-start gap-4"><img alt="Reviewer" className="w-14 h-14 rounded-xl object-cover shadow-sm" src={REVIEWS[currentReview].avatar} /><div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2"><h4 className="font-bold text-gray-900">{REVIEWS[currentReview].name}</h4><span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verified</span></div>
                      <div className="flex items-center gap-2 mb-3"><div className="flex text-amber-400">{Array.from({ length: 5 }).map((_: any, i: number) => (<Star key={i} className={"w-4 h-4 " + (i < REVIEWS[currentReview].rating ? "fill-amber-400" : "text-gray-200")} />))}</div><span className="text-gray-400 text-xs">{REVIEWS[currentReview].time}</span></div>
                      <p className="text-gray-600 text-sm leading-relaxed">{REVIEWS[currentReview].text}</p>
                    </div></div>
                  </div>
                  <div className="flex justify-center mt-5 gap-2">{REVIEWS.map((_: any, i: number) => (<button key={i} onClick={() => setCurrentReview(i)} className="h-2 rounded-full transition-all duration-300" style={{ width: i === currentReview ? 24 : 8, background: i === currentReview ? primary : "#d1d5db" }} />))}</div>
                </div>
              </div>
            </section>)}

            {/* FAQ */}
            {activeTab === "faq" && (<section className="bg-white p-8 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: primary + "15" }}><MessageSquare className="w-5 h-5" style={{ color: primary }} /></div><h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2></div>
              <div className="space-y-3">{FAQS.map((faq: any, idx: number) => { const isOpen = expandedFaqs[idx]; return (
                <div key={idx} className="rounded-xl border overflow-hidden transition-all" style={{ borderColor: isOpen ? primary + "30" : "rgb(229,231,235)" }}>
                  <button onClick={() => tog(setExpandedFaqs, idx)} className="w-full flex justify-between items-center p-5 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50/80 transition-colors" style={{ background: isOpen ? primary + "08" : "" }}>
                    <span>{faq.q}</span>{isOpen ? <ChevronUp className="w-4 h-4 shrink-0 ml-4" style={{ color: primary }} /> : <ChevronDown className="w-4 h-4 shrink-0 ml-4 text-gray-400" />}
                  </button>
                  {isOpen && (<div className="px-5 pb-5 border-t" style={{ borderColor: primary + "15" }}><p className="text-sm text-gray-600 pt-4 leading-relaxed">{faq.a}</p></div>)}
                </div>); })}</div>
            </section>)}
          </div>

          {/* SIDEBAR */}
          <aside className="w-full lg:w-1/3"><div className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/60 border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: ("linear-gradient(90deg, " + primary + ", " + primary + "66, " + primary + ")") }} />
              <div className="pt-2">
                <div className="flex items-baseline gap-3 mb-2"><span className="text-4xl font-extrabold text-gray-900">{course.price}</span><span className="text-lg text-gray-400 line-through">{originalPrice}</span></div>
                <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-lg mb-4"><Flame className="w-3.5 h-3.5" /> {discount}% OFF</div>
                <p className="text-xs text-gray-500 font-medium mb-2">Offer ends in</p>
                <div className="flex gap-2 mb-6">{["Days", "Hours", "Mins", "Secs"].map((label: string, i: number) => { const val = [countdown.days, countdown.hours, countdown.mins, countdown.secs][i]; return (<div key={label} className="flex-1 text-center bg-gray-900 rounded-xl p-2.5"><div className="text-xl font-extrabold text-white font-mono">{pad(val)}</div><div className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{label}</div></div>); })}</div>
                <button className="w-full text-white font-bold py-3.5 rounded-xl mb-3 transition-all duration-200 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2" style={{ background: ("linear-gradient(135deg, " + primary + ", " + primary + "cc)") }}><Zap className="w-4 h-4" /> Enroll Now</button>
                <button className="w-full font-bold py-3 rounded-xl mb-5 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2 border-2" style={{ color: primary, borderColor: primary }}><ShoppingCart className="w-4 h-4" /> Add to Cart</button>
                <p className="text-center text-xs text-gray-400 mb-6">30-Day Money-Back Guarantee</p>
                <div className="space-y-3.5 text-sm text-gray-700">{[{ I: Clock, t: "Lifetime Access" }, { I: Smartphone, t: "Access on Mobile and TV" }, { I: Award, t: "Certificate of Completion" }, { I: Download, t: "Downloadable Resources" }, { I: ClipboardList, t: "Assignments and Projects" }, { I: Users, t: "Community Support" }].map(({ I, t }: any) => (<div key={t} className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: primary + "08" }}><I className="w-4 h-4" style={{ color: primary }} /></div><span className="text-gray-600">{t}</span></div>))}</div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-sm"><a href="#" className="flex items-center gap-1.5 hover:underline" style={{ color: primary }}><Tag className="w-3.5 h-3.5" /> Have a coupon?</a><a href="#" className="font-semibold hover:underline" style={{ color: primary }}>Apply Coupon</a></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Your Instructor</h3>
              <div className="flex items-center gap-4 mb-4"><img alt="Instructor" className="w-14 h-14 rounded-xl object-cover shadow-sm" style={{ border: "2px solid " + primary + "30" }} src={INSTRUCTOR.avatar} /><div><h4 className="font-bold text-gray-900">{INSTRUCTOR.name}</h4><p className="text-sm font-medium" style={{ color: primary }}>{INSTRUCTOR.role}</p></div></div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">{INSTRUCTOR.bio}</p>
              <div className="flex justify-between text-center text-sm mb-5 border-y border-gray-100 py-3"><div><div className="text-gray-400 text-[10px] uppercase tracking-wider">Students</div><div className="font-bold text-gray-900 mt-0.5">{INSTRUCTOR.students}</div></div><div><div className="text-gray-400 text-[10px] uppercase tracking-wider">Courses</div><div className="font-bold text-gray-900 mt-0.5">{INSTRUCTOR.courses}</div></div><div><div className="text-gray-400 text-[10px] uppercase tracking-wider">Rating</div><div className="font-bold text-gray-900 mt-0.5 flex items-center justify-center gap-1">{INSTRUCTOR.rating} <Star className="w-3 h-3 fill-amber-400 text-amber-400" /></div></div></div>
              <button className="w-full font-medium py-2.5 rounded-xl text-sm transition-all duration-200 border" style={{ color: primary, borderColor: primary + "40" }}>View Full Profile <ArrowRight className="w-3.5 h-3.5 inline ml-1" /></button>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">This course includes</h3>
              <ul className="space-y-3 text-sm">{[{ I: Video, t: totalDuration.replace("h ", " hours ") + " on-demand video" }, { I: FileText, t: totalLectures + " lectures" }, { I: Download, t: course.topics.length + " downloadable resources" }, { I: Smartphone, t: "Access on mobile and TV" }, { I: Infinity, t: "Full lifetime access" }, { I: Trophy, t: "Certificate of completion" }].map(({ I, t }: any) => (<li key={t} className="flex items-center gap-3 text-gray-600"><I className="w-4 h-4 text-gray-400" /> {t}</li>))}</ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Share this course</h3>
              <div className="flex gap-2.5">{[{ l: "f", bg: "#1877F2" }, { l: "X", bg: "#000" }, { l: "in", bg: "#0A66C2" }, { l: "WA", bg: "#25D366" }].map(({ l, bg }: any) => (<button key={l} className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white transition-transform hover:scale-110 hover:shadow-md" style={{ background: bg }}>{l}</button>))}<button onClick={() => navigator.clipboard.writeText(window.location.href)} className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"><Link2 className="w-4 h-4" /></button></div>
            </div>
            <div className="rounded-2xl p-6 relative overflow-hidden border" style={{ background: primary + "08", borderColor: primary + "20" }}>
              <div className="relative z-10"><h3 className="font-bold text-gray-900 mb-2">Need help deciding?</h3><p className="text-sm text-gray-600 mb-4">Talk to our course advisor and find the perfect course for your goals.</p><button className="text-white font-medium py-2.5 px-5 rounded-xl text-sm transition-all duration-200 hover:shadow-lg flex items-center gap-2" style={{ background: primary }}><Headset className="w-4 h-4" /> Contact Advisor</button></div>
              <div className="absolute -bottom-2 -right-2 opacity-10"><Headset className="w-28 h-28" style={{ color: primary }} /></div>
            </div>
          </div></aside>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 mt-4"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[{ I: Shield, t: "30-Day Money-Back Guarantee", d: "Full refund if you are not satisfied" }, { I: RotateCcw, t: "Lifetime Access", d: "Learn at your own pace, forever" }, { I: Lock, t: "Secure Payment", d: "100% secure checkout process" }].map(({ I, t, d }: any) => (<div key={t} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"><div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: primary + "10" }}><I className="w-6 h-6" style={{ color: primary }} /></div><div><h4 className="font-bold text-gray-900 text-sm">{t}</h4><p className="text-sm text-gray-500 mt-1">{d}</p></div></div>))}</div></div></footer>
    </div>
  );
}
'''

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'app', 'courses', '[slug]', 'CourseDetailClient.tsx')
with open(out, 'w') as f:
    f.write(COMPONENT)
print('Written', len(COMPONENT), 'chars')
