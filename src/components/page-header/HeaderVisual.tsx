"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { BRAND } from "@/lib/brand";
import { getPointer, usePrefersReducedMotion } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────────────────────
   HeaderVisual — 3D scene used by the PageHeader.
   ──────────────────────────────────────────────────────────────────────────
   Mirrors the visual language of the shared WebGLBackground (floating soft
   shapes tinted with the brand palette) but with sharper geometric forms —
   a low-poly torus, a faceted sphere and a thin ring — that read as the
   "identity" of the page rather than as ambient atmosphere.

   Three systems layered in one Canvas:
     1. MeshGroup        — three primary forms (torus / icosahedron / torus-knot)
     2. ParticleField    — 80 small floating dots, brand-coloured
     3. Pointer response — every form tracks the shared `Pointer` singleton

   The Canvas is always `pointer-events: none` so it never intercepts
   clicks/forms/navigation. Falls back to a CSS-only render on
   prefers-reduced-motion, SSR or touch-only devices.
   ────────────────────────────────────────────────────────────────────────── */

type FormSpec = {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  geometry: "torus" | "icosahedron" | "torusKnot" | "ring";
  wireframe: boolean;
};

const FORMS: FormSpec[] = [
  {
    color: BRAND.cobalt,
    position: [-1.5, 0.3, -1.5],
    rotation: [0.3, 0.5, 0.1],
    scale: 1.4,
    speed: 0.12,
    geometry: "torus",
    wireframe: false,
  },
  {
    color: BRAND.mint,
    position: [1.5, -0.4, -1.0],
    rotation: [0.2, 0.3, -0.2],
    scale: 0.8,
    speed: 0.15,
    geometry: "icosahedron",
    wireframe: true,
  },
  {
    color: BRAND.ember,
    position: [0.3, 0.8, -1.8],
    rotation: [0.4, 0.2, 0.3],
    scale: 0.6,
    speed: 0.18,
    geometry: "ring",
    wireframe: false,
  },
];

