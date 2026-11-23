"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type Platform = "instagram" | "facebook" | "linkedin" | "youtube" | "google" | "whatsapp";
type Format = "post" | "reel" | "ad" | "search";

type Creative = {
  platform: Platform;
  format: Format;
  metric: string;
  /** Real creative image (e.g. "/work/ad-01.jpg" in /public). Until set, an illustrated creative is shown. */
  image?: string;
};

type Result = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string };

type Campaign = {
  id: string;
  title: string;
  client: string;
  industry: string;
  accent: string;
  duration: string;
  budget: string;
  channels: Platform[];
  objective: string;
  audience: string;
  strategy: { step: string; detail: string }[];
  results: Result[];
  /** Weekly results for the mini chart (any scale). */
  weekly: number[];
  weeklyLabel: string;
  creatives: Creative[];
  href: string;
};

type Sector = { id: string; label: string; accent: string; clients: Campaign[] };

/** Builds four creatives for a placeholder campaign from compact [platform, format, metric] rows. */
const ads = (rows: [Platform, Format, string][]): Creative[] => rows.map(([platform, format, metric]) => ({ platform, format, metric }));

/**
 * PLACEHOLDER sectors and clients — swap in real clients, numbers and creatives.
 * Every figure here is illustrative until confirmed. Add or remove clients per sector freely.
 */
