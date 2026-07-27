"use client";

import { Component, type ReactNode } from "react";
import { ParticleNetwork } from "../particle-network";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  webglOk: boolean;
}

/**
 * WebGLBoundary — checks if WebGL works, falls back gracefully.
 *
 * A lightweight context-creation check (no shader benchmark). R3F's Canvas
 * silently renders a blank 300×150 canvas when WebGL fails — it does NOT
 * throw a React error — so a pure error boundary is not enough. We must
 * detect the missing context upfront.
 *
 * On real-device browsers the check passes instantly and the full 3D scene
 * loads. On headless / sandboxed / software-rendered environments the check
 * fails and we show the canvas ParticleNetwork instead.
 */
export class WebGLBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      webglOk: typeof window !== "undefined" && probeWebGL(),
    };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true, webglOk: false };
  }

  componentDidCatch(error: Error) {
    console.warn(
      "[Hero3D] Scene threw — falling back to canvas particle network:",
      error.message
    );
  }

  render() {
    if (this.state.hasError || !this.state.webglOk) {
      return (
        <div className="absolute inset-0">
          <ParticleNetwork className="opacity-90" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(124,92,255,0.55), rgba(0,224,198,0.25) 40%, transparent 70%)",
            }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}

/* ───────── minimal WebGL probe (no shader perf test) ───────── */

function probeWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl =
      c.getContext("webgl2") || c.getContext("webgl");
    if (!gl) {
      console.warn(
        "[Hero3D] WebGL context unavailable — using canvas particle fallback"
      );
      return false;
    }
    // Verify the context is actually usable
    const ver = (gl as WebGLRenderingContext).getParameter(
      (gl as WebGLRenderingContext).VERSION
    );
    if (!ver) return false;

    // Lose the test context immediately so it doesn't count against limits
    const ext = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    if (ext) ext.loseContext();
    return true;
  } catch {
    return false;
  }
}
