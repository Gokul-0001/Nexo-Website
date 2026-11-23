"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";
import { useMagnetic, usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────── Before → after sliders ──────────────────────────── */

type Role = "logo" | "link" | "heading" | "text" | "btn" | "image" | "card" | "phone";
/** [x, y, w, h] in % of the canvas, role, sketch label (before), finished copy (after). */
type Box = [x: number, y: number, w: number, h: number, role: Role, before?: string, after?: string];

type Showcase = {
  label: string;
  context: string;
  color: string;
  /** Font scale: canvas text is sized in container-width units, so narrow canvases need a larger multiplier. */
  k: number;
  /** Approximate canvas height ÷ width, used to size headings from their box height. */
  hr: number;
  boxes: Box[];
  notes: { x: number; y: number; text: string }[];
};

/** Figures in the "after" copy are illustrative examples, not client results. */
const WEBSITE: Showcase = {
  label: "Website", context: "Real estate", color: BRAND.cobalt, k: 1, hr: 0.75,
  notes: [{ x: 58, y: 57, text: "old site · no enquiries" }, { x: 30, y: 54.5, text: "show trust!" }, { x: 66, y: 96, text: "v1 · homepage sketch" }],
  boxes: [
    [4, 4, 12, 5, "logo", "LOGO", "Haven"], [36, 5, 42, 3, "link", "menu", "Buy   Rent   Sell   Projects   About"], [82, 3.5, 14, 6, "btn", "CTA", "Book a visit"],
    [4, 14, 52, 7, "heading", "BIG HEADLINE", "Find a home"], [4, 22, 46, 7, "heading", "", "you'll love."],
    [4, 32, 50, 3, "text", "", "Verified homes across Pune & Mumbai · zero brokerage"],
    [4, 39, 52, 10, "card", "search?"],
    [6, 42, 13, 4, "text", "", "📍 Pune"], [20, 42, 14, 4, "text", "", "₹80L – 1.5Cr"], [35, 42, 9, 4, "text", "", "3 BHK"], [45.5, 40.5, 9, 7, "btn", "GO", "Search"],
    [4, 52, 52, 3, "text", "", "★ 4.8 Google · 2,400+ homes sold · RERA verified"],
    [60, 13, 36, 43, "image", "HERO IMAGE", "Skyline Residences · Baner"],
    [62, 15, 18, 8, "card", "", "New launch"],
    [4, 60, 29, 35, "card", "listing"], [35.5, 60, 29, 35, "card", "listing"], [67, 60, 29, 35, "card", "listing"],
    [5.5, 62, 26, 17, "image", "photo", "Ready to move"], [37, 62, 26, 17, "image", "photo", "Sea view"], [68.5, 62, 26, 17, "image", "photo", "Gated society"],
    [5.5, 81, 26, 4, "text", "", "2 BHK · Wakad"], [37, 81, 26, 4, "text", "", "3 BHK · Baner"], [68.5, 81, 26, 4, "text", "", "4 BHK · Worli"],
    [5.5, 86.5, 26, 3, "text", "price?", "₹78 L · 1,050 sq ft"], [37, 86.5, 26, 3, "text", "price?", "₹1.2 Cr · 1,480 sq ft"], [68.5, 86.5, 26, 3, "text", "price?", "₹4.6 Cr · 2,300 sq ft"],
  ],
};

const APP: Showcase = {
  label: "App", context: "Healthcare", color: BRAND.mint, k: 2.15, hr: 1.75,
  notes: [{ x: 13, y: 47.5, text: "too many steps?" }, { x: 13, y: 90, text: "v1 · booking screen" }],
  boxes: [
    [5, 2.5, 90, 95, "phone"],
    [12, 6.5, 30, 3, "text", "", "9:41"], [62, 6.5, 26, 3, "text", "", "5G ▪▪▪"],
    [12, 11.5, 76, 5, "heading", "TITLE", "Dr. Mehta"],
    [12, 18, 76, 3, "text", "", "Cardiologist · 12 yrs"],
    [12, 23, 76, 23, "image", "photo", "★ 4.9 · 860 reviews"],
    [12, 50, 76, 3, "text", "", "Today, 22 Nov"],
    [12, 55, 23, 6.5, "card", "", "10:30"], [38.5, 55, 23, 6.5, "card", "", "11:15"], [65, 55, 23, 6.5, "card", "", "12:00"],
    [12, 65, 76, 3, "text", "", "Fee · ₹600 · Video"],
    [12, 70, 76, 7.5, "card", "pay?", "UPI · GPay ✓"],
    [12, 81, 76, 7, "btn", "BOOK", "Confirm · ₹600"],
  ],
};

function boxStyle(role: Role, color: string, finished: boolean): React.CSSProperties {
  if (!finished) {
    const dashed: React.CSSProperties = { border: "1.5px dashed rgba(14,15,20,0.28)", borderRadius: 8 };
    if (role === "text" || role === "link") return { background: "rgba(14,15,20,0.08)", borderRadius: 99 };
    if (role === "heading") return { background: "rgba(14,15,20,0.12)", borderRadius: 6 };
    if (role === "image") return { ...dashed, background: "linear-gradient(to top right, transparent calc(50% - 0.75px), rgba(14,15,20,0.14) 50%, transparent calc(50% + 0.75px)), linear-gradient(to bottom right, transparent calc(50% - 0.75px), rgba(14,15,20,0.14) 50%, transparent calc(50% + 0.75px))" };
    if (role === "btn" || role === "logo") return { ...dashed, borderRadius: 99 };
    if (role === "phone") return { ...dashed, borderRadius: 22 };
    return dashed;
  }
  switch (role) {
    case "logo": case "link": case "heading": case "text": return {};
    case "btn": return { background: color, borderRadius: 99, boxShadow: `0 8px 18px -10px ${color}` };
    case "image": return { background: `linear-gradient(135deg, ${color}, ${color}66)`, borderRadius: 12 };
    case "card": return { background: BRAND.paper, borderRadius: 12, boxShadow: "0 14px 28px -18px rgba(14,15,20,0.45)", border: "1px solid rgba(14,15,20,0.06)" };
    case "phone": return { background: `linear-gradient(160deg, ${color}26, ${BRAND.paper} 60%)`, border: `2px solid ${BRAND.ink}`, borderRadius: 22 };
  }
}

/** Typography for the copy inside each box, sized in container-width units so it scales with the card. */
function copyStyle(role: Role, h: number, w: number, show: Showcase, finished: boolean): React.CSSProperties {
  const fz = (n: number) => `${n * show.k}cqw`;
  if (!finished) {
    return { fontSize: fz(1.3), color: "rgba(14,15,20,0.45)", fontFamily: "var(--font-mono, ui-monospace, monospace)", letterSpacing: "0.08em", textTransform: "uppercase", justifyContent: "center", paddingLeft: w < 20 ? 0 : "6%", paddingRight: w < 20 ? 0 : "6%" };
  }
  const onAccent = show.color === BRAND.lime || show.color === BRAND.mint ? BRAND.ink : BRAND.paper;
  const base: React.CSSProperties = { justifyContent: "flex-start", paddingLeft: "6%", paddingRight: "6%" };
  switch (role) {
    case "heading": return { ...base, paddingLeft: 0, paddingRight: 0, fontSize: `${h * show.hr * 0.83}cqw`, fontWeight: 800, color: BRAND.ink, letterSpacing: "-0.02em" };
    case "logo": return { ...base, paddingLeft: 0, paddingRight: 0, fontSize: `${h * show.hr * 0.73}cqw`, fontWeight: 800, color: BRAND.ink };
    case "link": return { ...base, paddingLeft: 0, paddingRight: 0, fontSize: fz(1.45), color: "rgba(14,15,20,0.6)", justifyContent: "flex-end" };
    case "text": return { ...base, paddingLeft: 0, paddingRight: 0, fontSize: h >= 5 ? fz(2.1) : h >= 4 ? fz(1.7) : fz(1.45), fontWeight: h >= 4 ? 700 : 500, color: h >= 4 ? BRAND.ink : "rgba(14,15,20,0.66)" };
    case "btn": return { justifyContent: "center", fontSize: fz(1.35), fontWeight: 700, color: onAccent };
    case "image": return { ...base, alignItems: "flex-end", paddingBottom: "5%", fontSize: w < 30 && show.k === 1 ? fz(1.4) : fz(1.7), fontWeight: 700, color: onAccent };
    case "card": return { ...base, fontSize: fz(w < 10 || show.k > 1 ? 1.45 : 1.6), fontWeight: 700, color: BRAND.ink, justifyContent: w < 30 && show.k > 1 ? "center" : w < 10 ? "center" : "flex-start", paddingLeft: w < 10 ? 0 : w < 25 ? "4%" : "6%", paddingRight: w < 10 ? 0 : w < 25 ? "4%" : "6%" };
    default: return base;
  }
}

function Layout({ show, finished }: { show: Showcase; finished: boolean }) {
  return (
    <div className="absolute inset-0" style={{ background: finished ? `linear-gradient(180deg, ${show.color}14, transparent 60%), ${BRAND.paper}` : "#F7F7F4" }}>
      {!finished && <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(14,15,20,0.12) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />}
      {show.boxes.map(([x, y, w, h, role, before, after], i) => {
        const copy = finished ? after : before;
        const style = finished && copy && (role === "heading" || role === "text" || role === "logo" || role === "link") ? {} : boxStyle(role, show.color, finished);
        return (
          <span key={i} className={`absolute flex items-center overflow-hidden leading-[1.1] ${role === "card" || role === "image" ? "whitespace-normal" : "whitespace-nowrap"}`} style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, ...style, ...(copy ? copyStyle(role, h, w, show, finished) : {}) }}>
            {copy}
          </span>
        );
      })}
      {!finished && show.notes.map((note) => (
        <span key={note.text} className="absolute whitespace-nowrap font-serif italic" style={{ left: `${note.x}%`, top: `${note.y}%`, color: BRAND.ember, fontSize: `${1.7 * show.k}cqw` }}>
          {note.text}
        </span>
      ))}
    </div>
  );
}

