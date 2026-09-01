import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const root = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const pct = useRef<HTMLSpanElement | null>(null);
  const bar = useRef<HTMLSpanElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          end: "bottom 62%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });

      if (!reduce) {
        ScrollTrigger.create({
          trigger: "[data-process-track]",
          start: "top 78%",
          end: "bottom 60%",
          scrub: 0.5,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0.02, self.progress)})`;
            if (pct.current)
              pct.current.textContent = String(Math.round(self.progress * 100)).padStart(2, "0");
          },
        });

        gsap.fromTo(
          "[data-process-media]",
          { rotate: -14, y: 90, opacity: 0 },
          {
            rotate: 6,
            y: -60,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );
      }
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduce]);

  const current = PROCESS[active];

  return (
    <section id="process" ref={root} className="relative z-10 py-[12vh] sm:py-[16vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-[16vh] lg:h-fit">
            <span className="eyebrow mb-5 block text-ink/40">Our process</span>
            <SplitLines lines={["HOW WE", "BUILD"]} className="display text-[clamp(2.4rem,8vw,6rem)]" />

            <div className="relative mt-10 hidden h-[220px] lg:block">
              <div
                data-process-media
                className="absolute top-0 left-0 h-[168px] w-[168px] rounded-[34px] blur-[0.5px]"
                style={{
                  background: `conic-gradient(from 140deg, ${current.color}, #ffffff 38%, ${
                    PROCESS[(active + 1) % 5].color
                  } 72%, ${current.color})`,
                  boxShadow: `0 40px 80px -40px ${current.color}`,
                }}
              />
              <div className="absolute top-[76px] left-[104px] h-[92px] w-[92px] rounded-full border border-ink/12 bg-paper/70 backdrop-blur-sm" />
              <span className="display absolute top-[104px] left-[124px] text-[34px] text-ink">
                {current.step}
              </span>
            </div>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <span className="eyebrow text-ink/45">Progress</span>
                <span className="display text-[22px]">
                  <span ref={pct}>00</span>
                  <span className="text-ink/35">/100</span>
                </span>
              </div>
              <span className="mt-2 block h-[3px] w-full overflow-hidden rounded-full bg-ink/8">
                <span
                  ref={bar}
                  className="block h-full origin-left rounded-full"
                  style={{
                    transform: "scaleX(0.02)",
                    background: `linear-gradient(90deg, ${PROCESS.map((p) => p.color).join(", ")})`,
                  }}
                />
              </span>
            </div>
          </div>

          <div data-process-track className="relative pl-10 sm:pl-14">
            <span className="absolute top-2 bottom-2 left-[13px] w-px bg-ink/12 sm:left-[21px]">
              {PROCESS.map((p, i) => (
                <span
                  key={p.step}
                  className="absolute left-0 h-1/5 w-full transition-opacity duration-700"
                  style={{ top: `${i * 20}%`, background: p.color, opacity: i <= active ? 0.9 : 0.12 }}
                />
              ))}
            </span>

            <ol className="space-y-3">
              {PROCESS.map((p, i) => {
                const isActive = i === active;
                return (
                  <li key={p.step} data-step className="relative">
                    <span
                      className="absolute top-8 -left-10 grid h-[27px] w-[27px] place-items-center rounded-full border transition-all duration-500 sm:-left-14 sm:h-[34px] sm:w-[34px]"
                      style={{
                        borderColor: isActive ? p.color : "rgba(46,58,70,0.15)",
                        background: isActive ? p.color : "#fff",
                        transform: `scale(${isActive ? 1.08 : 1})`,
                      }}
                    >
                      <span
                        className="block h-[6px] w-[6px] rounded-full transition-colors duration-500"
                        style={{ background: isActive ? "#fff" : "rgba(46,58,70,0.35)" }}
                      />
                    </span>

                    <div
                      className="overflow-hidden rounded-[20px] border transition-[background,border-color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        borderColor: isActive ? `${p.color}59` : "rgba(46,58,70,0.08)",
                        background: isActive ? `linear-gradient(120deg, ${p.color}14, #ffffff 62%)` : "#ffffff",
                        transform: `translateX(${isActive ? 10 : 0}px)`,
                      }}
                    >
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 pt-6 sm:px-7">
                        <span
                          className="font-mono text-[11px] tracking-[0.16em]"
                          style={{ color: isActive ? p.color : "rgba(46,58,70,0.35)" }}
                        >
                          {p.step}
                        </span>
                        <h3
                          className="display text-[clamp(1.5rem,4.4vw,2.6rem)] transition-colors duration-500"
                          style={{ color: isActive ? p.color : "#2E3A46" }}
                        >
                          {p.title}
                        </h3>
                        <span className="eyebrow ml-auto text-ink/40">{p.duration}</span>
                      </div>
                      <p className="max-w-[54ch] px-5 pt-3 pb-6 text-[14px] leading-[1.6] text-ink/60 sm:px-7">
                        {p.body}
                      </p>
                      <div
                        className="grid gap-px overflow-hidden border-t bg-ink/8 transition-[max-height,opacity] duration-700 sm:grid-cols-3"
                        style={{ maxHeight: isActive ? 90 : 0, opacity: isActive ? 1 : 0 }}
                      >
                        {p.deliverables.map((d) => (
                          <span
                            key={d}
                            className="bg-paper px-5 py-3 font-mono text-[9.5px] tracking-[0.14em] text-ink/55 uppercase"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
