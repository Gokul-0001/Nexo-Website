import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { useMagnetic, usePrefersReducedMotion } from "@/lib/motion";
import { Reveal, SplitLines } from "@/components/animations/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const BUDGETS = ["< 25K", "25–60K", "60–120K", "120K +"];

/* ──────────────────────────────────────────────────────────────────────────
   Home — Final CTA (the cinematic closing moment).
   ──────────────────────────────────────────────────────────────────────────
   Composition (top → bottom):

     - Dark rounded panel with `BRAND.ink` background
     - anim-drift brand glows → soft warm haze in the panel background
     - conic sweep           → existing anim-spin-slow band
     - grain overlay         → final texture pass
     - headline (text-h2-md) → global H2 token, line-by-line reveal via
                                 SplitLines. Gradient word on the middle line
                                 (SOMETHING), gradient on EXTRAORDINARY.
     - paragraph + CTA pair  → magnetic lime primary + email link
     - receipt form          → right rail form panel (unchanged behaviour)

   Motion (new):
     - On scroll into view the panel settles in (border-radius eases from
       60 → 30, scale 0.97 → 1) — same recipe the Contact FinalCTA uses.
     - The headline drifts a fraction on scroll for cinematic depth.
     - Headline word mask reveal via per-word yPercent slide.
   ────────────────────────────────────────────────────────────────────────── */

