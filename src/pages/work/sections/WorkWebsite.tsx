"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type SiteProject = {
  /** Used for the image alt text and link label. */
  name: string;
  url: string;
  accent: string;
  /** Full-page website screenshot (e.g. "/work/website-01.jpg" in /public). Until set, a mock page is shown. */
  image?: string;
  href: string;
};

/** PLACEHOLDER projects — add each site's screenshot as `image` and its link as `href`. */
const PROJECTS: SiteProject[] = [
  { name: "Real estate website", url: "client-one.com", accent: BRAND.cobalt, href: "#" },
  { name: "Clinic website", url: "client-two.com", accent: BRAND.mint, href: "#" },
  { name: "Admissions website", url: "client-three.com", accent: BRAND.ember, href: "#" },
  { name: "Restaurant website", url: "client-four.com", accent: BRAND.lime, href: "#" },
  { name: "Product website", url: "client-five.com", accent: BRAND.cobalt, href: "#" },
];

/** PLACEHOLDER figures — confirm before launch. */
const STATS = [
  { value: "120+", label: "Websites delivered" },
  { value: "15+", label: "Industries served" },
];

const OFFERS = ["Business websites", "Landing pages", "CMS & blogs", "SEO-ready builds"];

/** A long, believable mock web page used as the scrolling "screenshot" inside each browser frame. */
function MockSite({ accent }: { accent: string }) {
  const tint = `${accent}22`;
  const dark = accent === BRAND.mint || accent === BRAND.lime ? BRAND.ink : BRAND.paper;
  return (
    <div className="w-full bg-paper">
      <div className="flex items-center justify-between px-[6%] py-[3.5%]">
        <span className="h-3 w-16 rounded-full" style={{ background: BRAND.ink }} />
        <span className="flex gap-2">{[0, 1, 2, 3].map((i) => <span key={i} className="h-2 w-8 rounded-full bg-ink/15" />)}</span>
        <span className="h-6 w-16 rounded-full" style={{ background: accent }} />
      </div>
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-[5%] px-[6%] py-[6%]" style={{ background: tint }}>
        <div className="space-y-2.5 pt-2">
          <span className="block h-2 w-20 rounded-full" style={{ background: accent }} />
          <span className="block h-5 w-[92%] rounded-md bg-ink/85" />
          <span className="block h-5 w-[70%] rounded-md bg-ink/85" />
          <span className="block h-2 w-[86%] rounded-full bg-ink/20" />
          <span className="block h-2 w-[64%] rounded-full bg-ink/20" />
          <span className="flex gap-2 pt-2"><span className="h-7 w-20 rounded-full" style={{ background: accent }} /><span className="h-7 w-20 rounded-full border border-ink/20" /></span>
        </div>
        <div className="aspect-[4/3.4] rounded-xl" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}66)` }}>
          <div className="m-[10%] h-[40%] rounded-lg bg-paper/40" />
        </div>
      </div>
      <div className="flex items-center justify-between px-[8%] py-[5%]">{[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-2.5 w-12 rounded-full bg-ink/12" />)}</div>
      <div className="grid grid-cols-3 gap-[3%] px-[6%] pb-[7%]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2 rounded-xl border border-ink/8 p-3">
            <span className="block h-7 w-7 rounded-lg" style={{ background: i === 1 ? accent : tint }} />
            <span className="block h-2.5 w-[80%] rounded-full bg-ink/70" />
            <span className="block h-1.5 w-full rounded-full bg-ink/15" />
            <span className="block h-1.5 w-[70%] rounded-full bg-ink/15" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 items-center gap-[6%] bg-ink/[0.03] px-[6%] py-[7%]">
        <div className="aspect-[4/3] rounded-xl" style={{ background: `${accent}55` }} />
        <div className="space-y-2.5">
          <span className="block h-4 w-[85%] rounded-md bg-ink/80" />
          <span className="block h-2 w-full rounded-full bg-ink/15" />
          <span className="block h-2 w-[90%] rounded-full bg-ink/15" />
          <span className="block h-2 w-[70%] rounded-full bg-ink/15" />
          <span className="block h-6 w-24 rounded-full" style={{ background: accent }} />
        </div>
      </div>
      <div className="px-[10%] py-[8%] text-center">
        <span className="mx-auto block h-3 w-[80%] rounded-full bg-ink/60" />
        <span className="mx-auto mt-2 block h-3 w-[60%] rounded-full bg-ink/60" />
        <span className="mx-auto mt-4 block h-6 w-6 rounded-full" style={{ background: accent }} />
      </div>
      <div className="mx-[6%] mb-[6%] flex items-center justify-between rounded-2xl px-[6%] py-[6%]" style={{ background: accent }}>
        <span className="h-4 w-[45%] rounded-md" style={{ background: dark, opacity: 0.9 }} />
        <span className="h-8 w-24 rounded-full bg-paper" />
      </div>
      <div className="grid grid-cols-4 gap-4 px-[6%] pb-[8%] pt-[2%]">{[0, 1, 2, 3].map((i) => <span key={i} className="space-y-1.5"><span className="block h-2 w-12 rounded-full bg-ink/50" /><span className="block h-1.5 w-16 rounded-full bg-ink/15" /><span className="block h-1.5 w-10 rounded-full bg-ink/15" /></span>)}</div>
    </div>
  );
}

/** Website Development work: a pinned, horizontally scrolling gallery of browser-framed projects. */
export default function WorkWebsite() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>("[data-wg-slide]", element);

      if (!reduce) {
        gsap.fromTo("[data-wg-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.12, scrollTrigger: { trigger: element, start: "top 85%", end: "top 45%", scrub: 0.7 } });
      }

      const mm = gsap.matchMedia();

      // Laptop+: pin the gallery and scroll it sideways.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const viewport = element.querySelector<HTMLElement>("[data-wg-viewport]");
        const track = element.querySelector<HTMLElement>("[data-wg-track]");
        if (!viewport || !track) return;
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        // Scroll progress at which each demo sits centred on screen (plus the very end for the closing card).
        const stops = () => {
          const d = distance() || 1;
          const centred = slides.map((slide) => (slide.offsetLeft + slide.offsetWidth / 2 - viewport.clientWidth / 2) / d);
          return [0, ...centred, 1].map((p) => Math.min(1, Math.max(0, p)));
        };

        const scroll = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-wg-pin]",
            start: "top top",
            // A generous scroll length so every demo gets time on screen.
            end: () => `+=${distance() * 1.25 + window.innerHeight * 0.3}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            // Settle on the nearest demo so each one rests fully in view, the last one included.
            snap: {
              snapTo: (value: number) => stops().reduce((best, p) => (Math.abs(p - value) < Math.abs(best - value) ? p : best), 0),
              duration: { min: 0.25, max: 0.7 },
              delay: 0.12,
              ease: "power2.inOut",
            },
          },
        });
        scroll.to(track, { x: () => -distance() }, 0);

        slides.forEach((slide) => {
          // Each demo comes into full focus as it reaches the centre, and its site "scrolls" while it passes.
          gsap.fromTo(slide, { opacity: 0.6, scale: 0.95 }, { opacity: 1, scale: 1, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: scroll, start: "left 100%", end: "center 55%", scrub: true } });
          gsap.fromTo(slide.querySelector("[data-wg-page]"), { y: 0 }, { y: -120, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: scroll, start: "left 90%", end: "right 10%", scrub: true } });
        });
      });

      // Phones/tablets: native swipe gallery with a scroll-scrubbed reveal.
      mm.add("(max-width: 1023px)", () => {
        if (reduce) return;
        gsap.fromTo(slides, { opacity: 0, x: 50 }, { opacity: 1, x: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: "[data-wg-viewport]", start: "top 90%", end: "top 55%", scrub: 0.65 } });
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="website" className="relative z-10 scroll-mt-24">
      <div data-wg-pin className="relative flex flex-col justify-center overflow-hidden py-[12vh] lg:min-h-screen lg:pb-[2.5vh] lg:pt-[max(5.5rem,9vh)]">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
          <div data-wg-head className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.cobalt }} />01 — Website Development</span>
              <h2 className="display mt-5 text-h2 leading-[0.9] lg:text-[clamp(2.6rem,4.4vw,4.6rem)]">
                SITES THAT<br /><span style={{ color: BRAND.cobalt }}>SELL THE STORY.</span>
              </h2>
            </div>
            <div className="max-w-[42ch]">
              <p className="text-[14px] leading-[1.65] text-ink/60">
                Fast, search-friendly websites designed around what your visitors need to do next:
                book, enquire, buy or simply trust you more.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
                {OFFERS.map((offer) => <span key={offer} className="rounded-full border border-ink/12 bg-paper/70 px-3 py-1.5 text-[11.5px] text-ink/70">{offer}</span>)}
              </div>
              <div className="mt-5 flex gap-8 border-t border-ink/12 pt-4">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-none" style={{ color: BRAND.cobalt }}>{stat.value}</div>
                    <div className="mt-1.5 text-mono-9 tracking-[0.16em] text-ink/45 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div data-wg-viewport className="relative mt-10 overflow-x-auto lg:!mt-7 overscroll-x-contain [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          <div data-wg-track className="flex w-max snap-x snap-mandatory items-stretch gap-5 px-5 pb-4 pt-2 sm:px-8 lg:snap-none lg:gap-10 lg:px-[max(2rem,calc((100vw-1440px)/2+2rem))]">
            {PROJECTS.map((project) => (
              <a
                key={project.url}
                href={project.href}
                data-wg-slide
                data-cursor="view"
                aria-label={`View ${project.name}`}
                className="group relative block w-[86vw] shrink-0 snap-start sm:w-[70vw] lg:w-auto"
              >
                <span aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100" style={{ background: `${project.accent}2e` }} />
                <div className="overflow-hidden rounded-[22px] border border-ink/12 bg-paper shadow-[0_40px_80px_-50px_rgba(14,15,20,0.7)] transition-[translate,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:shadow-[0_50px_90px_-50px_rgba(14,15,20,0.8)]">
                  <div className="flex items-center gap-3 border-b border-ink/10 bg-ink/[0.03] px-4 py-3">
                    <span className="flex gap-1.5">{[BRAND.ember, BRAND.lime, BRAND.mint].map((c) => <i key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}</span>
                    <span className="mx-auto flex max-w-[55%] flex-1 items-center justify-center gap-2 rounded-full bg-paper px-3 py-1 text-[10.5px] text-ink/50">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
                      {project.url}
                    </span>
                  </div>
                  {/* Preview: 16:10 window sized from the screen height on laptops so the whole card stays in view */}
                  <div style={{ containerType: "size" }} className="relative aspect-[16/10] w-full overflow-hidden lg:h-[var(--ph)] lg:w-[calc(var(--ph)*1.6)] [--ph:clamp(220px,min(calc(100svh_-_400px),40vw),600px)]">
                    <div data-wg-page className="absolute inset-x-0 top-0">
                      <div className="transition-[translate] duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:duration-[5000ms] group-hover:[translate:0_min(0px,calc(-100%+100cqh))]">
                        {project.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={project.image} alt={`${project.name} preview`} className="block w-full" />
                        ) : (
                          <MockSite accent={project.accent} />
                        )}
                      </div>
                    </div>
                    <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1.5 text-mono-9 tracking-[0.16em] text-paper uppercase transition-opacity duration-500 group-hover:opacity-0">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
                      Hover to scroll
                    </span>
                  </div>
                </div>
              </a>
            ))}

            {/* End cap */}
            <div className="flex w-[min(70vw,300px)] shrink-0 snap-start flex-col justify-center self-stretch rounded-[22px] p-7 text-paper lg:w-[300px]" style={{ background: BRAND.ink }}>
              <span className="text-mono-9 tracking-[0.18em] uppercase" style={{ color: BRAND.lime }}>Your website next</span>
              <p className="display mt-4 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[0.95]">Let&apos;s build a site that sells your story.</p>
              <a href="/contact" className="mt-7 inline-flex items-center gap-2 self-start rounded-full px-5 py-3 text-mono-10-5 tracking-[0.18em] text-ink uppercase transition-transform duration-500 hover:-translate-y-0.5" style={{ background: BRAND.lime }}>
                Start a website <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 w-full max-w-[1440px] px-5 sm:px-8 lg:mt-3">
          <div className="flex items-center gap-3 border-t border-ink/12 pt-4 text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.cobalt }} /> Website Development
            <span className="ml-auto hidden lg:inline">Scroll to browse the work →</span>
            <span className="ml-auto lg:hidden">Swipe →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
