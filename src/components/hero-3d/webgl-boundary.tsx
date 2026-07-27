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
      // Use a canvas at a realistic hero size so the perf test reflects
      // the actual fragment workload our scene will impose.
      const testW = Math.min(960, window.innerWidth || 960);
      const testH = Math.min(540, window.innerHeight || 540);
      const canvas = document.createElement("canvas");
      canvas.width = testW;
      canvas.height = testH;
      let gl =
        (canvas.getContext("webgl2", {
          failIfMajorPerformanceCaveat: false,
          powerPreference: "high-performance",
          antialias: false,
          preserveDrawingBuffer: false,
        }) as WebGL2RenderingContext | null);
      if (!gl) {
        gl = canvas.getContext("webgl", {
          failIfMajorPerformanceCaveat: false,
          powerPreference: "high-performance",
          antialias: false,
          preserveDrawingBuffer: false,
        }) as WebGLRenderingContext | null;
      }
      if (!gl) {
        console.warn(
          "[Hero3D] WebGL unavailable — using canvas fallback. Real GPUs will render the full 3D scene."
        );
        return false;
      }
      const version = gl.getParameter(gl.VERSION);
      if (!version) {
        console.warn("[Hero3D] WebGL context not usable — using canvas fallback");
        return false;
      }

      // Detect software renderers by name (most reliable signal).
      // The sandbox's headless Chromium reports "WebKit WebGL" which masks
      // the underlying renderer, so we ALSO run a perf test below.
      const renderer = String(gl.getParameter(gl.RENDERER)).toLowerCase();
      const isSoftware =
        renderer.includes("llvmpipe") ||
        renderer.includes("swiftshader") ||
        renderer.includes("microsoft basic") ||
        renderer.includes("software");

      // Compile a noisy fragment shader that approximates our scene cost
      // (fbm with 5 octaves at 3 different scales per pixel).
      const vs = gl.createShader(gl.VERTEX_SHADER);
      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      if (!vs || !fs) {
        console.warn("[Hero3D] Shader creation failed — using canvas fallback");
        return false;
      }
      gl.shaderSource(
        vs,
        `attribute vec2 aPos; void main(){gl_Position=vec4(aPos,0.0,1.0);}`
      );
      gl.shaderSource(
        fs,
        `precision highp float;
         float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
         float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);
           return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
         float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.1;a*=0.5;}return v;}
         void main(){
           vec2 uv = gl_FragCoord.xy / vec2(${testW}.0, ${testH}.0);
           float v = fbm(uv * 8.0) + fbm(uv * 16.0) + fbm(uv * 32.0);
           gl_FragColor = vec4(vec3(v/3.0), 1.0);
         }`
      );
      gl.compileShader(vs);
      gl.compileShader(fs);
      const okVS = gl.getShaderParameter(vs, gl.COMPILE_STATUS);
      const okFS = gl.getShaderParameter(fs, gl.COMPILE_STATUS);
      if (!okVS || !okFS) {
        console.warn("[Hero3D] Shader compile failed — using canvas fallback");
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        const loseExt0 = gl.getExtension("WEBGL_lose_context");
        if (loseExt0) loseExt0.loseContext();
        return false;
      }
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.useProgram(prog);

      // Fullscreen triangle
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );
      const loc = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      // PERFORMANCE TEST: render the noisy shader at hero resolution
      // MULTIPLE times to simulate the actual scene cost (we have ~8
      // fragment shaders running per frame: grid, fog, nebula, rings,
      // particles, glass, dust, postprocessing).
      // On a real GPU each frame is < 30ms total. On software rendering
      // (llvmpipe in sandboxes) it's 500ms+ for 8 passes.
      // Threshold: 250ms for 8 passes means we can't sustain even 30 FPS.
      gl.viewport(0, 0, testW, testH);
      // Warmup
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.finish();
      // Timed render — 8 passes simulating our scene's fragment workload
      const start = performance.now();
      for (let i = 0; i < 8; i++) {
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      gl.finish();
      const elapsed = performance.now() - start;

      // Cleanup
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      const loseExt = gl.getExtension("WEBGL_lose_context");
      if (loseExt) loseExt.loseContext();

      if (isSoftware) {
        console.warn(
          "[Hero3D] Software WebGL renderer detected — using canvas fallback for smooth 60 FPS. Real GPUs will render the full 3D scene."
        );
        return false;
      }
      if (elapsed > 60) {
        console.warn(
          "[Hero3D] WebGL too slow (",
          elapsed.toFixed(0),
          "ms for 8 passes at ",
          testW + "x" + testH,
          ") — using canvas fallback for smooth 60 FPS. Real GPUs will render the full 3D scene."
        );
        return false;
      }
      return true;
    } catch (e) {
      console.warn("[Hero3D] WebGL check threw — using canvas fallback:", e);
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