const SECTORS: Sector[] = [
  {
    id: "realestate", label: "Construction & Real estate", accent: BRAND.cobalt,
    clients: [
      {
        id: "re-sitevisits", title: "Site-visit drive", client: "Real estate developer", industry: "Real estate", accent: BRAND.cobalt,
        duration: "8 weeks", budget: "₹6L", channels: ["facebook", "instagram", "google", "whatsapp"],
        objective: "Fill weekend site visits for a new residential launch with serious home buyers.",
        audience: "Families and NRIs aged 30–55 looking for 2–3 BHK homes in the city.",
        strategy: [
          { step: "Research", detail: "Buyer personas, competitor launches and price-band analysis." },
          { step: "Creative", detail: "Walkthrough reels, floor-plan carousels and offer ads." },
          { step: "Capture", detail: "Lead forms with site-visit slot booking and instant WhatsApp." },
          { step: "Qualify", detail: "Call-back scripts and CRM tagging by budget and timeline." },
        ],
        results: [{ value: 1240, label: "Enquiries" }, { value: 310, label: "Site visits" }, { value: 42, label: "Bookings" }, { value: 410, prefix: "₹", label: "Cost per lead" }],
        weekly: [60, 95, 120, 150, 170, 210, 205, 230], weeklyLabel: "Enquiries per week",
        creatives: ads([["instagram", "reel", "▶ 4.2L views"], ["facebook", "ad", "₹410 / lead"], ["google", "search", "CTR 7.1%"], ["instagram", "post", "♥ 9.8K"]]),
        href: "#",
      },
      {
        id: "construction", title: "Contractor brand build", client: "Construction company", industry: "Construction", accent: BRAND.cobalt,
        duration: "3 months", budget: "₹2.5L", channels: ["linkedin", "google", "youtube"],
        objective: "Win more commercial projects by building trust with architects and business owners.",
        audience: "Architects, facility heads and business owners planning new builds.",
        strategy: [
          { step: "Positioning", detail: "Project-proof messaging around timelines, safety and quality." },
          { step: "Content", detail: "Site progress videos and completed-project case posts." },
          { step: "Search", detail: "High-intent \"commercial contractor\" keywords with call ads." },
          { step: "Nurture", detail: "Retargeting and LinkedIn follow-ups until a site meeting." },
        ],
        results: [{ value: 96, label: "Project enquiries" }, { value: 14, label: "Tenders won" }, { value: 3.1, decimals: 1, suffix: "×", label: "Website traffic" }, { value: 22, prefix: "+", suffix: "K", label: "Video views" }],
        weekly: [4, 6, 9, 11, 14, 17], weeklyLabel: "Enquiries per fortnight",
        creatives: ads([["youtube", "reel", "▶ 22K views"], ["linkedin", "post", "👍 1.6K"], ["google", "search", "96 enquiries"], ["linkedin", "ad", "CTR 1.9%"]]),
        href: "#",
      },
    ],
  },
  {
    id: "ecommerce", label: "Ecommerce", accent: BRAND.ember,
    clients: [
      {
        id: "festive", title: "Festive sale launch", client: "D2C fashion brand", industry: "Fashion", accent: BRAND.ember,
        duration: "4 weeks", budget: "₹5L", channels: ["instagram", "facebook", "youtube"],
        objective: "Turn the festive collection launch into the brand's biggest sales month.",
        audience: "Women 22–40 in metro cities who follow ethnic fashion.",
        strategy: [
          { step: "Tease", detail: "Countdown reels and creator previews a week before launch." },
          { step: "Launch", detail: "Catalogue ads synced live with the store's inventory." },
          { step: "Retarget", detail: "Cart and viewer audiences with limited-time offers." },
          { step: "Scale", detail: "Budget moved daily to the best ROAS creatives." },
        ],
        results: [{ value: 3.2, decimals: 1, suffix: "×", label: "Return on ad spend" }, { value: 18.4, decimals: 1, prefix: "₹", suffix: "L", label: "Revenue" }, { value: 2.1, decimals: 1, suffix: "L", label: "People reached" }, { value: 41, prefix: "+", suffix: "%", label: "Repeat buyers" }],
        weekly: [30, 54, 88, 120], weeklyLabel: "Revenue per week",
        creatives: ads([["instagram", "reel", "▶ 5.6L views"], ["instagram", "post", "♥ 21K"], ["facebook", "ad", "3.2× ROAS"], ["youtube", "ad", "▶ 90K views"]]),
        href: "#",
      },
      {
        id: "beauty", title: "Skincare product launch", client: "Beauty brand", industry: "Beauty", accent: BRAND.ember,
        duration: "6 weeks", budget: "₹3.5L", channels: ["instagram", "youtube", "google"],
        objective: "Launch a new serum range and make it the brand's best-selling product line.",
        audience: "Skincare-curious women 20–35 who follow beauty creators.",
        strategy: [
          { step: "Creators", detail: "20 micro-creator reviews and before-after reels." },
          { step: "Launch", detail: "Spark ads boosting the best-performing creator videos." },
          { step: "Search", detail: "Shopping ads capturing \"vitamin C serum\" searches." },
          { step: "Bundle", detail: "Retargeting with launch bundles to lift order value." },
        ],
        results: [{ value: 2.8, decimals: 1, suffix: "×", label: "Return on ad spend" }, { value: 6200, label: "Orders" }, { value: 1.2, decimals: 1, suffix: "M", label: "Reel views" }, { value: 34, prefix: "+", suffix: "%", label: "Order value" }],
        weekly: [400, 760, 900, 1150, 1380, 1610], weeklyLabel: "Orders per week",
        creatives: ads([["instagram", "reel", "▶ 1.2M views"], ["youtube", "post", "▶ 80K views"], ["google", "search", "ROAS 3.4×"], ["instagram", "ad", "₹96 / order"]]),
        href: "#",
      },
    ],
  },
  {
    id: "healthcare", label: "Healthcare", accent: BRAND.mint,
    clients: [
      {
        id: "clinic", title: "Local clinic growth", client: "Multi-specialty clinic", industry: "Clinic", accent: BRAND.mint,
        duration: "3 months", budget: "₹1.8L", channels: ["google", "instagram", "whatsapp"],
        objective: "Become the first clinic people find and book when they search nearby.",
        audience: "People searching for specialists within 10 km.",
        strategy: [
          { step: "Local SEO", detail: "Google Business profile, reviews and location pages rebuilt." },
          { step: "Search ads", detail: "High-intent keywords with call and booking extensions." },
          { step: "Trust", detail: "Doctor-led reels answering real patient questions." },
          { step: "Booking", detail: "WhatsApp booking with automatic reminders." },
        ],
        results: [{ value: 312, label: "Appointments booked" }, { value: 6.4, decimals: 1, suffix: "%", label: "Search ad CTR" }, { value: 220, prefix: "₹", label: "Cost per booking" }, { value: 3, prefix: "Top ", label: "Map ranking" }],
        weekly: [18, 26, 31, 44, 52, 61, 70], weeklyLabel: "Bookings per fortnight",
        creatives: ads([["google", "search", "312 bookings"], ["instagram", "reel", "▶ 1.2L views"], ["instagram", "post", "♥ 12.4K"], ["whatsapp", "post", "92% replied"]]),
        href: "#",
      },
      {
        id: "lab", title: "Home test bookings", client: "Diagnostics lab", industry: "Diagnostics", accent: BRAND.mint,
        duration: "10 weeks", budget: "₹2.2L", channels: ["google", "facebook", "whatsapp"],
        objective: "Grow home sample-collection bookings across the city.",
        audience: "Health-conscious adults 28–60 and caregivers booking for parents.",
        strategy: [
          { step: "Offers", detail: "Seasonal health-package offers with clear pricing." },
          { step: "Search", detail: "Test-name keywords with same-day collection messaging." },
          { step: "Reminders", detail: "WhatsApp report delivery and repeat-test reminders." },
          { step: "Referral", detail: "Family package referrals for existing customers." },
        ],
        results: [{ value: 1860, label: "Home bookings" }, { value: 148, prefix: "₹", label: "Cost per booking" }, { value: 37, suffix: "%", label: "Repeat customers" }, { value: 4.8, decimals: 1, suffix: "★", label: "Google rating" }],
        weekly: [90, 120, 150, 170, 200, 230], weeklyLabel: "Bookings per week",
        creatives: ads([["google", "search", "CTR 8.2%"], ["facebook", "ad", "₹148 / booking"], ["whatsapp", "post", "37% repeat"], ["facebook", "post", "♥ 4.1K"]]),
        href: "#",
      },
    ],
  },
  {
    id: "education", label: "Education", accent: BRAND.lime,
    clients: [
      {
        id: "admissions", title: "Admissions drive", client: "International school", industry: "School", accent: BRAND.lime,
        duration: "6 weeks", budget: "₹3L", channels: ["facebook", "instagram", "google", "whatsapp"],
        objective: "Fill the new academic year with qualified admission enquiries from nearby parents.",
        audience: "Parents aged 30–45 within 15 km of the campus.",
        strategy: [
          { step: "Research", detail: "Parent interviews and competitor ads to find what drives the decision." },
          { step: "Creative", detail: "Two concepts tested: \"Admissions open\" vs \"Free campus tour\"." },
          { step: "Capture", detail: "Instant lead forms with WhatsApp follow-up inside 5 minutes." },
          { step: "Optimise", detail: "Weekly budget shifts to the best ad sets and areas." },
        ],
        results: [{ value: 486, label: "Qualified leads" }, { value: 180, prefix: "₹", label: "Cost per lead" }, { value: 38, label: "Admissions" }, { value: 64, prefix: "+", suffix: "%", label: "Vs target" }],
        weekly: [40, 62, 58, 90, 110, 126], weeklyLabel: "Leads per week",
        creatives: ads([["instagram", "ad", "₹12 / lead"], ["facebook", "post", "♥ 8.9K"], ["google", "search", "CTR 6.4%"], ["instagram", "reel", "▶ 2.1L views"]]),
        href: "#",
      },
      {
        id: "coaching", title: "Course enrolment push", client: "Coaching institute", industry: "Coaching", accent: BRAND.lime,
        duration: "5 weeks", budget: "₹2L", channels: ["youtube", "instagram", "google"],
        objective: "Fill the new batch for competitive-exam coaching before the deadline.",
        audience: "Students 16–22 and their parents searching for exam prep.",
        strategy: [
          { step: "Free class", detail: "Free demo-class webinars as the main hook." },
          { step: "Video", detail: "Topper stories and faculty shorts on YouTube and reels." },
          { step: "Search", detail: "Exam-name keywords with batch-start urgency." },
          { step: "Follow-up", detail: "Counsellor calls and WhatsApp reminders after the demo." },
        ],
        results: [{ value: 2400, label: "Demo sign-ups" }, { value: 420, label: "Enrolments" }, { value: 95, prefix: "₹", label: "Cost per sign-up" }, { value: 17.5, decimals: 1, suffix: "%", label: "Demo → enrolment" }],
        weekly: [300, 420, 510, 560, 610], weeklyLabel: "Sign-ups per week",
        creatives: ads([["youtube", "reel", "▶ 3.1L views"], ["instagram", "reel", "▶ 1.8L views"], ["google", "search", "2.4K sign-ups"], ["instagram", "post", "♥ 6.2K"]]),
        href: "#",
      },
    ],
  },
  {
    id: "other", label: "Other sectors", accent: BRAND.ink,
    clients: [
      {
        id: "b2b", title: "B2B demo engine", client: "SaaS company", industry: "SaaS", accent: BRAND.cobalt,
        duration: "8 weeks", budget: "₹4L", channels: ["linkedin", "google", "youtube"],
        objective: "Book qualified product demos with operations heads at mid-size companies.",
        audience: "Ops and finance leaders at 50–500 person companies.",
        strategy: [
          { step: "Positioning", detail: "Sharper messaging around time and cost saved." },
          { step: "Content", detail: "Founder posts and short explainer videos on LinkedIn." },
          { step: "Ads", detail: "Lead-gen forms targeted by job title and company size." },
          { step: "Nurture", detail: "Email and retargeting until the demo is booked." },
        ],
        results: [{ value: 212, label: "Demos booked" }, { value: 18, suffix: "%", label: "Demo → customer" }, { value: 18, prefix: "+", suffix: "K", label: "New followers" }, { value: 2.4, decimals: 1, suffix: "×", label: "Pipeline growth" }],
        weekly: [8, 14, 19, 22, 28, 31, 36, 41], weeklyLabel: "Demos per week",
        creatives: ads([["linkedin", "post", "👍 3.4K"], ["linkedin", "ad", "212 demos"], ["youtube", "post", "+18K subs"], ["google", "search", "CTR 5.1%"]]),
        href: "#",
      },
      {
        id: "restaurant", title: "Weekend footfall boost", client: "Restaurant chain", industry: "Hospitality", accent: BRAND.ember,
        duration: "6 weeks", budget: "₹1.5L", channels: ["instagram", "google", "whatsapp"],
        objective: "Fill weekend tables and grow direct online orders across three outlets.",
        audience: "Foodies 20–40 within 8 km of each outlet.",
        strategy: [
          { step: "Food reels", detail: "Chef specials and behind-the-kitchen reels." },
          { step: "Local", detail: "Google Business posts, offers and review replies." },
          { step: "Booking", detail: "Table booking and WhatsApp ordering links everywhere." },
          { step: "Loyalty", detail: "Repeat-visit offers sent after every order." },
        ],
        results: [{ value: 38, prefix: "+", suffix: "%", label: "Weekend footfall" }, { value: 2900, label: "Direct orders" }, { value: 5.2, decimals: 1, suffix: "L", label: "Reel views" }, { value: 4.6, decimals: 1, suffix: "★", label: "Google rating" }],
        weekly: [320, 410, 460, 520, 590, 640], weeklyLabel: "Orders per week",
        creatives: ads([["instagram", "reel", "▶ 5.2L views"], ["instagram", "post", "♥ 14K"], ["google", "search", "+38% visits"], ["whatsapp", "post", "2.9K orders"]]),
        href: "#",
      },
      {
        id: "fitness", title: "New studio launch", client: "Fitness studio", industry: "Fitness", accent: BRAND.mint,
        duration: "4 weeks", budget: "₹1.2L", channels: ["instagram", "facebook", "whatsapp"],
        objective: "Open a new studio with a full founding-member batch.",
        audience: "Working professionals 22–40 living within 5 km.",
        strategy: [
          { step: "Founding offer", detail: "Limited founding-member pricing with a countdown." },
          { step: "Trainers", detail: "Trainer intro reels and member transformation stories." },
          { step: "Trial", detail: "Free trial-class booking through lead forms." },
          { step: "Convert", detail: "WhatsApp follow-ups after every trial class." },
        ],
        results: [{ value: 640, label: "Trial bookings" }, { value: 210, label: "Founding members" }, { value: 190, prefix: "₹", label: "Cost per trial" }, { value: 33, suffix: "%", label: "Trial → member" }],
        weekly: [110, 150, 180, 200], weeklyLabel: "Trials per week",
        creatives: ads([["instagram", "reel", "▶ 1.4L views"], ["facebook", "ad", "₹190 / trial"], ["instagram", "post", "♥ 5.7K"], ["whatsapp", "post", "33% joined"]]),
        href: "#",
      },
    ],
  },
];

