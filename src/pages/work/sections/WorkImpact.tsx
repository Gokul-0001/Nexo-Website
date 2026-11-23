"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type Visual = "bars" | "ring" | "track" | "gauge";

/** PLACEHOLDER figures — replace with averages you can stand behind. */
const IMPACT: { value: number; decimals: number; prefix?: string; suffix: string; label: string; note: string; visual: Visual; bg: string; ink: string; accent: string }[] = [
  { value: 2.1, decimals: 1, suffix: "×", label: "More enquiries", note: "Average lift after a Nexo website launch", visual: "bars", bg: BRAND.paper, ink: BRAND.ink, accent: BRAND.cobalt },
  { value: 64, decimals: 0, prefix: "+", suffix: "%", label: "Higher conversion", note: "Average on redesigned stores and landing pages", visual: "ring", bg: BRAND.paper, ink: BRAND.ink, accent: BRAND.ember },
  { value: 98, decimals: 0, suffix: "%", label: "Delivered on time", note: "Projects shipped on the agreed date", visual: "track", bg: BRAND.lime, ink: BRAND.ink, accent: BRAND.ink },
  { value: 1.2, decimals: 1, suffix: "s", label: "Average page load", note: "Measured on recent websites and stores", visual: "gauge", bg: BRAND.ink, ink: BRAND.paper, accent: BRAND.mint },
];

function TileVisual({ visual, accent, ink }: { visual: Visual; accent: string; ink: string }) {
  if (visual === "bars") {
    return (
      <div className="flex h-16 items-end gap-2">
        {[26, 40, 34, 58, 72, 100].map((h, i) => (
          <span key={i} data-imp-bar className="flex-1 origin-bottom rounded-t-[5px]" style={{ height: `${h}%`, background: i === 5 ? accent : `${accent}${["2a", "38", "33", "55", "77", ""][i]}` }} />
        ))}
      </div>
    );
  }
  if (visual === "ring") {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(14,15,20,0.08)" strokeWidth="8" />
        <circle data-imp-ring cx="32" cy="32" r="26" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
      </svg>
    );
  }
  if (visual === "track") {
    return (
      <div className="h-16 w-full">
        <div className="flex justify-between text-[9px] font-semibold tracking-[0.12em] uppercase" style={{ color: `${ink}99` }}><span>Kick-off</span><span>Launch</span></div>
        <div className="relative mt-3 h-2.5 rounded-full" style={{ background: "rgba(14,15,20,0.12)" }}>
          <span data-imp-track className="absolute inset-y-0 left-0 w-full origin-left rounded-full" style={{ background: accent }} />
          <span data-imp-flag className="absolute -top-2.5 right-0 grid h-7 w-7 translate-x-1/2 place-items-center rounded-full text-[12px] font-bold" style={{ background: BRAND.ink, color: BRAND.lime }}>✓</span>
        </div>
        <div className="mt-3 flex justify-between">{[0, 1, 2, 3, 4].map((i) => <i key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: `${ink}55` }} />)}</div>
      </div>
    );
  }
  return (
    <svg viewBox="0 0 120 66" className="h-16 w-auto" aria-hidden>
      <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="9" strokeLinecap="round" />
      <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke={accent} strokeWidth="9" strokeLinecap="round" pathLength={1} strokeDasharray="0.18 1" />
      <g data-imp-needle style={{ transformOrigin: "60px 60px" }}>
        <path d="M60 60 L60 18" stroke={BRAND.paper} strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <circle cx="60" cy="60" r="6" fill={BRAND.paper} />
    </svg>
  );
}

/** Content section: the measurable results behind the work, counted up with the scroll. */
export default function WorkImpact() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-imp-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.12, scrollTrigger: { trigger: "[data-imp-head]", start: "top 88%", end: "top 50%", scrub: 0.65 } });

      gsap.utils.toArray<HTMLElement>("[data-imp-tile]", element).forEach((tile, index) => {
        const scrub = { trigger: tile, start: "top 92%", end: "top 48%", scrub: 0.65 };
        gsap.fromTo(tile, { opacity: 0, y: 70, rotate: index % 2 ? 2 : -2 }, { opacity: 1, y: 0, rotate: 0, ease: "none", scrollTrigger: { ...scrub, end: "top 62%" } });

        // Count the figure with the scroll (forwards and backwards).
        const number = tile.querySelector<HTMLElement>("[data-imp-value]");
        const item = IMPACT[index];
        if (number) {
          const counter = { v: 0 };
          gsap.to(counter, { v: item.value, ease: "none", scrollTrigger: scrub, onUpdate: () => { number.textContent = counter.v.toFixed(item.decimals); } });
        }
        const bars = tile.querySelectorAll("[data-imp-bar]");
        if (bars.length) gsap.fromTo(bars, { scaleY: 0.1 }, { scaleY: 1, ease: "none", stagger: 0.08, scrollTrigger: scrub });
        const ring = tile.querySelector("[data-imp-ring]");
        if (ring) gsap.fromTo(ring, { strokeDashoffset: 1 }, { strokeDashoffset: 1 - item.value / 100, ease: "none", scrollTrigger: scrub });
        const track = tile.querySelector("[data-imp-track]");
        if (track) gsap.fromTo(track, { scaleX: 0 }, { scaleX: item.value / 100, ease: "none", scrollTrigger: scrub });
        const flag = tile.querySelector("[data-imp-flag]");
        if (flag) gsap.fromTo(flag, { scale: 0 }, { scale: 1, ease: "back.out(2)", scrollTrigger: { ...scrub, start: "top 70%" } });
        const needle = tile.querySelector("[data-imp-needle]");
        if (needle) gsap.fromTo(needle, { rotate: 85, svgOrigin: "60 60" }, { rotate: -58, svgOrigin: "60 60", ease: "none", scrollTrigger: scrub });
      });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 py-[12vh] sm:py-[14vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div data-imp-head className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />Impact</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              WHAT OUR WORK<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, ${BRAND.mint} 45%, ${BRAND.ember})` }}>DELIVERS.</span>
            </h2>
          </div>
          <p className="max-w-[40ch] text-[14px] leading-[1.65] text-ink/60">
            Good-looking is the starting point. These are the numbers our clients actually care about,
            averaged across recent projects.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {IMPACT.map((item) => (
            <article
              key={item.label}
              data-imp-tile
              className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[26px] border p-6 shadow-[0_34px_70px_-50px_rgba(14,15,20,0.6)] transition-[translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 sm:p-7"
              style={{ background: item.bg, color: item.ink, borderColor: item.bg === BRAND.paper ? "rgba(14,15,20,0.1)" : "transparent" }}
            >
              <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-100" style={{ background: `${item.accent}2a`, opacity: 0.7 }} />
              <TileVisual visual={item.visual} accent={item.accent} ink={item.ink} />
              <div className="relative mt-auto pt-8">
                <div className="display flex items-baseline text-[clamp(3rem,5vw,4.6rem)] leading-none tabular-nums">
                  {item.prefix && <span>{item.prefix}</span>}
                  <span data-imp-value>{item.value.toFixed(item.decimals)}</span>
                  <span className="text-[0.6em]">{item.suffix}</span>
                </div>
                <div className="mt-3 text-[15px] font-semibold">{item.label}</div>
                <p className="mt-1.5 text-[12.5px] leading-[1.55]" style={{ color: `${item.ink}99` }}>{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
