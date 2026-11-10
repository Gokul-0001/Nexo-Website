"use client";

import { PROJECTS } from "@/lib/brand";
import { SplitLines } from "@/components/animations/TextReveal";
import { ProjectArt } from "@/pages/home/sections/Artwork";

/**
 * Work index — full case-study list, mirrored from the Home Work
 * section so visitors can browse every project in one place.
 *
 * Typography:
 *   - text-h2     — section heading
 *   - text-h3     — case-study title
 *   - text-mono-10 / text-mono-9-sm — meta labels
 *   - text-body-sm — discipline
 */
export default function WorkIndex() {
  return (
    <section id="index" className="relative z-10 py-[6vh] sm:py-[10vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-t border-ink/12 pt-6 sm:mb-20">
          <div>
            <span className="eyebrow mb-5 block text-ink/40">(01) — Selected work</span>
            <SplitLines lines={["EVERY CASE,", "IN ORDER."]} className="display text-h2 leading-[0.86]" />
          </div>
          <p className="max-w-[26ch] text-body-sm leading-[1.6] text-ink/55">
            Filtered by craft, by impact and by how often the client still calls. The full archive
            ships on request.
          </p>
        </div>

        <div className="flex flex-col gap-[14vh] sm:gap-[18vh]">
          {PROJECTS.map((p, i) => (
            <article
              key={p.id}
              data-cursor="view"
              data-cursor-label="VIEW"
              className={`group relative ${i % 2 === 1 ? "lg:pl-[14%]" : "lg:pr-[14%]"}`}
            >
              <div
                className={`flex flex-wrap items-end gap-x-6 gap-y-2 pb-5 ${
                  i % 2 === 1 ? "lg:flex-row-reverse lg:text-right" : ""
                }`}
              >
                <span
                  className="text-h3 block transition-colors duration-500 group-hover:text-[color:var(--tone)]"
                  style={{ ["--tone" as string]: p.palette[0] }}
                >
                  {p.title}
                </span>
                <span className="mb-2 flex flex-col gap-1 text-body-sm text-ink/55">
                  <span className="text-mono-10 tracking-[0.2em] text-ink/40">
                    {String(i + 1).padStart(2, "0")} / {p.year}
                  </span>
                  <span>{p.discipline}</span>
                </span>
              </div>

              <div className="relative overflow-hidden rounded-[22px] border border-ink/8 bg-paper-2">
                <div className="relative aspect-[16/10.5] w-full sm:aspect-[16/9]">
                  <ProjectArt project={p} />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 mix-blend-hard-light transition-opacity duration-700 group-hover:opacity-70"
                  style={{ background: `linear-gradient(120deg, ${p.palette[0]}, ${p.palette[1]})` }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-full bg-paper/90 px-3 py-1.5 text-mono-9-sm tracking-[0.14em] text-ink/75 uppercase backdrop-blur-sm"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <span
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-mono-9-sm tracking-[0.2em] text-paper uppercase"
                    style={{ background: "rgba(14,15,20,0.82)", backdropFilter: "blur(8px)" }}
                  >
                    {p.client}
                    <i className="h-1.5 w-1.5 rounded-full" style={{ background: p.palette[1] }} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}