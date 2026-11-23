"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { APPLY_EMAIL, APPLY_ENDPOINT, APPLY_EVENT, JOBS, TEAM_COLORS } from "@/data/jobs";
import Select, { DROPDOWN_CSS } from "@/components/ui/Dropdown";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  { id: "fresher", label: "Fresher / student" },
  { id: "1-2", label: "1–2 years" },
  { id: "3-5", label: "3–5 years" },
  { id: "5+", label: "5+ years" },
];
const STEPS = [
  { title: "We read every application", text: "A founder reviews it within 3 working days." },
  { title: "Quick chat", text: "A relaxed 30-minute call to get to know each other." },
  { title: "Small paid task", text: "A short, real-world task. We pay you for your time." },
  { title: "Offer", text: "Usually within two weeks of applying." },
];
const MAX_CV_MB = 5;

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <label data-ap-field className="block">
      <span className="text-mono-9 tracking-[0.16em] text-ink/50 uppercase">{label}{required && <span style={{ color: BRAND.ember }}> *</span>}</span>
      <span className="mt-2 block">{children}</span>
      {hint && <span className="mt-1.5 block text-[12px] text-ink/45">{hint}</span>}
    </label>
  );
}

const inputClass = "w-full rounded-[14px] border border-ink/12 bg-paper/80 px-4 py-3 text-[14.5px] text-ink outline-none backdrop-blur-sm transition-colors duration-300 placeholder:text-ink/35 focus:border-ink/45";

