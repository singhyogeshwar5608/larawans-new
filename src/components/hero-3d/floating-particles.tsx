"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";
import { useSceneState } from "./scene-state";

/**
 * FloatingParticles (v2 — cinematic)
 *
 * Upgrades over v1:
 *  - Multiple particle sizes (3 distinct size classes: dust / spark / orb)
 *  - Multiple opacity levels per particle
 *  - Random velocities (each particle has unique speed AND direction)
 *  - Random floating directions (not just orbital swirl — true 3D drift)
 *  - Random orbital radius (some near, some far)
 *  - Depth-based blur illusion (distant particles are dimmer + smaller)
 *  - Dynamic glow intensity (per-particle pulse with unique phase)
 *  - Random twinkling (sin-based, never synced across particles)
 *
 * Mouse repulsion: particles within radius are pushed away from cursor
 * (energy field). Smoothly returns when cursor moves away.
 *
 * Scroll reaction: subtle radial expansion + brightness shift.
 *
 * Infinite animation: layered sin curves with incommensurate frequencies
 * so no two particles ever share the same motion curve.
 */
export function FloatingParticles({ tier }: { tier: TierConfig }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const sceneState = useSceneState();

  // Mouse interaction vectors (pre-allocated)
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);
  const particlePos = useMemo(() => new THREE.Vector3(), []);
  const repulsion = useMemo(() => new THREE.Vector3(), []);

  const particles = useMemo(() => {
    const rand = mulberry32(1337);
    const palette = [
      SCENE_COLORS.violet,
      SCENE_COLORS.cyan,
      SCENE_COLORS.blue,
      SCENE_COLORS.magenta,
      SCENE_COLORS.amber,
      SCENE_COLORS.white,
      SCENE_COLORS.lime,
    ];

    // Three size classes: dust (small, many), spark (med), orb (large, few)
    return new Array(tier.particles).fill(0).map((_, i) => {
      const sizeClass = i % 7 === 0 ? "orb" : i % 3 === 0 ? "spark" : "dust";
      const sizeRange = {
        dust: 0.015 + rand() * 0.03,
        spark: 0.05 + rand() * 0.06,
        orb: 0.12 + rand() * 0.12,
      }[sizeClass];

      // Spherical spawn with random radius (some near, some far)
      const r = 4 + rand() * 24;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);

      // Random drift direction (true 3D, not constrained to Y axis)
      const driftTheta = rand() * Math.PI * 2;
      const driftPhi = Math.acos(2 * rand() - 1);

      return {
        basePos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.65,
          r * Math.cos(phi) - 5
        ),
        scale: sizeRange,
        // Incommensurate speeds so motion never syncs
        speedX: 0.04 + rand() * 0.22,
        speedY: 0.03 + rand() * 0.18,
        speedZ: 0.02 + rand() * 0.14,
        phase: rand() * Math.PI * 2,
        phase2: rand() * Math.PI * 2,
        phase3: rand() * Math.PI * 2,
        bobAmp: 0.2 + rand() * 1.1,
        driftAmp: 0.4 + rand() * 1.6,
        driftDir: new THREE.Vector3(
          Math.sin(driftPhi) * Math.cos(driftTheta),
          Math.sin(driftPhi) * Math.sin(driftTheta),
          Math.cos(driftPhi)
        ),
        color: palette[Math.floor(rand() * palette.length)],
        baseOpacity: 0.3 + rand() * 0.7,
        twinkleSpeed: 0.5 + rand() * 3.5,
        twinkleDepth: 0.2 + rand() * 0.6,
        glowSpeed: 0.8 + rand() * 2.2,
        // Orbital swirl — random radius & speed
        orbitR: 0.3 + rand() * 2.5,
        orbitSpeed: (rand() - 0.5) * 0.5,
        // Depth (0 = near, 1 = far) — drives blur illusion
        depth: (r - 4) / 24,
        sizeClass,
      };
    });
  }, [tier.particles]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    const ss = sceneState?.current;
    const mouseActive = ss?.mouse.active ?? false;
    const scrollProg = ss?.scroll.progress ?? 0;

    if (mouseActive && ss) {
      mouseWorld.set(ss.mouse.worldX, ss.mouse.worldY, ss.mouse.worldZ);
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Orbital swirl around Y (random radius & speed)
      const ang = t * p.orbitSpeed * 0.12;
      const cos = Math.cos(ang);
      const sin = Math.sin(ang);
      const orbX = p.basePos.x * cos - p.basePos.z * sin;
      const orbZ = p.basePos.x * sin + p.basePos.z * cos;

      // True 3D drift (independent X/Y/Z with incommensurate freqs)
      const driftX =
        Math.sin(t * p.speedX + p.phase) * p.driftAmp * p.driftDir.x;
      const driftY =
        Math.cos(t * p.speedY + p.phase2) * p.bobAmp +
        Math.sin(t * p.speedY * 0.6 + p.phase) * p.driftAmp * 0.4 * p.driftDir.y;
      const driftZ =
        Math.sin(t * p.speedZ + p.phase3) * p.driftAmp * p.driftDir.z;

      let x = orbX + driftX;
      let y = p.basePos.y + driftY;
      let z = orbZ + driftZ;

      // Mouse repulsion (energy field)
      if (mouseActive) {
        particlePos.set(x, y, z);
        const distSq = particlePos.distanceToSquared(mouseWorld);
        const repulseR = 4;
        if (distSq < repulseR * repulseR) {
          const dist = Math.sqrt(distSq) || 0.001;
          const force = (1 - dist / repulseR) * 1.5;
          repulsion.copy(particlePos).sub(mouseWorld).normalize().multiplyScalar(force);
          x += repulsion.x;
          y += repulsion.y;
          z += repulsion.z;
        }
      }

      // Scroll reaction: subtle radial expansion + Z push
      const scrollPush = scrollProg * 2;
      x *= 1 + scrollPush * 0.05;
      y *= 1 + scrollPush * 0.04;
      z += scrollPush * 0.5;

      dummy.position.set(x, y, z);

      // Twinkling (per-particle unique speed & depth)
      const twinkle = 1 - p.twinkleDepth * 0.5 +
        p.twinkleDepth * 0.5 * Math.sin(t * p.twinkleSpeed + p.phase);

      // Depth-based blur illusion: distant particles smaller + dimmer
      const depthFade = 1 - p.depth * 0.6;
      const scrollScale = 1 - scrollProg * 0.2;

      // Glow pulse (per-particle)
      const glow = 0.7 + 0.3 * Math.sin(t * p.glowSpeed + p.phase2);

      dummy.scale.setScalar(p.scale * twinkle * depthFade * scrollScale * glow);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Color: per-particle base color * twinkle * glow * depth fade
      const c = p.color;
      const intensity = twinkle * glow * depthFade * p.baseOpacity;
      color.setRGB(c[0] * intensity, c[1] * intensity, c[2] * intensity);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, tier.particles]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        toneMapped={false}
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
