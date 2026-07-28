"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, Billboard } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { SCENE_COLORS, detectTier, mulberry32 } from "./config";

/* ───────── Tech nodes data ───────── */
const TECH_NODES = [
  { label: "Artificial Intelligence", color: SCENE_COLORS.violet },
  { label: "ERP Systems", color: SCENE_COLORS.cyan },
  { label: "Websites", color: SCENE_COLORS.blue },
  { label: "Mobile Apps", color: SCENE_COLORS.magenta },
  { label: "Cloud", color: SCENE_COLORS.amber },
  { label: "API", color: SCENE_COLORS.lime },
  { label: "Database", color: SCENE_COLORS.blue },
  { label: "CRM", color: SCENE_COLORS.violet },
  { label: "Analytics", color: SCENE_COLORS.cyan },
  { label: "Automation", color: SCENE_COLORS.amber },
  { label: "Cyber Security", color: SCENE_COLORS.magenta },
] as const;

const NODE_COUNT = TECH_NODES.length;

/* ───────── Shared mouse ref ───────── */
const mouse2D = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mouse2D.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse2D.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   Glass "L" Logo — the AI Core center piece
   ═══════════════════════════════════════════════════════════════════════ */
function LarawansLogo() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.PointLight>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);

  const lShape = useMemo(() => {
    const shape = new THREE.Shape();
    // L-shape letter geometry
    shape.moveTo(-0.35, -0.8);
    shape.lineTo(-0.05, -0.8);
    shape.lineTo(-0.05, 0.5);
    shape.lineTo(0.35, 0.5);
    shape.lineTo(0.35, 0.8);
    shape.lineTo(-0.35, 0.8);
    shape.lineTo(-0.35, -0.8);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 6,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.25;
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 2.5 + Math.sin(t * 2) * 0.8;
    }
    if (pulseRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.06;
      pulseRef.current.scale.set(s, s, s);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group>
      {/* Main glass L */}
      <mesh ref={meshRef} geometry={lShape} castShadow>
        <meshPhysicalMaterial
          color="#7c5cff"
          metalness={0.3}
          roughness={0.1}
          transmission={0.7}
          thickness={0.5}
          ior={1.5}
          envMapIntensity={1.2}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Energy pulse ring */}
      <mesh ref={pulseRef} rotation-x={Math.PI / 2}>
        <ringGeometry args={[0.9, 1.1, 64]} />
        <meshBasicMaterial
          color="#00e0c6"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point light — cyan glow */}
      <pointLight
        ref={glowRef}
        color="#00e0c6"
        intensity={2.5}
        distance={6}
        decay={2}
      />
      <pointLight color="#7c5cff" intensity={1.5} distance={4} decay={2} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Orbiting Tech Nodes — small glowing spheres with labels
   ═══════════════════════════════════════════════════════════════════════ */
function TechNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    const rng = mulberry32(42);
    return TECH_NODES.map((node, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      const radius = 2.8 + rng() * 1.2;
      const yOffset = (rng() - 0.5) * 1.2;
      const speed = 0.08 + rng() * 0.06;
      const phaseOffset = rng() * Math.PI * 2;
      return { ...node, angle, radius, yOffset, speed, phaseOffset, index: i };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Subtle mouse influence
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse2D.x * 0.15,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse2D.y * 0.08,
      0.02
    );
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <NodeSphere key={node.index} {...node} />
      ))}
    </group>
  );
}

