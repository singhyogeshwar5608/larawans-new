import re

with open('src/app/courses/[slug]/CourseDetailClient.tsx', 'r') as f:
    content = f.read()

# Find and replace the hero section
hero_start_marker = '{/* ==================== HERO ==================== */}'
pricing_marker = '{/* ==================== PRICING CTA BAR ==================== */}'

hero_idx = content.index(hero_start_marker)
pricing_idx = content.index(pricing_marker)

# The hero section is from hero_start_marker to just before pricing_marker
hero_section = content[hero_idx:pricing_idx]

new_hero = '''      {/* ==================== HERO ==================== */}
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
              <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.75rem] font-extrabold leading-[1.08] tracking-tight mb-2 text-slate-900">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-600 bg-clip-text text-transparent">{course.title}</span>
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

'''

new_content = content[:hero_idx] + new_hero + content[pricing_idx:]

with open('src/app/courses/[slug]/CourseDetailClient.tsx', 'w') as f:
    f.write(new_content)

print('Hero section replaced successfully!')
