"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";
import { useMagnetic, usePrefersReducedMotion } from "@/lib/motion";
import CareersBoard from "./CareersBoard";

gsap.registerPlugin(ScrollTrigger);

/**
 * Careers hero — same opening recipe as the other heroes (eyebrow, big split headline, paragraph,
 * magnetic CTA pair) with a hanging whiteboard notice board on the right, plus a "Now hiring" badge,
 * an offer-letter card and a team card.
 */
export default function CareersHero() {
  const root = useRef<HTMLElement | null>(null);
  const heroCopy = useRef<HTMLDivElement | null>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.34);
  const secondRef = useMagnetic<HTMLAnchorElement>(0.22);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-hero-fade]", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.07, delay: 0.2 });
      // Desk items land one after another on load…
      gsap.fromTo("[data-desk]", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.35 });
      // …and as you scroll away the board tips back while the cards drift off on their own paths
      // (scrubbed, so it all replays in reverse when you scroll back up).
      const motion: Record<string, gsap.TweenVars> = {
        board: { yPercent: -8, scale: 0.93, rotate: -2 },
        badge: { yPercent: -40, rotate: 240 },
        offer: { yPercent: 30, xPercent: -30, rotate: -12 },
        team: { yPercent: 24, xPercent: 25, rotate: 8 },
      };
      gsap.utils.toArray<HTMLElement>("[data-desk]").forEach((item) => {
        const vars = motion[item.dataset.desk ?? ""] ?? { yPercent: 0 };
        gsap.to(item, { ...vars, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.75 } });
      });
      if (heroCopy.current) {
        gsap.to(heroCopy.current, { yPercent: -12, opacity: 0.18, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.7 } });
      }
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={root} className="relative z-10 overflow-hidden pt-[12vh] pb-[8vh] sm:pt-[16vh] sm:pb-[9vh]">
      {/* Ambient drift — same blobs as the other heroes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="anim-drift absolute -top-[28vh] -left-[12vw] h-[58vh] w-[58vh] rounded-full blur-[100px]" style={{ background: `radial-gradient(circle, ${BRAND.cobalt}55, transparent 70%)` }} />
        <div className="anim-drift absolute top-[12vh] right-[-10vw] h-[46vh] w-[46vh] rounded-full blur-[110px]" style={{ background: `radial-gradient(circle, ${BRAND.lime}55, transparent 72%)`, animationDelay: "-9s" }} />
        <div className="anim-drift absolute bottom-[-12vh] left-[30vw] h-[40vh] w-[40vh] rounded-full blur-[100px]" style={{ background: `radial-gradient(circle, ${BRAND.ember}33, transparent 72%)`, animationDelay: "-14s" }} />
        <div className="grain absolute inset-0 opacity-[0.10] mix-blend-multiply" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
        {/* LEFT — editorial opening */}
        <div ref={heroCopy} className="flex min-w-0 flex-col justify-center lg:min-h-[620px]">
          <div data-hero-fade className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow flex items-center gap-2 text-ink/55">
              <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />
              Careers at Nexo
            </span>
            <span className="hidden h-3 w-px bg-ink/15 sm:block" />
            <span className="eyebrow text-ink/40">Design · Code · Growth</span>
          </div>
          <h1 className="text-h1 [text-shadow:0_0_48px_rgba(255,255,255,0.92),0_0_10px_rgba(255,255,255,0.8)]">
            <SplitLines
              as="span"
              from="load"
              stagger={0.13}
              lines={["JOIN THE", "MAKERS."]}
              className="block"
              lineClassName="pb-[0.02em]"
              render={(line, i) =>
                i >= 1 ? (
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
                  <span className="text-ink">{line}</span>
                )
              }
            />
          </h1>

          <p data-hero-fade className="mt-9 max-w-[52ch] text-[14px] leading-[1.65] text-ink/65 sm:text-[15.5px]">
            Join a small, senior team building websites, stores, apps, campaigns and automations for
            growing Indian businesses. Real projects, real ownership, and a team that helps you grow.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <a
              ref={ctaRef}
              href="#roles"
              data-cursor="magnet"
              className="group relative overflow-hidden rounded-full px-7 py-4 text-mono-10-5 tracking-[0.18em] text-paper uppercase"
              style={{ background: BRAND.ink }}
            >
              <span className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" style={{ background: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.ember} 60%, ${BRAND.mint})` }} />
              <span className="relative flex items-center gap-2">
                See open roles
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                  <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </a>
            <a
              ref={secondRef}
              href="#process"
              data-cursor="link"
              className="group flex items-center gap-3 rounded-full border border-ink/15 bg-paper/70 px-6 py-4 text-mono-10-5 tracking-[0.18em] text-ink/70 uppercase backdrop-blur-sm transition-colors duration-500 hover:border-ink/40 hover:text-ink"
            >
              How we hire
              <span className="relative block h-1.5 w-1.5 rounded-full" style={{ background: BRAND.ember }} />
            </a>
          </div>
        </div>

        {/* RIGHT — the whiteboard of open roles */}
        <div className="relative w-full min-w-0">
          <CareersBoard />
        </div>
      </div>
    </section>
  );
}
