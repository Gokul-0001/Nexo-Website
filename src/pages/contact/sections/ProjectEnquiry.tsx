"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { useMagnetic } from "@/lib/motion";
import { Reveal } from "@/components/animations/TextReveal";

const BUDGETS = ["< 25K", "25–60K", "60–120K", "120K +"];

type FormState = {
  name: string;
  email: string;
  company: string;
  type: string;
  budget: string;
  brief: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  company: "",
  type: "Website Development",
  budget: BUDGETS[1],
  brief: "",
};

const TYPE_OPTIONS = [
  { label: "Website Development", short: "WEB", color: BRAND.cobalt },
  { label: "Ecommerce", short: "COMMERCE", color: BRAND.ember },
  { label: "App Development", short: "APP", color: BRAND.mint },
  { label: "Digital Marketing", short: "GROWTH", color: BRAND.lime },
  { label: "Automation", short: "OPS", color: BRAND.cobalt },
];

/**
 * Five-step studio pipeline (mirrors the Home Process rhythm but tuned to the
 * contact experience: it tells the visitor exactly what happens after the brief
 * is sent).
 */
const PIPELINE = [
  {
    step: "01",
    name: "Read",
    color: BRAND.cobalt,
    time: "≤ 24h",
    body: "A founder reads the brief personally and replies with a point of view, a budget sense and the next step.",
  },
  {
    step: "02",
    name: "Teardown",
    color: BRAND.mint,
    time: "30 min · free",
    body: "If it is a real fit, we meet for a 30-minute call. We come with research, references and a sketch of the work.",
  },
  {
    step: "03",
    name: "Scope",
    color: BRAND.lime,
    time: "Week 1",
    body: "A written scope: deliverables, timeline, fixed fee or retainer. No hidden hours, no account layer.",
  },
  {
    step: "04",
    name: "Build",
    color: BRAND.ember,
    time: "6 – 12 weeks",
    body: "Weekly staging links. Senior hands on the work. Performance budget enforced in CI.",
  },
  {
    step: "05",
    name: "Ship",
    color: BRAND.cobalt,
    time: "90 day handover",
    body: "Launch, measure, iterate. We stay on the deck for 90 days, then hand over a machine your team can run.",
  },
];

