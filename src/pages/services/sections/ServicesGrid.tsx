"use client";

import { SERVICES } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";

/**
 * Services grid — six editorial cards, one per discipline.
 *
 * Typography:
 *   - text-h2           — section heading
 *   - text-mono-10-5    — service index (01, 02, …)
 *   - text-h4           — service title
 *   - text-body-sm      — blurb
 *   - text-mono-9       — tag pills
 *   - text-caption      — small footnote
 */
export default function ServicesGrid() {
  return (
    <section id="disciplines" className="relative z-10 py-[12vh] sm:py-[16vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow mb-5 block text-ink/40">(01) — Capabilities</span>
            <SplitLines
              lines={["SIX DISCIPLINES,", "ONE ROOF."]}
              className="display text-h2 leading-[0.92]"
              lineClassName="pb-[0.02em]"
            />
          </div>
          <p className="max-w-[42ch] text-[14px] leading-[1.62] text-ink/60 lg:pb-4">
            No silos, no account layer. The same team takes the brief, designs the system and ships
            the build. Pick a single discipline or take the whole stack.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li
              key={s.id}
              className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-paper-2 sm:p-9"
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{ background: s.color }}
              />
              <div className="flex items-baseline justify-between">
                <span className="text-mono-10-5" style={{ color: s.color }}>
                  {s.index}
                </span>
                <span className="text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
                  Discipline
                </span>
              </div>

              <h3 className="display mt-5 text-h4 leading-[0.92] transition-colors duration-500 group-hover:text-[color:var(--tone)]" style={{ ["--tone" as string]: s.color }}>
                {s.title}
              </h3>

              <p className="mt-3 max-w-[44ch] text-body-sm leading-[1.55] text-ink/60">
                {s.blurb}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink/10 px-3 py-1 text-mono-9 tracking-[0.16em] text-ink/55 uppercase transition-colors duration-500 hover:border-ink/40"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-caption text-ink/50">
          Not sure where to start?{" "}
          <a href="/contact" data-cursor="link" className="relative text-ink underline decoration-ink/25 underline-offset-4 transition-all hover:decoration-ink">
            Book a 30-minute teardown →
          </a>
        </p>
      </div>
    </section>
  );
}