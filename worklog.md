---
Task ID: 1
Agent: Main Agent
Task: Fix hero section white overlay + missing 3D effect

Work Log:
- Diagnosed root cause: WebGLBoundary's aggressive shader perf benchmark (60ms for 8 passes) was causing false-negative WebGL failures, falling back to ParticleNetwork on many real devices
- Found secondary bug: R3F Canvas silently renders a 300×150 blank canvas when WebGL context creation fails — this does NOT throw a React error, so error boundary alone is insufficient
- Found third bug: `void useRef;` referencing undefined import after `useRef` was accidentally removed from hero-3d-scene.tsx imports, causing a crash before the component even mounted
- Fixed WebGLBoundary: replaced aggressive shader benchmark with a minimal `probeWebGL()` that only tests context creation (no perf test)
- Added `bg-[#050614]` to hero section to prevent any white flash during loading
- Added `style={{ background: "#050614" }}` to R3F Canvas as a safety net
- Removed broken `void useRef;` from hero-3d-scene.tsx

Stage Summary:
- Hero section now: dark background (no white overlay), particle effects visible, clean console (no errors)
- On real GPUs: WebGL context is created → full 3D R3F scene renders
- On headless/sandbox/VM: probeWebGL fails → graceful ParticleNetwork fallback
- Files modified: webgl-boundary.tsx, hero.tsx, hero-3d-scene.tsx
