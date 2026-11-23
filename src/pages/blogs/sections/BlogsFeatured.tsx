"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

/** PLACEHOLDER featured post — swap for the real story, its cover image and link. */
const FEATURED = {
  category: "Ecommerce",
  accent: BRAND.ember,
  /** Headline split into the lines it reveals on. */
  headline: ["What a Shopify store", "really costs in India"],
  summary:
    "Platform fees, apps, payment gateways, design and the hidden costs after launch, broken down line by line from forty stores we've built for Indian brands.",
  takeaways: [
    "What you really pay in year one, from ₹1.5 lakh upwards",
    "Which apps to skip until you have steady orders",
    "The three things you should never cut: speed, checkout and product pages",
  ],
  author: { name: "Priya S.", role: "Ecommerce lead, Nexo" },
  date: "18 Nov 2026",
  minutes: 6,
  tags: ["Shopify", "Pricing", "D2C"],
  /** Cover image (e.g. "/blog/shopify-cost.jpg" in /public). Until set, an illustrated cover is shown. */
  image: undefined as string | undefined,
  /** The article's page — matches its slug in src/data/articles. */
  href: "/blogs/shopify-store-cost-india",
};

/** Illustrated stand-in cover: a cost breakdown chart in the story's colour. */
function MockCover({ accent }: { accent: string }) {
  const bars = [
    { label: "Theme", h: 34 },
    { label: "Apps", h: 58 },
    { label: "Payments", h: 44 },
    { label: "Design", h: 72 },
    { label: "Launch", h: 52 },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `linear-gradient(150deg, ${accent}30, ${accent}0d 55%, ${BRAND.paper2})` }}>
      <div aria-hidden className="absolute inset-0 [background-image:linear-gradient(rgba(14,15,20,0.05)_1px,transparent_1px)] [background-size:100%_12%]" />
      <div className="absolute inset-x-[12%] bottom-[15%] top-[30%] flex items-end gap-[4%]">
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex h-full flex-1 flex-col items-center gap-2">
            <div className="relative w-full flex-1">
              <div data-ft-bar className="absolute inset-x-0 bottom-0 origin-bottom rounded-t-[10px]" style={{ height: `${bar.h + 22}%`, background: i === 3 ? accent : i % 2 ? BRAND.ink : `${accent}99` }} />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.08em] text-ink/50 uppercase sm:text-[11px]">{bar.label}</span>
          </div>
        ))}
      </div>
      <div className="absolute left-[12%] top-[13%]">
        <span className="block font-mono text-[10px] tracking-[0.18em] text-ink/45 uppercase">Year-one cost breakdown</span>
        <span className="display mt-1 block text-[clamp(1.6rem,3vw,2.6rem)] leading-none text-ink">₹1.5L+</span>
      </div>
    </div>
  );
}