export default function CTA() {
  const btn = useMagnetic<HTMLButtonElement>(0.25);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.brief.trim().length < 12) {
      setError("Add a name, a valid email and a line or two about the project.");
      return;
    }
    setError("");
    setSent(true);
  };

  /* ── Cinematic entrance + parallax ──────────────────────────────────── */
  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      // Panel settles in: rounded corners ease from 60 → 30, slight scale
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { scale: 0.97, borderRadius: 60 },
          {
            scale: 1,
            borderRadius: 30,
            ease: "none",
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 92%",
              end: "top 35%",
              scrub: 0.7,
            },
          },
        );
      }
      // Headline drifts + fades as the panel enters
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { yPercent: 6, opacity: 0.4 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 90%",
              end: "top 40%",
              scrub: 0.6,
            },
          },
        );
      }
      // Per-word mask reveal inside the headline (SplitLines exposes
      // [data-line-inner] on every masked word).
      const words = gsap.utils.toArray<HTMLElement>(
        "[data-line-inner]",
        headlineRef.current ?? undefined,
      );
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 82%",
            },
          },
        );
      }
    });
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="contact" className="relative z-10 px-3 pt-[1vh] pb-[9vh] sm:px-6 sm:pb-[13vh]">
      <div
        ref={panelRef}
        data-cursor="none"
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[30px] px-5 py-[9vh] sm:rounded-[42px] sm:px-10 sm:py-[12vh]"
        style={{ background: BRAND.ink }}
      >
        {/* Soft brand glows — adds depth + warmth */}
        <div
          className="anim-drift pointer-events-none absolute -top-[36%] -left-[16%] h-[86%] w-[70%] rounded-full blur-[70px]"
          style={{ background: `radial-gradient(circle, ${BRAND.cobalt}, transparent 66%)`, opacity: 0.55 }}
        />
        <div
          className="anim-drift pointer-events-none absolute -right-[14%] -bottom-[30%] h-[80%] w-[58%] rounded-full blur-[80px]"
          style={{
            background: `radial-gradient(circle, ${BRAND.ember}, transparent 64%)`,
            opacity: 0.45,
            animationDelay: "-8s",
          }}
        />
        <div
          className="anim-drift pointer-events-none absolute top-[26%] right-[34%] h-[38%] w-[26%] rounded-full blur-[60px]"
          style={{
            background: `radial-gradient(circle, ${BRAND.mint}, transparent 62%)`,
            opacity: 0.4,
            animationDelay: "-14s",
          }}
        />

        {/* Slow conic sweep */}
        <div
          className="anim-spin-slow pointer-events-none absolute -top-[45%] left-1/2 h-[130%] w-[130%] -translate-x-1/2 opacity-[0.10]"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${BRAND.lime} 22%, transparent 44%, ${BRAND.cobalt} 70%, transparent)`,
          }}
        />

        <div className="relative grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <span className="eyebrow mb-6 flex items-center gap-2 text-lime">
              <i className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: BRAND.lime }} />
              Two project slots left · Q3 2026
            </span>

            <div ref={headlineRef}>
              <SplitLines
                lines={["LET'S BUILD", "SOMETHING", "EXTRAORDINARY."]}
                stagger={0.11}
                className="display text-h2-md text-paper"
                render={(line, i) =>
                  i === 0 ? (
                    <span className="block">{line}</span>
                  ) : i === 1 ? (
                    <span className="block" style={{ color: BRAND.lime }}>
                      {line}
                    </span>
                  ) : (
                    <span
                      className="block bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(96deg, ${BRAND.mint}, ${BRAND.paper} 30%, ${BRAND.ember} 50%, ${BRAND.mint})`,
                        backgroundSize: "300% 100%",
                        animation: "kroma-gradient-pan 12s linear infinite",
                      }}
                    >
                      {line}
                    </span>
                  )
                }
              />
            </div>

            <p className="mt-8 max-w-[46ch] text-[14.5px] leading-[1.66] text-paper/70">
              Send a brief, a rough budget and a deadline. You will hear back from a founder
              within 24 hours — with a point of view, not a brochure.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                ref={btn}
                type="submit"
                form="nexo-brief"
                data-cursor="magnet"
                className="group relative overflow-hidden rounded-full px-8 py-5 text-mono-10-5 tracking-[0.2em] text-ink uppercase"
                style={{ background: BRAND.lime }}
              >
                <span
                  className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                  style={{ background: `linear-gradient(100deg, ${BRAND.paper}, ${BRAND.lime})` }}
                />
                <span className="relative flex items-center gap-3">
                  Start a project
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    className="transition-transform duration-500 group-hover:translate-x-1.5"
                  >
                    <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </button>

              <a
                href="mailto:studio@nexo.studio"
                data-cursor="link"
                className="border-b border-paper/25 pb-1 text-mono-10-5 text-paper/75 uppercase transition-colors duration-500 hover:border-paper hover:text-paper"
              >
                studio@nexo.studio
              </a>
            </div>
          </div>

          <Reveal y={40} className="relative">
            <div className="rounded-[24px] border border-paper/15 bg-paper/8 p-6 backdrop-blur-md sm:p-8">
              {sent ? (
                <div className="flex min-h-[320px] flex-col items-start justify-center">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full"
                    style={{ background: BRAND.mint }}
                  >
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <path d="M1 7l5.5 5.5L17 1.5" stroke={BRAND.ink} strokeWidth="2" />
                    </svg>
                  </span>
                  <h3 className="display mt-6 text-[22px] text-paper">Brief received.</h3>
                  <p className="mt-3 max-w-[34ch] text-body-caption leading-relaxed text-paper/70">
                    Thanks {form.name.split(" ")[0]} — we read every submission ourselves. Expect a
                    reply from the studio within one working day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", brief: "" });
                    }}
                    className="mt-8 text-mono-9 text-paper/60 uppercase underline-offset-4 hover:text-paper hover:underline"
                  >
                    Send another brief
                  </button>
                </div>
              ) : (
                <form id="nexo-brief" onSubmit={submit} className="space-y-5" noValidate>
                  <span className="eyebrow block text-paper/50">Project brief</span>

                  {[
                    { k: "name" as const, label: "Your name", type: "text", placeholder: "Maya Lindqvist" },
                    { k: "email" as const, label: "Email", type: "email", placeholder: "maya@company.com" },
                  ].map((f) => (
                    <label key={f.k} className="block">
                      <span className="text-mono-9 text-paper/55 uppercase">
                        {f.label}
                      </span>
                      <input
                        type={f.type}
                        value={form[f.k]}
                        placeholder={f.placeholder}
                        onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                        className="mt-2 w-full border-b border-paper/20 bg-transparent pb-2 text-[14px] text-paper placeholder:text-paper/25 focus:border-lime focus:outline-none"
                      />
                    </label>
                  ))}

                  <div>
                    <span className="text-mono-9 text-paper/55 uppercase">
                      Budget range
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          data-cursor="link"
                          className="rounded-full border px-3.5 py-2 text-mono-9 tracking-[0.12em] transition-all duration-400"
                          style={{
                            borderColor: budget === b ? BRAND.lime : "rgba(255,255,255,0.22)",
                            background: budget === b ? BRAND.lime : "transparent",
                            color: budget === b ? BRAND.ink : "rgba(255,255,255,0.7)",
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block">
                    <span className="text-mono-9 text-paper/55 uppercase">
                      What are we building?
                    </span>
                    <textarea
                      rows={3}
                      value={form.brief}
                      placeholder="A new commerce experience for a lighting brand…"
                      onChange={(e) => setForm({ ...form, brief: e.target.value })}
                      className="mt-2 w-full resize-none border-b border-paper/20 bg-transparent pb-2 text-[14px] text-paper placeholder:text-paper/25 focus:border-lime focus:outline-none"
                    />
                  </label>

                  {error && (
                    <p className="text-mono-9 tracking-[0.08em]" style={{ color: BRAND.ember }}>
                      {error}
                    </p>
                  )}

                  <p className="text-[11.5px] leading-relaxed text-paper/45">
                    NDA on request. We reply to everything, even the ones we cannot take.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
