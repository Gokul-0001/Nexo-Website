import { useEffect, useState } from "react";
import { BRAND, NAV_LINKS, SERVICES } from "@/lib/brand";
import { Marquee } from "@/components/animations/Marquee";

function LocalTime({ city }: { city: string }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: city === "Lisbon" ? "Europe/Lisbon" : "Europe/Berlin",
        hour12: false,
      }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, [city]);
  return (
    <span className="font-mono text-[10px] tracking-[0.14em] text-ink/50">
      {city} <span className="text-ink">{t}</span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 pt-4">
      <Marquee
        items={["LET'S BUILD SOMETHING", "AVAILABLE Q3 2026", "KROMA® DIGITAL STUDIO", "STUDIO@KROMA.DESIGN"]}
        duration={44}
        className="border-y border-ink/10 py-4"
        itemClassName="display text-[clamp(1.5rem,4.4vw,3rem)] text-ink/80"
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" data-cursor="link" className="group inline-flex items-end gap-2">
              <span className="display text-[clamp(2.6rem,6vw,4.4rem)] leading-[0.8] transition-colors duration-500 group-hover:text-cobalt">KROMA</span>
              <span className="display pb-2 text-[18px]" style={{ color: BRAND.ember }}>®</span>
            </a>
            <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.65] text-ink/55">
              An independent digital experience studio. Strategy, design, engineering and motion under one roof since 2016.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <LocalTime city="Lisbon" />
              <LocalTime city="Berlin" />
            </div>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-ink/40">Studio</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} data-cursor="link" className="group inline-flex items-center gap-2 text-[14px] text-ink/70 transition-colors duration-300 hover:text-ink">
                    <span className="h-px w-0 bg-ember transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-ink/40">Services</h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" data-cursor="link" className="group inline-flex items-center gap-2 text-[14px] text-ink/70 transition-colors duration-300 hover:text-ink">
                    <span className="h-px w-0 bg-ember transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-4" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-ink/40">Connect</h4>
            <ul className="space-y-2.5">
              {["Instagram", "LinkedIn", "Dribbble", "Awwwards", "studio@kroma.design"].map((l) => (
                <li key={l}>
                  <a href="#contact" data-cursor="link" className="group inline-flex items-center gap-2 text-[14px] text-ink/70 transition-colors duration-300 hover:text-ink">
                    <span className="h-px w-0 bg-ember transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-4" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <p className="font-mono text-[10px] tracking-[0.14em] text-ink/40 uppercase">
            © {new Date().getFullYear()} KROMA Studio — Registered in Portugal
          </p>
          <div className="flex items-center gap-6">
            <a href="#top" className="font-mono text-[10px] tracking-[0.14em] text-ink/40 uppercase hover:text-ink">Privacy</a>
            <a href="#top" className="font-mono text-[10px] tracking-[0.14em] text-ink/40 uppercase hover:text-ink">Terms</a>
            <a href="#top" data-cursor="link" className="group flex items-center gap-2 rounded-full border border-ink/12 px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-ink/60 uppercase transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper">
              Back to top
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-0.5">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