function NodeSphere({
  angle,
  radius,
  yOffset,
  speed,
  phaseOffset,
  color,
  label,
}: {
  angle: number;
  radius: number;
  yOffset: number;
  speed: number;
  phaseOffset: number;
  color: number[];
  label: string;
}) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const a = angle + t * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(a) * radius;
      ref.current.position.z = Math.sin(a) * radius;
      ref.current.position.y =
        yOffset + Math.sin(t * 0.5 + phaseOffset) * 0.2;
    }
  });

  const colorStr = new THREE.Color(...color).getStyle();

  return (
    <group ref={ref}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Core sphere */}
        <mesh>
          <octahedronGeometry args={[0.12, 2]} />
          <meshStandardMaterial
            color={colorStr}
            emissive={colorStr}
            emissiveIntensity={0.8}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        {/* Outer glow */}
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial
            color={colorStr}
            transparent
            opacity={0.1}
          />
        </mesh>
        {/* Small point light */}
        <pointLight color={colorStr} intensity={0.3} distance={1.5} decay={2} />
      </Float>
      {/* Label */}
      <Billboard follow lockX lockZ>
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.14}
          color={colorStr}
          anchorX="center"
          anchorY="bottom"
          font="/fonts/inter.woff"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Connection Lines — animated glowing lines from logo to each node
   ═══════════════════════════════════════════════════════════════════════ */
function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null!);
  const lineCount = NODE_COUNT;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(lineCount * 6); // 2 points per line, 3 components
    const col = new Float32Array(lineCount * 6);
    const rng = mulberry32(99);
    const palette = [
      SCENE_COLORS.violet,
      SCENE_COLORS.cyan,
      SCENE_COLORS.blue,
      SCENE_COLORS.magenta,
      SCENE_COLORS.amber,
      SCENE_COLORS.lime,
    ];

    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const radius = 3.2 + rng() * 0.8;
      // Start at logo center
      pos[i * 6 + 0] = 0;
      pos[i * 6 + 1] = 0;
      pos[i * 6 + 2] = 0;
      // End at node position (approx)
      pos[i * 6 + 3] = Math.cos(angle) * radius;
      pos[i * 6 + 4] = (rng() - 0.5) * 0.8;
      pos[i * 6 + 5] = Math.sin(angle) * radius;

      const c = palette[i % palette.length];
      col[i * 6 + 0] = c[0];
      col[i * 6 + 1] = c[1];
      col[i * 6 + 2] = c[2];
      col[i * 6 + 3] = c[0] * 0.3;
      col[i * 6 + 4] = c[1] * 0.3;
      col[i * 6 + 5] = c[2] * 0.3;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={linesRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineCount * 2}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineCount * 2}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Data Particles — instanced points flowing along connections
   ═══════════════════════════════════════════════════════════════════════ */
function DataParticles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const rng = mulberry32(77);
    return Array.from({ length: count }, () => {
      const lineIdx = Math.floor(rng() * NODE_COUNT);
      const angle = (lineIdx / NODE_COUNT) * Math.PI * 2;
      const radius = 3.2 + rng() * 0.8;
      const progress = rng();
      return {
        lineIdx,
        startX: 0,
        startY: 0,
        startZ: 0,
        endX: Math.cos(angle) * radius,
        endY: (rng() - 0.5) * 0.8,
        endZ: Math.sin(angle) * radius,
        progress,
        speed: 0.1 + rng() * 0.2,
        size: 0.02 + rng() * 0.04,
      };
    });
  }, [count]);

  useFrame((state) => {
    const dt = state.clock.getDelta();
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      p.progress += p.speed * dt;
      if (p.progress > 1) p.progress -= 1;

      const t = p.progress;
      dummy.position.set(
        p.startX + (p.endX - p.startX) * t,
        p.startY + (p.endY - p.startY) * t + Math.sin(t * Math.PI) * 0.3,
        p.startZ + (p.endZ - p.startZ) * t
      );
      dummy.scale.setScalar(p.size * (0.5 + Math.sin(t * Math.PI) * 0.5));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00e0c6" transparent opacity={0.6} />
    </instancedMesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Holographic Panels — glass planes with wireframe UI content
   ═══════════════════════════════════════════════════════════════════════ */
function HolographicPanels() {
  const panels = useMemo(() => {
    const rng = mulberry32(123);
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (rng() - 0.5) * 8,
        (rng() - 0.5) * 3 + 0.5,
        -3 - rng() * 3,
      ] as [number, number, number],
      rotation: [0, (rng() - 0.5) * 0.6, 0] as [number, number, number],
      scale: [0.8 + rng() * 0.6, 0.5 + rng() * 0.3, 1] as [number, number, number],
      color: [SCENE_COLORS.violet, SCENE_COLORS.cyan, SCENE_COLORS.blue, SCENE_COLORS.magenta, SCENE_COLORS.amber, SCENE_COLORS.lime][i],
      floatSpeed: 0.3 + rng() * 0.3,
      rotSpeed: 0.02 + rng() * 0.03,
    }));
  }, []);

  return (
    <>
      {panels.map((panel, i) => (
        <HoloPanel key={i} {...panel} />
      ))}
    </>
  );
}

