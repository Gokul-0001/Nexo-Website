"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import CustomCursor from "./CustomCursor";
import { BRAND } from "@/lib/brand";
import { isTouchDevice, usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Preserves global Home-only interaction systems without coupling them to a section. */
export default function HomeRuntime() {
  const progress = useRef<HTMLSpanElement | null>(null);
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    if (reduce || isTouchDevice()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.4 });
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0);
    const onClick = (event: MouseEvent) => { const link = (event.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null; const id = link?.getAttribute("href"); const target = id && document.querySelector(id); if (link && id && id !== "#" && target) { event.preventDefault(); lenis.scrollTo(target as HTMLElement, { offset: -40, duration: 1.5 }); } };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); gsap.ticker.remove(raf); lenis.destroy(); };
  }, [reduce]);
  useEffect(() => { document.fonts?.ready.then(() => ScrollTrigger.refresh()); }, []);
  useEffect(() => { const trigger = ScrollTrigger.create({ trigger: document.body, start: "top top", end: "bottom bottom", scrub: true, onUpdate: (self) => { if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`; } }); return () => trigger.kill(); }, []);
  return <><CustomCursor /><span className="pointer-events-none fixed inset-x-0 top-0 z-[980] h-[2px]"><span ref={progress} className="block h-full origin-left" style={{ transform: "scaleX(0)", background: `linear-gradient(90deg, ${BRAND.cobalt}, ${BRAND.mint} 32%, ${BRAND.lime} 58%, ${BRAND.ember})` }} /></span></>;
}
