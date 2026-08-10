#!/bin/bash
cd /home/z/my-project
FILES=(
  src/app/globals.css
  tailwind.config.ts
  src/app/layout.tsx
  src/app/page.tsx
  src/components/navbar.tsx
  src/components/aurora-background.tsx
  src/components/sections/hero.tsx
  src/components/sections/services.tsx
  src/components/sections/portfolio.tsx
  src/components/sections/courses.tsx
  src/components/sections/ai-solutions.tsx
  src/components/sections/project-showcase.tsx
  src/components/sections/contact.tsx
  src/components/sections/footer.tsx
  src/components/sections/testimonials.tsx
  src/components/sections/faq.tsx
  src/components/sections/industries.tsx
  src/components/sections/tech-stack.tsx
  src/components/sections/why-larawans.tsx
  src/components/sections/development-process.tsx
  src/components/sections/trusted-companies.tsx
  src/components/magnetic-button.tsx
  src/components/particle-network.tsx
  src/components/reveal.tsx
  src/components/counter.tsx
  src/components/section-heading.tsx
  src/components/project-simulator.tsx
  src/components/smooth-scroll-provider.tsx
  src/lib/site-data.ts
  src/lib/service-data.ts
  src/lib/course-data.ts
  vite.config.ts
  index.html
  package.json
  src/components/sections/project-showcase.tsx
  src/components/sections/why-larawans.tsx
  src/components/sections/testimonials.tsx
)

for f in "${FILES[@]}"; do
  zippath="Larawans/$f"
  if [ -f "$f" ]; then
    zipmd=$(unzip -p upload/Larawans.zip "$zippath" 2>/dev/null | md5sum | awk '{print $1}')
    localmd=$(md5sum "$f" | awk '{print $1}')
    if [ "$zipmd" = "" ]; then
      echo "NOT IN ZIP: $f"
    elif [ "$zipmd" != "$localmd" ]; then
      echo "CHANGED: $f"
    else
      echo "OK: $f"
    fi
  else
    echo "MISSING: $f"
  fi
done