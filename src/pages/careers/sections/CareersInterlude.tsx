"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const COLS = 10;
const TOP_ROW = "NOW HIRING";
/** The words the board flips through as you scroll (10 letters max). PLACEHOLDER — edit freely. */
const WORDS = [
  { word: "DESIGNERS", color: BRAND.ember },
  { word: "DEVELOPERS", color: BRAND.mint },
  { word: "MARKETERS", color: BRAND.paper },
  { word: "AUTOMATORS", color: "#8C9BFF" },
  { word: "MAKERS.", color: BRAND.lime },
];
/** How long each word stays before the board flips to the next one on its own. */
const AUTO_MS = 3200;
const GLYPHS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/** Pads a word to the board width, centred. */
const fit = (text: string) => {
  const left = Math.floor((COLS - text.length) / 2);
  return (" ".repeat(left) + text).padEnd(COLS, " ").slice(0, COLS);
};

function Half({ ch, pos, anim }: { ch: string; pos: "top" | "bottom"; anim?: string }) {
  return (
    <span
      className={`absolute inset-x-0 h-1/2 overflow-hidden bg-gradient-to-b [backface-visibility:hidden] ${pos === "top" ? "top-0 origin-bottom rounded-t-[0.7cqw] from-[#262833] to-[#1d1f27]" : "top-1/2 origin-top rounded-b-[0.7cqw] from-[#1a1c23] to-[#15161c]"} ${anim ?? ""}`}
    >
      <span className={`absolute inset-x-0 flex h-[200%] items-center justify-center ${pos === "top" ? "top-0" : "-top-full"}`}>{ch}</span>
    </span>
  );
}

