"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const RIBBONS = [
  { words: ["Websites", "Online stores", "Mobile apps", "Campaigns", "Automation"], bg: BRAND.cobalt, ink: BRAND.paper, star: BRAND.lime, angle: -4, dir: 1, speed: "38s" },
  { words: ["Built to perform", "Made to convert", "Designed for growth"], bg: BRAND.lime, ink: BRAND.ink, star: BRAND.ember, angle: 3.5, dir: -1, speed: "32s" },
] as const;

function Ribbon({ ribbon }: { ribbon: (typeof RIBBONS)[number] }) {
  // Enough copies to cover very wide screens; the CSS marquee moves the track by half its width.
  const run = [...ribbon.words, ...ribbon.words, ...ribbon.words];
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <div data-ribbon className="w-[130vw] shrink-0 shadow-[0_24px_50px_-30px_rgba(14,15,20,0.55)]" style={{ background: ribbon.bg, transform: `rotate(${ribbon.angle}deg)` }}>
      <div data-ribbon-push className="flex">
        <div className="anim-marquee flex shrink-0 items-center py-[clamp(0.8rem,1.6vw,1.3rem)]" style={{ "--marquee-duration": ribbon.speed, animationDirection: ribbon.dir === 1 ? "normal" : "reverse" } as React.CSSProperties}>
          {[...run, ...run].map((word, index) => (
            <span key={index} className="flex shrink-0 items-center">
              <span className="display whitespace-nowrap px-[clamp(0.8rem,1.6vw,1.5rem)] text-[clamp(1.4rem,3.6vw,3.2rem)] leading-none uppercase" style={{ color: ribbon.ink }}>{word}</span>
              <svg viewBox="0 0 24 24" className="h-[clamp(0.9rem,2vw,1.6rem)] w-[clamp(0.9rem,2vw,1.6rem)] shrink-0" fill={ribbon.star} aria-hidden><path d="M12 1l2.8 8.2L23 12l-8.2 2.8L12 23l-2.8-8.2L1 12l8.2-2.8Z" /></svg>
            </span>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

/** Interlude between service showcases: two bold ribbons crossing the page. */
export default function WorkStatement() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const ribbons = gsap.utils.toArray<HTMLElement>("[data-ribbon]", element);
      const pushes = gsap.utils.toArray<HTMLElement>("[data-ribbon-push]", element);
      // Ribbons swing into their crossed angle as the section arrives…
      ribbons.forEach((ribbon, index) => {
        gsap.fromTo(ribbon, { rotate: 0, opacity: 0, scaleY: 0.6 }, { rotate: RIBBONS[index].angle, opacity: 1, scaleY: 1, ease: "none", scrollTrigger: { trigger: element, start: "top 90%", end: "top 40%", scrub: 0.6 } });
      });
      // …and scrolling pushes each one further in its own direction, on top of the steady marquee.
      pushes.forEach((push, index) => {
        const dir = RIBBONS[index].dir;
        gsap.fromTo(push, { xPercent: dir * 6 }, { xPercent: dir * -14, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.5 } });
      });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-label="Websites, online stores, mobile apps, campaigns and automation — built to perform, made to convert" className="relative z-10 mb-[4vh] mt-[6vh] h-[clamp(240px,40vh,420px)] overflow-hidden sm:mb-[5vh] sm:mt-[9vh]">
      {RIBBONS.map((ribbon, index) => <Ribbon key={index} ribbon={ribbon} />)}
    </section>
  );
}
