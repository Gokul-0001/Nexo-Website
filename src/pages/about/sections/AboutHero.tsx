"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";
import { useMagnetic, usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { role: "Strategy", title: "Lead strategist", from: BRAND.cobalt, to: BRAND.mint, pin: BRAND.ember, className: "left-[2%] top-[5%] w-[30%] -rotate-6", depth: 18 },
  { role: "Design", title: "Design director", from: BRAND.ember, to: BRAND.lime, pin: BRAND.cobalt, className: "left-[35%] top-[1%] w-[29%] rotate-2", depth: -12 },
  { role: "Engineering", title: "Technical lead", from: BRAND.ink, to: BRAND.cobalt, pin: BRAND.lime, className: "right-[2%] top-[7%] w-[30%] rotate-6", depth: 22 },
] as const;

const MILESTONES = [["2016", "Founded"], ["2019", "Berlin"], ["2023", "11 people"], ["NOW", "Next"]] as const;

function Pin({ color }: { color: string }) {
  return (
    <span data-wall-pin className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
      <span className="block h-4 w-4 rounded-full shadow-[0_4px_8px_rgba(14,15,20,0.35)]" style={{ background: `radial-gradient(circle at 35% 30%, #fff9 0 18%, ${color} 45%)` }} />
    </span>
  );
}

function Tape({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`absolute z-10 h-[18px] w-[58px] bg-paper/70 shadow-[0_1px_2px_rgba(14,15,20,0.12)] backdrop-blur-[2px] ${className}`} style={{ clipPath: "polygon(3% 0, 97% 6%, 100% 100%, 0 94%)" }} />;
}

