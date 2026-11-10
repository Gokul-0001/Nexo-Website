"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";
import { useMagnetic, usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function StudioIndex() {
  return (
    <div data-about-index className="relative mx-auto w-full max-w-[530px] will-change-transform">
      <div className="absolute -left-[7%] -top-[7%] h-[94%] w-[94%] rounded-[34px] border border-ink/10" />
      <div className="relative overflow-hidden rounded-[28px] border border-ink/12 bg-paper/85 p-5 shadow-[0_34px_80px_-42px_rgba(14,15,20,0.36)] backdrop-blur-md sm:p-7">
        <div className="anim-drift pointer-events-none absolute -right-[30%] -top-[40%] h-[65%] w-[65%] rounded-full blur-[72px]" style={{ background: `radial-gradient(circle, ${BRAND.cobalt}40, transparent 70%)` }} />
        <div className="anim-drift pointer-events-none absolute -bottom-[38%] -left-[26%] h-[60%] w-[60%] rounded-full blur-[78px]" style={{ background: `radial-gradient(circle, ${BRAND.mint}35, transparent 70%)`, animationDelay: "-8s" }} />

        <div className="relative flex items-center justify-between border-b border-ink/10 pb-4">
          <span className="text-mono-9 tracking-[0.2em] text-ink/40 uppercase">Nexo / Studio index</span>
          <span className="flex items-center gap-2 text-mono-9 tracking-[0.16em] text-ink/45 uppercase"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />Independent</span>
        </div>

        <div className="relative mt-7 grid grid-cols-[1fr_auto] gap-5 border-b border-ink/10 pb-7">
          <div><span className="eyebrow text-ink/40">Nexo Technologies</span><div className="display mt-2 text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.78]">2016<br /><span style={{ color: BRAND.cobalt }}>NOW.</span></div></div>
          <div className="flex flex-col items-end justify-end text-right"><span className="text-mono-9 text-ink/40 uppercase">Built from</span><span className="mt-1 text-mono-9 text-ink/65 uppercase">Lisbon / Berlin</span><span className="text-mono-9 text-ink/65 uppercase">Working worldwide</span></div>
        </div>

        <div className="relative mt-6 space-y-2">
          {[
            ["Strategy", "Find the useful problem.", BRAND.cobalt],
            ["Design", "Make the path obvious.", BRAND.mint],
            ["Technology", "Build what lasts.", BRAND.ember],
          ].map(([title, note, color]) => (
            <div key={title} data-about-row className="group flex items-center gap-4 rounded-[14px] border border-ink/10 bg-paper/60 px-4 py-3.5 transition-transform duration-500 hover:translate-x-2">
              <span className="grid h-8 w-8 place-items-center rounded-full" style={{ background: `${color}1f` }}><i className="h-2 w-2 rounded-full" style={{ background: color }} /></span>
              <span className="flex-1"><strong className="display block text-[1.2rem] leading-none">{title}</strong><span className="mt-1 block text-[11.5px] text-ink/50">{note}</span></span>
              <span className="text-mono-9 text-ink/30">↗</span>
            </div>
          ))}
        </div>

        <div className="relative mt-7 flex items-center justify-between border-t border-dashed border-ink/15 pt-4"><span className="text-mono-9 tracking-[0.18em] text-ink/40 uppercase">Small team · Senior hands</span><span className="display text-[1.35rem]" style={{ color: BRAND.ember }}>NEXO</span></div>
      </div>
    </div>
  );
}

/** A unique, scroll-driven About header for Nexo Technologies & Services. */
export default function AboutHero() {
  const root = useRef<HTMLElement | null>(null);
  const copy = useRef<HTMLDivElement | null>(null);
  const cta = useMagnetic<HTMLAnchorElement>(0.3);
  const secondary = useMagnetic<HTMLAnchorElement>(0.22);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return;
    const element = root.current;
    if (!element) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-about-fade]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.05, ease: "expo.out", stagger: 0.08, delay: 0.18 });
      gsap.fromTo("[data-about-index]", { opacity: 0, y: 40, rotate: 3 }, { opacity: 1, y: 0, rotate: 0, duration: 1.25, ease: "expo.out", delay: 0.28 });
      gsap.fromTo("[data-about-row]", { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.7, ease: "expo.out", stagger: 0.09, delay: 0.65 });

      const timeline = gsap.timeline({ scrollTrigger: { trigger: element, start: "top top", end: "bottom top", scrub: 0.7 } });
      timeline
        .to(copy.current, { yPercent: -6, opacity: 0, ease: "none" }, 0)
        .to("[data-about-index]", { yPercent: 5, xPercent: 0, rotate: 0, scale: 1, opacity: 0, ease: "none" }, 0);
    }, element);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={root} className="relative isolate z-10 min-h-[100svh]">
      <div className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0"><div className="anim-drift absolute -left-[13vw] top-[5vh] h-[46vh] w-[46vh] rounded-full blur-[100px]" style={{ background: `radial-gradient(circle, ${BRAND.cobalt}22, transparent 70%)` }} /><div className="anim-drift absolute right-[-12vw] top-[24vh] h-[42vh] w-[42vh] rounded-full blur-[105px]" style={{ background: `radial-gradient(circle, ${BRAND.mint}28, transparent 70%)`, animationDelay: "-9s" }} /><div className="grain absolute inset-0 opacity-[0.09] mix-blend-multiply" /></div>

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 items-center px-5 py-28 sm:px-8 lg:py-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div ref={copy}>
              <div data-about-fade className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2"><span className="eyebrow flex items-center gap-2 text-ink/55"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />About Nexo Technologies & Services</span><span className="hidden h-3 w-px bg-ink/15 sm:block" /><span className="eyebrow text-ink/40">Strategy · Design · Technology</span></div>
              <h1 className="display text-h1 [text-shadow:0_0_48px_rgba(255,255,255,0.9)]"><SplitLines as="span" from="load" stagger={0.13} lines={["WE BUILD", "WHAT MOVES", "FORWARD."]} className="block" lineClassName="pb-[0.02em]" render={(line, index) => index === 1 ? <span className="block bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, ${BRAND.mint} 30%, ${BRAND.ink} 54%, ${BRAND.ember} 74%, ${BRAND.cobalt})`, backgroundSize: "300% 100%", animation: "kroma-gradient-pan 11s linear infinite" }}>{line}</span> : line} /></h1>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-6"><p data-about-fade className="max-w-[43ch] text-[14px] leading-[1.65] text-ink/65 sm:text-[15.5px]">Nexo is an independent team for organisations that need more than a good-looking launch. We turn ambitious ideas into clear, useful digital work.</p><div data-about-fade className="flex flex-wrap items-center gap-3"><a ref={cta} href="/work" data-cursor="magnet" className="group relative overflow-hidden rounded-full px-7 py-4 text-mono-10-5 tracking-[0.18em] text-paper uppercase" style={{ background: BRAND.ink }}><span className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" style={{ background: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.ember} 60%, ${BRAND.mint})` }} /><span className="relative flex items-center gap-2">See our work <span>→</span></span></a><a ref={secondary} href="/contact" data-cursor="link" className="flex items-center gap-3 rounded-full border border-ink/15 bg-paper/70 px-6 py-4 text-mono-10-5 tracking-[0.18em] text-ink/70 uppercase backdrop-blur-sm transition-colors duration-500 hover:border-ink/40 hover:text-ink">Start a conversation <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.ember }} /></a></div></div>
            </div>
            <div data-about-fade><StudioIndex /></div>
          </div>
        </div>

        <div data-about-fade className="relative mx-auto w-full max-w-[1440px] px-5 pb-6 sm:px-8"><div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-4"><span className="eyebrow text-ink/45">Independent by design</span><div className="hidden gap-10 md:flex">{[["9", "Years in practice"], ["11", "Senior specialists"], ["6 / yr", "Engagement cap"]].map(([value, label]) => <div key={label}><div className="display text-[20.5px] leading-none">{value}</div><div className="eyebrow mt-1 text-ink/40">{label}</div></div>)}</div><span className="eyebrow text-ink/45">Lisbon · Berlin · Worldwide</span></div></div>
      </div>
    </section>
  );
}
