"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  ["01", "Close to the work", "The people shaping the direction remain present through every important decision.", BRAND.cobalt],
  ["02", "Make it useful", "We start with the thing a customer, team or business needs to do better next.", BRAND.mint],
  ["03", "Say the clear thing", "Direct feedback, visible progress and honest trade-offs make the work stronger.", BRAND.lime],
  ["04", "Leave it better", "We build flexible systems that keep creating value well after the launch moment.", BRAND.ember],
] as const;

export default function AboutPrinciples() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-principle-row]", element);
      rows.forEach((row, index) => {
        gsap.fromTo(row, { opacity: 0, x: index % 2 ? 72 : -72 }, {
          opacity: 1, x: 0, ease: "none",
          scrollTrigger: { trigger: row, start: "top 86%", end: "top 52%", scrub: 0.65 },
        });
      });

      gsap.fromTo("[data-principle-statement]", { opacity: 0, y: 64 }, {
        opacity: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: element, start: "top 76%", end: "top 44%", scrub: 0.7 },
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 overflow-hidden py-[16vh] sm:py-[20vh]">
      <div aria-hidden className="pointer-events-none absolute right-[-0.08em] top-[8vh] display text-[clamp(14rem,29vw,30rem)] leading-none text-ink/[0.035]">
        N
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow text-ink/40">How we show up</span>
          <h2 data-principle-statement className="display mt-5 max-w-[9ch] text-h2 leading-[0.88]">
            THE WAY WE <span style={{ color: BRAND.cobalt }}>HOLD</span> THE WORK.
          </h2>
          <p className="mt-7 max-w-[29ch] text-[14px] leading-[1.68] text-ink/60">
            A few working beliefs keep our studio focused, candid and genuinely useful to the people we partner with.
          </p>
          <span className="mt-10 hidden items-center gap-3 text-mono-9 tracking-[0.2em] text-ink/40 uppercase lg:flex">
            <i className="h-2 w-2 rounded-full" style={{ background: BRAND.ember }} /> Our operating principles
          </span>
        </div>

        <div className="border-y border-ink/12">
          {PRINCIPLES.map(([number, title, body, color]) => (
            <article key={number} data-principle-row className="group grid gap-5 border-b border-ink/12 py-8 first:border-t-0 sm:grid-cols-[72px_minmax(12rem,0.7fr)_1fr] sm:items-start sm:gap-8 sm:py-11 last:border-b-0">
              <span className="display text-[clamp(2.8rem,5vw,4.7rem)] leading-[0.72] text-ink/12" style={{ WebkitTextStroke: `1px ${color}` }}>
                {number}
              </span>
              <h3 className="display text-[clamp(1.75rem,3.25vw,3.25rem)] leading-[0.9] transition-transform duration-500 group-hover:translate-x-2">
                {title}
              </h3>
              <div className="sm:pt-1">
                <i className="mb-4 block h-1.5 w-12 rounded-full transition-all duration-500 group-hover:w-20" style={{ background: color }} />
                <p className="max-w-[29ch] text-[14px] leading-[1.68] text-ink/60">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
