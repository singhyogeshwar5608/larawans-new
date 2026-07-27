"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE_COLORS, mulberry32, type TierConfig } from "./config";
import { useSceneState } from "./scene-state";

/**
 * AnimatedLighting (v2)
 *
 * Adds premium cinematic lighting on top of the static ambient +
 * directional lights already in the scene:
 *
 *  - Animated Rim Light: a directional light that orbits slowly to
 *    create moving rim highlights on glass objects.
 *  - Animated Point Lights: multiple colored point lights drifting
 *    through the scene on independent Lissajous paths.
 *  - Ambient Gradient Lighting: ambient light intensity + color
 *    gently oscillates between two palette tones.
 *  - Dynamic Reflection: point lights change color over time so
 *    glass objects show shifting reflections.
 *  - Soft Shadow Movement: the key light position drifts so shadows
 *    on the grid plane subtly shift.
 *
 *  Mouse follow: one point light follows the cursor in world space
 *  (the "cursor energy field").
 *
 * All motion is infinite and uses incommensurate frequencies so
 * lighting never repeats.
 */
export function AnimatedLighting({ tier }: { tier: TierConfig }) {
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const mouseLightRef = useRef<THREE.PointLight>(null);
  const sceneState = useSceneState();

  const movingLights = useMemo(() => {
    const rand = mulberry32(555);
    const palette = [
      SCENE_COLORS.violet,
      SCENE_COLORS.cyan,
      SCENE_COLORS.magenta,
      SCENE_COLORS.blue,
      SCENE_COLORS.amber,
    ];
    return new Array(tier.animatedLights).fill(0).map((_, i) => ({
      // Lissajous path params (incommensurate freqs)
      radiusX: 8 + rand() * 6,
      radiusY: 4 + rand() * 3,
      radiusZ: 6 + rand() * 4,
      speedX: 0.08 + rand() * 0.15,
      speedY: 0.06 + rand() * 0.12,
      speedZ: 0.05 + rand() * 0.1,
      phaseX: rand() * Math.PI * 2,
      phaseY: rand() * Math.PI * 2,
      phaseZ: rand() * Math.PI * 2,
      // Color oscillation between two palette entries
      colorA: palette[i % palette.length],
      colorB: palette[(i + 2) % palette.length],
      colorMixSpeed: 0.2 + rand() * 0.4,
      colorMixPhase: rand() * Math.PI * 2,
      intensity: 1.5 + rand() * 2.0,
      intensitySpeed: 0.3 + rand() * 0.7,
      intensityPhase: rand() * Math.PI * 2,
    }));
  }, [tier.animatedLights]);

  // Refs for each moving point light
  const lightRefs = useRef<(THREE.PointLight | null)[]>([]);

  // Scratch vectors
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const colorA = useMemo(() => new THREE.Color(), []);
  const colorB = useMemo(() => new THREE.Color(), []);
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const ss = sceneState?.current;

    // -- Rim light: slow orbit around the scene --
    if (rimRef.current) {
      const ang = t * 0.12;
      rimRef.current.position.set(
        Math.cos(ang) * 12,
        6 + Math.sin(t * 0.08) * 2,
        Math.sin(ang) * 12
      );
      // Color shift between violet and cyan
      const mix = (Math.sin(t * 0.15) + 1) * 0.5;
      tmpColor.setRGB(
        SCENE_COLORS.violet[0] * (1 - mix) + SCENE_COLORS.cyan[0] * mix,
        SCENE_COLORS.violet[1] * (1 - mix) + SCENE_COLORS.cyan[1] * mix,
        SCENE_COLORS.violet[2] * (1 - mix) + SCENE_COLORS.cyan[2] * mix
      );
      rimRef.current.color.copy(tmpColor);
      rimRef.current.intensity = 1.5 + Math.sin(t * 0.25) * 0.5;
    }

    // -- Ambient gradient: oscillate color + intensity --
    if (ambientRef.current) {
      const mix = (Math.sin(t * 0.1) + 1) * 0.5;
      ambientRef.current.color.setRGB(
        0.4 * (1 - mix) + 0.2 * mix,
        0.5 * (1 - mix) + 0.4 * mix,
        1.0
      );
      ambientRef.current.intensity = 0.5 + Math.sin(t * 0.18) * 0.2;
    }

    // -- Key light drift (soft shadow movement) --
    if (keyRef.current) {
      keyRef.current.position.set(
        5 + Math.sin(t * 0.07) * 3,
        8 + Math.cos(t * 0.05) * 2,
        5 + Math.sin(t * 0.06) * 3
      );
      keyRef.current.intensity = 1.0 + Math.sin(t * 0.2) * 0.3;
    }

    // -- Moving point lights: each on its own Lissajous path --
    movingLights.forEach((ml, i) => {
      const light = lightRefs.current[i];
      if (!light) return;
      light.position.set(
        Math.sin(t * ml.speedX + ml.phaseX) * ml.radiusX,
        Math.cos(t * ml.speedY + ml.phaseY) * ml.radiusY,
        Math.sin(t * ml.speedZ + ml.phaseZ) * ml.radiusZ - 4
      );
      // Color mix between A and B
      const mix = (Math.sin(t * ml.colorMixSpeed + ml.colorMixPhase) + 1) * 0.5;
      colorA.setRGB(ml.colorA[0], ml.colorA[1], ml.colorA[2]);
      colorB.setRGB(ml.colorB[0], ml.colorB[1], ml.colorB[2]);
      tmpColor.copy(colorA).lerp(colorB, mix);
      light.color.copy(tmpColor);
      // Intensity oscillation
      light.intensity =
        ml.intensity *
        (0.6 + 0.4 * Math.sin(t * ml.intensitySpeed + ml.intensityPhase));
    });

    // -- Mouse-follow light (cursor energy field) --
    if (mouseLightRef.current && ss) {
      if (ss.mouse.active) {
        // Smooth follow with inertia
        mouseWorld.set(ss.mouse.worldX, ss.mouse.worldY, ss.mouse.worldZ);
        mouseLightRef.current.position.lerp(mouseWorld, 0.1);
        mouseLightRef.current.intensity = 3.5;
      } else {
        // Smooth return to neutral + dim
        mouseLightRef.current.position.lerp(
          new THREE.Vector3(0, 0, 0),
          0.04
        );
        mouseLightRef.current.intensity = Math.max(
          0,
          mouseLightRef.current.intensity - 0.05
        );
      }
    }
  });

  return (
    <group>
      {/* Animated ambient gradient */}
      <ambientLight ref={ambientRef} intensity={0.5} color={new THREE.Color(0.4, 0.5, 1.0)} />

      {/* Animated key light (drifts for soft shadow movement) */}
      <directionalLight
        ref={keyRef}
        position={[5, 8, 5]}
        intensity={1.2}
        color={new THREE.Color(0.6, 0.7, 1.0)}
      />

      {/* Animated rim light (orbits the scene) */}
      <directionalLight
        ref={rimRef}
        position={[12, 6, 0]}
        intensity={1.5}
        color={new THREE.Color(...SCENE_COLORS.violet)}
      />

      {/* Moving point lights on Lissajous paths */}
      {movingLights.map((ml, i) => (
        <pointLight
          key={i}
          ref={(el) => {
            lightRefs.current[i] = el;
          }}
          position={[0, 0, -4]}
          intensity={ml.intensity}
          color={new THREE.Color(...ml.colorA)}
          distance={30}
          decay={2}
        />
      ))}

      {/* Mouse-follow light (cursor energy field) */}
      <pointLight
        ref={mouseLightRef}
        position={[0, 0, 0]}
        intensity={0}
        color={new THREE.Color(...SCENE_COLORS.cyan)}
        distance={12}
        decay={2}
      />
    </group>
  );
}
