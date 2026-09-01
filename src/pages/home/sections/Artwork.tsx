import { BRAND } from "@/lib/brand";
import type { Project, Service } from "@/lib/brand";

/* ══════════════════════════ service preview art ══════════════════════════ */

export function ServiceArt({ kind, color }: { kind: Service["art"]; color: string }) {
  const shell =
    "relative h-full w-full overflow-hidden rounded-[14px] border border-ink/10 bg-paper p-3";

  return (
    <div className={shell}>
      <div
        className="absolute -top-10 -right-8 h-32 w-32 rounded-full blur-2xl"
        style={{ background: `${color}55` }}
      />
      <div className="relative h-full w-full">
        {kind === "code" && (
          <div className="flex h-full flex-col gap-[5px] rounded-md bg-ink p-3 font-mono text-[7px] leading-[1.6] text-paper/70">
            <div className="mb-1 flex gap-1">
              {[BRAND.ember, BRAND.lime, BRAND.mint].map((c) => (
                <i key={c} className="h-[5px] w-[5px] rounded-full" style={{ background: c }} />
              ))}
            </div>
            {[
              [38, color],
              [62, "#4a4e5e"],
              [48, BRAND.lime],
              [72, "#4a4e5e"],
              [30, BRAND.mint],
              [58, "#4a4e5e"],
              [44, color],
            ].map(([w, c], i) => (
              <span
                key={i}
                className="block h-[4px] rounded-full"
                style={{ width: `${w}%`, background: c as string, opacity: 0.9 }}
              />
            ))}
            <span
              className="mt-auto self-end rounded-sm px-1 py-px font-mono text-[6px] text-ink"
              style={{ background: BRAND.lime }}
            >
              build: 0.42s ✓
            </span>
          </div>
        )}

        {kind === "app" && (
          <div className="flex h-full items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex h-[92%] w-1/3 flex-col gap-1.5 rounded-[10px] border border-ink/12 bg-paper-2 p-1.5"
                style={{ transform: `translateY(${i === 1 ? -8 : 0}px)` }}
              >
                <div className="h-1.5 w-6 rounded-full" style={{ background: color }} />
                <div
                  className="h-8 rounded-[6px]"
                  style={{ background: `linear-gradient(140deg, ${color}, ${BRAND.cobalt})` }}
                />
                <div className="h-1 w-full rounded-full bg-ink/12" />
                <div className="h-1 w-3/4 rounded-full bg-ink/12" />
                <div className="mt-auto h-3 rounded-full bg-ink/8" />
              </div>
            ))}
          </div>
        )}

        {kind === "interface" && (
          <div className="grid h-full grid-cols-3 grid-rows-4 gap-1.5">
            <div className="col-span-3 row-span-1 flex items-center gap-1 rounded-md bg-ink/5 px-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
              <span className="h-1 w-10 rounded-full bg-ink/20" />
              <span className="ml-auto h-1 w-6 rounded-full bg-ink/12" />
            </div>
            <div className="col-span-1 row-span-3 space-y-1.5 rounded-md bg-ink/4 p-1.5">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="block h-1 rounded-full"
                  style={{ width: `${70 - i * 8}%`, background: i === 2 ? color : "#c9ccd4" }}
                />
              ))}
            </div>
            <div
              className="col-span-2 row-span-2 overflow-hidden rounded-md"
              style={{ background: `linear-gradient(120deg, ${color}, ${BRAND.mint})` }}
            >
              <div className="flex h-full items-end p-2">
                <span className="display text-[26px] leading-none text-paper">Aa</span>
              </div>
            </div>
            <div className="col-span-2 row-span-1 flex items-center gap-1.5 rounded-md bg-ink/5 px-2">
              <span
                className="h-2.5 w-2.5 rounded-full border border-ink/25"
                style={{ background: BRAND.ember }}
              />
              <span className="h-1 w-12 rounded-full bg-ink/15" />
            </div>
          </div>
        )}

        {kind === "identity" && (
          <div className="flex h-full flex-col justify-between">
            <div className="display text-[52px] leading-[0.8]" style={{ color }}>
              Aa<span className="text-ink/25">*</span>
            </div>
            <div className="flex gap-1">
              {[BRAND.cobalt, BRAND.ember, BRAND.lime, BRAND.mint, color].map((c, i) => (
                <span key={`${c}-${i}`} className="h-6 flex-1 rounded-[3px]" style={{ background: c }} />
              ))}
            </div>
            <div className="space-y-1">
              <span className="block h-[3px] w-full rounded-full bg-ink/70" />
              <span className="block h-[3px] w-2/3 rounded-full bg-ink/20" />
            </div>
          </div>
        )}

        {kind === "space" && (
          <div className="relative flex h-full items-center justify-center">
            <svg viewBox="0 0 200 140" className="h-full w-full">
              <defs>
                <radialGradient id="sa" cx="50%" cy="50%">
                  <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={BRAND.cobalt} stopOpacity="0.05" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="70" r="34" fill="url(#sa)" />
              {[0, 1, 2, 3, 4].map((i) => (
                <ellipse
                  key={i}
                  cx="100"
                  cy="70"
                  rx={40 + i * 6}
                  ry={16 + i * 3}
                  fill="none"
                  stroke={i % 2 ? BRAND.cobalt : color}
                  strokeOpacity="0.45"
                  strokeWidth="0.6"
                  transform={`rotate(${-24 + i * 12} 100 70)`}
                />
              ))}
              <circle cx="100" cy="70" r="34" fill="none" stroke={BRAND.ink} strokeOpacity="0.35" strokeWidth="0.6" />
              <circle cx="134" cy="56" r="2.4" fill={BRAND.ember} />
              <circle cx="66" cy="86" r="1.8" fill={BRAND.mint} />
            </svg>
          </div>
        )}

        {kind === "neural" && (
          <svg viewBox="0 0 200 140" className="h-full w-full">
            {[
              [24, 30],
              [24, 70],
              [24, 110],
              [86, 46],
              [86, 94],
              [150, 70],
              [176, 34],
              [176, 106],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === 5 ? 6 : 4} fill={i % 3 === 0 ? color : BRAND.cobalt} opacity={0.85} />
            ))}
            {[
              [24, 30, 86, 46],
              [24, 70, 86, 46],
              [24, 70, 86, 94],
              [24, 110, 86, 94],
              [86, 46, 150, 70],
              [86, 94, 150, 70],
              [150, 70, 176, 34],
              [150, 70, 176, 106],
            ].map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={BRAND.ink}
                strokeOpacity="0.2"
                strokeWidth="0.7"
                strokeDasharray="3 3"
                className="anim-dash"
              />
            ))}
            <text x="8" y="134" fontFamily="monospace" fontSize="7" fill={BRAND.ink} opacity="0.5">
              llm · rag · eval
            </text>
          </svg>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════ project key visuals ══════════════════════════ */

