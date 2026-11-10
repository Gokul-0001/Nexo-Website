"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { useMagnetic } from "@/lib/motion";
import { Reveal } from "@/components/animations/TextReveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * Final CTA — a memorable typographic close.
 *
 * Built like the editorial back-cover of a magazine: dark panel, a big
 * but readable headline (sized like Home `Process` H2, not like Hero H1),
 * magnetic CTA + email link, and an editorial metadata close.
 *
 * Typography follows the Home page scale exactly:
 *   - H2 heading       → `clamp(1.7rem, 5vw, 3.8rem)`     (Home Process)
 *   - paragraph        → `text-[14px] sm:text-[15.5px]`    (Home About/Hero)
 *   - eyebrow + mono   → `text-[9.5px] tracking-[0.18em]` (Home everywhere)
 *
 * Background scene is intentionally calm:
 *   - One large ambient orb (cobalt, top-left)
 *   - One ambient orb (mint, bottom-right)
 *   - One subtle parallax grid that fades in
 *   - A short orbital ring that drifts in place
 *   - A horizontal scan-line glow that breathes left → right
 *   - Soft drifting brand-coloured sparks that rise
 *
 * The ambient drift blobs + grain overlay are kept for warmth (same as Home).
 */
export default function FinalCTA() {
  const btn = useMagnetic<HTMLAnchorElement>(0.32);
  const secondary = useMagnetic<HTMLAnchorElement>(0.22);
  const root = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      // Card settles in — same kind of motion Home uses on its CTA panel
      gsap.fromTo(
        cardRef.current,
        { scale: 0.97, borderRadius: 60 },
        {
          scale: 1,
          borderRadius: 30,
          ease: "none",
          scrollTrigger: { trigger: cardRef.current, start: "top 92%", end: "top 35%", scrub: 0.7 },
        },
      );

      // Orbital ring — single slow drift, matches the grain & ambient feel
      gsap.to("[data-final-orbit]", {
        rotate: 360,
        ease: "none",
        duration: 80,
        repeat: -1,
      });

      // Parallax grid — fades in and drifts horizontally as the card enters
      gsap.fromTo(
        "[data-final-grid]",
        { xPercent: -6, opacity: 0 },
        {
          xPercent: 6,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: { trigger: cardRef.current, start: "top 92%", end: "bottom 40%", scrub: 0.6 },
        },
      );

      // Scan-line — breathes left → right (slow marquee-style)
      gsap.fromTo(
        "[data-final-scan]",
        { xPercent: -50 },
        { xPercent: 50, ease: "none", duration: 9, repeat: -1, yoyo: true },
      );

      // Sparks drift up in a continuous loop
      const particles = gsap.utils.toArray<HTMLElement>("[data-final-spark]");
      particles.forEach((p, i) => {
        gsap.fromTo(
          p,
          { y: 30, opacity: 0 },
          {
            y: -260,
            opacity: 1,
            duration: 7 + (i % 4),
            ease: "none",
            repeat: -1,
            delay: -((i * 0.7) % 4),
            modifiers: {
              y: gsap.utils.unitize((y: string) => {
                const n = parseFloat(y);
                return ((n + 320) % 320) - 320;
              }),
            },
          },
        );
      });

      // Title words reveal one-by-one using a per-word mask
      const words = gsap.utils.toArray<HTMLElement>("[data-final-word]", titleRef.current ?? undefined);
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%", toggleActions: "play reverse play reverse" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 px-3 pt-[2vh] pb-[10vh] sm:px-6 sm:pb-[14vh]">
      <div
        ref={cardRef}
        data-cursor="none"
        className="group relative mx-auto w-full max-w-[1440px] overflow-hidden px-5 py-[10vh] sm:px-10 sm:py-[12vh]"
        style={{ background: BRAND.ink, borderRadius: 30 }}
      >
        {/* ─── Background scene ─────────────────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Parallax grid — fades in and drifts horizontally with scroll */}
          <div
            data-final-grid
            className="absolute inset-0 opacity-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "radial-gradient(ellipse 70% 80% at 50% 40%, #000 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 80% at 50% 40%, #000 30%, transparent 80%)",
            }}
          />

          {/* Single orbital ring drifting slowly in place */}
          <div className="absolute -top-[44%] left-1/2 -translate-x-1/2">
            <svg
              width="900"
              height="900"
              viewBox="0 0 900 900"
              fill="none"
              className="opacity-60"
            >
              <g transform="translate(450 450)">
                <circle
                  data-final-orbit
                  r="340"
                  stroke={BRAND.cobalt}
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  strokeDasharray="3 12"
                  fill="none"
                />
                {/* Three brand-tinted points on the ring (anchor elements) */}
                <circle cx="340" cy="0" r="3" fill={BRAND.lime} opacity="0.9" />
                <circle cx="-240" cy="240" r="2.5" fill={BRAND.ember} opacity="0.9" />
                <circle cx="-100" cy="-320" r="2" fill={BRAND.mint} opacity="0.9" />
              </g>
            </svg>
          </div>

          {/* Soft scan-line glow — breathes horizontally */}
          <div
            aria-hidden
            className="absolute inset-y-[20%] left-0 right-0"
          >
            <div
              data-final-scan
              className="h-full w-[40%] blur-[60px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(31,224,190,0.18), transparent)",
              }}
            />
          </div>

          {/* Drifting sparks */}
          <div className="absolute inset-0">
            {[
              { left: "12%", color: BRAND.lime, size: 3 },
              { left: "22%", color: BRAND.cobalt, size: 2 },
              { left: "33%", color: BRAND.paper, size: 4 },
              { left: "44%", color: BRAND.mint, size: 2 },
              { left: "55%", color: BRAND.ember, size: 3 },
              { left: "66%", color: BRAND.lime, size: 2 },
              { left: "74%", color: BRAND.paper, size: 3 },
              { left: "82%", color: BRAND.cobalt, size: 2 },
              { left: "90%", color: BRAND.mint, size: 4 },
              { left: "8%", color: BRAND.ember, size: 2 },
            ].map((p, i) => (
              <span
                key={i}
                data-final-spark
                aria-hidden
                className="absolute bottom-0 block rounded-full"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 4}px ${p.color}88`,
                }}
              />
            ))}
          </div>

          {/* Ambient brand glows — kept for warmth (same as Home CTA) */}
          <div
            className="anim-drift absolute -top-[40%] left-[-12%] h-[80%] w-[60%] rounded-full blur-[80px]"
            style={{
              background: `radial-gradient(circle, ${BRAND.cobalt}, transparent 66%)`,
              opacity: 0.85,
            }}
          />
          <div
            className="anim-drift absolute -right-[18%] -bottom-[40%] h-[70%] w-[60%] rounded-full blur-[90px]"
            style={{
              background: `radial-gradient(circle, ${BRAND.mint}, transparent 64%)`,
              opacity: 0.7,
              animationDelay: "-9s",
            }}
          />
        </div>

        <div className="grain absolute inset-0 opacity-[0.22] mix-blend-overlay" />

        {/* ─── Top strap — final word / index ──────────────── */}
        <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between text-mono-9 text-paper/55 uppercase">
          <span className="flex items-center gap-2">
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />
            06 — Sign off
          </span>
          <span>End of transmission</span>
        </div>

        {/* ─── Headline — global text-h2-md token, consistent with other Contact sections ───────── */}
        <h2
          ref={titleRef}
          className="display text-h2-md relative mx-auto mt-10 max-w-[1080px] text-center text-paper leading-[0.92]"
        >
          {/* Line 1 — LET'S BUILD */}
          <span className="flex flex-wrap items-baseline justify-center">
            <span className="reveal-line inline-block overflow-hidden align-bottom">
              <span data-final-word className="inline-block">LET&apos;S</span>
            </span>
            <span className="reveal-line inline-block overflow-hidden align-bottom">
              <span
                data-final-word
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(96deg, ${BRAND.cobalt}, ${BRAND.mint} 28%, ${BRAND.paper} 50%, ${BRAND.ember} 72%, ${BRAND.cobalt})`,
                  backgroundSize: "300% 100%",
                  animation: "kroma-gradient-pan 12s linear infinite",
                }}
              >
                BUILD
              </span>
            </span>
          </span>

          {/* Line 2 — SOMETHING EXTRAORDINARY. */}
          <span className="flex flex-wrap items-baseline justify-center">
            <span className="reveal-line inline-block overflow-hidden align-bottom">
              <span data-final-word className="inline-block">SOMETHING</span>
            </span>
            <span className="reveal-line inline-block overflow-hidden align-bottom">
              <span
                data-final-word
                className="inline-block"
                style={{ WebkitTextStroke: `1.1px ${BRAND.paper}` }}
              >
                EXTRAORDINARY
              </span>
            </span>
            <span data-final-word className="inline-block" style={{ color: BRAND.lime }}>.</span>
          </span>
        </h2>

        {/* Sub-copy — Home paragraph scale */}
        <Reveal className="relative mx-auto mt-8 max-w-[52ch] text-center">
          <p className="text-[14px] leading-[1.66] text-paper/70 sm:text-[15.5px]">
            Two project slots left for Q3. The studio reads everything itself. Send the brief —
            even a rough one — and a founder will reply within one working day.
          </p>
        </Reveal>

        {/* CTAs */}
        <div className="relative mx-auto mt-10 flex max-w-[640px] flex-wrap items-center justify-center gap-4">
          <a
            ref={btn}
            href="#enquiry"
            data-cursor="magnet"
            className="group/btn relative overflow-hidden rounded-full px-7 py-4 text-mono-10-5 tracking-[0.2em] text-ink uppercase"
            style={{ background: BRAND.lime }}
          >
            <span
              className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-y-0"
              style={{ background: `linear-gradient(100deg, ${BRAND.paper}, ${BRAND.lime})` }}
            />
            <span className="relative flex items-center gap-3">
              Start a brief
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                className="transition-transform duration-500 group-hover/btn:translate-x-1.5"
              >
                <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </a>

          <a
            ref={secondary}
            href="mailto:studio@nexo.design"
            data-cursor="link"
            className="border-b border-paper/25 pb-1 text-mono-10-5 text-paper/75 uppercase transition-colors duration-500 hover:border-paper hover:text-paper"
          >
            studio@nexo.design
          </a>
        </div>

        {/* Address line — editorial close (Home scale) */}
        <div className="relative mx-auto mt-14 max-w-[920px] border-t border-paper/12 pt-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-paper/55">
            <span className="text-mono-9 text-paper/45 uppercase">
              Studios
            </span>
            <span>R. da Boavista 102 · 1200-066 Lisboa</span>
            <span className="hidden h-3 w-px bg-paper/15 sm:block" />
            <span>Kastanienallee 23 · 10435 Berlin</span>
            <span className="hidden h-3 w-px bg-paper/15 sm:block" />
            <span className="text-mono-9 uppercase">
              UTC +0 · Studio live
            </span>
          </div>
        </div>

        {/* Bottom row — brand mark + tagline (Home Counter/About scale) */}
        <div className="relative mx-auto mt-12 flex max-w-[1280px] flex-wrap items-end justify-between gap-6">
          <div className="text-mono-9 text-paper/45 uppercase">
            <div className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: BRAND.lime }} />
              On air · 2 / 6 slots · Q3 2026
            </div>
            <div className="mt-1">Reply · ≤ 24 hours · NDA on request</div>
          </div>
          <div className="display text-[clamp(1.85rem,3.7vw,2.5rem)] leading-none">
            <span style={{ color: BRAND.lime }}>NEXO</span>
            <span className="text-paper">®</span>
          </div>
          <div className="text-mono-9 text-paper/45 uppercase">
            © {new Date().getFullYear()} · Est. 2016
          </div>
        </div>
      </div>
    </section>
  );
}