/** Every campaign across all sectors (the feed wall draws from these). */
const CAMPAIGNS: Campaign[] = SECTORS.flatMap((sector) => sector.clients);

/** PLACEHOLDER figures — confirm before launch. */
const STATS = [
  { value: "200+", label: "Campaigns run" },
  { value: "5Cr+", label: "People reached" },
];

const PLATFORMS: Record<Platform, { label: string; bg: string; glyph: string }> = {
  instagram: { label: "Instagram", bg: `linear-gradient(135deg, ${BRAND.ember}, #c13584 55%, ${BRAND.cobalt})`, glyph: "IG" },
  facebook: { label: "Facebook", bg: "#1877F2", glyph: "f" },
  linkedin: { label: "LinkedIn", bg: "#0A66C2", glyph: "in" },
  youtube: { label: "YouTube", bg: "#FF0033", glyph: "▶" },
  google: { label: "Google Ads", bg: BRAND.ink, glyph: "G" },
  whatsapp: { label: "WhatsApp", bg: "#25D366", glyph: "W" },
};

const RATIO: Record<Format, string> = { post: "aspect-square", reel: "aspect-[9/14]", ad: "aspect-[4/5]", search: "aspect-[4/3]" };
const onAccentOf = (accent: string) => (accent === BRAND.lime || accent === BRAND.mint ? BRAND.ink : BRAND.paper);

