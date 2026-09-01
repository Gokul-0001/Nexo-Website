/**
 * KROMA brand system (original bold creative studio palette).
 */
export const BRAND = {
  cobalt: "#2B44FF",
  ember: "#FF4A2B",
  lime: "#C8FA3C",
  mint: "#1FE0BE",
  ink: "#0E0F14",
  paper: "#FFFFFF",
  paper2: "#F7F7F4",
} as const;

export type BrandKey = keyof typeof BRAND;

/* ── Navigation (original, single-level) ─────────────────────────────────── */

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  tags: string[];
  color: string;
  art: "code" | "app" | "interface" | "identity" | "space" | "neural";
};

export const SERVICES: Service[] = [
  {
    id: "web",
    index: "01",
    title: "WEB DEVELOPMENT",
    blurb:
      "Production-grade front ends, headless commerce and design-system driven sites that score green without sacrificing craft.",
    tags: ["React / Next", "Headless CMS", "Core Web Vitals"],
    color: BRAND.cobalt,
    art: "code",
  },
  {
    id: "app",
    index: "02",
    title: "APP DEVELOPMENT",
    blurb:
      "Native-feeling product engineering for iOS, Android and cross-platform — offline first, animated, measurable.",
    tags: ["React Native", "Swift", "Design systems"],
    color: BRAND.ember,
    art: "app",
  },
  {
    id: "uiux",
    index: "03",
    title: "UI / UX DESIGN",
    blurb:
      "Research-backed flows, prototyping and interface systems that turn complicated products into obvious ones.",
    tags: ["Discovery", "Prototyping", "Usability"],
    color: BRAND.mint,
    art: "interface",
  },
  {
    id: "brand",
    index: "04",
    title: "BRANDING",
    blurb:
      "Naming, identity, type and colour systems — built to survive at 16px on a phone and 16m on a facade.",
    tags: ["Identity", "Guidelines", "Motion rules"],
    color: BRAND.lime,
    art: "identity",
  },
  {
    id: "xr",
    index: "05",
    title: "DIGITAL EXPERIENCES",
    blurb:
      "WebGL, scroll cinema, installations and micro-sites — the kind of pages people send to their group chat.",
    tags: ["Three.js", "GSAP", "Interactive"],
    color: BRAND.cobalt,
    art: "space",
  },
  {
    id: "ai",
    index: "06",
    title: "AI SOLUTIONS",
    blurb:
      "Retrieval assistants, generative tooling and evaluation pipelines wired into the products you already run.",
    tags: ["LLM ops", "RAG", "Automation"],
    color: BRAND.ember,
    art: "neural",
  },
];

export type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  metrics: string[];
  palette: [string, string];
  art: "commerce" | "fintech" | "health" | "music";
};

export const PROJECTS: Project[] = [
  {
    id: "halide",
    title: "HALIDE",
    client: "Halide Optics",
    year: "2025",
    discipline: "Branding · Commerce · WebGL configurator",
    metrics: ["+184% conversion", "1.1s LCP", "Awwwards SOTD"],
    palette: [BRAND.cobalt, BRAND.mint],
    art: "commerce",
  },
  {
    id: "northbeam",
    title: "NORTHBEAM",
    client: "Northbeam Capital",
    year: "2025",
    discipline: "Product design · Front-end engineering",
    metrics: ["38 dashboards", "0 → 120k users", "Design system v2"],
    palette: [BRAND.ember, BRAND.cobalt],
    art: "fintech",
  },
  {
    id: "vireo",
    title: "VIREO",
    client: "Vireo Health",
    year: "2024",
    discipline: "App development · AI triage",
    metrics: ["4.9 App Store", "-41% no-shows", "iOS + Android"],
    palette: [BRAND.mint, BRAND.lime],
    art: "health",
  },
  {
    id: "sonder",
    title: "SONDER",
    client: "Sonder Records",
    year: "2024",
    discipline: "Digital experience · Sound-reactive WebGL",
    metrics: ["2.4M plays", "FWA of the day", "6-week build"],
    palette: [BRAND.lime, BRAND.ember],
    art: "music",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "DISCOVER",
    color: BRAND.cobalt,
    duration: "1–2 weeks",
    body: "Stakeholder interviews, analytics archaeology, competitive teardowns. We leave with a problem worth solving — not a mood board.",
    deliverables: ["Research digest", "Success metrics", "Opportunity map"],
  },
  {
    step: "02",
    title: "DEFINE",
    color: BRAND.mint,
    duration: "1 week",
    body: "Information architecture, content models and the functional spine of the product, pressure-tested before a pixel is designed.",
    deliverables: ["Scope & sprints", "IA + flows", "Tech spike"],
  },
  {
    step: "03",
    title: "DESIGN",
    color: BRAND.lime,
    duration: "3–5 weeks",
    body: "Art direction and interface systems in parallel. Motion is designed here, not added later — every state has a story.",
    deliverables: ["Design system", "Prototypes", "Motion spec"],
  },
  {
    step: "04",
    title: "DEVELOP",
    color: BRAND.ember,
    duration: "6–12 weeks",
    body: "Typed, tested, component-driven builds. Weekly staging links, performance budgets enforced in CI, no surprises at handover.",
    deliverables: ["Staging weekly", "CI + budgets", "Docs"],
  },
  {
    step: "05",
    title: "LAUNCH",
    color: BRAND.cobalt,
    duration: "Ongoing",
    body: "Release, measure, iterate. We stay on the deck for 90 days of optimisation, then hand over a machine your team can run.",
    deliverables: ["Launch plan", "90-day iteration", "Handover"],
  },
];
