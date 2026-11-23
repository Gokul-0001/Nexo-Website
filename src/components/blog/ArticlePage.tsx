"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import { BRAND } from "@/lib/brand";
import { ARTICLES, formatDate, getArticle, headingId, readingMinutes, type Article, type Block } from "@/data/articles";
import ArticleCover, { RichText, onAccent, topicOf } from "./ArticleCover";

gsap.registerPlugin(ScrollTrigger);

const textAccent = (color: string) => (color === BRAND.mint ? "#0e9f86" : color === BRAND.lime ? "#5f7f00" : color);

/** One block of the article body. */
function BodyBlock({ block, accent }: { block: Block; accent: string }) {
  switch (block.type) {
    case "h2":
      return <h2 id={headingId(block.text)} data-ar-block data-ar-heading className="display mt-14 scroll-mt-28 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.05] text-ink">{block.text}</h2>;
    case "h3":
      return <h3 data-ar-block className="mt-9 text-[19px] font-semibold leading-[1.3] text-ink">{block.text}</h3>;
    case "p":
      return <p data-ar-block className="mt-5 text-[17.5px] leading-[1.8] text-ink/75"><RichText text={block.text} /></p>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List data-ar-block className="mt-5 space-y-3">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3.5 text-[17.5px] leading-[1.7] text-ink/75">
              <span className="mt-[0.45em] grid h-6 min-w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ background: `${accent}22`, color: textAccent(accent) }}>
                {block.ordered ? i + 1 : "•"}
              </span>
              <span><RichText text={item} /></span>
            </li>
          ))}
        </List>
      );
    }
    case "quote":
      return (
        <figure data-ar-block className="my-10 border-l-[5px] py-1 pl-6" style={{ borderColor: accent }}>
          <blockquote className="display text-[clamp(1.3rem,2vw,1.75rem)] leading-[1.2] text-ink">“{block.text}”</blockquote>
          {block.by && <figcaption className="mt-3 text-mono-9 tracking-[0.16em] text-ink/45 uppercase">— {block.by}</figcaption>}
        </figure>
      );
    case "tip":
      return (
        <aside data-ar-block className="mt-8 rounded-[20px] p-6" style={{ background: `${accent}14`, border: `1px solid ${accent}33` }}>
          <span className="flex items-center gap-2 text-mono-9 tracking-[0.16em] uppercase" style={{ color: textAccent(accent) }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z" /></svg>
            {block.title ?? "Tip"}
          </span>
          <p className="mt-2.5 text-[15.5px] leading-[1.7] text-ink/80"><RichText text={block.text} /></p>
        </aside>
      );
    case "stats":
      return (
        <div data-ar-block className="my-9 grid gap-3 sm:grid-cols-3">
          {block.items.map((item) => (
            <div key={item.label} className="rounded-[18px] border border-ink/10 bg-paper p-5">
              <div className="display text-[clamp(1.7rem,2.6vw,2.3rem)] leading-none" style={{ color: textAccent(accent) }}>{item.value}</div>
              <div className="mt-2 text-[13px] text-ink/55">{item.label}</div>
            </div>
          ))}
        </div>
      );
    case "image":
      return (
        <figure data-ar-block className="my-10">
          <div className="overflow-hidden rounded-[22px] border border-ink/10 bg-paper-2">
            {block.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={block.src} alt={block.alt ?? ""} className="w-full object-cover" />
            ) : (
              <div className="grid aspect-[16/9] place-items-center text-[13px] text-ink/40">Image</div>
            )}
          </div>
          {block.caption && <figcaption className="mt-3 text-[13px] text-ink/50">{block.caption}</figcaption>}
        </figure>
      );
  }
}

