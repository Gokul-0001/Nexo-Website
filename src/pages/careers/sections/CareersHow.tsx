"use client";

import { BRAND } from "@/lib/brand";
import { Reveal, SplitLines } from "@/components/animations/TextReveal";

const PRINCIPLES = [
  {
    n: "01",
    t: "Senior hands, no account layer",
    b: "You work on the work. The same people who sell the brief are the people who design and ship it.",
    c: BRAND.cobalt,
  },
  {
    n: "02",
    t: "Async by default",
    b: "Weekly staging links, async standups, async demos. Sync calls when we need them — usually under 90 minutes a week.",
    c: BRAND.mint,
  },
  {
    n: "03",
    t: "Real ownership",
    b: "Two concurrent engagements, max. You own the work end-to-end, from kickoff to handover to the 90-day iteration.",
    c: BRAND.ember,
  },
  {
    n: "04",
    t: "Pay honestly",
    b: "Salary bands published, paid holidays by default, a real budget for hardware, conference travel and books.",
    c: BRAND.lime,
  },
];

/**
 * Careers — how the studio actually runs. Four-card grid in the same
 * pattern as the About Values section.
 */
export default function CareersHow() {
  return (
    <section className="relative z-10 py-[12vh] sm:py-[16vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="mb-10 flex items-end justify-between gap-6 border-t border-ink/12 pt-6">
          <div>
            <span className="eyebrow mb-4 block text-ink/40">(02) — How we work</span>
            <SplitLines lines={["FOUR", "CONVERSATIONS."]} className="display text-h2 leading-[0.92]" />
          </div>
          <p className="max-w-[34ch] text-[14px] leading-[1.62] text-ink/60 lg:pb-4">
            The first conversation we have with every new hire — what the work looks like, how the
            studio runs and what we will not do.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[22px] border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.t}
              className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-paper-2 sm:p-9"
              y={28}
              delay={i * 0.05}
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{ background: p.c }}
              />
              <span className="text-mono-9 tracking-[0.2em] text-ink/35">{p.n}</span>
              <h3 className="display mt-3 text-h4">{p.t}</h3>
              <p className="mt-3 max-w-[44ch] text-body-caption text-ink/60">{p.b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}