/** Careers section 02: the application form, with what happens next beside it. */
export default function CareersApply() {
  const root = useRef<HTMLElement | null>(null);
  const [role, setRole] = useState(JOBS[0]?.id ?? "open");
  const [experience, setExperience] = useState("1-2");
  const [cv, setCv] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailed">("idle");

  const roleOptions = [...JOBS.map((job) => ({ id: job.id, label: job.title, hint: `${job.team} · ${job.location}`, color: TEAM_COLORS[job.team] })), { id: "open", label: "Open application", hint: "Not listed? Tell us what you do" }];
  const roleLabel = roleOptions.find((option) => option.id === role)?.label ?? "Open application";

  // "Apply for this role" buttons in the roles list pre-select the role here.
  useEffect(() => {
    const onApply = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (id === "open" || JOBS.some((job) => job.id === id)) { setRole(id); setStatus("idle"); }
    };
    window.addEventListener(APPLY_EVENT, onApply);
    return () => window.removeEventListener(APPLY_EVENT, onApply);
  }, []);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // One-time entrance (no scrubbing) so the form is never half-faded while someone fills it in.
      const once = (trigger: string, start = "top 85%") => ({ trigger, start, once: true });
      const done = { clearProps: "transform,opacity" };
      gsap.from("[data-ap-head] > *", { opacity: 0, y: 36, duration: 0.9, ease: "expo.out", stagger: 0.1, ...done, scrollTrigger: once("[data-ap-head]") });
      gsap.from("[data-ap-form]", { opacity: 0, y: 50, duration: 1, ease: "expo.out", ...done, scrollTrigger: once("[data-ap-form]", "top 90%") });
      gsap.from("[data-ap-field]", { opacity: 0, y: 18, duration: 0.7, ease: "power3.out", stagger: 0.05, delay: 0.15, ...done, scrollTrigger: once("[data-ap-form]", "top 90%") });
      gsap.from("[data-ap-side]", { opacity: 0, x: 40, duration: 1, ease: "expo.out", delay: 0.1, ...done, scrollTrigger: once("[data-ap-side]", "top 90%") });
      gsap.from("[data-ap-line]", { scaleY: 0, duration: 1.2, ease: "power2.inOut", delay: 0.3, ...done, scrollTrigger: once("[data-ap-side]", "top 90%") });
      gsap.from("[data-ap-step]", { opacity: 0, x: 18, duration: 0.7, ease: "power3.out", stagger: 0.12, delay: 0.35, ...done, scrollTrigger: once("[data-ap-side]", "top 90%") });
    }, element);
    return () => ctx.revert();
  }, []);

  const onFile = (file: File | undefined) => {
    setError("");
    if (!file) return setCv(null);
    if (file.size > MAX_CV_MB * 1024 * 1024) { setCv(null); return setError(`Your CV is over ${MAX_CV_MB} MB. Please upload a smaller file.`); }
    setCv(file);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    data.set("role", roleLabel);
    data.set("experience", EXPERIENCE.find((option) => option.id === experience)?.label ?? experience);
    if (cv) data.set("cv", cv);

    if (APPLY_ENDPOINT) {
      setStatus("sending");
      try {
        const response = await fetch(APPLY_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("Failed");
        setStatus("sent");
        event.currentTarget?.reset();
        setCv(null);
      } catch {
        setStatus("idle");
        setError(`Something went wrong sending your application. Please try again, or email it to ${APPLY_EMAIL}.`);
      }
      return;
    }

    // No form service connected yet: open the visitor's email app with everything filled in.
    const lines = [
      `Role: ${roleLabel}`,
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `City: ${data.get("city") || "-"}`,
      `Experience: ${data.get("experience")}`,
      `Portfolio / LinkedIn: ${data.get("portfolio")}`,
      "",
      `Why Nexo: ${data.get("why") || "-"}`,
      "",
      cv ? `(Please attach your CV to this email: ${cv.name})` : "(Please attach your CV to this email)",
    ];
    window.location.href = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(`Application: ${roleLabel}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("mailed");
  };

  return (
    <section ref={root} id="apply" className="relative z-10 scroll-mt-24 overflow-x-clip py-[10vh] sm:py-[12vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Header */}
        <div data-ap-head className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />02 — Apply</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              TAKE THE<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, #12b89c)` }}>FIRST STEP.</span>
            </h2>
          </div>
          <p className="max-w-[40ch] text-[14px] leading-[1.65] text-ink/60">It takes about two minutes. No cover letter needed: just your details, your work and a few words about you.</p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
          {/* Form */}
          <div data-ap-form className="relative rounded-[28px] border border-ink/10 bg-paper/85 p-5 shadow-[0_40px_80px_-60px_rgba(14,15,20,0.6)] backdrop-blur-sm sm:p-8">
            {status === "sent" || status === "mailed" ? (
              <div className="py-10 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full text-[26px] font-bold" style={{ background: BRAND.lime, color: BRAND.ink }}>✓</span>
                <h3 className="display mt-6 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-none">{status === "sent" ? "Application sent!" : "Almost there!"}</h3>
                <p className="mx-auto mt-4 max-w-[46ch] text-[14.5px] leading-[1.65] text-ink/60">
                  {status === "sent"
                    ? `Thanks for applying for ${roleLabel}. We read every application and will reply within 3 working days.`
                    : `Your email app should have opened with your application for ${roleLabel}. Attach your CV and press send. If it didn't open, email us at ${APPLY_EMAIL}.`}
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-7 rounded-full border border-ink/15 px-5 py-3 text-mono-10-5 tracking-[0.16em] text-ink uppercase hover:border-ink">Apply for another role</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                <div data-ap-field className="relative z-30 sm:col-span-2">
                  <span className="text-mono-9 tracking-[0.16em] text-ink/50 uppercase">Role you&apos;re applying for<span style={{ color: BRAND.ember }}> *</span></span>
                  <div className="mt-2 flex"><Select label="Role" value={role} onChange={setRole} options={roleOptions} /></div>
                </div>
                <Field label="Full name" required><input name="name" required autoComplete="name" placeholder="Your name" className={inputClass} /></Field>
                <Field label="Email" required><input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} /></Field>
                <Field label="Phone" required><input name="phone" type="tel" required autoComplete="tel" pattern="[0-9+ ()-]{8,}" placeholder="+91 98765 43210" className={inputClass} /></Field>
                <Field label="City"><input name="city" autoComplete="address-level2" placeholder="Where you're based" className={inputClass} /></Field>
                <div data-ap-field className="relative z-20">
                  <span className="text-mono-9 tracking-[0.16em] text-ink/50 uppercase">Experience</span>
                  <div className="mt-2 flex"><Select label="Experience" value={experience} onChange={setExperience} options={EXPERIENCE} /></div>
                </div>
                <Field label="Portfolio or LinkedIn" required><input name="portfolio" type="url" required placeholder="https://" className={inputClass} /></Field>

                <div data-ap-field className="sm:col-span-2">
                  <span className="text-mono-9 tracking-[0.16em] text-ink/50 uppercase">CV / resume</span>
                  <label className="mt-2 flex cursor-pointer flex-wrap items-center gap-4 rounded-[16px] border-2 border-dashed border-ink/15 bg-paper/60 px-5 py-4 transition-colors duration-300 hover:border-ink/40">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px]" style={{ background: BRAND.ink }}>
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={BRAND.lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 16V4M7 9l5-5 5 5M5 20h14" /></svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold text-ink">{cv ? cv.name : "Upload your CV"}</span>
                      <span className="block text-[12px] text-ink/50">{cv ? `${(cv.size / 1024 / 1024).toFixed(1)} MB · click to change` : `PDF or Word, up to ${MAX_CV_MB} MB`}</span>
                    </span>
                    <input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(event) => onFile(event.target.files?.[0])} />
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Why Nexo?" hint="A few lines is plenty."><textarea name="why" rows={4} placeholder="What excites you about this role, and something you're proud of building." className={`${inputClass} resize-y`} /></Field>
                </div>

                <label data-ap-field className="flex items-start gap-3 text-[13px] leading-[1.5] text-ink/60 sm:col-span-2">
                  <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#0E0F14]" />
                  I agree to Nexo storing my details to review this application.
                </label>

                {error && <p className="rounded-[12px] px-4 py-3 text-[13px] sm:col-span-2" style={{ background: `${BRAND.ember}14`, color: "#b52e16" }}>{error}</p>}

                <div data-ap-field className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                  <span className="text-[12.5px] text-ink/45">We reply to every application within 3 working days.</span>
                  <button type="submit" disabled={status === "sending"} className="group/send relative overflow-hidden rounded-full px-7 py-4 text-mono-10-5 tracking-[0.2em] text-ink uppercase disabled:opacity-60" style={{ background: BRAND.lime }}>
                    <span className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/send:translate-y-0" style={{ background: `linear-gradient(100deg, ${BRAND.paper}, ${BRAND.lime})` }} />
                    <span className="relative">{status === "sending" ? "Sending…" : "Send application →"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* What happens next */}
          <aside id="process" data-ap-side className="scroll-mt-28 rounded-[28px] p-6 text-paper sm:p-7 lg:sticky lg:top-28" style={{ background: BRAND.ink }}>
            <span className="text-mono-9 tracking-[0.16em] text-paper/50 uppercase">How we hire</span>
            <h3 className="display mt-3 text-[1.8rem] leading-[0.95]">What happens next</h3>
            <ol className="relative mt-7 space-y-6 pl-11">
              <span aria-hidden data-ap-line className="absolute bottom-2 left-[15px] top-2 w-px origin-top bg-paper/20" />
              {STEPS.map((item, i) => (
                <li key={item.title} data-ap-step className="relative">
                  <span className="absolute -left-11 grid h-8 w-8 place-items-center rounded-full font-mono text-[12px] font-bold" style={{ background: i === STEPS.length - 1 ? BRAND.lime : "rgba(255,255,255,0.1)", color: i === STEPS.length - 1 ? BRAND.ink : BRAND.paper }}>
                    {i === STEPS.length - 1 ? "✓" : i + 1}
                  </span>
                  <span className="block text-[15px] font-semibold">{item.title}</span>
                  <span className="mt-1 block text-[13px] leading-[1.55] text-paper/60">{item.text}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-t border-paper/12 pt-5 text-[13px] text-paper/60">
              Questions about a role? <a href={`mailto:${APPLY_EMAIL}`} className="font-semibold text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper">{APPLY_EMAIL}</a>
            </div>
          </aside>
        </div>
      </div>
      <style>{DROPDOWN_CSS}</style>
    </section>
  );
}
