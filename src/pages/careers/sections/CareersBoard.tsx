"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BRAND } from "@/lib/brand";
import { JOBS, TEAM_COLORS } from "@/data/jobs";

type Role = { role: string; team: string; where: string; color: string };

/**
 * Roles on the board come straight from src/data/jobs.ts — add, edit or close a role there and the
 * board updates with the roles list below it. Up to BOARD_LIMIT roles fit; any extra show as "+N more".
 */
const BOARD_LIMIT = 5;
const ROLES: Role[] = JOBS.slice(0, BOARD_LIMIT).map((job) => ({ role: job.title, team: job.team, where: job.location, color: TEAM_COLORS[job.team] }));
const MORE = Math.max(0, JOBS.length - BOARD_LIMIT);

/** PLACEHOLDER company figures and services shown on the board. */
const FACTS = [
  { value: "120+", label: "Projects shipped" },
  { value: "40+", label: "Happy clients" },
  { value: "18", label: "Makers on the team" },
  { value: "4.9★", label: "Client rating" },
];
const SERVICES = [
  { label: "Websites", color: BRAND.cobalt },
  { label: "Online stores", color: BRAND.ember },
  { label: "Apps", color: BRAND.mint },
  { label: "Marketing", color: BRAND.lime },
  { label: "Automation", color: BRAND.cobalt },
];
const STEPS = ["Apply online", "Quick chat", "Small task", "Offer"];

const TEAM = [
  { initials: "PS", color: BRAND.ember },
  { initials: "AM", color: BRAND.cobalt },
  { initials: "KR", color: BRAND.mint },
  { initials: "RK", color: BRAND.lime },
];

/** Text colours dark enough to read on white. */
const ink = (color: string) => (color === BRAND.mint ? "#0e9f86" : color === BRAND.lime ? "#5f7f00" : color);

function Magnet({ color, className = "" }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`block aspect-square rounded-full shadow-[0_0.5cqw_0.9cqw_rgba(14,15,20,0.3)] ${className}`}
      style={{ background: `radial-gradient(circle at 35% 30%, #ffffffb3 0 16%, ${color} 24%, ${color})` }}
    />
  );
}

function Marker({ color, rotate }: { color: string; rotate: number }) {
  return (
    <span aria-hidden className="relative block h-[1.5cqw] w-[9cqw]" style={{ rotate: `${rotate}deg` }}>
      <span className="absolute inset-y-0 left-0 w-[72%] rounded-l-[0.8cqw] bg-[#f4f4f6] shadow-[inset_0_-0.3cqw_0_rgba(0,0,0,0.08)]" />
      <span className="absolute inset-y-0 left-[70%] w-[22%]" style={{ background: color }} />
      <span className="absolute inset-y-[22%] right-0 w-[9%] rounded-r-full" style={{ background: color }} />
    </span>
  );
}

