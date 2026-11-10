"use client";

import { BRAND } from "@/lib/brand";
import { useMagnetic } from "@/lib/motion";
import { Reveal } from "@/components/animations/TextReveal";

/**
 * Services — final CTA. Same dark-panel recipe as Home / Contact.
 */
export default function ServicesCTA() {
  const btn = useMagnetic<HTMLAnchorElement>(0.32);
  const secondary = useMagnetic<HTMLAnchorElement>(0.22);

  return (
    <section className="relative z-10 px-3 pt-[1vh] pb-[9vh] sm:px-6 sm:pb-[13vh]">
      <div
        data-cursor="none"
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[30px] px-5 py-[9vh] sm:rounded-[42px] sm:px-10 sm:py-[12vh]"
        style={{ background: BRAND.ink }}
      >
        <div
          className="anim-drift absolute -top-[36%] -left-[16%] h-[86%] w-[70%] rounded-full blur-[70px]"
          style={{ background: `radial-gradient(circle, ${BRAND.cobalt}, transparent 66%)`, opacity: 0.9 }}
        />
        <div
          className="anim-drift absolute -right-[14%] -bottom-[30%] h-[80%] w-[58%] rounded-full blur-[80px]"
          style={{
            background: `radial-gradient(circle, ${BRAND.ember}, transparent 64%)`,
            opacity: 0.75,
            animationDelay: "-8s",
          }}
        />
        <div
          className="anim-drift absolute top-[26%] right-[34%] h-[38%] w-[26%] rounded-full blur-[60px]"
          style={{
            background: `radial-gradient(circle, ${BRAND.mint}, transparent 62%)`,
            opacity: 0.7,
            animationDelay: "-14s",
          }}
        />
        <div className="grain absolute inset-0 opacity-[0.22] mix-blend-overlay" />

        <div className="relative grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <span className="eyebrow mb-6 flex items-center gap-2 text-lime">
              <i className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: BRAND.lime }} />
              Two slots left · Q3 2026
            </span>

            <Reveal>
              <h2 className="display text-h2 leading-[0.92]">
                <span className="block text-paper">PICK A DISCIPLINE,</span>
                <span className="block" style={{ color: BRAND.lime }}>
                  OR THE WHOLE STACK.
                </span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(96deg, ${BRAND.mint}, ${BRAND.paper} 30%, ${BRAND.ember} 50%, ${BRAND.mint})`,
                    backgroundSize: "300% 100%",
                    animation: "kroma-gradient-pan 12s linear infinite",
                  }}
                >
                  LET&apos;S TALK.
                </span>
              </h2>
            </Reveal>

            <p className="mt-8 max-w-[46ch] text-[14.5px] leading-[1.66] text-paper/70">
              Send a brief, a rough budget and a deadline. You will hear back from a founder within
              24 hours — with a point of view, not a brochure.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                ref={btn}
                href="/contact"
                data-cursor="magnet"
                className="group relative overflow-hidden rounded-full px-8 py-5 text-mono-10-5 tracking-[0.2em] text-ink uppercase"
                style={{ background: BRAND.lime }}
              >
                <span
                  className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                  style={{ background: `linear-gradient(100deg, ${BRAND.paper}, ${BRAND.lime})` }}
                />
                <span className="relative flex items-center gap-3">
                  Start a project
                  <svg width="16" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                    <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
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
          </div>
        </div>
      </div>
    </section>
  );
}
