"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";

/**
 * FloatingParticles — instanced glowing spheres drifting in pseudo-3D space.
 * Infinite orbital + bobbing motion. Mouse parallax handled by the parent
 * rig (we only animate per-instance here).
 */
export function FloatingParticles({ tier }: { tier: TierConfig }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const particles = useMemo(() => {
    const rand = mulberry32(1337);
    const palette = [
      SCENE_COLORS.violet,
      SCENE_COLORS.cyan,
      SCENE_COLORS.blue,
      SCENE_COLORS.magenta,
      SCENE_COLORS.white,
    ];
    return new Array(tier.particles).fill(0).map(() => {
      const r = 6 + rand() * 22;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      return {
        basePos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.6,
          r * Math.cos(phi) - 4
        ),
        scale: 0.02 + rand() * 0.09,
        speed: 0.05 + rand() * 0.18,
        phase: rand() * Math.PI * 2,
        bobAmp: 0.3 + rand() * 0.9,
        color: palette[Math.floor(rand() * palette.length)],
        orbit: rand() * 0.4 + 0.1,
      };
    });
  }, [tier.particles]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // Orbital swirl around Y axis
      const ang = t * p.orbit * 0.1;
      const cos = Math.cos(ang);
      const sin = Math.sin(ang);
      const x = p.basePos.x * cos - p.basePos.z * sin;
      const z = p.basePos.x * sin + p.basePos.z * cos;

      // Vertical bob
      const y = p.basePos.y + Math.sin(t * p.speed + p.phase) * p.bobAmp;

      dummy.position.set(x, y, z);
      const pulse = 1 + Math.sin(t * 1.5 + p.phase) * 0.25;
      dummy.scale.setScalar(p.scale * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      color.setRGB(p.color[0], p.color[1], p.color[2]);
      const cPulse = 0.7 + Math.sin(t * 2 + p.phase) * 0.3;
      color.multiplyScalar(cPulse);
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