/** Section heading written in marker, with a short hand-drawn underline. */
function Label({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="relative inline-block">
      <span className="font-mono text-[1.85cqw] font-bold tracking-[0.16em] text-ink uppercase">{children}</span>
      <svg viewBox="0 0 100 8" preserveAspectRatio="none" className="absolute -bottom-[1cqw] left-0 h-[1cqw] w-full" aria-hidden>
        <path data-wb-draw d="M2 5 C 30 2, 60 7, 98 4" pathLength={1} strokeDasharray="1" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/**
 * Careers hero visual — a whiteboard hanging from a pin by a black thread, laid out like an office
 * notice board: open roles, Nexo at a glance, what we build and how to apply. A highlighter moves
 * through the roles and the hiring steps fill in. Beside it: a spinning "Now hiring" badge, an offer
 * letter and a team card. Sized in container units so it scales as one piece.
 */
export default function CareersBoard() {
  const [featured, setFeatured] = useState(0);
  const [step, setStep] = useState(0);
  const boardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = window.setInterval(() => setFeatured((value) => (ROLES.length ? (value + 1) % ROLES.length : 0)), 2600);
    const b = window.setInterval(() => setStep((value) => (value + 1) % STEPS.length), 1500);
    return () => { window.clearInterval(a); window.clearInterval(b); };
  }, []);

  // On load: marker lines draw, then every section fills in.
  useEffect(() => {
    const board = boardRef.current;
    if (!board || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ delay: 0.6 });
    tl.fromTo(board.querySelectorAll("[data-wb-draw]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.06 })
      .fromTo(board.querySelectorAll("[data-wb-item]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", stagger: 0.05 }, 0.25)
      .fromTo(board.querySelectorAll("[data-wb-magnet]"), { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2.4)", stagger: 0.07 }, 0.5);
    return () => { tl.kill(); };
  }, []);

  return (
    <div className="relative mx-auto aspect-[1/0.8] w-full max-w-[720px] [container-type:inline-size]">
      {/* ── Hanging whiteboard: pin, thread and board sway together from the pin ── */}
      <div data-desk="board" className="absolute left-[5%] right-[-1%] top-[-5%] z-20">
        <div className="wb-sway origin-[50%_0%]">
          {/* pin */}
          <span aria-hidden className="relative z-20 mx-auto block aspect-square w-[3.2cqw] rounded-full shadow-[0_0.8cqw_1.2cqw_rgba(0,0,0,0.35)]" style={{ background: `radial-gradient(circle at 35% 30%, #ffffffcc 0 16%, ${BRAND.ember} 22%, #b52e16)` }} />
          {/* thread from the pin to both top corners */}
          <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="relative -mt-[1.6cqw] block h-[9cqw] w-full overflow-visible" aria-hidden>
            <path d="M50 0 L3.4 10 M50 0 L96.6 10" fill="none" stroke={BRAND.ink} strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          </svg>

          {/* board */}
          <div className="relative -mt-[0.6cqw] rounded-[1.8cqw] bg-gradient-to-b from-[#eceef2] to-[#c7cad2] p-[0.9cqw] shadow-[0_6cqw_12cqw_-6cqw_rgba(14,15,20,0.5)]">
            {/* eyelets where the thread is tied */}
            <span aria-hidden className="absolute left-[2.4%] top-[-0.6cqw] aspect-square w-[1.8cqw] rounded-full border-[0.45cqw] border-[#9a9ea8] bg-[#eceef2]" />
            <span aria-hidden className="absolute right-[2.4%] top-[-0.6cqw] aspect-square w-[1.8cqw] rounded-full border-[0.45cqw] border-[#9a9ea8] bg-[#eceef2]" />

            <div ref={boardRef} className="relative overflow-hidden rounded-[1.1cqw] bg-white px-[2.6cqw] pb-[1.8cqw] pt-[2cqw]">
              <span aria-hidden className="pointer-events-none absolute -left-[20%] -top-[60%] h-[140%] w-[45%] rotate-[25deg] bg-gradient-to-r from-transparent via-ink/[0.03] to-transparent" />

              {/* Heading */}
              <div className="relative flex items-center justify-between">
                <div>
                  <span className="display block text-[4.4cqw] leading-none text-ink">WE&apos;RE HIRING!</span>
                  <svg viewBox="0 0 200 14" className="mt-[0.4cqw] h-[1.4cqw] w-[24cqw]" preserveAspectRatio="none" aria-hidden>
                    <path data-wb-draw d="M2 9 C 40 3, 80 13, 120 6 S 180 4, 198 8" pathLength={1} strokeDasharray="1" fill="none" stroke={BRAND.ember} strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="relative grid place-items-center px-[2cqw] py-[1cqw]">
                  <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
                    <path data-wb-draw d="M50 4 C 82 3, 97 14, 95 27 C 93 42, 70 47, 46 46 C 20 45, 4 37, 5 24 C 6 11, 26 3, 56 5" pathLength={1} strokeDasharray="1" fill="none" stroke={BRAND.cobalt} strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <span className="relative font-mono text-[1.85cqw] font-bold tracking-[0.12em] uppercase" style={{ color: BRAND.cobalt }}>{JOBS.length} open</span>
                </span>
              </div>

              {/* Sections */}
              <div className="relative mt-[1.8cqw] grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-x-[2.6cqw]">
                {/* marker divider between the columns */}
                <svg viewBox="0 0 4 100" preserveAspectRatio="none" className="absolute bottom-0 left-[53.5%] top-0 w-[0.6cqw]" aria-hidden>
                  <path data-wb-draw d="M2 0 C 1 30, 3 60, 2 100" pathLength={1} strokeDasharray="1" fill="none" stroke={BRAND.ink} strokeOpacity="0.25" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>

                {/* OPEN ROLES */}
                <div className="min-w-0">
                  <Label color={BRAND.ember}>Open roles</Label>
                  <ul className="mt-[2cqw] space-y-[0.6cqw]">
                    {ROLES.map((role, i) => {
                      const on = i === featured;
                      return (
                        <li key={role.role} data-wb-item className="relative flex items-center gap-[1.2cqw] rounded-[0.9cqw] border-[0.22cqw] px-[1.2cqw] py-[0.65cqw] transition-[border-color,background-color] duration-500" style={{ borderColor: on ? BRAND.ink : "rgba(14,15,20,0.15)", background: on ? `${BRAND.lime}55` : "transparent" }}>
                          <span data-wb-magnet className="w-[2.2cqw] shrink-0"><Magnet color={role.color} /></span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[2.2cqw] font-bold leading-tight text-ink">{role.role}</span>
                            <span className="block truncate text-[1.65cqw]" style={{ color: ink(role.color) }}>{role.team} <span className="text-ink/50">· {role.where}</span></span>
                          </span>
                          <span className="shrink-0 text-[1.85cqw] font-semibold transition-colors duration-500" style={{ color: on ? BRAND.ink : "rgba(14,15,20,0.3)" }}>→</span>
                        </li>
                      );
                    })}
                    {ROLES.length === 0 && (
                      <li data-wb-item className="rounded-[0.9cqw] border-[0.22cqw] border-dashed border-ink/20 px-[1.2cqw] py-[1.4cqw] text-[1.9cqw] font-semibold text-ink/60">No open roles right now. Check back soon!</li>
                    )}
                  </ul>
                  <a href="#roles" data-wb-item className="mt-[1cqw] block text-[1.7cqw] font-semibold text-ink/60">
                    {MORE > 0 ? <>+ {MORE} more {MORE === 1 ? "role" : "roles"}. <span style={{ color: BRAND.ember }}>See all open roles</span></> : <>+ Your role? <span style={{ color: BRAND.ember }}>Send an open application</span></>}
                  </a>
                </div>

                {/* Right column: about Nexo */}
                <div className="min-w-0">
                  <Label color={BRAND.cobalt}>Nexo at a glance</Label>
                  <div className="mt-[2cqw] grid grid-cols-2 gap-[0.8cqw]">
                    {FACTS.map((fact) => (
                      <div key={fact.label} data-wb-item className="rounded-[0.9cqw] border-[0.22cqw] border-ink/12 px-[1.2cqw] py-[0.8cqw]">
                        <span className="display block text-[3.4cqw] leading-none text-ink">{fact.value}</span>
                        <span className="mt-[0.4cqw] block text-[1.55cqw] leading-tight text-ink/60">{fact.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-[2cqw]">
                    <Label color={BRAND.mint}>What we build</Label>
                    <div className="mt-[2cqw] flex flex-wrap gap-[0.8cqw]">
                      {SERVICES.map((service) => (
                        <span key={service.label} data-wb-item className="flex items-center gap-[0.7cqw] rounded-full border-[0.22cqw] border-ink/15 px-[1.2cqw] py-[0.5cqw] text-[1.6cqw] font-semibold text-ink/80">
                          <i className="aspect-square w-[1cqw] rounded-full" style={{ background: service.color }} />
                          {service.label}
                        </span>
                      ))}
                    </div>
                    <p data-wb-item className="mt-[1.4cqw] text-[1.6cqw] leading-[1.45] text-ink/60">A senior studio for growing Indian businesses, working remote-first across India.</p>
                  </div>
                </div>
              </div>

              {/* HOW TO APPLY */}
              <div className="relative mt-[1.8cqw] border-t-[0.2cqw] border-dashed border-ink/20 pt-[1.5cqw]">
                <div className="flex items-center gap-[2.2cqw]">
                  <span className="shrink-0"><Label color={BRAND.lime}>How to apply</Label></span>
                  <div className="relative flex flex-1 items-center justify-between">
                    <span aria-hidden className="absolute inset-x-[4%] top-1/2 h-[0.25cqw] -translate-y-1/2 bg-ink/15" />
                    <span aria-hidden className="absolute left-[4%] top-1/2 h-[0.25cqw] -translate-y-1/2 transition-[width] duration-700" style={{ width: `${(step / (STEPS.length - 1)) * 92}%`, background: BRAND.ink }} />
                    {STEPS.map((label, i) => {
                      const done = i <= step;
                      const last = i === STEPS.length - 1;
                      return (
                        <span key={label} data-wb-item className="relative flex flex-col items-center">
                          <span className="grid aspect-square w-[3.8cqw] place-items-center rounded-full border-[0.25cqw] font-mono text-[1.75cqw] font-bold transition-colors duration-500" style={{ borderColor: BRAND.ink, background: done ? (last ? BRAND.lime : BRAND.ink) : BRAND.paper, color: done ? (last ? BRAND.ink : BRAND.paper) : BRAND.ink }}>
                            {last ? "✓" : i + 1}
                          </span>
                          <span className="absolute top-[115%] whitespace-nowrap text-[1.55cqw] font-semibold text-ink/70">{label}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="h-[2.8cqw]" />
              </div>
            </div>

            {/* Marker tray */}
            <div className="mx-[12%] mt-[0.7cqw] flex h-[2.8cqw] items-end justify-center gap-[1.8cqw] rounded-b-[1cqw] bg-gradient-to-b from-[#d6d8de] to-[#b9bcc4] px-[3cqw] pb-[0.5cqw] shadow-[inset_0_0.4cqw_0.6cqw_rgba(0,0,0,0.12)]">
              <Marker color={BRAND.ember} rotate={-2} />
              <Marker color={BRAND.cobalt} rotate={1} />
              <Marker color={BRAND.ink} rotate={-1} />
              <span aria-hidden className="block h-[1.8cqw] w-[5.6cqw] rounded-[0.5cqw] bg-ink shadow-[inset_0_-0.5cqw_0_#3a3d48]" />
            </div>
          </div>
        </div>
      </div>

      {/* ── "Now hiring" badge ── */}
      <div data-desk="badge" className="absolute right-[-7%] top-[-7%] z-30 w-[12%]">
        <div className="grid aspect-square w-full place-items-center rounded-full shadow-[0_2.4cqw_4cqw_-2cqw_rgba(14,15,20,0.5)]" style={{ background: BRAND.lime }}>
          <svg viewBox="0 0 100 100" className="anim-spin-slow absolute inset-0 h-full w-full" aria-hidden>
            <defs><path id="cr-badge" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" /></defs>
            <text fontSize="10" letterSpacing="2.4" fill={BRAND.ink} fontFamily="ui-monospace, monospace" fontWeight="700"><textPath href="#cr-badge">NOW HIRING · NOW HIRING ·</textPath></text>
          </svg>
          <span className="display relative text-[3cqw] leading-none text-ink">★</span>
        </div>
      </div>

      {/* ── Offer letter (left of the board) and team card (bottom-right) ── */}
      <div data-desk="offer" className="absolute left-[-18%] top-[38%] z-30 w-[21%]">
        <div className="cr-bob" style={{ animationDelay: "-1.5s" }}>
          <div className="relative rotate-[-5deg] rounded-[1.8cqw] border border-ink/10 bg-paper p-[2cqw] shadow-[0_4cqw_7cqw_-4cqw_rgba(14,15,20,0.5)]">
            <span className="block font-mono text-[1.3cqw] tracking-[0.16em] text-ink/45 uppercase">Offer letter</span>
            <span className="mt-[0.6cqw] block text-[1.9cqw] font-semibold text-ink">Welcome to Nexo!</span>
            <span className="mt-[1cqw] block space-y-[0.6cqw]">
              {[100, 86, 92, 60].map((w, i) => <span key={i} className="block h-[0.6cqw] rounded-full bg-ink/10" style={{ width: `${w}%` }} />)}
            </span>
            <span className="mt-[1.2cqw] block font-serif text-[2.1cqw] italic text-ink/70">— Nexo team</span>
            <span className="absolute -right-[1.6cqw] -top-[1.6cqw] grid aspect-square w-[5cqw] place-items-center rounded-full text-[2.2cqw] font-bold shadow-[0_1.6cqw_3cqw_-1.6cqw_rgba(14,15,20,0.5)]" style={{ background: BRAND.mint, color: BRAND.ink }}>✓</span>
          </div>
        </div>
      </div>

      <div data-desk="team" className="absolute right-[-5%] top-[84%] z-30 w-[25%]">
        <div className="cr-bob" style={{ animationDelay: "-3.2s" }}>
          <div className="rounded-[1.8cqw] border border-ink/10 bg-paper p-[1.8cqw] shadow-[0_4cqw_7cqw_-4cqw_rgba(14,15,20,0.5)]">
            <span className="flex">
              {TEAM.map((member, i) => (
                <span key={member.initials} className="grid aspect-square w-[4.4cqw] place-items-center rounded-full border-[0.4cqw] border-paper text-[1.4cqw] font-bold" style={{ background: member.color, color: member.color === BRAND.lime || member.color === BRAND.mint ? BRAND.ink : BRAND.paper, marginLeft: i ? "-1.3cqw" : 0 }}>
                  {member.initials}
                </span>
              ))}
              <span className="grid aspect-square w-[4.4cqw] place-items-center rounded-full border-[0.4cqw] border-dashed border-ink/30 bg-paper text-[1.8cqw] font-bold text-ink/50" style={{ marginLeft: "-1.3cqw" }}>+</span>
            </span>
            <span className="mt-[1.2cqw] block text-[1.9cqw] font-semibold leading-tight text-ink">Join 18 makers</span>
            <span className="block text-[1.4cqw] text-ink/55">One seat could be yours</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wb-sway { 0%, 100% { rotate: -0.8deg; } 50% { rotate: 0.8deg; } }
        .wb-sway { animation: wb-sway 6s ease-in-out infinite; }
        @keyframes cr-bob { 0%, 100% { transform: translateY(-1.4cqw); } 50% { transform: translateY(1.4cqw); } }
        .cr-bob { animation: cr-bob 5.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .wb-sway, .cr-bob { animation: none; } }
      `}</style>
    </div>
  );
}
