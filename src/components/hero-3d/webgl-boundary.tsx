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
 * enhancement overlay. If WebGL is unavailable or running on a
 * software renderer (llvmpipe / SwiftShader / Microsoft Basic),
 * we render `null` so the base ParticleNetwork stays fully visible
 * with zero white-flash artifacts.
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

/* ───────── WebGL probe with software-renderer detection ───────── */

function probeWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") ||
      c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      console.warn(
        "[Hero3D] WebGL context unavailable — particles only (3D overlay disabled)"
      );
      return false;
    }
    const ver = gl.getParameter(gl.VERSION);
    if (!ver) return false;

    // CRITICAL: Detect software renderers using the unmasked renderer string.
    // Browsers mask the renderer as "WebKit WebGL" / "Mozilla" etc., but the
    // WEBGL_debug_renderer_info extension exposes the real underlying GPU.
    // Software renderers (SwiftShader, llvmpipe, Microsoft Basic) claim WebGL
    // support but render incorrectly or lose context mid-frame, producing
    // the white-overlay artifact the user is seeing.
    const dbgExt = gl.getExtension("WEBGL_debug_renderer_info");
    const unmaskedRenderer = dbgExt
      ? String(gl.getParameter(dbgExt.UNMASKED_RENDERER_WEBGL)).toLowerCase()
      : "";
    const maskedRenderer = String(gl.getParameter(gl.RENDERER)).toLowerCase();

    const isSoftware =
      unmaskedRenderer.includes("llvmpipe") ||
      unmaskedRenderer.includes("swiftshader") ||
      unmaskedRenderer.includes("microsoft basic") ||
      unmaskedRenderer.includes("software") ||
      maskedRenderer.includes("llvmpipe") ||
      maskedRenderer.includes("swiftshader") ||
      maskedRenderer.includes("microsoft basic") ||
      maskedRenderer.includes("software");

    // Lose the test context immediately so it doesn't count against limits
    const ext = gl.getExtension("WEBGL_lose_context");
    if (ext) ext.loseContext();

    if (isSoftware) {
      console.warn(
        "[Hero3D] Software WebGL renderer detected (",
        unmaskedRenderer || maskedRenderer,
        ") — particles only mode for stability"
      );
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
