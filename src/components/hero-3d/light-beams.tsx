"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";

/**
 * LightBeams — tall thin emissive cylinders rising from the floor,
 * simulating volumetric light shafts. Each beam pulses and drifts slowly.
 */
export function LightBeams({ tier }: { tier: TierConfig }) {
  const beams = useMemo(() => {
    const rand = mulberry32(13);
    const palette = [
      SCENE_COLORS.violet,
      SCENE_COLORS.cyan,
      SCENE_COLORS.blue,
      SCENE_COLORS.magenta,
      SCENE_COLORS.amber,
    ];
    return new Array(tier.beams).fill(0).map((_, i) => ({
      position: [
        (rand() - 0.5) * 20,
        2 + rand() * 4,
        -8 - rand() * 6,
      ] as [number, number, number],
      height: 14 + rand() * 10,
      radius: 0.05 + rand() * 0.1,
      tilt: (rand() - 0.5) * 0.15,
      phase: rand() * Math.PI * 2,
      speed: 0.4 + rand() * 0.8,
      color: palette[i % palette.length],
    }));
  }, [tier.beams]);

  return (
    <group>
      {beams.map((b, i) => (
        <Beam key={i} config={b} />
      ))}
    </group>
  );
}

function Beam({
  config,
}: {
  config: {
    position: [number, number, number];
    height: number;
    radius: number;
    tilt: number;
    phase: number;
    speed: number;
    color: [number, number, number];
  };
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pulse = 0.5 + Math.sin(t * config.speed + config.phase) * 0.5;
    ref.current.scale.x = 1 + pulse * 0.6;
    ref.current.scale.z = 1 + pulse * 0.6;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.15 + pulse * 0.25;
    // Slow drift
    ref.current.position.x = config.position[0] + Math.sin(t * 0.2 + config.phase) * 0.5;
  });

  return (
    <mesh
      ref={ref}
      position={config.position}
      rotation={[config.tilt, 0, config.tilt]}
    >
      <cylinderGeometry args={[config.radius, config.radius * 0.5, config.height, 12, 1, true]} />
      <meshBasicMaterial
        color={new THREE.Color(config.color[0], config.color[1], config.color[2])}
        transparent
        opacity={0.25}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
