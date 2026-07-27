"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";
import { nebulaVertexShader, nebulaFragmentShader } from "./shaders";
import { useSceneState } from "./scene-state";

/**
 * NebulaClouds (v2)
 *
 * Multiple large soft spheres with procedural 3D-noise shaders acting
 * as the "energy clouds" / "animated nebula" background layer.
 *
 * Each cloud:
 *  - Sits at a different depth (parallax layers)
 *  - Slowly drifts on its own Lissajous path
 *  - Has a unique color pair from the brand palette
 *  - Rotates very slowly so the noise field never repeats
 *
 * Combined with the existing VolumetricFog, this creates the
 * "digital space environment" the brief calls for.
 */
export function NebulaClouds({ tier }: { tier: TierConfig }) {
  const clouds = useMemo(() => {
    const rand = mulberry32(31337);
    const palette = [
      [SCENE_COLORS.violet, SCENE_COLORS.magenta, SCENE_COLORS.blue],
      [SCENE_COLORS.cyan, SCENE_COLORS.blue, SCENE_COLORS.violet],
      [SCENE_COLORS.magenta, SCENE_COLORS.violet, SCENE_COLORS.amber],
      [SCENE_COLORS.blue, SCENE_COLORS.cyan, SCENE_COLORS.deepViolet],
    ];
    return new Array(tier.nebulaClouds).fill(0).map((_, i) => ({
      position: [
        (rand() - 0.5) * 20,
        (rand() - 0.5) * 10,
        -10 - rand() * 12,
      ] as [number, number, number],
      scale: 12 + rand() * 8,
      rotation: [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI] as [
        number,
        number,
        number
      ],
      rotSpeed: 0.005 + rand() * 0.015,
      driftAmp: 1 + rand() * 2,
      driftSpeed: 0.04 + rand() * 0.08,
      driftPhase: rand() * Math.PI * 2,
      colors: palette[i % palette.length],
      opacity: 0.35 + rand() * 0.25,
    }));
  }, [tier.nebulaClouds]);

  return (
    <group>
      {clouds.map((c, i) => (
        <NebulaCloud key={i} config={c} />
      ))}
    </group>
  );
}

function NebulaCloud({
  config,
}: {
  config: {
    position: [number, number, number];
    scale: number;
    rotation: [number, number, number];
    rotSpeed: number;
    driftAmp: number;
    driftSpeed: number;
    driftPhase: number;
    colors: [typeof SCENE_COLORS.violet, typeof SCENE_COLORS.cyan, typeof SCENE_COLORS.blue];
    opacity: number;
  };
}) {
  const ref = useRef<THREE.Mesh>(null);
  const basePos = useMemo(
    () => new THREE.Vector3(...config.position),
    [config.position]
  );
  const sceneState = useSceneState();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Vector3(...config.colors[0]) },
      uColorB: { value: new THREE.Vector3(...config.colors[1]) },
      uColorC: { value: new THREE.Vector3(...config.colors[2]) },
      uOpacity: { value: config.opacity },
    }),
    [config.colors, config.opacity]
  );

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Slow rotation so the noise field drifts
    ref.current.rotation.y += config.rotSpeed * delta;
    ref.current.rotation.x += config.rotSpeed * 0.6 * delta;

    // Independent drift
    const drift = Math.sin(t * config.driftSpeed + config.driftPhase) * config.driftAmp;
    ref.current.position.x = basePos.x + drift;
    ref.current.position.y = basePos.y + Math.cos(t * config.driftSpeed * 0.7) * config.driftAmp * 0.5;

    // Scroll reaction: subtle parallax (closer clouds move more)
    const scrollProg = sceneState?.current?.scroll.progress ?? 0;
    ref.current.position.z = basePos.z + scrollProg * 2;

    uniforms.uTime.value += delta;
  });

  return (
    <mesh
      ref={ref}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
    >
      <sphereGeometry args={[1, 48, 48]} />
      <shaderMaterial
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
