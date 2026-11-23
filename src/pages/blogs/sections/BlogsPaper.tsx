"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BRAND } from "@/lib/brand";

/**
 * PLACEHOLDER editions. Each has a cover story (shown on the cover and as the featured story inside)
 * and a list of latest posts for the inside left page. Swap the copy for real posts.
 */
const EDITIONS = [
  {
    issue: 12,
    category: "Ecommerce",
    accent: BRAND.ember,
    headline: "What a Shopify store really costs in India",
    deck: "Platform fees, apps, payment gateways and design, broken down line by line.",
    quote: "Spend less on apps and more on product pages, checkout and speed.",
    minutes: 6,
    readers: 128,
    latest: [
      { category: "Payments", title: "UPI or cash on delivery: what sells more?", minutes: 4 },
      { category: "Website", title: "Why your site loads slow, and how to fix it", minutes: 5 },
      { category: "Marketing", title: "Reels that turn views into orders", minutes: 3 },
      { category: "Apps", title: "Website or app first? How to decide", minutes: 6 },
    ],
  },
  {
    issue: 13,
    category: "Marketing",
    accent: BRAND.cobalt,
    headline: "Five ways to cut your ad cost without losing leads",
    deck: "The audience, creative and landing page fixes we make before raising any budget.",
    quote: "Rising ad costs are rarely an ad problem. Fix the page people land on first.",
    minutes: 5,
    readers: 214,
    latest: [
      { category: "Ads", title: "Google Ads vs Meta Ads for local brands", minutes: 6 },
      { category: "SEO", title: "The SEO checklist for every new website", minutes: 7 },
      { category: "Content", title: "How often should a small brand post?", minutes: 3 },
      { category: "Leads", title: "WhatsApp follow-ups that close more deals", minutes: 4 },
    ],
  },
  {
    issue: 14,
    category: "Automation",
    accent: BRAND.mint,
    headline: "Invoices on autopilot with Tally and WhatsApp",
    deck: "How a retail chain saved 32 hours a week by connecting the tools it already used.",
    quote: "Every order now creates its own invoice and confirmation within seconds.",
    minutes: 7,
    readers: 96,
    latest: [
      { category: "AI", title: "Where AI agents actually save time", minutes: 5 },
      { category: "CRM", title: "Set up a simple CRM in one afternoon", minutes: 6 },
      { category: "Ecommerce", title: "Auto-sync stock across Shopify and Amazon", minutes: 4 },
      { category: "Ops", title: "Five tasks every business should automate", minutes: 3 },
    ],
  },
];

const TOPICS = [
  { label: "SEO", color: BRAND.lime },
  { label: "Shopify", color: BRAND.ember },
  { label: "Reels", color: BRAND.cobalt },
  { label: "AI agents", color: BRAND.mint },
];

type Edition = (typeof EDITIONS)[number];
const onAccent = (color: string) => (color === BRAND.lime || color === BRAND.mint ? BRAND.ink : BRAND.paper);
/** Accent colours dark enough for small text on white. */
const textAccent = (color: string) => (color === BRAND.mint ? "#0e9f86" : color === BRAND.lime ? "#5f7f00" : color);

/** Shared page shell: white sheet, page header and page number. */
function Page({ children, folio, side }: { children: React.ReactNode; folio: string; side: "left" | "right" }) {
  return (
    <div className={`flex h-full w-full flex-col overflow-hidden border border-ink/10 bg-paper p-[2.2cqw] text-ink ${side === "left" ? "rounded-l-[1.6cqw]" : "rounded-r-[1.6cqw]"}`}>
      {children}
      <div className={`mt-auto flex border-t border-ink/10 pt-[0.9cqw] font-mono text-[1.05cqw] tracking-[0.14em] text-ink/40 uppercase ${side === "left" ? "justify-start" : "justify-end"}`}>
        <span>{folio}</span>
      </div>
    </div>
  );
}

