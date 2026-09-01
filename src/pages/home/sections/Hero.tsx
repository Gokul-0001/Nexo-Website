import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DeviceShowcase from "./DeviceShowcase";
import { RotatingBadge } from "./Artwork";
import { SplitLines } from "@/components/animations/TextReveal";
import { BRAND } from "@/lib/brand";
import { useMagnetic, usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.32);
  const secondRef = useMagnetic<HTMLAnchorElement>(0.22);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.6 },
      );
      gsap.fromTo(
        "[data-hero-rule]",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "expo.inOut", delay: 0.5, transformOrigin: "left center" },
      );
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: { trigger: "[data-hero-stage]", start: "top top", end: "bottom top", scrub: 0.7 },
        })
        .to("[data-device=laptop]", { xPercent: -12, yPercent: 6, scale: 1.2, rotate: -1.6, ease: "none" }, 0)
        .to("[data-device=monitor]", { xPercent: 18, yPercent: -16, scale: 0.86, rotate: 3.5, ease: "none" }, 0)
        .to("[data-device=phone]", { xPercent: -34, yPercent: 20, rotate: -15, scale: 1.06, ease: "none" }, 0)
        .to("[data-hero-chip]", { opacity: 0, y: -30, ease: "none" }, 0)
        .to("[data-hero-copy]", { yPercent: -22, opacity: 0.06, ease: "none" }, 0)
        .to("[data-hero-meta]", { y: -46, opacity: 0, ease: "none" }, 0);
      tl.progress(0);
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="top" ref={root} className="relative z-10">
      <div data-hero-stage className="relative lg:h-[190vh]">
        <div className="sticky top-0 flex min-h-[100svh] flex-col overflow-hidden lg:h-screen">
          <div data-hero-rule className="mx-auto mt-[74px] hidden h-px w-[92%] bg-gradient-to-r from-transparent via-ink/15 to-transparent lg:block" />

          <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-8 sm:px-8 lg:py-0">
            <div className="relative flex flex-col-reverse gap-2 lg:block lg:gap-0">
              <div className="relative z-[1] mt-6 w-full lg:absolute lg:top-1/2 lg:-right-[3%] lg:mt-0 lg:w-[58%] lg:-translate-y-[54%]">
                <DeviceShowcase />
                <div className="pointer-events-none absolute -bottom-4 -left-2 hidden lg:block xl:-left-12">
                  <RotatingBadge />
                </div>
              </div>

              <div data-hero-copy className="pointer-events-none relative z-[2]">
                <div data-hero-fade className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="eyebrow flex items-center gap-2 text-ink/55">
                    <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.mint }} />
                    Independent digital experience studio
                  </span>
                  <span className="hidden h-3 w-px bg-ink/15 sm:block" />
                  <span className="eyebrow text-ink/40">Est. 2016 · Lisbon / Berlin / Remote</span>
                </div>

                <h1 className="display text-[clamp(2.85rem,11.3vw,10.6rem)] [text-shadow:0_0_48px_rgba(255,255,255,0.92),0_0_10px_rgba(255,255,255,0.8)]">
                  <SplitLines
                    as="span"
                    from="load"
                    stagger={0.13}
                    lines={["WE BUILD", "DIGITAL", "EXPERIENCES."]}
                    className="block"
                    lineClassName="pb-[0.02em]"
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
                        line
                      )
                    }
                  />
                </h1>

                <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
                  <p data-hero-fade className="pointer-events-auto max-w-[38ch] text-[15px] leading-[1.62] text-ink/65 sm:max-w-[44ch] sm:text-[16.5px]">
                    Design, engineering and motion from one roof — building websites, products and
                    interactive worlds for brands that refuse to be forgettable.
                  </p>

                  <div data-hero-fade className="pointer-events-auto flex flex-wrap items-center gap-3">
                    <a
                      ref={ctaRef}
                      href="#contact"
                      data-cursor="magnet"
                      className="group relative overflow-hidden rounded-full px-7 py-4 font-mono text-[11px] tracking-[0.18em] text-paper uppercase"
                      style={{ background: BRAND.ink }}
                    >
                      <span
                        className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                        style={{ background: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.ember} 60%, ${BRAND.mint})` }}
                      />
                      <span className="relative flex items-center gap-2">
                        Let&apos;s Build Something
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                          <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                        </svg>
                      </span>
                    </a>

                    <a
                      ref={secondRef}
                      href="#work"
                      data-cursor="view"
                      data-cursor-label="VIEW"
                      className="group flex items-center gap-3 rounded-full border border-ink/15 bg-paper/70 px-6 py-4 font-mono text-[11px] tracking-[0.18em] text-ink/70 uppercase backdrop-blur-sm transition-colors duration-500 hover:border-ink/40 hover:text-ink"
                    >
                      Selected work
                      <span className="relative block h-1.5 w-1.5 rounded-full" style={{ background: BRAND.ember }} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-hero-meta className="relative z-[3] mx-auto w-full max-w-[1440px] px-5 pb-6 sm:px-8">
            <div className="flex items-end justify-between gap-6 border-t border-ink/10 pt-4">
              <div className="flex items-center gap-3">
                <span className="eyebrow text-ink/45">Scroll to explore</span>
                <span className="flex h-4 items-end gap-[3px]">
                  {[0, 1, 2, 3].map((i) => (
                    <i
                      key={i}
                      className="block w-[2px] origin-bottom rounded-full"
                      style={{
                        height: "100%",
                        background: BRAND.ink,
                        opacity: 0.3 + i * 0.16,
                        animation: reduce ? undefined : `kroma-bar 1.5s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </span>
              </div>

              <div className="hidden gap-10 md:flex" data-hero-chip>
                {[
                  ["214", "Products shipped"],
                  ["31", "Industry awards"],
                  ["96", "Avg. client score"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="display text-[24px] leading-none">{n}</div>
                    <div className="eyebrow mt-1 text-ink/40">{l}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a href="#contact" data-cursor="link" className="pointer-events-auto eyebrow text-ink/50 transition-colors hover:text-ink">Instagram</a>
                <a href="#contact" data-cursor="link" className="pointer-events-auto eyebrow text-ink/50 transition-colors hover:text-ink">LinkedIn</a>
                <span className="eyebrow hidden text-ink/30 sm:block">Awards 2024–25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
