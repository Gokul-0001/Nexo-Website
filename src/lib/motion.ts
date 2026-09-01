import { useEffect, useRef } from "react";
import gsap from "gsap";

/** True when the visitor asked the OS to reduce motion. */
export function usePrefersReducedMotion() {
  const ref = useRef(false);
  if (typeof window !== "undefined" && window.matchMedia) {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return ref.current;
}

/** Pointer coarseness — used to switch off cursor + heavy parallax on touch. */
export function isTouchDevice() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

/**
 * Magnetic pull: the element eases toward the pointer while hovered and
 * snaps back on leave. rAF-free (GSAP does the ticking) and GPU friendly.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouchDevice() || usePrefersReducedMotionCached()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return ref;
}

let cachedReduce: boolean | null = null;
function usePrefersReducedMotionCached() {
  if (cachedReduce === null && typeof window !== "undefined") {
    cachedReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return cachedReduce === true;
}

/** Normalised (-1..1) pointer position, lerped — shared by hero + WebGL. */
export class Pointer {
  x = 0;
  y = 0;
  tx = 0;
  ty = 0;

  constructor() {
    if (typeof window === "undefined") return;
    this.onMove = this.onMove.bind(this);
    window.addEventListener("pointermove", this.onMove, { passive: true });
  }

  private onMove(e: PointerEvent) {
    this.tx = (e.clientX / window.innerWidth) * 2 - 1;
    this.ty = (e.clientY / window.innerHeight) * 2 - 1;
  }

  /** call every frame */
  update(lerp = 0.06) {
    this.x += (this.tx - this.x) * lerp;
    this.y += (this.ty - this.y) * lerp;
  }

  dispose() {
    if (typeof window === "undefined") return;
    window.removeEventListener("pointermove", this.onMove);
  }
}

/** Singleton pointer so every system shares one listener. */
let pointerSingleton: Pointer | null = null;
export function getPointer() {
  if (!pointerSingleton) pointerSingleton = new Pointer();
  return pointerSingleton;
}
