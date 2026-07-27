/**
 * GLSL shaders for the Hero 3D scene.
 *
 * AnimatedGridShader — a plane that emits a glowing digital grid with
 * traveling energy waves. Pure GPU, no per-frame CPU work.
 */

export const gridVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;
  varying float vElevation;

  // Cheap value noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Digital wave: layered sine + noise
    float wave1 = sin(pos.x * 1.4 + uTime * 0.6) * 0.35;
    float wave2 = sin(pos.y * 1.8 - uTime * 0.5) * 0.3;
    float n = noise(vec2(pos.x * 0.6 + uTime * 0.15, pos.y * 0.6 - uTime * 0.12)) * 0.5;
    float elevation = (wave1 + wave2 + n) * (1.0 + uScroll * 0.6);
    pos.z += elevation;

    vElevation = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const gridFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Fine digital grid lines
    vec2 grid = abs(fract(vUv * vec2(40.0, 24.0) - 0.5) - 0.5) / fwidth(vUv * vec2(40.0, 24.0));
    float line = 1.0 - min(min(grid.x, grid.y), 1.0);

    // Radial fade so the grid melts at the edges
    vec2 c = vUv - 0.5;
    float dist = length(c);
    float radial = smoothstep(0.65, 0.1, dist);

    // Traveling energy pulses
    float pulse1 = smoothstep(0.04, 0.0, abs(fract(vUv.y * 0.5 - uTime * 0.08) - 0.5));
    float pulse2 = smoothstep(0.04, 0.0, abs(fract(vUv.x * 0.5 - uTime * 0.06 + 0.3) - 0.5));

    // Vertical gradient based on elevation
    float elevMix = clamp(vElevation * 0.5 + 0.5, 0.0, 1.0);
    vec3 base = mix(uColorA, uColorB, elevMix);
    base = mix(base, uColorC, pulse1 * 0.7 + pulse2 * 0.5);

    float alpha = line * radial * 0.85;
    alpha += (pulse1 + pulse2) * radial * 0.18;

    // Subtle scanline shimmer
    alpha *= 0.7 + 0.3 * sin(vUv.y * 800.0 + uTime * 4.0);

    gl_FragColor = vec4(base, alpha * (0.85 + uScroll * 0.15));
  }
`;

/**
 * FogVolumeShader — a fullscreen-ish sphere that adds volumetric color haze.
 * Used as a backdrop for depth.
 */
export const fogVertexShader = /* glsl */ `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fogFragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec3 vPosition;

  // 3D noise
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  void main() {
    vec3 p = normalize(vPosition) * 2.0;
    float n1 = noise(p + vec3(uTime * 0.05, 0.0, 0.0));
    float n2 = noise(p * 1.8 + vec3(0.0, uTime * 0.04, uTime * 0.03));
    float n3 = noise(p * 3.0 - vec3(uTime * 0.02));

    float mixN = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    vec3 col = mix(uColorA, uColorB, mixN);
    col = mix(col, uColorC, smoothstep(0.5, 0.9, n2));

    // Soft spherical falloff
    float d = length(vPosition) / 30.0;
    float alpha = (1.0 - smoothstep(0.0, 1.0, d)) * 0.55;

    gl_FragColor = vec4(col, alpha);
  }
`;

/**
 * HolographicRingShader — animated Fresnel + scanlines for the rings.
 */
export const ringVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const ringFragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;

  void main() {
    float fres = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.5);
    float scan = 0.5 + 0.5 * sin(vUv.y * 80.0 - uTime * 3.0);
    float pulse = 0.6 + 0.4 * sin(uTime * 1.5 + vUv.y * 6.2831);

    vec3 col = mix(uColorA, uColorB, fres);
    col += scan * 0.15 * uColorB;
    col *= pulse;

    float alpha = (fres * 0.85 + 0.15) * uOpacity * (0.5 + scan * 0.5);
    gl_FragColor = vec4(col, alpha);
  }
`;