function MiniCard({ article, label }: { article: Article; label?: string }) {
  const topic = topicOf(article.topic);
  return (
    <Link href={`/blogs/${article.slug}`} data-ar-related className="group block overflow-hidden rounded-[22px] border border-ink/10 bg-paper/85 backdrop-blur-sm transition-[translate,border-color] duration-500 hover:-translate-y-1 hover:border-ink/20">
      <div className="relative aspect-[16/9] overflow-hidden">
        <div className="h-full w-full transition-[scale] duration-700 group-hover:scale-[1.05]"><ArticleCover article={article} /></div>
        {article.cover && <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/35 to-transparent" />}
        <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: topic.accent, color: onAccent(topic.accent) }}>{topic.name}</span>
      </div>
      <div className="p-5">
        {label && <span className="text-mono-9 tracking-[0.16em] text-ink/40 uppercase">{label}</span>}
        <span className="mt-1 block text-[16px] font-semibold leading-[1.3] text-ink">{article.title}</span>
        <span className="mt-2 block text-[12px] text-ink/45">{formatDate(article.date)} · {readingMinutes(article)} min read</span>
      </div>
    </Link>
  );
}

/**
 * The reading page for one article (/blogs/<slug>): a scroll-progress bar, a sticky "On this page"
 * list that follows along, share links, then related articles and a call to action.
 */
