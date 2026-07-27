"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  webglOk: boolean;
}

/**
 * WebGLBoundary — lightweight error boundary + WebGL probe.
 *
 * Architecture: ParticleNetwork ALWAYS renders as the hero's base layer
 * (in hero.tsx). This component only renders the R3F Canvas as an
 * enhancement overlay. If WebGL context creation fails, we render
 * `null` so the base ParticleNetwork stays fully visible with zero
 * white-flash artifacts.
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
      "[Hero3D] Scene threw — hiding 3D overlay, particles still visible:",
      error.message
    );
  }

  render() {
    // Render nothing on failure — ParticleNetwork base layer carries the hero
    if (this.state.hasError || !this.state.webglOk) {
      return null;
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
        "[Hero3D] WebGL context unavailable — particles only (3D overlay disabled)"
      );
      return false;
    }
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