function PlatformBadge({ platform, size = "h-6 w-6 text-[9px]" }: { platform: Platform; size?: string }) {
  const p = PLATFORMS[platform];
  return <span title={p.label} className={`grid shrink-0 place-items-center rounded-full font-bold text-paper ${size}`} style={{ background: p.bg }}>{p.glyph}</span>;
}

function CreativeArt({ item, accent }: { item: Creative; accent: string }) {
  if (item.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.image} alt={`${PLATFORMS[item.platform].label} creative`} className="h-full w-full object-cover" />;
  }
  const dark = onAccentOf(accent);
  if (item.format === "search") {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-2 bg-paper p-[9%]">
        <span className="flex items-center gap-1.5 text-[9px] text-ink/50"><span className="rounded bg-ink/80 px-1 text-[8px] font-bold text-paper">Ad</span>client-site.com</span>
        <span className="h-2.5 w-[85%] rounded-full" style={{ background: "#1a0dab" }} />
        <span className="h-1.5 w-full rounded-full bg-ink/15" />
        <span className="h-1.5 w-[70%] rounded-full bg-ink/15" />
        <span className="mt-1 flex gap-1.5">{["Book now", "Prices", "Reviews"].map((chip) => <span key={chip} className="rounded-full border border-ink/12 px-2 py-0.5 text-[8px] text-ink/60">{chip}</span>)}</span>
      </div>
    );
  }
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `linear-gradient(150deg, ${accent}, ${accent}88)` }}>
      <span className="absolute -right-[20%] -top-[15%] h-[60%] w-[60%] rounded-full bg-paper/20" />
      <span className="absolute bottom-[22%] left-[8%] right-[8%] space-y-1.5">
        <span className="block h-3 w-[80%] rounded-md" style={{ background: dark, opacity: 0.9 }} />
        <span className="block h-3 w-[55%] rounded-md" style={{ background: dark, opacity: 0.9 }} />
      </span>
      <span className="absolute bottom-[8%] left-[8%] h-5 w-[38%] rounded-full bg-paper" />
      {item.format === "reel" && (
        <span className="absolute left-1/2 top-[38%] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper/85">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill={BRAND.ink}><path d="M7 5l12 7-12 7Z" /></svg>
        </span>
      )}
    </div>
  );
}

