"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { BLOG_TOPICS as TOPICS, type BlogTopic } from "@/data/blog";

gsap.registerPlugin(ScrollTrigger);

type Topic = BlogTopic;

const onAccent = (color: string) => (color === BRAND.lime || color === BRAND.mint ? BRAND.ink : BRAND.paper);

function Icon({ d, className, color }: { d: string; className: string; color: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>;
}

function TopicTile({ topic, index }: { topic: Topic; index: number }) {
  const ink = onAccent(topic.accent);
  return (
    <a
      href={`#topic-${topic.id}`}
      data-tp-tile
      data-side={index % 2 === 0 ? -1 : 1}
      className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[26px] border border-ink/10 bg-paper/80 p-6 backdrop-blur-sm transition-[border-color,translate] duration-500 hover:-translate-y-1 hover:border-transparent sm:p-7"
    >
      {/* Colour wash that rises on hover */}
      <span aria-hidden className="absolute inset-0 translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" style={{ background: `linear-gradient(170deg, ${topic.accent}2b, ${topic.accent}10 60%, transparent)` }} />
      {/* Big watermark icon */}
      <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.07] transition-[rotate,opacity] duration-700 group-hover:rotate-[-12deg] group-hover:opacity-[0.14]">
        <Icon d={topic.icon} className="h-52 w-52" color={BRAND.ink} />
      </span>

      <div className="relative flex items-start justify-between">
        <span data-tp-icon className="grid h-14 w-14 place-items-center rounded-[16px] transition-[scale] duration-500 group-hover:scale-110" style={{ background: topic.accent }}>
          <Icon d={topic.icon} className="h-7 w-7" color={ink} />
        </span>
        <span className="text-right">
          <span data-tp-count data-value={topic.posts} className="display block text-[2.2rem] leading-none text-ink tabular-nums">{topic.posts}</span>
          <span className="mt-1 block text-mono-9 tracking-[0.16em] text-ink/45 uppercase">Articles</span>
        </span>
      </div>

      <h3 className="display relative mt-8 text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none">{topic.name}</h3>
      <p className="relative mt-3 max-w-[34ch] text-[13.5px] leading-[1.6] text-ink/60">{topic.description}</p>

      <div className="relative mt-auto flex items-end justify-between gap-4 border-t border-ink/10 pt-4">
        <span className="min-w-0">
          <span className="block text-mono-9 tracking-[0.16em] text-ink/40 uppercase">Latest</span>
          <span className="mt-1 block truncate text-[13px] font-semibold text-ink">{topic.latest}</span>
        </span>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/12 text-ink transition-[background-color,color,rotate,border-color] duration-500 group-hover:rotate-[-45deg] group-hover:border-ink group-hover:bg-ink group-hover:text-paper">→</span>
      </div>
    </a>
  );
}

/** Blogs section 02: browse by topic — six large topic tiles that slide in from alternating sides. */
export default function BlogsTopics() {
  const root = useRef<HTMLElement | null>(null);
  const total = TOPICS.reduce((sum, topic) => sum + topic.posts, 0);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-tp-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: "[data-tp-head]", start: "top 88%", end: "top 55%", scrub: 0.65 } });
      gsap.utils.toArray<HTMLElement>("[data-tp-tile]", element).forEach((tile) => {
        const side = Number(tile.dataset.side);
        const trigger = { trigger: tile, start: "top 98%", end: "top 62%", scrub: 0.65 };
        // Tiles slide in from alternating sides with a slight tilt…
        gsap.fromTo(tile, { opacity: 0, xPercent: side * 18, rotate: side * 3 }, { opacity: 1, xPercent: 0, rotate: 0, ease: "none", scrollTrigger: trigger });
        // …the icon pops and the article count counts up as they settle.
        gsap.fromTo(tile.querySelector("[data-tp-icon]"), { scale: 0.4, rotate: -30 }, { scale: 1, rotate: 0, ease: "none", scrollTrigger: { ...trigger, start: "top 90%", end: "top 58%" } });
        const count = tile.querySelector<HTMLElement>("[data-tp-count]");
        if (count) {
          const target = Number(count.dataset.value);
          const state = { v: 0 };
          count.textContent = "0";
          gsap.to(state, { v: target, ease: "none", scrollTrigger: { ...trigger, start: "top 90%", end: "top 55%" }, onUpdate: () => { count.textContent = String(Math.round(state.v)); } });
        }
      });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="topics" className="relative z-10 scroll-mt-24 overflow-x-clip py-[10vh] sm:py-[12vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Header */}
        <div data-tp-head className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.mint }} />02 — Browse by topic</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              PICK WHAT YOU<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, ${BRAND.mint} 50%, ${BRAND.ember})` }}>WANT TO GROW.</span>
            </h2>
          </div>
          <div className="max-w-[40ch]">
            <p className="text-[14px] leading-[1.65] text-ink/60">
              Guides grouped by what you&apos;re working on, from your first website to automating the busy work.
            </p>
            <div className="mt-5 flex gap-8 border-t border-ink/12 pt-4">
              <div>
                <div className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-none" style={{ color: BRAND.cobalt }}>{total}+</div>
                <div className="mt-1.5 text-mono-9 tracking-[0.16em] text-ink/45 uppercase">Articles</div>
              </div>
              <div>
                <div className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-none" style={{ color: BRAND.cobalt }}>{TOPICS.length}</div>
                <div className="mt-1.5 text-mono-9 tracking-[0.16em] text-ink/45 uppercase">Topics</div>
              </div>
            </div>
          </div>
        </div>

        {/* Topic tiles */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {TOPICS.map((topic, index) => <TopicTile key={topic.id} topic={topic} index={index} />)}
        </div>
      </div>
    </section>
  );
}
