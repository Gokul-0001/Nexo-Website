"use client";

import { useEffect, useLayoutEffect, useRef, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { BRAND } from "@/lib/brand";
import { usePrefersReducedMotion } from "@/lib/motion";
import { WORLD_CITIES, WORLD_OUTLINE, WORLD_VIEWBOX } from "@/data/worldOutline";

gsap.registerPlugin(MotionPathPlugin);

/** Placeholder until the real studio number is confirmed. */
const PHONE = "+91 00000 00000";
const EMAIL = "studio@nexo.design";

/**
 * Card destinations. Everything marked PLACEHOLDER must be swapped for the real URL before launch.
 */
const LINKS = {
  email: `mailto:${EMAIL}`,
  call: "tel:+910000000000", // PLACEHOLDER: real studio number (India, +91)
  brief: "#enquiry", // on-page project brief form
  instagram: "https://www.instagram.com/PLACEHOLDER-nexo-instagram", // PLACEHOLDER
  linkedin: "https://www.linkedin.com/company/PLACEHOLDER-nexo-linkedin", // PLACEHOLDER
  whatsapp: "https://wa.me/PLACEHOLDER-whatsapp-number", // PLACEHOLDER
} as const;
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

const LETTER_LINES = [
  { text: "Hi Nexo,", kind: "strong" },
  { text: "We're launching a new commerce", kind: "body" },
  { text: "experience this spring.", kind: "body" },
  { text: "Budget · €40–60K", kind: "mono" },
] as const;

const LINE_CLASS = {
  strong: "display text-[clamp(0.72rem,1.6vw,1.05rem)] leading-tight",
  body: "text-[clamp(7px,1.1vw,11px)] leading-snug text-ink/75",
  mono: "text-[clamp(6px,0.95vw,9px)] tracking-[0.12em] text-ink/55 uppercase",
} as const;

const HOME = WORLD_CITIES.lisbon;
const DESTINATIONS = [WORLD_CITIES.berlin, WORLD_CITIES.newYork, WORLD_CITIES.dubai, WORLD_CITIES.singapore, WORLD_CITIES.sydney];
/** Envelope centre → each satellite card (stage % coords). */
const WIRES = [[15, 34], [86, 28], [89, 65], [11, 77]] as const;

const ROCKET_PATH = "M50 57 C 43 44, 57 27, 50 11";
const tiny = "text-[clamp(6px,0.9vw,8.5px)] tracking-[0.16em] uppercase";
const small = "text-[clamp(7.5px,1.15vw,11px)] leading-snug";
const shadow = "shadow-[0_26px_48px_-26px_rgba(14,15,20,0.6)]";
const lift = "transition-[scale,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.03]";

/** Swipe the lime knob across the track to answer — same destination as tapping the card. */
function CallSwipe({ href }: { href: string }) {
  const track = useRef<HTMLSpanElement | null>(null);
  const knob = useRef<HTMLSpanElement | null>(null);
  const drag = useRef({ startX: 0, dx: 0, max: 0, active: false, moved: false, busy: false });

  const settle = (dx: number) => {
    const node = knob.current;
    if (!node) return;
    node.style.transition = "translate 0.45s cubic-bezier(0.16,1,0.3,1)";
    node.style.translate = `${dx}px 0`;
  };

  // Snap back whenever the visitor returns (after the dialler opens, or via back/forward cache).
  useEffect(() => {
    const reset = () => {
      if (document.visibilityState !== "visible") return;
      drag.current.busy = false;
      settle(0);
    };
    window.addEventListener("pageshow", reset);
    window.addEventListener("focus", reset);
    document.addEventListener("visibilitychange", reset);
    return () => {
      window.removeEventListener("pageshow", reset);
      window.removeEventListener("focus", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  const onDown = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const node = knob.current;
    const rail = track.current;
    if (!node || !rail || drag.current.busy) return;
    event.preventDefault();
    try { node.setPointerCapture(event.pointerId); } catch { /* pointer already released */ }
    node.style.transition = "none";
    drag.current = { startX: event.clientX, dx: 0, max: rail.clientWidth - node.offsetWidth, active: true, moved: false, busy: false };
  };
  const onMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const state = drag.current;
    if (!state.active || !knob.current) return;
    state.dx = Math.max(0, Math.min(state.max, event.clientX - state.startX));
    if (state.dx > 4) state.moved = true;
    knob.current.style.translate = `${state.dx}px 0`;
  };
  const onUp = () => {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;
    if (state.max > 0 && state.dx >= state.max * 0.72) {
      state.busy = true;
      settle(state.max);
      window.setTimeout(() => window.location.assign(href), 220);
      // Dialler links keep the page open, so return the knob once the hand-off has happened.
      window.setTimeout(() => { state.busy = false; settle(0); }, 1400);
    } else {
      settle(0);
    }
  };
  // A finished drag must not also fire the card link; a plain tap falls through to it.
  const onClick = (event: MouseEvent) => {
    if (drag.current.moved) event.preventDefault();
    drag.current.moved = false;
  };

  return (
    <span ref={track} className="relative flex h-8 w-full items-center rounded-full bg-paper/10 p-0.5">
      <span className={`${tiny} pointer-events-none absolute inset-0 grid place-items-center pl-7 text-paper/45 max-sm:hidden`}>Slide to answer ›</span>
      <span
        ref={knob}
        data-call-accept
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onLostPointerCapture={onUp}
        onClick={onClick}
        role="button"
        aria-label="Swipe to call the studio"
        className="relative z-[1] grid h-7 w-7 shrink-0 cursor-grab touch-none select-none place-items-center rounded-full active:cursor-grabbing"
        style={{ background: BRAND.lime }}
      >
        <svg viewBox="0 0 24 24" className="pointer-events-none h-3.5 w-3.5" fill={BRAND.ink}><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.12.37 2.33.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></svg>
      </span>
    </span>
  );
}

/** Contact hero visual: channels in a constellation around the brief envelope, over an outline world map. */
export default function ContactSignals() {
  const root = useRef<HTMLDivElement | null>(null);
  const stage = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    let cleanup = () => {};
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-env-flap]", { rotationX: 180, zIndex: 0 });
        gsap.set("[data-env-letter]", { yPercent: -50 });
        gsap.set("[data-chat='0'], [data-chat='2']", { opacity: 1 });
        return;
      }

      // Entrance: map outline draws in, channels land one after another.
      gsap.fromTo("[data-map-outline]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 3.2, ease: "power2.inOut", delay: 0.2 });
      gsap.fromTo("[data-map]", { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.8, ease: "expo.out", delay: 0.2 });
      gsap.fromTo("[data-c-item]", { y: 46, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "back.out(1.4)", stagger: 0.12, delay: 0.35 });
      gsap.fromTo("[data-map-arc], [data-c-wire]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.12, delay: 1.2 });

      // Call: ringing waves + handset shake.
      gsap.utils.toArray<HTMLElement>("[data-call-wave]").forEach((wave, index) => {
        gsap.fromTo(wave, { scale: 1, opacity: 0.6 }, { scale: 2.2, opacity: 0, duration: 2, ease: "power1.out", repeat: -1, delay: index * 0.66 });
      });
      gsap.timeline({ repeat: -1, repeatDelay: 1.3, delay: 1.2 }).to("[data-call-handset]", { keyframes: { rotation: [0, -16, 14, -12, 10, -5, 0] }, duration: 0.75, ease: "none" });
      gsap.to("[data-call-accept]", { scale: 1.14, duration: 0.6, yoyo: true, repeat: -1, ease: "sine.inOut" });

      // Social: story progress, reactions pop, counts climb.
      gsap.fromTo("[data-story-bar]", { scaleX: 0 }, { scaleX: 1, duration: 4, ease: "none", repeat: -1, transformOrigin: "0% 50%", delay: 1.2 });
      gsap.utils.toArray<HTMLElement>("[data-react-pop]").forEach((pop, index) => {
        gsap.fromTo(pop, { y: 0, opacity: 0, scale: 0.4 }, { keyframes: [{ opacity: 1, scale: 1.1, y: -14, duration: 0.35, ease: "back.out(2)" }, { opacity: 0, y: -38, duration: 0.9, ease: "power1.in" }], repeat: -1, repeatDelay: 2.2, delay: 1.8 + index * 0.9 });
      });
      const counts = { reactions: 248, comments: 32 };
      gsap.to(counts, {
        reactions: 312, comments: 41, duration: 16, ease: "none", repeat: -1, delay: 1.6,
        onUpdate: () => {
          element.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
            node.textContent = String(Math.round(counts[node.dataset.count as keyof typeof counts]));
          });
        },
      });
      // Instagram: Follow → Following ✓ loop.
      gsap.timeline({ repeat: -1, repeatDelay: 2.4, delay: 2.2 })
        .to("[data-follow='idle']", { yPercent: -100, opacity: 0, duration: 0.35, ease: "power2.in" })
        .fromTo("[data-follow='done']", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, "<0.1")
        .to("[data-follow='done']", { yPercent: -100, opacity: 0, duration: 0.35, ease: "power2.in" }, "+=2.2")
        .fromTo("[data-follow='idle']", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, "<0.1");

      // Cards hang and drift gently, each on its own rhythm.
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((card, index) => {
        gsap.to(card, { y: index % 2 ? 5 : -5, rotation: index % 2 ? -0.7 : 0.7, transformOrigin: "50% 0%", duration: 3.2 + index * 0.45, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.4 + index * 0.3 });
      });

      // WhatsApp: message, typing, reply, read ticks.
      gsap.timeline({ repeat: -1, repeatDelay: 1, delay: 1.8 })
        .set("[data-chat]", { opacity: 0, y: 8, scale: 0.92 })
        .set("[data-ticks]", { color: "rgba(14,15,20,0.35)" })
        .to("[data-chat='0']", { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(2)" }, 0.2)
        .to("[data-ticks]", { color: BRAND.cobalt, duration: 0.2 }, 0.9)
        .to("[data-chat='1']", { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(2)" }, 1.1)
        .to("[data-chat='1']", { opacity: 0, scale: 0.9, duration: 0.25 }, 2.4)
        .to("[data-chat='2']", { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(2)" }, 2.55)
        .to("[data-chat]", { opacity: 0, duration: 0.4 }, 5.6);

      // Email: envelope opens → brief writes → folds into a paper rocket → glides to the inbox.
      const flight = { path: "#nexo-rocket-path", align: "#nexo-rocket-path", alignOrigin: [0.5, 0.5] as [number, number], autoRotate: true };
      gsap.timeline({ repeat: -1, repeatDelay: 0.8, delay: 1.3 })
        .set("[data-env-flap]", { rotationX: 0, zIndex: 3 }, 0)
        .set("[data-env-letter]", { yPercent: 0, scaleX: 1, scaleY: 1, opacity: 1 }, 0)
        .set("[data-env-line]", { clipPath: "inset(0 100% 0 0)" }, 0)
        .set("[data-rocket]", { opacity: 0, scale: 0, motionPath: { ...flight, end: 0 } }, 0)
        .set("[data-smoke]", { opacity: 0, scale: 0.2 }, 0)
        .set("[data-inbox-badge]", { opacity: 0, scale: 0.6 }, 0)
        .to("[data-env-flap]", { rotationX: 180, duration: 0.8, ease: "power2.inOut" }, 0.3)
        .set("[data-env-flap]", { zIndex: 0 }, 0.7)
        .to("[data-env-letter]", { yPercent: -50, duration: 0.9, ease: "expo.out" }, 0.9)
        .to("[data-env-line]", { clipPath: "inset(0 0% 0 0)", duration: 0.4, stagger: 0.24, ease: "none" }, 1.4)
        .to("[data-env-letter]", { scaleX: 0.12, scaleY: 0.5, opacity: 0, transformOrigin: "50% 0%", duration: 0.5, ease: "power3.in" }, 3.1)
        .to("[data-rocket]", { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.4)" }, 3.45)
        .to("[data-smoke]", { opacity: 0.7, scale: 1, duration: 0.3, stagger: 0.06, ease: "power2.out" }, 3.75)
        .to("[data-smoke]", { opacity: 0, scale: 1.8, y: 2, duration: 0.9, stagger: 0.06, ease: "power1.out" }, 4.05)
        .to("[data-rocket]", { motionPath: flight, duration: 1.7, ease: "power1.inOut" }, 3.85)
        .to("[data-rocket]", { opacity: 0, scale: 0.3, duration: 0.18 }, 5.5)
        .to("[data-inbox]", { scale: 1.1, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, 5.5)
        .to("[data-inbox-badge]", { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.4)" }, 5.6)
        .set("[data-env-letter]", { yPercent: 0, scaleX: 1, scaleY: 1 }, 6.4)
        .to("[data-env-letter]", { opacity: 1, duration: 0.2 }, 6.4)
        .to("[data-env-flap]", { rotationX: 0, duration: 0.6, ease: "power2.inOut" }, 6.5)
        .set("[data-env-flap]", { zIndex: 3 }, 6.6)
        .to("[data-inbox-badge]", { opacity: 0, scale: 0.6, duration: 0.35 }, 7.6);

      // Tilt + depth parallax.
      const tiltX = gsap.quickTo(stage.current, "rotationY", { duration: 1.2, ease: "power3.out" });
      const tiltY = gsap.quickTo(stage.current, "rotationX", { duration: 1.2, ease: "power3.out" });
      gsap.set(stage.current, { transformPerspective: 1400 });
      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((layer) => ({
        depth: Number(layer.dataset.depth),
        x: gsap.quickTo(layer, "x", { duration: 1.1, ease: "power3.out" }),
        y: gsap.quickTo(layer, "y", { duration: 1.1, ease: "power3.out" }),
      }));
      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        tiltX(nx * 9);
        tiltY(-ny * 7);
        layers.forEach((layer) => { layer.x(nx * layer.depth); layer.y(ny * layer.depth); });
      };
      window.addEventListener("pointermove", onMove);
      cleanup = () => window.removeEventListener("pointermove", onMove);
    }, element);
    return () => { cleanup(); ctx.revert(); };
  }, [reduce]);

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[620px] py-3 sm:py-6" aria-label="Ways to reach Nexo">
      <div data-contact-device="brief" className="relative will-change-transform">
        <div ref={stage} data-cursor="drag" data-cursor-label="TILT" className="relative aspect-square w-full">
          {/* World map — clean outline, bleeding past the stage */}
          <div data-depth="-8" aria-hidden className="pointer-events-none absolute left-[-34%] right-[-14%] top-[12%]">
            <svg data-map viewBox={WORLD_VIEWBOX} className="block h-auto w-full overflow-visible">
              <path data-map-outline pathLength={1} strokeDasharray="1" d={WORLD_OUTLINE} fill="none" stroke="rgba(14,15,20,0.28)" strokeWidth="1" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {DESTINATIONS.map(([x, y], index) => (
                <path key={index} data-map-arc pathLength={1} strokeDasharray="1" d={`M${HOME[0]} ${HOME[1]} Q ${(HOME[0] + x) / 2} ${Math.min(HOME[1], y) - 70} ${x} ${y}`} fill="none" stroke={index % 2 ? BRAND.ember : BRAND.cobalt} strokeOpacity="0.45" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              ))}
              {[HOME, ...DESTINATIONS].map(([x, y], index) => (
                <g key={index}>
                  <circle cx={x} cy={y} r="11" fill={index < 2 ? BRAND.ember : BRAND.cobalt} opacity="0.22" className="animate-ping" style={{ transformOrigin: `${x}px ${y}px`, transformBox: "view-box", animationDuration: `${2.2 + index * 0.35}s` }} />
                  <circle cx={x} cy={y} r="4.5" fill={index < 2 ? BRAND.ember : BRAND.cobalt} stroke={BRAND.paper} strokeWidth="1.5" />
                </g>
              ))}
            </svg>
          </div>
          <div aria-hidden className="anim-drift pointer-events-none absolute inset-[18%] rounded-full blur-[80px]" style={{ background: `conic-gradient(from 200deg, ${BRAND.cobalt}26, ${BRAND.ember}1f, ${BRAND.mint}22, ${BRAND.lime}1c, ${BRAND.cobalt}26)` }} />

          {/* Constellation wires */}
          <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {WIRES.map(([x, y], index) => (
              <path key={index} data-c-wire className={index > 1 ? "max-sm:hidden" : undefined} pathLength={1} strokeDasharray="1" d={`M50 72 Q ${(x + 50) / 2} ${index < 2 ? 44 : Math.max(y, 72) + 8} ${x} ${y}`} fill="none" stroke={BRAND.ink} strokeOpacity="0.2" strokeWidth="0.3" />
            ))}
          </svg>

          {/* INBOX target (top centre) */}
          <div data-depth="10" className="absolute left-1/2 top-[2%] z-10 -translate-x-1/2">
            <div data-c-item>
              <a href={LINKS.email} data-inbox data-cursor="link" aria-label={`Email ${EMAIL}`} className={`relative flex items-center gap-2.5 whitespace-nowrap rounded-full py-2 pl-2 pr-4 text-paper ${shadow}`} style={{ background: BRAND.ink }}>
                <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: BRAND.lime }}>
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke={BRAND.ink} strokeWidth="2.2" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>
                </span>
                <span>
                  <span className={`${tiny} block text-paper/50`}>Email us</span>
                  <span className="display block text-[clamp(0.8rem,1.8vw,1.1rem)] leading-none">{EMAIL}</span>
                </span>
                <span data-inbox-badge className="absolute -right-2 -top-2 rounded-full px-2 py-1 text-[9px] font-semibold tracking-[0.1em] text-ink uppercase opacity-0" style={{ background: BRAND.lime }}>✓ New brief</span>
              </a>
            </div>
          </div>

          {/* CALL (upper left) */}
          <div data-depth="18" className="group absolute left-0 top-[13%] w-[29%]">
            <div data-c-item>
              <a href={LINKS.call} data-float data-cursor="link" draggable={false} aria-label={`Call the studio on ${PHONE}`} className={`@container relative block overflow-hidden rounded-[20px] p-[9%] text-paper ${shadow} ${lift}`} style={{ background: BRAND.ink }}>
                <div className="flex items-center justify-between">
                  <span className={`${tiny} text-paper/50`}>Call us</span>
                  <span className={`${tiny} flex items-center gap-1.5`} style={{ color: BRAND.lime }}><i className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: BRAND.lime }} />Ringing</span>
                </div>
                <div className="relative mx-auto mt-[12%] grid aspect-square w-[46%] place-items-center">
                  {[0, 1, 2].map((i) => <span key={i} data-call-wave className="absolute inset-0 rounded-full border-2" style={{ borderColor: BRAND.mint }} />)}
                  <span data-call-handset className="relative grid h-full w-full place-items-center rounded-full" style={{ background: BRAND.mint }}>
                    <svg viewBox="0 0 24 24" className="h-[48%] w-[48%]" fill={BRAND.ink}><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.12.37 2.33.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></svg>
                  </span>
                </div>
                <div className="mt-[13%] flex w-full flex-col items-center text-center">
                  <div className="display w-full whitespace-nowrap px-[0.15em] text-center text-[clamp(0.45rem,10.4cqw,0.86rem)] leading-[1.15] tabular-nums">{PHONE}</div>
                  <div className={`${tiny} mt-2 text-paper/50`}>Mon–Fri · 09–19 IST</div>
                </div>
                <div className="mt-[12%] flex items-center">
                  <CallSwipe href={LINKS.call} />
                </div>
              </a>
            </div>
          </div>

          {/* INSTAGRAM profile (upper right) */}
          <div data-depth="-16" className="group absolute right-0 top-[14%] w-[30%]">
            <div data-c-item>
              <a href={LINKS.instagram} {...EXTERNAL} data-float data-cursor="link" aria-label="Nexo on Instagram" className={`relative block rounded-[20px] border border-ink/10 bg-paper/90 p-[8%] backdrop-blur-md ${shadow} ${lift}`}>
                <div className="flex items-center justify-between">
                  <span className={`${tiny} text-ink/45`}>Instagram</span>
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke={BRAND.ember} strokeWidth="2.2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill={BRAND.ember} stroke="none" /></svg>
                </div>
                <div className="mt-[8%] flex items-center gap-[8%]">
                  <div className="relative aspect-square w-[38%] shrink-0">
                    <span className="anim-spin-slow absolute inset-0 rounded-full" style={{ background: `conic-gradient(${BRAND.ember}, ${BRAND.lime}, ${BRAND.mint}, ${BRAND.cobalt}, ${BRAND.ember})`, animationDuration: "6s" }} />
                    <span className="absolute inset-[6%] rounded-full bg-paper" />
                    <svg viewBox="0 0 100 100" className="absolute inset-[12%] h-[76%] w-[76%]" aria-hidden>
                      <circle cx="50" cy="50" r="50" fill={BRAND.ink} />
                      <text x="50" y="51" textAnchor="middle" dominantBaseline="central" fill={BRAND.paper} fontSize="25" letterSpacing="0.5" className="display">NEXO</text>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="display truncate text-[clamp(0.7rem,1.5vw,1rem)] leading-none"><span>@</span><span className="ml-[0.14em]">nexo</span></div>
                    <div className={`${tiny} mt-1 text-ink/45`}>New story</div>
                    <div className="mt-[10%] flex gap-1">
                      <span className="h-[3px] flex-1 rounded-full" style={{ background: BRAND.ink }} />
                      <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-ink/15"><span data-story-bar className="absolute inset-0 rounded-full" style={{ background: BRAND.ink }} /></span>
                      <span className="h-[3px] flex-1 rounded-full bg-ink/15" />
                    </div>
                  </div>
                </div>
                <span className="relative mt-[9%] block h-7 overflow-hidden rounded-full text-paper" style={{ background: `linear-gradient(100deg, ${BRAND.ember}, ${BRAND.cobalt})` }}>
                  <span data-follow="idle" className={`${tiny} absolute inset-0 grid place-items-center`}>Follow</span>
                  <span data-follow="done" className={`${tiny} absolute inset-0 grid place-items-center opacity-0`}>Following ✓</span>
                </span>
              </a>
            </div>
          </div>

          {/* LINKEDIN post (right) */}
          <div data-depth="-12" className="group absolute right-[-5%] top-[55%] w-[28%] max-sm:hidden">
            <div data-c-item>
              <a href={LINKS.linkedin} {...EXTERNAL} data-float data-cursor="link" aria-label="Nexo on LinkedIn" className={`relative block rounded-[20px] border border-ink/10 bg-paper/90 p-[8%] backdrop-blur-md ${shadow} ${lift}`}>
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[6px]" style={{ background: BRAND.cobalt }}><span className="display text-[11px] leading-none text-paper">in</span></span>
                  <span className="min-w-0"><span className="display block truncate text-[clamp(0.58rem,1.2vw,0.8rem)] leading-none">Nexo Technologies</span><span className={`${tiny} mt-0.5 block text-ink/40`}>1h · LinkedIn</span></span>
                </div>
                <p className={`${small} mt-[8%] text-ink/75`}>We just shipped a new commerce experience ✦</p>
                <div className={`${tiny} mt-[9%] flex items-center justify-between border-t border-ink/10 pt-[7%] tabular-nums text-ink/50`}>
                  <span className="flex items-center gap-1.5">
                    <span className="flex -space-x-1">
                      {[["👍", BRAND.cobalt], ["❤️", BRAND.ember], ["👏", BRAND.lime]].map(([emoji, color]) => (
                        <span key={emoji} className="grid h-4 w-4 place-items-center rounded-full border border-paper text-[8px]" style={{ background: `${color}33` }}>{emoji}</span>
                      ))}
                    </span>
                    <span data-count="reactions">248</span>
                  </span>
                  <span><span data-count="comments">32</span> comments</span>
                </div>
                {["👍", "❤️", "👏"].map((emoji, index) => (
                  <span key={emoji} data-react-pop className="pointer-events-none absolute bottom-[18%] text-[14px] opacity-0" style={{ left: `${14 + index * 10}%` }}>{emoji}</span>
                ))}
              </a>
            </div>
          </div>

          {/* WHATSAPP (lower left) */}
          <div data-depth="14" className="group absolute left-[-5%] top-[62%] w-[28%] max-sm:hidden">
            <div data-c-item>
              <a href={LINKS.whatsapp} {...EXTERNAL} data-float data-cursor="link" aria-label="Chat with Nexo on WhatsApp" className={`relative block rounded-[20px] border border-ink/10 bg-paper/90 p-[8%] backdrop-blur-md ${shadow} ${lift}`}>
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: BRAND.mint }}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={BRAND.ink} strokeWidth="2" strokeLinejoin="round"><path d="M4 20l1.3-3.8A8 8 0 1 1 8 19z" /><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1.2-1.2 1.8.8c-.2 1.2-1.1 1.9-2.3 1.8C10.8 15 9 13.2 8.6 10.8c-.1-1.2.6-2.1 1.8-2.3l.8 1.8Z" fill={BRAND.ink} stroke="none" /></svg>
                  </span>
                  <span className="min-w-0"><span className="display block text-[clamp(0.62rem,1.35vw,0.88rem)] leading-none">WhatsApp</span><span className={`${tiny} mt-0.5 flex items-center gap-1 text-ink/45`}><i className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: BRAND.mint }} />Online</span></span>
                </div>
                <div className="mt-[9%] space-y-1.5">
                  <div data-chat="0" className="ml-auto w-fit max-w-[92%] rounded-[12px] rounded-br-[3px] px-2.5 py-1.5 text-paper opacity-0" style={{ background: BRAND.cobalt }}>
                    <span className={`${small} block`}>Hi! Quick question about a project</span>
                    <span data-ticks className="mt-0.5 block text-right text-[9px] leading-none">✓✓</span>
                  </div>
                  <div data-chat="1" className="flex w-fit gap-1 rounded-[12px] rounded-bl-[3px] bg-ink/5 px-2.5 py-2 opacity-0">
                    {[0, 1, 2].map((i) => <i key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/50" style={{ animationDelay: `${i * 0.15}s` }} />)}
                  </div>
                  <div data-chat="2" className="w-fit max-w-[92%] rounded-[12px] rounded-bl-[3px] bg-ink/5 px-2.5 py-1.5 opacity-0">
                    <span className={`${small} block text-ink`}>Sure! Call Thursday? ☺</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Rocket flight */}
          <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible" aria-hidden>
            <path id="nexo-rocket-path" d={ROCKET_PATH} fill="none" stroke="none" />
            <path d={ROCKET_PATH} fill="none" stroke={BRAND.ink} strokeOpacity="0.25" strokeWidth="0.4" className="anim-dash" style={{ strokeDasharray: "1.2 2" }} />
            {[0, 1, 2].map((i) => <circle key={i} data-smoke cx={48 + i * 2} cy={58.5} r={1.1 - i * 0.2} fill="rgba(14,15,20,0.1)" opacity="0" style={{ transformOrigin: `${48 + i * 2}px 58.5px`, transformBox: "view-box" }} />)}
            <g data-rocket opacity="0">
              <path d="M7 0 L-4.6 -4.2 L-1.4 0 Z" fill={BRAND.paper} stroke={BRAND.ink} strokeWidth="0.3" strokeLinejoin="round" />
              <path d="M7 0 L-1.4 0 L-4.6 4.2 Z" fill="#E4E4DE" stroke={BRAND.ink} strokeWidth="0.3" strokeLinejoin="round" />
              <path d="M7 0 L-1.4 0 L-2.8 1.9 Z" fill={BRAND.cobalt} stroke={BRAND.ink} strokeWidth="0.25" strokeLinejoin="round" />
              <path d="M7 0 L-3 -2.2" stroke={BRAND.ink} strokeOpacity="0.35" strokeWidth="0.18" />
            </g>
          </svg>

          {/* EMAIL envelope (centre) */}
          <div data-depth="6" className="group absolute left-[29%] top-[59%] w-[42%]">
            <div data-c-item>
              <a href={LINKS.brief} data-float data-cursor="link" aria-label="Send Nexo a project brief" className={`relative block aspect-[1.55] [perspective:900px] ${lift}`}>
                <div className={`absolute inset-0 rounded-[10px] p-[4px] ${shadow}`} style={{ background: `repeating-linear-gradient(135deg, ${BRAND.cobalt} 0 9px, ${BRAND.paper} 9px 14px, ${BRAND.ember} 14px 23px, ${BRAND.paper} 23px 28px)`, zIndex: 0 }}>
                  <div className="h-full w-full rounded-[7px]" style={{ background: "#ECECE6" }} />
                </div>
                <div data-env-letter className="absolute left-[7%] right-[7%] top-[7%] h-[90%] rounded-[4px] bg-paper px-[7%] py-[6%] shadow-[0_10px_24px_-14px_rgba(14,15,20,0.5)]" style={{ zIndex: 1 }}>
                  <div className="flex items-center justify-between border-b border-ink/10 pb-[4%]"><span className={`${tiny} text-ink/45`}>New brief</span><span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.ember }} /></div>
                  <div className="mt-[5%] space-y-[3%]">{LETTER_LINES.map((line) => <div key={line.text} data-env-line className={LINE_CLASS[line.kind]}>{line.text}</div>)}</div>
                </div>
                <div className="absolute inset-0 rounded-[10px]" style={{ zIndex: 2, clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)", background: "linear-gradient(180deg, #F7F7F4, #EFEFE9)" }}>
                  <span className="absolute inset-0 rounded-[10px] border border-ink/10" />
                  <div className="absolute bottom-[11%] left-[7%]">
                    <div className={`${tiny} text-ink/40`}>Send a brief</div>
                    <div className="display text-[clamp(0.75rem,1.7vw,1.1rem)] leading-none">To Nexo Studio</div>
                  </div>
                  <div className={`${tiny} absolute bottom-[11%] right-[7%] text-right max-sm:hidden`} style={{ color: BRAND.ember }}>Priority<br />Airmail</div>
                </div>
                <div data-env-flap className="absolute inset-x-0 top-0 h-[56%] origin-top" style={{ zIndex: 3, clipPath: "polygon(0 0, 100% 0, 50% 100%)", background: "linear-gradient(180deg, #E4E4DD, #F2F2EC 70%)" }} />
              </a>
            </div>
          </div>

          {/* Promise strip */}
          <div data-depth="12" className="absolute bottom-[2%] left-1/2 -translate-x-1/2">
            <div data-c-item className="flex items-center gap-3 whitespace-nowrap rounded-full border border-ink/10 bg-paper/80 px-4 py-2 backdrop-blur-md">
              {[["≤ 24h reply", BRAND.ember], ["NDA on request", BRAND.mint], ["Founder-read", BRAND.cobalt]].map(([label, color]) => (
                <span key={label} className={`${tiny} flex items-center gap-1.5 text-ink/60`}><i className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
