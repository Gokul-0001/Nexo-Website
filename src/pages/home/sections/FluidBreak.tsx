import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const FLAT = "M0,360 C240,344 420,338 720,342 C1020,346 1200,352 1440,336 L1440,400 L0,400 Z";
const RISE = "M0,196 C210,44 460,286 720,148 C980,10 1230,236 1440,96 L1440,400 L0,400 Z";

export default function FluidBreak() {
  const wrap = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el || reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-blob-path]",
        { attr: { d: FLAT } },
        { attr: { d: RISE }, ease: "none", scrollTrigger: { trigger: el, start: "top 92%", end: "bottom 62%", scrub: 0.6 } },
      );
      gsap.fromTo(
        "[data-blob-dot]",
        { y: 60, opacity: 0 },
        { y: -70, opacity: 1, ease: "none", stagger: 0.05, scrollTrigger: { trigger: el, start: "top 88%", end: "center 40%", scrub: 0.7 } },
      );
      gsap.fromTo(
        "[data-blob-word]",
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 70%", once: true } },
      );
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={wrap} className="relative z-10 mt-[4vh] h-[44vh] min-h-[280px] overflow-hidden">
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="fluid-grad" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor={BRAND.cobalt} />
            <stop offset="38%" stopColor={BRAND.mint} />
            <stop offset="70%" stopColor={BRAND.lime} />
            <stop offset="100%" stopColor={BRAND.ember} />
          </linearGradient>
        </defs>
        <path data-blob-path d={FLAT} fill="url(#fluid-grad)" opacity="0.95" />
        <path data-blob-path d={FLAT} fill={BRAND.ink} opacity="0.08" transform="translate(0,16)" />
      </svg>

      {[
        { x: "16%", c: BRAND.ink, s: 8 },
        { x: "38%", c: "#fff", s: 12 },
        { x: "61%", c: BRAND.ink, s: 6 },
        { x: "79%", c: "#fff", s: 10 },
      ].map((d, i) => (
        <span key={i} data-blob-dot className="absolute bottom-[26%] rounded-full" style={{ left: d.x, width: d.s, height: d.s, background: d.c, opacity: 0 }} />
      ))}

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <span data-blob-word className="display text-center text-[clamp(1.1rem,3.3vw,2.3rem)] leading-[0.9] text-paper mix-blend-difference">
          THE BEST PART IS THE NEXT ONE
        </span>
      </div>
      <div className="grain absolute inset-0 opacity-[0.18] mix-blend-multiply" />
    </div>
  );
}