function HoloPanel({
  position,
  rotation,
  scale,
  color,
  floatSpeed,
  rotSpeed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: number[];
  floatSpeed: number;
  rotSpeed: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const colorStr = new THREE.Color(...color).getStyle();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(t * floatSpeed) * 0.15;
      ref.current.rotation.y = rotation[1] + Math.sin(t * rotSpeed) * 0.05;
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Glass panel */}
      <Float speed={floatSpeed} rotationIntensity={0.05} floatIntensity={0.1}>
        {/* Panel bg */}
        <mesh scale={scale}>
          <planeGeometry />
          <meshPhysicalMaterial
            color={colorStr}
            transparent
            opacity={0.06}
            metalness={0.2}
            roughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Panel border */}
        <mesh scale={[scale[0] + 0.02, scale[1] + 0.02, 1]}>
          <planeGeometry />
          <meshBasicMaterial color={colorStr} transparent opacity={0.25} wireframe />
        </mesh>
        {/* Inner content lines — mock UI wireframe */}
        <group position={[0, 0, 0.01]} scale={scale}>
          <mesh position={[0, 0.15, 0]}>
            <planeGeometry args={[0.8, 0.06]} />
            <meshBasicMaterial color={colorStr} transparent opacity={0.2} />
          </mesh>
          <mesh position={[-0.1, -0.05, 0]}>
            <planeGeometry args={[0.6, 0.04]} />
            <meshBasicMaterial color={colorStr} transparent opacity={0.15} />
          </mesh>
          <mesh position={[0.05, -0.15, 0]}>
            <planeGeometry args={[0.7, 0.04]} />
            <meshBasicMaterial color={colorStr} transparent opacity={0.12} />
          </mesh>
          {/* Bar chart mockup */}
          <mesh position={[-0.2, -0.28, 0]}>
            <planeGeometry args={[0.08, 0.1]} />
            <meshBasicMaterial color={colorStr} transparent opacity={0.2} />
          </mesh>
          <mesh position={[-0.08, -0.25, 0]}>
            <planeGeometry args={[0.08, 0.13]} />
            <meshBasicMaterial color={colorStr} transparent opacity={0.25} />
          </mesh>
          <mesh position={[0.04, -0.3, 0]}>
            <planeGeometry args={[0.08, 0.08]} />
            <meshBasicMaterial color={colorStr} transparent opacity={0.18} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Neural Network Background — subtle connecting mesh
   ═══════════════════════════════════════════════════════════════════════ */
