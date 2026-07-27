"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";
import { useSceneState } from "./scene-state";

/**
 * FloatingGlassObjects (v2 — cinematic)
 *
 * Each object has COMPLETELY independent motion — no two ever behave
 * the same way:
 *  - Independent drift direction (random 3D vector)
 *  - Independent rotation speed per axis (X, Y, Z all different)
 *  - Independent rotation axis (random)
 *  - Random drifting amplitude
 *  - Random elevation range
 *  - Random glow pulse speed + depth
 *  - Mouse attraction (soft, with smooth return)
 *  - Scroll reaction (subtle Z push + scale shrink)
 *
 * Geometry variety: icosa / octa / tetra / dodeca — each gets a
 * unique tint from the brand palette.
 */
export function FloatingGlassObjects({ tier }: { tier: TierConfig }) {
  const items = useMemo(() => {
    const rand = mulberry32(2024);
    const geos = ["icosa", "octa", "tetra", "dodeca"] as const;
    const palette = [
      SCENE_COLORS.violet,
      SCENE_COLORS.cyan,
      SCENE_COLORS.magenta,
      SCENE_COLORS.blue,
      SCENE_COLORS.amber,
      SCENE_COLORS.lime,
    ];
    return new Array(tier.glassObjects).fill(0).map((_, i) => ({
      position: [
        (rand() - 0.5) * 20,
        (rand() - 0.5) * 10,
        -2 - rand() * 8,
      ] as [number, number, number],
      scale: 0.35 + rand() * 1.0,
      // Independent rotation per axis (incommensurate speeds)
      rotation: [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI] as [
        number,
        number,
        number
      ],
      rotSpeedX: (rand() - 0.5) * 0.4,
      rotSpeedY: (rand() - 0.5) * 0.4,
      rotSpeedZ: (rand() - 0.5) * 0.4,
      // Independent drift direction (random 3D unit vector)
      driftDir: new THREE.Vector3(
        rand() - 0.5,
        rand() - 0.5,
        rand() - 0.5
      ).normalize(),
      driftAmp: 0.4 + rand() * 1.4,
      driftSpeed: 0.15 + rand() * 0.5,
      // Independent elevation bobbing
      elevAmp: 0.3 + rand() * 0.9,
      elevSpeed: 0.2 + rand() * 0.6,
      elevPhase: rand() * Math.PI * 2,
      // Independent glow pulse
      glowSpeed: 0.5 + rand() * 2.0,
      glowDepth: 0.3 + rand() * 0.5,
      glowPhase: rand() * Math.PI * 2,
      geo: geos[i % geos.length],
      tint: palette[i % palette.length],
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

interface GlassConfig {
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  driftDir: THREE.Vector3;
  driftAmp: number;
  driftSpeed: number;
  elevAmp: number;
  elevSpeed: number;
  elevPhase: number;
  glowSpeed: number;
  glowDepth: number;
  glowPhase: number;
  geo: "icosa" | "octa" | "tetra" | "dodeca";
  tint: [number, number, number];
}

function GlassMesh({
  config,
  useTransmission,
}: {
  config: GlassConfig;
  useTransmission: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const basePos = useMemo(
    () => new THREE.Vector3(...config.position),
    [config.position]
  );
  const drift = useMemo(() => new THREE.Vector3(), []);
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);
  const toMouse = useMemo(() => new THREE.Vector3(), []);
  const sceneState = useSceneState();

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const mesh = ref.current;

    // Independent rotation per axis (incommensurate speeds)
    mesh.rotation.x += config.rotSpeedX * delta;
    mesh.rotation.y += config.rotSpeedY * delta;
    mesh.rotation.z += config.rotSpeedZ * delta;

    // Independent drift (true 3D, not just Y bob)
    drift.copy(config.driftDir).multiplyScalar(
      Math.sin(t * config.driftSpeed + config.elevPhase) * config.driftAmp
    );

    // Independent elevation
    const elev = Math.sin(t * config.elevSpeed + config.elevPhase) * config.elevAmp;

    let x = basePos.x + drift.x;
    let y = basePos.y + elev + drift.y * 0.5;
    let z = basePos.z + drift.z;

    // Mouse soft attraction (with smooth return via drift damping)
    const ss = sceneState?.current;
    if (ss?.mouse.active) {
      mouseWorld.set(ss.mouse.worldX, ss.mouse.worldY, ss.mouse.worldZ);
      toMouse.copy(mouseWorld).sub(basePos);
      const dist = toMouse.length();
      if (dist < 8) {
        const force = (1 - dist / 8) * 0.5;
        x += toMouse.x * force * 0.3;
        y += toMouse.y * force * 0.3;
        z += toMouse.z * force * 0.3;
      }
    }

    // Scroll reaction: subtle Z push + scale shrink
    const scrollProg = ss?.scroll.progress ?? 0;
    z -= scrollProg * 1.2;
    const scrollScale = 1 - scrollProg * 0.15;
    mesh.scale.setScalar(config.scale * scrollScale);

    mesh.position.set(x, y, z);

    // Glow pulse (drives emissive intensity on physical material,
    // or attenuation on transmission material)
    const glow =
      1 - config.glowDepth * 0.5 +
      config.glowDepth * 0.5 * Math.sin(t * config.glowSpeed + config.glowPhase);
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.2 + glow * 0.5;
    }
  });

  return (
    <mesh
      ref={ref}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
    >
      {config.geo === "icosa" && <icosahedronGeometry args={[1, 0]} />}
      {config.geo === "octa" && <octahedronGeometry args={[1, 0]} />}
      {config.geo === "tetra" && <tetrahedronGeometry args={[1, 0]} />}
      {config.geo === "dodeca" && <dodecahedronGeometry args={[1, 0]} />}
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
          ref={matRef}
          color={new THREE.Color(config.tint[0], config.tint[1], config.tint[2])}
          roughness={0.15}
          metalness={0.1}
          transmission={0.6}
          thickness={0.8}
          transparent
          opacity={0.7}
          emissive={new THREE.Color(config.tint[0], config.tint[1], config.tint[2])}
          emissiveIntensity={0.3}
        />
      )}
    </mesh>
  );
}
