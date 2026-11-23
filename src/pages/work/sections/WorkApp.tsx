"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type AppProject = {
  /** Used for alt text. */
  name: string;
  accent: string;
  /** Phone screenshot of the app (e.g. "/work/app-01.jpg" in /public). Until set, a mock screen is shown. */
  image?: string;
  href: string;
};

/** PLACEHOLDER apps — add each app's screenshot as `image` and its link (store listing or case study) as `href`. */
const APPS: AppProject[] = [
  { name: "Healthcare booking app", accent: BRAND.mint, href: "#" },
  { name: "Food delivery app", accent: BRAND.ember, href: "#" },
  { name: "Fintech wallet app", accent: BRAND.cobalt, href: "#" },
  { name: "Fitness app", accent: BRAND.lime, href: "#" },
  { name: "Learning app", accent: BRAND.ember, href: "#" },
  { name: "Travel booking app", accent: BRAND.mint, href: "#" },
  { name: "Real estate app", accent: BRAND.cobalt, href: "#" },
];

/** PLACEHOLDER figures — confirm before launch. */
const STATS = [
  { value: "30+", label: "Apps launched" },
  { value: "4.7★", label: "Average store rating" },
];

function MockApp({ accent, variant }: { accent: string; variant: number }) {
  const tint = `${accent}22`;
  return (
    <div className="flex h-full w-full flex-col bg-paper px-[8%] pb-[6%] pt-[14%]">
      <div className="flex items-center justify-between">
        <span className="space-y-1"><span className="block h-1.5 w-10 rounded-full bg-ink/30" /><span className="block h-2.5 w-16 rounded-full bg-ink/85" /></span>
        <span className="h-6 w-6 rounded-full" style={{ background: tint }} />
      </div>
      <div className="mt-[10%] rounded-2xl p-[10%]" style={{ background: `linear-gradient(150deg, ${accent}, ${accent}88)` }}>
        <span className="block h-2 w-[60%] rounded-full bg-paper/80" />
        <span className="mt-2 block h-4 w-[45%] rounded-md bg-paper" />
        <span className="mt-[18%] block h-5 w-[50%] rounded-full bg-paper/90" />
      </div>
      <div className="mt-[8%] flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-5 flex-1 rounded-full" style={{ background: i === variant % 3 ? BRAND.ink : "rgba(14,15,20,0.07)" }} />)}</div>
      <div className="mt-[8%] space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="h-9 w-9 shrink-0 rounded-xl" style={{ background: i === 0 ? accent : tint }} />
            <span className="flex-1 space-y-1.5"><span className="block h-2 w-[75%] rounded-full bg-ink/70" /><span className="block h-1.5 w-[50%] rounded-full bg-ink/20" /></span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-around rounded-2xl bg-ink/[0.04] py-2.5">{[0, 1, 2, 3].map((i) => <span key={i} className="h-3.5 w-3.5 rounded-md" style={{ background: i === 0 ? accent : "rgba(14,15,20,0.2)" }} />)}</div>
    </div>
  );
}

