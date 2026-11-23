"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { BLOG_TOPICS } from "@/data/blog";
import Select, { DROPDOWN_CSS } from "@/components/ui/Dropdown";
import { ARTICLES, formatDate, readingMinutes, type Article } from "@/data/articles";
import ArticleCover, { onAccent, topicOf } from "@/components/blog/ArticleCover";

gsap.registerPlugin(ScrollTrigger);

/** How many articles show at first, and how many more each "Load more" adds. */
const PAGE = 6;

const LENGTHS = [
  { id: "any", label: "Any length" },
  { id: "quick", label: "Quick reads", hint: "Under 5 minutes" },
  { id: "medium", label: "Standard", hint: "5 to 8 minutes" },
  { id: "long", label: "Deep dives", hint: "8 minutes or more" },
];
const SORTS = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "shortest", label: "Shortest read" },
  { id: "longest", label: "Longest read" },
];

function inLength(minutes: number, length: string) {
  if (length === "quick") return minutes < 5;
  if (length === "medium") return minutes >= 5 && minutes < 8;
  if (length === "long") return minutes >= 8;
  return true;
}

function PostCard({ article, index }: { article: Article; index: number }) {
  const topic = topicOf(article.topic);
  const initials = article.author.name.split(" ").map((part) => part[0]).join("");
  return (
    <Link href={`/blogs/${article.slug}`} data-bp-card className="group block">
      <div className="bp-swap flex h-full flex-col overflow-hidden rounded-[24px] border border-ink/10 bg-paper/85 backdrop-blur-sm transition-[border-color,box-shadow,translate] duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_60px_-40px_rgba(14,15,20,0.6)]" style={{ animationDelay: `${(index % PAGE) * 60}ms` }}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="h-full w-full transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
            <ArticleCover article={article} seed={index % 4} />
          </div>
          {/* With a real photo, a soft shade keeps the labels readable */}
          {article.cover && <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/35 to-transparent" />}
          <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: topic.accent, color: onAccent(topic.accent) }}>{topic.name}</span>
          <span className="absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">{readingMinutes(article)} min</span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-[18px] font-semibold leading-[1.3] text-ink">{article.title}</h3>
          <p className="mt-2.5 line-clamp-2 text-[13.5px] leading-[1.6] text-ink/60">{article.excerpt}</p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ background: BRAND.ink, color: BRAND.lime }}>{initials}</span>
              <span className="min-w-0">
                <span className="block truncate text-[12.5px] font-semibold text-ink">{article.author.name}</span>
                <span className="block text-[11px] text-ink/45">{formatDate(article.date)}</span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-2 text-[12px] font-semibold text-ink/70 transition-colors duration-300 group-hover:text-ink">
              Read
              <span className="grid h-9 w-9 place-items-center rounded-full border border-ink/12 transition-[background-color,color,rotate,border-color] duration-500 group-hover:rotate-[-45deg] group-hover:border-ink group-hover:bg-ink group-hover:text-paper">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Blogs section 03: every article — search, filter by topic and length, sort, load more. Cards open the article's own page. */
