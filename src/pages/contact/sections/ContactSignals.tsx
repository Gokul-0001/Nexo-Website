"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { BRAND } from "@/lib/brand";
import { usePrefersReducedMotion } from "@/lib/motion";
import { RotatingBadge } from "@/pages/home/sections/Artwork";

/** The large contact brief card used in the Contact hero. */
export default function ContactSignals() {
  const root = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-device]",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.15, ease: "expo.out", delay: 0.28 },
      );
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[540px] py-3 sm:py-6" aria-label="Project brief">
      <div className="anim-drift pointer-events-none absolute -top-[18%] -right-[16%] h-[58%] w-[58%] rounded-full blur-[76px]" style={{ background: `${BRAND.cobalt}32` }} />
      <div className="anim-drift pointer-events-none absolute -bottom-[16%] -left-[13%] h-[50%] w-[50%] rounded-full blur-[78px]" style={{ background: `${BRAND.mint}2d`, animationDelay: "-8s" }} />

      <div data-contact-device="brief" className="relative will-change-transform">
        <div className="relative overflow-hidden rounded-[27px] border border-ink/12 bg-paper/85 backdrop-blur-md">
          <div className="absolute inset-x-0 top-0 z-[1] flex h-3 items-center justify-between px-3" aria-hidden>{Array.from({ length: 18 }).map((_, i) => <span key={i} className="block h-[6px] w-[2px] rounded-full bg-ink/15" />)}</div>
          <div className="anim-drift pointer-events-none absolute -right-[30%] -top-[40%] h-[60%] w-[60%] rounded-full blur-[70px]" style={{ background: `radial-gradient(circle, ${BRAND.cobalt}55, transparent 70%)` }} />
          <div className="anim-drift pointer-events-none absolute -bottom-[30%] -left-[20%] h-[50%] w-[50%] rounded-full blur-[80px]" style={{ background: `radial-gradient(circle, ${BRAND.mint}44, transparent 70%)`, animationDelay: "-8s" }} />

          <div className="relative p-6 sm:p-7">
            <div className="flex items-start justify-between"><div><span className="text-mono-9 tracking-[0.22em] text-ink/40 uppercase">Project brief · 0X26</span><div className="display mt-2 text-[clamp(1.5rem,2.7vw,2.1rem)] leading-none">Brief, please.</div></div><RotatingBadge size={72} /></div>
            <div className="mt-7"><div className="flex items-center justify-between"><span className="eyebrow text-ink/40">Studio signal</span><span className="text-mono-9 text-ink/40 uppercase">· · · ·</span></div><div className="mt-2 flex items-end gap-[3px]">{[10, 14, 18, 22, 28, 34, 42, 52, 64, 78].map((height, index) => <span key={index} className="flex-1 rounded-[2px]" style={{ height, background: index < 7 ? BRAND.ink : BRAND.lime, opacity: index < 7 ? 0.85 : 1 }} />)}</div><div className="mt-2 flex items-center justify-between text-mono-9-sm text-ink/40 uppercase"><span>1×</span><span>2×</span><span style={{ color: BRAND.lime }}>Live</span></div></div>
            <ul className="mt-7 divide-y divide-ink/10">{[
              { label: "Reading", value: "Mon–Fri · 09:00–19:00 CET", color: BRAND.cobalt },
              { label: "Reply window", value: "≤ 24 hours", color: BRAND.ember },
              { label: "From", value: "A founder, not a bot", color: BRAND.mint },
              { label: "NDA", value: "On request", color: BRAND.lime },
            ].map((row) => <li key={row.label} className="flex items-center justify-between gap-4 py-3"><span className="text-mono-9 text-ink/45 uppercase">{row.label}</span><span className="display text-[clamp(0.95rem,1.7vw,1.18rem)] leading-none">{row.value}</span><span className="h-1.5 w-1.5 rounded-full" style={{ background: row.color }} /></li>)}</ul>
            <div className="mt-7 flex items-center justify-between border-t border-dashed border-ink/15 pt-4 text-mono-9 text-ink/45 uppercase"><span>Send a brief</span><span className="flex items-center gap-2" style={{ color: BRAND.cobalt }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.cobalt }} />Open</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
