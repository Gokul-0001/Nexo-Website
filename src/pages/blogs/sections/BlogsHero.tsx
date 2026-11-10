"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { usePrefersReducedMotion } from "@/lib/motion";
import { SplitLines } from "@/components/animations/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function BlogsHero() {
  const root = useRef<HTMLDivElement | null>(null);
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
            (00) — Journal · weekly
          </span>
          <span className="hidden h-3 w-px bg-ink/15 sm:block" />
          <span className="eyebrow text-ink/40">Founders&apos; writing · since 2017</span>
        </div>

        <h1 className="display text-h1 [text-shadow:0_0_48px_rgba(255,255,255,0.92),0_0_10px_rgba(255,255,255,0.8)]">
          <SplitLines
            as="span"
            from="load"
            stagger={0.13}
            lines={["WRITING ON", "CRAFT,", "CLIENTS & CODE."]}
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

        <p data-hero-fade className="mt-12 max-w-[48ch] text-[14px] leading-[1.62] text-ink/65 sm:text-[15.5px]">
          Long-form notes from the studio — what worked, what didn&apos;t, and what we are still
          figuring out. No clickbait, no engagement-bait, no &quot;10 tips&quot; lists.
        </p>
      </div>
    </section>
  );
}