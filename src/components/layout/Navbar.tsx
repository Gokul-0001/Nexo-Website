import { useEffect, useState } from "react";
import gsap from "gsap";
import { NAV_LINKS, BRAND } from "@/lib/brand";
import { useMagnetic } from "@/lib/motion";

function Logo({ compact }: { compact: boolean }) {
  return (
    <a href="#top" data-cursor="link" className="group flex items-center gap-2.5" aria-label="KROMA home">
      <span
        className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-[8px] transition-transform duration-500 group-hover:rotate-[18deg]"
        style={{
          background: `conic-gradient(from 210deg, ${BRAND.cobalt}, ${BRAND.mint}, ${BRAND.lime}, ${BRAND.ember}, ${BRAND.cobalt})`,
        }}
      >
        <span className="h-[7px] w-[7px] rounded-full bg-paper" />
      </span>
      <span
        className={`display leading-none tracking-[-0.05em] text-ink transition-all duration-500 ${
          compact ? "text-[17px]" : "text-[21px]"
        }`}
      >
        KROMA
        <span className="align-super text-[9px]" style={{ color: BRAND.ember }}>
          ®
        </span>
      </span>
    </a>
  );
}

export default function Nav() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const cta = useMagnetic<HTMLAnchorElement>(0.28);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const items = gsap.utils.toArray<HTMLElement>("[data-menu-item]");
    gsap.fromTo(
      items,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.85, ease: "expo.out", stagger: 0.06, delay: 0.12 },
    );
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[900] flex justify-center px-4 pt-4 sm:px-6 sm:pt-5">
        <nav
          data-cursor="none"
          className="relative flex w-full max-w-[1440px] items-center justify-between rounded-full border transition-[background-color,box-shadow,padding,height,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            padding: compact ? "8px 8px 8px 18px" : "14px 0px 14px 22px",
            backgroundColor: compact ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0)",
            backdropFilter: compact ? "blur(14px) saturate(140%)" : "none",
            WebkitBackdropFilter: compact ? "blur(14px) saturate(140%)" : "none",
            borderColor: compact ? "rgba(14,15,20,0.08)" : "rgba(14,15,20,0)",
            boxShadow: compact ? "0 18px 50px -30px rgba(14,15,20,0.45)" : "0 0 0 rgba(0,0,0,0)",
          }}
        >
          <Logo compact={compact} />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="link"
                  className="group relative block rounded-full px-3.5 py-2 font-mono text-[10.5px] tracking-[0.16em] text-ink/60 uppercase transition-colors duration-300 hover:text-ink"
                >
                  <span className="relative z-10">{l.label}</span>
                  <span className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              ref={cta}
              href="#contact"
              data-cursor="magnet"
              className="group relative hidden overflow-hidden rounded-full px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-paper uppercase transition-transform duration-500 sm:block"
              style={{ background: BRAND.ink }}
            >
              <span
                className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                style={{
                  background: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.ember})`,
                }}
              />
              <span className="relative">Let&apos;s Build Something →</span>
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              data-cursor="link"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-paper/70 lg:hidden"
            >
              <span className="space-y-1">
                <span className="block h-px w-4 bg-ink" />
                <span className="block h-px w-4 bg-ink" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-[950] transition-[visibility] duration-500 lg:hidden ${
          open ? "visible" : "invisible"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 origin-top bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "scale-y-100" : "scale-y-0"
          }`}
        >
          <div
            className="absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${BRAND.cobalt}bb, transparent 70%)` }}
          />
          <div className="flex items-center justify-between px-6 pt-6">
            <span className="display text-[19px] text-paper">
              KROMA<span style={{ color: BRAND.lime }}>®</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-paper"
            >
              ✕
            </button>
          </div>
          <ul className="relative mt-14 px-6">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href} className="overflow-hidden border-b border-paper/10">
                <a
                  href={l.href}
                  data-menu-item
                  onClick={() => setOpen(false)}
                  className="display flex items-baseline gap-3 py-4 text-[13vw] text-paper"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-paper/40">
                    0{i + 1}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mx-6 mt-10 block rounded-full py-4 text-center font-mono text-[11px] tracking-[0.2em] text-ink uppercase"
            style={{ background: BRAND.lime }}
          >
            Let&apos;s build something →
          </a>
        </div>
      </div>
    </>
  );
}
