/**
 * Hero 3D scene config — shared palette, performance tiers, helpers.
 * Keeps the visual language in sync with the Larawans dark premium theme.
 */

export const SCENE_COLORS = {
  // Brand neon palette
  violet: [0.486, 0.361, 1.0] as [number, number, number], // #7c5cff
  cyan: [0.0, 0.878, 0.776] as [number, number, number], // #00e0c6
  blue: [0.298, 0.769, 1.0] as [number, number, number], // #4dc4ff
  magenta: [1.0, 0.302, 0.824] as [number, number, number], // #ff4dd2
  amber: [1.0, 0.694, 0.302] as [number, number, number], // #ffb14d
  lime: [0.616, 1.0, 0.361] as [number, number, number], // #9dff5c
  white: [1.0, 1.0, 1.0] as [number, number, number],
} as const;

export type PerformanceTier = "mobile" | "tablet" | "desktop";

export interface TierConfig {
  particles: number;
  nodes: number;
  connections: number;
  rings: number;
  glassObjects: number;
  beams: number;
  dpr: [number, number];
  bloom: number;
  enableFog: boolean;
  enableTransmission: boolean;
}

export const TIERS: Record<PerformanceTier, TierConfig> = {
  mobile: {
    particles: 220,
    nodes: 24,
    connections: 32,
    rings: 2,
    glassObjects: 4,
    beams: 3,
    dpr: [1, 1.5],
    bloom: 0.7,
    enableFog: true,
    enableTransmission: false,
  },
  tablet: {
    particles: 500,
    nodes: 40,
    connections: 60,
    rings: 3,
    glassObjects: 6,
    beams: 4,
    dpr: [1, 1.75],
    bloom: 0.9,
    enableFog: true,
    enableTransmission: true,
  },
  desktop: {
    particles: 900,
    nodes: 64,
    connections: 96,
    rings: 4,
    glassObjects: 8,
    beams: 5,
    dpr: [1, 2],
    bloom: 1.1,
    enableFog: true,
    enableTransmission: true,
  },
};

export function detectTier(): PerformanceTier {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1280) return "tablet";
  return "desktop";
}

/** Deterministic pseudo-random for stable particle placement across SSR. */
export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