function MeshGroup() {
  const group = useRef<THREE.Group | null>(null);
  const meshes = useRef<THREE.Mesh[]>([]);
  const pointer = getPointer();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    pointer.update(0.05);
    if (group.current) {
      group.current.rotation.y = t * 0.04;
      group.current.rotation.x = Math.sin(t * 0.05) * 0.1;
      group.current.position.x = pointer.x * 0.2;
      group.current.position.y = -pointer.y * 0.15;
    }
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const spec = FORMS[i];
      mesh.rotation.x = t * spec.speed * 0.6;
      mesh.rotation.z = t * spec.speed * 0.4;
    });
  });

  return (
    <group ref={group}>
      {FORMS.map((spec, i) => {
        const geom = (() => {
          switch (spec.geometry) {
            case "torus":
              return <torusGeometry args={[1, 0.32, 24, 80]} />;
            case "icosahedron":
              return <icosahedronGeometry args={[1, 1]} />;
            case "ring":
              return <torusGeometry args={[1, 0.04, 12, 96]} />;
            case "torusKnot":
              return <torusKnotGeometry args={[0.9, 0.28, 100, 16]} />;
            default:
              return <icosahedronGeometry args={[1, 1]} />;
          }
        })();
        return (
          <mesh
            key={i}
            ref={(m) => {
              if (m) meshes.current[i] = m;
            }}
            position={spec.position}
            rotation={spec.rotation}
            scale={spec.scale}
          >
            {geom}
            <meshStandardMaterial
              color={spec.color}
              wireframe={spec.wireframe}
              roughness={0.35}
              metalness={0.1}
              emissive={spec.color}
              emissiveIntensity={spec.wireframe ? 0.55 : 0.28}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function ParticleField({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points | null>(null);
  const pointer = getPointer();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [BRAND.cobalt, BRAND.ember, BRAND.mint, BRAND.lime, BRAND.paper];
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 1.5;
      tmp.set(palette[Math.floor(Math.random() * palette.length)]);
      col[i * 3 + 0] = tmp.r;
      col[i * 3 + 1] = tmp.g;
      col[i * 3 + 2] = tmp.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    ref.current.rotation.y = time * 0.025;
    ref.current.rotation.x = Math.sin(time * 0.04) * 0.06;
    ref.current.position.x = pointer.x * 0.2;
    ref.current.position.y = -pointer.y * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

function FrameGate({ running }: { running: boolean }) {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(new THREE.Color(0xffffff), 0);
    if (running) gl.renderLists.dispose();
  }, [running, gl]);
  return null;
}

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

/* ── CSS / DOM fallback (no WebGL, reduced motion, touch) ─────────────── */

function CssFallback() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Soft brand glows — same recipe as the shared website background */}
      <div
        className="anim-drift absolute -top-[20vh] -left-[8vw] h-[58vh] w-[58vh] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${BRAND.cobalt}33, transparent 68%)` }}
      />
      <div
        className="anim-drift absolute top-[8vh] -right-[10vw] h-[44vh] w-[44vh] rounded-full blur-[110px]"
        style={{ background: `radial-gradient(circle, ${BRAND.ember}2e, transparent 70%)`, animationDelay: "-7s" }}
      />
      <div
        className="anim-drift absolute bottom-[-12vh] left-[18vw] h-[40vh] w-[40vh] rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, ${BRAND.mint}30, transparent 70%)`, animationDelay: "-12s" }}
      />
      {/* Decorative ring — same wireframe DNA as the 3D scene, but in SVG */}
      <svg
        className="absolute right-[8%] top-[18%] h-[42vmin] w-[42vmin] opacity-70"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <circle cx="100" cy="100" r="78" stroke={BRAND.cobalt} strokeOpacity="0.45" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="56" stroke={BRAND.mint} strokeOpacity="0.4" strokeWidth="0.5" strokeDasharray="2 6" />
        <circle cx="100" cy="100" r="32" stroke={BRAND.ember} strokeOpacity="0.35" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="6" fill={BRAND.lime} fillOpacity="0.85" />
      </svg>
      <svg
        className="absolute bottom-[14%] left-[6%] h-[28vmin] w-[28vmin] opacity-60"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <polygon
          points="100,8 192,60 192,140 100,192 8,140 8,60"
          stroke={BRAND.ember}
          strokeOpacity="0.5"
          strokeWidth="0.6"
          fill="none"
        />
        <polygon
          points="100,40 160,72 160,128 100,160 40,128 40,72"
          stroke={BRAND.mint}
          strokeOpacity="0.35"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

/* ── Public component ──────────────────────────────────────────────────── */

type HeaderVisualProps = {
  /** "compact" trims particle count and geometry resolution for small viewports. */
  variant?: "default" | "compact";
};

export default function HeaderVisual({ variant = "default" }: HeaderVisualProps) {
  const reduce = usePrefersReducedMotion();
  const [supported, setSupported] = useState(false);
  const [running, setRunning] = useState(true);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    setSupported(webglAvailable());
    setIsSmall(window.innerWidth < 900);
    const onResize = () => setIsSmall(window.innerWidth < 900);
    window.addEventListener("resize", onResize, { passive: true });
    const onVis = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Touch-only devices skip the WebGL scene — the CSS fallback is enough.
  const touchOnly = typeof window !== "undefined" && window.matchMedia?.("(hover: none), (pointer: coarse)").matches;
  const useCanvas = supported && !reduce && !touchOnly;
  const compact = variant === "compact" || isSmall;

  return (
    <div className="pointer-events-none absolute inset-0 w-full overflow-visible" aria-hidden>
      {!useCanvas && <CssFallback />}
      {useCanvas && (
        <div className="absolute inset-0">
          <Canvas
            frameloop={running ? "always" : "never"}
            dpr={[1, compact ? 1.2 : 1.7]}
            camera={{ position: [0, 0, 7], fov: 42 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          >
            <FrameGate running={running} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[4, 6, 4]} intensity={0.7} />
            <directionalLight position={[-4, -3, -2]} intensity={0.3} color={BRAND.cobalt} />
            <MeshGroup />
            <ParticleField count={compact ? 50 : 90} />
          </Canvas>
        </div>
      )}
      {/* Vignette + grain — same overlay language as the shared background */}
      <div className="grain absolute inset-0 opacity-[0.14] mix-blend-multiply" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, transparent 50%, rgba(255,255,255,0.55) 100%)",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}