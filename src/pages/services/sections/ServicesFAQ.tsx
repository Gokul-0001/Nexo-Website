"use client";

import { BRAND } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";

const FAQ = [
  {
    q: "Do you take equity?",
    a: "Rarely. Mostly fixed fee or monthly retainer. We will be honest if a brief is not a fit.",
    c: BRAND.cobalt,
  },
  {
    q: "How fast can you start?",
    a: "Most engagements kick off within 2–4 weeks of contract signature, depending on studio load.",
    c: BRAND.ember,
  },
  {
    q: "Can you sign an NDA?",
    a: "Yes — before the brief, on request. We never share work publicly without consent.",
    c: BRAND.mint,
  },
  {
    q: "Do you work async?",
    a: "Default. Weekly staging links, async standups, async demos. Sync calls when we need them.",
    c: BRAND.lime,
  },
];

/**
 * Services — common questions.
 *
 * Typography mirrors ContactDetails FAQ:
 *   - text-h2 + eyebrow heading
 *   - text-mono-9 question numbers
 *   - text-h3 question display
 *   - text-caption answer
 */
export default function ServicesFAQ() {
  return (
    <section className="relative z-10 py-[14vh] sm:py-[18vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow mb-5 block text-ink/40">(03) — Common questions</span>
            <SplitLines
              lines={["ASKED", "WEEKLY."]}
              className="display text-h2 leading-[0.92]"
            />
          </div>
          <p className="max-w-[42ch] text-[14px] leading-[1.62] text-ink/60 lg:pb-4">
            The same questions come up on almost every first call — here they are, answered up
            front.
          </p>
        </div>

        <div className="mt-14 border-t border-ink/12 pt-10 sm:mt-20">
          <ul className="grid gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-x-14">
            {FAQ.map((f, i) => (
              <li key={f.q} className="group relative">
                <span
                  aria-hidden
                  className="absolute inset-x-0 -top-10 h-[2px] origin-left scale-x-0 group-hover:scale-x-100"
                  style={{
                    background: f.c,
                    transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-mono-9 tracking-[0.18em] uppercase" style={{ color: f.c }}>
                    0{i + 1}
                  </span>
                  <span className="text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
                    Asked weekly
                  </span>
                </div>
                <h3 className="display mt-2 text-h3 leading-tight">{f.q}</h3>
                <p className="mt-2 max-w-[38ch] text-caption leading-[1.6] text-ink/60">
                  {f.a}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}