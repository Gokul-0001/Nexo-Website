"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  /** The system we built. */
  title: string;
  client: string;
  sector: string;
  summary: string;
  tools: string[];
  results: { value: string; label: string }[];
  accent: string;
  /** Screenshot of the system (e.g. "/work/automation-01.jpg" in /public). Until set, a mock dashboard is shown. */
  image?: string;
  /** Case study link. */
  href: string;
  /** Lines for the mock dashboard's activity log. */
  log: [string, string][];
};

/** PLACEHOLDER projects — swap in real automation work, screenshots, figures and links. */
const PROJECTS: Project[] = [
  {
    id: "retail",
    title: "Order-to-invoice autopilot",
    client: "Fashion retail chain",
    sector: "Retail",
    summary: "Every online order now creates its GST invoice, updates stock and messages the customer, with no one touching a spreadsheet.",
    tools: ["Shopify", "Tally", "WhatsApp"],
    results: [{ value: "32 hrs", label: "Saved every week" }, { value: "9,800", label: "Orders a month" }, { value: "0", label: "Missed invoices" }],
    accent: BRAND.lime,
    href: "#",
    log: [["Invoice #2231 created", "Tally"], ["Order confirmation sent", "WhatsApp"], ["Stock synced · 14 SKUs", "Shopify"], ["Low-stock alert sent", "Owner"]],
  },
  {
    id: "clinic",
    title: "Patient reminder system",
    client: "Multi-specialty clinic",
    sector: "Healthcare",
    summary: "Online bookings hold the doctor's slot, send reminders a day before and follow up after the visit, automatically.",
    tools: ["Website", "Google Calendar", "WhatsApp"],
    results: [{ value: "−38%", label: "No-shows" }, { value: "4,200", label: "Reminders a month" }, { value: "20 hrs", label: "Saved every week" }],
    accent: BRAND.mint,
    href: "#",
    log: [["Slot held · Dr. Rao 4:30 PM", "Calendar"], ["Reminder sent · 24h", "WhatsApp"], ["Patient record updated", "CRM"], ["Follow-up sent", "WhatsApp"]],
  },
  {
    id: "realestate",
    title: "Lead routing engine",
    client: "Real estate developer",
    sector: "Real estate",
    summary: "Ad leads are scored the moment they arrive, get an instant WhatsApp reply with the brochure and land with the right sales rep.",
    tools: ["Meta Ads", "AI scoring", "CRM"],
    results: [{ value: "45 sec", label: "First reply" }, { value: "3×", label: "Site visits" }, { value: "6,500", label: "Leads a month" }],
    accent: BRAND.cobalt,
    href: "#",
    log: [["New lead · 2BHK enquiry", "Meta Ads"], ["Scored hot · 87", "AI"], ["Brochure sent", "WhatsApp"], ["Site visit booked · Sat", "CRM"]],
  },
  {
    id: "d2c",
    title: "Cart recovery bot",
    client: "D2C skincare brand",
    sector: "Ecommerce",
    summary: "Abandoned carts get a friendly WhatsApp nudge with a coupon an hour later, and an email the next day if they still haven't checked out.",
    tools: ["Shopify", "WhatsApp", "Email"],
    results: [{ value: "18%", label: "Carts recovered" }, { value: "₹4.2L", label: "Extra sales a month" }, { value: "0", label: "Manual follow-ups" }],
    accent: BRAND.ember,
    href: "#",
    log: [["Cart abandoned · ₹1,840", "Shopify"], ["Nudge + coupon sent", "WhatsApp"], ["Order recovered", "Shopify"], ["Reminder email queued", "Email"]],
  },
  {
    id: "coaching",
    title: "Admissions CRM",
    client: "Coaching institute",
    sector: "Education",
    summary: "Enquiries from every channel flow into one CRM, get course details instantly and are assigned to a counsellor who books the demo class.",
    tools: ["Google Sheets", "CRM", "WhatsApp"],
    results: [{ value: "2×", label: "Demo bookings" }, { value: "25 hrs", label: "Saved every week" }, { value: "3,100", label: "Enquiries a month" }],
    accent: BRAND.lime,
    href: "#",
    log: [["New enquiry · JEE batch", "Website"], ["Course details sent", "WhatsApp"], ["Assigned to Priya", "CRM"], ["Demo class booked", "Calendar"]],
  },
];

