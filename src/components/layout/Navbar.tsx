import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BRAND, NAV_LINKS, SERVICE_PAGES } from "@/lib/brand";
import { useMagnetic } from "@/lib/motion";

function Logo({ compact }: { compact: boolean }) {
  return (
    <a href="/" data-cursor="link" aria-label="NEXO home" className="group inline-flex items-center">
      {/* Image-based logo. Replace /images/logo.png with the final asset when ready. */}
      <img
        src="/images/logo.png"
        alt="Nexo Technologies & Services"
        width={120}
        height={28}
        className={`block h-auto w-auto object-contain transition-opacity duration-500 ${
          compact ? "max-h-[22px]" : "max-h-[28px]"
        }`}
        style={{ width: compact ? "auto" : "auto", maxWidth: "140px" }}
      />
    </a>
  );
}

function ServicesDropdownDesktop({ open }: { open: boolean }) {
  return (
    <div
      data-services-dropdown
      className={`absolute left-1/2 top-full z-[920] mt-3 w-[260px] -translate-x-1/2 origin-top rounded-2xl border border-ink/10 bg-paper/95 p-2 shadow-[0_24px_60px_-24px_rgba(14,15,20,0.35)] backdrop-blur-md transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <ul className="space-y-1">
        {SERVICE_PAGES.map((s, i) => (
          <li key={s.slug}>
            <a
              href={s.href}
              data-cursor="link"
              className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-mono-10-5 tracking-[0.12em] text-ink/70 uppercase transition-colors duration-300 hover:bg-ink hover:text-paper"
              style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
            >
              <span className="flex items-center gap-2">
                <i className="h-1 w-1 rounded-full bg-ember opacity-70 transition-opacity duration-300 group-hover:bg-lime group-hover:opacity-100" />
                {s.label}
              </span>
              <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">→</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Nav() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140);
  };
  const closeServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(false);
  };

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
          onMouseLeave={scheduleClose}
        >
          <Logo compact={compact} />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li
                key={l.href}
                className="relative"
                onMouseEnter={() => "hasChildren" in l && l.hasChildren ? openServices() : closeServices()}
              >
                <a
                  href={l.href}
                  data-cursor="link"
                  className="group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-mono-10 tracking-[0.16em] text-ink/60 uppercase transition-colors duration-300 hover:text-ink"
                  aria-haspopup={"hasChildren" in l && l.hasChildren ? "menu" : undefined}
                  aria-expanded={"hasChildren" in l && l.hasChildren ? servicesOpen : undefined}
                  onMouseEnter={"hasChildren" in l && l.hasChildren ? openServices : undefined}
                >
                  <span className="relative z-10">{l.label}</span>
                  {"hasChildren" in l && l.hasChildren ? (
                    <svg
                      width="9"
                      height="6"
                      viewBox="0 0 9 6"
                      fill="none"
                      className={`relative z-10 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    >
                      <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  ) : null}
                  <span className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </a>
                {"hasChildren" in l && l.hasChildren ? <ServicesDropdownDesktop open={servicesOpen} /> : null}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              ref={cta}
              href="/#contact"
              data-cursor="magnet"
              className="group relative hidden overflow-hidden rounded-full px-5 py-3 text-mono-9 tracking-[0.16em] text-paper uppercase transition-transform duration-500 sm:block"
              style={{ background: BRAND.ink }}
            >
              <span
                className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                style={{
                  background: `linear-gradient(100deg, ${BRAND.cobalt}, ${BRAND.ember})`,
                }}
              />
              <span className="relative">Let&apos;s Work Together →</span>
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
            <img
              src="/images/logo.png"
              alt="Nexo Technologies & Services"
              width={120}
              height={28}
              className="block h-auto max-h-[28px] w-auto max-w-[140px] object-contain"
            />
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
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={l.href}
                    data-menu-item
                    onClick={() => setOpen(false)}
                    className="display flex flex-1 items-baseline gap-3 py-4 text-[11.5vw] text-paper"
                  >
                    <span className="text-mono-9 tracking-[0.2em] text-paper/40">
                      0{i + 1}
                    </span>
                    {l.label}
                  </a>
                  {"hasChildren" in l && l.hasChildren ? (
                    <button
                      aria-label="Toggle services"
                      data-cursor="link"
                      className="rounded-full p-2 text-paper/70 transition-transform duration-300 hover:text-paper"
                      onClick={(e) => {
                        e.preventDefault();
                        const target = e.currentTarget.parentElement?.parentElement?.querySelector<HTMLElement>("[data-mobile-services]");
                        if (target) {
                          const isOpen = target.dataset.open === "1";
                          target.dataset.open = isOpen ? "0" : "1";
                          target.style.maxHeight = isOpen ? "0px" : `${target.scrollHeight}px`;
                          target.style.opacity = isOpen ? "0" : "1";
                          e.currentTarget.style.transform = isOpen ? "" : "rotate(180deg)";
                        }
                      }}
                    >
                      <svg width="12" height="8" viewBox="0 0 9 6" fill="none" aria-hidden>
                        <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                  ) : null}
                </div>
                {"hasChildren" in l && l.hasChildren ? (
                  <div
                    data-mobile-services
                    data-open="0"
                    className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ maxHeight: 0, opacity: 0 }}
                  >
                    <ul className="space-y-1 pb-3 pl-10">
                      {SERVICE_PAGES.map((s) => (
                        <li key={s.slug}>
                          <a
                            href={s.href}
                            onClick={() => setOpen(false)}
                            className="text-mono-11 text-paper/65 uppercase transition-colors duration-300 hover:text-paper"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mx-6 mt-10 block rounded-full py-4 text-center text-mono-10-5 tracking-[0.2em] text-ink uppercase"
            style={{ background: BRAND.lime }}
          >
            Let&apos;s Work Together →
          </a>
        </div>
      </div>
    </>
  );
}
