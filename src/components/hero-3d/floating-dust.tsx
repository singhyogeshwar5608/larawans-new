"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";
import { dustVertexShader, dustFragmentShader } from "./shaders";
import { useSceneState } from "./scene-state";

/**
 * FloatingDust — GPU-rendered point cloud of tiny twinkling dust motes.
 *
 * Uses a custom shader (dustVertexShader / dustFragmentShader) so all
 * motion + twinkle is computed on the GPU — single draw call for
 * hundreds of points.
 *
 * Each dust mote has:
 *  - Random position (spherical shell)
 *  - Random size
 *  - Random color (from brand palette)
 *  - Random twinkle phase + speed
 *  - Slow drift via shader (uTime)
 *
 * Scroll reaction: the whole cloud subtly drifts upward as the user
 * scrolls, creating a "flying through dust" feel.
 */
export function FloatingDust({ tier }: { tier: TierConfig }) {
  const pointsRef = useRef<THREE.Points>(null);
  const sceneState = useSceneState();

  const { positions, sizes, phases, colors } = useMemo(() => {
    const rand = mulberry32(8888);
    const palette = [
      SCENE_COLORS.white,
      SCENE_COLORS.cyan,
      SCENE_COLORS.violet,
      SCENE_COLORS.blue,
      SCENE_COLORS.amber,
    ];
    const positions = new Float32Array(tier.dustParticles * 3);
    const sizes = new Float32Array(tier.dustParticles);
    const phases = new Float32Array(tier.dustParticles);
    const colors = new Float32Array(tier.dustParticles * 3);

    for (let i = 0; i < tier.dustParticles; i++) {
      // Spherical shell spawn
      const r = 5 + rand() * 25;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) - 5;

      sizes[i] = 0.5 + rand() * 2.5;
      phases[i] = rand();

      const c = palette[Math.floor(rand() * palette.length)];
      colors[i * 3] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }
    return { positions, sizes, phases, colors };
  }, [tier.dustParticles]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 18 },
      uTwinkle: { value: 1.0 },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    if (!pointsRef.current) return;
    const ss = sceneState?.current;
    const scrollProg = ss?.scroll.progress ?? 0;
    // Subtle scroll drift
    pointsRef.current.position.y = scrollProg * 1.5;
    // Mouse rotation parallax
    if (ss?.mouse.active) {
      pointsRef.current.rotation.y += (ss.mouse.x * 0.05 - pointsRef.current.rotation.y) * 0.02;
      pointsRef.current.rotation.x += (-ss.mouse.y * 0.05 - pointsRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={tier.dustParticles}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
          count={tier.dustParticles}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[phases, 1]}
          count={tier.dustParticles}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
          count={tier.dustParticles}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={dustVertexShader}
        fragmentShader={dustFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