function NeuralBackground() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 120;

  const positions = useMemo(() => {
    const rng = mulberry32(55);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rng() - 0.5) * 16;
      pos[i * 3 + 1] = (rng() - 0.5) * 8;
      pos[i * 3 + 2] = -2 - rng() * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7c5cff"
        size={0.04}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Floating Ambient Particles — soft glow particles everywhere
   ═══════════════════════════════════════════════════════════════════════ */
function AmbientParticles({ count = 300 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const rng = mulberry32(88);
    return Array.from({ length: count }, () => ({
      x: (rng() - 0.5) * 14,
      y: (rng() - 0.5) * 7,
      z: -1 - rng() * 8,
      size: 0.01 + rng() * 0.025,
      speed: 0.02 + rng() * 0.04,
      phase: rng() * Math.PI * 2,
      color: rng() > 0.5 ? "#7c5cff" : rng() > 0.3 ? "#00e0c6" : "#4dc4ff",
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.phase) * 0.3,
        p.y + Math.cos(t * p.speed * 0.7 + p.phase) * 0.2,
        p.z
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#7c5cff" transparent opacity={0.35} />
    </instancedMesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Energy Waves — expanding rings from the logo center
   ═══════════════════════════════════════════════════════════════════════ */
function EnergyWaves() {
  const rings = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      phaseOffset: i * (Math.PI * 2 / 3),
    }))
  , []);

  return (
    <group>
      {rings.map((ring, i) => (
        <EnergyRing key={i} phaseOffset={ring.phaseOffset} index={i} />
      ))}
    </group>
  );
}

function EnergyRing({ phaseOffset, index }: { phaseOffset: number; index: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const colors = ["#7c5cff", "#00e0c6", "#4dc4ff"];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      const progress = ((t * 0.3 + phaseOffset / (Math.PI * 2)) % 1);
      const scale = 0.5 + progress * 4;
      ref.current.scale.set(scale, scale, scale);
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 * (1 - progress);
    }
  });

  return (
    <mesh ref={ref} rotation-x={Math.PI / 2}>
      <ringGeometry args={[0.95, 1.0, 64]} />
      <meshBasicMaterial
        color={colors[index]}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Mouse-reactive Camera Rig
   ═══════════════════════════════════════════════════════════════════════ */
function CameraRig() {
  const { camera } = useThree();

  useFrame(() => {
    // Subtle camera movement following mouse
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse2D.x * 0.5,
      0.02
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.5 + mouse2D.y * 0.3,
      0.02
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ═══════════════════════════════════════════════════════════════════════
   Scene Content — everything inside the R3F Canvas
   ═══════════════════════════════════════════════════════════════════════ */
function Scene() {
  const tier = useMemo(() => detectTier(), []);
  const config = {
    mobile: { particles: 150, dataParticles: 80, ambient: 100 },
    tablet: { particles: 250, dataParticles: 150, ambient: 200 },
    desktop: { particles: 300, dataParticles: 200, ambient: 300 },
  }[tier];

  return (
    <>
      <CameraRig />

      {/* Ambient + fog */}
      <ambientLight intensity={0.15} color="#7c5cff" />
      <fog attach="fog" args={["#050614", 6, 18]} />

      {/* Center logo */}
      <LarawansLogo />

      {/* Orbiting tech nodes */}
      <TechNodes />

      {/* Connection lines */}
      <ConnectionLines />

      {/* Data particles flowing along connections */}
      <DataParticles count={config.dataParticles} />

      {/* Holographic glass panels */}
      <HolographicPanels />

      {/* Neural network background */}
      <NeuralBackground />

      {/* Ambient floating particles */}
      <AmbientParticles count={config.ambient} />

      {/* Energy pulse waves */}
      <EnergyWaves />

      {/* Post-processing */}
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          intensity={tier === "mobile" ? 0.6 : 0.9}
          mipmapBlur
        />
        <Vignette darkness={0.6} offset={0.3} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation={true}
          modulationOffset={0.5}
        />
      </EffectComposer>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Exported Component — wrapped with WebGL boundary for SwiftShader fallback
   ═══════════════════════════════════════════════════════════════════════ */
export { HeroEcosystem };
export { WebGLBoundary } from "./webgl-boundary";

function HeroEcosystem() {
  const [dpr] = useState(() => {
    if (typeof window === "undefined") return [1, 1.5];
    const tier = detectTier();
    if (tier === "mobile") return [1, 1.5];
    if (tier === "tablet") return [1, 1.75];
    return [1, 1.75];
  });

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0.5, 6], fov: 55, near: 0.1, far: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Scene />
    </Canvas>
  );
}