function FeedTile({ item, campaign, onOpen }: { item: Creative; campaign: Campaign; onOpen: () => void }) {
  const platform = PLATFORMS[item.platform];
  return (
    <button type="button" onClick={onOpen} data-cursor="view" aria-label={`Open the ${campaign.title} campaign`} className="group relative block w-full overflow-hidden rounded-[20px] border border-ink/10 bg-paper text-left shadow-[0_26px_50px_-34px_rgba(14,15,20,0.6)] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-30px_rgba(14,15,20,0.65)]">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <PlatformBadge platform={item.platform} />
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[11px] font-semibold text-ink">{campaign.industry}</span>
          <span className="block text-[9px] text-ink/45">{platform.label} · {item.format === "reel" ? "Reel" : item.format === "search" ? "Search ad" : item.format === "ad" ? "Sponsored" : "Post"}</span>
        </span>
      </div>
      <div className={`relative ${RATIO[item.format]} overflow-hidden`}>
        <div className="h-full w-full transition-[scale] duration-700 group-hover:scale-[1.04]"><CreativeArt item={item} accent={campaign.accent} /></div>
        <span className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35">
          <span className="translate-y-2 rounded-full bg-paper px-3 py-1.5 text-[10px] font-semibold text-ink opacity-0 transition-[opacity,translate] duration-500 group-hover:translate-y-0 group-hover:opacity-100">View campaign →</span>
        </span>
      </div>
      <div className="flex items-center justify-between px-3 py-2.5">
        <span className="truncate text-[10px] text-ink/45">{campaign.title}</span>
        <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-ink" style={{ background: `${campaign.accent}2e` }}>{item.metric}</span>
      </div>
    </button>
  );
}