/** Blogs section 01: the featured story — big cover on one side, the story on the other. */
export default function BlogsFeatured() {
  const root = useRef<HTMLElement | null>(null);
  const post = FEATURED;
  const initials = post.author.name.split(" ").map((part) => part[0]).join("");

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const scrub = (trigger: string | Element, start: string, end: string) => ({ trigger, start, end, scrub: 0.65 });
      gsap.fromTo("[data-ft-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.1, scrollTrigger: scrub("[data-ft-head]", "top 88%", "top 55%") });

      // Cover opens up from a framed crop and zooms out to the full picture…
      gsap.fromTo("[data-ft-frame]", { clipPath: "inset(10% 12% 10% 12% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none", scrollTrigger: scrub("[data-ft-frame]", "top 92%", "top 35%") });
      gsap.fromTo("[data-ft-zoom]", { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: scrub("[data-ft-frame]", "top 92%", "top 35%") });
      // …its chart grows, the badges pop on, and it drifts gently while the section passes.
      gsap.fromTo("[data-ft-bar]", { scaleY: 0 }, { scaleY: 1, ease: "none", stagger: 0.08, scrollTrigger: scrub("[data-ft-frame]", "top 70%", "top 30%") });
      gsap.fromTo("[data-ft-badge]", { opacity: 0, scale: 0.6, rotate: -12 }, { opacity: 1, scale: 1, rotate: 0, ease: "none", stagger: 0.15, scrollTrigger: scrub("[data-ft-frame]", "top 60%", "top 25%") });
      gsap.fromTo("[data-ft-drift]", { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.8 } });

      // Story side: meta, then the headline line by line, then summary, takeaways, author and link.
      gsap.fromTo("[data-ft-meta]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: scrub("[data-ft-story]", "top 88%", "top 65%") });
      gsap.fromTo("[data-ft-line]", { yPercent: 110 }, { yPercent: 0, ease: "none", stagger: 0.15, scrollTrigger: scrub("[data-ft-story]", "top 85%", "top 50%") });
      gsap.fromTo("[data-ft-copy]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none", stagger: 0.12, scrollTrigger: scrub("[data-ft-story]", "top 70%", "top 25%") });
      gsap.fromTo("[data-ft-point]", { opacity: 0, x: -24 }, { opacity: 1, x: 0, ease: "none", stagger: 0.12, scrollTrigger: scrub("[data-ft-points]", "top 90%", "top 60%") });
      gsap.fromTo("[data-ft-tick]", { scale: 0 }, { scale: 1, ease: "none", stagger: 0.12, scrollTrigger: scrub("[data-ft-points]", "top 85%", "top 55%") });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="latest" className="relative z-10 scroll-mt-24 overflow-x-clip py-[10vh] sm:py-[12vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Header */}
        <div data-ft-head className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: post.accent }} />01 — Featured story</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              THIS WEEK&apos;S<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.ember}, ${BRAND.cobalt})` }}>MUST-READ.</span>
            </h2>
          </div>
          <p className="max-w-[40ch] text-[14px] leading-[1.65] text-ink/60">
            One story each week we think every business owner should read, picked by the team and backed by real client work.
          </p>
        </div>

        {/* Feature */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          {/* Cover */}
          <a href={post.href} aria-label={`Read: ${post.headline.join(" ")}`} className="group relative block">
            <div data-ft-frame className="relative aspect-[4/3.3] overflow-hidden rounded-[28px] border border-ink/10 bg-paper-2">
              <div data-ft-drift className="absolute inset-[-6%]">
                <div data-ft-zoom className="h-full w-full transition-[scale] duration-700 group-hover:scale-[1.03]">
                  {post.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.image} alt={post.headline.join(" ")} className="h-full w-full object-cover" />
                  ) : (
                    <MockCover accent={post.accent} />
                  )}
                </div>
              </div>
            </div>
            {/* Badges on the cover */}
            <span data-ft-badge className="absolute -top-4 left-6 rounded-full px-4 py-2 text-[12px] font-semibold shadow-[0_14px_30px_-16px_rgba(14,15,20,0.7)]" style={{ background: BRAND.ink, color: BRAND.lime }}>★ Editor&apos;s pick</span>
            <span data-ft-badge className="absolute -bottom-5 right-6 flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-4 py-2.5 text-[12.5px] font-semibold text-ink shadow-[0_18px_36px_-18px_rgba(14,15,20,0.6)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={BRAND.ink} strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 1.5M9 2h6" /></svg>
              {post.minutes} min read
            </span>
          </a>

          {/* Story */}
          <div data-ft-story className="min-w-0">
            <div data-ft-meta className="flex flex-wrap items-center gap-3 text-[12px] text-ink/55">
              <span className="rounded-full px-3 py-1 font-semibold" style={{ background: post.accent, color: BRAND.paper }}>{post.category}</span>
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-ink/30" />
              <span>{post.minutes} min read</span>
            </div>
            <h3 className="display mt-5 text-[clamp(2rem,3.6vw,3.4rem)] leading-[0.98]">
              {post.headline.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]"><span data-ft-line className="block">{line}</span></span>
              ))}
            </h3>
            <p data-ft-copy className="mt-5 max-w-[52ch] text-[15px] leading-[1.7] text-ink/65">{post.summary}</p>

            <div data-ft-copy className="mt-7 rounded-[20px] border border-ink/10 bg-paper/70 p-5 backdrop-blur-sm">
              <span className="text-mono-9 tracking-[0.16em] text-ink/45 uppercase">What you&apos;ll learn</span>
              <ul data-ft-points className="mt-3 space-y-2.5">
                {post.takeaways.map((point) => (
                  <li key={point} data-ft-point className="flex gap-3 text-[13.5px] leading-[1.5] text-ink/80">
                    <span data-ft-tick className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold" style={{ background: `${post.accent}24`, color: post.accent }}>✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div data-ft-copy className="mt-7 flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full text-[13px] font-bold" style={{ background: BRAND.ink, color: BRAND.lime }}>{initials}</span>
                <span>
                  <span className="block text-[14px] font-semibold text-ink">{post.author.name}</span>
                  <span className="block text-[12px] text-ink/50">{post.author.role}</span>
                </span>
              </div>
              <a href={post.href} className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-mono-10-5 tracking-[0.18em] text-paper uppercase" style={{ background: BRAND.ink }}>
                <span className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-y-0" style={{ background: `linear-gradient(100deg, ${BRAND.ember}, ${BRAND.cobalt})` }} />
                <span className="relative">Read the story</span>
                <span className="relative transition-transform duration-500 group-hover/cta:translate-x-1">→</span>
              </a>
            </div>

            <div data-ft-copy className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => <span key={tag} className="rounded-full border border-ink/12 px-3 py-1 text-[12px] text-ink/60">#{tag}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
