"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type Stage = {
  phase: string;
  tag: string;
  title: string;
  body: string;
  deliverable: string;
  color: string;
  icon: string;
};

/** From first idea to lasting impact — the path every Nexo project follows, whatever the service. */
const STAGES: Stage[] = [
  { phase: "Discover", tag: "Explore", title: "Ideation & research", body: "We dig into your business, audience and competitors to find the opportunity worth pursuing.", deliverable: "Opportunity map", color: BRAND.cobalt, icon: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" },
  { phase: "Define", tag: "Plan", title: "Strategy & planning", body: "Goals, priorities, scope and success measures agreed in writing before anything gets built.", deliverable: "Project roadmap", color: BRAND.mint, icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" },
  { phase: "Design", tag: "Create", title: "Experience & design", body: "Journeys, visuals and prototypes for sites, apps, stores and campaigns, shaped with your feedback.", deliverable: "Approved designs", color: BRAND.lime, icon: "M3 3h18v18H3zM3 9h18M9 9v12" },
  { phase: "Build", tag: "Develop", title: "Development", body: "Websites, apps, stores, automations and campaigns built by senior hands, with progress you can see.", deliverable: "Working previews", color: BRAND.ember, icon: "M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5.5l-3 13" },
  { phase: "Test", tag: "Refine", title: "Quality & testing", body: "Every device, flow and integration checked for speed, accessibility, security and reliability.", deliverable: "Launch-ready build", color: BRAND.cobalt, icon: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3ZM8.5 12l2.5 2.5 4.5-5" },
  { phase: "Launch", tag: "Release", title: "Go live", body: "A smooth, planned release with tracking, SEO and monitoring in place from the very first day.", deliverable: "Live solution", color: BRAND.ember, icon: "M3 11.5 21 3l-8.5 18-2.2-7.3L3 11.5Z" },
  { phase: "Grow", tag: "Scale", title: "Support & growth", body: "We measure results, refine and market what we launched, and keep supporting your team after go-live.", deliverable: "Ongoing support", color: BRAND.mint, icon: "M3 20h18M5 16l5-5 4 3 6-7M15 7h5v5" },
];

export default function AboutProcess() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray<HTMLElement>("[data-stage]", element);
      const counter = element.querySelector<HTMLElement>("[data-stage-count]");
      const light = (index: number) => {
        stages.forEach((stage, i) => stage.classList.toggle("is-on", i <= index));
        if (counter) counter.textContent = String(Math.max(index + 1, 1)).padStart(2, "0");
      };

      if (!reduce) {
        gsap.fromTo("[data-process-head] > *", { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, ease: "none", stagger: 0.12,
          scrollTrigger: { trigger: element, start: "top 80%", end: "top 45%", scrub: 0.7 },
        });
      }

      const mm = gsap.matchMedia();

      // Laptop+: pin the section and drive the timeline sideways with scroll.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const viewport = element.querySelector<HTMLElement>("[data-tl-viewport]");
        const track = element.querySelector<HTMLElement>("[data-tl-track]");
        if (!viewport || !track) return;
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        light(-1);

        const scroll = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-tl-pin]",
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.35}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        scroll
          .to(track, { x: () => -distance() }, 0)
          .fromTo("[data-tl-fill]", { scaleX: 0 }, { scaleX: 1 }, 0)
          .fromTo("[data-tl-marker]", { left: "0%" }, { left: "100%" }, 0);

        stages.forEach((stage, index) => {
          ScrollTrigger.create({
            trigger: stage,
            containerAnimation: scroll,
            start: "left 72%",
            onEnter: () => light(index),
            onLeaveBack: () => light(index - 1),
          });
        });

        return () => light(STAGES.length - 1);
      });

      // Phones/tablets (or reduced motion): native horizontal swipe, every stage lit.
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        light(STAGES.length - 1);
        if (reduce) return;
        gsap.fromTo("[data-stage]", { opacity: 0, x: 40 }, {
          opacity: 1, x: 0, ease: "none", stagger: 0.08,
          scrollTrigger: { trigger: "[data-tl-viewport]", start: "top 90%", end: "top 55%", scrub: 0.65 },
        });
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10">
      <div data-tl-pin className="relative flex flex-col justify-center overflow-hidden py-[14vh] lg:min-h-screen lg:pb-[5vh] lg:pt-[max(6rem,12vh)]">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
          <div data-process-head className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <span className="eyebrow flex items-center gap-2 text-ink/40"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />How we work</span>
              <h2 className="display mt-5 text-h2 leading-[0.9] lg:text-[clamp(2.6rem,4.4vw,4.8rem)]">
                FROM FIRST IDEA<br />TO{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, ${BRAND.mint} 45%, ${BRAND.ember})` }}>LAUNCH & BEYOND.</span>
              </h2>
            </div>
            <div className="max-w-[38ch]">
              <p className="text-[14px] leading-[1.65] text-ink/60">
                Seven clear stages, one senior team. Whether it is a website, an app, an online store, a
                marketing campaign or an automation, every project follows the same proven path from
                idea to impact, with progress you can see along the way.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 whitespace-nowrap text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
                <span>Web · Apps · Commerce · Marketing · Automation</span>
                <span className="hidden h-3 w-px bg-ink/15 lg:block" />
                <span className="hidden lg:inline">Stage <span data-stage-count className="tabular-nums" style={{ color: BRAND.ink }}>01</span> / {String(STAGES.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div data-tl-viewport className="relative mt-12 overflow-x-auto lg:!mt-9 overscroll-x-contain [scrollbar-width:none] lg:mt-14 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          <div data-tl-track className="relative flex w-max snap-x snap-mandatory scroll-px-5 gap-4 px-[var(--pad)] pb-4 [--cap:min(70vw,260px)] [--pad:1.25rem] sm:gap-5 sm:[--pad:2rem] lg:snap-none lg:[--cap:280px] lg:[--pad:max(2rem,calc((100vw-1440px)/2+2rem))]">
            {/* Rail */}
            <div aria-hidden className="pointer-events-none absolute top-[27px] h-[2px] rounded-full bg-ink/10" style={{ left: "calc(var(--pad) + 28px)", right: "calc(var(--pad) + var(--cap) - 28px)" }}>
              <div data-tl-fill className="absolute inset-0 origin-left rounded-full" style={{ background: `linear-gradient(90deg, ${BRAND.cobalt}, ${BRAND.mint}, ${BRAND.lime}, ${BRAND.ember})` }} />
              <div data-tl-marker className="absolute top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
                <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-40" style={{ background: BRAND.lime }} />
                <span className="relative block h-3.5 w-3.5 rounded-full ring-4 ring-paper" style={{ background: BRAND.ink, boxShadow: `0 0 18px ${BRAND.lime}` }} />
              </div>
            </div>

            {STAGES.map((stage, index) => (
              <article
                key={stage.phase}
                data-stage
                className="is-on group/stage relative flex w-[min(80vw,340px)] shrink-0 snap-start flex-col lg:w-[360px]"
                style={{ "--c": stage.color } as React.CSSProperties}
              >
                {/* Node on the rail */}
                <div className="relative z-10 flex h-14 items-center gap-3">
                  <span className="relative grid h-14 w-14 place-items-center rounded-full border border-ink/12 bg-paper shadow-[0_18px_30px_-24px_rgba(14,15,20,0.7)] transition-[border-color] duration-500 group-[.is-on]/stage:border-[var(--c)]">
                    <span className="absolute inset-1.5 scale-50 rounded-full opacity-0 transition-[scale,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-[.is-on]/stage:scale-100 group-[.is-on]/stage:opacity-100" style={{ background: `${stage.color}24` }} />
                    <svg viewBox="0 0 24 24" className="relative h-5 w-5 text-ink/35 transition-colors duration-500 group-[.is-on]/stage:text-ink" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={stage.icon} /></svg>
                  </span>
                  <span className="rounded-full border border-ink/10 bg-paper/80 px-3 py-1.5 text-mono-9 tracking-[0.16em] text-ink/50 uppercase backdrop-blur-sm">{stage.tag}</span>
                </div>

                {/* Card */}
                <div className="relative mt-6 flex flex-1 flex-col overflow-hidden rounded-[22px] border border-ink/10 bg-paper/80 p-6 opacity-45 shadow-[0_30px_60px_-44px_rgba(14,15,20,0.6)] backdrop-blur-md transition-[opacity,translate,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-3 group-[.is-on]/stage:translate-y-0 group-[.is-on]/stage:opacity-100 group-hover/stage:-translate-y-1.5 sm:p-7">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-[.is-on]/stage:scale-x-100" style={{ background: stage.color }} />
                  <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-[.is-on]/stage:opacity-100" style={{ background: `${stage.color}26` }} />
                  <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute -right-3 -top-3 h-28 w-28 rotate-[-8deg] text-ink/[0.06] transition-[rotate,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/stage:rotate-0" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d={stage.icon} /></svg>

                  <div className="relative flex items-center justify-between gap-4">
                    <span className="text-mono-9 tracking-[0.18em] text-ink/40">{String(index + 1).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-ink/10" />
                    <span className="text-mono-9 tracking-[0.16em] uppercase" style={{ color: stage.color === BRAND.lime ? BRAND.ink : stage.color }}>{stage.phase}</span>
                  </div>
                  <h3 className="display relative mt-5 text-[clamp(1.6rem,2.3vw,2.2rem)] leading-[0.92]">{stage.title}</h3>
                  <p className="relative mb-6 mt-4 text-[13px] leading-[1.68] text-ink/60">{stage.body}</p>
                  <div className="relative mt-auto flex items-center gap-2.5 border-t border-dashed border-ink/15 pt-4">
                    <i className="h-2 w-2 shrink-0 rounded-full" style={{ background: stage.color }} />
                    <span className="text-mono-9 tracking-[0.16em] text-ink/40 uppercase">Deliverable</span>
                    <span className="ml-auto text-right text-[12.5px] font-medium text-ink">{stage.deliverable}</span>
                  </div>
                </div>
              </article>
            ))}

            {/* End cap */}
            <div className="flex w-[var(--cap)] shrink-0 snap-start flex-col justify-start">
              <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full" style={{ background: BRAND.ink }}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={BRAND.lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
              </div>
              <div className="mt-6 rounded-[22px] p-6 text-paper sm:p-7" style={{ background: BRAND.ink }}>
                <span className="text-mono-9 tracking-[0.18em] uppercase" style={{ color: BRAND.lime }}>Your turn</span>
                <p className="display mt-4 text-[clamp(1.5rem,2.1vw,2rem)] leading-[0.95]">Start at stage 01.</p>
                <a href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-mono-10-5 tracking-[0.18em] text-ink uppercase transition-transform duration-500 hover:-translate-y-0.5" style={{ background: BRAND.lime }}>
                  Start a project <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[1440px] px-5 sm:px-8 lg:mt-7">
          <div className="flex items-center gap-3 border-t border-ink/12 pt-5 text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} /> Clear decisions. Shared momentum.
            <span className="ml-auto hidden lg:inline">Scroll to move through the timeline →</span>
            <span className="ml-auto lg:hidden">Swipe →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
