"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type Store = {
  /** Client / brand name. */
  client: string;
  category: string;
  platform: "Shopify" | "WooCommerce" | "Custom";
  /** Shown in the browser bar. */
  url: string;
  accent: string;
  /** Headline result shown on the hanging tag. */
  result: { value: string; label: string };
  /** Desktop screenshot (e.g. "/work/store-01-desktop.jpg" in /public). Until set, a mock store is shown. */
  desktop?: string;
  /** Mobile screenshot. Until set, a mock mobile page is shown. */
  mobile?: string;
};

/**
 * PLACEHOLDER stores — replace with your client stores (10 shown).
 * Add each store's `desktop` and `mobile` screenshots; they replace the mock stores automatically.
 */
const STORES: Store[] = [
  { client: "Ethnic wear label", category: "Fashion", platform: "Shopify", url: "store-one.com", accent: BRAND.ember, result: { value: "+42%", label: "Conversion" } },
  { client: "Skincare brand", category: "Beauty", platform: "Shopify", url: "store-two.com", accent: BRAND.mint, result: { value: "+58%", label: "Repeat orders" } },
  { client: "Gadget store", category: "Electronics", platform: "WooCommerce", url: "store-three.com", accent: BRAND.cobalt, result: { value: "2,000+", label: "Products" } },
  { client: "Home decor studio", category: "Home & living", platform: "Custom", url: "store-four.com", accent: BRAND.lime, result: { value: "+64%", label: "Online sales" } },
  { client: "Organic grocer", category: "Food & grocery", platform: "Custom", url: "store-five.com", accent: BRAND.mint, result: { value: "9,000+", label: "Orders a month" } },
  { client: "Silver jewellery", category: "Jewellery", platform: "Shopify", url: "store-six.com", accent: BRAND.ember, result: { value: "+51%", label: "Conversion" } },
  { client: "Streetwear drop", category: "Fashion", platform: "Shopify", url: "store-seven.com", accent: BRAND.cobalt, result: { value: "8 min", label: "Drop sell-out" } },
  { client: "Ayurveda wellness", category: "Beauty", platform: "WooCommerce", url: "store-eight.com", accent: BRAND.lime, result: { value: "+39%", label: "Bundle sales" } },
  { client: "Furniture maker", category: "Home & living", platform: "Custom", url: "store-ten.com", accent: BRAND.cobalt, result: { value: "+33%", label: "Enquiry to order" } },
  { client: "Coffee roasters", category: "Food & grocery", platform: "Shopify", url: "store-eleven.com", accent: BRAND.lime, result: { value: "1,800", label: "Subscribers" } },
];

/** PLACEHOLDER figures — confirm before launch. */
const STATS = [
  { value: "40+", label: "Online stores launched" },
  { value: "10+", label: "Product categories" },
];

const onAccentOf = (color: string) => (color === BRAND.lime || color === BRAND.mint ? BRAND.ink : BRAND.paper);

