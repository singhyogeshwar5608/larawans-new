/**
 * GLSL shaders for the Hero 3D scene (v2 — cinematic upgrade).
 *
 * All shaders animate infinitely via uTime. No two regions of any
 * shader ever look identical because we layer multiple noise sources
 * with incommensurate frequencies.
 */

/* ============================================================
 * ANIMATED GRID — glowing digital floor with traveling pulses
 * + procedural noise displacement + scanlines + flow map.
 * ============================================================ */
export const gridVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uFlow;        // mouse-derived flow offset
  varying vec2 vUv;
  varying float vElevation;
  varying float vNoise;

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
  // Fractal Brownian motion for richer displacement
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.1;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Flow-map offset (mouse-derived) — the grid "flows" away from cursor
    vec2 flowUv = uv + uFlow * 0.3;

    // Multi-octave digital wave with incommensurate frequencies (no loops)
    float wave1 = sin(pos.x * 1.4 + uTime * 0.6) * 0.30;
    float wave2 = sin(pos.y * 1.83 - uTime * 0.47) * 0.25;
    float wave3 = sin((pos.x + pos.y) * 0.9 + uTime * 0.22) * 0.18;
    float n = fbm(vec2(pos.x * 0.5 + uTime * 0.13, pos.y * 0.5 - uTime * 0.11));
    float elevation = (wave1 + wave2 + wave3 + n * 0.6) * (1.0 + uScroll * 0.8);
    pos.z += elevation;

    vElevation = elevation;
    vNoise = n;
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
  varying float vNoise;

  void main() {
    // Multi-resolution grid lines (fine + coarse)
    vec2 gridFine = abs(fract(vUv * vec2(60.0, 36.0) - 0.5) - 0.5) /
                    fwidth(vUv * vec2(60.0, 36.0));
    float lineFine = 1.0 - min(min(gridFine.x, gridFine.y), 1.0);

    vec2 gridCoarse = abs(fract(vUv * vec2(12.0, 7.0) - 0.5) - 0.5) /
                      fwidth(vUv * vec2(12.0, 7.0));
    float lineCoarse = 1.0 - min(min(gridCoarse.x, gridCoarse.y), 1.0);

    // Radial fade so the grid melts at the edges
    vec2 c = vUv - 0.5;
    float dist = length(c);
    float radial = smoothstep(0.7, 0.05, dist);

    // Traveling energy pulses at different speeds (never sync)
    float pulse1 = smoothstep(0.04, 0.0, abs(fract(vUv.y * 0.5 - uTime * 0.08) - 0.5));
    float pulse2 = smoothstep(0.04, 0.0, abs(fract(vUv.x * 0.5 - uTime * 0.06 + 0.3) - 0.5));
    float pulse3 = smoothstep(0.06, 0.0, abs(fract(vUv.y * 0.25 - uTime * 0.11 + 0.7) - 0.5));

    // Color gradient based on elevation + noise
    float elevMix = clamp(vElevation * 0.5 + 0.5, 0.0, 1.0);
    vec3 base = mix(uColorA, uColorB, elevMix);
    base = mix(base, uColorC, (pulse1 * 0.6 + pulse2 * 0.5 + pulse3 * 0.4));
    base += vNoise * 0.15 * uColorB;

    // Combine lines
    float lineAlpha = lineFine * 0.7 + lineCoarse * 0.9;
    float alpha = lineAlpha * radial * 0.85;
    alpha += (pulse1 + pulse2 * 0.8 + pulse3 * 0.6) * radial * 0.22;

    // Subtle scanline shimmer (always moving)
    alpha *= 0.7 + 0.3 * sin(vUv.y * 800.0 + uTime * 4.0);

    gl_FragColor = vec4(base, alpha * (0.85 + uScroll * 0.15));
  }
`;

/* ============================================================
 * VOLUMETRIC FOG — 3D noise color haze (background layer)
 * ============================================================ */
export const fogVertexShader = /* glsl */ `
  varying vec3 vPosition;
  varying vec3 vNormal;
  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fogFragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec3 uColorD;       // 4th color for richer nebula
  varying vec3 vPosition;
  varying vec3 vNormal;

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
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.13;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 p = normalize(vPosition) * 2.0;
    // Multiple incommensurate noise sources = no visible loops
    float n1 = fbm(p + vec3(uTime * 0.04, 0.0, 0.0));
    float n2 = fbm(p * 1.7 + vec3(0.0, uTime * 0.03, uTime * 0.02));
    float n3 = fbm(p * 3.1 - vec3(uTime * 0.018));

    float mixN = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    vec3 col = mix(uColorA, uColorB, mixN);
    col = mix(col, uColorC, smoothstep(0.45, 0.9, n2));
    col = mix(col, uColorD, smoothstep(0.6, 0.95, n3) * 0.5);

    // Soft spherical falloff
    float d = length(vPosition) / 30.0;
    float alpha = (1.0 - smoothstep(0.0, 1.0, d)) * 0.6;

    gl_FragColor = vec4(col, alpha);
  }