/** Front cover — what you see while the journal is closed. */
function Cover({ edition }: { edition: Edition }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.6cqw] border border-ink/10 bg-paper text-ink">
      {/* Masthead band */}
      <div className="px-[2.2cqw] pb-[1.8cqw] pt-[2.2cqw]" style={{ background: BRAND.ink }}>
        <div className="flex justify-between font-mono text-[1.05cqw] tracking-[0.16em] text-paper/50 uppercase">
          <span>Issue {edition.issue}</span>
          <span>Weekly · Free</span>
        </div>
        <span className="display mt-[1.2cqw] block text-[5.2cqw] leading-[0.86] text-paper">THE NEXO<br />JOURNAL</span>
        <span className="mt-[1.2cqw] block text-[1.05cqw] text-paper/55">Web · Commerce · Apps · Marketing · Automation</span>
      </div>
      {/* Cover story */}
      <div className="flex flex-1 flex-col p-[2.2cqw]">
        <span className="w-fit rounded-full px-[1.3cqw] py-[0.4cqw] text-[1.2cqw] font-semibold" style={{ background: edition.accent, color: onAccent(edition.accent) }}>{edition.category}</span>
        <h3 className="display mt-[1.2cqw] text-[3cqw] leading-[0.98]">{edition.headline}</h3>
        <div className="relative mt-[1.6cqw] flex-1 overflow-hidden rounded-[1.2cqw]" style={{ background: `linear-gradient(140deg, ${edition.accent}38, ${edition.accent}10)` }}>
          <span className="absolute bottom-0 left-[10%] h-[40%] w-[15%] rounded-t-[0.8cqw]" style={{ background: `${edition.accent}88` }} />
          <span className="absolute bottom-0 left-[31%] h-[62%] w-[15%] rounded-t-[0.8cqw] bg-ink/85" />
          <span className="absolute bottom-0 left-[52%] h-[50%] w-[15%] rounded-t-[0.8cqw]" style={{ background: `${edition.accent}bb` }} />
          <span className="absolute bottom-0 left-[73%] h-[82%] w-[15%] rounded-t-[0.8cqw]" style={{ background: edition.accent }} />
        </div>
        <div className="mt-[1.6cqw] flex items-center justify-between border-t border-ink/10 pt-[1cqw] text-[1.2cqw]">
          <span className="text-ink/55">{edition.latest.length} more inside · {edition.minutes} min</span>
          <span className="font-semibold text-ink">Open →</span>
        </div>
      </div>
    </div>
  );
}

/** Inside left page — the latest posts. */
function LatestPage({ edition }: { edition: Edition }) {
  return (
    <Page folio={`Issue ${edition.issue} · Page 2`} side="left">
      <div className="flex items-end justify-between border-b-[0.3cqw] border-ink pb-[0.9cqw]">
        <span className="display text-[2.6cqw] leading-none">LATEST</span>
        <span className="font-mono text-[1.05cqw] tracking-[0.14em] text-ink/45 uppercase">This week</span>
      </div>
      <ol className="mt-[0.6cqw]">
        {edition.latest.map((post, i) => (
          <li key={post.title} className="flex gap-[1.4cqw] border-b border-ink/10 py-[2cqw]">
            <span className="display w-[3cqw] shrink-0 text-[2.4cqw] leading-none" style={{ color: textAccent(edition.accent) }}>0{i + 1}</span>
            <span className="min-w-0">
              <span className="block font-mono text-[1.05cqw] tracking-[0.14em] text-ink/45 uppercase">{post.category}</span>
              <span className="mt-[0.4cqw] block text-[1.6cqw] font-semibold leading-[1.22]">{post.title}</span>
              <span className="mt-[0.4cqw] block text-[1.15cqw] text-ink/45">{post.minutes} min read</span>
            </span>
          </li>
        ))}
      </ol>
    </Page>
  );
}

