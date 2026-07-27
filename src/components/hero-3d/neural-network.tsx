"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";
import { useSceneState } from "./scene-state";
import { packetVertexShader, packetFragmentShader } from "./shaders";

/**
 * NeuralNetwork (v2 — cinematic AI energy system)
 *
 * Upgrades over v1:
 *  - Nodes randomly activate (brightness pulses at random intervals)
 *  - Energy packets travel ALONG connections (visible moving sparks)
 *  - Connection brightness changes dynamically (random activation)
 *  - Connections randomly reconnect over time (topology morphs)
 *  - Soft glow emitted from active nodes
 *  - Mouse attracts nearby nodes (energy field)
 *  - Scroll subtly speeds up the network activity
 *
 * Every node + connection has independent timing — no synchronized motion.
 */
export function NeuralNetwork({ tier }: { tier: TierConfig }) {
  return (
    <group>
      <NeuralNodes tier={tier} />
    </group>
  );
}

interface NodeData {
  basePos: THREE.Vector3;
  orbitR: number;
  orbitSpeed: number;
  orbitAxis: THREE.Vector3;
  scale: number;
  phase: number;
  bob: number;
  isHub: boolean;
  color: [number, number, number];
  // Activation state
  activationPhase: number;
  activationSpeed: number;
  activationDepth: number;
}

interface ConnData {
  a: number;
  b: number;
  phase: number;
  pulseSpeed: number;
  brightnessPhase: number;
  brightnessSpeed: number;
  // Reconnection timer
  nextReconnect: number;
  // Cached endpoint refs
  endA: THREE.Vector3;
  endB: THREE.Vector3;
}