export default function BlogsPosts() {
  const root = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [length, setLength] = useState("any");
  const [sort, setSort] = useState("newest");
  const [shown, setShown] = useState(PAGE);

  const q = query.trim().toLowerCase();
  const matches = ARTICLES
    .filter((article) => topic === "all" || article.topic === topic)
    .filter((article) => inLength(readingMinutes(article), length))
    .filter((article) => !q || `${article.title} ${article.excerpt} ${article.tags.join(" ")}`.toLowerCase().includes(q))
    .sort((a, b) => {
      if (sort === "oldest") return a.date.localeCompare(b.date);
      if (sort === "shortest") return readingMinutes(a) - readingMinutes(b);
      if (sort === "longest") return readingMinutes(b) - readingMinutes(a);
      return b.date.localeCompare(a.date);
    });
  const visible = matches.slice(0, shown);
  const filtered = q !== "" || topic !== "all" || length !== "any" || sort !== "newest";
  const reset = () => { setQuery(""); setTopic("all"); setLength("any"); setSort("newest"); setShown(PAGE); };
  const update = (set: (value: string) => void) => (value: string) => { set(value); setShown(PAGE); };

  // Topic tiles link to #topic-<id>: pick that topic and bring the articles into view.
  useEffect(() => {
    const fromHash = () => {
      const match = window.location.hash.match(/^#topic-(.+)$/);
      if (!match || !BLOG_TOPICS.some((item) => item.id === match[1])) return;
      setTopic(match[1]);
      setQuery("");
      setShown(PAGE);
      root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Clear the hash so clicking the same tile again still works.
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-bp-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: "[data-bp-head]", start: "top 88%", end: "top 55%", scrub: 0.65 } });
      gsap.fromTo("[data-bp-tool], [data-tool]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: "none", stagger: 0.06, scrollTrigger: { trigger: "[data-bp-tools]", start: "top 92%", end: "top 70%", scrub: 0.65 } });
    }, element);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-bp-card]", element).forEach((card, i) => {
        // Cards grow up into place as they reach the screen, each column a beat apart.
        gsap.fromTo(card, { opacity: 0, y: 70, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, ease: "none", scrollTrigger: { trigger: card, start: `top ${98 - (i % 3) * 3}%`, end: `top ${68 - (i % 3) * 3}%`, scrub: 0.65 } });
      });
    }, element);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [q, topic, length, sort, shown]);

  return (
    <section ref={root} id="posts" className="relative z-10 scroll-mt-24 overflow-x-clip py-[10vh] sm:py-[12vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Header */}
        <div data-bp-head className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.cobalt }} />03 — All articles</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              FRESH FROM<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, ${BRAND.ember})` }}>THE JOURNAL.</span>
            </h2>
          </div>
          <p className="max-w-[40ch] text-[14px] leading-[1.65] text-ink/60">
            Every guide, playbook and lesson we&apos;ve published. Search, filter by topic or reading time, and open any article to read it in full.
          </p>
        </div>

        {/* Search + filters */}
        <div data-bp-tools className="relative z-20 mt-10 flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <label data-bp-tool className="flex flex-1 items-center gap-3 rounded-[16px] border border-ink/12 bg-paper/80 px-5 py-3 backdrop-blur-sm transition-colors duration-300 focus-within:border-ink/40">
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke={BRAND.ink} strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input value={query} onChange={(event) => update(setQuery)(event.target.value)} placeholder="Search articles, e.g. Shopify, SEO, WhatsApp" aria-label="Search articles" className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink/40" />
            {query && <button type="button" onClick={() => update(setQuery)("")} aria-label="Clear search" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-[13px] text-ink/60 hover:bg-ink/10">×</button>}
          </label>
          <div className="flex flex-wrap gap-3">
            <Select label="Topic" value={topic} onChange={update(setTopic)} options={[{ id: "all", label: "All topics" }, ...BLOG_TOPICS.map((item) => ({ id: item.id, label: item.name, color: item.accent }))]} />
            <Select label="Reading time" value={length} onChange={update(setLength)} options={LENGTHS} />
            <Select label="Sort by" value={sort} onChange={update(setSort)} options={SORTS} />
          </div>
        </div>
        <div className="mt-4 flex min-h-[28px] flex-wrap items-center justify-between gap-3">
          <span className="text-[13px] text-ink/55">
            {matches.length} {matches.length === 1 ? "article" : "articles"}
            {topic !== "all" && <> in <b className="font-semibold text-ink">{topicOf(topic).name}</b></>}
            {q && <> matching “<b className="font-semibold text-ink">{query.trim()}</b>”</>}
          </span>
          {filtered && <button type="button" onClick={reset} className="text-[13px] font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Clear all filters</button>}
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div key={`${topic}-${length}-${sort}-${q}`} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {visible.map((article, index) => <PostCard key={article.slug} article={article} index={index} />)}
          </div>
        ) : (
          <div className="mt-6 rounded-[24px] border border-dashed border-ink/15 p-12 text-center">
            <p className="text-[15px] font-semibold text-ink">No articles match that yet.</p>
            <p className="mt-1.5 text-[13px] text-ink/55">Try a different search or filter, or ask us and we might write it next.</p>
            <button type="button" onClick={reset} className="mt-5 rounded-full border border-ink/15 px-5 py-2.5 text-[13px] font-semibold text-ink hover:border-ink/40">Clear all filters</button>
          </div>
        )}

        {/* Load more */}
        {matches.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-3">
            <span className="text-mono-9 tracking-[0.18em] text-ink/40 uppercase">Showing {visible.length} of {matches.length}</span>
            {matches.length > shown && (
              <button type="button" onClick={() => setShown((value) => value + PAGE)} className="group/more inline-flex items-center gap-3 rounded-full border border-ink/15 bg-paper/70 px-6 py-3.5 text-mono-10-5 tracking-[0.18em] text-ink uppercase backdrop-blur-sm transition-colors duration-300 hover:border-ink/40">
                Load more articles · {matches.length - shown} left
                <span className="transition-transform duration-300 group-hover/more:translate-y-0.5">↓</span>
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes bp-swap { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .bp-swap { animation: bp-swap 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        ${DROPDOWN_CSS}
        @media (prefers-reduced-motion: reduce) { .bp-swap { animation: none; } }
      `}</style>
    </section>
  );
}
