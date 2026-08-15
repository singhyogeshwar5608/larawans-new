"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Lock,
  RotateCw,
  Search,
  Bell,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import type { Project } from "@/lib/site-data";

interface ProjectSimulatorProps {
  project: Project;
}

export function ProjectSimulator({ project }: ProjectSimulatorProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const ds = project.desktopSimulator;
  const ms = project.mobileSimulator;

  const filteredRows = ds.tableRows.filter(
    (row) =>
      row.col1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.col2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.col3.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* View Switcher Controls */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("desktop")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
              viewMode === "desktop"
                ? "text-white shadow-[0_0_20px_rgba(0,224,198,0.3)]"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
            style={viewMode === "desktop" ? { background: 'linear-gradient(to right, #7c3aed, #06b6d4)' } : undefined}
          >
            <Monitor className="h-4 w-4" />
            <span>Desktop Console View</span>
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
              viewMode === "mobile"
                ? "text-white shadow-[0_0_20px_rgba(0,224,198,0.3)]"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
            style={viewMode === "mobile" ? { background: 'linear-gradient(to right, #7c3aed, #06b6d4)' } : undefined}
          >
            <Smartphone className="h-4 w-4" />
            <span>Mobile App Simulator</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-400 px-3 py-1">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-cyan-300/80">Interactive Live Simulator</span>
        </div>
      </div>

      {/* Simulator Container */}
      <div className="relative w-[98%] sm:w-full flex items-center justify-center rounded-2xl border border-white/10 bg-[#050716] p-2 sm:p-6 overflow-hidden">
        {/* Glow backdrop - hidden on mobile */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full opacity-30 blur-3xl hidden sm:block"
          style={{ background: project.accent }}
        />

        <AnimatePresence mode="wait">
          {viewMode === "desktop" ? (
            /* ──────────────── DESKTOP VIEW SIMULATOR ──────────────── */
            <motion.div
              key="desktop"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl mx-auto"
            >
              {/* Monitor Frame */}
              <div className="overflow-hidden rounded-t-xl rounded-b-none border border-neutral-700/80 border-b-0 bg-[#0b0f19] shadow-2xl"
              style={{ boxShadow: '0 25px 60px -12px rgba(0,0,0,0.7)' }}>
              {/* Monitor Top Bezel */}
              <div className="flex items-center justify-between border-b border-neutral-800 bg-[#121826] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>

                {/* URL Bar */}
                <div className="flex max-w-md flex-1 items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-neutral-300 mx-4">
                  <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span className="truncate font-mono text-[11px] text-neutral-300">{ds.url}</span>
                  <RotateCw className="h-3 w-3 text-neutral-500 ml-auto shrink-0 hover:text-white cursor-pointer" />
                </div>

                <div className="flex items-center gap-2 text-neutral-400">
                  <Bell className="h-4 w-4 hover:text-white cursor-pointer" />
                  <div className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: 'linear-gradient(to top right, #8b5cf6, #22d3ee)' }}>
                    AD
                  </div>
                </div>
              </div>

              {/* Console Body */}
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Sidebar */}
                <div className="hidden md:block md:col-span-1 border-r border-neutral-800 bg-[#0f1422] p-3 space-y-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 mb-1.5">
                      Platform Console
                    </div>
                    <div className="font-display text-xs font-bold text-white truncate">
                      {project.title}
                    </div>
                  </div>

                  <nav className="space-y-0.5">
                    {ds.sidebar.map((item, idx) => (
                      <button
                        key={item}
                        onClick={() => setActiveTab(idx)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 flex items-center justify-between ${
                          activeTab === idx
                            ? "text-cyan-300 border border-cyan-500/30"
                            : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
                        }`}
                        style={activeTab === idx ? { background: 'linear-gradient(to right, rgba(124,58,237,0.3), rgba(6,182,212,0.2))' } : undefined}
                      >
                        <span className="truncate">{item}</span>
                        {activeTab === idx && <ChevronRight className="h-3 w-3 text-cyan-400" />}
                      </button>
                    ))}
                  </nav>

                  <div className="pt-3 border-t border-neutral-800/80">
                    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-2.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-300">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                        <span>AI Assistant</span>
                      </div>
                      <p className="mt-0.5 text-[9.5px] text-neutral-400 leading-tight">
                        Real-time telemetry active
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Workspace */}
                <div className="col-span-1 md:col-span-4 p-2 sm:p-4 bg-[#0b0f19] space-y-2.5 sm:space-y-4">
                  {/* Top Executive Stats */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {ds.stats.map((st, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 sm:p-2.5 backdrop-blur hover:border-cyan-500/40 transition-colors"
                      >
                        <div className="text-[9px] sm:text-[10px] font-medium text-neutral-400 leading-tight">{st.title}</div>
                        <div className="mt-0.5 font-display text-sm sm:text-lg font-bold text-white">{st.val}</div>
                        <div className="mt-0.5 sm:mt-1 inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded-full">
                          <Zap className="h-2.5 w-2.5" />
                          {st.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Search and Action Bar - hidden on mobile to save space */}
                  <div className="hidden sm:flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Search records, IDs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-[11px] text-neutral-400">
                        Showing {filteredRows.length} items
                      </span>
                      <button className="rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 px-3 py-1.5 text-xs font-semibold transition-colors">
                        Export CSV
                      </button>
                    </div>
                  </div>

                  {/* Data Table */}
                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/30 max-h-[140px] sm:max-h-[200px] overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-white/10 bg-white/[0.02] text-neutral-400 text-[11px] uppercase tracking-wider">
                        <tr>
                          {ds.tableHeader.map((h) => (
                            <th key={h} className="px-2 sm:px-3 py-1.5 sm:py-2 font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-neutral-200">
                        {filteredRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-2 sm:px-3 py-1.5 sm:py-2 font-mono text-cyan-300 font-semibold text-[11px] sm:text-xs">
                              {row.col1}
                            </td>
                            <td className="px-2 sm:px-3 py-1.5 sm:py-2 font-medium text-white text-[11px] sm:text-xs">{row.col2}</td>
                            <td className="px-2 sm:px-3 py-1.5 sm:py-2 font-semibold text-neutral-300 text-[11px] sm:text-xs">{row.col3}</td>
                            <td className="px-2 sm:px-3 py-1.5 sm:py-2">
                              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-300">
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>{/* close console body grid */}
              {/* Monitor Chin - Bottom Bezel */}
              <div className="flex items-center justify-center border-x border-b border-neutral-700/80 bg-[#121826] py-1 sm:py-1.5">
                <div className="h-1 w-16 rounded-full bg-neutral-600/60" />
              </div>
              </div>{/* close monitor frame */}

              {/* Monitor Stand Neck */}
              <div className="hidden md:flex justify-center">
                <div className="w-24 h-4 bg-gradient-to-b from-neutral-700 to-neutral-800" />
              </div>

              {/* Monitor Base */}
              <div className="hidden md:flex justify-center">
                <div className="w-40 h-2 rounded-b-xl bg-gradient-to-b from-neutral-700 to-neutral-900" style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }} />
              </div>
            </motion.div>
          ) : (
            /* ──────────────── MOBILE VIEW SIMULATOR ──────────────── */
            <motion.div
              key="mobile"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-[340px] overflow-hidden rounded-[40px] border-[10px] border-neutral-800 bg-[#000000] shadow-2xl ring-1 ring-white/20"
            >
              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-28 rounded-b-2xl bg-black z-30 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-neutral-900 border border-neutral-700" />
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[10px] font-semibold text-neutral-300 z-20">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px]">5G</span>
                  <div className="h-2.5 w-4 rounded-sm border border-neutral-300 p-0.5 flex items-center">
                    <div className="h-full w-full bg-emerald-400 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Mobile Screen Body */}
              <div className="p-4 space-y-4 bg-[#0a0d18] min-h-[480px]">
                {/* Mobile Header */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                      Mobile App
                    </span>
                    <h4 className="font-display text-base font-bold text-white">
                      {ms.screenTitle}
                    </h4>
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                      2
                    </span>
                  </div>
                </div>

                {/* Primary Card */}
                <div
                  className="rounded-2xl p-4 text-white shadow-lg relative overflow-hidden"
                  style={{ background: project.accent }}
                >
                  <div className="relative z-10">
                    <span className="text-[11px] font-medium opacity-90">{ms.primaryCardTitle}</span>
                    <div className="mt-1 font-display text-2xl font-extrabold">{ms.primaryCardVal}</div>
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold bg-black/20 backdrop-blur w-fit px-2.5 py-1 rounded-full">
                      <ShieldCheck className="h-3 w-3 text-emerald-300" />
                      <span>{ms.notificationBadge}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <div className="text-[11px] font-semibold text-neutral-400 mb-2">Quick Actions</div>
                  <div className="grid grid-cols-3 gap-2">
                    {ms.quickActions.map((act) => (
                      <button
                        key={act}
                        className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-[10px] font-semibold text-neutral-200 hover:bg-white/10 transition-colors"
                      >
                        <Zap className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="text-center leading-tight">{act}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400 mb-2">
                    <span>Recent Activity</span>
                    <span className="text-cyan-400 text-[10px] hover:underline cursor-pointer">
                      View All
                    </span>
                  </div>
                  <div className="space-y-2">
                    {ms.recentActivity.map((act, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-xs"
                      >
                        <div>
                          <div className="font-semibold text-white text-[11px]">{act.title}</div>
                          <div className="flex items-center gap-1 text-[10px] text-neutral-400 mt-0.5">
                            <Clock className="h-2.5 w-2.5" />
                            <span>{act.time}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-400 text-[11px]">{act.amount}</div>
                          <div className="text-[9.5px] font-semibold text-neutral-400">{act.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Nav Bar */}
              <div className="border-t border-neutral-800 bg-[#0a0d18] px-6 py-3 flex items-center justify-between text-neutral-400 text-[10px]">
                <div className="flex flex-col items-center gap-0.5 text-cyan-400 font-semibold">
                  <Monitor className="h-3.5 w-3.5" />
                  <span>Home</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 hover:text-white">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Activity</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 hover:text-white">
                  <Bell className="h-3.5 w-3.5" />
                  <span>Alerts</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
