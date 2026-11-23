"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND, SERVICE_PAGES } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

/** Headline figures — confirm these values before launch. */
const FIGURES = {
  projects: { value: 214, label: "Websites, apps, online stores and campaigns launched for clients" },
  reply: { value: 24, suffix: "h", label: "Typical founder reply" },
} as const;

const SERVICE_DETAILS: Record<string, { line: string; offers: string[]; color: string; icon: string }> = {
  "website-development": { line: "Fast, search-friendly websites built to convert visitors into customers.", offers: ["Business sites", "Landing pages", "CMS"], color: BRAND.cobalt, icon: "M3 5h18v14H3zM3 9h18M6 7h.01M8.5 7h.01" },
  ecommerce: { line: "Online stores that sell, scale and keep customers coming back.", offers: ["Storefronts", "Payments", "Inventory"], color: BRAND.ember, icon: "M6 8h12l-1 12H7L6 8ZM9 8a3 3 0 0 1 6 0" },
  "app-development": { line: "iOS, Android and cross-platform apps people actually keep using.", offers: ["iOS", "Android", "Cross-platform"], color: BRAND.mint, icon: "M7 3h10v18H7zM11 18h2" },
  "digital-marketing": { line: "SEO, paid campaigns and social that bring the right people to you.", offers: ["SEO", "Paid ads", "Social media"], color: BRAND.lime, icon: "M3 20h18M5 16l5-5 4 3 6-7M15 7h5v5" },
  automation: { line: "Workflows, integrations and AI tools that save your team hours every week.", offers: ["Workflows", "Integrations", "AI tools"], color: BRAND.cobalt, icon: "M13 3 5 14h6l-1 7 8-11h-6l1-7Z" },
};

