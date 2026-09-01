import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND, SERVICES } from "@/lib/brand";
import { ServiceArt } from "./Artwork";
import { SplitLines } from "@/components/animations/TextReveal";
import { isTouchDevice } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const root = useRef<HTMLDivElement | null>(null);
  const preview = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState<number | null>(null);
  const touch = isTouchDevice();

  /* cursor-following preview card (lerped, rAF, only while hovering) */
  useEffect(() => {
    if (touch) return;
    const el = preview.current;
    if (!el) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let down = false;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!down) {
        down = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.13;
      pos.y += (target.y - pos.y) * 0.13;
      const rot = (target.x - pos.x) * 0.35;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [touch]);

  /* staggered row reveal */
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-service-row]",
        { y: 46, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: "[data-service-list]", start: "top 80%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const activeService = active !== null ? SERVICES[active] : null;

  return (
    <section id="services" ref={root} className="relative z-10 py-[12vh] sm:py-[16vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* header */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow mb-5 block text-ink/40">(02) — Capabilities</span>
            <SplitLines
              lines={["WHAT WE", "CREATE"]}
              className="display text-[clamp(2.6rem,9vw,7.6rem)]"
              lineClassName="pb-[0.02em]"
            />
          </div>
          <p className="max-w-[42ch] text-[15px] leading-[1.62] text-ink/60 lg:pb-4">
            Six disciplines, one team. We move between strategy, design and engineering without
            hand-offs — so the idea that sold the work is the idea that ships.
          </p>
        </div>

        {/* list */}
        <div data-service-list className="mt-14 border-t border-ink/12 sm:mt-20">
          {SERVICES.map((s, i) => {
            const isActive = active === i;
            const dimmed = (active !== null && !isActive) || (openMobile !== null && openMobile !== i && touch);
            const expanded = touch ? openMobile === i : isActive;
            return (
              <div
                key={s.id}
                data-service-row
                className="relative border-b border-ink/12"
                onMouseEnter={() => !touch && setActive(i)}
                onMouseLeave={() => !touch && setActive(null)}
              >
                {/* brand-coloured field that inflates on hover */}
                <div
                  className="pointer-events-none absolute inset-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `scaleX(${expanded ? 1 : 0})`,
                    background: `linear-gradient(96deg, ${s.color}1f, ${s.color}0a 55%, transparent)`,
                  }}
                />
                <button
                  type="button"
                  data-cursor={touch ? "link" : "view"}
                  data-cursor-label={touch ? "" : "OPEN"}
                  aria-expanded={expanded}
                  onClick={() => touch && setOpenMobile(openMobile === i ? null : i)}
                  className="relative flex w-full items-center gap-4 px-1 text-left transition-[padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:gap-8 sm:px-6"
                  style={{ paddingBlock: expanded ? "34px" : "24px" }}
                >
                  <span
                    className="font-mono text-[11px] tracking-[0.14em] transition-colors duration-500"
                    style={{ color: expanded ? s.color : "rgba(14,15,20,0.35)" }}
                  >
                    {s.index}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className="display block text-[clamp(1.6rem,6.4vw,4.15rem)] leading-[0.92] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: `translateX(${expanded ? "14px" : "0"})`,
                        opacity: dimmed ? 0.32 : 1,
                        color: expanded && !touch ? s.color : BRAND.ink,
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 overflow-hidden text-[13px] text-ink/55 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        maxHeight: expanded ? 140 : 0,
                        opacity: expanded ? 1 : 0,
                        transform: `translateY(${expanded ? 0 : -10}px)`,
                      }}
                    >
                      <span className="max-w-[52ch] leading-[1.55]">{s.blurb}</span>
                      <span className="hidden h-3 w-px bg-ink/15 sm:block" />
                      {s.tags.map((t) => (
                        <span key={t} className="eyebrow text-ink/45">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>

                  {/* mobile thumbnail */}
                  {touch && expanded && (
                    <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                      <ServiceArt kind={s.art} color={s.color} />
                    </div>
                  )}

                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 sm:h-12 sm:w-12"
                    style={{
                      borderColor: expanded ? s.color : "rgba(14,15,20,0.15)",
                      background: expanded ? s.color : "transparent",
                      transform: `rotate(${expanded ? 45 : 0}deg) scale(${expanded ? 1.06 : 1})`,
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      className="transition-colors duration-500"
                      style={{ color: expanded ? "#fff" : "rgba(14,15,20,0.6)" }}
                    >
                      <path d="M1 14L14 1M14 1H5M14 1v9" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* trailing note */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow text-ink/40">Retainers · Sprint builds · Full engagements</p>
          <p className="text-[13px] text-ink/50">
            Not sure where to start?{" "}
            <a href="#contact" data-cursor="link" className="relative text-ink underline decoration-ink/25 underline-offset-4 transition-all hover:decoration-ink">
              Book a 30-minute teardown →
            </a>
          </p>
        </div>
      </div>

      {/* cursor-following visual */}
      {!touch && (
        <div
          ref={preview}
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[60] hidden h-[190px] w-[280px] transition-[opacity,scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block"
          style={{
            opacity: activeService ? 1 : 0,
            scale: activeService ? "1" : "0.82",
            boxShadow: activeService ? `0 30px 70px -30px ${activeService.color}88` : "none",
          }}
        >
          {activeService && <ServiceArt kind={activeService.art} color={activeService.color} />}
        </div>
      )}
    </section>
  );
}
