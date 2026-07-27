"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { smoothstep, easeInOutCubic } from "./config";
import { useSceneState } from "./scene-state";

/**
 * CameraRig (v2 — cinematic) — all camera motion:
 *
 *  - Cinematic idle orbit: very slow circular orbit around the scene
 *    with a randomized radius and speed (never perfectly circular).
 *  - Camera breathing: subtle push/pull on Z + tiny tilt.
 *  - Smooth inertia: mouse parallax target lerps (never snaps).
 *  - Dynamic focus: camera.lookAt target drifts to a different
 *    focal point every few seconds (cinematic rack-focus feel).
 *  - Soft zoom in/out: gentle sine-driven dolly.
 *  - Natural easing: cubic ease-in-out on all transitions.
 *  - Scroll reaction: dollies forward + tilts down as user scrolls.
 *
 * All motion is infinite and seamless — never pauses, never repeats
 * exactly. Uses Lissajous-like curves with incommensurate frequencies
 * so the camera path never closes on itself.
 *
 * Also populates the shared SceneState (mouse + scroll + time) so
 * other components (lights, particles, network) can react without
 * subscribing to window events themselves.
 */
export function CameraRig() {
  const { camera, size, pointer } = useThree();
  const sceneState = useSceneState();

  // Persistent targets for inertia
  const mouseTarget = useRef(new THREE.Vector3(0, 0, 0));
  const cameraPos = useRef(new THREE.Vector3(0, 0, 14));
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const lookTargetGoal = useRef(new THREE.Vector3(0, 0, 0));
  const lastFocusSwap = useRef(0);
  const scrollVelocity = useRef(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const heroH = window.innerHeight;
      const progress = Math.min(1, window.scrollY / heroH);
      if (sceneState?.current) {
        const delta = progress - sceneState.current.scroll.progress;
        scrollVelocity.current = scrollVelocity.current * 0.7 + delta * 0.3;
        sceneState.current.scroll.progress = progress;
        sceneState.current.scroll.velocity = scrollVelocity.current;
      }
      lastScroll.current = progress;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sceneState]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (sceneState?.current) {
      sceneState.current.time = t;
      sceneState.current.dt = delta;
      // decay scroll velocity
      scrollVelocity.current *= 0.92;
      sceneState.current.scroll.velocity = scrollVelocity.current;
    }

    // -- Mouse state (R3F's pointer is normalized -1..1) --
    const mx = pointer.x;
    const my = pointer.y;
    const mouseActive = Math.abs(mx) > 0.001 || Math.abs(my) > 0.001;

    if (sceneState?.current) {
      sceneState.current.mouse.x = mx;
      sceneState.current.mouse.y = my;
      sceneState.current.mouse.active = mouseActive;
      // project mouse into world space at z=0 plane
      const ndc = new THREE.Vector3(mx, my, 0.5);
      ndc.unproject(camera);
      const dir = ndc.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      const world = camera.position.clone().add(dir.multiplyScalar(dist));
      sceneState.current.mouse.worldX = world.x;
      sceneState.current.mouse.worldY = world.y;
      sceneState.current.mouse.worldZ = world.z;
    }

    // -- Cinematic idle orbit (Lissajous with incommensurate freqs) --
    // Very slow, large radius. Never closes on itself.
    const orbitX = Math.sin(t * 0.045) * 2.4 + Math.sin(t * 0.073) * 1.2;
    const orbitY = Math.cos(t * 0.052) * 1.6 + Math.sin(t * 0.081) * 0.7;
    const orbitZ = Math.sin(t * 0.031) * 1.8;

    // -- Camera breathing (very subtle push/pull) --
    const breath = Math.sin(t * 0.28) * 0.35 + Math.sin(t * 0.19) * 0.15;

    // -- Soft zoom in/out (slow dolly) --
    const softZoom = Math.sin(t * 0.083) * 0.9 + Math.cos(t * 0.061) * 0.4;

    // -- Mouse parallax (with inertia) --
    const parallaxX = mx * 1.8;
    const parallaxY = my * 1.1;
    mouseTarget.current.x += (parallaxX - mouseTarget.current.x) * 0.04;
    mouseTarget.current.y += (parallaxY - mouseTarget.current.y) * 0.04;

    // -- Scroll reaction --
    const s = sceneState?.current.scroll.progress ?? 0;
    const scrollEase = easeInOutCubic(smoothstep(0, 1, s));

    // -- Dynamic focus: swap look target every ~6s between several points --
    if (t - lastFocusSwap.current > 6.5) {
      lastFocusSwap.current = t;
      const focusPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.5, 0.8, -2),
        new THREE.Vector3(-1.8, -0.5, -1),
        new THREE.Vector3(0.8, -1.2, -3),
        new THREE.Vector3(-0.6, 1.5, -2),
      ];
      const pick = focusPoints[Math.floor(Math.random() * focusPoints.length)];
      lookTargetGoal.current.copy(pick);
    }
    // Ease the look target toward the goal
    lookTarget.current.lerp(lookTargetGoal.current, 0.015);

    // -- Compose final camera position --
    const baseZ = 14;
    const targetX = orbitX + mouseTarget.current.x;
    const targetY = orbitY + mouseTarget.current.y - scrollEase * 1.2;
    const targetZ =
      baseZ -
      scrollEase * 4 + // scroll dolly forward
      softZoom + // soft zoom
      breath; // breathing

    // Smooth inertia (lerp toward target — never snaps)
    cameraPos.current.x += (targetX - cameraPos.current.x) * 0.045;
    cameraPos.current.y += (targetY - cameraPos.current.y) * 0.045;
    cameraPos.current.z += (targetZ - cameraPos.current.z) * 0.05;

    camera.position.copy(cameraPos.current);

    // Look target drifts with scroll + mouse
    const lookX = lookTarget.current.x + mouseTarget.current.x * 0.3;
    const lookY = lookTarget.current.y + mouseTarget.current.y * 0.2 - scrollEase * 0.8;
    const lookZ = lookTarget.current.z;
    camera.lookAt(lookX, lookY, lookZ);
  });

  return null;
}

/**
 * Re-export for backward compatibility with any consumer that imported
 * the old useScrollProgress hook (kept to avoid breaking imports).
 */
export function useScrollProgress() {
  const ref = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      ref.current = Math.min(1, window.scrollY / window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

export { THREE };
