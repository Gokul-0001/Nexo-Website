"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";
import { useMagnetic, usePrefersReducedMotion } from "@/lib/motion";
import ContactSignals from "./ContactSignals";

gsap.registerPlugin(ScrollTrigger);

/**
 * Contact hero — a fresh composition built around a "live broadcast" motif.
 *
 * Left rail:
 *   - Eyebrow status row
 *   - Massive display headline with one gradient word + one outline word
 *   - Opening paragraph + magnetic CTA pair
 *   - Editorial metadata column (date, coord, channel)
 *
 * Right rail:
 *   - Three floating contact touchpoints, each with its own scroll depth.
 *
 * Top strap (above the grid):
 *   - A marquee-style filing strip with the visitor's exact local time +
 *     channel call sign, hooked to scroll progress.
 */
export default function ContactHero() {
  const root = useRef<HTMLDivElement | null>(null);
  const contactVisual = useRef<HTMLDivElement | null>(null);
  const heroCopy = useRef<HTMLDivElement | null>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.34);
  const secondRef = useMagnetic<HTMLAnchorElement>(0.22);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      // Hero reveal — staggered fade + horizontal sweep on the heading
      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.07, delay: 0.2 },
      );
      // Home-hero-style depth: each contact touchpoint moves at its own pace.
      const devices = contactVisual.current;
      if (devices) {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.75 },
        });
        timeline
          .to("[data-contact-device=brief]", { yPercent: 18, xPercent: -5, scale: 1.02, ease: "none" }, 0);
      }
      if (heroCopy.current) {
        gsap.to(heroCopy.current, {
          yPercent: -12,
          opacity: 0.18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.7 },
        });
      }
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={root}
      className="relative z-10 overflow-hidden pt-[12vh] pb-[14vh] sm:pt-[16vh] sm:pb-[16vh]"
    >

      {/* Ambient drift — same `anim-drift` blobs as Home hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="anim-drift absolute -top-[28vh] -left-[12vw] h-[58vh] w-[58vh] rounded-full blur-[100px]"
          style={{ background: `radial-gradient(circle, ${BRAND.cobalt}55, transparent 70%)` }}
        />
        <div
          className="anim-drift absolute top-[12vh] right-[-10vw] h-[46vh] w-[46vh] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${BRAND.ember}44, transparent 72%)`, animationDelay: "-9s" }}
        />
        <div
          className="anim-drift absolute bottom-[-12vh] left-[30vw] h-[40vh] w-[40vh] rounded-full blur-[100px]"
          style={{ background: `radial-gradient(circle, ${BRAND.mint}33, transparent 72%)`, animationDelay: "-14s" }}
        />
        <div className="grain absolute inset-0 opacity-[0.10] mix-blend-multiply" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-10 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        {/* ───────────── LEFT — editorial opening ───────────── */}
        <div ref={heroCopy} className="flex flex-col justify-center lg:min-h-[620px]">
          <div data-hero-fade className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow flex items-center gap-2 text-ink/55">
              <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />
              Contact Nexo
            </span>
            <span className="hidden h-3 w-px bg-ink/15 sm:block" />
            <span className="eyebrow text-ink/40">Call · Email · WhatsApp · Social</span>
          </div>
          <h1 className="text-h1 [text-shadow:0_0_48px_rgba(255,255,255,0.92),0_0_10px_rgba(255,255,255,0.8)]">
            <SplitLines
              as="span"
              from="load"
              stagger={0.13}
              lines={["LET'S TALK.", "ANYWHERE."]}
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
                  <span className="text-ink">{line}</span>
                )
              }
            />
          </h1>

          <p data-hero-fade className="mt-9 max-w-[52ch] text-[14px] leading-[1.65] text-ink/65 sm:text-[15.5px]">
            Send the brief by email, ring the studio, drop us a WhatsApp or find us on LinkedIn and
            Instagram. However you reach out, a founder reads it and replies within one working day
            with a clear next step, wherever in the world you are building.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <a
              ref={ctaRef}
              href="#enquiry"
              data-cursor="magnet"
              className="group relative overflow-hidden rounded-full px-7 py-4 text-mono-10-5 tracking-[0.18em] text-paper uppercase"
              style={{ background: BRAND.ink }}
            >
              <span
                className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                style={{ background: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.ember} 60%, ${BRAND.mint})` }}
              />
              <span className="relative flex items-center gap-2">
                Send a message
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                  <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </a>

            <a
              ref={secondRef}
              href="#details"
              data-cursor="link"
              className="group flex items-center gap-3 rounded-full border border-ink/15 bg-paper/70 px-6 py-4 text-mono-10-5 tracking-[0.18em] text-ink/70 uppercase backdrop-blur-sm transition-colors duration-500 hover:border-ink/40 hover:text-ink"
            >
              View our locations
              <span className="relative block h-1.5 w-1.5 rounded-full" style={{ background: BRAND.ember }} />
            </a>
          </div>

        </div>

        {/* ───────────── RIGHT — floating contact touchpoints ───────────── */}
        <div ref={contactVisual} className="relative w-full lg:pl-4">
          <ContactSignals />
        </div>
      </div>
    </section>
  );
}