/** Full campaign breakdown: creatives, brief, strategy, results and trend. Used inline and in the popup. */
function CampaignDetail({ campaign, inline = false }: { campaign: Campaign; inline?: boolean }) {
  const root = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(0);
  const onAccent = onAccentOf(campaign.accent);
  const max = Math.max(...campaign.weekly);

  // The breakdown builds itself: chips, title, brief, steps, counting results and the growing chart.
  // Inline it is scrubbed by the scroll (and replays every pass); after a campaign switch, or in the popup, it plays once straight away.
  useEffect(() => {
    setShown(0);
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      tl.fromTo("[data-cd-in]", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.07 }, 0)
        .fromTo("[data-cd-step]", { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.06 }, 0.2)
        .fromTo("[data-cd-tile]", { opacity: 0, y: 18, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.06 }, 0.35);
      element.querySelectorAll<HTMLElement>("[data-cd-value]").forEach((node, index) => {
        const result = campaign.results[index];
        const counter = { v: 0 };
        tl.fromTo(counter, { v: 0 }, { v: result.value, duration: 0.5, onUpdate: () => { node.textContent = counter.v.toFixed(result.decimals ?? 0); } }, 0.4 + index * 0.05);
      });
      tl.fromTo("[data-cd-bar]", { scaleY: 0 }, { scaleY: 1, duration: 0.35, stagger: 0.04, ease: "power2.out" }, 0.5);

      const attachScrub = () => {
        ScrollTrigger.create({ trigger: element, start: "top 90%", end: "top 35%", scrub: 0.65, animation: tl });
      };
      const box = element.getBoundingClientRect();
      const alreadyInView = box.top < window.innerHeight * 0.9 && box.bottom > 0;
      if (inline && !alreadyInView) {
        attachScrub();
      } else {
        // Switched while on screen (or opened in the popup): play it through now, then hand it to the scroll.
        gsap.to(tl, { progress: 1, duration: 1.5, ease: "power2.out", onComplete: () => { if (inline) attachScrub(); } });
      }
    }, element);
    return () => ctx.revert();
  }, [campaign, inline]);

  const creative = campaign.creatives[shown];

  return (
    <div ref={root} className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
      {/* Creatives */}
      <div>
        <div className="mx-auto max-w-[360px] overflow-hidden rounded-[22px] border border-ink/10 bg-paper shadow-[0_34px_70px_-44px_rgba(14,15,20,0.7)]">
          <div className="flex items-center gap-2 px-3.5 py-3">
            <PlatformBadge platform={creative.platform} size="h-7 w-7 text-[10px]" />
            <span className="leading-tight"><span className="block text-[12px] font-semibold text-ink">{campaign.industry} brand</span><span className="block text-[10px] text-ink/45">{PLATFORMS[creative.platform].label} · Sponsored</span></span>
          </div>
          <div key={`${campaign.id}-${shown}`} className={`mk-swap relative ${RATIO[creative.format]} overflow-hidden`}><CreativeArt item={creative} accent={campaign.accent} /></div>
          <div className="flex items-center justify-between px-3.5 py-3">
            <span className="text-[11px] text-ink/50">Creative {shown + 1} of {campaign.creatives.length}</span>
            <span className="rounded-full px-2.5 py-1 text-[11px] font-bold text-ink" style={{ background: `${campaign.accent}2e` }}>{creative.metric}</span>
          </div>
        </div>
        <div className="mx-auto mt-4 flex max-w-[360px] gap-2">
          {campaign.creatives.map((item, index) => (
            <button key={index} type="button" onClick={() => setShown(index)} aria-label={`Show creative ${index + 1}`} className="relative aspect-square flex-1 overflow-hidden rounded-[12px] border-2 transition-[border-color,translate] duration-300 hover:-translate-y-0.5" style={{ borderColor: index === shown ? campaign.accent : "transparent" }}>
              <CreativeArt item={item} accent={campaign.accent} />
              <span className="absolute left-1 top-1"><PlatformBadge platform={item.platform} size="h-4 w-4 text-[6px]" /></span>
            </button>
          ))}
        </div>
      </div>

      {/* Brief, strategy, results */}
      <div className="min-w-0">
        <div data-cd-in className="flex flex-wrap items-center gap-2">
          <span className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: campaign.accent, color: onAccent }}>{campaign.industry}</span>
          {[["Duration", campaign.duration], ["Budget", campaign.budget]].map(([k, v]) => (
            <span key={k} className="rounded-full border border-ink/12 px-3 py-1 text-[11px] text-ink/70"><span className="text-ink/40">{k}</span> · {v}</span>
          ))}
          <span className="flex items-center gap-1 rounded-full border border-ink/12 px-2 py-1">{campaign.channels.map((c) => <PlatformBadge key={c} platform={c} size="h-5 w-5 text-[7px]" />)}</span>
        </div>
        <h3 data-cd-in className="display mt-4 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[0.95]">{campaign.title}</h3>
        <span data-cd-in className="mt-1.5 block text-[12.5px] text-ink/50">{campaign.client}</span>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div data-cd-in className="rounded-[16px] border border-ink/8 bg-ink/[0.025] p-4">
            <span className="text-mono-9 tracking-[0.16em] text-ink/40 uppercase">Objective</span>
            <p className="mt-1.5 text-[13px] leading-[1.55] text-ink/75">{campaign.objective}</p>
          </div>
          <div data-cd-in className="rounded-[16px] border border-ink/8 bg-ink/[0.025] p-4">
            <span className="text-mono-9 tracking-[0.16em] text-ink/40 uppercase">Audience</span>
            <p className="mt-1.5 text-[13px] leading-[1.55] text-ink/75">{campaign.audience}</p>
          </div>
        </div>

        <div className="mt-5">
          <span className="text-mono-9 tracking-[0.16em] text-ink/40 uppercase">How we ran it</span>
          <ol className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {campaign.strategy.map((s, index) => (
              <li key={s.step} data-cd-step className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ background: `${campaign.accent}2e`, color: BRAND.ink }}>{index + 1}</span>
                <span><span className="block text-[13px] font-semibold text-ink">{s.step}</span><span className="block text-[12px] leading-[1.5] text-ink/60">{s.detail}</span></span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {campaign.results.map((r) => (
            <div key={r.label} data-cd-tile className="relative overflow-hidden rounded-[16px] p-3.5" style={{ background: `${campaign.accent}1c` }}>
              <div className="display flex items-baseline text-[clamp(1.4rem,2.2vw,2rem)] leading-none tabular-nums text-ink">
                {r.prefix && <span className="text-[0.7em]">{r.prefix}</span>}
                <span data-cd-value>{r.value.toFixed(r.decimals ?? 0)}</span>
                {r.suffix && <span className="text-[0.7em]">{r.suffix}</span>}
              </div>
              <div className="mt-1.5 text-[11px] text-ink/60">{r.label}</div>
              <span aria-hidden className="mk-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3" />
            </div>
          ))}
        </div>

        <div data-cd-in className="mt-5 rounded-[16px] border border-ink/8 p-4">
          <div className="flex items-center justify-between text-mono-9 tracking-[0.16em] text-ink/40 uppercase"><span>{campaign.weeklyLabel}</span><span className="flex items-center gap-1.5" style={{ color: BRAND.ink }}><i className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: campaign.accent }} />↗ Growing</span></div>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {campaign.weekly.map((v, i) => (
              <span key={i} data-cd-bar className="flex h-full flex-1 origin-bottom items-end">
                <span className="mk-bar block w-full origin-bottom rounded-t-[5px]" style={{ height: `${(v / max) * 100}%`, background: i === campaign.weekly.length - 1 ? campaign.accent : `${campaign.accent}66`, animationDelay: `${(i % 4) * 0.4}s` }} />
              </span>
            ))}
          </div>
        </div>

        <a href={campaign.href} data-cursor="link" className="group/cs mt-6 inline-flex items-center gap-3 border-b border-ink/20 pb-1 text-mono-10-5 tracking-[0.18em] text-ink uppercase transition-colors duration-300 hover:border-ink">
          Read the full case study <span className="transition-transform duration-300 group-hover/cs:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}

