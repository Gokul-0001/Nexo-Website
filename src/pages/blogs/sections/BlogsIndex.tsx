"use client";

import { BRAND } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";

const POSTS = [
  {
    title: "MOTION AS STRUCTURE",
    excerpt:
      "If you add motion after the design is done, you have already added it too late. We treat animation as a load-bearing layer in the spec.",
    date: "2026 · 02 · 11",
    read: "8 min read",
    author: "Alex Vranas",
    color: BRAND.cobalt,
  },
  {
    title: "WRITING THE BRIEF YOU ACTUALLY WANT",
    excerpt:
      "Half of the briefs we receive read like polite PR copy. The best briefs read like angry Slack threads — and they ship faster.",
    date: "2026 · 01 · 28",
    read: "6 min read",
    author: "Maya Kim",
    color: BRAND.ember,
  },
  {
    title: "PERFORMANCE BUDGETS IN CI",
    excerpt:
      "Why we ship a perf budget with every project, and how we keep it honest through staging and through the build that goes live.",
    date: "2026 · 01 · 14",
    read: "10 min read",
    author: "Jonas Sø",
    color: BRAND.mint,
  },
  {
    title: "DESIGN SYSTEMS THAT OUTLIVE YOU",
    excerpt:
      "How to write tokens, components and docs that your client&apos;s team can extend in two years without calling you for permission.",
    date: "2025 · 12 · 19",
    read: "7 min read",
    author: "Lara Roca",
    color: BRAND.lime,
  },
  {
    title: "FOUNDERS READ THE BRIEF",
    excerpt:
      "Why the reply to your enquiry will come from one of the two people who will design the work. A short essay on studio economics.",
    date: "2025 · 12 · 02",
    read: "5 min read",
    author: "Alex Vranas",
    color: BRAND.ink,
  },
  {
    title: "WHY WE STILL TAKE EQUITY — SOMETIMES",
    excerpt:
      "Mostly fixed fee, rarely retainer, very rarely equity. Here is how we decide, and what we expect from the rare yes.",
    date: "2025 · 11 · 18",
    read: "9 min read",
    author: "Maya Kim",
    color: BRAND.cobalt,
  },
];

/**
 * Blogs index — six latest posts.
 *
 * Typography:
 *   - text-h2     — section heading
 *   - text-h4     — post title
 *   - text-mono-10 / text-mono-9 — meta labels
 *   - text-body-sm — excerpt
 *   - text-caption — author
 */
export default function BlogsIndex() {
  return (
    <section className="relative z-10 py-[12vh] sm:py-[16vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-t border-ink/12 pt-6 sm:mb-20">
          <div>
            <span className="eyebrow mb-5 block text-ink/40">(01) — Latest writing</span>
            <SplitLines
              lines={["SIX RECENT", "NOTES."]}
              className="display text-h2 leading-[0.92]"
            />
          </div>
          <p className="max-w-[34ch] text-[14px] leading-[1.62] text-ink/60 lg:pb-4">
            New writing ships on Thursdays. Quiet on Sundays. Old posts live in the archive.
          </p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-[22px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <li
              key={p.title}
              className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-paper-2 sm:p-9"
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{ background: p.color }}
              />
              <div className="flex items-baseline justify-between">
                <span className="text-mono-10 tracking-[0.2em] text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
                  {p.read}
                </span>
              </div>

              <h3 className="display mt-5 text-h4 leading-[0.92] transition-colors duration-500 group-hover:text-[color:var(--tone)]" style={{ ["--tone" as string]: p.color }}>
                {p.title}
              </h3>

              <p className="mt-3 max-w-[44ch] text-body-sm leading-[1.6] text-ink/60">
                {p.excerpt}
              </p>

              <div className="mt-6 flex items-baseline justify-between">
                <span className="text-caption text-ink/55">{p.author}</span>
                <span className="text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
                  {p.date}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}