/** Inside right page — the cover story in full. */
function FeaturedPage({ edition }: { edition: Edition }) {
  return (
    <Page folio={`Page 3 · ${edition.category}`} side="right">
      <div className="flex items-center justify-between">
        <span className="rounded-full px-[1.3cqw] py-[0.4cqw] text-[1.2cqw] font-semibold" style={{ background: edition.accent, color: onAccent(edition.accent) }}>Cover story</span>
        <span className="font-mono text-[1.05cqw] tracking-[0.14em] text-ink/45 uppercase">{edition.minutes} min read</span>
      </div>
      <h3 className="display mt-[1.3cqw] text-[2.7cqw] leading-[0.98]">{edition.headline}</h3>
      <p className="mt-[0.9cqw] text-[1.3cqw] leading-[1.45] text-ink/60">{edition.deck}</p>
      <div className="relative mt-[1.6cqw] h-[30%] shrink-0 overflow-hidden rounded-[1.2cqw]" style={{ background: `linear-gradient(140deg, ${edition.accent}38, ${edition.accent}10)` }}>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <polyline points="0,34 15,30 30,32 45,22 60,24 75,13 100,6" fill="none" stroke={textAccent(edition.accent)} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <blockquote className="mt-[1.4cqw] border-l-[0.5cqw] pl-[1.2cqw] text-[1.45cqw] font-semibold leading-[1.3]" style={{ borderColor: edition.accent }}>
        “{edition.quote}”
      </blockquote>
      <div className="mt-[1.3cqw] grid grid-cols-2 gap-[1.6cqw]">
        {[0, 1].map((col) => (
          <div key={col} className="space-y-[0.7cqw]">
            {[100, 94, 98, 88, 96, 62].map((width, i) => <span key={i} className="block h-[0.7cqw] rounded-full bg-ink/10" style={{ width: `${col ? width - 6 : width}%` }} />)}
          </div>
        ))}
      </div>
      <span className="mt-[1.3cqw] text-[1.3cqw] font-semibold" style={{ color: textAccent(edition.accent) }}>Read the full story →</span>
    </Page>
  );
}