/** App Development work: phones on a 3D arc that rotates with the scroll. */
export default function WorkApp() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const phones = gsap.utils.toArray<HTMLElement>("[data-app-phone]", element);
      const last = phones.length - 1;

      if (!reduce) {
        gsap.fromTo("[data-app-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.12, scrollTrigger: { trigger: "[data-app-head]", start: "top 88%", end: "top 50%", scrub: 0.65 } });
      }

      const mm = gsap.matchMedia();

      // Laptop+: phones stand on an arc; scrolling turns it so each app comes to the centre.
      mm.add("(min-width: 1024px)", () => {
        const stage = element.querySelector<HTMLElement>("[data-app-stage]");
        if (!stage) return;
        const place = (focus: number) => {
          const width = phones[0]?.offsetWidth ?? 220;
          phones.forEach((phone, index) => {
            const p = index - focus;
            const a = Math.abs(p);
            gsap.set(phone, {
              x: p * width * 1.06,
              z: -a * 120,
              rotationY: Math.max(-60, Math.min(60, -p * 24)),
              scale: 1 - Math.min(a, 3) * 0.06,
              // Centre + two on each side stay visible to fill the width; anything further fades out.
              opacity: a > 3 ? 0 : a <= 1 ? 1 : a <= 2 ? 1 - (a - 1) * 0.2 : 0.8 - (a - 2) * 0.8,
              zIndex: 100 - Math.round(a * 10),
            });
          });
        };
        place(0);
        if (reduce) return;

        const state = { focus: 0 };
        gsap.timeline({
          scrollTrigger: {
            trigger: "[data-app-pin]",
            start: "top top",
            end: () => `+=${window.innerHeight * 0.55 * last + window.innerHeight * 0.3}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / last, duration: { min: 0.25, max: 0.7 }, delay: 0.12, ease: "power2.inOut" },
          },
        }).to(state, { focus: last, ease: "none", onUpdate: () => place(state.focus) });

        // The arc rises into place as the section arrives.
        gsap.fromTo(stage, { opacity: 0, y: 60, rotationX: 12 }, { opacity: 1, y: 0, rotationX: 0, ease: "none", scrollTrigger: { trigger: element, start: "top 85%", end: "top 30%", scrub: 0.65 } });
      });

      // Phones/tablets: a swipe row with a scrubbed reveal.
      mm.add("(max-width: 1023px)", () => {
        if (reduce) return;
        gsap.fromTo(phones, { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: "[data-app-stage]", start: "top 92%", end: "top 55%", scrub: 0.65 } });
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="app" className="relative z-10 scroll-mt-24">
      <div data-app-pin className="relative flex flex-col justify-center overflow-hidden py-[10vh] lg:min-h-screen lg:pb-[3vh] lg:pt-[max(5.5rem,9vh)]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="anim-drift absolute left-1/2 top-[60%] h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]" style={{ background: `${BRAND.mint}30` }} />
        </div>

        {/* Header */}
        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8">
          <div data-app-head className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.mint }} />03 — App Development</span>
              <h2 className="display mt-5 text-h2 leading-[0.9] lg:text-[clamp(2.6rem,4.4vw,4.6rem)]">
                APPS PEOPLE<br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, #12b89c, ${BRAND.cobalt})` }}>KEEP OPENING.</span>
              </h2>
            </div>
            <div className="max-w-[42ch]">
              <p className="text-[14px] leading-[1.65] text-ink/60">
                iOS, Android and cross-platform apps that feel effortless to use, from booking a doctor
                to paying a bill, and keep people coming back.
              </p>
              <div className="mt-5 flex gap-8 border-t border-ink/12 pt-4">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-none" style={{ color: "#12b89c" }}>{stat.value}</div>
                    <div className="mt-1.5 text-mono-9 tracking-[0.16em] text-ink/45 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phone arc */}
        <div
          data-app-stage
          className="relative mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:snap-none [scrollbar-width:none] sm:px-8 lg:mt-6 lg:block lg:h-[var(--phh)] lg:overflow-visible lg:px-0 lg:pb-0 lg:[perspective:1600px] lg:[transform-style:preserve-3d] [&::-webkit-scrollbar]:hidden [--phh:clamp(300px,calc(100svh_-_380px),560px)] [--pw:calc(var(--phh)*0.53)]"
        >
          {APPS.map((app, index) => (
            <a
              key={app.name}
              href={app.href}
              data-app-phone
              data-cursor="view"
              aria-label={`View ${app.name}`}
              className="group block w-[64vw] max-w-[280px] shrink-0 snap-center sm:w-[38vw] lg:absolute lg:left-[calc(50%_-_var(--pw)/2)] lg:top-0 lg:w-[var(--pw)] lg:max-w-none"
            >
              <div className="relative rounded-[2.4rem] p-[5%] shadow-[0_40px_80px_-40px_rgba(14,15,20,0.7)] transition-[translate] duration-500 group-hover:-translate-y-2" style={{ background: BRAND.ink }}>
                <span aria-hidden className="absolute left-1/2 top-[3.2%] z-10 h-[2.6%] w-[30%] -translate-x-1/2 rounded-full" style={{ background: BRAND.ink }} />
                <div className="relative aspect-[9/17] overflow-hidden rounded-[2rem] bg-paper">
                  {app.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={app.image} alt={`${app.name} screen`} className="h-full w-full object-cover object-top" />
                  ) : (
                    <MockApp accent={app.accent} variant={index} />
                  )}
                </div>
              </div>
              <span aria-hidden className="mx-auto mt-4 block h-3 w-[70%] rounded-full blur-md" style={{ background: `${app.accent}55` }} />
            </a>
          ))}
        </div>

        <div className="relative mx-auto mt-4 w-full max-w-[1440px] px-5 sm:px-8">
          <div className="flex items-center gap-3 border-t border-ink/12 pt-4 text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.mint }} /> App Development
            <span className="ml-auto hidden lg:inline">Scroll to turn the apps →</span>
            <span className="ml-auto lg:hidden">Swipe →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
