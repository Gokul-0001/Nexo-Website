import { BRAND } from "@/lib/brand";
import { Reveal } from "@/components/animations/TextReveal";

const CLIENTS = ["HALIDE", "NORTHBEAM", "VIREO", "SONDER", "AURELIS", "NOKTA", "LUMAIRE", "KESTREL"];

const AWARDS = [
  { y: "2025", t: "Awwwards — Site of the Day ×4", c: BRAND.cobalt },
  { y: "2025", t: "FWA — Site of the Day ×2", c: BRAND.ember },
  { y: "2024", t: "CSS Design Awards — Best Innovation", c: BRAND.mint },
  { y: "2024", t: "Webby Nominee — Commerce Experience", c: BRAND.lime },
];

export default function Recognition() {
  return (
    <section className="relative z-10 py-[9vh] sm:py-[11vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow mb-6 block text-ink/40">(01) — Trusted by builders</span>
            <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {CLIENTS.map((c, i) => (
                <span
                  key={c}
                  className="display text-[clamp(0.95rem,1.9vw,1.25rem)] tracking-[-0.02em] text-ink/35 transition-colors duration-500 hover:text-ink"
                  style={{ transform: `translateY(${i % 2 ? 10 : 0}px)` }}
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="border-t border-ink/10 pt-6 lg:border-0 lg:pt-0">
            <span className="eyebrow mb-6 block text-ink/40">Recognition</span>
            <ul>
              {AWARDS.map((a) => (
                <li key={a.t} className="group flex items-center gap-4 border-b border-ink/10 py-3">
                  <span className="h-2 w-2 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-150" style={{ background: a.c }} />
                  <span className="display text-[15px] transition-transform duration-500 group-hover:translate-x-1">{a.t}</span>
                  <span className="ml-auto font-mono text-[10px] text-ink/40">{a.y}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
