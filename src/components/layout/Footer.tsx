import { useEffect, useState } from "react";
import { NAV_LINKS, SERVICE_PAGES } from "@/lib/brand";
import { Marquee } from "@/components/animations/Marquee";
import nexoLogo from "@/images/nexo_logo.png";

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
    <span className="text-mono-10 text-ink/50">
      {city} <span className="text-ink">{t}</span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 pt-4">
      <Marquee
        items={["LET'S BUILD SOMETHING", "AVAILABLE Q3 2026", "NEXO TECHNOLOGIES & SERVICES", "STUDIO@NEXO.DESIGN"]}
        duration={44}
        className="border-y border-ink/10 py-4"
        itemClassName="display text-[clamp(1.15rem,3.2vw,2.1rem)] text-ink/80"
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="/" data-cursor="link" className="group inline-flex items-end gap-2">
              <img
                src={nexoLogo.src}
                alt="Nexo Technologies & Services"
                width={nexoLogo.width}
                height={nexoLogo.height}
                className="block h-auto max-h-[clamp(2.5rem,6vw,3.5rem)] w-auto max-w-[220px] object-contain transition-opacity duration-500"
              />
            </a>
            <p className="mt-5 max-w-[34ch] text-caption text-ink/55">
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
                <li key={l.href}>
                  <a href={l.href} data-cursor="link" className="group inline-flex items-center gap-2 text-caption text-ink/70 transition-colors duration-300 hover:text-ink">
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
              {SERVICE_PAGES.map((s) => (
                <li key={s.slug}>
                  <a href={s.href} data-cursor="link" className="group inline-flex items-center gap-2 text-caption text-ink/70 transition-colors duration-300 hover:text-ink">
                    <span className="h-px w-0 bg-ember transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-4" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-ink/40">Connect</h4>
            <ul className="space-y-2.5">
              {["Instagram", "LinkedIn", "Dribbble", "Awwwards", "studio@nexo.design"].map((l) => (
                <li key={l}>
                  <a href="/#contact" data-cursor="link" className="group inline-flex items-center gap-2 text-caption text-ink/70 transition-colors duration-300 hover:text-ink">
                    <span className="h-px w-0 bg-ember transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-4" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <p className="text-mono-9 tracking-[0.14em] text-ink/40 uppercase" suppressHydrationWarning>
            © {new Date().getFullYear()} Nexo Technologies & Services — Registered in Portugal
          </p>
          <div className="flex items-center gap-6">
            <a href="/#" className="text-mono-9 tracking-[0.14em] text-ink/40 uppercase hover:text-ink">Privacy</a>
            <a href="/#" className="text-mono-9 tracking-[0.14em] text-ink/40 uppercase hover:text-ink">Terms</a>
            <a href="/#" data-cursor="link" className="group flex items-center gap-2 rounded-full border border-ink/12 px-4 py-2 text-mono-9 tracking-[0.14em] text-ink/60 uppercase transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper">
              Back to top
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-0.5">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
