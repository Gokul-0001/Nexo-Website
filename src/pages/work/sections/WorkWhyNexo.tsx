"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type Commitment = { key: string; label: string; title: string; body: string; proof: string[]; color: string; icon: string };

const COMMITMENTS: Commitment[] = [
  { key: "team", label: "Senior team", title: "The people you meet build your product.", body: "No account managers and no hand-offs. Senior strategists, designers and engineers stay with your project from the first call to launch day.", proof: ["Founder on every project", "No junior hand-offs"], color: BRAND.cobalt, icon: "M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM20 19v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.15a3.5 3.5 0 0 1 0 6.7" },
  { key: "price", label: "Fixed price", title: "One clear price, agreed before we start.", body: "You get a written scope with deliverables, timeline and a fixed fee up front, so there are no surprise invoices halfway through.", proof: ["Written scope", "No hidden hours"], color: BRAND.ember, icon: "M7 5h10M7 9h10M7 5c5 0 5 8 0 8l7 6" },
  { key: "demos", label: "Weekly demos", title: "See real progress every single week.", body: "Every week you get a live link to click through, not a status report. Feedback goes straight into the next round of work.", proof: ["Live staging links", "Weekly check-ins"], color: BRAND.mint, icon: "M4 5h16v11H4zM8 20h8M12 16v4M10 8.5l4 2-4 2Z" },
  { key: "own", label: "You own it all", title: "Your code, your designs, your accounts.", body: "Everything we create is yours from day one: source code, design files, ad accounts, analytics and domains. No lock-in, ever.", proof: ["Full source code", "All logins handed over"], color: BRAND.lime, icon: "M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5zM12 15v2" },
  { key: "ontime", label: "On-time launch", title: "Dates we commit to, and keep.", body: "We plan in clear milestones and flag risks early, so launches land on the date we agreed, ready for your customers.", proof: ["Milestone plan", "Early risk flags"], color: BRAND.cobalt, icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2" },
  { key: "after", label: "After launch", title: "We stay to support, improve and grow it.", body: "Launch is the start. We monitor, fix, update and keep improving your site, store, app or campaign as your business grows.", proof: ["Support & updates", "Ongoing growth"], color: BRAND.ember, icon: "M3 20h18M5 16l5-5 4 3 6-7M15 7h5v5" },
];

const STEP = 360 / COMMITMENTS.length;

/** Arc path for one dial segment, in a 200×200 viewBox. */
function arc(index: number, r: number) {
  const gap = 6;
  const start = ((index * STEP - STEP / 2 + gap / 2 - 90) * Math.PI) / 180;
  const end = ((index * STEP + STEP / 2 - gap / 2 - 90) * Math.PI) / 180;
  const p = (a: number) => `${(100 + r * Math.cos(a)).toFixed(2)} ${(100 + r * Math.sin(a)).toFixed(2)}`;
  return `M ${p(start)} A ${r} ${r} 0 0 1 ${p(end)}`;
}

function Icon({ d, className, color }: { d: string; className: string; color: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>;
}

/** The commitment dial: turning the ring brings each promise up to the pointer. */
function Dial({ active, onPick }: { active: number; onPick: (index: number) => void }) {
  const current = COMMITMENTS[active];
  const ink = current.color === BRAND.lime || current.color === BRAND.mint ? BRAND.ink : BRAND.paper;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(440px,calc(100svh-300px))]">
      <div aria-hidden className="anim-drift pointer-events-none absolute inset-[8%] rounded-full blur-[70px] transition-colors duration-700" style={{ background: `${current.color}40` }} />
      {/* Pointer */}
      <span aria-hidden className="absolute left-1/2 top-[-2%] z-10 -translate-x-1/2">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill={BRAND.ink}><path d="M12 22 4 6h16Z" /></svg>
      </span>
      {/* Rotating ring */}
      <div data-dial-ring className="absolute inset-0">
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
          <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(14,15,20,0.08)" strokeWidth="1" strokeDasharray="1.5 4" />
          {COMMITMENTS.map((c, index) => (
            <path key={c.key} d={arc(index, 86)} fill="none" stroke={c.color} strokeWidth={index === active ? 14 : 9} strokeLinecap="round" opacity={index === active ? 1 : 0.35} className="transition-[stroke-width,opacity] duration-500" />
          ))}
        </svg>
        {/* Labels ride on the ring */}
        {COMMITMENTS.map((c, index) => {
          const rad = (index * STEP * Math.PI) / 180;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => onPick(index)}
              className="absolute h-0 w-0"
              style={{ left: `${(50 + 43 * Math.sin(rad)).toFixed(2)}%`, top: `${(50 - 43 * Math.cos(rad)).toFixed(2)}%` }}
              aria-label={c.label}
            >
              <span data-dial-label className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-paper shadow-[0_12px_24px_-14px_rgba(14,15,20,0.6)] transition-[background-color,border-color,scale] duration-500" style={{ borderColor: index === active ? c.color : "rgba(14,15,20,0.1)", background: index === active ? c.color : BRAND.paper, scale: index === active ? "1.15" : "1" }}>
                <span className="block" data-dial-counter>
                  <Icon d={c.icon} className="h-5 w-5" color={index === active ? (c.color === BRAND.lime || c.color === BRAND.mint ? BRAND.ink : BRAND.paper) : BRAND.ink} />
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {/* Centre */}
      <div className="absolute inset-[27%] grid place-items-center rounded-full shadow-[0_30px_60px_-30px_rgba(14,15,20,0.7)]" style={{ background: BRAND.ink }}>
        <span className="anim-spin-slow absolute -inset-2 rounded-full border border-dashed" style={{ borderColor: `${current.color}88`, animationDuration: "18s" }} />
        <div key={current.key} className="dial-swap text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full" style={{ background: current.color }}>
            <Icon d={current.icon} className="h-6 w-6" color={ink} />
          </span>
          <span className="display mt-3 block text-[clamp(1rem,1.8vw,1.35rem)] leading-none text-paper">{current.label}</span>
          <span className="mt-2 block text-mono-9 tracking-[0.18em] text-paper/45 uppercase tabular-nums">{String(active + 1).padStart(2, "0")} / {String(COMMITMENTS.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

/** Content section: the Nexo Way — six commitments on a dial that turns with the scroll. */
export default function WorkWhyNexo() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pinRef = useRef<ScrollTrigger | null>(null);
  const current = COMMITMENTS[active];

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const last = COMMITMENTS.length - 1;
      const ring = element.querySelector<HTMLElement>("[data-dial-ring]");
      const counters = gsap.utils.toArray<HTMLElement>("[data-dial-counter]", element);
      const turn = (focus: number) => {
        // Rotate the ring so the focused commitment sits under the pointer; keep icons upright.
        const deg = -focus * STEP;
        gsap.set(ring, { rotation: deg });
        gsap.set(counters, { rotation: -deg });
        const next = Math.round(focus);
        if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
      };
      turn(0);

      if (!reduce) {
        gsap.fromTo("[data-way-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.12, scrollTrigger: { trigger: "[data-way-head]", start: "top 88%", end: "top 50%", scrub: 0.65 } });
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const state = { focus: 0 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-way-pin]",
            start: "top top",
            end: () => `+=${window.innerHeight * 0.5 * last + window.innerHeight * 0.3}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            snap: { snapTo: (value: number) => (value < 0.5 / last ? value : Math.round(value * last) / last), inertia: false, duration: { min: 0.25, max: 0.6 }, delay: 0.15, ease: "power2.inOut" },
          },
        }).to(state, { focus: last, ease: "none", onUpdate: () => turn(state.focus) });
        pinRef.current = tl.scrollTrigger ?? null;
        return () => { pinRef.current = null; };
        gsap.fromTo("[data-way-dial]", { opacity: 0, scale: 0.85, rotation: -20 }, { opacity: 1, scale: 1, rotation: 0, ease: "none", scrollTrigger: { trigger: element, start: "top 85%", end: "top 30%", scrub: 0.65 } });
      });
      mm.add("(max-width: 1023px)", () => {
        if (reduce) return;
        gsap.fromTo("[data-way-card]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: "[data-way-list]", start: "top 90%", end: "top 45%", scrub: 0.65 } });
      });
    }, element);
    return () => ctx.revert();
  }, []);

  const pick = (index: number) => {
    // Clicking an icon scrolls the pinned section so the dial turns to that commitment.
    const st = pinRef.current;
    if (st) {
      window.scrollTo({ top: st.start + ((st.end - st.start) * index) / (COMMITMENTS.length - 1), behavior: "smooth" });
      return;
    }
    activeRef.current = index;
    setActive(index);
  };

  const ink = current.color === BRAND.lime || current.color === BRAND.mint ? BRAND.ink : BRAND.paper;

  return (
    <section ref={root} className="relative z-10">
      <div data-way-pin className="relative flex flex-col justify-center overflow-hidden py-[12vh] lg:min-h-screen lg:pb-[4vh] lg:pt-[13vh]">
        <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8">
          {/* Header */}
          <div data-way-head className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />What you can count on</span>
              <h2 className="display mt-5 text-h2 leading-[0.9] lg:text-[clamp(2.6rem,4.4vw,4.6rem)]">
                THE NEXO<br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, ${BRAND.mint} 45%, ${BRAND.ember})` }}>WAY.</span>
              </h2>
            </div>
            <p className="max-w-[40ch] text-[14px] leading-[1.65] text-ink/60">
              Six commitments that come with every website, store, app, campaign and automation we build.
            </p>
          </div>

          {/* Laptop: dial + detail */}
          <div className="mt-10 hidden items-center gap-14 lg:mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div data-way-dial><Dial active={active} onPick={pick} /></div>
            <div key={current.key} className="dial-swap relative">
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold" style={{ background: current.color, color: ink }}>
                <Icon d={current.icon} className="h-3.5 w-3.5" color={ink} />{current.label}
              </span>
              <h3 className="display mt-5 max-w-[16ch] text-[clamp(2rem,3.2vw,3rem)] leading-[0.95]">{current.title}</h3>
              <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.7] text-ink/65">{current.body}</p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {current.proof.map((item) => (
                  <span key={item} className="flex items-center gap-2 rounded-full border border-ink/12 bg-paper/80 px-3.5 py-2 text-[12.5px] text-ink/75">
                    <span className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold" style={{ background: `${current.color}33`, color: BRAND.ink }}>✓</span>{item}
                  </span>
                ))}
              </div>
              <div className="mt-9 flex items-center gap-2">
                {COMMITMENTS.map((c, index) => (
                  <span key={c.key} className="h-1 rounded-full transition-[width,background-color] duration-500" style={{ width: index === active ? 40 : 14, background: index <= active ? c.color : "rgba(14,15,20,0.12)" }} />
                ))}
                <span className="ml-3 text-mono-9 tracking-[0.18em] text-ink/40 uppercase">Scroll to turn the dial</span>
              </div>
            </div>
          </div>

          {/* Phones/tablets: stacked commitments */}
          <div data-way-list className="mt-10 grid gap-3 sm:grid-cols-2 lg:hidden">
            {COMMITMENTS.map((c) => {
              const onC = c.color === BRAND.lime || c.color === BRAND.mint ? BRAND.ink : BRAND.paper;
              return (
                <article key={c.key} data-way-card className="rounded-[22px] border border-ink/10 bg-paper/80 p-5 backdrop-blur-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-full" style={{ background: c.color }}><Icon d={c.icon} className="h-5 w-5" color={onC} /></span>
                  <span className="mt-4 block text-mono-9 tracking-[0.16em] text-ink/45 uppercase">{c.label}</span>
                  <h3 className="display mt-2 text-[1.35rem] leading-[1]">{c.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-[1.6] text-ink/60">{c.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes dial-swap { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .dial-swap { animation: dial-swap 0.55s cubic-bezier(0.16,1,0.3,1); }
        @media (prefers-reduced-motion: reduce) { .dial-swap { animation: none; } }
      `}</style>
    </section>
  );
}