function MockStore({ accent }: { accent: string }) {
  const tint = `${accent}22`;
  return (
    <div className="h-full w-full bg-paper">
      <div className="flex items-center justify-between px-[4%] py-[2.5%]">
        <span className="h-2.5 w-14 rounded-full" style={{ background: BRAND.ink }} />
        <span className="flex gap-2">{[0, 1, 2, 3].map((i) => <span key={i} className="h-1.5 w-7 rounded-full bg-ink/15" />)}</span>
        <span className="flex gap-1.5"><span className="h-4 w-4 rounded-full bg-ink/10" /><span className="h-4 w-4 rounded-full" style={{ background: accent }} /></span>
      </div>
      <div className="mx-[4%] grid grid-cols-[1.2fr_0.8fr] items-center gap-[4%] rounded-xl px-[5%] py-[5%]" style={{ background: `linear-gradient(120deg, ${tint}, ${accent}44)` }}>
        <div className="space-y-2">
          <span className="block h-1.5 w-16 rounded-full" style={{ background: accent }} />
          <span className="block h-4 w-[90%] rounded-md bg-ink/85" />
          <span className="block h-4 w-[60%] rounded-md bg-ink/85" />
          <span className="block h-5 w-20 rounded-full" style={{ background: accent }} />
        </div>
        <div className="aspect-square rounded-xl" style={{ background: `linear-gradient(150deg, ${accent}, ${accent}77)` }} />
      </div>
      <div className="mx-[4%] mt-[3%] flex gap-2">{["All", "New", "Best", "Sale"].map((chip, i) => <span key={chip} className="h-4 w-12 rounded-full" style={{ background: i === 0 ? BRAND.ink : "rgba(14,15,20,0.07)" }} />)}</div>
      <div className="mx-[4%] mt-[3%] grid grid-cols-4 gap-[2.5%]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="aspect-[4/5] rounded-lg" style={{ background: i % 2 ? tint : `${accent}55` }} />
            <span className="block h-1.5 w-[80%] rounded-full bg-ink/60" />
            <span className="block h-1.5 w-[45%] rounded-full" style={{ background: accent }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MockStoreMobile({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col bg-paper p-[8%]">
      <div className="flex items-center justify-between"><span className="h-1.5 w-8 rounded-full bg-ink/70" /><span className="h-3 w-3 rounded-full" style={{ background: accent }} /></div>
      <div className="mt-[10%] aspect-square rounded-lg" style={{ background: `linear-gradient(150deg, ${accent}, ${accent}66)` }} />
      <span className="mt-[10%] block h-2 w-[80%] rounded-full bg-ink/80" />
      <span className="mt-[6%] block h-1.5 w-[40%] rounded-full" style={{ background: accent }} />
      <div className="mt-[8%] flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="h-3 flex-1 rounded" style={{ background: i === 1 ? BRAND.ink : "rgba(14,15,20,0.08)" }} />)}</div>
      <span className="mt-auto block h-4 w-full rounded-full" style={{ background: accent }} />
    </div>
  );
}

/** Desktop browser frame with the phone overlapping its corner. */
function Devices({ store, large = false }: { store: Store; large?: boolean }) {
  return (
    <div className="relative pb-[8%] pr-[7%]">
      <div className="overflow-hidden rounded-[18px] border border-ink/12 bg-paper shadow-[0_34px_70px_-48px_rgba(14,15,20,0.8)]">
        <div className="flex items-center gap-3 border-b border-ink/10 bg-ink/[0.03] px-3 py-2">
          <span className="flex gap-1.5">{[BRAND.ember, BRAND.lime, BRAND.mint].map((c) => <i key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}</span>
          <span className={`mx-auto truncate rounded-full bg-paper px-3 py-0.5 text-ink/45 ${large ? "text-[11px]" : "text-[9.5px]"}`}>{store.url}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          {store.desktop ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={store.desktop} alt={`${store.client} store, desktop`} className="h-full w-full object-cover object-top transition-[object-position] duration-[2.5s] ease-in-out group-hover:object-bottom" />
          ) : (
            <div className="h-full w-full transition-[scale] duration-700 group-hover:scale-[1.04]"><MockStore accent={store.accent} /></div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[22%] min-w-[64px] transition-[translate,rotate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:rotate-[-4deg]">
        <div className="overflow-hidden rounded-[16px] p-[4%] shadow-[0_24px_44px_-20px_rgba(14,15,20,0.8)]" style={{ background: BRAND.ink }}>
          <div className="relative aspect-[9/18] overflow-hidden rounded-[12px] bg-paper">
            {store.mobile ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={store.mobile} alt={`${store.client} store, mobile`} className="h-full w-full object-cover object-top" />
            ) : (
              <MockStoreMobile accent={store.accent} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** One store on the shelf, with a hanging tag showing its headline result. */
function ShelfCard({ store }: { store: Store }) {
  return (
    <figure className="group relative w-[var(--cw)] shrink-0">
      {/* Hanging tag */}
      <span className="ec-swing absolute -top-8 right-[12%] z-10 flex origin-top flex-col items-center">
        <i className="h-3 w-px bg-ink/30" />
        <span className="flex items-baseline gap-1.5 rounded-[10px] px-2.5 py-1.5 shadow-[0_12px_24px_-14px_rgba(14,15,20,0.7)]" style={{ background: store.accent, color: onAccentOf(store.accent) }}>
          <b className="display text-[15px] leading-none">{store.result.value}</b>
          <span className="text-[9px] font-semibold tracking-[0.08em] uppercase opacity-80">{store.result.label}</span>
        </span>
      </span>
      <div className="transition-[translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5"><Devices store={store} /></div>
      <figcaption className="mt-3 pr-[7%]">
        <span className="block truncate text-[14.5px] font-semibold text-ink">{store.client}</span>
        <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink/50"><i className="h-1.5 w-1.5 rounded-full" style={{ background: store.accent }} />{store.category} · {store.platform}</span>
      </figcaption>
    </figure>
  );
}

/**
 * A shelf that keeps sliding sideways. It follows the scroll: scrolling down moves it one way,
 * scrolling up turns it smoothly the other way, and scrolling faster speeds it up — so the
 * drift and the scroll never fight each other. Hovering slows it to a stop.
 */
function ShelfRow({ stores, reverse }: { stores: Store[]; reverse: boolean }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const repeat = Math.max(1, Math.ceil(6 / stores.length));
  const run = Array.from({ length: repeat }, () => stores).flat();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rowDir = reverse ? -1 : 1;
    const follow = 0.35; // shelf moves 0.35px for every 1px scrolled — slow and tied to the scroll
    const drift = 10; // gentle idle drift (px per second) so the shelves never look frozen
    let x = 0;
    let pending = 0; // scroll movement not yet applied; eased in so it glides instead of jumping
    let heading = 1; // eased direction: +1 after scrolling down, −1 after scrolling up
    let wanted = 1;
    let hover = 0;
    let hovering = false;
    let lastY = window.scrollY;
    let visible = false;

    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    const ease = (from: number, to: number, rate: number, dt: number) => from + (to - from) * (1 - Math.exp(-rate * dt));

    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (!visible || dt <= 0) return;
      if (delta !== 0) wanted = delta > 0 ? 1 : -1;
      heading = ease(heading, wanted, 3, dt);
      hover = ease(hover, hovering ? 1 : 0, 6, dt);
      // Scroll-linked part: scrolling down slides the shelf one way, scrolling up slides it back.
      pending += delta * follow;
      const step = pending * (1 - Math.exp(-6 * dt));
      pending -= step;
      x -= (step + drift * heading * dt * (1 - hover)) * rowDir;
      const half = track.scrollWidth / 2;
      if (half > 0) {
        x %= half;
        if (x > 0) x -= half;
      }
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    };

    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);
    observer.observe(track);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
    };
  }, [reverse]);

  return (
    <div data-ec-row className="relative">
      <div data-ec-rowin>
        <div ref={trackRef} className="flex w-max gap-7 pt-10 will-change-transform sm:gap-9">
          {[...run, ...run].map((store, i) => <ShelfCard key={`${store.url}-${i}`} store={store} />)}
        </div>
      </div>
    </div>
  );
}

/** Ecommerce work: every client store on two shelves that slide with the scroll. */
export default function WorkEcommerce() {
  const root = useRef<HTMLElement | null>(null);
  const rows = [STORES.filter((_, i) => i % 2 === 0), STORES.filter((_, i) => i % 2 === 1)];

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-ec-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.12, scrollTrigger: { trigger: "[data-ec-head]", start: "top 88%", end: "top 50%", scrub: 0.65 } });
      // Shelves rise and fade in (vertical only, so they never pull against the sideways slide).
      gsap.utils.toArray<HTMLElement>("[data-ec-row]", element).forEach((row) => {
        gsap.fromTo(row.querySelector("[data-ec-rowin]"), { opacity: 0, y: 70 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: row, start: "top 98%", end: "top 60%", scrub: 0.65 } });
      });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="ecommerce" className="relative z-10 scroll-mt-24 overflow-x-clip py-[10vh] sm:py-[12vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Header */}
        <div data-ec-head className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.ember }} />02 — Ecommerce</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              STORES THAT<br /><span style={{ color: BRAND.ember }}>SELL ON REPEAT.</span>
            </h2>
          </div>
          <div className="max-w-[42ch]">
            <p className="text-[14px] leading-[1.65] text-ink/60">
              Online stores built to turn browsers into buyers: fast product pages, easy checkout,
              payments and inventory that just work, on every screen.
            </p>
            <div className="mt-5 flex gap-8 border-t border-ink/12 pt-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-none" style={{ color: BRAND.ember }}>{stat.value}</div>
                  <div className="mt-1.5 text-mono-9 tracking-[0.16em] text-ink/45 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shelves */}
      <div className="mt-12 flex flex-col gap-10 [--cw:clamp(260px,30vw,430px)] sm:gap-12">
        {rows.map((row, index) => <ShelfRow key={index} stores={row} reverse={index === 1} />)}
      </div>

      <style>{`
        @keyframes ec-swing { 0%, 100% { rotate: -5deg; } 50% { rotate: 5deg; } }
        .ec-swing { animation: ec-swing 3.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ec-swing { animation: none; } }
      `}</style>
    </section>
  );
}
