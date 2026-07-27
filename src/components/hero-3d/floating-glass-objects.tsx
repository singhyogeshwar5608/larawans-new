"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";

/**
 * FloatingGlassObjects — drifting icosahedrons with refraction + thickness
 * for a true glass look. On mobile we fall back to a simpler physical
 * material to keep performance high.
 */
export function FloatingGlassObjects({ tier }: { tier: TierConfig }) {
  const items = useMemo(() => {
    const rand = mulberry32(2024);
    const geos = ["icosa", "octa", "tetra", "dodeca"] as const;
    return new Array(tier.glassObjects).fill(0).map((_, i) => ({
      position: [
        (rand() - 0.5) * 18,
        (rand() - 0.5) * 8,
        -2 - rand() * 6,
      ] as [number, number, number],
      scale: 0.4 + rand() * 0.9,
      rotation: [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI] as [
        number,
        number,
        number
      ],
      rotSpeed: [
        (rand() - 0.5) * 0.2,
        (rand() - 0.5) * 0.2,
        (rand() - 0.5) * 0.2,
      ] as [number, number, number],
      floatPhase: rand() * Math.PI * 2,
      floatAmp: 0.3 + rand() * 0.6,
      floatSpeed: 0.3 + rand() * 0.4,
      geo: geos[i % geos.length],
      tint: [
        SCENE_COLORS.violet,
        SCENE_COLORS.cyan,
        SCENE_COLORS.magenta,
        SCENE_COLORS.blue,
      ][i % 4],
    }));
  }, [tier.glassObjects]);

  return (
    <group>
      {items.map((g, i) => (
        <GlassMesh key={i} config={g} useTransmission={tier.enableTransmission} />
      ))}
    </group>
  );
}

function GlassMesh({
  config,
  useTransmission,
}: {
  config: {
    position: [number, number, number];
    scale: number;
    rotation: [number, number, number];
    rotSpeed: [number, number, number];
    floatPhase: number;
    floatAmp: number;
    floatSpeed: number;
    geo: "icosa" | "octa" | "tetra" | "dodeca";
    tint: [number, number, number];
  };
  useTransmission: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const baseY = config.position[1];

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += config.rotSpeed[0] * delta;
    ref.current.rotation.y += config.rotSpeed[1] * delta;
    ref.current.rotation.z += config.rotSpeed[2] * delta;
    ref.current.position.y = baseY + Math.sin(t * config.floatSpeed + config.floatPhase) * config.floatAmp;
    // Subtle drift in X
    ref.current.position.x = config.position[0] + Math.cos(t * config.floatSpeed * 0.6 + config.floatPhase) * 0.3;
  });

  const Geometry = () => {
    switch (config.geo) {
      case "icosa":
        return <icosahedronGeometry args={[1, 0]} />;
      case "octa":
        return <octahedronGeometry args={[1, 0]} />;
      case "tetra":
        return <tetrahedronGeometry args={[1, 0]} />;
      case "dodeca":
        return <dodecahedronGeometry args={[1, 0]} />;
    }
  };

  return (
    <mesh
      ref={ref}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
    >
      <Geometry />
      {useTransmission ? (
        <MeshTransmissionMaterial
          transmissionSampler={false}
          backside={false}
          samples={6}
          resolution={256}
          transmission={0.95}
          roughness={0.05}
          thickness={1.2}
          ior={1.4}
          chromaticAberration={0.4}
          anisotropy={0.1}
          distortion={0.3}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color={new THREE.Color(config.tint[0], config.tint[1], config.tint[2])}
          attenuationColor={new THREE.Color(config.tint[0], config.tint[1], config.tint[2])}
          attenuationDistance={1.5}
        />
      ) : (
        <meshPhysicalMaterial
          color={new THREE.Color(config.tint[0], config.tint[1], config.tint[2])}
          roughness={0.15}
          metalness={0.1}
          transmission={0.6}
          thickness={0.8}
          transparent
          opacity={0.65}
          emissive={new THREE.Color(config.tint[0], config.tint[1], config.tint[2])}
          emissiveIntensity={0.3}
        />
      )}
    </mesh>
  );
}
