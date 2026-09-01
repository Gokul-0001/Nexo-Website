import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND } from "@/lib/brand";
import { getPointer, usePrefersReducedMotion } from "@/lib/motion";

const BLOB_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uSoft;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv - 0.5;
    float wob = 0.035 * sin(uTime * 0.45 + p.y * 4.0) + 0.03 * cos(uTime * 0.36 + p.x * 5.0);
    float d = length(p + wob);
    float a = smoothstep(0.5, 0.5 * uSoft, d + wob);
    a = pow(a, 1.6);
    gl_FragColor = vec4(uColor, a * uOpacity);
  }
`;

const BLOB_VERT = /* glsl */ `
  varying vec2 vUv;
  uniform vec2 uMouse;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.xy += uMouse * 0.25;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

type BlobSpec = { color: string; x: number; y: number; z: number; scale: number; soft: number; opacity: number };

function Blobs({ count }: { count: number }) {
  const group = useRef<THREE.Group | null>(null);
  const pointer = getPointer();
  const scroll = useRef(0);

  const specs: BlobSpec[] = useMemo(
    () =>
      [
        { color: BRAND.cobalt, x: -5.4, y: 2.1, z: -3, scale: 6.4, soft: 0.25, opacity: 0.3 },
        { color: BRAND.ember, x: 5.6, y: -1.4, z: -4, scale: 5.6, soft: 0.3, opacity: 0.24 },
        { color: BRAND.mint, x: 3.4, y: 3.4, z: -2.2, scale: 4.2, soft: 0.32, opacity: 0.22 },
        { color: BRAND.lime, x: -4.2, y: -3.6, z: -2.6, scale: 5.0, soft: 0.28, opacity: 0.2 },
        { color: BRAND.cobalt, x: 0.4, y: -5.2, z: -5, scale: 7.2, soft: 0.22, opacity: 0.16 },
      ].slice(0, count),
    [count],
  );

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = h > 0 ? window.scrollY / h : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const matRefs = useRef<THREE.ShaderMaterial[]>([]);

  useFrame(({ clock }) => {
    pointer.update(0.045);
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.z = Math.sin(t * 0.045) * 0.06;
      group.current.position.x = pointer.x * 0.5;
      group.current.position.y = -pointer.y * 0.35;
    }
    matRefs.current.forEach((m, i) => {
      const spec = specs[i];
      if (!m || !spec) return;
      m.uniforms.uTime.value = t;
      m.uniforms.uMouse.value.set(pointer.x * (0.4 + i * 0.18), pointer.y * (0.4 + i * 0.18));
      m.uniforms.uOpacity.value =
        spec.opacity * (0.55 + 0.65 * Math.abs(Math.sin(scroll.current * Math.PI * 1.5 + i)));
    });
  });

  return (
    <group ref={group}>
      {specs.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]} scale={s.scale}>
          <planeGeometry args={[1, 1]} />
          <shaderMaterial
            ref={(m) => {
              if (m) matRefs.current[i] = m as THREE.ShaderMaterial;
            }}
            transparent
            depthWrite={false}
            vertexShader={BLOB_VERT}
            fragmentShader={BLOB_FRAG}
            uniforms={{
              uColor: { value: new THREE.Color(s.color) },
              uOpacity: { value: s.opacity },
              uSoft: { value: s.soft },
              uTime: { value: 0 },
              uMouse: { value: new THREE.Vector2(0, 0) },
            }}
          />
        </mesh>
      ))}
    </group>
  );
}

function FrameGate({ running }: { running: boolean }) {
  const { gl, invalidate } = useThree();
  useEffect(() => {
    if (running) invalidate();
    gl.setClearColor(new THREE.Color(0xffffff), 0);
  }, [running, gl, invalidate]);
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

export default function WebGLBackground() {
  const reduce = usePrefersReducedMotion();
  // Defer feature detection until after hydration so the server and client
  // render the same fallback markup on the first pass.
  const [supported, setSupported] = useState(false);
  const [running, setRunning] = useState(true);
  const [isSmall, setIsSmall] = useState(false);
  const blobCount = isSmall ? 3 : 5;

  useEffect(() => {
    setSupported(webglAvailable());
    setIsSmall(window.innerWidth < 900);
    const onResize = () => setIsSmall(window.innerWidth < 900);
    window.addEventListener("resize", onResize, { passive: true });
    const onVis = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const fallback = (
    <div className="absolute inset-0">
      <div
        className="anim-drift absolute -top-[18vh] -left-[12vw] h-[62vh] w-[62vh] rounded-full blur-[90px]"
        style={{ background: `radial-gradient(circle, ${BRAND.cobalt}33, transparent 68%)` }}
      />
      <div
        className="anim-drift absolute top-[28vh] -right-[10vw] h-[54vh] w-[54vh] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${BRAND.ember}2e, transparent 68%)`, animationDelay: "-7s" }}
      />
      <div
        className="anim-drift absolute bottom-[-14vh] left-[24vw] h-[46vh] w-[46vh] rounded-full blur-[110px]"
        style={{ background: `radial-gradient(circle, ${BRAND.mint}30, transparent 70%)`, animationDelay: "-13s" }}
      />
    </div>
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {(!supported || reduce) && fallback}
      {supported && !reduce && (
        <div className="absolute inset-0">
          <Canvas
            frameloop={running ? "always" : "never"}
            dpr={[1, isSmall ? 1.2 : 1.6]}
            camera={{ position: [0, 0, 9], fov: 48 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          >
            <FrameGate running={running} />
            <Blobs count={blobCount} />
          </Canvas>
        </div>
      )}
      <div className="grain absolute inset-0 opacity-[0.16] mix-blend-multiply" />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(14,15,20,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,15,20,0.045) 1px, transparent 1px)",
          backgroundSize: "clamp(70px, 9vw, 130px) clamp(70px, 9vw, 130px)",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, #000 30%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, #000 30%, transparent 78%)",
        }}
      />
    </div>
  );
}
