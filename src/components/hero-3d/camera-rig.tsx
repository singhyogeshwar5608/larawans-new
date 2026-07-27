"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CameraRig — handles all camera motion:
 *  - Infinite "breathing" (subtle drift on a Lissajous curve) so the
 *    scene always feels alive even when idle.
 *  - Mouse parallax: camera target lerps toward the cursor.
 *  - Scroll reaction: camera dollies forward + tilts down as the user
 *    scrolls past the hero.
 *  - Smooth return when the mouse leaves the window.
 */
export function CameraRig() {
  const { camera, size } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const mouse = useRef({ x: 0, y: 0, active: false });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -((e.clientY / size.height) * 2 - 1);
      mouse.current.active = true;
    };
    const onLeave = () => {
      mouse.current.active = false;
    };
    const onScroll = () => {
      // 0 at top of hero, ~1 when hero has scrolled past
      const heroH = window.innerHeight;
      scroll.current = Math.min(1, window.scrollY / heroH);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [size.width, size.height]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Infinite breathing (Lissajous)
    const breathX = Math.sin(t * 0.18) * 0.6;
    const breathY = Math.cos(t * 0.22) * 0.4;
    const breathZ = Math.sin(t * 0.12) * 0.5;

    // Mouse parallax (lerp toward target)
    const mx = mouse.current.active ? mouse.current.x : 0;
    const my = mouse.current.active ? mouse.current.y : 0;
    target.current.x += (mx * 1.4 + breathX - target.current.x) * 0.04;
    target.current.y += (my * 0.9 + breathY - target.current.y) * 0.04;

    // Scroll dollies the camera forward and slightly down
    const s = scroll.current;
    const baseZ = 14;
    const camZ = baseZ - s * 4 + breathZ;
    const camY = 0 + s * -1.2 + target.current.y * 0.5;

    camera.position.x += (target.current.x * 1.2 - camera.position.x) * 0.05;
    camera.position.y += (camY - camera.position.y) * 0.05;
    camera.position.z += (camZ - camera.position.z) * 0.05;
    camera.lookAt(0, -s * 0.8, 0);
  });

  return null;
}

/**
 * SceneScrollUniform — updates the grid shader's uScroll uniform based
 * on page scroll, exposing it via a ref shared with the AnimatedGrid.
 * Implemented as a no-op component to keep the scroll listener close
 * to the camera rig for clarity.
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

// Re-export THREE for usage in some files needing the type only
export { THREE };
