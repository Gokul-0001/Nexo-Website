import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/brand";
import { ProjectArt } from "./Artwork";
import { SplitLines } from "@/components/animations/TextReveal";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function ProjectRow({ project, i }: { project: (typeof PROJECTS)[number]; i: number }) {
  const item = useRef<HTMLElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = item.current;
    if (!el || reduce) return;
    const ctx = gsap.context(() => {
      // media panel wipes up into view; the art inside parallaxes against it
      gsap.fromTo(
        "[data-media]",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.45,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        },
      );
      gsap.fromTo(
        "[data-art]",
        { yPercent: -5, scale: 1.2 },
        {
          yPercent: 5,
          scale: 1.2,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.7 },
        },
      );
      gsap.fromTo(
        "[data-title-word]",
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 86%" } },
      );
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  const [a, b] = project.palette;
  const offset = i % 2 === 1;

  return (
    <article
      ref={item}
      data-cursor="view"
      data-cursor-label="VIEW"
      className={`group relative ${offset ? "lg:pl-[14%]" : "lg:pr-[14%]"}`}
    >
      <div className={`flex flex-wrap items-end gap-x-6 gap-y-2 pb-5 ${offset ? "lg:flex-row-reverse lg:text-right" : ""}`}>
        <span data-title-word className="text-h3 block transition-colors duration-500 group-hover:text-[color:var(--tone)]"
          style={{ ["--tone" as string]: a }}>
          {project.title}
        </span>
        <span className="mb-2 flex flex-col gap-1 text-body-sm text-ink/55">
          <span className="text-mono-10 tracking-[0.2em] text-ink/40">
            {String(i + 1).padStart(2, "0")} / {project.year}
          </span>
          <span>{project.discipline}</span>
        </span>
        <span
          className="mb-2 ml-auto hidden h-[42px] w-[42px] place-items-center rounded-full border border-ink/15 transition-all duration-500 group-hover:border-transparent sm:grid"
          style={{ background: "transparent" }}
        >
          <svg width="16" height="16" viewBox="0 0 15 15" fill="none" className="text-ink/60 transition-transform duration-500 group-hover:translate-x-[3px]">
            <path d="M1 14L14 1M14 1H5M14 1v9" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      </div>

      <div className="relative overflow-hidden rounded-[22px] border border-ink/8 bg-paper-2">
        <div data-media className="relative aspect-[16/10.5] w-full sm:aspect-[16/9]">
          <div data-art className="absolute inset-0 origin-center scale-[1.2] will-change-transform">
            <div className="h-full w-full origin-center transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] group-hover:skew-y-[0.5deg] group-hover:saturate-[1.25]">
              <ProjectArt project={project} />
            </div>
          </div>
        </div>

        {/* brand overlay on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-hard-light transition-opacity duration-700 group-hover:opacity-70"
          style={{ background: `linear-gradient(120deg, ${a}, ${b})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/28 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* hover chrome */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
          <div className="flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="translate-y-3 rounded-full bg-paper/90 px-3 py-1.5 text-mono-9-sm tracking-[0.14em] text-ink/75 uppercase opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                style={{ transitionDelay: "80ms" }}
              >
                {m}
              </span>
            ))}
          </div>
          <span
            className="flex translate-y-3 items-center gap-2 rounded-full px-4 py-2 text-mono-9-sm tracking-[0.2em] text-paper uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ background: "rgba(14,15,20,0.82)", backdropFilter: "blur(8px)", transitionDelay: "140ms" }}
          >
            {project.client}
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: b }} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative z-10 py-[6vh] sm:py-[10vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-t border-ink/12 pt-6 sm:mb-20">
          <div>
            <span className="eyebrow mb-5 block text-ink/40">(03) — Selected work</span>
            <SplitLines lines={["SELECTED WORK"]} className="display text-[clamp(1.75rem,5.2vw,4.2rem)]" />
          </div>
          <div className="flex items-center gap-6">
            <p className="max-w-[26ch] text-body-sm leading-[1.6] text-ink/55">
              Four of twenty-one case studies from the last two years.
            </p>
            <a
              href="#contact"
              data-cursor="link"
              className="group flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-mono-9 uppercase transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
            >
              All projects
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-[14vh] sm:gap-[18vh]">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
