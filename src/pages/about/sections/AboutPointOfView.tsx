"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPointOfView() {
  const root = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => { const element = root.current; if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const ctx = gsap.context(() => { const tl = gsap.timeline({ scrollTrigger: { trigger: element, start: "top 78%", end: "bottom 32%", scrub: 0.7 } }); tl.fromTo("[data-manifesto]", { y: 80, opacity: 0.1 }, { y: -18, opacity: 1, ease: "none" }, 0).fromTo("[data-manifesto-note]", { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.26); }, element); return () => ctx.revert(); }, []);
  return <section ref={root} className="relative z-10 overflow-hidden py-[17vh] sm:py-[22vh]"><div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 display text-[clamp(12rem,31vw,34rem)] leading-none text-ink/[0.035]">NEXO</div><div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8"><div className="grid gap-10 border-y border-ink/12 py-8 lg:grid-cols-[0.34fr_1fr_0.36fr] lg:gap-14 lg:py-12"><div><span className="eyebrow text-ink/40">Our point of view</span><p className="mt-4 text-mono-9 leading-relaxed text-ink/45 uppercase">Digital is not decoration.<br />It is how a business behaves.</p></div><p data-manifesto className="display max-w-[18ch] text-[clamp(2.4rem,6.4vw,6.7rem)] leading-[0.88]">MAKE THE <span style={{ color: BRAND.cobalt }}>USEFUL</span> THING THE <span style={{ color: BRAND.ember }}>MEMORABLE</span> THING.</p><div data-manifesto-note className="self-end"><p className="max-w-[30ch] text-[14px] leading-[1.68] text-ink/60">We pair business direction with a sharp creative point of view, then carry it all the way into the build.</p><span className="mt-7 flex items-center gap-3 text-mono-9 tracking-[0.18em] text-ink/45 uppercase"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />Useful by default</span></div></div></div></section>;
}
