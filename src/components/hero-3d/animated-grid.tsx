"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS } from "./config";
import { gridVertexShader, gridFragmentShader } from "./shaders";

/**
 * AnimatedGrid — a large horizontal plane with a custom shader that
 * renders a glowing digital grid + traveling energy pulses. Positioned
 * below the camera so it acts as an infinite floor.
 */
export function AnimatedGrid() {
  const ref = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Vector3(...SCENE_COLORS.violet) },
      uColorB: { value: new THREE.Vector3(...SCENE_COLORS.cyan) },
      uColorC: { value: new THREE.Vector3(...SCENE_COLORS.magenta) },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    // Slowly drift the grid so it feels like flying over it
    if (ref.current) {
      ref.current.position.z = ((state.clock.elapsedTime * 0.4) % 4) - 2;
    }
  });

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2.05, 0, 0]}
      position={[0, -6, -4]}
    >
      <planeGeometry args={[80, 60, 200, 200]} />
      <shaderMaterial
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
