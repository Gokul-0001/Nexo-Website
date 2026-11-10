"use client";

import { BRAND } from "@/lib/brand";
import { useMagnetic } from "@/lib/motion";
import { Reveal } from "@/components/animations/TextReveal";

/**
 * About — final editorial close, identical recipe to Home / Contact / FinalCTA:
 *   - dark panel with brand-coloured ambient blobs
 *   - text-h2-md sized H2 + eyebrow status row
 *   - text-body paragraph
 *   - text-mono-10-5 sized pill CTA + email link
 *   - editorial address strip
 */
export default function AboutCTA() {
  const btn = useMagnetic<HTMLAnchorElement>(0.32);
  const secondary = useMagnetic<HTMLAnchorElement>(0.22);

  return (
    <section className="relative z-10 px-3 pt-[2vh] pb-[10vh] sm:px-6 sm:pb-[14vh]">
      <div
        data-cursor="none"
        className="group relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[30px] px-5 py-[10vh] sm:rounded-[42px] sm:px-10 sm:py-[12vh]"
        style={{ background: BRAND.ink }}
      >
        <div
          className="anim-drift absolute -top-[36%] -left-[16%] h-[80%] w-[68%] rounded-full blur-[80px]"
          style={{ background: `radial-gradient(circle, ${BRAND.cobalt}, transparent 66%)`, opacity: 0.85 }}
        />
        <div
          className="anim-drift absolute -right-[14%] -bottom-[30%] h-[78%] w-[58%] rounded-full blur-[80px]"
          style={{
            background: `radial-gradient(circle, ${BRAND.ember}, transparent 64%)`,
            opacity: 0.72,
            animationDelay: "-8s",
          }}
        />
        <div className="grain absolute inset-0 opacity-[0.22] mix-blend-overlay" />

        <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between text-mono-9 text-paper/55 uppercase">
          <span className="flex items-center gap-2">
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />
            Working with us
          </span>
          <span>Two slots left · Q3 2026</span>
        </div>

        <Reveal className="relative mx-auto mt-10 max-w-[1080px] text-center">
          <h2 className="display text-h2-md leading-[0.92]">
            <span className="block text-paper">IF THIS SOUNDS LIKE</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(96deg, ${BRAND.cobalt}, ${BRAND.mint} 28%, ${BRAND.paper} 50%, ${BRAND.ember} 72%, ${BRAND.cobalt})`,
                backgroundSize: "300% 100%",
                animation: "kroma-gradient-pan 12s linear infinite",
              }}
            >
              YOUR KIND OF STUDIO
            </span>
            <span className="block" style={{ color: BRAND.lime }}>
              — LET&apos;S TALK.
            </span>
          </h2>
        </Reveal>

        <Reveal className="relative mx-auto mt-8 max-w-[52ch] text-center">
          <p className="text-[14px] leading-[1.66] text-paper/70 sm:text-[15.5px]">
            We take a maximum of six engagements a year. Every brief is read by a founder and
            answered within one working day — with a point of view, not a brochure.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-10 flex max-w-[640px] flex-wrap items-center justify-center gap-4">
          <a
            ref={btn}
            href="/contact"
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
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-500 group-hover/btn:translate-x-1.5">
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

        <div className="relative mx-auto mt-14 max-w-[920px] border-t border-paper/12 pt-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-caption text-paper/55">
            <span className="text-mono-9 tracking-[0.18em] text-paper/45 uppercase">Studios</span>
            <span>R. da Boavista 102 · 1200-066 Lisboa</span>
            <span className="hidden h-3 w-px bg-paper/15 sm:block" />
            <span>Kastanienallee 23 · 10435 Berlin</span>
            <span className="hidden h-3 w-px bg-paper/15 sm:block" />
            <span className="text-mono-9 tracking-[0.18em] uppercase">
              UTC +0 · Studio live
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
