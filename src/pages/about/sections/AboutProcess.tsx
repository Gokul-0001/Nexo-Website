"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  ["01", "Listen", "Find the real opportunity", "We get close to the people, pressure and ambition behind the brief.", BRAND.cobalt],
  ["02", "Frame", "Make the next move clear", "Together we turn the opportunity into a focused plan, not a stack of slides.", BRAND.mint],
  ["03", "Make", "Work in the open", "Design and technology move side by side, with useful work visible every week.", BRAND.lime],
  ["04", "Evolve", "Keep momentum after launch", "We measure, improve and leave your team with a platform that can keep growing.", BRAND.ember],
] as const;

export default function AboutProcess() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-work-step]", element);
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: element, start: "top 76%", end: "bottom 34%", scrub: 0.7 },
      });

      timeline
        .fromTo("[data-process-head]", { opacity: 0, x: -42 }, { opacity: 1, x: 0, ease: "none" }, 0)
        .fromTo("[data-process-rail]", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0.12);

      steps.forEach((step, index) => {
        timeline.fromTo(step, { opacity: 0, y: 48 }, { opacity: 1, y: 0, ease: "none" }, 0.19 + index * 0.13);
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 py-[14vh] sm:py-[18vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div data-process-head className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="eyebrow text-ink/40">How we work</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              A STRAIGHT LINE<br />TO <span style={{ color: BRAND.mint }}>BETTER WORK.</span>
            </h2>
          </div>
          <p className="max-w-[35ch] text-[14px] leading-[1.65] text-ink/60">
            One senior team, one visible path. The rhythm stays simple so the work can stay sharp.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-8 right-8 top-8 hidden h-px bg-ink/12 lg:block" />
          <div data-process-rail className="absolute left-8 right-8 top-8 hidden h-px origin-left bg-gradient-to-r from-[#2d50ff] via-[#20d3c2] to-[#ff5136] lg:block" />

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map(([number, title, summary, body, color]) => (
              <article key={number} data-work-step className="group relative min-w-0">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-ink/12 bg-paper shadow-[0_18px_30px_-26px_rgba(14,15,20,0.7)]">
                  <i className="h-3 w-3 rounded-full transition-transform duration-500 group-hover:scale-[1.65]" style={{ background: color, boxShadow: `0 0 15px ${color}` }} />
                </div>
                <div className="mt-7 border-t border-ink/12 pt-5 lg:border-0">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-mono-9 tracking-[0.18em] text-ink/40">{number}</span>
                    <span className="h-px flex-1 bg-ink/10 lg:hidden" />
                    <span className="text-mono-9 tracking-[0.15em] uppercase" style={{ color }}>{title}</span>
                  </div>
                  <h3 className="display mt-5 max-w-[10ch] text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[0.9]">{summary}</h3>
                  <p className="mt-4 max-w-[27ch] text-[13px] leading-[1.68] text-ink/60">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-11 flex items-center gap-3 border-t border-ink/12 pt-5 text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
          <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} /> Clear decisions. Shared momentum.
        </div>
      </div>
    </section>
  );
}