`;

/* ============================================================
 * HOLOGRAPHIC RING — animated Fresnel + scanlines + flow map
 * + distortion waves + dynamic emission
 * ============================================================ */
export const ringVertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec3 pos = position;
    // Subtle distortion wave along the ring
    float w = sin(pos.x * 4.0 + uTime * 1.2) * 0.04 +
              cos(pos.y * 3.0 - uTime * 0.8) * 0.03;
    pos += normal * w;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
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
  varying vec3 vWorldPos;

  // Procedural noise for shimmer
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    // Animated Fresnel (pulsing rim)
    float fres = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.5 + sin(uTime * 0.8) * 0.4);

    // Multi-rate scanlines
    float scan1 = 0.5 + 0.5 * sin(vUv.y * 80.0 - uTime * 3.0);
    float scan2 = 0.5 + 0.5 * sin(vUv.y * 160.0 + uTime * 1.7);

    // Energy pulse traveling around the ring
    float pulse = 0.6 + 0.4 * sin(uTime * 1.5 + vUv.y * 6.2831);
    float pulse2 = 0.5 + 0.5 * sin(uTime * 0.9 - vUv.x * 12.5664);

    // Dynamic emission
    vec3 col = mix(uColorA, uColorB, fres);
    col += (scan1 * 0.15 + scan2 * 0.08) * uColorB;
    col *= pulse;
    col += pulse2 * 0.2 * uColorA;

    float alpha = (fres * 0.85 + 0.15) * uOpacity * (0.5 + scan1 * 0.5);
    gl_FragColor = vec4(col, alpha);
  }
`;

/* ============================================================
 * NEBULA CLOUD — large soft sphere with procedural color clouds
 * Used as atmospheric background element.
 * ============================================================ */
export const nebulaVertexShader = /* glsl */ `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const nebulaFragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uOpacity;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewDir;

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
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.07;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 p = normalize(vPosition) * 1.8;
    float n1 = fbm(p + vec3(uTime * 0.05, uTime * 0.02, 0.0));
    float n2 = fbm(p * 2.3 + vec3(0.0, uTime * 0.04, uTime * 0.03));
    float mixN = n1 * 0.6 + n2 * 0.4;

    vec3 col = mix(uColorA, uColorB, mixN);
    col = mix(col, uColorC, smoothstep(0.5, 0.9, n2) * 0.7);

    // Fresnel rim so clouds melt into space at edges
    float fres = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.0);
    col += fres * 0.3 * uColorC;

    float alpha = mixN * uOpacity * 0.6 + fres * uOpacity * 0.3;
    gl_FragColor = vec4(col, alpha);
  }
`;

/* ============================================================
 * ENERGY PACKET — bright glowing sphere with traveling pulse
 * Used for moving energy along neural connections.
 * ============================================================ */
export const packetVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const packetFragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float fres = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 1.5);
    float core = 1.0 - fres;
    vec3 col = uColor * (core * 2.0 + fres * 0.5) * uIntensity;
    col += vec3(1.0) * pow(core, 4.0) * uIntensity; // bright core
    gl_FragColor = vec4(col, (core + fres * 0.5) * uIntensity);
  }
`;

/* ============================================================
 * DUST PARTICLE — soft round point with twinkling
 * ============================================================ */
export const dustVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uTwinkle;
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = aColor;
    float twinkle = 0.5 + 0.5 * sin(uTime * uTwinkle + aPhase * 6.2831);
    vTwinkle = twinkle;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uSize * (1.0 + twinkle * 0.5) * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

export const dustFragmentShader = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = (1.0 - d * 2.0);
    alpha = pow(alpha, 2.0);
    vec3 col = vColor * (0.5 + vTwinkle * 0.8);
    gl_FragColor = vec4(col, alpha * (0.4 + vTwinkle * 0.6));
  }
`;
