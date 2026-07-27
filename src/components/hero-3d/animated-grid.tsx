"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS } from "./config";
import { gridVertexShader, gridFragmentShader } from "./shaders";
import { useSceneState } from "./scene-state";

/**
 * AnimatedGrid (v2)
 *
 * Same digital grid as v1, now with:
 *  - Mouse flow-map offset (the grid "flows" away from the cursor)
 *  - Multi-octave fbm displacement (richer, never-repeating terrain)
 *  - Multi-rate scanlines + energy pulses
 *  - Scroll reaction (deeper displacement when scrolled)
 *
 * The shader itself does all the work — CPU only updates uTime + uFlow.
 */
export function AnimatedGrid() {
  const ref = useRef<THREE.Mesh>(null);
  const sceneState = useSceneState();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uFlow: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Vector3(...SCENE_COLORS.violet) },
      uColorB: { value: new THREE.Vector3(...SCENE_COLORS.cyan) },
      uColorC: { value: new THREE.Vector3(...SCENE_COLORS.magenta) },
    }),
    []
  );

  const flowTarget = useMemo(() => new THREE.Vector2(0, 0), []);

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;

    const ss = sceneState?.current;
    if (ss) {
      // Update scroll
      uniforms.uScroll.value = ss.scroll.progress;

      // Mouse flow (inertia-smoothed)
      const targetX = ss.mouse.active ? ss.mouse.x * 0.5 : 0;
      const targetY = ss.mouse.active ? ss.mouse.y * 0.5 : 0;
      flowTarget.x += (targetX - flowTarget.x) * 0.05;
      flowTarget.y += (targetY - flowTarget.y) * 0.05;
      uniforms.uFlow.value.copy(flowTarget);
    }

    if (ref.current) {
      // Slowly drift the grid so it feels like flying over it
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
