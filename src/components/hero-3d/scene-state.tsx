"use client";

import { createContext, useContext, useRef } from "react";
import type { MouseState, ScrollState } from "./config";

/**
 * SharedSceneState — a single ref-based store for mouse + scroll + time
 * that every animated component can read inside useFrame without
 * triggering React re-renders.
 *
 * The owning component (Hero3DScene) calls useRef to create the store
 * and passes it to SceneStateProvider. Other components read it via
 * useSceneState().
 */

export interface SceneState {
  mouse: MouseState;
  scroll: ScrollState;
  time: number;
  dt: number;
}

const SceneCtx = createContext<React.RefObject<SceneState> | null>(null);

export function useCreateSceneState(): React.RefObject<SceneState> {
  return useRef<SceneState>({
    mouse: { x: 0, y: 0, active: false, worldX: 0, worldY: 0, worldZ: 0 },
    scroll: { progress: 0, velocity: 0 },
    time: 0,
    dt: 0,
  });
}

export function SceneStateProvider({
  stateRef,
  children,
}: {
  stateRef: React.RefObject<SceneState>;
  children: React.ReactNode;
}) {
  return <SceneCtx.Provider value={stateRef}>{children}</SceneCtx.Provider>;
}

export function useSceneState(): React.RefObject<SceneState> | null {
  return useContext(SceneCtx);
}
