"use client";

import { BRAND } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";

const ROLES = [
  {
    title: "SENIOR PRODUCT DESIGNER",
    loc: "Lisbon · Berlin · Remote CET ±2",
    type: "Full-time",
    team: "Design",
    color: BRAND.cobalt,
    body:
      "Own the interface design across two concurrent engagements — from IA through motion spec, working alongside an engineer and a brand designer.",
  },
  {
    title: "FRONT-END ENGINEER",
    loc: "Lisbon · Berlin · Remote CET ±2",
    type: "Full-time",
    team: "Engineering",
    color: BRAND.ember,
    body:
      "Build the production layer of our client work: typed React, design-system driven components, performance budgets enforced in CI. Senior hands, no juniors.",
  },
  {
    title: "MOTION DESIGNER",
    loc: "Remote CET ±2",
    type: "Contract · 6 months",
    team: "Motion",
    color: BRAND.mint,
    body:
      "Author the motion language for one flagship engagement — GSAP + Lottie + native CSS — and bring it into both web and brand applications.",
  },
  {
    title: "BRAND DESIGNER",
    loc: "Lisbon · Remote CET ±2",
    type: "Full-time",
    team: "Brand",
    color: BRAND.lime,
    body:
      "Lead the identity work on a steady stream of brand engagements — naming, identity systems, type, motion rules and the documentation that survives the handover.",
  },
];

/**
 * Careers — open roles list. Same editorial pattern as the Contact direct
 * lines / Services grid.
 */
export default function CareersOpen() {
  return (
    <section id="open" className="relative z-10 py-[12vh] sm:py-[16vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow mb-5 block text-ink/40">(01) — Open roles</span>
            <SplitLines
              lines={["FOUR SEATS", "AT THE TABLE."]}
              className="display text-h2 leading-[0.92]"
            />
          </div>
          <p className="max-w-[42ch] text-[14px] leading-[1.62] text-ink/60 lg:pb-4">
            Hiring deliberately, in small batches. If none of the roles fit, write anyway — open
            applications live in the same inbox and get the same reply.
          </p>
        </div>

        <ul className="mt-14 border-t border-ink/12 sm:mt-20">
          {ROLES.map((r, i) => (
            <li key={r.title} className="group border-b border-ink/12">
              <a
                href="/contact"
                data-cursor="link"
                className="relative grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-7 transition-colors duration-500 hover:bg-paper-2 sm:gap-10 sm:py-9"
              >
                <span className="text-mono-10 tracking-[0.2em] text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="display text-h4 leading-[0.92] transition-colors duration-500 group-hover:text-[color:var(--tone)]" style={{ ["--tone" as string]: r.color }}>
                      {r.title}
                    </h3>
                    <span className="eyebrow text-ink/40">{r.team}</span>
                  </div>
                  <p className="mt-3 max-w-[60ch] text-body-sm leading-[1.6] text-ink/60">
                    {r.body}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span className="text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
                    {r.type}
                  </span>
                  <span className="text-caption text-ink/55">{r.loc}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-caption text-ink/55">
          Not seeing your role?{" "}
          <a href="mailto:join@nexo.design" data-cursor="link" className="relative text-ink underline decoration-ink/25 underline-offset-4 transition-all hover:decoration-ink">
            Send an open application →
          </a>
        </p>
      </div>
    </section>
  );
}
