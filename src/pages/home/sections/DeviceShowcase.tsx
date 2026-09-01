import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BRAND } from "@/lib/brand";
import { getPointer, isTouchDevice, usePrefersReducedMotion } from "@/lib/motion";

function LaptopScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-paper">
      <div className="flex items-center gap-2 border-b border-ink/8 px-3 py-1.5">
        <span className="flex gap-1">
          {[BRAND.ember, BRAND.lime, BRAND.mint].map((c) => (
            <i key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
          ))}
        </span>
        <span className="mx-auto flex items-center gap-1 rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[6px] text-ink/55">
          <i className="h-1 w-1 rounded-full" style={{ background: BRAND.mint }} />
          kroma.studio / work
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden px-3 pt-2.5">
        <div className="anim-drift absolute -top-6 right-2 h-20 w-20 rounded-full blur-2xl" style={{ background: `${BRAND.cobalt}40` }} />
        <p className="display relative text-[15px] leading-[0.86] tracking-[-0.04em] text-ink">
          WE BUILD
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(96deg, ${BRAND.cobalt}, ${BRAND.mint} 42%, ${BRAND.ember})`,
              backgroundSize: "300% 100%",
              animation: "kroma-gradient-pan 7s linear infinite",
            }}
          >
            DIGITAL
          </span>
          <br />
          EXPERIENCES.
        </p>
        <p className="mt-1.5 max-w-[70%] text-[6px] leading-[1.5] text-ink/50">
          An independent studio designing and engineering products, identities and interactive worlds.
        </p>
        <div className="mt-2 flex gap-1">
          {["STRATEGY", "DESIGN", "ENGINEERING"].map((t) => (
            <span key={t} className="rounded-full border border-ink/10 px-1.5 py-[2px] font-mono text-[5px] text-ink/55">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {[
            [BRAND.cobalt, BRAND.mint],
            [BRAND.ember, BRAND.lime],
            [BRAND.mint, BRAND.cobalt],
          ].map(([x, y], i) => (
            <div key={i} className="group/tile relative aspect-[4/3] overflow-hidden rounded-[3px]" style={{ background: `linear-gradient(150deg, ${x}, ${y})` }}>
              <span className="absolute inset-x-1 bottom-1 font-mono text-[4.5px] tracking-[0.2em] text-paper/90">PROJECT 0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden border-y border-ink/8 bg-ink py-1">
        <div className="anim-marquee flex w-[200%] gap-4 font-mono text-[5px] tracking-[0.35em] text-paper/70">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-4">
              {["AVAILABLE FOR BRIEFS Q3", "MOTION FIRST", "WEBGL · GSAP · REACT", "AWWWARDS SOTD ×4"].map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <i className="h-1 w-1 rounded-full" style={{ background: BRAND.lime }} />
                  {s}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="font-mono text-[5px] text-ink/40">SCROLL 0.42</span>
        <span className="h-1 w-16 overflow-hidden rounded-full bg-ink/10">
          <span className="block h-full w-1/3 rounded-full" style={{ background: BRAND.ember }} />
        </span>
      </div>
    </div>
  );
}

function MonitorScreen() {
  return (
    <div className="flex h-full w-full bg-ink text-paper">
      <div className="flex w-[16%] flex-col items-center gap-2 border-r border-paper/10 py-2">
        <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: BRAND.lime }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: i === 1 ? BRAND.mint : "rgba(255,255,255,0.22)" }} />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[5px] tracking-[0.28em] text-paper/50">NORTHBEAM / ANALYTICS</span>
          <span className="flex items-center gap-1 rounded-full bg-paper/10 px-1.5 py-[2px] font-mono text-[5px]">
            <i className="h-1 w-1 animate-pulse rounded-full" style={{ background: BRAND.mint }} />
            LIVE
          </span>
        </div>
        <div className="mt-1.5 grid grid-cols-4 gap-1">
          {[
            ["SESSIONS", "184.2k", BRAND.cobalt],
            ["CONV.", "+12.4%", BRAND.mint],
            ["LCP", "1.1s", BRAND.lime],
            ["BOUNCE", "-31%", BRAND.ember],
          ].map(([k, v, c]) => (
            <div key={k} className="rounded-[3px] bg-paper/6 px-1.5 py-1">
              <div className="font-mono text-[4.5px] tracking-[0.16em] text-paper/45">{k}</div>
              <div className="display text-[8px]" style={{ color: c }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="relative mt-1.5 flex-1 overflow-hidden rounded-[3px] bg-paper/4 p-1">
          <svg viewBox="0 0 300 120" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mon-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BRAND.mint} stopOpacity="0.55" />
                <stop offset="100%" stopColor={BRAND.mint} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2="300" y1={12 + i * 30} y2={12 + i * 30} stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />)}
            <path d="M0,96 C34,62 58,88 92,54 C126,20 150,66 184,44 C216,24 244,52 300,16 L300,120 L0,120 Z" fill="url(#mon-fill)" />
            <path d="M0,96 C34,62 58,88 92,54 C126,20 150,66 184,44 C216,24 244,52 300,16" fill="none" stroke={BRAND.mint} strokeWidth="2.4" />
            <path d="M0,108 C40,88 66,104 104,84 C142,64 168,94 210,74 C248,56 272,80 300,58" fill="none" stroke={BRAND.cobalt} strokeWidth="2" strokeDasharray="5 5" className="anim-dash" />
            <circle cx="300" cy="16" r="3.6" fill={BRAND.ember} />
          </svg>
        </div>
        <div className="mt-1.5 flex items-end gap-[3px]">
          {[38, 62, 48, 80, 55, 92, 70, 100, 64, 86, 58, 76, 96, 70].map((h, i) => (
            <span key={i} className="flex-1 rounded-[1px]" style={{ height: `${h * 0.18}px`, background: i % 4 === 0 ? BRAND.ember : `${BRAND.cobalt}bb` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-paper">
      <div className="flex items-center justify-between px-2 pt-1 font-mono text-[4.5px] text-ink/50">
        <span>9:41</span>
        <span className="h-1 w-4 rounded-full bg-ink/15" />
        <span>5G</span>
      </div>
      <div className="relative px-2 pt-1.5">
        <div className="font-mono text-[4.5px] tracking-[0.24em] text-ink/40">MONDAY, 12 MAY</div>
        <div className="display mt-0.5 text-[13px] leading-[0.86]">
          Good
          <br />
          morning,
          <br />
          <span style={{ color: BRAND.cobalt }}>Maya.</span>
        </div>
      </div>
      <div className="mx-2 mt-1.5 flex items-center gap-1.5 rounded-[6px] p-1.5" style={{ background: `linear-gradient(120deg, ${BRAND.cobalt}, ${BRAND.mint})` }}>
        <svg viewBox="0 0 40 40" className="h-6 w-6 shrink-0">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#ffffff55" strokeWidth="4" />
          <circle cx="20" cy="20" r="16" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="76 100" strokeLinecap="round" transform="rotate(-90 20 20)" />
          <text x="20" y="23" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#fff">76</text>
        </svg>
        <div className="leading-tight">
          <div className="font-mono text-[4.5px] tracking-[0.2em] text-paper/80">WEEKLY GOAL</div>
          <div className="display text-[9px] text-paper">ON TRACK</div>
        </div>
      </div>
      <div className="mx-2 mt-1.5 space-y-1">
        {[
          ["Morning routine", "07:20", BRAND.lime],
          ["Deep work block", "09:00", BRAND.cobalt],
          ["Movement", "13:30", BRAND.ember],
        ].map(([t, time, c]) => (
          <div key={t} className="flex items-center gap-1 rounded-[4px] bg-paper-2 px-1.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: c as string }} />
            <span className="text-[5.5px] text-ink/70">{t}</span>
            <span className="ml-auto font-mono text-[5px] text-ink/40">{time}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto mx-2 mb-1.5 flex items-center justify-between rounded-full bg-ink px-2 py-1">
        {[BRAND.lime, "#ffffff45", "#ffffff45", "#ffffff45"].map((c, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}

type FrameProps = { children: React.ReactNode; className?: string; radius?: string; bezel?: string };
function Frame({ children, className = "", radius = "rounded-[10px]", bezel = "bg-[#15161c]" }: FrameProps) {
  return (
    <div className={`${className} ${radius} ${bezel} relative overflow-hidden shadow-[0_36px_90px_-32px_rgba(14,15,20,0.5)]`}>
      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-white/12" />
      <div className={`relative h-full w-full overflow-hidden ${radius}`}>{children}</div>
    </div>
  );
}

export default function DeviceShowcase() {
  const root = useRef<HTMLDivElement | null>(null);
  const group = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce || isTouchDevice() || !group.current) return;
    const el = group.current;
    const pointer = getPointer();
    let raf = 0;
    const tick = () => {
      pointer.update(0.07);
      el.style.setProperty("--mx", pointer.x.toFixed(4));
      el.style.setProperty("--my", pointer.y.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-device]",
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 1.4, ease: "expo.out", stagger: 0.14, delay: 0.4 }
      );
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  const tilt = (depth: number) => ({
    transform: `perspective(1600px) rotateY(calc(var(--mx, 0) * ${depth * 9}deg)) rotateX(calc(var(--my, 0) * ${-depth * 7}deg)) translateZ(0)`,
  });

  return (
    <div ref={root} className="relative w-full select-none" data-hero-devices>
      <div ref={group} className="relative mx-auto aspect-[1/0.82] w-full max-w-[640px] [transform-style:preserve-3d]">
        {/* monitor */}
        <div data-device="monitor" data-cursor="drag" data-cursor-label="TILT" className="group absolute top-[1%] right-[0%] w-[56%] will-change-transform">
          <div className="anim-float" style={{ animationDuration: "9.5s" }}>
            <div style={tilt(0.55)}>
              <Frame className="aspect-[16/10] w-full" radius="rounded-[12px]" bezel="bg-[#191b22] p-[5px]">
                <div className="h-full w-full overflow-hidden rounded-[7px]"><MonitorScreen /></div>
              </Frame>
              <div className="mx-auto h-6 w-[16%] bg-gradient-to-b from-[#c9cdd6] to-[#eef0f3]" />
              <div className="mx-auto h-1.5 w-[30%] rounded-full bg-[#d8dbe2] shadow-[0_10px_24px_-12px_rgba(14,15,20,0.5)]" />
            </div>
          </div>
        </div>

        {/* laptop */}
        <div data-device="laptop" data-cursor="drag" data-cursor-label="TILT" className="group absolute top-[34%] left-[0%] w-[74%] will-change-transform">
          <div className="anim-float" style={{ animationDuration: "7.4s", animationDelay: "-2s" }}>
            <div style={tilt(1)}>
              <Frame className="aspect-[16/10] w-full" radius="rounded-t-[10px]" bezel="bg-[#14161c] p-[6px] pb-[5px]">
                <div className="relative h-full w-full overflow-hidden rounded-[6px]">
                  <LaptopScreen />
                  <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(112deg, rgba(255,255,255,0.16), transparent 34%)" }} />
                </div>
              </Frame>
              <div className="relative -mx-[6%] h-[13px] rounded-b-[10px] bg-gradient-to-b from-[#e9ebef] to-[#c6cad3] shadow-[0_22px_40px_-22px_rgba(14,15,20,0.55)]">
                <span className="absolute top-0 left-1/2 h-[5px] w-[13%] -translate-x-1/2 rounded-b-[4px] bg-[#a9aeb9]" />
              </div>
              <div className="mx-auto mt-1 h-6 w-[86%] rounded-[50%] bg-gradient-to-b from-ink/10 to-transparent blur-[6px]" />
            </div>
          </div>
        </div>

        {/* phone */}
        <div data-device="phone" data-cursor="drag" data-cursor-label="TILT" className="group absolute right-[3%] bottom-[2%] w-[27%] will-change-transform">
          <div className="anim-float" style={{ animationDuration: "6.2s", animationDelay: "-3.4s" }}>
            <div style={tilt(1.5)}>
              <Frame className="aspect-[9/19] w-full" radius="rounded-[26px]" bezel="bg-[#101218] p-[5px]">
                <div className="relative h-full w-full overflow-hidden rounded-[21px]">
                  <PhoneScreen />
                  <span className="absolute top-[6px] left-1/2 h-[5px] w-[26%] -translate-x-1/2 rounded-full bg-[#101218]" />
                </div>
              </Frame>
              <div className="mx-auto mt-1 h-3 w-[70%] rounded-[50%] bg-ink/12 blur-[5px]" />
            </div>
          </div>
        </div>

        <div className="anim-float absolute top-[22%] left-[6%] hidden rounded-full border border-ink/10 bg-paper/90 px-3 py-1.5 backdrop-blur-sm lg:block" style={{ animationDuration: "8.2s" }}>
          <span className="font-mono text-[9px] tracking-[0.2em] text-ink/60">FPS 60 · GPU 12%</span>
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: BRAND.mint }} />
        </div>
        <div className="anim-float absolute bottom-[26%] right-[16%] hidden items-center gap-2 rounded-full bg-ink px-3 py-2 lg:flex" style={{ animationDuration: "6.8s", animationDelay: "-1.6s" }}>
          <span className="h-2 w-2 rounded-full" style={{ background: BRAND.lime }} />
          <span className="font-mono text-[9px] tracking-[0.18em] text-paper/80">SHIPPED 214 PRODUCTS</span>
        </div>
      </div>
    </div>
  );
}
