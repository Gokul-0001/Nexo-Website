"use client";

import { BRAND } from "@/lib/brand";
import { useMagnetic } from "@/lib/motion";
import { Reveal } from "@/components/animations/TextReveal";

export default function BlogsCTA() {
  const btn = useMagnetic<HTMLAnchorElement>(0.32);
  const secondary = useMagnetic<HTMLAnchorElement>(0.22);

  return (
    <section className="relative z-10 px-3 pt-[1vh] pb-[10vh] sm:px-6 sm:pb-[14vh]">
      <div
        data-cursor="none"
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[30px] px-5 py-[10vh] sm:rounded-[42px] sm:px-10 sm:py-[12vh]"
        style={{ background: BRAND.ink }}
      >
        <div
          className="anim-drift absolute -top-[36%] -left-[16%] h-[80%] w-[68%] rounded-full blur-[80px]"
          style={{ background: `radial-gradient(circle, ${BRAND.cobalt}, transparent 66%)`, opacity: 0.85 }}
        />
        <div
          className="anim-drift absolute -right-[14%] -bottom-[30%] h-[78%] w-[58%] rounded-full blur-[80px]"
          style={{ background: `radial-gradient(circle, ${BRAND.ember}, transparent 64%)`, opacity: 0.72, animationDelay: "-8s" }}
        />
        <div className="grain absolute inset-0 opacity-[0.22] mix-blend-overlay" />

        <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between text-mono-9 text-paper/55 uppercase">
          <span className="flex items-center gap-2">
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />
            02 — Stay in the loop
          </span>
          <span>New writing every Thursday</span>
        </div>

        <Reveal className="relative mx-auto mt-10 max-w-[1080px] text-center">
          <h2 className="display text-h2-md leading-[0.92]">
            <span className="block text-paper">THE NEWSLETTER</span>
            <span className="block" style={{ color: BRAND.lime }}>
              NO ROUND-ROBIN
            </span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(96deg, ${BRAND.cobalt}, ${BRAND.mint} 28%, ${BRAND.paper} 50%, ${BRAND.ember} 72%, ${BRAND.cobalt})`,
                backgroundSize: "300% 100%",
                animation: "kroma-gradient-pan 12s linear infinite",
              }}
            >
              ONE FOUNDER, ONE EMAIL.
            </span>
          </h2>
        </Reveal>

        <Reveal className="relative mx-auto mt-8 max-w-[52ch] text-center">
          <p className="text-[14px] leading-[1.66] text-paper/70 sm:text-[15.5px]">
            A single Thursday email from one of the founders. New posts, references we love and
            the occasional confession. No tracking pixels, no &quot;you might also like&quot;.
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
              Subscribe
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
      </div>
    </section>
  );
}
