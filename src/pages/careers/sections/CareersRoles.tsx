"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import { APPLY_EVENT, JOBS, TEAM_COLORS, type Job } from "@/data/jobs";
import Select, { DROPDOWN_CSS } from "@/components/ui/Dropdown";

gsap.registerPlugin(ScrollTrigger);

const onAccent = (color: string) => (color === "#C8FA3C" || color === "#1FE0BE" ? BRAND.ink : BRAND.paper);
const unique = (values: string[]) => Array.from(new Set(values));

/** Sends the visitor to the application form with this role already chosen. */
function applyFor(id: string) {
  window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail: id }));
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function DetailList({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div>
      <span className="text-mono-9 tracking-[0.16em] text-ink/45 uppercase">{title}</span>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[14px] leading-[1.55] text-ink/75">
            <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoleRow({ job, open, onToggle }: { job: Job; open: boolean; onToggle: () => void }) {
  const color = TEAM_COLORS[job.team];
  return (
    <li data-rl-row className="overflow-hidden rounded-[22px] border bg-paper/85 backdrop-blur-sm transition-[border-color,box-shadow] duration-500" style={{ borderColor: open ? BRAND.ink : "rgba(14,15,20,0.1)", boxShadow: open ? "0 30px 60px -40px rgba(14,15,20,0.55)" : "none" }}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="group flex w-full flex-wrap items-center gap-x-6 gap-y-3 px-5 py-5 text-left sm:px-7 sm:py-6">
        <span className="flex min-w-0 flex-1 items-center gap-4">
          <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: color }} />
          <span className="min-w-0">
            <span className="block text-[clamp(1.15rem,1.8vw,1.45rem)] font-semibold leading-tight text-ink">{job.title}</span>
            <span className="mt-1 block text-[13px] text-ink/55">{job.summary}</span>
          </span>
        </span>
        <span className="flex flex-wrap items-center gap-2 max-sm:pl-7">
          <span className="rounded-full px-3 py-1 text-[11.5px] font-semibold" style={{ background: color, color: onAccent(color) }}>{job.team}</span>
          <span className="rounded-full border border-ink/12 px-3 py-1 text-[11.5px] text-ink/70">{job.location}</span>
          <span className="rounded-full border border-ink/12 px-3 py-1 text-[11.5px] text-ink/70">{job.type}</span>
        </span>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border text-[18px] transition-[background-color,color,rotate,border-color] duration-500" style={{ background: open ? BRAND.ink : "transparent", color: open ? BRAND.paper : BRAND.ink, borderColor: open ? BRAND.ink : "rgba(14,15,20,0.15)", rotate: open ? "45deg" : "0deg" }}>+</span>
      </button>

      {/* Details slide open in place */}
      <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-ink/10 px-5 pb-6 pt-6 sm:px-7">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_260px]">
              <DetailList title="What you'll do" items={job.responsibilities} color={color} />
              <div className="space-y-6">
                <DetailList title="What we're looking for" items={job.requirements} color={color} />
                {job.niceToHave && job.niceToHave.length > 0 && <DetailList title="Nice to have" items={job.niceToHave} color={color} />}
              </div>
              <div className="flex flex-col gap-3 rounded-[18px] p-5" style={{ background: `${color}14`, border: `1px solid ${color}33` }}>
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <span><span className="block text-mono-9 tracking-[0.14em] text-ink/45 uppercase">Experience</span><span className="mt-1 block font-semibold text-ink">{job.experience}</span></span>
                  {job.salary && <span><span className="block text-mono-9 tracking-[0.14em] text-ink/45 uppercase">Salary</span><span className="mt-1 block font-semibold text-ink">{job.salary}</span></span>}
                  <span><span className="block text-mono-9 tracking-[0.14em] text-ink/45 uppercase">Location</span><span className="mt-1 block font-semibold text-ink">{job.location}</span></span>
                  <span><span className="block text-mono-9 tracking-[0.14em] text-ink/45 uppercase">Type</span><span className="mt-1 block font-semibold text-ink">{job.type}</span></span>
                </div>
                <button type="button" onClick={() => applyFor(job.id)} className="group/apply relative mt-auto overflow-hidden rounded-full px-5 py-3.5 text-mono-10-5 tracking-[0.16em] text-paper uppercase" style={{ background: BRAND.ink }}>
                  <span className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/apply:translate-y-0" style={{ background: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.ember})` }} />
                  <span className="relative">Apply for this role →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/** Careers section 01: every open role (from src/data/jobs.ts) — search, filter, expand for details, apply. */
export default function CareersRoles() {
  const root = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("all");
  const [place, setPlace] = useState("all");
  const [type, setType] = useState("all");
  const [openId, setOpenId] = useState<string | null>(JOBS[0]?.id ?? null);

  const q = query.trim().toLowerCase();
  const roles = JOBS.filter((job) =>
    (team === "all" || job.team === team) &&
    (place === "all" || job.location === place) &&
    (type === "all" || job.type === type) &&
    (!q || `${job.title} ${job.team} ${job.summary} ${job.location}`.toLowerCase().includes(q)),
  );
  const filtered = q !== "" || team !== "all" || place !== "all" || type !== "all";
  const reset = () => { setQuery(""); setTeam("all"); setPlace("all"); setType("all"); };

  // One-time entrance (no scrubbing) so the roles are fully readable while browsing.
  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const done = { clearProps: "transform,opacity" };
      gsap.from("[data-rl-head] > *", { opacity: 0, y: 36, duration: 0.9, ease: "expo.out", stagger: 0.1, ...done, scrollTrigger: { trigger: "[data-rl-head]", start: "top 85%", once: true } });
      gsap.from("[data-rl-tools] > *", { opacity: 0, y: 22, duration: 0.8, ease: "expo.out", stagger: 0.08, ...done, scrollTrigger: { trigger: "[data-rl-tools]", start: "top 90%", once: true } });
      // Rows rise in one after another the first time they reach the screen.
      gsap.set("[data-rl-row]", { opacity: 0, y: 40 });
      ScrollTrigger.batch("[data-rl-row]", {
        start: "top 92%",
        once: true,
        onEnter: (rows) => gsap.to(rows, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08, overwrite: true, clearProps: "transform,opacity" }),
      });
    }, element);
    return () => ctx.revert();
  }, []);

  // Filtering changes the list height, so re-measure the triggers below it.
  useLayoutEffect(() => { ScrollTrigger.refresh(); }, [q, team, place, type]);

  return (
    <section ref={root} id="roles" className="relative z-10 scroll-mt-24 overflow-x-clip pt-[6vh] pb-[10vh] sm:pt-[8vh] sm:pb-[12vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Header */}
        <div data-rl-head className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.ember }} />01 — Open roles</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              FIND YOUR<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.ember}, ${BRAND.cobalt})` }}>SEAT AT NEXO.</span>
            </h2>
          </div>
          <div className="max-w-[40ch]">
            <p className="text-[14px] leading-[1.65] text-ink/60">Open a role to see what you&apos;ll do, what we&apos;re looking for and the pay range, then apply in a couple of minutes.</p>
            <div className="mt-5 flex gap-8 border-t border-ink/12 pt-4">
              <div><div className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-none" style={{ color: BRAND.ember }}>{JOBS.length}</div><div className="mt-1.5 text-mono-9 tracking-[0.16em] text-ink/45 uppercase">Open roles</div></div>
              <div><div className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-none" style={{ color: BRAND.ember }}>{unique(JOBS.map((job) => job.team)).length}</div><div className="mt-1.5 text-mono-9 tracking-[0.16em] text-ink/45 uppercase">Teams hiring</div></div>
            </div>
          </div>
        </div>

        {/* Search + filters */}
        <div data-rl-tools className="relative z-20 mt-10 flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <label className="flex flex-1 items-center gap-3 rounded-[16px] border border-ink/12 bg-paper/80 px-5 py-3 backdrop-blur-sm transition-colors duration-300 focus-within:border-ink/40">
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke={BRAND.ink} strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search roles, e.g. designer, React, ads" aria-label="Search roles" className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink/40" />
          </label>
          <div className="flex flex-wrap gap-3">
            <Select label="Team" value={team} onChange={setTeam} options={[{ id: "all", label: "All teams" }, ...unique(JOBS.map((job) => job.team)).map((t) => ({ id: t, label: t, color: TEAM_COLORS[t as Job["team"]] }))]} />
            <Select label="Location" value={place} onChange={setPlace} options={[{ id: "all", label: "Anywhere" }, ...unique(JOBS.map((job) => job.location)).map((l) => ({ id: l, label: l }))]} />
            <Select label="Type" value={type} onChange={setType} options={[{ id: "all", label: "Any type" }, ...unique(JOBS.map((job) => job.type)).map((t) => ({ id: t, label: t }))]} />
          </div>
        </div>
        <div className="mt-4 flex min-h-[28px] flex-wrap items-center justify-between gap-3">
          <span className="text-[13px] text-ink/55">{roles.length} {roles.length === 1 ? "role" : "roles"} open</span>
          {filtered && <button type="button" onClick={reset} className="text-[13px] font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Clear all filters</button>}
        </div>

        {/* Roles */}
        {roles.length > 0 ? (
          <ul className="mt-5 space-y-3">
            {roles.map((job) => <RoleRow key={job.id} job={job} open={openId === job.id} onToggle={() => setOpenId((value) => (value === job.id ? null : job.id))} />)}
          </ul>
        ) : (
          <div className="mt-5 rounded-[22px] border border-dashed border-ink/15 p-10 text-center">
            <p className="text-[15px] font-semibold text-ink">No roles match that right now.</p>
            <p className="mt-1.5 text-[13px] text-ink/55">Send us an open application below, and we&apos;ll reach out when something fits.</p>
          </div>
        )}

        {/* Open application */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-dashed border-ink/20 px-6 py-5">
          <span>
            <span className="block text-[16px] font-semibold text-ink">Don&apos;t see your role?</span>
            <span className="block text-[13px] text-ink/55">We&apos;re always happy to meet good people. Tell us what you do best.</span>
          </span>
          <button type="button" onClick={() => applyFor("open")} className="rounded-full border border-ink/15 px-5 py-3 text-mono-10-5 tracking-[0.16em] text-ink uppercase transition-colors duration-300 hover:border-ink">Send an open application →</button>
        </div>
      </div>
      <style>{DROPDOWN_CSS}</style>
    </section>
  );
}
