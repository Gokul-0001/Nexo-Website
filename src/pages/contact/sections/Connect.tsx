"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { Marquee } from "@/components/animations/Marquee";
import { Reveal, SplitLines } from "@/components/animations/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@nexo.studio",
    note: "Awards, studio life, builds in motion.",
    href: "https://instagram.com/nexo.studio",
    c: BRAND.ember,
  },
  {
    label: "LinkedIn",
    handle: "/company/nexo-studio",
    note: "Founders' writing on craft and clients.",
    href: "https://linkedin.com/company/nexo-studio",
    c: BRAND.cobalt,
  },
  {
    label: "Dribbble",
    handle: "/nexo",
    note: "Detail crops, motion tests, micro UI.",
    href: "https://dribbble.com/nexo",
    c: BRAND.mint,
  },
  {
    label: "Behance",
    handle: "/nexo",
    note: "Long-form case studies after launch.",
    href: "https://behance.net/nexo",
    c: BRAND.lime,
  },
  {
    label: "Email",
    handle: "studio@nexo.design",
    note: "For everything else.",
    href: "mailto:studio@nexo.design",
    c: BRAND.ink,
  },
];

/**
 * Connect — five feeds, one studio.
 *
 * Reuses the editorial list pattern from Home/Connect but each row now
 *   - has a brand-coloured field that inflates on hover (different colour
 *     per social)
 *   - the display word scales + colour-transitions to the social's accent
 *   - a cursor-following dot in the social's colour
 *   - row enter staggered
 */
export default function Connect() {
  const root = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-social-row]",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: "[data-social-list]", start: "top 80%", toggleActions: "play reverse play reverse" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 py-[12vh] sm:py-[16vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow mb-5 block text-ink/40">05 — Find us elsewhere</span>
            <SplitLines
              lines={["FOLLOW", "THE STUDIO."]}
              className="display text-h2"
              lineClassName="pb-[0.02em]"
              render={(line, i) =>
                i === 1 ? (
                  <span
                    className="block bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.mint} 42%, ${BRAND.ember})`,
                      backgroundSize: "200% 100%",
                      animation: "kroma-drift 18s ease-in-out infinite",
                    }}
                  >
                    {line}
                  </span>
                ) : (
                  line
                )
              }
            />
          </div>
          <p className="max-w-[42ch] text-[14px] leading-[1.62] text-ink/60 lg:pb-4">
            Five feeds, one studio. The work, the people and the build process — none of it
            locked behind a gate.
          </p>
        </div>

        {/* Editorial social list */}
        <div data-social-list className="mt-14 border-t border-ink/12 sm:mt-20">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="link"
              data-social-row
              className="group relative grid grid-cols-[6rem_1fr_auto] items-center gap-6 border-b border-ink/10 px-1 py-6 sm:grid-cols-[10rem_1fr_auto] sm:gap-8 sm:px-6 sm:py-7"
            >
              {/* Brand-coloured field that inflates left→right on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  background: `linear-gradient(96deg, ${s.c}1f, ${s.c}0a 55%, transparent)`,
                  transform: "scaleX(0)",
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(96deg, ${s.c}1f, ${s.c}0a 55%, transparent)`,
                }}
              />

              <span className="text-mono-9 text-ink/40 uppercase">
                {s.label}
              </span>

              {/* Display word — animates on hover, colour shifts to brand */}
              <span className="relative">
                <span
                  className="display block text-[clamp(1.9rem,6.4vw,4.1rem)] leading-[0.92] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3"
                  style={{ color: "var(--c)" }}
                >
                  <span
                    className="transition-colors duration-500"
                    style={{ color: "inherit" }}
                  >
                    {s.handle}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-1/3"
                  style={{ background: s.c }}
                />
              </span>

              {/* Right meta — note + arrow */}
              <span className="relative flex items-center gap-3">
                <span className="hidden text-right text-[12.5px] text-ink/55 sm:block max-w-[26ch]">
                  {s.note}
                </span>
                <span
                  className="h-2 w-2 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-150"
                  style={{ background: s.c }}
                />
                <span
                  aria-hidden
                  className="text-mono-10-5 text-ink/45 uppercase transition-transform duration-500 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* Trailing meta */}
        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow text-ink/40">Posting weekly · Quiet on Sundays</p>
          <p className="text-[12.5px] text-ink/55">
            Prefer to talk?{" "}
            <a
              href="#enquiry"
              data-cursor="link"
              className="relative text-ink underline decoration-ink/25 underline-offset-4 transition-all hover:decoration-ink"
            >
              Send a brief →
            </a>
          </p>
        </Reveal>
      </div>

      {/* Marquee band — same dark marquee style as Home mid-page */}
      <div className="relative z-10 mt-[8vh] border-y border-ink/10 bg-ink py-4">
        <Marquee
          items={[
            "STUDIO@NEXO.DESIGN",
            "PRESS@NEXO.DESIGN",
            "JOIN@NEXO.DESIGN",
            "HELLO@NEXO.DESIGN",
            "+351 21 000 0000",
          ]}
          duration={36}
          itemClassName="display text-[clamp(1rem,2.6vw,1.7rem)] text-paper/85"
        />
      </div>
    </section>
  );
}
