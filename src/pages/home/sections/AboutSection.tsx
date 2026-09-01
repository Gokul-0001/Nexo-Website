import { BRAND } from "@/lib/brand";
import { Counter, Reveal, SplitLines } from "@/components/animations/TextReveal";

const PRINCIPLES = [
  {
    t: "Small team, senior hands",
    b: "You work with the people who make the work. No account layer, no juniors learning on your budget.",
  },
  {
    t: "Motion is structural",
    b: "Animation is designed into the product from day one — timing, easing and hierarchy are part of the spec.",
  },
  {
    t: "Performance is respect",
    b: "Every build ships with a budget: sub-1.2s LCP, 60fps on mid-tier phones, accessible by default.",
  },
  {
    t: "Systems that outlive us",
    b: "We hand over documentation, tokens and components your team can extend without calling us.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 py-[12vh] sm:py-[18vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <span className="eyebrow mb-6 block text-ink/40">(05) — About the studio</span>

        <SplitLines
          lines={["WE DON'T JUST BUILD WEBSITES.", "WE BUILD DIGITAL EXPERIENCES."]}
          stagger={0.12}
          className="display text-[clamp(1.8rem,6.2vw,5.4rem)]"
          render={(line, i) =>
            i === 1 ? (
              <span>
                WE BUILD{" "}
                <span className="text-transparent" style={{ WebkitTextStroke: `1.3px ${BRAND.ink}66` }}>
                  DIGITAL
                </span>{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.mint} 42%, ${BRAND.ember})`,
                    backgroundSize: "200% 100%",
                    animation: "kroma-drift 18s ease-in-out infinite",
                  }}
                >
                  EXPERIENCES.
                </span>
              </span>
            ) : (
              <span className="text-ink/80">{line}</span>
            )
          }
        />

        <div className="mt-14 grid gap-12 border-t border-ink/12 pt-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal className="space-y-6 text-[15px] leading-[1.68] text-ink/65 sm:text-[16.5px]">
            <p>
              KROMA started in 2016 as two designers and a rented desk. Today we are eleven
              designers, engineers and motion designers spread across three time zones — still
              deliberately small, still taking on a maximum of six engagements a year.
            </p>
            <p>
              We are not interested in pages that merely look good in a screenshot. We build
              digital matter: interfaces that respond, identities that flex, products that stay
              fast a year after launch. Design, code and motion come from the same head — usually
              the same file.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {["Strategy", "Design", "Engineering", "Motion", "AI"].map((s, i) => (
                <span
                  key={s}
                  className="rounded-full border px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-500 hover:border-ink/40"
                  style={{
                    borderColor:
                      [BRAND.cobalt, BRAND.mint, BRAND.ember, BRAND.lime, BRAND.ink][i] + "55",
                    color: "rgba(14,15,20,0.6)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-x-6 gap-y-8" delay={0.1}>
            {[
              { n: 9, s: "", l: "Years in practice" },
              { n: 214, s: "+", l: "Products shipped" },
              { n: 94, s: "%", l: "Clients who return" },
              { n: 31, s: "", l: "Awards & mentions" },
            ].map((st) => (
              <div key={st.l}>
                <div className="display text-[clamp(2.4rem,5.4vw,3.8rem)] leading-none">
                  <Counter to={st.n} suffix={st.s} />
                </div>
                <div className="mt-2 max-w-[16ch] font-mono text-[9.5px] leading-relaxed tracking-[0.18em] text-ink/45 uppercase">
                  {st.l}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[22px] border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.t}
              className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-paper-2 sm:p-9"
              y={28}
              delay={i * 0.05}
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{
                  background: [BRAND.cobalt, BRAND.mint, BRAND.ember, BRAND.lime][i],
                }}
              />
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink/35">0{i + 1}</span>
              <h3 className="display mt-3 text-[clamp(1.15rem,2.6vw,1.6rem)]">{p.t}</h3>
              <p className="mt-3 max-w-[44ch] text-[14.5px] leading-[1.6] text-ink/60">{p.b}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[
                ["AV", BRAND.cobalt],
                ["MK", BRAND.ember],
                ["JS", BRAND.mint],
                ["LR", BRAND.lime],
                ["TO", BRAND.ink],
              ].map(([initials, c], i) => (
                <span
                  key={i}
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-paper font-mono text-[10px] text-paper transition-transform duration-500 hover:-translate-y-1"
                  style={{ background: c as string }}
                  title="KROMA team"
                >
                  {initials}
                </span>
              ))}
            </div>
            <p className="text-[13.5px] text-ink/55">
              Eleven specialists. <span className="text-ink">No account managers.</span>
            </p>
          </div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-ink/40 uppercase">
            Currently taking briefs for Q3 →
          </p>
        </Reveal>
      </div>
    </section>
  );
}
