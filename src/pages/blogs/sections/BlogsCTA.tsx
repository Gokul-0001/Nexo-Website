"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { useMagnetic } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** What a reader might want help with — each opens the contact page. PLACEHOLDER links. */
const QUESTIONS = [
  { label: "My website", color: BRAND.cobalt, href: "/contact" },
  { label: "My online store", color: BRAND.ember, href: "/contact" },
  { label: "An app idea", color: BRAND.mint, href: "/contact" },
  { label: "Ads & marketing", color: BRAND.lime, href: "/contact" },
  { label: "Automating my work", color: BRAND.cobalt, href: "/contact" },
];

const PROMISES = ["Free to read, no sign-up", "A new guide every week", "Written from real client work", "Answers within one working day"];

/**
 * Blogs — final close. Same recipe as the Home / About / Contact / Work CTAs (dark panel, ambient
 * blobs, gradient headline, lime pill + email link, bottom strip) with blog-specific content.
 */
export default function BlogsCTA() {
  const root = useRef<HTMLElement | null>(null);
  const btn = useMagnetic<HTMLAnchorElement>(0.32);
  const secondary = useMagnetic<HTMLAnchorElement>(0.22);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const scrub = { trigger: element, scrub: 0.65 };
      gsap.fromTo("[data-cta-panel]", { scale: 0.93, borderRadius: 72 }, { scale: 1, borderRadius: 42, ease: "none", scrollTrigger: { ...scrub, start: "top 95%", end: "top 35%" } });
      gsap.fromTo("[data-cta-line]", { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, ease: "none", stagger: 0.12, scrollTrigger: { ...scrub, start: "top 75%", end: "top 25%" } });
      gsap.fromTo("[data-cta-fade]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none", stagger: 0.1, scrollTrigger: { ...scrub, start: "top 55%", end: "top 5%" } });
      gsap.fromTo("[data-cta-chip]", { opacity: 0, y: 24, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, ease: "none", stagger: 0.06, scrollTrigger: { ...scrub, start: "top 50%", end: "top 0%" } });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 px-3 pt-[2vh] pb-[10vh] sm:px-6 sm:pb-[14vh]">
      <div
        data-cta-panel
        data-cursor="none"
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[30px] px-5 py-[10vh] sm:rounded-[42px] sm:px-10 sm:py-[12vh]"
        style={{ background: BRAND.ink }}
      >
        <div className="anim-drift absolute -top-[38%] -left-[14%] h-[80%] w-[64%] rounded-full blur-[80px]" style={{ background: `radial-gradient(circle, ${BRAND.cobalt}, transparent 66%)`, opacity: 0.85 }} />
        <div className="anim-drift absolute -right-[16%] -bottom-[34%] h-[76%] w-[58%] rounded-full blur-[85px]" style={{ background: `radial-gradient(circle, ${BRAND.ember}, transparent 64%)`, opacity: 0.6, animationDelay: "-8s" }} />
        <div className="grain absolute inset-0 opacity-[0.22] mix-blend-overlay" />

        <div data-cta-fade className="relative mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 text-mono-9 text-paper/55 uppercase">
          <span className="flex items-center gap-2">
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />
            Still have a question?
          </span>
          <span className="max-sm:hidden">The Nexo Journal · New edition every week</span>
        </div>

        <div className="relative mx-auto mt-10 max-w-[1080px] text-center">
          <h2 className="display text-h2-md leading-[0.92]">
            <span className="block overflow-hidden"><span data-cta-line className="block text-paper">GOT A QUESTION</span></span>
            <span className="block overflow-hidden">
              <span
                data-cta-line
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(96deg, ${BRAND.cobalt}, ${BRAND.mint} 28%, ${BRAND.paper} 50%, ${BRAND.ember} 72%, ${BRAND.cobalt})`,
                  backgroundSize: "300% 100%",
                  animation: "kroma-gradient-pan 12s linear infinite",
                }}
              >
                WE HAVEN&apos;T
              </span>
            </span>
            <span className="block overflow-hidden"><span data-cta-line className="block" style={{ color: BRAND.lime }}>WRITTEN ABOUT?</span></span>
          </h2>
        </div>

        <p data-cta-fade className="relative mx-auto mt-8 max-w-[54ch] text-center text-[14px] leading-[1.66] text-paper/70 sm:text-[15.5px]">
          Tell us what you&apos;re stuck on with your website, store, app, marketing or automation. A founder
          replies within one working day with a straight answer, and it might become our next guide.
        </p>

        {/* What is it about? */}
        <div className="relative mx-auto mt-9 max-w-[820px] text-center">
          <span data-cta-fade className="block text-mono-9 tracking-[0.18em] text-paper/45 uppercase">My question is about</span>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {QUESTIONS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-cta-chip
                className="flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] px-4 py-2.5 text-[13px] text-paper/80 transition-[background-color,border-color,color] duration-500 hover:border-transparent"
                onMouseEnter={(event) => { event.currentTarget.style.background = item.color; event.currentTarget.style.color = item.color === BRAND.cobalt || item.color === BRAND.ember ? BRAND.paper : BRAND.ink; }}
                onMouseLeave={(event) => { event.currentTarget.style.background = ""; event.currentTarget.style.color = ""; }}
              >
                <i className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div data-cta-fade className="relative mx-auto mt-10 flex max-w-[640px] flex-wrap items-center justify-center gap-4">
          <a
            ref={btn}
            href="/contact"
            data-cursor="magnet"
            className="group/btn relative overflow-hidden rounded-full px-7 py-4 text-mono-10-5 tracking-[0.2em] text-ink uppercase"
            style={{ background: BRAND.lime }}
          >
            <span className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-y-0" style={{ background: `linear-gradient(100deg, ${BRAND.paper}, ${BRAND.lime})` }} />
            <span className="relative flex items-center gap-3">
              Ask us anything
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

        <div data-cta-fade className="relative mx-auto mt-14 max-w-[920px] border-t border-paper/12 pt-5">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-caption text-paper/60">
            <span className="text-mono-9 tracking-[0.18em] text-paper/45 uppercase">Every reader gets</span>
            {PROMISES.map((item) => (
              <span key={item} className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke={BRAND.lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 8.5 6.5 12 13 4.5" /></svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