/** Live readers card — a ticking count and a sparkline that keeps drawing. */
function ReadersCard({ edition }: { edition: Edition }) {
  const [count, setCount] = useState(edition.readers);
  const [points, setPoints] = useState<number[]>(() => [40, 46, 42, 55, 52, 61, 58, 66, 70, 68, 76, 82]);
  useEffect(() => { setCount(edition.readers); }, [edition.readers]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setCount((value) => value + Math.floor(Math.random() * 4) - 1);
      setPoints((list) => [...list.slice(1), Math.max(25, Math.min(95, list[list.length - 1] + Math.round(Math.random() * 18 - 8)))]);
    }, 1500);
    return () => window.clearInterval(id);
  }, []);
  const line = points.map((v, i) => `${((i / (points.length - 1)) * 100).toFixed(1)},${100 - v}`).join(" ");
  return (
    <div className="rounded-[2cqw] p-[2.2cqw] shadow-[0_4cqw_7cqw_-4cqw_rgba(14,15,20,0.6)]" style={{ background: BRAND.ink }}>
      <span className="flex items-center gap-[1cqw] font-mono text-[1.4cqw] tracking-[0.14em] uppercase" style={{ color: BRAND.lime }}>
        <i className="h-[1.1cqw] w-[1.1cqw] animate-pulse rounded-full" style={{ background: BRAND.lime }} />Live
      </span>
      <span className="display mt-[1cqw] block text-[4.2cqw] leading-none text-paper tabular-nums">{count}</span>
      <span className="mt-[0.4cqw] block text-[1.45cqw] text-paper/55">reading this story now</span>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-[1.4cqw] h-[6cqw] w-full overflow-visible" aria-hidden>
        <polyline points={line} fill="none" stroke={edition.accent === BRAND.cobalt ? BRAND.mint : edition.accent} strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Trending topics card — bars that keep re-ranking. */
function TrendingCard() {
  const [values, setValues] = useState([82, 64, 51, 38]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setValues((list) => list.map((v) => Math.max(20, Math.min(96, v + Math.round(Math.random() * 24 - 12))))), 2400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="rounded-[2cqw] border border-ink/10 bg-paper p-[2.2cqw] shadow-[0_4cqw_7cqw_-4cqw_rgba(14,15,20,0.5)]">
      <span className="font-mono text-[1.4cqw] tracking-[0.14em] uppercase" style={{ color: BRAND.ember }}>Trending topics</span>
      <ul className="mt-[1.4cqw] space-y-[1.3cqw]">
        {TOPICS.map((topic, i) => (
          <li key={topic.label}>
            <span className="flex justify-between text-[1.6cqw] font-semibold text-ink"><span>#{topic.label}</span><span className="font-mono text-[1.3cqw] text-ink/45 tabular-nums">{values[i]}%</span></span>
            <span className="mt-[0.5cqw] block h-[0.9cqw] overflow-hidden rounded-full bg-ink/[0.08]">
              <span className="block h-full rounded-full transition-[width] duration-1000 ease-out" style={{ width: `${values[i]}%`, background: topic.color }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Reading-time card — a ring that fills like a reader working through the story. */
function ReadTimeCard({ edition }: { edition: Edition }) {
  return (
    <div className="flex items-center gap-[1.4cqw] rounded-[2cqw] border border-ink/10 bg-paper p-[1.8cqw] shadow-[0_4cqw_7cqw_-4cqw_rgba(14,15,20,0.5)]">
      <svg viewBox="0 0 40 40" className="w-[6cqw] shrink-0 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(14,15,20,0.08)" strokeWidth="4" />
        <circle className="np-ring" cx="20" cy="20" r="16" fill="none" stroke={edition.accent} strokeWidth="4" strokeLinecap="round" pathLength={100} strokeDasharray="100" />
      </svg>
      <span className="min-w-0">
        <span className="display block whitespace-nowrap text-[2.6cqw] leading-none text-ink">{edition.minutes} min</span>
        <span className="mt-[0.5cqw] block text-[1.45cqw] leading-tight text-ink/55">average read, start to finish</span>
      </span>
    </div>
  );
}

/** A card floating gently up and down beside the journal (hidden on phones, where it would be too small). */
function Floating({ desk, className, delay, children }: { desk: string; className: string; delay: string; children: React.ReactNode }) {
  return (
    <div data-desk={desk} className={`absolute max-sm:hidden ${className}`}>
      <div className="np-bob" style={{ animationDelay: delay }}>{children}</div>
    </div>
  );
}

/**
 * Blogs hero visual — The Nexo Journal. Closed, it shows its front cover. It opens like a magazine:
 * the cover turns over to become the left page (latest posts) and reveals the cover story on the
 * right. Every few seconds it closes and reopens on the next issue; a click opens or turns it.
 * Cards around it show live readers, trending topics and read time. Sized in container units.
 */
export default function BlogsPaper() {
  const [edition, setEdition] = useState(0);
  const spreadRef = useRef<HTMLDivElement | null>(null);
  const leafRef = useRef<HTMLDivElement | null>(null);
  const controls = useRef<{ click: () => void } | null>(null);
  const current = EDITIONS[edition];

  useEffect(() => {
    const spread = spreadRef.current;
    const leaf = leafRef.current;
    if (!spread || !leaf) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(leaf, { transformPerspective: 2600, transformOrigin: "0% 50%", rotationY: reduce ? -180 : 0 });
    // Closed, the cover sits in the middle; open, the full spread is centred.
    gsap.set(spread, { xPercent: reduce ? 0 : -25 });
    if (reduce) return;

    let phase: "closed" | "opening" | "open" | "closing" = "closed";
    let tween: gsap.core.Timeline | null = null;
    let timer: gsap.core.Tween | null = null;
    const schedule = (fn: () => void, seconds: number) => { timer?.kill(); timer = gsap.delayedCall(seconds, fn); };

    const open = () => {
      tween?.kill();
      timer?.kill();
      phase = "opening";
      tween = gsap.timeline({ onComplete: () => { phase = "open"; schedule(next, 6); } })
        .to(leaf, { rotationY: -180, duration: 1.4, ease: "power3.inOut" }, 0)
        .to(spread, { xPercent: 0, duration: 1.4, ease: "power3.inOut" }, 0);
    };
    // Close the cover, swap to the next issue, then open again.
    const next = () => {
      tween?.kill();
      timer?.kill();
      phase = "closing";
      tween = gsap.timeline({
        onComplete: () => {
          phase = "closed";
          setEdition((value) => (value + 1) % EDITIONS.length);
          schedule(open, 1.4);
        },
      })
        .to(leaf, { rotationY: 0, duration: 1.1, ease: "power2.inOut" }, 0)
        .to(spread, { xPercent: -25, duration: 1.1, ease: "power2.inOut" }, 0);
    };
    controls.current = {
      click: () => {
        if (phase === "open") next();
        else if (phase === "closed" || phase === "closing") open();
      },
    };
    schedule(open, 1.4);
    return () => { tween?.kill(); timer?.kill(); controls.current = null; };
  }, []);

  return (
    <div className="relative mx-auto aspect-[1/0.84] w-full max-w-[760px] [container-type:inline-size]">
      {/* ── The journal ── */}
      <div data-desk="paper" className="absolute left-[15%] top-[6%] z-20 w-[70%]">
        <div className="anim-float" style={{ animationDuration: "8s" }}>
          <div ref={spreadRef} className="relative">
            <button
              type="button"
              onClick={() => controls.current?.click()}
              data-cursor="view"
              aria-label="Open the journal"
              className="relative grid aspect-[2/1.96] w-full cursor-pointer grid-cols-2 text-left"
            >
              {/* left slot stays empty until the cover turns over onto it */}
              <span aria-hidden />
              {/* right slot: the cover story page, with the cover leaf on top of it */}
              <div className="relative">
                <div className="absolute inset-0"><FeaturedPage edition={current} /></div>
                <div ref={leafRef} className="absolute inset-0 [transform-style:preserve-3d]">
                  <div className="absolute inset-0 [backface-visibility:hidden]"><Cover edition={current} /></div>
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"><LatestPage edition={current} /></div>
                </div>
              </div>
            </button>

            {/* "New every week" badge on the journal's top-right corner */}
            <div className="pointer-events-none absolute -right-[4cqw] -top-[6cqw] z-30 grid aspect-square w-[13cqw] place-items-center rounded-full shadow-[0_2.4cqw_4cqw_-2cqw_rgba(14,15,20,0.6)]" style={{ background: BRAND.ink }}>
              <svg viewBox="0 0 100 100" className="anim-spin-slow absolute inset-0 h-full w-full" aria-hidden>
                <defs><path id="np-badge" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" /></defs>
                <text fontSize="9.5" letterSpacing="2.6" fill={BRAND.paper} fontFamily="ui-monospace, monospace"><textPath href="#np-badge">NEW EDITION · EVERY WEEK ·</textPath></text>
              </svg>
              <span className="relative text-center font-mono text-[1.4cqw] font-bold leading-tight" style={{ color: BRAND.lime }}>READ<br />TODAY</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cards around the journal ── */}
      <Floating desk="readers" className="left-[-6%] top-[16%] z-30 w-[20%]" delay="-3.2s"><ReadersCard edition={current} /></Floating>
      <Floating desk="readtime" className="left-[-6%] top-[66%] z-30 w-[20%]" delay="-4.4s"><ReadTimeCard edition={current} /></Floating>
      <Floating desk="trending" className="right-[-2%] top-[38%] z-30 w-[21%]" delay="-2s"><TrendingCard /></Floating>

      <style>{`
        @keyframes np-bob { 0%, 100% { transform: translateY(-1.4cqw); } 50% { transform: translateY(1.4cqw); } }
        .np-bob { animation: np-bob 5.5s ease-in-out infinite; }
        @keyframes np-ring { 0% { stroke-dashoffset: 100; } 70%, 100% { stroke-dashoffset: 0; } }
        .np-ring { animation: np-ring 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .np-bob, .np-ring { animation: none; } .np-ring { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}
