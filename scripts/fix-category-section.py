import re

with open('/home/z/my-project/src/app/courses/page.tsx', 'r') as f:
    content = f.read()

# Find the Browse By Category section
start = content.find('{/* BEGIN: Browse By Category */}')
end = content.find('{/* END: Browse By Category */}') + len('{/* END: Browse By Category */}')
section = content[start:end]

# Section padding (already done, skip)

# Header margin
section = section.replace(
    '<div className="text-center mb-8 sm:mb-10">',
    '<div className="text-center mb-8 sm:mb-9">'
)

# Badge
section = section.replace(
    'px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5" style={{ backgroundColor: "#EEF2FF"',
    'px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ backgroundColor: "#EEF2FF"'
)

# Heading
section = section.replace(
    'text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] font-extrabold mb-3"',
    'text-[1.6rem] sm:text-[2rem] lg:text-[2.25rem] font-extrabold mb-2"'
)

# Underline margin
section = section.replace(
    '<div className="flex justify-center mb-6">',
    '<div className="flex justify-center mb-3">'
)

# Underline width
section = section.replace(
    '<div className="w-[60px] h-1 rounded-full" style={{ backgroundColor: "#6D28D9" }} />',
    '<div className="w-[50px] h-1 rounded-full" style={{ backgroundColor: "#6D28D9" }} />'
)

# Subtitle
section = section.replace(
    'text-base sm:text-[17px] max-w-[620px] mx-auto leading-relaxed"',
    'text-sm sm:text-[15px] max-w-[500px] mx-auto leading-relaxed"'
)

# Grid
section = section.replace(
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">',
    'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">'
)

# Card padding
section = section.replace(
    'group relative flex flex-col p-6 sm:p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"',
    'group relative flex flex-col p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"'
)

# Card min-height
section = section.replace(
    'minHeight: "220px"',
    'minHeight: "170px"'
)

# Icon container
section = section.replace(
    'w-14 h-14 rounded-2xl flex items-center justify-center mb-4"',
    'w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5"'
)

# Icon size
section = section.replace(
    '<svg className="w-7 h-7" fill="none"',
    '<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none"'
)

# Title
section = section.replace(
    'text-lg sm:text-xl font-bold mb-1"',
    'text-[13px] sm:text-[15px] font-bold mb-0.5"'
)

# Course count
section = section.replace(
    'text-sm font-semibold mb-3"',
    'text-[11px] sm:text-xs font-semibold mb-2"'
)

# Description
section = section.replace(
    'text-sm leading-relaxed line-clamp-2 mb-4 flex-grow"',
    'text-[11px] sm:text-xs leading-relaxed line-clamp-2 mb-2 flex-grow"'
)

# Arrow button
section = section.replace(
    'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"',
    'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"'
)

# Arrow icon
section = section.replace(
    '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>\n                  </div>\n                </div>\n              </a>\n            ))}',
    '<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>\n                  </div>\n                </div>\n              </a>\n            ))}'
)

# View All button margin
section = section.replace(
    'mt-10 sm:mt-14">',
    'mt-8 sm:mt-10">'
)

# View All button size
section = section.replace(
    'px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:-translate-y-0.5"',
    'px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"'
)

content = content[:start] + section + content[end:]

with open('/home/z/my-project/src/app/courses/page.tsx', 'w') as f:
    f.write(content)

print('Done!')