const INDUSTRIES = [
  { name: "Retail & D2C", color: BRAND.ember, icon: "M6 7h12l-1 13H7L6 7ZM9 7a3 3 0 0 1 6 0" },
  { name: "Healthcare", color: BRAND.mint, icon: "M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" },
  { name: "Fintech", color: BRAND.cobalt, icon: "M3 6h18v12H3zM3 10h18M7 15h4" },
  { name: "Education", color: BRAND.lime, icon: "M2 9l10-5 10 5-10 5L2 9ZM6 11v5c2 2 10 2 12 0v-5" },
  { name: "Real estate", color: BRAND.ember, icon: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6" },
  { name: "Hospitality", color: BRAND.mint, icon: "M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8ZM17 10h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2" },
  { name: "SaaS & Tech", color: BRAND.cobalt, icon: "M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1 0 9H7Z" },
  { name: "Manufacturing", color: BRAND.lime, icon: "M3 20V10l6 4V10l6 4V6h6v14H3Z" },
  { name: "Media", color: BRAND.ember, icon: "M4 5h16v14H4zM10 9l5 3-5 3V9Z" },
  { name: "Logistics", color: BRAND.mint, icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7M5 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0M15 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0" },
  { name: "Non-profit", color: BRAND.cobalt, icon: "M12 20s-7-4.5-9-9C1.6 7.6 4 4 7.5 4c2 0 3.5 1.2 4.5 2.6C13 5.2 14.5 4 16.5 4 20 4 22.4 7.6 21 11c-2 4.5-9 9-9 9Z" },
  { name: "Travel", color: BRAND.lime, icon: "M21 4 3 11l7 2 2 7 9-16Z" },
];

const COMMITMENTS = ["Fixed, written scope", "NDA on request", "Progress you can see every week", "Support after launch"];

const tile = "relative overflow-hidden rounded-[24px] border border-ink/10 p-6 shadow-[0_30px_60px_-46px_rgba(14,15,20,0.6)] sm:p-7";
const mono = "text-mono-9 tracking-[0.18em] uppercase";
/** Same scrubbed reveal the other About sections use, so it replays on every pass. */
const SCRUB = { start: "top 90%", end: "top 58%", scrub: 0.65 } as const;

function Icon({ d, className = "h-5 w-5", color = "currentColor" }: { d: string; className?: string; color?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>;
}

/** Looping mini illustration for each service, drawn in the card's text colour. */
function ServiceArt({ slug }: { slug: string }) {
  const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  const soft = { fill: "currentColor", fillOpacity: 0.14 } as const;
  const solid = { fill: "currentColor", fillOpacity: 0.85 } as const;
  const d = (seconds: number) => ({ animationDelay: `${seconds}s` });

  if (slug === "website-development") {
    return (
      <svg viewBox="0 0 240 96" className="h-full w-full overflow-visible" aria-hidden>
        <rect x="1" y="1" width="238" height="94" rx="10" {...line} strokeOpacity="0.55" fill="currentColor" fillOpacity="0.06" />
        <path d="M1 19h238" {...line} strokeOpacity="0.4" />
        {[12, 21, 30].map((x) => <circle key={x} cx={x} cy="10" r="2.6" fill="currentColor" fillOpacity="0.6" />)}
        <rect className="sp-grow" x="14" y="30" width="118" height="11" rx="3" {...solid} />
        <rect className="sp-grow" x="14" y="47" width="168" height="5" rx="2.5" {...soft} fillOpacity="0.4" style={d(0.25)} />
        <rect className="sp-grow" x="14" y="57" width="140" height="5" rx="2.5" {...soft} fillOpacity="0.4" style={d(0.4)} />
        <rect className="sp-pop" x="14" y="70" width="50" height="15" rx="7.5" {...solid} style={d(0.7)} />
        <g className="sp-fade" style={d(0.2)}>
          <rect x="160" y="28" width="66" height="56" rx="7" fill="currentColor" fillOpacity="1" />
        </g>
        <path className="sp-pop" d="M168 76l14-16 10 10 8-7 18 13Z" fill="currentColor" fillOpacity="0.5" style={d(0.5)} />
      </svg>
    );
  }
  if (slug === "ecommerce") {
    return (
      <svg viewBox="0 0 240 96" className="h-full w-full overflow-visible" aria-hidden>
        <rect x="2" y="4" width="96" height="88" rx="9" {...line} strokeOpacity="0.55" fill="currentColor" fillOpacity="0.06" />
        <rect x="11" y="13" width="78" height="42" rx="6" {...soft} />
        <rect x="11" y="63" width="44" height="6" rx="3" fill="currentColor" fillOpacity="0.7" />
        <rect x="11" y="74" width="28" height="5" rx="2.5" {...soft} fillOpacity="0.35" />
        <circle cx="80" cy="72" r="9" fill="currentColor" fillOpacity="0.9" />
        <path d="M80 67.5v9M75.5 72h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="sp-invert" />
        <path d="M150 34h13l10 36h44l8-26h-56" {...line} strokeWidth="2" />
        <circle cx="180" cy="82" r="4.5" {...line} strokeWidth="2" />
        <circle cx="210" cy="82" r="4.5" {...line} strokeWidth="2" />
        <rect x="-6" y="-6" width="12" height="12" rx="3" fill="currentColor">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M80 72 C 120 4, 170 4, 196 54" keyPoints="0;1;1" keyTimes="0;0.55;1" calcMode="linear" />
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.08;0.5;0.6;1" dur="2.6s" repeatCount="indefinite" />
        </rect>
        <g className="sp-badge">
          <circle cx="228" cy="34" r="9" fill="currentColor" />
          <path d="M224.5 34l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" className="sp-invert" />
        </g>
      </svg>
    );
  }
  if (slug === "app-development") {
    return (
      <svg viewBox="0 0 240 96" className="h-full w-full overflow-visible" aria-hidden>
        <defs><clipPath id="sp-screen"><rect x="97" y="15" width="46" height="70" rx="4" /></clipPath></defs>
        <rect x="91" y="2" width="58" height="92" rx="11" {...line} strokeWidth="1.8" fill="currentColor" fillOpacity="0.06" />
        <rect x="110" y="7" width="20" height="4" rx="2" fill="currentColor" fillOpacity="0.6" />
        <g clipPath="url(#sp-screen)">
          <g className="sp-slide">
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${97 + i * 46} 15)`}>
                <rect width="46" height="70" fill="currentColor" fillOpacity={[0.16, 0.28, 0.1][i]} />
                <rect x="6" y="8" width="34" height="22" rx="4" fill="currentColor" fillOpacity="0.5" />
                <rect x="6" y="36" width="26" height="4" rx="2" fill="currentColor" fillOpacity="0.7" />
                <rect x="6" y="44" width="30" height="4" rx="2" fill="currentColor" fillOpacity="0.35" />
                <rect x="6" y="56" width="34" height="8" rx="4" fill="currentColor" fillOpacity="0.8" />
              </g>
            ))}
          </g>
        </g>
        <g className="sp-pop" style={d(0.4)}>
          <rect x="8" y="16" width="72" height="24" rx="12" fill="currentColor" fillOpacity="0.9" />
          <rect x="18" y="25" width="40" height="5" rx="2.5" fill="currentColor" className="sp-invert-fill" />
        </g>
        <g className="sp-pop" style={d(1.2)}>
          <rect x="160" y="56" width="72" height="24" rx="12" {...line} fill="currentColor" fillOpacity="0.12" />
          <rect x="170" y="65" width="44" height="5" rx="2.5" fill="currentColor" fillOpacity="0.7" />
        </g>
      </svg>
    );
  }
  if (slug === "digital-marketing") {
    return (
      <svg viewBox="0 0 240 96" className="h-full w-full overflow-visible" aria-hidden>
        <path d="M6 92h228" {...line} strokeOpacity="0.4" />
        {[30, 44, 40, 60, 76].map((h, i) => (
          <rect key={i} className="sp-bar" x={18 + i * 36} y={90 - h} width="22" height={h} rx="4" fill="currentColor" fillOpacity={0.18 + i * 0.12} style={d(i * 0.18)} />
        ))}
        <path className="sp-dash" d="M18 70 L62 56 L98 60 L134 38 L178 22 L222 8" {...line} strokeWidth="2.2" />
        <path className="sp-pop" d="M210 5 L223 7.5 L219 20" {...line} strokeWidth="2.2" style={d(1.4)} />
        <g className="sp-pop" style={d(1.6)}>
          <rect x="150" y="44" width="60" height="22" rx="11" fill="currentColor" fillOpacity="0.9" />
          <path d="M160 58l6-6 4 4 7-8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" className="sp-invert" />
          <rect x="182" y="52" width="20" height="5" rx="2.5" fill="currentColor" className="sp-invert-fill" />
        </g>
      </svg>
    );
  }
  // automation
  const flows = ["M56 48 C 76 48, 76 22, 96 22", "M56 48 C 76 48, 76 74, 96 74", "M144 22 C 164 22, 166 48, 186 48", "M144 74 C 164 74, 166 48, 186 48"];
  return (
    <svg viewBox="0 0 240 96" className="h-full w-full overflow-visible" aria-hidden>
      {flows.map((path) => <path key={path} d={path} {...line} strokeOpacity="0.45" strokeDasharray="3 4" />)}
      {[[8, 34], [96, 8], [96, 60], [186, 34]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="48" height="28" rx="8" fill="currentColor" fillOpacity={i === 0 || i === 3 ? 0.85 : 0.16} stroke="currentColor" strokeOpacity="0.5" />
      ))}
      <path d="M26 48l4-7v5h4l-4 7v-5h-4Z" fill="currentColor" className="sp-invert-fill" />
      <rect x="104" y="19" width="32" height="5" rx="2.5" fill="currentColor" fillOpacity="0.6" />
      <rect x="104" y="71" width="26" height="5" rx="2.5" fill="currentColor" fillOpacity="0.6" />
      <circle className="sp-spin" cx="210" cy="48" r="7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeDasharray="4 3" style={{ stroke: "var(--sp-invert)" }} />
      {flows.map((path, i) => (
        <circle key={`p${i}`} r="3.6" fill="currentColor">
          <animateMotion dur="1.6s" begin={`${(i % 2) * 0.25 + (i > 1 ? 0.8 : 0)}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
    </svg>
  );
}

export default function AboutProof() {
  const root = useRef<HTMLElement | null>(null);
  const [service, setService] = useState(0);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-proof-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.12, scrollTrigger: { trigger: element, start: "top 80%", end: "top 45%", scrub: 0.7 } });

      gsap.utils.toArray<HTMLElement>("[data-tile]").forEach((card, index) => {
        gsap.fromTo(card, { opacity: 0, y: 70, rotate: index % 2 ? 1.6 : -1.6 }, { opacity: 1, y: 0, rotate: 0, ease: "none", scrollTrigger: { trigger: card, ...SCRUB } });
      });

      gsap.fromTo("[data-svc]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.08, scrollTrigger: { trigger: "[data-svc-rail]", start: "top 88%", end: "top 55%", scrub: 0.65 } });
      gsap.fromTo("[data-ind]", { opacity: 0, x: (i) => (i % 2 ? -60 : 60) }, { opacity: 1, x: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: "[data-ind-rows]", start: "top 92%", end: "top 60%", scrub: 0.65 } });
      gsap.fromTo("[data-commit]", { opacity: 0, x: -20 }, { opacity: 1, x: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: "[data-commit-list]", start: "top 92%", end: "top 62%", scrub: 0.65 } });
      gsap.fromTo("[data-avatar]", { opacity: 0, x: 24 }, { opacity: 1, x: 0, ease: "none", stagger: 0.08, scrollTrigger: { trigger: "[data-avatar-row]", start: "top 92%", end: "top 64%", scrub: 0.65 } });

      // Figures count with the scroll — forwards and backwards.
      gsap.utils.toArray<HTMLElement>("[data-count-to]").forEach((node) => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: Number(node.dataset.countTo), ease: "none",
          scrollTrigger: { trigger: node, start: "top 92%", end: "top 55%", scrub: 0.6 },
          onUpdate: () => { node.textContent = String(Math.round(counter.value)); },
        });
      });
      gsap.fromTo("[data-spark-line]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: "[data-spark-line]", start: "top 95%", end: "top 55%", scrub: 0.6 } });
      gsap.fromTo("[data-spark-area]", { opacity: 0 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: "[data-spark-line]", start: "top 80%", end: "top 50%", scrub: 0.6 } });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 py-[14vh] sm:py-[18vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Header */}
        <div data-proof-head className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="eyebrow flex items-center gap-2 text-ink/40"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />Selected proof</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              SMALL BY CHOICE.<br />
              <span style={{ color: BRAND.cobalt }}>SERIOUS</span> BY NATURE.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[14px] leading-[1.65] text-ink/60">
            A focused, founder-led studio trusted across industries for websites, apps, online stores,
            marketing and automation. Here is what that looks like in practice.
          </p>
        </div>

        {/* Bento */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {/* Services rail */}
          <article data-tile className={`${tile} bg-paper/85 backdrop-blur-md sm:col-span-2 lg:col-span-4 lg:row-span-2`}>
            <div className="flex items-center justify-between">
              <span className={`${mono} text-ink/40`}>What we deliver</span>
              <span className={`${mono} hidden text-ink/35 lg:inline`}>Hover to explore</span>
            </div>
            <div data-svc-rail className="mt-5 flex flex-col gap-2.5 lg:h-[470px] lg:flex-row">
              {SERVICE_PAGES.map((page, index) => {
                const detail = SERVICE_DETAILS[page.slug];
                const open = index === service;
                const ink = detail.color === BRAND.lime || detail.color === BRAND.mint ? BRAND.ink : BRAND.paper;
                return (
                  <a
                    key={page.slug}
                    data-svc
                    href={page.href}
                    onMouseEnter={() => setService(index)}
                    onFocus={() => setService(index)}
                    className="group/svc relative flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-ink/10 p-5 transition-[flex-grow,background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:basis-0"
                    style={{ flexGrow: open ? 4.2 : 1, background: open ? detail.color : "rgba(255,255,255,0.6)", borderColor: open ? detail.color : undefined }}
                  >
                    <span aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-paper/20 blur-2xl transition-opacity duration-700" style={{ opacity: open ? 1 : 0 }} />
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-500" style={{ background: open ? "rgba(255,255,255,0.22)" : `${detail.color}22`, color: open ? ink : BRAND.ink }}>
                      <Icon d={detail.icon} />
                    </span>

                    {/* Collapsed label (laptop) */}
                    <span className="display absolute bottom-5 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[1.05rem] leading-none text-ink transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 lg:block" style={{ opacity: open ? 0 : 1 }}>
                      {page.label}
                    </span>

                    {/* Expanded content */}
                    <span className={`relative mt-6 flex flex-1 flex-col transition-opacity duration-500 lg:w-[min(100%,300px)] lg:min-w-[230px] ${open ? "lg:opacity-100 lg:delay-200" : "lg:pointer-events-none lg:opacity-0"}`} style={{ color: open ? ink : BRAND.ink, ["--sp-invert" as string]: open ? detail.color : BRAND.paper }}>
                      <span className="block h-[92px] w-full max-w-[260px]"><ServiceArt slug={page.slug} /></span>
                      <span className="mt-auto flex flex-col pt-7">
                      <span className={`${mono} opacity-70`}>{String(index + 1).padStart(2, "0")} · Service</span>
                      <span className="display mt-3 text-[clamp(1.35rem,2vw,2rem)] leading-[0.95]">{page.label}</span>
                      <span className="mt-3 max-w-[32ch] text-[13.5px] leading-[1.6] opacity-80">{detail.line}</span>
                      <span className="mt-5 flex flex-wrap gap-1.5">
                        {detail.offers.map((offer) => (
                          <span key={offer} className="rounded-full border px-3 py-1.5 text-[11.5px]" style={{ borderColor: open ? "rgba(255,255,255,0.35)" : "rgba(14,15,20,0.12)", background: open ? "rgba(255,255,255,0.12)" : "transparent" }}>{offer}</span>
                        ))}
                      </span>
                      <span className={`${mono} mt-6 flex items-center gap-2`}>Explore <span className="transition-transform duration-300 group-hover/svc:translate-x-1">→</span></span>
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </article>

          {/* Projects delivered */}
          <article data-tile className={`${tile} flex flex-col bg-paper/85 backdrop-blur-md lg:col-span-2`}>
            <span className={`${mono} text-ink/40`}>Projects delivered</span>
            <div className="mt-3 flex items-end gap-1">
              <span data-count-to={FIGURES.projects.value} className="display text-[clamp(3rem,5vw,4.6rem)] leading-none" style={{ color: BRAND.cobalt }}>{FIGURES.projects.value}</span>
              <span className="display mb-1 text-[1.6rem] leading-none" style={{ color: BRAND.cobalt }}>+</span>
            </div>
            <p className="mt-2 max-w-[28ch] text-[13px] leading-[1.55] text-ink/60">{FIGURES.projects.label}</p>
            <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="mt-auto h-16 w-full pt-4" aria-hidden>
              <defs>
                <linearGradient id="proof-spark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={BRAND.cobalt} stopOpacity="0.28" /><stop offset="1" stopColor={BRAND.cobalt} stopOpacity="0" /></linearGradient>
              </defs>
              <path data-spark-area d="M0 54 L20 50 L40 46 L60 48 L80 38 L100 34 L120 36 L140 24 L160 20 L180 12 L200 6 L200 60 L0 60 Z" fill="url(#proof-spark)" />
              <path data-spark-line pathLength={1} strokeDasharray="1" d="M0 54 L20 50 L40 46 L60 48 L80 38 L100 34 L120 36 L140 24 L160 20 L180 12 L200 6" fill="none" stroke={BRAND.cobalt} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            </svg>
          </article>

          {/* Response */}
          <article data-tile className={`${tile} flex flex-col text-paper lg:col-span-2`} style={{ background: BRAND.ink }}>
            <span aria-hidden className="anim-drift pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl" style={{ background: `${BRAND.lime}30` }} />
            <span className={`${mono} relative flex items-center gap-2 text-paper/50`}><span className="relative grid h-2 w-2 place-items-center"><span className="absolute inset-0 animate-ping rounded-full" style={{ background: BRAND.lime }} /><i className="relative h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} /></span>Response</span>
            <div className="relative mt-3 flex items-end">
              <span data-count-to={FIGURES.reply.value} className="display text-[clamp(3rem,5vw,4.6rem)] leading-none" style={{ color: BRAND.lime }}>{FIGURES.reply.value}</span>
              <span className="display mb-1 text-[1.8rem] leading-none" style={{ color: BRAND.lime }}>{FIGURES.reply.suffix}</span>
            </div>
            <p className="relative mt-2 text-[13px] leading-[1.45] text-paper/60">{FIGURES.reply.label}, Monday to Friday.</p>
          </article>

          {/* Industries */}
          <article data-tile className={`${tile} bg-paper/85 backdrop-blur-md sm:col-span-2 lg:col-span-4`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className={`${mono} text-ink/40`}>Industries we serve</span>
                <p className="display mt-3 max-w-[24ch] text-[clamp(1.4rem,2.2vw,2rem)] leading-[0.98]">Different sectors. The same senior standard.</p>
              </div>
              <span className={`${mono} text-ink/35`}>Worldwide</span>
            </div>
            <div data-ind-rows className="-mx-6 mt-7 space-y-3 sm:-mx-7">
              {[INDUSTRIES.slice(0, 6), INDUSTRIES.slice(6)].map((row, rowIndex) => (
                <div key={rowIndex} data-ind className="group/mq flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
                  <div className="anim-marquee flex shrink-0 gap-3 pr-3 group-hover/mq:[animation-play-state:paused]" style={{ "--marquee-duration": rowIndex ? "36s" : "30s", animationDirection: rowIndex ? "reverse" : "normal" } as React.CSSProperties}>
                    {[...row, ...row].map((industry, index) => (
                      <span key={`${industry.name}-${index}`} className="flex items-center gap-3 whitespace-nowrap rounded-full border border-ink/10 bg-paper py-2 pl-2 pr-5 shadow-[0_10px_24px_-20px_rgba(14,15,20,0.6)] transition-[translate,border-color] duration-300 hover:-translate-y-0.5" style={{ borderColor: undefined }}>
                        <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: industry.color === BRAND.lime ? `${BRAND.lime}66` : `${industry.color}2a` }}>
                          <Icon d={industry.icon} className="h-[18px] w-[18px]" color={BRAND.ink} />
                        </span>
                        <span className="text-[14px] font-medium text-ink/80">{industry.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Commitments */}
          <article data-tile className={`${tile} bg-paper/85 backdrop-blur-md sm:col-span-2 lg:col-span-2`}>
            <span className={`${mono} text-ink/40`}>Every project</span>
            <ul data-commit-list className="mt-5 space-y-3">
              {COMMITMENTS.map((item, index) => (
                <li key={item} data-commit className="flex items-center gap-3 text-[14px] text-ink/80">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ background: `${[BRAND.cobalt, BRAND.mint, BRAND.ember, BRAND.lime][index]}2e` }}>
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke={BRAND.ink} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          {/* Founder-led */}
          <article data-tile className={`${tile} text-paper sm:col-span-2 lg:col-span-6`} style={{ background: BRAND.ink }}>
            <span aria-hidden className="anim-drift pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full blur-3xl" style={{ background: `${BRAND.cobalt}55` }} />
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-[52ch]">
                <span className={mono} style={{ color: BRAND.lime }}>How we are built</span>
                <p className="display mt-4 text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[0.98]">Founder-led. Senior hands only.</p>
                <p className="mt-4 text-[13.5px] leading-[1.65] text-paper/60">No account managers and no hand-offs. The people you meet on day one are the people who build, launch and grow your product.</p>
              </div>
              <div data-avatar-row className="flex -space-x-3">
                {[BRAND.cobalt, BRAND.mint, BRAND.lime, BRAND.ember].map((color, index) => (
                  <span key={color + index} data-avatar className="grid h-12 w-12 place-items-center rounded-full border-2 text-[11px] font-semibold text-ink" style={{ background: color, borderColor: BRAND.ink }}>
                    {["ST", "DS", "EN", "MK"][index]}
                  </span>
                ))}
                <span data-avatar className="grid h-12 w-12 place-items-center rounded-full border-2 bg-paper/10 text-[11px] text-paper/70" style={{ borderColor: BRAND.ink }}>+7</span>
              </div>
            </div>
          </article>
        </div>
      </div>
      <style>{`
        .sp-grow { transform-box: fill-box; transform-origin: left center; animation: sp-grow 3.4s cubic-bezier(.65,0,.35,1) infinite; }
        @keyframes sp-grow { 0% { transform: scaleX(0); opacity: 1; } 35%, 82% { transform: scaleX(1); opacity: 1; } 100% { transform: scaleX(1); opacity: 0; } }
        .sp-pop { transform-box: fill-box; transform-origin: center; animation: sp-pop 3.4s cubic-bezier(.34,1.56,.64,1) infinite; }
        @keyframes sp-pop { 0%, 18% { transform: scale(0); opacity: 0; } 34%, 84% { transform: scale(1); opacity: 1; } 100% { transform: scale(1); opacity: 0; } }
        .sp-fade { animation: sp-fade 3.4s ease-in-out infinite; }
        @keyframes sp-fade { 0% { opacity: 0; } 30%, 84% { opacity: .2; } 100% { opacity: 0; } }
        .sp-slide { animation: sp-slide 6s cubic-bezier(.7,0,.3,1) infinite; }
        @keyframes sp-slide { 0%, 28% { transform: translateX(0); } 33%, 61% { transform: translateX(-46px); } 66%, 94% { transform: translateX(-92px); } 100% { transform: translateX(0); } }
        .sp-bar { transform-box: fill-box; transform-origin: bottom; animation: sp-bar 2.6s ease-in-out infinite alternate; }
        @keyframes sp-bar { from { transform: scaleY(.3); } to { transform: scaleY(1); } }
        .sp-dash { stroke-dasharray: 260; animation: sp-dash 3s ease-in-out infinite; }
        @keyframes sp-dash { 0% { stroke-dashoffset: 260; } 60%, 100% { stroke-dashoffset: 0; } }
        .sp-badge { transform-box: fill-box; transform-origin: center; animation: sp-badge 2.6s ease-in-out infinite; }
        @keyframes sp-badge { 0%, 52% { transform: scale(0); } 62% { transform: scale(1.25); } 70%, 92% { transform: scale(1); } 100% { transform: scale(0); } }
        .sp-spin { transform-box: fill-box; transform-origin: center; animation: kroma-spin 3s linear infinite; }
        .sp-invert { stroke: var(--sp-invert); }
        .sp-invert-fill { fill: var(--sp-invert); }
        @media (prefers-reduced-motion: reduce) { .sp-grow, .sp-pop, .sp-fade, .sp-slide, .sp-bar, .sp-dash, .sp-badge, .sp-spin { animation: none; } }
      `}</style>
    </section>
  );
}
