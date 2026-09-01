import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Marquee({
  items,
  duration = 34,
  className = "",
  itemClassName = "",
  reverse = false,
}: {
  items: string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
  reverse?: boolean;
}) {
  const row = (
    <span className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t, i) => (
        <span key={i} className={`flex items-center gap-10 ${itemClassName}`}>
          {t}
          <i className="h-1.5 w-1.5 rotate-45" style={{ background: BRAND.ember }} />
        </span>
      ))}
    </span>
  );

  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div
        className="anim-marquee flex w-max group-hover:[animation-play-state:paused]"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}

export function TransitionBand({
  text,
  tone = "ink",
  flip = false,
}: {
  text: string[];
  tone?: "ink" | "cobalt" | "ember";
  flip?: boolean;
}) {
  const band = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return;
    const el = band.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-band-line]",
        { xPercent: () => (flip ? 7 : -7) },
        { xPercent: () => (flip ? -7 : 7), ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
      );
      gsap.fromTo(
        "[data-band-fill]",
        { scaleX: 0, opacity: 0.15 },
        { scaleX: 1, opacity: 0.85, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 85%", end: "center center", scrub: 0.8 } },
      );
    }, el);
    return () => ctx.revert();
  }, [reduce, flip]);

  const color = tone === "cobalt" ? BRAND.cobalt : tone === "ember" ? BRAND.ember : BRAND.ink;

  return (
    <div ref={band} className="relative z-10 my-[10vh] overflow-hidden py-10 sm:py-14">
      <div
        data-band-fill
        className="absolute inset-x-[3%] inset-y-2 origin-left rounded-[28px] blur-[2px]"
        style={{ background: `linear-gradient(100deg, ${color}12, ${BRAND.mint}22 45%, ${BRAND.ember}18)` }}
      />
      <div className="relative flex flex-col items-center gap-1">
        {text.map((l, i) => (
          <span
            key={i}
            data-band-line
            className="display whitespace-nowrap text-[clamp(2.4rem,8.6vw,8rem)] leading-[0.84]"
            style={{ color: i % 2 === 1 ? color : BRAND.ink, opacity: i % 2 === 1 ? 1 : 0.9 }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
