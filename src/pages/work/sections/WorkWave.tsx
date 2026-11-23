"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

/** Two shapes of the same wave (same command structure) so GSAP can morph between them. */
const WAVE_A = "M-1600 150 C -1300 50, -1000 50, -700 150 S -100 250, 200 150 S 800 50, 1100 150 S 1700 250, 2000 150 S 2600 50, 2900 150";
const WAVE_B = "M-1600 150 C -1300 90, -1000 90, -700 150 S -100 210, 200 150 S 800 90, 1100 150 S 1700 210, 2000 150 S 2600 90, 2900 150";

const PHRASE: { text: string; color: string }[] = [
  { text: "FROM ", color: BRAND.ink }, { text: "IDEA", color: BRAND.cobalt }, { text: "  ✦  ", color: BRAND.lime },
  { text: "TO ", color: BRAND.ink }, { text: "LAUNCH", color: BRAND.ember }, { text: "  ✦  ", color: BRAND.lime },
  { text: "TO ", color: BRAND.ink }, { text: "GROWTH", color: BRAND.mint }, { text: "  ✦  ", color: BRAND.lime },
];

/** Interlude: a sentence flowing along an undulating wave, gliding with the scroll. */
export default function WorkWave() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // The wave breathes on its own…
      gsap.to("#work-wave", { attr: { d: WAVE_B }, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      // …the sentence glides along it with the scroll…
      gsap.fromTo("[data-wave-text]", { attr: { startOffset: 700 } }, { attr: { startOffset: 2300 }, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      // …and the band fades and lifts in as it arrives.
      gsap.fromTo("[data-wave-band]", { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: element, start: "top 92%", end: "top 55%", scrub: 0.6 } });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-label="From idea, to launch, to growth"
      className="relative z-10 mb-[4vh] mt-[6vh] overflow-hidden sm:mb-[5vh] sm:mt-[9vh]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="anim-drift absolute left-[20%] top-1/2 h-[30vh] w-[30vh] -translate-y-1/2 rounded-full blur-[100px]" style={{ background: `${BRAND.cobalt}22` }} />
        <div className="anim-drift absolute right-[18%] top-1/2 h-[28vh] w-[28vh] -translate-y-1/2 rounded-full blur-[100px]" style={{ background: `${BRAND.ember}1e`, animationDelay: "-7s" }} />
      </div>

      <div data-wave-band className="relative">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="xMidYMid slice" className="block h-[clamp(150px,26vw,300px)] w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="work-wave-stroke" x1="0" x2="1">
              <stop offset="0" stopColor={BRAND.cobalt} />
              <stop offset="0.5" stopColor={BRAND.mint} />
              <stop offset="1" stopColor={BRAND.ember} />
            </linearGradient>
          </defs>
          {/* Guide line the text rides on */}
          <path id="work-wave" d={WAVE_A} fill="none" stroke="url(#work-wave-stroke)" strokeOpacity="0.25" strokeWidth="2" />
          <text className="display" fontSize="64" dy="-14" letterSpacing="1">
            <textPath data-wave-text href="#work-wave" startOffset="700">
              {[0, 1, 2, 3].map((copy) => (
                <Fragment key={copy}>
                  {PHRASE.map((part, index) => <tspan key={index} fill={part.color}>{part.text}</tspan>)}
                </Fragment>
              ))}
            </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}
