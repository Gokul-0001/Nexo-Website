import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type SplitProps = {
  /** one string per visual line */
  lines: string[];
  className?: string;
  lineClassName?: string;
  /** "load" plays immediately, "scroll" plays when the block enters the viewport */
  from?: "load" | "scroll";
  delay?: number;
  stagger?: number;
  as?: ElementType;
  id?: string;
  /** customise how a line is rendered (gradient word, mark, …) */
  render?: (line: string, i: number) => ReactNode;
};

/**
 * Line-by-line mask reveal. Copy is split by hand so the markup stays static,
 * readable for crawlers and cheap on mobile.
 */
export function SplitLines({
  lines,
  className = "",
  lineClassName = "",
  from = "scroll",
  delay = 0,
  stagger = 0.09,
  as: Tag = "h2",
  id,
  render,
}: SplitProps) {
  const root = useRef<HTMLElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const spans = gsap.utils.toArray<HTMLElement>("[data-line-inner]", el);

    if (reduce) {
      gsap.set(spans, { yPercent: 0, opacity: 1 });
      return;
    }

    let observer: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      gsap.set(spans, { yPercent: 118, opacity: 0 });
      const reveal = () => gsap.to(spans, {
        yPercent: 0,
        opacity: 1,
        duration: 1.15,
        ease: "expo.out",
        stagger,
        delay,
      });

      if (from === "load") {
        reveal();
        return;
      }

      // This matches the original "top 84%" trigger point while avoiding
      // App Router hydration timing that can leave the initial hidden state
      // applied indefinitely.
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          reveal();
        },
        { rootMargin: "0px 0px -16% 0px" },
      );
      observer.observe(el);
    }, el);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, [from, delay, stagger, reduce, lines.length]);

  const Heading = Tag as unknown as "h2";

  return (
    <Heading id={id} ref={root as never} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`reveal-line ${lineClassName}`}>
          <span data-line-inner>{render ? render(line, i) : line}</span>
        </span>
      ))}
    </Heading>
  );
}

/** Generic scroll reveal for blocks, images, rows. */
export function Reveal({
  children,
  className = "",
  y = 48,
  duration = 1.05,
  start = "top 85%",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  start?: string;
  delay?: number;
  as?: ElementType;
}) {
  const el = useRef<HTMLElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const node = el.current;
    if (!node || reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { y, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration,
          ease: "expo.out",
          delay,
          scrollTrigger: { trigger: node, start },
        },
      );
    });
    return () => ctx.revert();
  }, [y, duration, start, delay, reduce]);

  const Box = Tag as unknown as "div";

  return (
    <Box ref={el as never} className={className}>
      {children}
    </Box>
  );
}

/** Numbers that count up once scrolled into view. */
export function Counter({
  to,
  suffix = "",
  decimals = 0,
  className = "",
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const el = useRef<HTMLSpanElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const node = el.current;
    if (!node) return;
    if (reduce) {
      node.textContent = to.toFixed(decimals) + suffix;
      return;
    }
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: to,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start: "top 90%", once: true },
        onUpdate: () => {
          node.textContent = obj.v.toFixed(decimals) + suffix;
        },
      });
    });
    return () => ctx.revert();
  }, [to, suffix, decimals, reduce]);

  return (
    <span ref={el} className={className}>
      0{suffix}
    </span>
  );
}
