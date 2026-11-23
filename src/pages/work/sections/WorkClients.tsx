"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type Mark = "circle" | "diamond" | "triangle" | "rings" | "bars" | "arc" | "plus" | "hex" | "leaf" | "spark";

type Client = {
  /** PLACEHOLDER — swap for the client's real name. */
  name: string;
  industry: string;
  color: string;
  mark: Mark;
  /** Optional path to the real logo (SVG or transparent PNG in /public). When set, it replaces the placeholder mark. */
  logo?: string;
};

/**
 * PLACEHOLDER client list — replace each entry with a real client (and its logo file)
 * once they have approved being shown. Names here describe the type of client only.
 */
const CLIENTS: Client[] = [
  { name: "Client name", industry: "Real estate", color: BRAND.cobalt, mark: "diamond" },
  { name: "Client name", industry: "Retail & D2C", color: BRAND.ember, mark: "circle" },
  { name: "Client name", industry: "Healthcare", color: BRAND.mint, mark: "plus" },
  { name: "Client name", industry: "Education", color: BRAND.lime, mark: "triangle" },
  { name: "Client name", industry: "Fintech", color: BRAND.cobalt, mark: "bars" },
  { name: "Client name", industry: "Hospitality", color: BRAND.ember, mark: "arc" },
  { name: "Client name", industry: "Logistics", color: BRAND.mint, mark: "hex" },
  { name: "Client name", industry: "SaaS & Tech", color: BRAND.lime, mark: "rings" },
  { name: "Client name", industry: "Manufacturing", color: BRAND.cobalt, mark: "spark" },
  { name: "Client name", industry: "Wellness", color: BRAND.ember, mark: "leaf" },
];

function LogoMark({ mark, color }: { mark: Mark; color: string }) {
  const fill = { fill: color };
  const stroke = { fill: "none", stroke: color, strokeWidth: 2.4 };
  return (
    <svg viewBox="0 0 28 28" className="h-10 w-10 shrink-0" aria-hidden>
      {mark === "circle" && <><circle cx="14" cy="14" r="11" {...fill} /><circle cx="14" cy="14" r="4.5" fill={BRAND.paper} /></>}
      {mark === "diamond" && <path d="M14 2 26 14 14 26 2 14Z" {...fill} />}
      {mark === "triangle" && <path d="M14 3 26 25H2Z" {...fill} />}
      {mark === "rings" && <><circle cx="10" cy="14" r="7.5" {...stroke} /><circle cx="18" cy="14" r="7.5" {...stroke} /></>}
      {mark === "bars" && <><rect x="3" y="14" width="5" height="11" rx="1.5" {...fill} /><rect x="11.5" y="8" width="5" height="17" rx="1.5" {...fill} /><rect x="20" y="3" width="5" height="22" rx="1.5" {...fill} /></>}
      {mark === "arc" && <path d="M3 22a11 11 0 0 1 22 0" {...stroke} strokeWidth={4} strokeLinecap="round" />}
      {mark === "plus" && <path d="M11 3h6v8h8v6h-8v8h-6v-8H3v-6h8z" {...fill} />}
      {mark === "hex" && <path d="M14 2 25 8.5v11L14 26 3 19.5v-11Z" {...fill} />}
      {mark === "leaf" && <path d="M5 23C5 11 12 4 24 4c0 12-7 19-19 19Z" {...fill} />}
      {mark === "spark" && <path d="M14 2l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" {...fill} />}
    </svg>
  );
}

function LogoTile({ client }: { client: Client }) {
  return (
    <span className="group/logo grid h-20 w-40 shrink-0 place-items-center rounded-[18px] border border-ink/10 bg-paper/70 backdrop-blur-sm transition-[translate,border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-paper hover:shadow-[0_20px_40px_-26px_rgba(14,15,20,0.55)] sm:w-48">
      {client.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={client.logo} alt={client.name} className="max-h-9 max-w-[70%] object-contain opacity-55 grayscale transition-[opacity,filter] duration-500 group-hover/logo:opacity-100 group-hover/logo:grayscale-0" />
      ) : (
        <span role="img" aria-label="Client logo" className="opacity-45 grayscale transition-[opacity,filter,scale] duration-500 group-hover/logo:scale-110 group-hover/logo:opacity-100 group-hover/logo:grayscale-0">
          <LogoMark mark={client.mark} color={client.color} />
        </span>
      )}
    </span>
  );
}

function LogoRow({ clients, reverse, duration }: { clients: Client[]; reverse?: boolean; duration: string }) {
  return (
    <div data-client-row className="group/row flex overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="anim-marquee flex shrink-0 gap-4 pr-4 group-hover/row:[animation-play-state:paused]" style={{ "--marquee-duration": duration, animationDirection: reverse ? "reverse" : "normal" } as React.CSSProperties}>
        {[...clients, ...clients].map((client, index) => <LogoTile key={`${client.industry}-${index}`} client={client} />)}
      </div>
    </div>
  );
}

/** Client logos: two marquee rows of the businesses we've built for. */
export default function WorkClients() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-clients-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.12, scrollTrigger: { trigger: element, start: "top 85%", end: "top 50%", scrub: 0.7 } });
      gsap.utils.toArray<HTMLElement>("[data-client-row]", element).forEach((row, index) => {
        gsap.fromTo(row, { opacity: 0, xPercent: index % 2 ? -14 : 14 }, { opacity: 1, xPercent: 0, ease: "none", scrollTrigger: { trigger: row, start: "top 95%", end: "top 62%", scrub: 0.7 } });
      });
      gsap.fromTo("[data-clients-foot]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: "[data-clients-foot]", start: "top 95%", end: "top 75%", scrub: 0.6 } });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 overflow-x-clip py-[12vh] sm:py-[14vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div data-clients-head className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />Trusted by</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              BUSINESSES THAT<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, ${BRAND.mint} 45%, ${BRAND.ember})` }}>BUILD WITH US.</span>
            </h2>
          </div>
          <p className="max-w-[40ch] text-[14px] leading-[1.65] text-ink/60">
            Startups, family businesses and growing brands across India and beyond trust Nexo with
            their websites, stores, apps, marketing and automation.
          </p>
        </div>
      </div>

      <div className="mt-14 space-y-4">
        <LogoRow clients={CLIENTS.slice(0, 5)} duration="34s" />
        <LogoRow clients={CLIENTS.slice(5)} reverse duration="40s" />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div data-clients-foot className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-5">
          <span className="flex items-center gap-3 text-mono-9 tracking-[0.18em] text-ink/40 uppercase">
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.ember }} />Across real estate, retail, healthcare, education and more
          </span>
          <a href="/contact" data-cursor="link" className="group/cta inline-flex items-center gap-3 border-b border-ink/20 pb-1 text-mono-10-5 tracking-[0.18em] text-ink uppercase transition-colors duration-300 hover:border-ink">
            Your logo could be next <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
