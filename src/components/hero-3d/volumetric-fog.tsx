"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS } from "./config";
import { fogVertexShader, fogFragmentShader } from "./shaders";

/**
 * VolumetricFog — a large sphere with a 3D noise shader acting as the
 * ambient color haze behind everything else. Cheap, GPU-only, looks alive.
 */
export function VolumetricFog() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Vector3(...SCENE_COLORS.violet) },
      uColorB: { value: new THREE.Vector3(...SCENE_COLORS.cyan) },
      uColorC: { value: new THREE.Vector3(...SCENE_COLORS.magenta) },
    }),
    []
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh position={[0, 0, -20]} scale={30}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        vertexShader={fogVertexShader}
        fragmentShader={fogFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
