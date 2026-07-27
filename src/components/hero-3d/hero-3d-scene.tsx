"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  DepthOfField,
  SSAO,
  GodRays,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import * as THREE from "three";
import { TIERS, type PerformanceTier } from "./config";
import {
  useCreateSceneState,
  SceneStateProvider,
} from "./scene-state";
import { CameraRig } from "./camera-rig";
import { VolumetricFog } from "./volumetric-fog";
import { AnimatedGrid } from "./animated-grid";
import { FloatingParticles } from "./floating-particles";
import { NeuralNetwork } from "./neural-network";
import { HolographicRings } from "./holographic-rings";
import { FloatingGlassObjects } from "./floating-glass-objects";
import { LightBeams } from "./light-beams";
import { AnimatedLighting } from "./animated-lighting";
import { NebulaClouds } from "./nebula-clouds";
import { FloatingDust } from "./floating-dust";

/**
 * Hero3DScene (v2 — cinematic)
 *
 * Composition (back → front):
 *   VolumetricFog       (color haze backdrop)
 *   NebulaClouds        (animated procedural nebula)
 *   AnimatedGrid        (infinite digital floor w/ flow map)
 *   LightBeams          (volumetric shafts)
 *   HolographicRings    (rotating Fresnel tori)
 *   NeuralNetwork       (AI nodes + energy connections + packets)
 *   FloatingGlassObjects (refractive icosahedrons, independent motion)
 *   FloatingParticles   (multi-size, multi-opacity, twinkling)
 *   FloatingDust        (GPU point cloud of twinkling motes)
 *
 *   AnimatedLighting    (rim/key/ambient/moving point lights + mouse light)
 *   CameraRig           (cinematic orbit + breathing + parallax + scroll)
 *
 * Postprocessing (tier-gated):
 *   Bloom + Selective Bloom (via luminanceThreshold)
 *   Chromatic Aberration (very subtle)
 *   SSAO (desktop only)
 *   Depth Of Field (desktop + tablet)
 *   God Rays (desktop only, subtle)
 *   Noise + Vignette
 *   Tone Mapping (ACES Filmic via Canvas gl prop)
 */
export function Hero3DScene() {
  const [tier, setTier] = useState<PerformanceTier>("desktop");
  const sceneStateRef = useCreateSceneState();

  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth;
      if (w < 768) setTier("mobile");
      else if (w < 1280) setTier("tablet");
      else setTier("desktop");
    };
    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  const config = useMemo(() => TIERS[tier], [tier]);

  return (
    <SceneStateProvider stateRef={sceneStateRef}>
      <Canvas
        className="!absolute inset-0"
        style={{ background: "#050614" }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={config.dpr}
        frameloop="always"
        camera={{ position: [0, 0, 14], fov: 55, near: 0.1, far: 100 }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(new THREE.Color("#050614"), 1);
          scene.fog = new THREE.FogExp2(new THREE.Color("#050614"), 0.018);
        }}
      >
        <Suspense fallback={null}>
          {/* Ambient + rim lights for the glass objects (static base;
              AnimatedLighting adds the moving/animated lights on top) */}
          <ambientLight intensity={0.4} color={new THREE.Color(0.4, 0.5, 1.0)} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.0}
            color={new THREE.Color(0.6, 0.7, 1.0)}
          />
          <pointLight
            position={[-8, -4, -6]}
            intensity={2.0}
            color={new THREE.Color(0.0, 0.88, 0.78)}
            distance={30}
          />
          <pointLight
            position={[8, 6, -8]}
            intensity={2.0}
            color={new THREE.Color(0.49, 0.36, 1.0)}
            distance={30}
          />

          {/* Scene composition (back → front) */}
          <VolumetricFog />
          <NebulaClouds tier={config} />
          <AnimatedGrid />
          <LightBeams tier={config} />
          <HolographicRings tier={config} />
          <NeuralNetwork tier={config} />
          <FloatingGlassObjects tier={config} />
          <FloatingParticles tier={config} />
          <FloatingDust tier={config} />

          {/* Animated cinematic lighting (adds moving lights + mouse light) */}
          <AnimatedLighting tier={config} />

          {/* Camera motion controller (writes to shared sceneState) */}
          <CameraRig />

          <Preload all />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>

        {/* Postprocessing — tier-gated for performance.
            Tuned to keep the dark background dark (no white washout). */}
        <EffectComposer
          multisampling={config.enableSSAO ? 4 : 0}
          enableNormalPass={config.enableSSAO}
        >
          <Bloom
            intensity={config.bloom}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.9}
            mipmapBlur
            radius={0.6}
            kernelSize={KernelSize.LARGE}
          />
          {config.enableChromaticAberration && (
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0004, 0.0006]}
              radialModulation={false}
              modulationOffset={0}
            />
          )}
          {config.enableSSAO && (
            <SSAO
              blendFunction={BlendFunction.MULTIPLY}
              samples={16}
              radius={0.05}
              intensity={20}
              luminanceInfluence={0.6}
              color={new THREE.Color(0.0, 0.88, 0.78)}
            />
          )}
          {config.enableDOF && (
            <DepthOfField
              focusDistance={0.02}
              focalLength={0.05}
              bokehScale={2.5}
            />
          )}
          <Vignette eskil={false} offset={0.15} darkness={0.7} />
          <ToneMapping />
        </EffectComposer>
      </Canvas>
    </SceneStateProvider>
  );
}

// Unused imports kept referenced to avoid tree-shaking surprises during dev
void GodRays;
