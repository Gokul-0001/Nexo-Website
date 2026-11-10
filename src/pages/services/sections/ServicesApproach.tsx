"use client";

import { PROCESS } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";

/**
 * Services — how we engage.
 *
 * Same pattern as the Home Process section:
 *   - text-h2 heading
 *   - editorial process row per step
 *   - text-h3 / text-mono-10-5 / text-body-sm / text-mono-9 utilities
 */
export default function ServicesApproach() {
  return (
    <section className="relative z-10 py-[12vh] sm:py-[16vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="eyebrow mb-5 block text-ink/40">(02) — How we engage</span>
            <SplitLines lines={["FROM BRIEF", "TO HAND-OFF."]} className="display text-h2-md" />
            <p className="mt-6 max-w-[36ch] text-[14px] leading-[1.62] text-ink/60">
              Five movements. A studio rhythm we have refined across nine years and one hundred
              engagements.
            </p>
          </div>

          <ol className="space-y-3">
            {PROCESS.map((p) => (
              <li
                key={p.step}
                className="group relative flex items-baseline gap-4 overflow-hidden rounded-[20px] border border-ink/10 bg-paper p-5 transition-colors duration-700 sm:gap-6 sm:p-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  style={{ background: p.color }}
                />
                <div className="flex w-full flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-mono-10-5" style={{ color: p.color }}>
                    {p.step}
                  </span>
                  <h3 className="display text-h3 transition-colors duration-500" style={{ color: p.color }}>
                    {p.title}
                  </h3>
                  <span className="eyebrow ml-auto text-ink/40">{p.duration}</span>
                </div>
                <p className="mt-3 max-w-[54ch] text-body-sm leading-[1.6] text-ink/60">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}