/** A before → after card: the divider sweeps on its own and can be dragged. */
function SliderCard({ show, delay, className = "", canvasClass }: { show: Showcase; delay: number; className?: string; canvasClass: string }) {
  const canvas = useRef<HTMLDivElement | null>(null);
  const sweep = useRef<gsap.core.Timeline | null>(null);
  const resume = useRef<number | null>(null);
  const dragging = useRef(false);
  const reduce = usePrefersReducedMotion();
  const setPos = (value: number) => canvas.current?.style.setProperty("--pos", `${value}%`);

  useLayoutEffect(() => {
    setPos(reduce ? 50 : 18);
    if (reduce) return;
    const pos = { v: 18 };
    sweep.current = gsap.timeline({ repeat: -1, delay })
      .to(pos, { v: 84, duration: 2.4, ease: "power2.inOut", onUpdate: () => setPos(pos.v) })
      .to(pos, { v: 84, duration: 1.4 })
      .to(pos, { v: 18, duration: 1.8, ease: "power2.inOut", onUpdate: () => setPos(pos.v) })
      .to(pos, { v: 18, duration: 0.6 });
    return () => { sweep.current?.kill(); if (resume.current) window.clearTimeout(resume.current); };
  }, [reduce, delay]);

  const moveTo = (clientX: number) => {
    const rect = canvas.current?.getBoundingClientRect();
    if (rect) setPos(Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100)));
  };
  const onDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    sweep.current?.pause();
    if (resume.current) window.clearTimeout(resume.current);
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* ignore */ }
    moveTo(event.clientX);
  };
  const onMove = (event: React.PointerEvent<HTMLDivElement>) => { if (dragging.current) moveTo(event.clientX); };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    resume.current = window.setTimeout(() => sweep.current?.play(), 2400);
  };

  const onAccent = show.color === BRAND.lime || show.color === BRAND.mint ? BRAND.ink : BRAND.paper;

  return (
    <div data-bento className={`group relative flex w-full flex-col overflow-hidden rounded-[22px] border border-ink/12 bg-paper shadow-[0_40px_80px_-50px_rgba(14,15,20,0.7)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-ink/10 bg-ink/[0.03] px-3 py-2.5">
        <span className="flex gap-1">{[BRAND.ember, BRAND.lime, BRAND.mint].map((c) => <i key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}</span>
        <span className="rounded-full border border-ink/12 bg-paper px-2 py-0.5 text-[8px] font-semibold tracking-[0.16em] text-ink/55 uppercase">Before</span>
        <span className="mx-auto truncate text-mono-9 tracking-[0.14em] text-ink/45 uppercase">{show.label} · {show.context}</span>
        <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-semibold tracking-[0.16em] uppercase" style={{ background: show.color, color: onAccent }}><i className="h-1 w-1 animate-pulse rounded-full" style={{ background: onAccent }} />After</span>
      </div>
      <div
        ref={canvas}
        data-cursor="drag"
        data-cursor-label="DRAG"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className={`@container relative cursor-ew-resize touch-pan-y select-none [--pos:18%] ${canvasClass}`}
      >
        <Layout show={show} finished={false} />
        <div className="absolute inset-0" style={{ clipPath: "inset(0 0 0 var(--pos))" }}>
          <Layout show={show} finished />
        </div>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: "var(--pos)" }}>
          <span className="absolute inset-y-0 -left-px w-[2px]" style={{ background: BRAND.ink }} />
          <span className="absolute left-0 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 bg-paper shadow-[0_10px_24px_-10px_rgba(14,15,20,0.6)]" style={{ borderColor: BRAND.ink }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={BRAND.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── Live widgets ──────────────────────────── */

const cardBase = "relative flex flex-col overflow-hidden rounded-[22px] border border-ink/10 p-4 shadow-[0_34px_64px_-40px_rgba(14,15,20,0.65)]";
const tileLabel = "flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.16em] uppercase";

const CITIES = ["Pune", "Mumbai", "Delhi", "Jaipur", "Bengaluru"];

/** Ecommerce: a product card whose "Add to cart" keeps converting into orders. */
function StoreWidget() {
  const [tick, setTick] = useState(0);
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((value) => value + 1), 2600);
    return () => window.clearInterval(id);
  }, [reduce]);
  const sales = 48290 + tick * 1299;
  return (
    <div data-bento className={`${cardBase} bg-paper`}>
      <div className="flex items-center justify-between">
        <span className={tileLabel} style={{ color: BRAND.ember }}><i className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: BRAND.ember }} />Online store</span>
        <span className="relative grid h-7 w-7 place-items-center rounded-full border border-ink/10">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke={BRAND.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 11h11L21 7H6" /><circle cx="9" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></svg>
          <span key={tick} className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[8px] font-bold text-paper" style={{ background: BRAND.ember, animation: reduce ? undefined : "wh-badge 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>{(tick % 9) + 1}</span>
        </span>
      </div>

      {/* Product */}
      <div className="mt-3 flex gap-3">
        <div className="relative grid h-[74px] w-[64px] shrink-0 place-items-center overflow-hidden rounded-[12px]" style={{ background: `linear-gradient(150deg, ${BRAND.ember}, #ff9a7a)` }}>
          <svg viewBox="0 0 40 48" className="h-12 w-10" aria-hidden><path d="M14 4h12l3 6 7 3-4 9-3-1v23H11V21l-3 1-4-9 7-3Z" fill="rgba(255,255,255,0.9)" /><path d="M20 10v14M16 16h8M16 22h8" stroke={BRAND.ember} strokeWidth="1.6" strokeLinecap="round" /></svg>
          <span className="absolute left-1 top-1 rounded-full bg-paper px-1.5 py-0.5 text-[7px] font-bold" style={{ color: BRAND.ember }}>−30%</span>
        </div>
        <div className="min-w-0 flex-1">
          <span className="block truncate text-[11px] font-semibold leading-tight text-ink">Block-print kurta</span>
          <span className="mt-1 flex items-baseline gap-1.5"><span className="display text-[0.95rem] leading-none" style={{ color: BRAND.ink }}>₹1,299</span><span className="text-[9px] text-ink/40 line-through">₹1,899</span></span>
          <span className="mt-1 block text-[9px] text-ink/55">★ 4.6 · 212 reviews</span>
          <span className="mt-1.5 flex gap-1">{["S", "M", "L"].map((size) => <span key={size} className="grid h-4 w-5 place-items-center rounded text-[8px] font-semibold" style={{ background: size === "M" ? BRAND.ink : "rgba(14,15,20,0.06)", color: size === "M" ? BRAND.paper : "rgba(14,15,20,0.6)" }}>{size}</span>)}</span>
        </div>
      </div>
      <span key={`btn-${tick}`} className="mt-3 grid h-8 place-items-center rounded-full text-[10px] font-bold text-paper" style={{ background: BRAND.ember, animation: reduce ? undefined : "wh-press 2.6s ease-in-out" }}>Add to cart</span>

      {/* Order toast */}
      <div key={`toast-${tick}`} className="mt-2.5 flex items-center gap-2 rounded-[10px] px-2 py-1.5" style={{ background: `${BRAND.ember}14`, animation: reduce ? undefined : "wh-drop 0.6s 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>
        <span className="grid h-4 w-4 place-items-center rounded-full text-[8px] text-paper" style={{ background: BRAND.ember }}>✓</span>
        <span className="truncate text-[9px] font-semibold text-ink">Order placed · {CITIES[tick % CITIES.length]} · just now</span>
      </div>

      <div className="mt-2.5 flex items-end justify-between border-t border-dashed border-ink/15 pt-2">
        <span className="text-[8.5px] tracking-[0.12em] text-ink/45 uppercase">Today&apos;s sales</span>
        <span className="display text-[0.95rem] leading-none tabular-nums" style={{ color: BRAND.ember }}>₹{sales.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

/** Digital marketing: a growth graph, channel bars and campaign KPIs. */
function CampaignWidget() {
  return (
    <div data-bento className={`${cardBase} bg-paper`}>
      <div className="flex items-center justify-between">
        <span className={`${tileLabel} text-ink`}><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 0 2px ${BRAND.ink}` }} />Campaign</span>
        <span className="rounded-full px-2 py-0.5 text-[8px] font-bold text-ink" style={{ background: BRAND.lime }}>+64% leads</span>
      </div>

      {/* Growth graph */}
      <div className="relative mt-2.5 rounded-[12px] p-2" style={{ background: BRAND.ink }}>
        <div className="flex items-center justify-between text-[8px] text-paper/55"><span>Enquiries · 6 weeks</span><span style={{ color: BRAND.lime }}>486</span></div>
        <svg viewBox="0 0 160 56" className="mt-1 h-14 w-full overflow-visible" aria-hidden>
          {[14, 28, 42].map((y) => <path key={y} d={`M0 ${y}H160`} stroke="rgba(255,255,255,0.08)" />)}
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} className="wh-bar" x={6 + i * 26} y={56 - [14, 20, 18, 28, 36, 46][i]} width="14" height={[14, 20, 18, 28, 36, 46][i]} rx="3" fill="rgba(255,255,255,0.14)" style={{ animationDelay: `${i * 0.12}s` }} />)}
          <path d="M13 46 L39 38 L65 40 L91 28 L117 18 L143 8 L143 56 L13 56 Z" fill={`${BRAND.lime}26`} className="wh-area" />
          <path className="wh-line" d="M13 46 L39 38 L65 40 L91 28 L117 18 L143 8" fill="none" stroke={BRAND.lime} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle className="wh-dot" cx="143" cy="8" r="3.5" fill={BRAND.lime} />
        </svg>
      </div>

      {/* Channel split */}
      <div className="mt-2.5 space-y-1.5">
        {[["Meta ads", 72, BRAND.cobalt], ["Google", 54, BRAND.ember], ["SEO", 38, BRAND.mint]].map(([name, value, color]) => (
          <div key={name as string} className="flex items-center gap-2 text-[8.5px]">
            <span className="w-11 shrink-0 text-ink/60">{name}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8"><span className="wh-fill block h-full rounded-full" style={{ width: `${value}%`, background: color as string }} /></span>
            <span className="w-6 text-right font-semibold text-ink">{value}%</span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-1.5 border-t border-dashed border-ink/15 pt-2">
        <span><span className="block text-[8px] tracking-[0.1em] text-ink/45 uppercase">Cost / lead</span><span className="display text-[0.9rem] leading-none text-ink">₹180</span></span>
        <span><span className="block text-[8px] tracking-[0.1em] text-ink/45 uppercase">Admissions</span><span className="display text-[0.9rem] leading-none text-ink">38</span></span>
      </div>
    </div>
  );
}

const TASKS = ["Invoice #1042 sent", "Courier booked", "Stock synced", "Customer messaged", "CRM updated"];

/** Automation: a hub that fans tasks out to connected tools, with an auto-mode switch and task counter. */
function WorkflowWidget() {
  const [tick, setTick] = useState(0);
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((value) => value + 1), 1500);
    return () => window.clearInterval(id);
  }, [reduce]);
  const tools = [
    { label: "Shopify", x: 20, y: 18 },
    { label: "Tally", x: 80, y: 18 },
    { label: "WhatsApp", x: 20, y: 82 },
    { label: "CRM", x: 80, y: 82 },
  ];
  const active = tick % tools.length;
  return (
    <div data-bento className={`${cardBase} text-paper`} style={{ background: BRAND.ink }}>
      <div className="flex items-center justify-between">
        <span className={tileLabel} style={{ color: BRAND.lime }}>Automation</span>
        <span className="flex items-center gap-1.5 text-[8px] font-semibold tracking-[0.12em] text-paper/70 uppercase">
          Auto
          <span className="relative h-3.5 w-6 rounded-full" style={{ background: BRAND.lime }}><span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full" style={{ background: BRAND.ink }} /></span>
        </span>
      </div>

      {/* Hub and spokes */}
      <div className="relative mt-2 aspect-[1.35]">
        <svg viewBox="0 0 100 74" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          {tools.map((tool, index) => (
            <path key={tool.label} className="wh-dash" d={`M50 37 L${tool.x} ${tool.y * 0.74}`} stroke={index === active ? BRAND.lime : "rgba(255,255,255,0.22)"} strokeWidth={index === active ? 1.6 : 1} strokeDasharray="3 3" />
          ))}
        </svg>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full" style={{ background: BRAND.lime }}>
          <span className="anim-spin-slow absolute -inset-1.5 rounded-full border border-dashed" style={{ borderColor: `${BRAND.lime}88`, animationDuration: "8s" }} />
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={BRAND.ink}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
        </span>
        {tools.map((tool, index) => (
          <span key={tool.label} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-[8px] font-semibold transition-colors duration-500" style={{ left: `${tool.x}%`, top: `${tool.y}%`, background: index === active ? BRAND.lime : "rgba(255,255,255,0.08)", color: index === active ? BRAND.ink : "rgba(255,255,255,0.8)", borderColor: index === active ? BRAND.lime : "rgba(255,255,255,0.15)" }}>
            {tool.label}
          </span>
        ))}
      </div>

      <div key={tick} className="mt-2 flex items-center gap-1.5 rounded-[8px] bg-paper/10 px-2 py-1.5 text-[9px]" style={{ animation: reduce ? undefined : "wh-drop 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <span style={{ color: BRAND.lime }}>✓</span><span className="truncate text-paper/85">{TASKS[tick % TASKS.length]} · 2s</span>
      </div>
      <div className="mt-2.5 flex items-end justify-between border-t border-dashed border-paper/20 pt-2">
        <span className="text-[8.5px] tracking-[0.12em] text-paper/50 uppercase">Tasks run</span>
        <span className="display text-[0.95rem] leading-none tabular-nums" style={{ color: BRAND.lime }}>{(1284 + tick).toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

/** Where each card hangs on the orbit (sm and up). */
const PLACES = {
  website: { l: "0%", t: "9%", w: "56%" },
  app: { l: "71%", t: "1%", w: "28%" },
  store: { l: "5%", t: "60%", w: "32%" },
  campaign: { l: "40%", t: "67%", w: "28%" },
  automation: { l: "72%", t: "59%", w: "27%" },
} as const;

function Hang({ place, children, className = "" }: { place: { l: string; t: string; w: string }; children: React.ReactNode; className?: string }) {
  return (
    <div data-hang className={`relative sm:absolute sm:left-[var(--l)] sm:top-[var(--t)] sm:w-[var(--w)] ${className}`} style={{ "--l": place.l, "--t": place.t, "--w": place.w } as React.CSSProperties}>
      {children}
    </div>
  );
}

/** The work showcase: five cards hanging over an animated orbit. */
function WorkBento() {
  const root = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-orbit-ring]", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: "expo.out", stagger: 0.12, delay: 0.2 });
      gsap.fromTo("[data-bento]", { opacity: 0, y: 46, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: "expo.out", stagger: 0.1, delay: 0.4 });
      // Each card hangs and drifts on its own rhythm.
      gsap.utils.toArray<HTMLElement>("[data-hang]", element).forEach((card, index) => {
        gsap.to(card, { y: index % 2 ? 9 : -9, rotation: index % 2 ? 0.45 : -0.45, transformOrigin: "50% 0%", duration: 3.4 + index * 0.55, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.2 + index * 0.25 });
      });
      gsap.timeline({ scrollTrigger: { trigger: element, start: "top 30%", end: "bottom top", scrub: 0.7 } })
        .to(element, { yPercent: -6, opacity: 0, ease: "none" }, 0);
    }, element);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[660px] max-sm:flex max-sm:flex-col max-sm:gap-3 sm:aspect-[1/1.08]">
      {/* Orbit background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center max-sm:hidden">
        <div className="anim-drift absolute inset-[18%] rounded-full blur-[80px]" style={{ background: `conic-gradient(from 120deg, ${BRAND.cobalt}33, ${BRAND.mint}30, ${BRAND.lime}26, ${BRAND.ember}2e, ${BRAND.cobalt}33)` }} />
        {[
          { size: 128, dur: "70s", reverse: false, dash: "2 9", dot: BRAND.cobalt },
          { size: 100, dur: "48s", reverse: true, dash: "", dot: BRAND.ember },
          { size: 72, dur: "32s", reverse: false, dash: "4 6", dot: BRAND.mint },
          { size: 44, dur: "20s", reverse: true, dash: "", dot: BRAND.lime },
        ].map((ring) => (
          <div key={ring.size} data-orbit-ring className="absolute aspect-square" style={{ width: `${ring.size}%` }}>
            <div className="absolute inset-0" style={{ animation: `kroma-spin ${ring.dur} linear infinite`, animationDirection: ring.reverse ? "reverse" : "normal" }}>
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
                <circle cx="50" cy="50" r="49.5" fill="none" stroke="rgba(14,15,20,0.2)" strokeWidth="1.2" strokeDasharray={ring.dash || undefined} vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-paper" style={{ background: ring.dot, boxShadow: `0 0 14px ${ring.dot}` }} />
              <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full" style={{ background: ring.dot, opacity: 0.6 }} />
            </div>
          </div>
        ))}
        <div data-orbit-ring className="absolute grid h-[11%] w-[11%] place-items-center rounded-full" style={{ background: BRAND.ink }}>
          <span className="absolute -inset-1 animate-ping rounded-full opacity-20" style={{ background: BRAND.lime, animationDuration: "2.8s" }} />
          <span className="display text-[clamp(0.55rem,1vw,0.75rem)] leading-none text-paper">NEXO</span>
        </div>
      </div>

      {/* Hanging cards */}
      <Hang place={PLACES.website} className="z-[2]"><SliderCard show={WEBSITE} delay={1.2} canvasClass="aspect-[4/3]" /></Hang>
      <Hang place={PLACES.app} className="z-[3] max-sm:mx-auto max-sm:w-[62%]"><SliderCard show={APP} delay={2.4} canvasClass="aspect-[9/15.5]" /></Hang>
      <Hang place={PLACES.store} className="z-[4]"><StoreWidget /></Hang>
      <Hang place={PLACES.campaign} className="z-[5]"><CampaignWidget /></Hang>
      <Hang place={PLACES.automation} className="z-[4]"><WorkflowWidget /></Hang>

      <style>{`
        @keyframes wh-drop { from { opacity: 0; transform: translateY(-8px) scale(0.96); } to { opacity: 1; transform: none; } }
        @keyframes wh-badge { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes wh-press { 0%, 8% { transform: scale(1); } 12% { transform: scale(0.92); filter: brightness(1.1); } 18%, 100% { transform: scale(1); } }
        @keyframes wh-fill { 0% { transform: scaleX(0); } 45%, 100% { transform: scaleX(1); } }
        @keyframes wh-bar { 0% { transform: scaleY(0.2); } 45%, 100% { transform: scaleY(1); } }
        @keyframes wh-line { 0% { stroke-dashoffset: 200; } 55%, 100% { stroke-dashoffset: 0; } }
        @keyframes wh-fade { 0%, 35% { opacity: 0; } 60%, 100% { opacity: 1; } }
        @keyframes wh-dash { to { stroke-dashoffset: -12; } }
        .wh-fill { transform-origin: left; animation: wh-fill 4s cubic-bezier(.65,0,.35,1) infinite; }
        .wh-bar { transform-box: fill-box; transform-origin: bottom; animation: wh-bar 4s cubic-bezier(.65,0,.35,1) infinite; }
        .wh-line { stroke-dasharray: 200; animation: wh-line 4s cubic-bezier(.65,0,.35,1) infinite; }
        .wh-area, .wh-dot { animation: wh-fade 4s ease infinite; }
        .wh-dash { animation: wh-dash 0.8s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .wh-fill, .wh-bar, .wh-line, .wh-area, .wh-dot, .wh-dash { animation: none; } }
      `}</style>
    </div>
  );
}

/* ──────────────────────────── Header ──────────────────────────── */

const SERVICES = [
  { label: "Website", color: BRAND.cobalt },
  { label: "Online store", color: BRAND.ember },
  { label: "Mobile app", color: BRAND.mint },
  { label: "Marketing", color: BRAND.lime },
  { label: "Automation", color: BRAND.ink },
];

/** Work page header: copy on the left, the work bento on the right. */
export default function WorkHero() {
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
      gsap.fromTo("[data-work-fade]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.05, ease: "expo.out", stagger: 0.08, delay: 0.18 });
      gsap.timeline({ scrollTrigger: { trigger: element, start: "top top", end: "bottom top", scrub: 0.7 } })
        .to(copy.current, { yPercent: -8, opacity: 0, ease: "none" }, 0);
    }, element);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={root} className="relative isolate z-10 min-h-[100svh]">
      <div className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="anim-drift absolute -left-[12vw] top-[6vh] h-[46vh] w-[46vh] rounded-full blur-[100px]" style={{ background: `radial-gradient(circle, ${BRAND.cobalt}26, transparent 70%)` }} />
          <div className="anim-drift absolute right-[-10vw] top-[30vh] h-[44vh] w-[44vh] rounded-full blur-[105px]" style={{ background: `radial-gradient(circle, ${BRAND.ember}24, transparent 70%)`, animationDelay: "-9s" }} />
          <div className="grain absolute inset-0 opacity-[0.09] mix-blend-multiply" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 items-center px-5 py-28 sm:px-8 lg:py-20">
          <div className="grid w-full min-w-0 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div ref={copy} className="min-w-0">
              <div data-work-fade className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="eyebrow flex items-center gap-2 text-ink/55"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />Selected work</span>
                <span className="hidden h-3 w-px bg-ink/15 sm:block" />
                <span className="eyebrow text-ink/40">Web · Commerce · Apps · Marketing · Automation</span>
              </div>
              <h1 className="display text-h1 [text-shadow:0_0_48px_rgba(255,255,255,0.9)]">
                <SplitLines
                  as="span"
                  from="load"
                  stagger={0.13}
                  lines={["WORK THAT", "WORKS."]}
                  className="block"
                  lineClassName="pb-[0.02em]"
                  render={(line, i) => i === 1 ? (
                    <span className="block bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, ${BRAND.mint} 30%, ${BRAND.ink} 54%, ${BRAND.ember} 74%, ${BRAND.cobalt})`, backgroundSize: "300% 100%", animation: reduce ? undefined : "kroma-gradient-pan 11s linear infinite" }}>{line}</span>
                  ) : line}
                />
              </h1>
              <div className="mt-10 flex flex-col gap-6">
                <p data-work-fade className="max-w-[44ch] text-[14px] leading-[1.65] text-ink/65 sm:text-[15.5px]">
                  Websites, online stores, apps, campaigns and automations built for businesses across
                  India and beyond. Every project starts as a rough idea and ends as something measurable
                  that works for your business.
                </p>
                <div data-work-fade className="flex flex-wrap items-center gap-3">
                  <a ref={cta} href="#website" data-cursor="magnet" className="group relative overflow-hidden rounded-full px-7 py-4 text-mono-10-5 tracking-[0.18em] text-paper uppercase" style={{ background: BRAND.ink }}>
                    <span className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" style={{ background: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.ember} 60%, ${BRAND.mint})` }} />
                    <span className="relative flex items-center gap-2">Explore the work <span>↓</span></span>
                  </a>
                  <a ref={secondary} href="/contact" data-cursor="link" className="flex items-center gap-3 rounded-full border border-ink/15 bg-paper/70 px-6 py-4 text-mono-10-5 tracking-[0.18em] text-ink/70 uppercase backdrop-blur-sm transition-colors duration-500 hover:border-ink/40 hover:text-ink">
                    Start a project <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.ember }} />
                  </a>
                </div>
              </div>
            </div>
            <div data-work-fade className="min-w-0"><WorkBento /></div>
          </div>
        </div>

        <div data-work-fade className="relative mx-auto w-full max-w-[1440px] px-5 pb-6 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-4">
            <span className="eyebrow text-ink/45">Selected projects</span>
            <div className="hidden gap-8 md:flex">
              {SERVICES.map((entry) => (
                <span key={entry.label} className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: entry.color }} />{entry.label}</span>
              ))}
            </div>
            <span className="eyebrow text-ink/45">India · Worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
