"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from "@react-three/drei";
import {
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { TIERS, type PerformanceTier } from "./config";
import { CameraRig } from "./camera-rig";
import { VolumetricFog } from "./volumetric-fog";
import { AnimatedGrid } from "./animated-grid";
import { FloatingParticles } from "./floating-particles";
import { NeuralNetwork } from "./neural-network";
import { HolographicRings } from "./holographic-rings";
import { FloatingGlassObjects } from "./floating-glass-objects";
import { LightBeams } from "./light-beams";

/**
 * Hero3DScene — the full real-time WebGL scene.
 *
 * Composition (back → front):
 *   VolumetricFog (color haze)
 *   AnimatedGrid (infinite floor)
 *   LightBeams (volumetric shafts)
 *   HolographicRings (rotating Fresnel tori)
 *   NeuralNetwork (AI nodes + energy connections)
 *   FloatingGlassObjects (refractive icosahedrons)
 *   FloatingParticles (instanced glowing dust)
 *
 * Postprocessing:
 *   Bloom + Noise + Vignette
 *
 * Interaction:
 *   CameraRig — mouse parallax + scroll dolly + infinite breathing
 */
export function Hero3DScene() {
  const [tier, setTier] = useState<PerformanceTier>("desktop");

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
    <Canvas
      className="!absolute inset-0"
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
        {/* Ambient + rim lights for the glass objects */}
        <ambientLight intensity={0.6} color={new THREE.Color(0.4, 0.5, 1.0)} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color={new THREE.Color(0.6, 0.7, 1.0)}
        />
        <pointLight
          position={[-8, -4, -6]}
          intensity={2.5}
          color={new THREE.Color(0.0, 0.88, 0.78)}
          distance={30}
        />
        <pointLight
          position={[8, 6, -8]}
          intensity={2.5}
          color={new THREE.Color(0.49, 0.36, 1.0)}
          distance={30}
        />

        {/* Scene composition */}
        <VolumetricFog />
        <AnimatedGrid />
        <LightBeams tier={config} />
        <HolographicRings tier={config} />
        <NeuralNetwork tier={config} />
        <FloatingGlassObjects tier={config} />
        <FloatingParticles tier={config} />

        {/* Camera motion controller */}
        <CameraRig />

        <Preload all />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Suspense>

      {/* Postprocessing — kept lightweight for 60 FPS */}
      <Bloom
        intensity={config.bloom}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.8}
      />
      <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.15} darkness={0.65} />
    </Canvas>
  );
}
