/**
 * Hero 3D scene config — shared palette, performance tiers, helpers.
 * Keeps the visual language in sync with the Larawans dark premium theme.
 *
 * Enhanced (v2): adds tiers for new cinematic features (energy packets,
 * animated lights, nebula clouds, postprocessing flags) and shared
 * easing/random helpers used across all components for organic motion.
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
  // Deep space tones for backgrounds
  deepViolet: [0.18, 0.12, 0.42] as [number, number, number],
  deepCyan: [0.04, 0.32, 0.36] as [number, number, number],
  deepMagenta: [0.42, 0.08, 0.32] as [number, number, number],
} as const;

export type PerformanceTier = "mobile" | "tablet" | "desktop";

export interface TierConfig {
  particles: number;
  nodes: number;
  connections: number;
  rings: number;
  glassObjects: number;
  beams: number;
  energyPackets: number;
  animatedLights: number;
  nebulaClouds: number;
  dustParticles: number;
  dpr: [number, number];
  bloom: number;
  enableFog: boolean;
  enableTransmission: boolean;
  enableSSAO: boolean;
  enableDOF: boolean;
  enableGodRays: boolean;
  enableChromaticAberration: boolean;
  enableSelectiveBloom: boolean;
}

export const TIERS: Record<PerformanceTier, TierConfig> = {
  mobile: {
    particles: 220,
    nodes: 24,
    connections: 32,
    rings: 2,
    glassObjects: 4,
    beams: 3,
    energyPackets: 6,
    animatedLights: 2,
    nebulaClouds: 2,
    dustParticles: 60,
    dpr: [1, 1.5],
    bloom: 0.7,
    enableFog: true,
    enableTransmission: false,
    enableSSAO: false,
    enableDOF: false,
    enableGodRays: false,
    enableChromaticAberration: true,
    enableSelectiveBloom: false,
  },
  tablet: {
    particles: 500,
    nodes: 40,
    connections: 60,
    rings: 3,
    glassObjects: 6,
    beams: 4,
    energyPackets: 12,
    animatedLights: 3,
    nebulaClouds: 3,
    dustParticles: 120,
    dpr: [1, 1.75],
    bloom: 0.9,
    enableFog: true,
    enableTransmission: false,
    enableSSAO: false,
    enableDOF: false,
    enableGodRays: false,
    enableChromaticAberration: true,
    enableSelectiveBloom: false,
  },
  desktop: {
    particles: 600,
    nodes: 48,
    connections: 72,
    rings: 4,
    glassObjects: 6,
    beams: 5,
    energyPackets: 14,
    animatedLights: 3,
    nebulaClouds: 3,
    dustParticles: 150,
    dpr: [1, 1.75],
    bloom: 1.0,
    enableFog: true,
    enableTransmission: false,
    enableSSAO: false,
    enableDOF: false,
    enableGodRays: false,
    enableChromaticAberration: true,
    enableSelectiveBloom: false,
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

/**
 * Smoothstep easing — natural acceleration/deceleration.
 * Used everywhere for organic motion instead of linear interpolation.
 */
export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Cubic ease in-out — premium "Apple-like" easing.
 */
export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Pick a deterministic palette color by index.
 */
export function pickColor(i: number, palette: number[][] = [
  SCENE_COLORS.violet as unknown as number[],
  SCENE_COLORS.cyan as unknown as number[],
  SCENE_COLORS.blue as unknown as number[],
  SCENE_COLORS.magenta as unknown as number[],
  SCENE_COLORS.amber as unknown as number[],
  SCENE_COLORS.white as unknown as number[],
]) {
  return palette[i % palette.length] as [number, number, number];
}

/** Shared mouse state ref — populated by CameraRig, read by other components. */
export interface MouseState {
  x: number;
  y: number;
  active: boolean;
  worldX: number;
  worldY: number;
  worldZ: number;
}

/** Shared scroll state ref — populated by CameraRig, read by other components. */
export interface ScrollState {
  progress: number; // 0..1 over hero
  velocity: number; // smoothed scroll velocity
}