export default function ArticlePage({ slug }: { slug?: string }) {
  const article = getArticle(slug);
  const root = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => { setUrl(window.location.href); }, []);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || !article) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Reading progress across the article body.
      gsap.fromTo("[data-ar-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-ar-body]", start: "top 30%", end: "bottom 70%", scrub: true } });
      // Highlight the section being read in "On this page".
      gsap.utils.toArray<HTMLElement>("[data-ar-heading]").forEach((heading) => {
        ScrollTrigger.create({ trigger: heading, start: "top 45%", onEnter: () => setActive(heading.id), onEnterBack: () => setActive(heading.id) });
      });
      ScrollTrigger.create({ trigger: "[data-ar-body]", start: "top 45%", onLeaveBack: () => setActive("") });
      if (reduce) return;

      gsap.fromTo("[data-ar-hero] > *", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, delay: 0.15 });
      gsap.fromTo("[data-ar-cover]", { clipPath: "inset(8% 6% 8% 6% round 30px)" }, { clipPath: "inset(0% 0% 0% 0% round 30px)", ease: "none", scrollTrigger: { trigger: "[data-ar-cover]", start: "top 90%", end: "top 30%", scrub: 0.65 } });
      gsap.fromTo("[data-ar-cover-zoom]", { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-ar-cover]", start: "top 90%", end: "bottom top", scrub: 0.65 } });
      // Each block of the story rises in as you reach it, and back out when you scroll up past it.
      gsap.utils.toArray<HTMLElement>("[data-ar-block]").forEach((block) => {
        gsap.fromTo(block, { opacity: 0, y: 34 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: block, start: "top 94%", end: "top 74%", scrub: 0.6 } });
      });
      gsap.fromTo("[data-ar-side]", { opacity: 0, x: (i) => (i === 0 ? -24 : 24) }, { opacity: 1, x: 0, ease: "none", scrollTrigger: { trigger: "[data-ar-body]", start: "top 85%", end: "top 55%", scrub: 0.65 } });
      gsap.fromTo("[data-ar-related]", { opacity: 0, y: 60, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: "[data-ar-more]", start: "top 90%", end: "top 50%", scrub: 0.65 } });
    }, element);
    return () => ctx.revert();
  }, [article]);

  if (!article) return null;

  const topic = topicOf(article.topic);
  const minutes = readingMinutes(article);
  const headings = article.body.filter((block): block is Extract<Block, { type: "h2" }> => block.type === "h2");
  const index = ARTICLES.findIndex((item) => item.slug === article.slug);
  const newer = index > 0 ? ARTICLES[index - 1] : undefined;
  const older = index < ARTICLES.length - 1 ? ARTICLES[index + 1] : undefined;
  const related = [...ARTICLES.filter((item) => item.slug !== article.slug && item.topic === article.topic), ...ARTICLES.filter((item) => item.slug !== article.slug && item.topic !== article.topic)].slice(0, 3);
  const initials = article.author.name.split(" ").map((part) => part[0]).join("");
  const share = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${url}`)}`, d: "M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20z" },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, d: "M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v1.6A4 4 0 0 1 20 13v7h-4v-6a2 2 0 0 0-4 0v6h-2z" },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`, d: "M4 4l16 16M20 4L4 20" },
  ];
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  };

  return (
    <PageContainer>
      <Header />
      <main ref={root} className="relative">
        {/* Reading progress */}
        <div aria-hidden className="fixed inset-x-0 top-0 z-[950] h-[3px] bg-transparent">
          <div data-ar-progress className="h-full origin-left" style={{ background: `linear-gradient(90deg, ${BRAND.cobalt}, ${topic.accent})`, transform: "scaleX(0)" }} />
        </div>

        {/* Hero */}
        <section className="relative z-10 pt-[16vh] sm:pt-[18vh]">
          <div data-ar-hero className="mx-auto w-full max-w-[920px] px-5 text-center sm:px-8">
            <Link href="/blogs#posts" className="inline-flex items-center gap-2 text-mono-10-5 tracking-[0.16em] text-ink/55 uppercase transition-colors duration-300 hover:text-ink">← All articles</Link>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[12.5px] text-ink/55">
              <span className="rounded-full px-3 py-1 font-semibold" style={{ background: topic.accent, color: onAccent(topic.accent) }}>{topic.name}</span>
              <span>{formatDate(article.date)}</span>
              <span className="h-1 w-1 rounded-full bg-ink/30" />
              <span>{minutes} min read</span>
            </div>
            <h1 className="display mx-auto mt-6 max-w-[18ch] text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.98] text-ink">{article.title}</h1>
            <p className="mx-auto mt-6 max-w-[56ch] text-[16px] leading-[1.7] text-ink/60 sm:text-[17px]">{article.excerpt}</p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full text-[13px] font-bold" style={{ background: BRAND.ink, color: BRAND.lime }}>{initials}</span>
              <span className="text-left">
                <span className="block text-[14px] font-semibold text-ink">{article.author.name}</span>
                <span className="block text-[12px] text-ink/50">{article.author.role}</span>
              </span>
            </div>
          </div>
          <div className="mx-auto mt-12 w-full max-w-[1400px] px-5 sm:px-8">
            <div data-ar-cover className="relative aspect-[16/8] overflow-hidden rounded-[30px] border border-ink/10 max-sm:aspect-[4/3]">
              <div data-ar-cover-zoom className="h-full w-full"><ArticleCover article={article} /></div>
            </div>
          </div>
        </section>

        {/* Body with sticky contents and share */}
        <section className="relative z-10 py-[10vh]">
          <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[190px_minmax(0,1fr)_190px]">
            <aside data-ar-side className="hidden lg:block">
              <div className="sticky top-28">
                <span className="text-mono-9 tracking-[0.16em] text-ink/40 uppercase">On this page</span>
                <ol className="mt-4 space-y-1 border-l border-ink/10">
                  {headings.map((heading) => {
                    const id = headingId(heading.text);
                    const on = active === id;
                    return (
                      <li key={id}>
                        <a href={`#${id}`} className="-ml-px block border-l-2 py-1.5 pl-4 text-[13px] leading-[1.35] transition-colors duration-300" style={{ borderColor: on ? topic.accent : "transparent", color: on ? BRAND.ink : "rgba(14,15,20,0.5)", fontWeight: on ? 600 : 400 }}>
                          {heading.text}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </aside>

            <article data-ar-body className="mx-auto w-full max-w-[860px]">
              {article.body.map((block, i) => <BodyBlock key={i} block={block} accent={topic.accent} />)}

              {/* Tags */}
              <div className="mt-12 flex flex-wrap gap-2 border-t border-ink/10 pt-6">
                {article.tags.map((tag) => <span key={tag} className="rounded-full border border-ink/12 px-3 py-1 text-[12px] text-ink/60">#{tag}</span>)}
              </div>

              {/* Share (inline below extra-wide screens) */}
              <div className="mt-6 flex flex-wrap items-center gap-2 xl:hidden">
                <span className="mr-1 text-mono-9 tracking-[0.16em] text-ink/40 uppercase">Share</span>
                {share.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="rounded-full border border-ink/12 px-3 py-1.5 text-[12px] text-ink/70">{item.label}</a>)}
                <button type="button" onClick={copy} className="rounded-full border border-ink/12 px-3 py-1.5 text-[12px] text-ink/70">{copied ? "Copied!" : "Copy link"}</button>
              </div>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4 rounded-[22px] border border-ink/10 bg-paper/80 p-5 backdrop-blur-sm">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-[16px] font-bold" style={{ background: BRAND.ink, color: BRAND.lime }}>{initials}</span>
                <span>
                  <span className="block text-mono-9 tracking-[0.16em] text-ink/40 uppercase">Written by</span>
                  <span className="mt-0.5 block text-[16px] font-semibold text-ink">{article.author.name}</span>
                  <span className="block text-[13px] text-ink/55">{article.author.role}. Written from real client work.</span>
                </span>
              </div>
            </article>

            <aside data-ar-side className="hidden xl:block">
              <div className="sticky top-28">
                <span className="text-mono-9 tracking-[0.16em] text-ink/40 uppercase">Share</span>
                <div className="mt-4 flex flex-col gap-2">
                  {share.map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-full border border-ink/10 bg-paper/70 px-4 py-2.5 text-[13px] text-ink/75 transition-colors duration-300 hover:border-ink/30 hover:text-ink">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={item.d} /></svg>
                      {item.label}
                    </a>
                  ))}
                  <button type="button" onClick={copy} className="flex items-center gap-3 rounded-full border border-ink/10 bg-paper/70 px-4 py-2.5 text-left text-[13px] text-ink/75 transition-colors duration-300 hover:border-ink/30 hover:text-ink">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
                    {copied ? "Copied!" : "Copy link"}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Keep reading */}
        <section data-ar-more className="relative z-10 pb-[12vh]">
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
            {(newer || older) && (
              <div className="grid gap-3 border-y border-ink/10 py-6 sm:grid-cols-2">
                {older ? (
                  <Link href={`/blogs/${older.slug}`} className="group block">
                    <span className="text-mono-9 tracking-[0.16em] text-ink/40 uppercase">← Previous</span>
                    <span className="mt-1 block text-[15px] font-semibold text-ink transition-colors group-hover:text-ink/70">{older.title}</span>
                  </Link>
                ) : <span />}
                {newer && (
                  <Link href={`/blogs/${newer.slug}`} className="group block sm:text-right">
                    <span className="text-mono-9 tracking-[0.16em] text-ink/40 uppercase">Next →</span>
                    <span className="mt-1 block text-[15px] font-semibold text-ink transition-colors group-hover:text-ink/70">{newer.title}</span>
                  </Link>
                )}
              </div>
            )}

            <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.95]">KEEP READING.</h2>
              <Link href="/blogs#posts" className="text-mono-10-5 tracking-[0.16em] text-ink/60 uppercase transition-colors hover:text-ink">All articles →</Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => <MiniCard key={item.slug} article={item} label={item.topic === article.topic ? `More on ${topic.name}` : undefined} />)}
            </div>

            {/* Call to action */}
            <div className="relative mt-16 overflow-hidden rounded-[30px] px-6 py-12 text-center sm:px-10" style={{ background: BRAND.ink }}>
              <div aria-hidden className="anim-drift absolute -left-[10%] -top-[60%] h-[140%] w-[50%] rounded-full blur-[80px]" style={{ background: `radial-gradient(circle, ${BRAND.cobalt}, transparent 66%)`, opacity: 0.7 }} />
              <div aria-hidden className="anim-drift absolute -bottom-[60%] -right-[10%] h-[140%] w-[50%] rounded-full blur-[80px]" style={{ background: `radial-gradient(circle, ${topic.accent}, transparent 66%)`, opacity: 0.55, animationDelay: "-8s" }} />
              <span className="relative text-mono-9 tracking-[0.18em] text-paper/50 uppercase">Need help with this?</span>
              <p className="display relative mx-auto mt-4 max-w-[20ch] text-[clamp(1.7rem,3vw,2.6rem)] leading-[1] text-paper">We can do it for you.</p>
              <Link href="/contact" className="relative mt-7 inline-flex items-center gap-3 rounded-full px-7 py-4 text-mono-10-5 tracking-[0.2em] text-ink uppercase" style={{ background: BRAND.lime }}>
                Talk to us <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageContainer>
  );
}