export default function ProjectEnquiry() {
  const btn = useMagnetic<HTMLButtonElement>(0.28);
  const fieldGrid = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLOListElement | null>(null);
  const pipeFill = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [refCode, setRefCode] = useState<string>("0000");

  // Deterministic, name-based "reference code" — printed on the receipt.
  useEffect(() => {
    if (sent) {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      const seed = (form.name.length + form.email.length) % chars.length;
      const out: string[] = [];
      for (let i = 0; i < 4; i += 1) {
        const ch = chars[(seed * (i + 3) + form.name.charCodeAt(i % Math.max(1, form.name.length))) % chars.length];
        out.push(ch);
      }
      setRefCode(out.join(""));
    }
  }, [sent, form.name, form.email]);

  // Form fields staggered entrance
  useLayoutEffect(() => {
    const el = fieldGrid.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-enquiry-field]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play reverse play reverse" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  // Pipeline progress — the vertical timeline gets a layered set of
  // scroll-triggered animations:
  //   1. The connecting fill bar scrubs top→bottom with the scroll position.
  //   2. Each step's brand-coloured dot pulses / grows when its row enters.
  //   3. The step label slides in from the left and the body from the right.
  //   4. Step rows flip their "active" state in sync with the progress bar
  //      (the dot fills, the body becomes full-opacity, the dot ring scales).
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const fillEl = pipeFill.current;
    const triggerEl = track.current;
    if (!fillEl || !triggerEl) return;

    const ctx = gsap.context(() => {
      // 1) Vertical fill bar — scrubs with the scroll progress
      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top 75%",
        end: "bottom 65%",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = Math.max(0.02, self.progress);
          fillEl.style.transform = `scaleY(${p})`;
        },
      });

      // 2) Per-step dot pulse + ring growth when its row enters the viewport
      const steps = gsap.utils.toArray<HTMLElement>("[data-pipe-step]", triggerEl);
      steps.forEach((step) => {
        const dot = step.querySelector("[data-pipe-dot]");
        const ring = step.querySelector("[data-pipe-ring]");
        const label = step.querySelector("[data-pipe-label]");
        const body = step.querySelector("[data-pipe-body]");
        const time = step.querySelector("[data-pipe-time]");

        // dot scale + ring expansion
        gsap.fromTo(
          [dot, ring].filter(Boolean),
          { scale: 0.4, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: { trigger: step, start: "top 80%", toggleActions: "play reverse play reverse" },
          },
        );

        // label slides in from the left
        if (label) {
          gsap.fromTo(
            label,
            { x: -16, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "expo.out",
              scrollTrigger: { trigger: step, start: "top 80%", toggleActions: "play reverse play reverse" },
            },
          );
        }

        // body fades + slides from the right
        if (body) {
          gsap.fromTo(
            body,
            { x: 24, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: "expo.out",
              delay: 0.1,
              scrollTrigger: { trigger: step, start: "top 80%", toggleActions: "play reverse play reverse" },
            },
          );
        }

        // time pill pops
        if (time) {
          gsap.fromTo(
            time,
            { y: -6, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "expo.out",
              delay: 0.18,
              scrollTrigger: { trigger: step, start: "top 80%", toggleActions: "play reverse play reverse" },
            },
          );
        }
      });

      // 3) The fill bar's gradient slides downward as the visitor scrolls
      gsap.fromTo(
        fillEl,
        { backgroundPosition: "0% 0%" },
        {
          backgroundPosition: "0% 100%",
          ease: "none",
          scrollTrigger: { trigger: triggerEl, start: "top 75%", end: "bottom 65%", scrub: 0.6 },
        },
      );
    }, track);

    return () => ctx.revert();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.brief.trim().length < 12) {
      setError("Add a name, a valid email and a line or two about the project.");
      return;
    }
    setError("");
    setSent(true);
  };

  function update(key: keyof FormState, value: FormState[keyof FormState]) {
    setForm({ ...form, [key]: value });
  }

  return (
    <section id="enquiry" className="relative z-10 px-3 pt-[1vh] pb-[6vh] sm:px-6 sm:pb-[8vh]">
      <div
        data-cursor="none"
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[30px] px-5 py-[9vh] sm:rounded-[42px] sm:px-10 sm:py-[12vh]"
        style={{ background: BRAND.ink }}
      >
        {/* Ambient layer */}
        <div
          aria-hidden
          className="anim-drift absolute -top-[36%] -left-[16%] h-[80%] w-[68%] rounded-full blur-[80px]"
          style={{ background: `radial-gradient(circle, ${BRAND.cobalt}, transparent 66%)`, opacity: 0.85 }}
        />
        <div
          aria-hidden
          className="anim-drift absolute -right-[14%] -bottom-[30%] h-[78%] w-[58%] rounded-full blur-[80px]"
          style={{
            background: `radial-gradient(circle, ${BRAND.ember}, transparent 64%)`,
            opacity: 0.72,
            animationDelay: "-8s",
          }}
        />
        <div
          aria-hidden
          className="anim-drift absolute top-[26%] right-[34%] h-[36%] w-[24%] rounded-full blur-[60px]"
          style={{
            background: `radial-gradient(circle, ${BRAND.mint}, transparent 62%)`,
            opacity: 0.7,
            animationDelay: "-14s",
          }}
        />
        <div className="grain absolute inset-0 opacity-[0.22] mix-blend-overlay" />
        <div
          aria-hidden
          className="anim-spin-slow absolute -top-[45%] left-1/2 h-[130%] w-[130%] -translate-x-1/2 opacity-[0.12]"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${BRAND.lime} 22%, transparent 44%, ${BRAND.cobalt} 70%, transparent)`,
          }}
        />

        {/* Section header — dark panel, editorial */}
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="eyebrow mb-5 flex items-center gap-2 text-lime">
              <i className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: BRAND.lime }} />
              Project brief
            </span>
            <h2 className="display text-h2-md leading-[0.92] text-paper">
              <span className="block">Tell us about the</span>
              <span className="block" style={{ color: BRAND.lime }}>
                next thing we build.
              </span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-[14px] leading-[1.66] text-paper/70">
              Send a brief, a rough budget and a deadline. You will hear back from a founder
              within 24 hours — with a point of view, not a brochure.
            </p>
          </div>
          {/* Filing strip */}
          <div className="text-mono-9 tracking-[0.22em] text-paper/45 uppercase">
            <div className="flex items-center justify-end gap-2">
              <span>Form · 0X26 / B</span>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />
            </div>
            <div className="mt-1 text-right">Avg. reply · 24h · NDA on request</div>
          </div>
        </div>

        <div className="relative mt-12 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* LEFT — pipeline + supporting copy */}
          <div>
            <span className="eyebrow block text-paper/45">What happens next</span>

            {/* Pipeline */}
            <ol ref={track} className="relative mt-6 space-y-3">
              <span
                aria-hidden
                className="absolute top-3 bottom-3 left-[11px] w-px bg-paper/12 sm:left-[15px]"
              >
                <span
                  ref={pipeFill}
                  aria-hidden
                  className="block h-full w-full origin-top"
                  style={{
                    transform: "scaleY(0.02)",
                    background: `linear-gradient(180deg, ${BRAND.cobalt}, ${BRAND.mint} 35%, ${BRAND.lime} 60%, ${BRAND.ember} 100%)`,
                  }}
                />
              </span>
              {PIPELINE.map((p) => (
                <li
                  key={p.step}
                  data-pipe-step
                  className="group/pipe relative flex items-baseline gap-4 py-2 sm:gap-6 sm:py-3"
                >
                  {/* Animated ring (outer) */}
                  <span
                    aria-hidden
                    data-pipe-ring
                    className="absolute z-0 grid h-9 w-9 shrink-0 place-items-center rounded-full border sm:h-12 sm:w-12"
                    style={{
                      left: "calc(11px - 6px)",
                      borderColor: `${p.color}55`,
                    }}
                  />
                  {/* Dot (inner, brand-coloured) */}
                  <span
                    aria-hidden
                    data-pipe-dot
                    className="relative z-[1] grid h-6 w-6 shrink-0 place-items-center rounded-full border bg-ink sm:h-8 sm:w-8"
                    style={{ borderColor: `${p.color}aa` }}
                  >
                    <span
                      className="block h-1.5 w-1.5 rounded-full transition-all duration-500 group-hover/pipe:scale-125 sm:h-2 sm:w-2"
                      style={{ background: p.color }}
                    />
                  </span>
                  <div className="grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-1 sm:gap-x-6">
                    <span
                      data-pipe-label
                      className="text-mono-9 uppercase"
                      style={{ color: p.color }}
                    >
                      {p.step}
                    </span>
                    <span
                      data-pipe-label
                      className="display text-[clamp(1.05rem,2.2vw,1.55rem)] leading-none text-paper"
                    >
                      {p.name}
                    </span>
                    <span
                      data-pipe-time
                      className="rounded-full border border-paper/15 px-2 py-0.5 text-mono-9-sm text-paper/45 uppercase transition-colors duration-500 group-hover/pipe:border-paper/40 sm:text-mono-9"
                    >
                      {p.time}
                    </span>
                    <p
                      data-pipe-body
                      className="col-span-3 mt-1 max-w-[44ch] text-[12.5px] leading-[1.6] text-paper/55"
                    >
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Submit CTA + alt */}
            <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-paper/12 pt-7">
              <button
                ref={btn}
                type="submit"
                form="nexo-enquiry"
                data-cursor="magnet"
                className="group relative overflow-hidden rounded-full px-8 py-5 text-mono-10-5 tracking-[0.2em] text-ink uppercase"
                style={{ background: BRAND.lime }}
              >
                <span
                  className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                  style={{ background: `linear-gradient(100deg, ${BRAND.paper}, ${BRAND.lime})` }}
                />
                <span className="relative flex items-center gap-3">
                  Send brief
                  <svg width="16" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                    <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </button>
              <a
                href="mailto:studio@nexo.design"
                data-cursor="link"
                className="border-b border-paper/25 pb-1 text-mono-10-5 text-paper/75 uppercase transition-colors duration-500 hover:border-paper hover:text-paper"
              >
                studio@nexo.design
              </a>
            </div>
          </div>

          {/* RIGHT — the form, dressed as a printed receipt */}
          <Reveal y={40} className="relative">
            <div
              ref={fieldGrid}
              className="relative overflow-hidden rounded-[24px] border border-paper/15 bg-paper/8 p-6 backdrop-blur-md sm:p-8"
            >
              {/* Receipt header */}
              <div className="flex items-center justify-between border-b border-dashed border-paper/15 pb-3">
                <span className="eyebrow text-paper/45">Project brief · form 0X26</span>
                <span className="text-mono-9 text-paper/45 uppercase">
                  · · ·
                </span>
              </div>

              {sent ? (
                <div className="flex min-h-[420px] flex-col items-start justify-center pt-4">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full"
                    style={{ background: BRAND.mint }}
                  >
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <path d="M1 7l5.5 5.5L17 1.5" stroke={BRAND.ink} strokeWidth="2" />
                    </svg>
                  </span>
                  <h3 className="display mt-6 text-[22px] text-paper">Brief received.</h3>
                  <p className="mt-3 max-w-[36ch] text-body-caption leading-relaxed text-paper/70">
                    Thanks {form.name.split(" ")[0] || "there"} — we read every submission
                    ourselves. Expect a reply from a founder within one working day.
                  </p>

                  {/* Receipt card */}
                  <div className="mt-6 w-full rounded-2xl border border-paper/15 bg-paper/5 p-5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-mono-9 tracking-[0.2em] text-paper/55 uppercase">
                        Reference
                      </span>
                      <span className="text-mono-9 tracking-[0.2em] text-paper/45 uppercase">
                        KR · {refCode}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-[12.5px] text-paper/70">
                      <div>
                        <div className="text-mono-9 text-paper/45 uppercase">
                          Channel
                        </div>
                        <div className="mt-1 text-paper/85">{form.type}</div>
                      </div>
                      <div>
                        <div className="text-mono-9 text-paper/45 uppercase">
                          Budget
                        </div>
                        <div className="mt-1 text-paper/85">{form.budget}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-mono-9 text-paper/45 uppercase">
                          From
                        </div>
                        <div className="mt-1 text-paper/85">
                          {form.name || "—"}
                          {form.company ? ` · ${form.company}` : ""}
                          <span className="text-paper/45"> · {form.email || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress dots */}
                  <div className="mt-6 flex items-center gap-2 text-paper/55">
                    {PIPELINE.map((p, i) => (
                      <span key={p.step} className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: i === 0 ? p.color : "rgba(255,255,255,0.18)" }}
                        />
                        {i < PIPELINE.length - 1 && (
                          <span className="block h-px w-8 bg-paper/15" />
                        )}
                      </span>
                    ))}
                    <span className="ml-3 text-mono-9 uppercase">
                      step · read
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm(INITIAL);
                    }}
                    className="mt-6 text-mono-9 text-paper/60 uppercase underline-offset-4 hover:text-paper hover:underline"
                  >
                    Send another brief
                  </button>
                </div>
              ) : (
                <form id="nexo-enquiry" onSubmit={submit} className="space-y-5 pt-4" noValidate>
                  {[
                    { k: "name", label: "Your name", type: "text", placeholder: "Maya Lindqvist" },
                    { k: "email", label: "Email", type: "email", placeholder: "maya@company.com" },
                    { k: "company", label: "Company", type: "text", placeholder: "Halide Optics" },
                  ].map((f) => (
                    <label key={f.k} className="block" data-enquiry-field>
                      <span className="text-mono-9 text-paper/55 uppercase">
                        {f.label}
                      </span>
                      <input
                        type={f.type}
                        value={form[f.k as keyof FormState]}
                        placeholder={f.placeholder}
                        onChange={(e) => update(f.k as keyof FormState, e.target.value)}
                        className="mt-2 w-full border-b border-paper/20 bg-transparent pb-2 text-[14px] text-paper placeholder:text-paper/25 focus:border-lime focus:outline-none"
                      />
                    </label>
                  ))}

                  {/* Service picker — coloured radio rows */}
                  <div data-enquiry-field>
                    <span className="text-mono-9 text-paper/55 uppercase">
                      Channel
                    </span>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {TYPE_OPTIONS.map((t) => {
                        const selected = form.type === t.label;
                        const selectedText = t.color === BRAND.lime || t.color === BRAND.mint ? BRAND.ink : BRAND.paper;
                        return (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() => update("type", t.label)}
                            data-cursor="link"
                            aria-pressed={selected}
                            className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-[12px] border px-4 py-3 text-mono-9 tracking-[0.12em] transition-all duration-300"
                            style={{
                              borderColor: selected ? t.color : "rgba(255,255,255,0.18)",
                              background: selected ? t.color : "rgba(255,255,255,0.025)",
                              color: selected ? selectedText : "rgba(255,255,255,0.7)",
                              boxShadow: selected ? `0 0 0 2px ${t.color}33, 0 10px 26px -16px ${t.color}` : "none",
                            }}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: selected ? selectedText : "rgba(255,255,255,0.35)" }}
                              />
                              <span>{t.short}</span>
                            </span>
                            <span className="truncate" style={{ color: selected ? selectedText : "rgba(255,255,255,0.85)" }}>{t.label}</span>
                            <span
                              aria-hidden
                              className="absolute right-3 top-1/2 hidden -translate-y-1/2 sm:block"
                            >
                              <span
                                className="block h-3 w-3 rounded-full border transition-all duration-500"
                                style={{
                                  borderColor: selected ? selectedText : "rgba(255,255,255,0.3)",
                                  background: selected ? selectedText : "transparent",
                                }}
                              >{selected ? <span className="absolute text-[8px]" style={{ color: t.color }}>✓</span> : null}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget picker — chip group */}
                  <div data-enquiry-field>
                    <span className="text-mono-9 text-paper/55 uppercase">
                      Budget range · EUR
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => update("budget", b)}
                          data-cursor="link"
                          aria-pressed={form.budget === b}
                          className="rounded-full border px-3.5 py-2 text-mono-9 tracking-[0.12em] transition-all duration-300"
                          style={{
                            borderColor: form.budget === b ? BRAND.lime : "rgba(255,255,255,0.22)",
                            background: form.budget === b ? BRAND.lime : "rgba(255,255,255,0.025)",
                            color: form.budget === b ? BRAND.ink : "rgba(255,255,255,0.7)",
                            boxShadow: form.budget === b ? `0 8px 22px -14px ${BRAND.lime}` : "none",
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block" data-enquiry-field>
                    <span className="text-mono-9 text-paper/55 uppercase">
                      What are we building?
                    </span>
                    <textarea
                      rows={3}
                      value={form.brief}
                      placeholder="A new commerce experience for a lighting brand…"
                      onChange={(e) => update("brief", e.target.value)}
                      className="mt-2 w-full resize-none border-b border-paper/20 bg-transparent pb-2 text-[14px] leading-relaxed text-paper placeholder:text-paper/25 focus:border-lime focus:outline-none"
                    />
                  </label>

                  {error && (
                    <p
                      className="text-mono-9 tracking-[0.08em]"
                      style={{ color: BRAND.ember }}
                    >
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