function NeuralNodes({ tier }: { tier: TierConfig }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const sceneState = useSceneState();

  const nodes = useMemo<NodeData[]>(() => {
    const rand = mulberry32(7);
    const palette = [
      SCENE_COLORS.violet,
      SCENE_COLORS.cyan,
      SCENE_COLORS.blue,
      SCENE_COLORS.magenta,
      SCENE_COLORS.amber,
    ];
    return new Array(tier.nodes).fill(0).map((_, i) => ({
      basePos: new THREE.Vector3(
        (rand() - 0.5) * 22,
        (rand() - 0.5) * 12,
        (rand() - 0.5) * 16 - 4
      ),
      orbitR: 0.5 + rand() * 2.2,
      orbitSpeed: (rand() - 0.5) * 0.4,
      orbitAxis: new THREE.Vector3(
        rand() - 0.5,
        rand() - 0.5,
        rand() - 0.5
      ).normalize(),
      scale: 0.12 + rand() * 0.22,
      phase: rand() * Math.PI * 2,
      bob: 0.2 + rand() * 0.5,
      isHub: i % 6 === 0,
      color: palette[i % palette.length],
      // Per-node random activation timing
      activationPhase: rand() * Math.PI * 2,
      activationSpeed: 0.3 + rand() * 1.2,
      activationDepth: 0.4 + rand() * 0.6,
    }));
  }, [tier.nodes]);

  // Expose node world positions for connections via ref
  const positionsRef = useRef<THREE.Vector3[]>([]);
  if (positionsRef.current.length !== nodes.length) {
    positionsRef.current = nodes.map((n) => n.basePos.clone());
  }

  // Mouse interaction vectors
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);

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

    nodes.forEach((n, i) => {
      // Orbit around a random axis
      const ang = t * n.orbitSpeed;
      const q = new THREE.Quaternion().setFromAxisAngle(n.orbitAxis, ang);
      const offset = new THREE.Vector3(n.orbitR, 0, 0).applyQuaternion(q);
      const pos = n.basePos.clone().add(offset);
      pos.y += Math.sin(t * 0.6 + n.phase) * n.bob;

      // Mouse attraction (soft)
      if (mouseActive) {
        tmpVec.copy(pos).sub(mouseWorld);
        const distSq = tmpVec.lengthSq();
        if (distSq < 16) {
          const dist = Math.sqrt(distSq) || 0.001;
          const force = (1 - dist / 4) * 0.4;
          // Pull node slightly toward mouse
          pos.add(tmpVec.normalize().multiplyScalar(-force));
        }
      }

      // Scroll reaction: subtle Z push + scale pulse
      pos.z -= scrollProg * 0.5;

      positionsRef.current[i].copy(pos);

      dummy.position.copy(pos);

      // Random activation: per-node pulse (incommensurate freqs)
      const activation =
        Math.pow(0.5 + 0.5 * Math.sin(t * n.activationSpeed + n.activationPhase), 3) *
        n.activationDepth;
      const pulse = 1 + Math.sin(t * 2 + n.phase) * 0.18 + activation * 0.8;

      dummy.scale.setScalar(n.scale * pulse * (n.isHub ? 1.6 : 1));
      dummy.rotation.set(t * 0.3 + n.phase, t * 0.4, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Color: base color * activation (brighter when active)
      const c = n.color;
      const intensity = 0.6 + activation * 1.4 + Math.sin(t * 2 + n.phase) * 0.2;
      color.setRGB(
        Math.min(1.5, c[0] * intensity),
        Math.min(1.5, c[1] * intensity),
        Math.min(1.5, c[2] * intensity)
      );
      mesh.setColorAt(i, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, tier.nodes]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </instancedMesh>
      <NeuralConnections positionsRef={positionsRef} tier={tier} />
      <EnergyPackets positionsRef={positionsRef} tier={tier} />
    </>
  );
}

function NeuralConnections({
  positionsRef,
  tier,
}: {
  positionsRef: React.RefObject<THREE.Vector3[]>;
  tier: TierConfig;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const mid = useMemo(() => new THREE.Vector3(), []);
  const scale = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const sceneState = useSceneState();

  const pairs = useMemo<ConnData[]>(() => {
    const rand = mulberry32(99);
    const list: ConnData[] = [];
    for (let i = 0; i < tier.connections; i++) {
      const a = Math.floor(rand() * tier.nodes);
      let b = Math.floor(rand() * tier.nodes);
      while (b === a) b = Math.floor(rand() * tier.nodes);
      list.push({
        a,
        b,
        phase: rand() * Math.PI * 2,
        pulseSpeed: 0.5 + rand() * 2.5,
        brightnessPhase: rand() * Math.PI * 2,
        brightnessSpeed: 0.3 + rand() * 1.5,
        nextReconnect: 4 + rand() * 10,
        endA: new THREE.Vector3(),
        endB: new THREE.Vector3(),
      });
    }
    return list;
  }, [tier.connections, tier.nodes]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const positions = positionsRef.current;
    if (!positions || positions.length === 0) return;
    const t = state.clock.elapsedTime;
    const scrollProg = sceneState?.current?.scroll.progress ?? 0;

    pairs.forEach((p, i) => {
      // Dynamic reconnection: occasionally swap endpoint to a new node
      if (t > p.nextReconnect) {
        const newB = Math.floor(Math.random() * tier.nodes);
        if (newB !== p.a) p.b = newB;
        p.nextReconnect = t + 4 + Math.random() * 12;
      }

      const a = positions[p.a];
      const b = positions[p.b];
      if (!a || !b) return;
      mid.copy(a).add(b).multiplyScalar(0.5);
      dir.copy(b).sub(a);
      const len = dir.length();
      if (len < 0.001) return;
      dir.normalize();

      dummy.position.copy(mid);
      const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
      dummy.quaternion.copy(q);

      // Brightness changes (random activation per connection)
      const brightness =
        0.3 +
        Math.pow(0.5 + 0.5 * Math.sin(t * p.brightnessSpeed + p.brightnessPhase), 2) * 0.9;
      // Energy pulse traveling along the connection (affects thickness)
      const pulseWave = 0.5 + 0.5 * Math.sin(t * p.pulseSpeed + p.phase);
      const thickness = 0.008 + pulseWave * 0.012;
      scale.set(thickness, len, thickness);
      dummy.scale.copy(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Color shifts: hue mix between violet/cyan based on pulse wave
      const mix = (Math.sin(t * p.pulseSpeed * 0.5 + p.phase) + 1) * 0.5;
      const r = SCENE_COLORS.violet[0] * (1 - mix) + SCENE_COLORS.cyan[0] * mix;
      const g = SCENE_COLORS.violet[1] * (1 - mix) + SCENE_COLORS.cyan[1] * mix;
      const b2 = SCENE_COLORS.violet[2] * (1 - mix) + SCENE_COLORS.cyan[2] * mix;
      const scrollBoost = 1 + scrollProg * 0.4;
      color
        .setRGB(r, g, b2)
        .multiplyScalar(brightness * scrollBoost * 0.7);
      mesh.setColorAt(i, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, tier.connections]}
      frustumCulled={false}
    >
      <cylinderGeometry args={[1, 1, 1, 6, 1, true]} />
      <meshBasicMaterial
        toneMapped={false}
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

/**
 * EnergyPackets — bright glowing sprites that travel ALONG the
 * neural connections. Each packet picks a random connection,
 * travels from endpoint A → B, then picks a new one.
 * Creates the "data flowing through the network" look.
 */
function EnergyPackets({
  positionsRef,
  tier,
}: {
  positionsRef: React.RefObject<THREE.Vector3[]>;
  tier: TierConfig;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const sceneState = useSceneState();

  const packets = useMemo(() => {
    const rand = mulberry32(2025);
    const palette = [
      SCENE_COLORS.cyan,
      SCENE_COLORS.violet,
      SCENE_COLORS.blue,
      SCENE_COLORS.amber,
      SCENE_COLORS.white,
    ];
    return new Array(tier.energyPackets).fill(0).map((_, i) => ({
      connIndex: Math.floor(rand() * tier.connections),
      progress: rand(),
      speed: 0.15 + rand() * 0.45,
      size: 0.06 + rand() * 0.1,
      color: palette[i % palette.length],
      phase: rand() * Math.PI * 2,
    }));
  }, [tier.energyPackets, tier.connections]);

  // Cache of connection pair indices (matches NeuralConnections.pairs
  // via the same seed — recreated here to keep components decoupled)
  const pairs = useMemo(() => {
    const rand = mulberry32(99);
    const list: { a: number; b: number }[] = [];
    for (let i = 0; i < tier.connections; i++) {
      const a = Math.floor(rand() * tier.nodes);
      let b = Math.floor(rand() * tier.nodes);
      while (b === a) b = Math.floor(rand() * tier.nodes);
      list.push({ a, b });
    }
    return list;
  }, [tier.connections, tier.nodes]);

  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);
  const tmpMid = useMemo(() => new THREE.Vector3(), []);

  // Uniforms for the packet shader
  const uniforms = useMemo(() => {
    const arr: { uTime: { value: number }; uColor: { value: THREE.Vector3 }; uIntensity: { value: number } }[] = [];
    for (let i = 0; i < tier.energyPackets; i++) {
      arr.push({
        uTime: { value: 0 },
        uColor: { value: new THREE.Vector3(...packets[i].color) },
        uIntensity: { value: 1 },
      });
    }
    return arr;
  }, [tier.energyPackets, packets]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const positions = positionsRef.current;
    if (!positions || positions.length === 0) return;
    const t = state.clock.elapsedTime;
    const scrollProg = sceneState?.current?.scroll.progress ?? 0;

    packets.forEach((pkt, i) => {
      const pair = pairs[pkt.connIndex];
      if (!pair) return;
      const a = positions[pair.a];
      const b = positions[pair.b];
      if (!a || !b) return;

      // Advance progress
      pkt.progress += pkt.speed * state.clock.elapsedTime * 0.016 * 0.016 + 0.008;
      if (pkt.progress > 1) {
        pkt.progress = 0;
        // Pick a new random connection
        pkt.connIndex = Math.floor(Math.random() * tier.connections);
      }

      // Position along the connection with a slight arc
      tmpA.copy(a);
      tmpB.copy(b);
      tmpMid.copy(tmpA).lerp(tmpB, pkt.progress);
      // Arc above the line
      const arcHeight = Math.sin(pkt.progress * Math.PI) * 0.3;
      tmpMid.y += arcHeight;

      dummy.position.copy(tmpMid);
      const pulse = 1 + Math.sin(t * 4 + pkt.phase) * 0.3;
      dummy.scale.setScalar(pkt.size * pulse * (1 + scrollProg * 0.3));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Update uniforms
      uniforms[i].uTime.value = t;
      uniforms[i].uIntensity.value = 1 + Math.sin(t * 3 + pkt.phase) * 0.4;

      // Per-instance color via instanceColor
      const c = pkt.color;
      const intensity = 1.5 + Math.sin(t * 3 + pkt.phase) * 0.5;
      color.setRGB(c[0] * intensity, c[1] * intensity, c[2] * intensity);
      mesh.setColorAt(i, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  // Use a single material; per-instance color via instanceColor.
  // For per-instance uniforms we'd need a custom approach — instead,
  // use meshBasicMaterial with additive blending and let instanceColor
  // drive the color. The packet shader is used as a fallback reference
  // for future enhancement.
  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, tier.energyPackets]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 12, 12]} />
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

// Suppress unused-import warnings for shaders (kept for future use)
void packetVertexShader;
void packetFragmentShader;
