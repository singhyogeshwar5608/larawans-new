import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/lib/site-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

export default function PortfolioIndexPage() {
  return (
    <div className="min-h-screen bg-[#050614] text-foreground antialiased">
      <Navbar />

      <main className="relative pt-20 pb-12">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" aria-hidden />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-3 flex items-center justify-between">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-neutral-300 backdrop-blur transition-all duration-200 hover:border-cyan-500/50 hover:bg-white/[0.08] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 text-cyan-400" />
              <span>Back to Home</span>
            </a>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Case Studies & Systems</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Work That Ships, Scales, and Survives
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Explore our full catalog of enterprise platforms, two-sided marketplaces, offline POS systems, and custom ERP solutions with live interactive simulator previews.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <a
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className="relative h-48 w-full overflow-hidden p-6"
                  style={{ background: p.accent }}
                >
                  <div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                    {p.category}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-80">
                    <div className="rounded-xl border border-white/30 bg-white/10 p-3 backdrop-blur text-white text-xs font-bold shadow-lg group-hover:scale-105 transition-transform">
                      {p.client}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-neutral-400 group-hover:text-cyan-400 transition-colors shrink-0" />
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                    {p.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