/** Popup that shows a campaign's full breakdown when a feed tile is opened. */
function CampaignModal({ campaign, onClose }: { campaign: Campaign; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`${campaign.title} campaign`} className="fixed inset-0 z-[1000] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button type="button" aria-label="Close" onClick={onClose} className="mk-fade absolute inset-0 bg-ink/45 backdrop-blur-sm" />
      <div className="mk-pop relative max-h-[92vh] w-full max-w-[1100px] overflow-y-auto rounded-t-[28px] bg-paper p-5 shadow-[0_60px_120px_-40px_rgba(14,15,20,0.7)] sm:rounded-[28px] sm:p-8" data-lenis-prevent>
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: campaign.accent }} />Campaign breakdown</span>
          <button type="button" onClick={onClose} aria-label="Close campaign" className="grid h-10 w-10 place-items-center rounded-full border border-ink/12 text-[18px] text-ink transition-colors duration-300 hover:border-ink/40">×</button>
        </div>
        <CampaignDetail campaign={campaign} />
      </div>
    </div>,
    document.body,
  );
}

/** Digital Marketing work: a campaign spotlight with full breakdowns, then a clickable feed of creatives. */
export default function WorkMarketing() {
  const root = useRef<HTMLElement | null>(null);
  const [sectorIndex, setSectorIndex] = useState(0);
  const [clientIndex, setClientIndex] = useState(0);
  const [open, setOpen] = useState<Campaign | null>(null);
  const columns = 4;
  // Every creative on the wall belongs to a campaign, so tapping it opens that campaign.
  const feed = CAMPAIGNS.flatMap((campaign) => campaign.creatives.map((item) => ({ item, campaign })));
  const cols = Array.from({ length: columns }, (_, c) => feed.filter((_, i) => i % columns === c));
  const sector = SECTORS[sectorIndex];
  const pickSector = (index: number) => { setSectorIndex(index); setClientIndex(0); };

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const scrub = (trigger: string, start = "top 88%", end = "top 50%") => ({ trigger, start, end, scrub: 0.65 });
      gsap.fromTo("[data-mk-head] > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none", stagger: 0.12, scrollTrigger: scrub("[data-mk-head]") });
      gsap.fromTo("[data-mk-tab]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "none", stagger: 0.08, scrollTrigger: scrub("[data-mk-tabs]", "top 92%", "top 70%") });
      gsap.fromTo("[data-mk-panel]", { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: scrub("[data-mk-panel]", "top 95%", "top 62%") });
      gsap.fromTo("[data-mk-feedhead] > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none", stagger: 0.1, scrollTrigger: scrub("[data-mk-feedhead]") });
      const drift = [-22, 10, -30, 6];
      gsap.utils.toArray<HTMLElement>("[data-mk-col]", element).forEach((col, index) => {
        const to = drift[index % drift.length];
        gsap.fromTo(col, { yPercent: to > 0 ? -to : 0 }, { yPercent: to > 0 ? 0 : to, ease: "none", scrollTrigger: { trigger: "[data-mk-wall]", start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });
    }, element);
    return () => ctx.revert();
  }, []);

  const campaign = sector.clients[Math.min(clientIndex, sector.clients.length - 1)];

  return (
    <section ref={root} id="marketing" className="relative z-10 scroll-mt-24 py-[12vh] sm:py-[14vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        {/* Header */}
        <div data-mk-head className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="eyebrow flex items-center gap-2 text-ink/45"><i className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 0 2px ${BRAND.ink}` }} />04 — Digital Marketing</span>
            <h2 className="display mt-5 text-h2 leading-[0.9]">
              CAMPAIGNS PEOPLE<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(97deg, ${BRAND.ember}, #c13584 45%, ${BRAND.cobalt})` }}>STOP SCROLLING FOR.</span>
            </h2>
          </div>
          <div className="max-w-[42ch]">
            <p className="text-[14px] leading-[1.65] text-ink/60">
              Social, search and video campaigns that get noticed, get clicked and get results. Open any
              campaign to see the brief, the strategy and the numbers behind it.
            </p>
            <div className="mt-5 flex gap-8 border-t border-ink/12 pt-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-none" style={{ color: BRAND.ember }}>{stat.value}</div>
                  <div className="mt-1.5 text-mono-9 tracking-[0.16em] text-ink/45 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign spotlight */}
        <div className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <span className="eyebrow text-ink/45">Campaigns by sector</span>
            <span className="text-mono-9 tracking-[0.18em] text-ink/40 uppercase">{CAMPAIGNS.length} campaigns · {SECTORS.length} sectors</span>
          </div>
          <div data-mk-tabs className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SECTORS.map((item, index) => {
              const on = index === sectorIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-mk-tab
                  onClick={() => pickSector(index)}
                  aria-pressed={on}
                  className="flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2.5 transition-[background-color,border-color,color] duration-500"
                  style={{ background: on ? item.accent : "rgba(255,255,255,0.7)", borderColor: on ? item.accent : "rgba(14,15,20,0.12)", color: on ? onAccentOf(item.accent) : BRAND.ink }}
                >
                  <span className="text-[13px] font-semibold">{item.label}</span>
                  <span className="grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-bold" style={{ background: on ? "rgba(255,255,255,0.22)" : "rgba(14,15,20,0.06)" }}>{item.clients.length}</span>
                </button>
              );
            })}
          </div>

          {/* Clients in this sector */}
          <div key={sector.id} className="mk-swap mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sector.clients.map((client, index) => {
              const on = client.id === campaign.id;
              const lead = client.results[0];
              return (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => setClientIndex(index)}
                  aria-pressed={on}
                  className="group/client flex items-center gap-3 rounded-[18px] border bg-paper/80 p-3 text-left backdrop-blur-sm transition-[border-color,box-shadow,translate] duration-500 hover:-translate-y-0.5"
                  style={{ borderColor: on ? client.accent : "rgba(14,15,20,0.1)", boxShadow: on ? `0 18px 36px -24px ${client.accent}` : "none" }}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] text-[11px] font-bold" style={{ background: client.accent, color: onAccentOf(client.accent) }}>
                    {client.client.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-ink">{client.client}</span>
                    <span className="block truncate text-[11px] text-ink/50">{client.title} · {client.duration}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="display block text-[1rem] leading-none text-ink">{lead.prefix ?? ""}{lead.value.toLocaleString("en-IN", { maximumFractionDigits: lead.decimals ?? 0 })}{lead.suffix ?? ""}</span>
                    <span className="mt-0.5 block text-[9px] tracking-[0.08em] text-ink/45 uppercase">{lead.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div data-mk-panel className="relative mt-4 overflow-hidden rounded-[30px] border border-ink/10 bg-paper/80 p-5 shadow-[0_50px_100px_-70px_rgba(14,15,20,0.7)] backdrop-blur-md sm:p-8">
            <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl transition-colors duration-700" style={{ background: `${campaign.accent}2a` }} />
            <div key={campaign.id} className="mk-swap relative"><CampaignDetail campaign={campaign} inline /></div>
          </div>
        </div>

        {/* Feed wall */}
        <div data-mk-feedhead className="mt-20 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow text-ink/45">From the feed</span>
            <p className="display mt-3 text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[0.95]">Our best posts, reels and ads, with the results behind them.</p>
          </div>
          <span className="text-mono-9 tracking-[0.18em] text-ink/40 uppercase">{feed.length} top posts, reels and ads · tap any to see its campaign</span>
        </div>
        <div data-mk-wall className="relative mt-8 h-[clamp(720px,135vh,1500px)] overflow-hidden [mask-image:linear-gradient(180deg,transparent,black_10%,black_88%,transparent)]">
          <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {cols.map((col, c) => (
              <div key={c} data-mk-col className={`flex flex-col gap-4 lg:gap-5 ${c === 3 ? "hidden lg:flex" : c === 2 ? "hidden md:flex" : ""}`}>
                {[...col, ...col].map(({ item, campaign: owner }, i) => <FeedTile key={`${c}-${i}`} item={item} campaign={owner} onOpen={() => setOpen(owner)} />)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && <CampaignModal campaign={open} onClose={() => setOpen(null)} />}

      <style>{`
        @keyframes mk-swap { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes mk-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mk-pop { from { opacity: 0; transform: translateY(40px) scale(0.97); } to { opacity: 1; transform: none; } }
        .mk-swap { animation: mk-swap 0.6s cubic-bezier(0.16,1,0.3,1); }
        .mk-fade { animation: mk-fade 0.35s ease; }
        .mk-pop { animation: mk-pop 0.55s cubic-bezier(0.16,1,0.3,1); }
        @keyframes mk-bar { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.86); } }
        .mk-bar { animation: mk-bar 2.8s ease-in-out infinite; }
        @keyframes mk-sheen { 0% { transform: translateX(-120%) skewX(-18deg); } 60%, 100% { transform: translateX(420%) skewX(-18deg); } }
        .mk-sheen { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent); animation: mk-sheen 3.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .mk-swap, .mk-fade, .mk-pop, .mk-bar, .mk-sheen { animation: none; } }
      `}</style>
    </section>
  );
}
