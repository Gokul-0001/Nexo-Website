import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
// (custom cursor disabled — native pointer restored)
import { BRAND } from "@/lib/brand";

type CursorMode = "default" | "link" | "view" | "drag" | "magnet";

export default function CustomCursor() {
  const [enabled] = useState(false);
  const ring = useRef<HTMLDivElement | null>(null);
  const dot = useRef<HTMLDivElement | null>(null);
  const label = useRef<HTMLSpanElement | null>(null);
  const state = useRef({ x: -100, y: -100, rx: -100, ry: -100, mode: "default" as CursorMode });

  useEffect(() => {
    if (!enabled) return;
    const s = state.current;
    s.x = s.rx = -100;
    s.y = s.ry = -100;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      s.x = e.clientX;
      s.y = e.clientY;
      if (!visible) {
        visible = true;
        gsap.to([ring.current, dot.current], { opacity: 1, duration: 0.3 });
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const raw = target?.dataset.cursor;
      const mode: CursorMode = raw && raw !== "none" ? (raw as CursorMode) : "default";
      if (mode === s.mode) return;
      s.mode = mode;
      const ringEl = ring.current;
      const labelEl = label.current;
      if (!ringEl || !labelEl) return;
      const text = mode === "default" ? "" : target?.dataset.cursorLabel ?? "";
      const hasLabel = Boolean(text);
      labelEl.textContent = text;

      gsap.to(ringEl, {
        width: mode === "default" ? 30 : hasLabel ? 96 : 56,
        height: mode === "default" ? 30 : hasLabel ? 96 : 56,
        backgroundColor: mode === "default" ? "rgba(0,0,0,0)" : hasLabel ? BRAND.ink : "rgba(14,15,20,0.06)",
        borderColor: mode === "default" ? "rgba(14,15,20,0.35)" : hasLabel ? BRAND.ink : BRAND.cobalt,
        duration: 0.42,
        ease: "power3.out",
      });
      gsap.to(dot.current, {
        scale: mode === "default" ? 1 : mode === "link" ? 0.4 : 1.3,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(labelEl, { opacity: hasLabel ? 1 : 0, scale: hasLabel ? 1 : 0.6, duration: 0.32 });
    };

    const onLeave = () => {
      visible = false;
      gsap.to([ring.current, dot.current], { opacity: 0, duration: 0.2 });
    };

    const tick = () => {
      s.rx += (s.x - s.rx) * 0.16;
      s.ry += (s.y - s.ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%)`;
      if (dot.current) dot.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block" aria-hidden>
      <div
        ref={ring}
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border opacity-0"
        style={{ width: 30, height: 30, borderColor: "rgba(14,15,20,0.35)", willChange: "transform, width, height, background-color" }}
      >
        <span ref={label} className="text-mono-9-sm tracking-[0.2em] text-paper uppercase opacity-0" />
      </div>
      <div
        ref={dot}
        className="absolute top-0 left-0 h-[6px] w-[6px] rounded-full opacity-0"
        style={{ background: BRAND.ember, willChange: "transform, scale" }}
      />
    </div>
  );
}
