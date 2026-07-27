"use client";

import { Component, type ReactNode } from "react";
import { ParticleNetwork } from "../particle-network";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  webglSupported: boolean;
}

/**
 * WebGLBoundary — gracefully handles WebGL initialization failures.
 *
 * In any modern browser (Chrome / Firefox / Safari / Edge on a normal
 * device) the WebGL context will be created and the full 3D scene runs.
 * In rare headless / locked-down environments (e.g. some sandboxes), the
 * context creation fails — in that case we transparently fall back to
 * the canvas-based ParticleNetwork so the hero still looks premium and
 * the page never shows a broken/empty hero.
 */
export class WebGLBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      webglSupported: typeof window !== "undefined" && this.checkWebGL(),
    };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true, webglSupported: false };
  }

  componentDidCatch(error: Error) {
    console.warn("[Hero3D] Falling back to canvas particle network:", error.message);
  }

  private checkWebGL(): boolean {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        (canvas.getContext("webgl2", {
          failIfMajorPerformanceCaveat: false,
        }) as WebGL2RenderingContext | null) ||
        (canvas.getContext("webgl", {
          failIfMajorPerformanceCaveat: false,
        }) as WebGLRenderingContext | null);
      if (!gl) return false;
      // Make sure the context is actually usable by drawing a pixel
      // Some sandboxes return a context that fails on first use.
      const version = gl.getParameter(gl.VERSION);
      if (!version) return false;
      // Test that we can actually compile a shader
      const shader = gl.createShader(gl.VERTEX_SHADER);
      if (!shader) return false;
      gl.shaderSource(shader, "void main(){gl_Position=vec4(0);}");
      gl.compileShader(shader);
      const ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      gl.deleteShader(shader);
      return !!ok;
    } catch {
      return false;
    }
  }

  render() {
    if (this.state.hasError || !this.state.webglSupported) {
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
