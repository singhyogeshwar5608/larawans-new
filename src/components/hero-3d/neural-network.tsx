"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";

/**
 * NeuralNetwork — animated AI nodes (instanced glowing icosahedrons) +
 * energy connections (instanced thin cylinders) that pulse along their length.
 *
 * Each node orbits slowly. Connections inherit their endpoints from the
 * nearest pair of nodes, so the network feels alive without any per-frame
 * allocation.
 */
export function NeuralNetwork({ tier }: { tier: TierConfig }) {
  return (
    <group>
      <NeuralNodes tier={tier} />
      <NeuralConnections tier={tier} />
    </group>
  );
}

function NeuralNodes({ tier }: { tier: TierConfig }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const nodes = useMemo(() => {
    const rand = mulberry32(7);
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
    }));
  }, [tier.nodes]);

  // Expose node world positions for connections via ref
  const positionsRef = useRef<THREE.Vector3[]>([]);
  if (positionsRef.current.length !== nodes.length) {
    positionsRef.current = nodes.map((n) => n.basePos.clone());
  }

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    nodes.forEach((n, i) => {
      // Orbit around a random axis
      const ang = t * n.orbitSpeed;
      const q = new THREE.Quaternion().setFromAxisAngle(n.orbitAxis, ang);
      const offset = new THREE.Vector3(n.orbitR, 0, 0).applyQuaternion(q);
      const pos = n.basePos.clone().add(offset);
      pos.y += Math.sin(t * 0.6 + n.phase) * n.bob;
      positionsRef.current[i].copy(pos);

      dummy.position.copy(pos);
      const pulse = 1 + Math.sin(t * 2 + n.phase) * 0.18;
      dummy.scale.setScalar(n.scale * pulse * (n.isHub ? 1.6 : 1));
      dummy.rotation.set(t * 0.3 + n.phase, t * 0.4, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const c = n.isHub ? SCENE_COLORS.cyan : SCENE_COLORS.violet;
      const cPulse = 0.7 + Math.sin(t * 2 + n.phase) * 0.4;
      color.setRGB(c[0] * cPulse, c[1] * cPulse, c[2] * cPulse);
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
        <meshBasicMaterial toneMapped={false} blending={THREE.AdditiveBlending} transparent depthWrite={false} />
      </instancedMesh>
      <NeuralConnections positionsRef={positionsRef} tier={tier} />
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

  // Precompute stable connection pairs
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

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const positions = positionsRef.current;
    if (!positions || positions.length === 0) return;
    const t = state.clock.elapsedTime;

    pairs.forEach((p, i) => {
      const a = positions[p.a];
      const b = positions[p.b];
      if (!a || !b) return;
      mid.copy(a).add(b).multiplyScalar(0.5);
      dir.copy(b).sub(a);
      const len = dir.length();
      if (len < 0.001) return;
      dir.normalize();

      dummy.position.copy(mid);
      // Align cylinder (Y axis) with direction
      const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
      dummy.quaternion.copy(q);
      const pulse = 0.5 + Math.sin(t * 2 + i * 0.4) * 0.5;
      scale.set(0.012, len, 0.012);
      dummy.scale.copy(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Color shifts along energy wave
      const mix = (Math.sin(t * 1.5 + i * 0.3) + 1) * 0.5;
      const r = SCENE_COLORS.violet[0] * (1 - mix) + SCENE_COLORS.cyan[0] * mix;
      const g = SCENE_COLORS.violet[1] * (1 - mix) + SCENE_COLORS.cyan[1] * mix;
      const b2 = SCENE_COLORS.violet[2] * (1 - mix) + SCENE_COLORS.cyan[2] * mix;
      color.setRGB(r, g, b2).multiplyScalar(0.3 + pulse * 0.9);
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
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
