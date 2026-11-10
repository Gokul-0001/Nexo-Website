"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { usePrefersReducedMotion } from "@/lib/motion";
import { SplitLines } from "@/components/animations/TextReveal";
import HeaderVisual from "./HeaderVisual";

gsap.registerPlugin(ScrollTrigger);

export type PageHeaderCta = {
  label: string;
  href: string;
  tone?: "primary" | "secondary";
  background?: string;
  hoverBackground?: string;
};

export type PageHeaderMeta = {
  label: string;
  value: string;
};

export type PageHeaderProps = {
  eyebrow: string;
  titleLines: string[];
  description?: string;
  ctas?: PageHeaderCta[];
  meta?: PageHeaderMeta[];
  id?: string;
  visual?: boolean;
  visualVariant?: "default" | "compact";
  sticky?: boolean;
};

export default function PageHeader({
  eyebrow,
  titleLines,
  description,
  ctas,
  meta,
  id,
  visual = true,
  visualVariant = "default",
  sticky = false,
}: PageHeaderProps) {
  const root = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return;
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-page-fade]",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1.05, ease: "expo.out", stagger: 0.07, delay: 0.2 },
      );
      gsap.fromTo(
        "[data-page-rule]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "expo.inOut",
          delay: 0.15,
          transformOrigin: "left center",
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  const titleText = titleLines.join(" ");

  return (
    <section
      ref={root}
      id={id}
      className={
        sticky
          ? "relative z-10 py-8 sm:py-12 lg:py-16"
          : "relative z-10 py-8 sm:py-12 lg:py-16"
      }
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Compact rule line for editorial feel */}
        <div
          data-page-rule
          className="mx-auto mb-10 hidden h-px w-[92%] bg-gradient-to-r from-transparent via-ink/15 to-transparent lg:block"
        />

        {/* Main two-sided composition: LEFT (content) | RIGHT (3D visual) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1.2fr] lg:gap-12 items-start">
          {/* LEFT SIDE: Typography and content */}
          <div className="relative z-20">
            {/* Eyebrow with decorative dot */}
            <div data-page-fade className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="eyebrow flex items-center gap-2 text-ink/55">
                <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.mint }} />
                {eyebrow}
              </span>
            </div>

            {/* Main heading with gradient animation */}
            <h1
              className="display text-h1 leading-[0.92] [text-shadow:0_0_48px_rgba(255,255,255,0.92),0_0_10px_rgba(255,255,255,0.8)]"
              title={titleText}
            >
              <SplitLines
                as="span"
                from="load"
                stagger={0.12}
                lines={titleLines}
                className="block"
                // Remove lineClassName="pb-[0.02em]" entirely
                render={(line, i) =>
                  i === 1 ? (
                    <span
                      className="block bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, ${BRAND.mint} 24%, ${BRAND.ink} 48%, ${BRAND.ember} 72%, ${BRAND.cobalt})`,
                        backgroundSize: "300% 100%",
                        animation: reduce ? undefined : "kroma-gradient-pan 11s linear infinite",
                      }}
                    >
                      {line}
                    </span>
                  ) : (
                    // Removed leading-snug and pb-[0.02em] from here
                    <span className="text-ink/95 block">{line}</span>
                  )
                }
              />
            </h1>

            {/* Description and CTAs */}
            {(description || (ctas && ctas.length > 0)) && (
              <div className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
                {description && (
                  <p data-page-fade className="max-w-[46ch] text-[14px] leading-[1.62] text-ink/65 sm:text-[15.5px]">
                    {description}
                  </p>
                )}

                {ctas && ctas.length > 0 && (
                  <div data-page-fade className="flex flex-wrap items-center gap-3">
                    {ctas.map((cta, i) => {
                      const isPrimary = (cta.tone ?? (i === 0 ? "primary" : "secondary")) === "primary";
                      return (
                        <a
                          key={cta.label + i}
                          href={cta.href}
                          data-cursor="magnet"
                          className={
                            isPrimary
                              ? "group relative overflow-hidden rounded-full px-7 py-4 text-mono-10-5 tracking-[0.18em] text-paper uppercase"
                              : "group flex items-center gap-3 rounded-full border border-ink/15 bg-paper/70 px-6 py-4 text-mono-10-5 tracking-[0.18em] text-ink/70 uppercase backdrop-blur-sm transition-colors duration-500 hover:border-ink/40 hover:text-ink"
                          }
                          style={cta.background ? { background: cta.background } : undefined}
                        >
                          {isPrimary && cta.hoverBackground && (
                            <span
                              className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                              style={{ background: cta.hoverBackground }}
                            />
                          )}
                          <span className={isPrimary ? "relative flex items-center gap-2" : "flex items-center gap-2"}>
                            {cta.label}
                            {isPrimary && (
                              <svg
                                width="14"
                                height="10"
                                viewBox="0 0 14 10"
                                fill="none"
                                className="transition-transform duration-500 group-hover:translate-x-1.5"
                              >
                                <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                              </svg>
                            )}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Independent 3D visual composition */}
          <div className="relative hidden lg:block">
            <div className="h-[75vh] w-full max-w-[540px]">
              {visual && <HeaderVisual variant={visualVariant} />}
            </div>
          </div>
        </div>

        {/* Bottom meta strip */}
        {meta && meta.length > 0 && (
          <div className="relative z-[3] mx-auto mt-16 w-full max-w-[1440px] px-5 pb-6 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-4">
              <span className="eyebrow text-ink/45">NEXO · est. 2016</span>

              <div className="hidden gap-10 md:flex">
                {meta.slice(0, 3).map((row) => (
                  <div key={row.label}>
                    <div className="display text-[20.5px] leading-none">{row.value}</div>
                    <div className="eyebrow mt-1 text-ink/40">{row.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="/contact"
                  data-cursor="link"
                  className="eyebrow text-ink/50 transition-colors hover:text-ink"
                >
                  Contact
                </a>
                <a
                  href="/work"
                  data-cursor="link"
                  className="eyebrow text-ink/50 transition-colors hover:text-ink"
                >
                  Work
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