/** One split-flap tile: flips through a few random letters, then lands on `char`. */
function Flap({ char, delay }: { char: string; delay: number }) {
  const [state, setState] = useState({ cur: " ", prev: " ", n: 0 });

  useEffect(() => {
    const show = (c: string) => setState((s) => (s.cur === c ? s : { cur: c, prev: s.cur, n: s.n + 1 }));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { show(char); return; }
    const steps = char === " " ? 1 : 2 + Math.floor(Math.random() * 3);
    const timers = Array.from({ length: steps }, (_, i) =>
      window.setTimeout(() => show(i === steps - 1 ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]), delay + i * 110),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [char, delay]);

  return (
    <span className="relative block aspect-[3/4] [perspective:30cqw] shadow-[0_0.8cqw_1.4cqw_-0.6cqw_rgba(0,0,0,0.7)]">
      <Half ch={state.cur} pos="top" />
      <Half ch={state.prev} pos="bottom" />
      {state.n > 0 && (
        <>
          <Half key={`a${state.n}`} ch={state.prev} pos="top" anim="sf-down" />
          <Half key={`b${state.n}`} ch={state.cur} pos="bottom" anim="sf-up" />
        </>
      )}
      {/* hinge */}
      <span aria-hidden className="absolute inset-x-0 top-1/2 z-10 h-[0.18cqw] -translate-y-1/2 bg-black/70" />
      <span aria-hidden className="absolute left-0 top-1/2 z-10 h-[1.2cqw] w-[0.35cqw] -translate-y-1/2 rounded-r-full bg-[#3a3d48]" />
      <span aria-hidden className="absolute right-0 top-1/2 z-10 h-[1.2cqw] w-[0.35cqw] -translate-y-1/2 rounded-l-full bg-[#3a3d48]" />
    </span>
  );
}

function Row({ text, color, stagger = 45 }: { text: string; color: string; stagger?: number }) {
  return (
    <div className="grid grid-cols-10 gap-[0.9cqw] transition-colors duration-500" style={{ color }}>
      {Array.from(text).map((char, i) => <Flap key={i} char={char} delay={i * stagger} />)}
    </div>
  );
}

/**
 * Careers interlude — an airport-style split-flap board. Scroll down and the bottom row flips
 * through who we hire (designers → developers → … → makers); scroll up and it flips back. While it
 * is on screen it also moves to the next word on its own every AUTO_MS.
 */
export default function CareersInterlude() {
  const root = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const scrollIndex = useRef(-1);

  // While the board is on screen it also flips to the next word on its own every few seconds.
  // Any scroll that moves to a new word takes over and restarts the timer.
  useEffect(() => {
    if (!visible || index < 0) return;
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % WORDS.length), AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [index, visible]);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: element, start: "top bottom", end: "bottom top", onToggle: (self) => setVisible(self.isActive) });
      // The word on the board follows the scroll position, both ways.
      ScrollTrigger.create({
        trigger: element,
        start: "top 78%",
        end: "bottom 25%",
        onUpdate: (self) => {
          const next = self.progress <= 0 ? -1 : Math.min(WORDS.length - 1, Math.floor(self.progress * WORDS.length));
          if (next === scrollIndex.current) return;
          scrollIndex.current = next;
          setIndex(next);
        },
        onLeaveBack: () => { scrollIndex.current = -1; setIndex(-1); },
      });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-sf-panel]", { scale: 0.9, rotateX: 14, opacity: 0.4 }, { scale: 1, rotateX: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: element, start: "top 95%", end: "top 45%", scrub: 0.65 } });
      gsap.fromTo("[data-sf-fade]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, ease: "none", stagger: 0.08, scrollTrigger: { trigger: element, start: "top 80%", end: "top 45%", scrub: 0.65 } });
    }, element);
    return () => ctx.revert();
  }, []);

  const active = index >= 0 ? WORDS[index] : null;

  return (
    <section
      ref={root}
      aria-label="Now hiring designers, developers, marketers, automators — makers."
      className="relative z-10 mt-[4vh] mb-[4vh] px-3 [perspective:1600px] sm:mt-[9vh] sm:mb-[5vh] sm:px-6"
    >
      <div
        data-sf-panel
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[30px] px-4 py-8 sm:rounded-[42px] sm:px-10 sm:py-12"
        style={{ background: BRAND.ink }}
      >
        <div aria-hidden className="anim-drift absolute -left-[10%] -top-[50%] h-[110%] w-[50%] rounded-full blur-[90px]" style={{ background: `radial-gradient(circle, ${BRAND.cobalt}, transparent 66%)`, opacity: 0.55 }} />
        <div aria-hidden className="anim-drift absolute -bottom-[60%] -right-[8%] h-[110%] w-[46%] rounded-full blur-[90px] transition-[background] duration-700" style={{ background: `radial-gradient(circle, ${active?.color ?? BRAND.ember}, transparent 66%)`, opacity: 0.35, animationDelay: "-7s" }} />
        <div aria-hidden className="grain absolute inset-0 opacity-[0.2] mix-blend-overlay" />

        {/* board strip */}
        <div data-sf-fade className="relative mx-auto flex max-w-[1100px] items-center justify-between gap-3 text-mono-9 tracking-[0.18em] text-paper/50 uppercase">
          <span className="flex items-center gap-2">
            <i className="sf-blink h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />
            Now boarding
          </span>
          <span className="max-sm:hidden">Gate 02 · Nexo careers</span>
          <span>{active ? `${index + 1}/${WORDS.length}` : `0/${WORDS.length}`}</span>
        </div>

        {/* the board */}
        <div aria-hidden className="relative mx-auto mt-5 max-w-[1100px] rounded-[1.6cqw] bg-[#0a0b0f] p-[1.4cqw] [container-type:inline-size] sm:mt-7">
          <div className="display space-y-[1cqw] text-[8.4cqw] leading-none">
            <Row text={index >= 0 ? fit(TOP_ROW) : fit("")} color={BRAND.paper} stagger={35} />
            <Row text={active ? fit(active.word) : fit("")} color={active?.color ?? BRAND.paper} />
          </div>
        </div>

        {/* who we hire */}
        <div data-sf-fade className="relative mx-auto mt-6 flex max-w-[1100px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-mono-9 tracking-[0.16em] uppercase sm:mt-8">
          {WORDS.map((item, i) => (
            <span key={item.word} className="flex items-center gap-2 transition-colors duration-500" style={{ color: i === index ? item.color : "rgba(255,255,255,0.35)" }}>
              <i className="h-1.5 w-1.5 rounded-full transition-[background-color,scale] duration-500" style={{ background: i === index ? item.color : "rgba(255,255,255,0.2)", scale: i === index ? "1.4" : "1" }} />
              {item.word.replace(".", "")}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sf-down { from { transform: rotateX(0deg); } to { transform: rotateX(-90deg); } }
        @keyframes sf-up { from { transform: rotateX(90deg); } to { transform: rotateX(0deg); } }
        .sf-down { z-index: 2; animation: sf-down 60ms ease-in both; }
        .sf-up { z-index: 2; animation: sf-up 60ms ease-out 60ms both; }
        @keyframes sf-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        .sf-blink { animation: sf-blink 1.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .sf-down, .sf-up, .sf-blink { animation: none; } .sf-down { opacity: 0; } }
      `}</style>
    </section>
  );
}