/** PLACEHOLDER figures — confirm before launch. */
const STATS = [
  { value: "60+", label: "Automations live" },
  { value: "25k+", label: "Tasks run every month" },
];

const onAccent = (color: string) => (color === BRAND.lime || color === BRAND.mint ? BRAND.ink : BRAND.paper);

/** Splits a figure like "₹4.2L" or "9,800" into parts so it can count up. */
function parseFigure(raw: string) {
  const match = raw.match(/^(\D*?)([\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return { prefix, suffix, value: parseFloat(digits.replace(/,/g, "")), decimals: digits.includes(".") ? digits.split(".")[1].length : 0, grouped: digits.includes(",") };
}

function formatFigure(raw: string, progress: number) {
  const parsed = parseFigure(raw);
  if (!parsed) return raw;
  const value = parsed.value * progress;
  const text = parsed.grouped ? Math.round(value).toLocaleString("en-IN") : value.toFixed(parsed.decimals);
  return `${parsed.prefix}${text}${parsed.suffix}`;
}

/** Figure inside a screen; the scroll timeline counts it up. */
function Count({ value }: { value: string }) {
  return <span data-count={value}>{value}</span>;
}

/** Figure in the story panel; counts up each time a project comes in. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const state = { p: 0 };
    const tween = gsap.to(state, { p: 1, duration: 1.1, ease: "power2.out", onUpdate: () => { node.textContent = formatFigure(value, state.p); } });
    return () => { tween.kill(); };
  }, [value]);
  return <span ref={ref}>{value}</span>;
}

/** Small live ticker so the dashboard keeps moving while it's on screen. */
function TasksToday({ base, accent }: { base: number; accent: string }) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setCount((value) => value + 1 + Math.floor(Math.random() * 3)), 1400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="flex items-center gap-[1cqw] font-mono text-[1.7cqw] text-white/55 tabular-nums max-sm:text-[2.6cqw]">
      Tasks today <b className="font-semibold" style={{ color: accent }}>{count.toLocaleString("en-IN")}</b>
    </span>
  );
}

/** Stand-in dashboard until a real screenshot is added. Sized with container units so it scales with the screen. */
function MockDashboard({ project, variant }: { project: Project; variant: number }) {
  const [bars] = useState(() => Array.from({ length: 12 }, (_, i) => 30 + Math.round(((Math.sin(i * 0.9 + variant) + 1) / 2) * 55 + i * 1.5)));
  const line = bars.map((h, i) => `${(((i + 0.5) / bars.length) * 100).toFixed(2)},${100 - h}`).join(" ");
  const chartRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<SVGPolylineElement | null>(null);

  // Bars gently rise and fall, and the trend line sits on their tops — both computed here each frame,
  // so they always move together (including while the bars grow in) without forcing the browser to re-measure.
  useEffect(() => {
    const chart = chartRef.current;
    const poly = lineRef.current;
    if (!chart || !poly) return;
    const outers = Array.from(chart.querySelectorAll<HTMLElement>("[data-bar]"));
    const fills = Array.from(chart.querySelectorAll<HTMLElement>("[data-bar-fill]"));
    const screen = chart.closest<HTMLElement>("[data-auto-frame], [data-auto-mframe]");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let xs = outers.map((_, i) => ((i + 0.5) / outers.length) * 100);
    const measure = () => {
      const width = chart.clientWidth;
      if (width) xs = outers.map((bar) => ((bar.offsetLeft + bar.offsetWidth / 2) / width) * 100);
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(chart);
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(chart);
    const tick = (time: number) => {
      if (!visible || (screen && screen.style.opacity === "0")) return;
      const points = fills.map((fill, i) => {
        const breathe = still ? 1 : 1 - 0.09 * (1 - Math.cos(time * 2.4 + i * 0.9));
        fill.style.transform = `scaleY(${breathe.toFixed(4)})`;
        const grow = Number(gsap.getProperty(outers[i], "scaleY")) || 0;
        return `${xs[i].toFixed(2)},${(100 - bars[i] * breathe * grow).toFixed(2)}`;
      });
      poly.setAttribute("points", points.join(" "));
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); resize.disconnect(); observer.disconnect(); };
  }, [bars]);
  return (
    <div className="flex h-full w-full flex-col bg-[#101219] p-[3.2cqw] text-paper max-sm:p-[4cqw]">
      <div className="flex items-center justify-between gap-[2cqw]">
        <span className="flex min-w-0 items-center gap-[1.4cqw]">
          <span className="grid aspect-square w-[4.2cqw] shrink-0 place-items-center rounded-[1.2cqw] font-mono text-[1.8cqw] font-bold" style={{ background: project.accent, color: onAccent(project.accent) }}>N</span>
          <span className="truncate text-[2cqw] font-semibold max-sm:text-[3cqw]">{project.title}</span>
        </span>
        <span className="flex shrink-0 items-center gap-[1cqw] rounded-full bg-white/8 px-[1.6cqw] py-[0.7cqw] font-mono text-[1.4cqw] tracking-[0.14em] uppercase max-sm:text-[2.3cqw]">
          <i className="aspect-square w-[1cqw] animate-pulse rounded-full" style={{ background: project.accent }} />Running
        </span>
      </div>

      <div className="mt-[2.6cqw] grid grid-cols-3 gap-[1.8cqw]">
        {project.results.map((result, i) => (
          <div key={result.label} data-tile className="relative overflow-hidden rounded-[1.8cqw] border border-white/8 bg-white/[0.04] p-[2cqw]">
            <div className="truncate font-mono text-[1.35cqw] tracking-[0.12em] text-white/45 uppercase max-sm:text-[2.2cqw]">{result.label}</div>
            <div className="display mt-[1cqw] text-[4.6cqw] leading-none max-sm:text-[6cqw]" style={{ color: i === 0 ? project.accent : BRAND.paper }}><Count value={result.value} /></div>
            <span aria-hidden className="auto-sheen absolute inset-y-0 left-0 w-1/3" style={{ animationDelay: `${i * 0.8}s` }} />
          </div>
        ))}
      </div>

      <div className="mt-[1.8cqw] flex min-h-0 flex-1 flex-col rounded-[1.8cqw] border border-white/8 bg-white/[0.04] p-[2cqw]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[1.35cqw] tracking-[0.12em] text-white/45 uppercase max-sm:text-[2.2cqw]">Tasks run · last 12 days</span>
          <TasksToday base={1180 + variant * 230} accent={project.accent} />
        </div>
        <div ref={chartRef} className="relative mt-[1.6cqw] flex min-h-0 flex-1 items-end gap-[1cqw]">
          {bars.map((h, i) => (
            <span key={i} data-bar className="flex h-full flex-1 origin-bottom items-end">
              <span data-bar-fill className="block w-full origin-bottom rounded-t-[0.6cqw] will-change-transform" style={{ height: `${h}%`, background: i === bars.length - 1 ? project.accent : "rgba(255,255,255,0.14)" }} />
            </span>
          ))}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <polyline ref={lineRef} points={line} fill="none" stroke={project.accent} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <ul className="mt-[1.8cqw] grid grid-cols-2 gap-[1.2cqw] max-sm:hidden">
        {project.log.map(([text, tool], i) => (
          <li key={text} data-log className="flex items-center gap-[1.2cqw] rounded-[1.4cqw] border border-white/8 bg-white/[0.04] px-[1.6cqw] py-[1.2cqw] text-[1.6cqw]">
            <span className="relative aspect-square w-[1cqw] shrink-0">
              {i === 0 && <i className="absolute inset-0 animate-ping rounded-full" style={{ background: project.accent }} />}
              <i className="relative block h-full w-full rounded-full" style={{ background: i === 0 ? project.accent : "rgba(255,255,255,0.3)" }} />
            </span>
            <span className="min-w-0 flex-1 truncate text-white/80">{text}</span>
            <span className="shrink-0 rounded-full bg-white/8 px-[1cqw] py-[0.3cqw] font-mono text-[1.2cqw] text-white/50">{tool}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Screen({ project, index }: { project: Project; index: number }) {
  return project.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={project.image} alt={`${project.title} for a ${project.client.toLowerCase()}`} className="h-full w-full object-cover object-top" />
  ) : (
    <MockDashboard project={project} variant={index} />
  );
}

/** The written side of a project: who it was for, what we built and what it changed. */
function Story({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="font-mono text-[11px] tracking-[0.16em] text-ink/45 tabular-nums">PROJECT {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: project.accent, color: onAccent(project.accent) }}>{project.sector}</span>
        <span className="text-[12px] text-ink/55">{project.client}</span>
      </div>
      <h3 className="display mt-3 text-[clamp(1.6rem,2.3vw,2.3rem)] leading-[0.98]">{project.title}</h3>
      <p className="mt-3 text-[14px] leading-[1.65] text-ink/65">{project.summary}</p>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {project.results.map((result, i) => (
          <div key={result.label} className="rounded-[14px] border border-ink/10 bg-paper/80 px-3 py-2.5">
            <div className="display text-[clamp(1.3rem,1.8vw,1.75rem)] leading-none" style={{ color: i === 0 ? (project.accent === BRAND.lime ? "#6c8f00" : project.accent) : BRAND.ink }}><CountUp value={result.value} /></div>
            <div className="mt-1 text-[10px] leading-tight tracking-[0.08em] text-ink/50 uppercase">{result.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {project.tools.map((tool) => <span key={tool} className="rounded-full border border-ink/12 bg-paper/70 px-3 py-1 text-[12px] text-ink/70">{tool}</span>)}
        <a href={project.href} className="group ml-1 text-[13px] font-semibold text-ink">View case <span className="inline-block transition-[translate] duration-300 group-hover:translate-x-1">→</span></a>
      </div>
    </div>
  );
}

/** Builds the "screen comes alive" animation for one dashboard onto a timeline. */
function addScreenLife(tl: gsap.core.Timeline, frame: HTMLElement, at: number) {
  const bars = frame.querySelectorAll("[data-bar]");
  const tiles = frame.querySelectorAll("[data-tile]");
  const logs = frame.querySelectorAll("[data-log]");
  const counts = Array.from(frame.querySelectorAll<HTMLElement>("[data-count]"));
  const counter = { p: 0 };
  tl.fromTo(tiles, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.12, stagger: 0.04 }, at)
    .fromTo(counter, { p: 0 }, { p: 1, duration: 0.3, onUpdate: () => counts.forEach((node) => { node.textContent = formatFigure(node.dataset.count ?? "", counter.p); }) }, at + 0.04)
    .fromTo(bars, { scaleY: 0 }, { scaleY: 1, duration: 0.16, stagger: 0.012, ease: "power2.out" }, at + 0.06)
    .fromTo(logs, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.1, stagger: 0.04 }, at + 0.12);
}

/** Service showcase 05: automation projects — story on the left, a live dashboard zooming in on the right. */
export default function WorkAutomation() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [stacked, setStacked] = useState(false);
  const activeRef = useRef(0);
  const pinRef = useRef<ScrollTrigger | null>(null);
  const n = PROJECTS.length;
  const project = PROJECTS[active];

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStacked(true); return; }
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo("[data-auto-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: element, start: "top 85%", end: "top 25%", scrub: 0.65 } });
        const frames = gsap.utils.toArray<HTMLElement>("[data-auto-frame]", element);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-auto-stage]",
            start: "top top",
            end: () => `+=${window.innerHeight * 0.9 * n}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            // Snap to the nearest project; leave the scroll alone while just entering so the page never jerks forward.
            snap: { snapTo: (value: number) => (value < 0.3 / n ? value : (Math.min(n - 1, Math.max(0, Math.round(value * n - 0.62))) + 0.62) / n), directional: false, inertia: false, duration: { min: 0.25, max: 0.7 }, delay: 0.1, ease: "power2.inOut" },
            onUpdate: (self) => {
              const next = Math.min(n - 1, Math.floor(self.progress * n + 0.08));
              if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
            },
          },
        });
        pinRef.current = tl.scrollTrigger ?? null;

        // Screens move only with transform + opacity (GPU friendly) and always overlap, so there is never an empty gap.
        gsap.set(frames, { transformPerspective: 1400, transformOrigin: "50% 100%", force3D: true });
        frames.forEach((frame, i) => {
          if (i === 0) {
            // The first screen rises into place while the section scrolls up to the pin, so it's ready when the pin starts.
            const intro = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-auto-stage]", start: "top 85%", end: "top top", scrub: 1 } });
            // Animate the screen's holder here, so this never fights the pinned timeline that later moves the screen itself.
            const holder = frame.parentElement as HTMLElement;
            intro.fromTo(holder, { opacity: 0, yPercent: 14, scale: 0.86, rotationX: 16, transformPerspective: 1400, transformOrigin: "50% 100%" }, { opacity: 1, yPercent: 0, scale: 1, rotationX: 0, duration: 0.7, ease: "power2.out" }, 0);
            addScreenLife(intro, frame, 0.35);
          } else {
            // Each next screen tilts up from below and settles flat…
            gsap.set(frame, { opacity: 0, yPercent: 22, scale: 0.86, rotationX: 16 });
            const start = i - 0.2;
            tl.to(frame, { opacity: 1, duration: 0.18 }, start)
              .to(frame, { yPercent: 0, scale: 1, rotationX: 0, duration: 0.45, ease: "power2.out" }, start);
            addScreenLife(tl, frame, start + 0.22);
          }
          // …while the current one tips back and fades behind it.
          if (i < n - 1) {
            tl.to(frame, { yPercent: -10, scale: 0.9, rotationX: -10, duration: 0.4, ease: "power1.in" }, i + 0.72)
              .to(frame, { opacity: 0, duration: 0.22 }, i + 0.86);
          }
        });
        tl.to({}, { duration: 0.1 }, n - 0.1);
        return () => { pinRef.current = null; };
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo("[data-auto-mhead] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: "[data-auto-mhead]", start: "top 90%", end: "top 50%", scrub: 0.65 } });
        gsap.utils.toArray<HTMLElement>("[data-auto-card]", element).forEach((card) => {
          const frame = card.querySelector<HTMLElement>("[data-auto-mframe]");
          if (!frame) return;
          const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: card, start: "top 92%", end: "top 30%", scrub: 0.65 } });
          tl.fromTo(frame, { scale: 0.7, opacity: 0, borderRadius: 40 }, { scale: 1, opacity: 1, borderRadius: 20, duration: 0.45 }, 0);
          addScreenLife(tl, frame, 0.2);
          tl.fromTo(card.querySelector("[data-auto-mstory]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 0.35);
        });
      });
    }, element);
    return () => { pinRef.current = null; ctx.revert(); };
  }, [n]);

  const pick = (index: number) => {
    const st = pinRef.current;
    // Jump straight to the project; the scrub eases the screens there.
    if (st) window.scrollTo({ top: st.start + ((st.end - st.start) * (index + 0.62)) / n, behavior: "instant" });
  };

  const heading = (
    <>
      <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime }} />05 — Automation</span>
      <h2 className="display mt-4 text-h2 leading-[0.9] lg:text-[clamp(2.2rem,3.4vw,3.6rem)]">
        WORK THAT<br />
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.cobalt}, #12b89c)` }}>RUNS ITSELF.</span>
      </h2>
      <p className="mt-4 max-w-[46ch] text-[14px] leading-[1.65] text-ink/60">
        Systems we&apos;ve built that connect Shopify, Tally, WhatsApp, Google Sheets and CRMs, so orders, leads and follow-ups run on their own.
      </p>
      {/* Hidden on short laptop screens so the pinned layout always fits. */}
      <div className="mt-4 flex gap-8 lg:[@media(max-height:860px)]:hidden">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="display text-[clamp(1.5rem,2.2vw,2.1rem)] leading-none" style={{ color: BRAND.cobalt }}>{stat.value}</div>
            <div className="mt-1 text-mono-9 tracking-[0.16em] text-ink/45 uppercase">{stat.label}</div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <section ref={root} id="automation" className="relative z-10 overflow-x-clip">
      {/* Laptop: pinned story + zooming screen */}
      {!stacked && (
        <div data-auto-stage className="relative hidden h-[100svh] pb-[4vh] pt-[96px] lg:block">
          <div className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-12 px-8">
            <div className="flex min-h-0 flex-col justify-center">
              <div data-auto-head>{heading}</div>
              <div className="mt-6 border-t border-ink/12 pt-6">
                <div key={project.id} className="auto-swap"><Story project={project} index={active} total={n} /></div>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {PROJECTS.map((item, index) => {
                  const on = index === active;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => pick(index)}
                      aria-label={item.title}
                      aria-pressed={on}
                      className="relative h-8 overflow-hidden rounded-full border px-3.5 text-[12px] font-semibold transition-[background-color,border-color,color] duration-500"
                      style={{ background: on ? BRAND.ink : "rgba(255,255,255,0.7)", borderColor: on ? BRAND.ink : "rgba(14,15,20,0.12)", color: on ? BRAND.paper : "rgba(14,15,20,0.6)" }}
                    >
                      {item.sector}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="relative min-h-0 [container-type:size]">
              {PROJECTS.map((item, index) => (
                <div key={item.id} className="absolute inset-0 flex items-center justify-center">
                  <a
                    href={item.href}
                    data-auto-frame
                    aria-label={`${item.title} case study`}
                    className="relative block aspect-[4/3] w-[min(100cqw,calc(100cqh*1.333))] overflow-hidden rounded-[24px] bg-ink shadow-[0_50px_100px_-40px_rgba(14,15,20,0.75)] [container-type:inline-size] will-change-transform"
                  >
                    <Screen project={item} index={index} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Phones/tablets (and reduced motion): one card per project */}
      <div className={`mx-auto w-full max-w-[1440px] px-5 py-[12vh] sm:px-8 ${stacked ? "" : "lg:hidden"}`}>
        <div data-auto-mhead>{heading}</div>
        <div className="mt-10 grid gap-14 md:grid-cols-2 md:gap-x-8">
          {PROJECTS.map((item, index) => (
            <article key={item.id} data-auto-card>
              <a href={item.href} data-auto-mframe aria-label={`${item.title} case study`} className="block aspect-[4/3] overflow-hidden rounded-[20px] bg-ink shadow-[0_30px_60px_-30px_rgba(14,15,20,0.7)] [container-type:inline-size]">
                <Screen project={item} index={index} />
              </a>
              <div data-auto-mstory className="mt-5"><Story project={item} index={index} total={n} /></div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes auto-swap { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .auto-swap { animation: auto-swap 0.6s cubic-bezier(0.16,1,0.3,1); }
        @keyframes auto-sheen { 0% { transform: translateX(-120%) skewX(-18deg); } 60%, 100% { transform: translateX(420%) skewX(-18deg); } }
        .auto-sheen { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); animation: auto-sheen 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .auto-swap, .auto-sheen { animation: none; } }
      `}</style>
    </section>
  );
}
