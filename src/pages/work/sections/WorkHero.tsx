"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { useMagnetic, usePrefersReducedMotion } from "@/lib/motion";
import { SplitLines } from "@/components/animations/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function WorkHero() {
  const root = useRef<HTMLDivElement | null>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.32);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.4 },
      );
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={root} className="relative z-10 min-h-[80vh] py-[14vh] sm:py-[18vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div data-hero-fade className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="eyebrow flex items-center gap-2 text-ink/55">
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.mint }} />
            (00) — Selected work · 2024–2026
          </span>
          <span className="hidden h-3 w-px bg-ink/15 sm:block" />
          <span className="eyebrow text-ink/40">21 case studies · 4 below</span>
        </div>

        <h1 className="display text-h1 [text-shadow:0_0_48px_rgba(255,255,255,0.92),0_0_10px_rgba(255,255,255,0.8)]">
          <SplitLines
            as="span"
            from="load"
            stagger={0.13}
            lines={["WORK THAT", "OUTLIVES", "THE BRIEF."]}
            className="block"
            lineClassName="pb-[0.02em]"
            render={(line, i) =>
              i === 1 ? (
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(96deg, ${BRAND.cobalt}, ${BRAND.mint} 28%, ${BRAND.ink} 50%, ${BRAND.ember} 72%, ${BRAND.cobalt})`,
                    backgroundSize: "300% 100%",
                    animation: reduce ? undefined : "kroma-gradient-pan 11s linear infinite",
                  }}
                >
                  {line}
                </span>
              ) : (
                line
              )
            }
          />
        </h1>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <p data-hero-fade className="max-w-[46ch] text-[14px] leading-[1.62] text-ink/65 sm:text-[15.5px]">
            Four of twenty-one case studies from the last two years — the ones that still hold up,
            shipped under deadline and lived through their first quarter.
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <a
              ref={ctaRef}
              href="#index"
              data-cursor="magnet"
              className="group relative overflow-hidden rounded-full px-7 py-4 text-mono-10-5 tracking-[0.18em] text-paper uppercase"
              style={{ background: BRAND.ink }}
            >
              <span
                className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                style={{ background: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.ember} 60%, ${BRAND.mint})` }}
              />
              <span className="relative flex items-center gap-2">
                Read the cases
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                  <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}