/** Studio wall: a pinned moodboard of the people, principles and story behind Nexo. */
function StudioIndex() {
  const stage = useRef<HTMLDivElement | null>(null);
  const wall = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const element = stage.current;
    if (!element || reduce) return;
    let cleanup = () => {};
    const ctx = gsap.context(() => {
      // Pieces get pinned onto the wall one by one.
      gsap.fromTo("[data-wall-item]", { y: -60, opacity: 0, scale: 1.12, rotation: () => gsap.utils.random(-14, 14) }, { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 1.1, ease: "back.out(1.5)", stagger: 0.11, delay: 0.35 });
      gsap.fromTo("[data-wall-pin]", { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(3)", stagger: 0.11, delay: 0.75 });
      gsap.fromTo("[data-wall-arrow]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", delay: 1.6 });
      gsap.fromTo("[data-wall-scribble]", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", delay: 2.4 });
      gsap.fromTo("[data-wall-line]", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", delay: 1.4 });
      gsap.fromTo("[data-wall-dot]", { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(3)", stagger: 0.18, delay: 1.7 });

      // Paper flutters gently on the wall.
      gsap.utils.toArray<HTMLElement>("[data-wall-flutter]").forEach((piece) => {
        gsap.fromTo(piece, { rotation: gsap.utils.random(-1.4, -0.4) }, { rotation: gsap.utils.random(0.4, 1.4), duration: gsap.utils.random(2.6, 4.2), ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
      });

      // Whole wall tilts in 3D; each piece drifts at its own depth.
      const tiltX = gsap.quickTo(wall.current, "rotationY", { duration: 1.2, ease: "power3.out" });
      const tiltY = gsap.quickTo(wall.current, "rotationX", { duration: 1.2, ease: "power3.out" });
      gsap.set(wall.current, { transformPerspective: 1400 });
      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((layer) => ({
        depth: Number(layer.dataset.depth),
        x: gsap.quickTo(layer, "x", { duration: 1.1, ease: "power3.out" }),
        y: gsap.quickTo(layer, "y", { duration: 1.1, ease: "power3.out" }),
      }));
      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        tiltX(nx * 10);
        tiltY(-ny * 8);
        layers.forEach((layer) => { layer.x(nx * layer.depth); layer.y(ny * layer.depth); });
      };
      window.addEventListener("pointermove", onMove);
      cleanup = () => window.removeEventListener("pointermove", onMove);
    }, element);
    return () => { cleanup(); ctx.revert(); };
  }, [reduce]);

  const piece = "group absolute";
  const lift = "transition-[scale,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.04]";

  return (
    <div ref={stage} data-about-index className="relative mx-auto w-full max-w-[580px] will-change-transform">
      <div ref={wall} data-cursor="drag" data-cursor-label="TILT" className="relative aspect-square w-full">
        {/* Wall surface */}
        <div aria-hidden className="absolute inset-[4%] rounded-[30px] border border-ink/8 bg-paper/50 shadow-[0_40px_90px_-50px_rgba(14,15,20,0.45)] backdrop-blur-sm" style={{ backgroundImage: "radial-gradient(rgba(14,15,20,0.12) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
        <div aria-hidden className="anim-drift pointer-events-none absolute inset-[12%] rounded-full blur-[80px]" style={{ background: `conic-gradient(from 120deg, ${BRAND.cobalt}30, ${BRAND.mint}30, ${BRAND.lime}26, ${BRAND.ember}2e, ${BRAND.cobalt}30)` }} />

        {/* Team polaroids */}
        {TEAM.map((person) => (
          <div key={person.role} data-depth={person.depth} className={`${piece} ${person.className}`}>
            <div data-wall-item><div data-wall-flutter className="origin-top">
              <figure className={`relative rounded-[6px] bg-paper p-[6%] pb-[4%] shadow-[0_22px_40px_-22px_rgba(14,15,20,0.55),0_2px_4px_rgba(14,15,20,0.08)] ${lift}`}>
                <Pin color={person.pin} />
                <svg viewBox="0 0 100 112" className="block w-full rounded-[3px]" aria-hidden>
                  <defs><linearGradient id={`wall-${person.role}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={person.from} /><stop offset="1" stopColor={person.to} /></linearGradient></defs>
                  <rect width="100" height="112" fill={`url(#wall-${person.role})`} />
                  <circle cx="78" cy="22" r="26" fill="#fff" opacity="0.12" />
                  <circle cx="50" cy="50" r="19" fill="#fff" opacity="0.92" />
                  <path d="M14 112c3-30 19-42 36-42s33 12 36 42Z" fill="#fff" opacity="0.92" />
                  <path d="M42 52q8 7 16 0" stroke={person.from === BRAND.ink ? BRAND.cobalt : person.from} strokeWidth="2.4" fill="none" strokeLinecap="round" />
                </svg>
                <figcaption className="mt-[6%] flex items-end justify-between gap-1">
                  <span><strong className="display block text-[clamp(0.7rem,1.5vw,0.95rem)] leading-none">{person.role}</strong><span className="mt-1 block text-[clamp(7px,1vw,9px)] tracking-[0.12em] text-ink/45 uppercase">{person.title}</span></span>
                  <i className="mb-0.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: person.from === BRAND.ink ? BRAND.lime : person.from }} />
                </figcaption>
              </figure>
            </div></div>
          </div>
        ))}

        {/* Principle sticky note */}
        <div data-depth="-16" className={`${piece} left-[7%] top-[53%] w-[33%] -rotate-3`}>
          <div data-wall-item><div data-wall-flutter className="origin-top">
            <div className={`relative aspect-square p-[11%] shadow-[0_20px_34px_-20px_rgba(14,15,20,0.55)] ${lift}`} style={{ background: BRAND.lime }}>
              <Tape className="-top-2 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
              <span className="block text-[clamp(7px,1vw,9px)] tracking-[0.18em] text-ink/55 uppercase">Principle 01</span>
              <p className="display mt-[8%] text-[clamp(0.95rem,2.4vw,1.45rem)] leading-[0.95] text-ink">Senior hands. No account layer.</p>
              <span aria-hidden className="absolute bottom-0 right-0 h-[18%] w-[18%]" style={{ background: "linear-gradient(135deg, transparent 50%, rgba(14,15,20,0.14) 50%)" }} />
            </div>
          </div></div>
        </div>

        {/* Small mint note */}
        <div data-depth="12" className={`${piece} left-[42%] top-[50%] w-[22%] rotate-[5deg]`}>
          <div data-wall-item><div data-wall-flutter className="origin-top">
            <div className={`relative p-[12%] shadow-[0_16px_28px_-18px_rgba(14,15,20,0.5)] ${lift}`} style={{ background: BRAND.mint }}>
              <Pin color={BRAND.ink} />
              <p className="display text-[clamp(0.72rem,1.6vw,1rem)] leading-[0.95] text-ink">Outcomes over output.</p>
            </div>
          </div></div>
        </div>

        {/* Stat card */}
        <div data-depth="-20" className={`${piece} right-[5%] top-[49%] w-[29%] -rotate-2`}>
          <div data-wall-item><div data-wall-flutter className="origin-top">
            <div className={`relative rounded-[14px] p-[12%] text-paper shadow-[0_26px_44px_-22px_rgba(14,15,20,0.75)] ${lift}`} style={{ background: BRAND.ink }}>
              <Tape className="-top-2 right-[10%] rotate-[8deg]" />
              <div className="display text-[clamp(1.8rem,4.6vw,2.9rem)] leading-none" style={{ color: BRAND.lime }}>11</div>
              <div className="mt-1 text-[clamp(7px,1vw,9px)] tracking-[0.16em] text-paper/60 uppercase">Senior specialists</div>
              <div className="mt-[10%] flex gap-1">{[BRAND.cobalt, BRAND.ember, BRAND.mint, BRAND.lime].map((color) => <i key={color} className="h-2.5 flex-1 rounded-[2px]" style={{ background: color }} />)}</div>
            </div>
          </div></div>
        </div>

        {/* Hand-drawn arrow + scribble */}
        <svg data-depth="6" viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <path data-wall-arrow pathLength={1} strokeDasharray="1" d="M41 70 C 49 66, 47 58, 43 55 M43 55 l 0.5 4.2 M43 55 l 4 1.4" stroke={BRAND.ember} strokeWidth="0.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span data-wall-scribble className="absolute left-[44%] top-[70%] rotate-[-6deg] font-serif text-[clamp(0.8rem,1.7vw,1.05rem)] italic" style={{ color: BRAND.ember }}>that&apos;s the team ✦</span>

        {/* Taped timeline strip */}
        <div data-depth="9" className={`${piece} bottom-[7%] left-[8%] right-[8%] rotate-[-1.5deg]`}>
          <div data-wall-item><div data-wall-flutter>
            <div className={`relative rounded-[4px] bg-paper px-[6%] pb-3 pt-4 shadow-[0_16px_30px_-20px_rgba(14,15,20,0.5)] ${lift}`}>
              <Tape className="-left-3 -top-2 rotate-[-28deg]" />
              <Tape className="-right-3 -top-2 rotate-[24deg]" />
              <div className="relative">
                <span data-wall-line className="absolute left-[4%] right-[4%] top-[5px] h-px origin-left" style={{ background: `linear-gradient(90deg, ${BRAND.cobalt}, ${BRAND.mint}, ${BRAND.ember})` }} />
                <div className="relative grid grid-cols-4">
                  {MILESTONES.map(([year, label], index) => (
                    <div key={year} className="flex flex-col items-center text-center">
                      <i data-wall-dot className="h-[11px] w-[11px] rounded-full ring-2 ring-paper" style={{ background: index === MILESTONES.length - 1 ? BRAND.ember : BRAND.ink }} />
                      <span className="display mt-1.5 text-[clamp(0.75rem,1.6vw,1rem)] leading-none">{year}</span>
                      <span className="mt-0.5 text-[clamp(6.5px,0.9vw,8.5px)] tracking-[0.14em] text-ink/45 uppercase">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div></div>
        </div>
      </div>
    </div>
  );
}

/** A unique, scroll-driven About header for Nexo Technologies & Services. */
export default function AboutHero() {
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
      gsap.fromTo("[data-about-fade]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.05, ease: "expo.out", stagger: 0.08, delay: 0.18 });

      const timeline = gsap.timeline({ scrollTrigger: { trigger: element, start: "top top", end: "bottom top", scrub: 0.7 } });
      timeline
        .to(copy.current, { yPercent: -6, opacity: 0, ease: "none" }, 0)
        .to("[data-about-index]", { yPercent: 8, rotate: -8, scale: 0.92, opacity: 0, ease: "none" }, 0);
    }, element);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={root} className="relative isolate z-10 min-h-[100svh]">
      <div className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0"><div className="anim-drift absolute -left-[13vw] top-[5vh] h-[46vh] w-[46vh] rounded-full blur-[100px]" style={{ background: `radial-gradient(circle, ${BRAND.cobalt}22, transparent 70%)` }} /><div className="anim-drift absolute right-[-12vw] top-[24vh] h-[42vh] w-[42vh] rounded-full blur-[105px]" style={{ background: `radial-gradient(circle, ${BRAND.mint}28, transparent 70%)`, animationDelay: "-9s" }} /><div className="grain absolute inset-0 opacity-[0.09] mix-blend-multiply" /></div>

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 items-center px-5 py-28 sm:px-8 lg:py-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div ref={copy}>
              <div data-about-fade className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2"><span className="eyebrow flex items-center gap-2 text-ink/55"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />About Nexo Technologies & Services</span><span className="hidden h-3 w-px bg-ink/15 sm:block" /><span className="eyebrow text-ink/40">Strategy · Design · Technology</span></div>
              <h1 className="display text-h1 [text-shadow:0_0_48px_rgba(255,255,255,0.9)]"><SplitLines as="span" from="load" stagger={0.13} lines={["THE TEAM", "BEHIND", "THE WORK."]} className="block" lineClassName="pb-[0.02em]" render={(line, index) => index === 1 ? <span className="block bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, ${BRAND.mint} 30%, ${BRAND.ink} 54%, ${BRAND.ember} 74%, ${BRAND.cobalt})`, backgroundSize: "300% 100%", animation: "kroma-gradient-pan 11s linear infinite" }}>{line}</span> : line} /></h1>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-6"><p data-about-fade className="max-w-[43ch] text-[14px] leading-[1.65] text-ink/65 sm:text-[15.5px]">Nexo is a small, independent team of senior strategists, designers and engineers. The people you meet on day one are the people who build your product: no hand-offs, no account layer.</p><div data-about-fade className="flex flex-wrap items-center gap-3"><a ref={cta} href="/work" data-cursor="magnet" className="group relative overflow-hidden rounded-full px-7 py-4 text-mono-10-5 tracking-[0.18em] text-paper uppercase" style={{ background: BRAND.ink }}><span className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" style={{ background: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.ember} 60%, ${BRAND.mint})` }} /><span className="relative flex items-center gap-2">See our work <span>→</span></span></a><a ref={secondary} href="/contact" data-cursor="link" className="flex items-center gap-3 rounded-full border border-ink/15 bg-paper/70 px-6 py-4 text-mono-10-5 tracking-[0.18em] text-ink/70 uppercase backdrop-blur-sm transition-colors duration-500 hover:border-ink/40 hover:text-ink">Start a conversation <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.ember }} /></a></div></div>
            </div>
            <div data-about-fade><StudioIndex /></div>
          </div>
        </div>

        <div data-about-fade className="relative mx-auto w-full max-w-[1440px] px-5 pb-6 sm:px-8"><div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-4"><span className="eyebrow text-ink/45">Independent by design</span><div className="hidden gap-10 md:flex">{[["9", "Years in practice"], ["11", "Senior specialists"], ["6 / yr", "Engagement cap"]].map(([value, label]) => <div key={label}><div className="display text-[20.5px] leading-none">{value}</div><div className="eyebrow mt-1 text-ink/40">{label}</div></div>)}</div><span className="eyebrow text-ink/45">Lisbon · Berlin · Worldwide</span></div></div>
      </div>
    </section>
  );
}