export function ProjectArt({ project }: { project: Project }) {
  const [a, b] = project.palette;

  return (
    <div className="relative h-full w-full overflow-hidden bg-paper-2">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 100% at 12% 8%, ${a}26, transparent 55%), radial-gradient(90% 90% at 92% 96%, ${b}33, transparent 60%)`,
        }}
      />

      {project.art === "commerce" && (
        <div className="absolute inset-0 flex items-center justify-center gap-[3%] p-[6%]">
          <div className="flex h-[76%] w-[30%] flex-col gap-2 rounded-lg bg-paper p-2 shadow-[0_24px_60px_-24px_rgba(14,15,20,0.35)]">
            <div className="flex-1 rounded" style={{ background: `linear-gradient(150deg, ${a}, ${b})` }} />
            <span className="h-1 w-2/3 rounded-full bg-ink/60" />
            <span className="h-1 w-1/3 rounded-full bg-ink/20" />
          </div>
          <div
            className="flex h-[92%] w-[46%] flex-col justify-between rounded-xl p-[6%] shadow-[0_40px_90px_-30px_rgba(14,15,20,0.45)]"
            style={{ background: `linear-gradient(160deg, ${a}, ${b})` }}
          >
            <span className="font-mono text-[9px] tracking-[0.3em] text-paper/80">LENS 04 / TITANIUM</span>
            <span className="display text-[clamp(28px,5vw,64px)] leading-[0.82] text-paper">
              SEE
              <br />
              FURTHER
            </span>
            <span className="flex items-center gap-2 text-paper">
              <span className="rounded-full bg-paper/20 px-2 py-1 font-mono text-[8px]">ADD · €1,240</span>
            </span>
          </div>
          <div className="flex h-[62%] w-[16%] flex-col gap-2 self-end rounded-lg bg-ink p-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-square rounded" style={{ background: i === 1 ? a : "#22242e" }} />
            ))}
          </div>
        </div>
      )}

      {project.art === "fintech" && (
        <div className="absolute inset-[7%] rounded-xl border border-ink/10 bg-paper p-[4%] shadow-[0_40px_90px_-40px_rgba(14,15,20,0.4)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.24em] text-ink/45">PORTFOLIO / LIVE</span>
            <span className="rounded-full px-2 py-1 font-mono text-[8px] text-paper" style={{ background: a }}>
              +12.8%
            </span>
          </div>
          <div className="mt-[2%] flex items-end gap-1">
            {[34, 52, 41, 68, 57, 82, 73, 96, 61, 88, 71, 100].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t"
                style={{ height: `${h}%`, background: i > 8 ? b : `${a}cc`, minHeight: 4 }}
              />
            ))}
          </div>
          <svg viewBox="0 0 300 80" className="mt-2 h-[28%] w-full" preserveAspectRatio="none">
            <polyline
              points="0,64 30,52 60,58 90,32 120,42 150,18 180,30 210,10 240,26 270,8 300,16"
              fill="none"
              stroke={a}
              strokeWidth="2"
            />
            <polyline
              points="0,72 30,66 60,70 90,54 120,60 150,44 180,52 210,36 240,48 270,30 300,40"
              fill="none"
              stroke={BRAND.ink}
              strokeOpacity="0.22"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {[
              ["AUM", "€4.2B"],
              ["RET", "98.4%"],
              ["LAT", "42ms"],
              ["SEATS", "12k"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md bg-paper-2 px-2 py-1.5">
                <div className="font-mono text-[7px] tracking-[0.2em] text-ink/40">{k}</div>
                <div className="display text-[13px]">{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.art === "health" && (
        <div className="absolute inset-0 flex items-center justify-center gap-[2%] p-[7%]">
          <div className="relative hidden h-[70%] w-[26%] rounded-[18px] border-4 border-ink bg-paper p-2 md:block">
            <span className="mx-auto block h-1 w-6 rounded-full bg-ink/20" />
            <div className="mt-2 flex flex-col gap-1.5">
              <span className="h-1.5 w-1/2 rounded-full" style={{ background: a }} />
              <span className="h-1 w-3/4 rounded-full bg-ink/15" />
              <div className="mt-1 aspect-square rounded-full border-[6px]" style={{ borderColor: `${b}` }}>
                <div className="flex h-full items-center justify-center font-mono text-[8px]">78%</div>
              </div>
              <span className="h-6 rounded-md" style={{ background: `${a}22` }} />
              <span className="h-6 rounded-md bg-ink/6" />
            </div>
          </div>
          <div className="flex h-[88%] w-[34%] flex-col justify-between rounded-[22px] border-4 border-ink bg-paper p-3 shadow-[0_30px_70px_-30px_rgba(14,15,20,0.5)]">
            <div>
              <span className="font-mono text-[8px] tracking-[0.2em] text-ink/40">TODAY</span>
              <div className="display mt-1 text-[clamp(18px,2.6vw,34px)] leading-[0.9]" style={{ color: a }}>
                Feel
                <br />
                ahead.
              </div>
            </div>
            <svg viewBox="0 0 120 60" className="w-full">
              <path d="M0,40 C20,10 34,52 52,30 C70,8 84,46 120,18" fill="none" stroke={b} strokeWidth="3" />
              <path d="M0,52 C24,32 38,60 58,44 C76,30 92,56 120,40" fill="none" stroke={BRAND.ink} strokeOpacity="0.18" strokeWidth="1.6" />
            </svg>
            <div className="flex items-center gap-1">
              {[a, b, BRAND.lime, BRAND.cobalt].map((c, i) => (
                <span key={`${c}-${i}`} className="h-4 flex-1 rounded" style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="hidden h-[56%] w-[22%] flex-col gap-2 rounded-[16px] bg-ink p-2 md:flex">
            <span className="h-1.5 w-8 rounded-full" style={{ background: b }} />
            {[1, 2, 3].map((i) => (
              <span key={i} className="block h-1.5 rounded-full bg-paper/25" style={{ width: `${86 - i * 14}%` }} />
            ))}
            <span className="mt-auto h-8 rounded-lg" style={{ background: a }} />
          </div>
        </div>
      )}

      {project.art === "music" && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(150deg, ${a}, ${b} 78%)` }}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 400 200" className="h-full w-full" preserveAspectRatio="none">
              {Array.from({ length: 64 }).map((_, i) => {
                // Fixed precision keeps SVG markup identical during Next SSR hydration.
                const h = Number((14 + Math.abs(Math.sin(i * 0.55)) * 74 + (i % 7) * 3).toFixed(3));
                return (
                  <rect
                    key={i}
                    x={i * 6.2 + 4}
                    y={Number((100 - h / 2).toFixed(3))}
                    width="2.6"
                    height={h}
                    rx="1.3"
                    fill={i % 3 === 0 ? BRAND.cobalt : "#ffffff"}
                    opacity={i % 3 === 0 ? 0.65 : 0.8}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="display text-[clamp(30px,6vw,74px)] leading-[0.8] text-paper mix-blend-overlay">
                SONDER
              </span>
              <span className="mt-2 font-mono text-[9px] tracking-[0.34em] text-paper/80">
                SIDE A · NOW PLAYING
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grain absolute inset-0 opacity-[0.13] mix-blend-multiply" />
    </div>
  );
}

export function RotatingBadge({ size = 118 }: { size?: number }) {
  const id = "badge-path";
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className="anim-spin-slow overflow-visible">
      <defs>
        <path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <text fontFamily="'JetBrains Mono', monospace" fontSize="9.4" letterSpacing="3.1" fill={BRAND.ink}>
        <textPath href={`#${id}`}>KROMA · DIGITAL EXPERIENCE STUDIO · EST 2016 · </textPath>
      </text>
      <circle cx="60" cy="60" r="7" fill="none" stroke={BRAND.ember} strokeWidth="1.4" />
      <circle cx="60" cy="60" r="2.2" fill={BRAND.ember} />
    </svg>
  );
}

// `src/pages` is also scanned by Next's legacy Pages Router. This module is
// imported by Home sections through named exports; the empty default keeps it
// non-rendering while satisfying that router's module contract.
export default function ArtworkModule() { return null; }
