"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";
import { ringVertexShader, ringFragmentShader } from "./shaders";

/**
 * HolographicRings — slowly rotating torus rings with custom Fresnel +
 * scanline shader. Each ring has a different orientation & speed so the
 * composition never quite repeats.
 */
export function HolographicRings({ tier }: { tier: TierConfig }) {
  const rings = useMemo(() => {
    const rand = mulberry32(42);
    const palette = [
      [SCENE_COLORS.violet, SCENE_COLORS.cyan],
      [SCENE_COLORS.cyan, SCENE_COLORS.blue],
      [SCENE_COLORS.magenta, SCENE_COLORS.violet],
      [SCENE_COLORS.blue, SCENE_COLORS.magenta],
    ];
    return new Array(tier.rings).fill(0).map((_, i) => ({
      radius: 5 + i * 1.8 + rand() * 1.2,
      tube: 0.025 + rand() * 0.025,
      rotation: [
        rand() * Math.PI,
        rand() * Math.PI,
        rand() * Math.PI,
      ] as [number, number, number],
      rotSpeed: [
        (rand() - 0.5) * 0.15,
        (rand() - 0.5) * 0.15,
        (rand() - 0.5) * 0.15,
      ] as [number, number, number],
      position: [
        (rand() - 0.5) * 4,
        (rand() - 0.5) * 2,
        -2 - rand() * 3,
      ] as [number, number, number],
      colors: palette[i % palette.length],
      opacity: 0.8 - i * 0.12,
    }));
  }, [tier.rings]);

  return (
    <group>
      {rings.map((r, i) => (
        <Ring key={i} config={r} />
      ))}
    </group>
  );
}

function Ring({
  config,
}: {
  config: {
    radius: number;
    tube: number;
    rotation: [number, number, number];
    rotSpeed: [number, number, number];
    position: [number, number, number];
    colors: [typeof SCENE_COLORS.violet, typeof SCENE_COLORS.cyan];
    opacity: number;
  };
}) {
  const ref = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Vector3(...config.colors[0]) },
      uColorB: { value: new THREE.Vector3(...config.colors[1]) },
      uOpacity: { value: config.opacity },
    }),
    [config.colors, config.opacity]
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += config.rotSpeed[0] * delta;
    ref.current.rotation.y += config.rotSpeed[1] * delta;
    ref.current.rotation.z += config.rotSpeed[2] * delta;
    uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={ref} position={config.position} rotation={config.rotation}>
      <torusGeometry args={[config.radius, config.tube, 16, 200]} />
      <shaderMaterial
        vertexShader={ringVertexShader}
        fragmentShader={ringFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
