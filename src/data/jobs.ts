/**
 * OPEN ROLES — the single place to manage job listings.
 *
 * - Add a role: copy one block below, give it a new unique `id`, and fill it in.
 * - Close a role: set `open: false` (it disappears from the site but stays here for next time),
 *   or delete the block.
 * - The notice board in the page header, the roles list and the application form all read from
 *   this list, so they always stay in sync.
 *
 * `team` must be one of the TEAMS below (it sets the colour). `type` is shown as written.
 */

export const TEAMS = ["Design", "Engineering", "Ecommerce", "Marketing", "Automation", "Content"] as const;
export type Team = (typeof TEAMS)[number];

export type Job = {
  /** Unique, lowercase words joined by dashes. */
  id: string;
  title: string;
  team: Team;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  experience: string;
  /** Leave empty ("") to hide. */
  salary: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  open: boolean;
};

/** PLACEHOLDER roles — replace with your real openings. */
const ALL_JOBS: Job[] = [
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    team: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "2–4 years",
    salary: "₹6–10 LPA",
    summary: "Design websites, stores and apps that look sharp and convert, from first sketch to the final hand-off.",
    responsibilities: ["Turn briefs into wireframes, flows and polished UI in Figma", "Build and maintain design systems for client projects", "Work closely with developers through launch", "Present your work to clients with clear reasoning"],
    requirements: ["A portfolio of shipped web or app work", "Strong layout, typography and interaction skills", "Comfort with Figma auto-layout and components"],
    niceToHave: ["Motion design or prototyping skills", "Experience designing for ecommerce"],
    open: true,
  },
  {
    id: "react-developer",
    title: "React Developer",
    team: "Engineering",
    location: "Pune",
    type: "Full-time",
    experience: "2–5 years",
    salary: "₹8–14 LPA",
    summary: "Build fast, polished websites and web apps with React and Next.js for growing brands.",
    responsibilities: ["Build pages and features in React, Next.js and TypeScript", "Turn designs into pixel-perfect, responsive interfaces", "Keep sites fast, accessible and SEO-friendly", "Review code and help the team ship well"],
    requirements: ["Solid React and TypeScript experience", "Good eye for detail and animation", "Experience with REST or GraphQL APIs"],
    niceToHave: ["GSAP or Framer Motion", "Experience with headless CMS or Shopify"],
    open: true,
  },
  {
    id: "shopify-developer",
    title: "Shopify Developer",
    team: "Ecommerce",
    location: "Remote",
    type: "Full-time",
    experience: "2–4 years",
    salary: "₹7–12 LPA",
    summary: "Build and improve Shopify stores that sell, from custom themes to checkout and app integrations.",
    responsibilities: ["Build custom Shopify themes with Liquid", "Set up apps, payments, shipping and integrations", "Improve store speed and conversion", "Support clients after launch"],
    requirements: ["Strong Liquid, HTML, CSS and JavaScript", "Experience launching Shopify stores", "Understanding of Indian payments (UPI, COD)"],
    open: true,
  },
  {
    id: "ads-specialist",
    title: "Ads Specialist",
    team: "Marketing",
    location: "Mumbai",
    type: "Full-time",
    experience: "2–4 years",
    salary: "₹5–9 LPA",
    summary: "Plan and run Meta and Google Ads campaigns that bring real leads and sales for our clients.",
    responsibilities: ["Plan, launch and optimise Meta and Google campaigns", "Work with designers on ad creatives", "Track results and report clearly to clients", "Test audiences, offers and landing pages"],
    requirements: ["Hands-on experience managing ad budgets", "Comfort with analytics and spreadsheets", "Clear written and spoken communication"],
    open: true,
  },
  {
    id: "automation-engineer",
    title: "Automation Engineer",
    team: "Automation",
    location: "Pune",
    type: "Full-time",
    experience: "1–3 years",
    salary: "₹6–10 LPA",
    summary: "Connect tools like Shopify, Tally, WhatsApp and CRMs so our clients' busy work runs on its own.",
    responsibilities: ["Design and build workflows between business tools", "Write small services and scripts in Node.js or Python", "Monitor automations and fix issues quickly", "Document workflows for clients"],
    requirements: ["Programming experience in JavaScript or Python", "Comfort working with APIs and webhooks", "A problem-solving mindset"],
    niceToHave: ["Experience with n8n, Zapier or Make", "Tally or WhatsApp Business API experience"],
    open: true,
  },
  {
    id: "content-writer",
    title: "Content Writer",
    team: "Content",
    location: "Remote",
    type: "Part-time",
    experience: "1–3 years",
    salary: "",
    summary: "Write clear, useful website copy, blog guides and social posts for Nexo and our clients.",
    responsibilities: ["Write website pages, blog articles and ad copy", "Research topics and interview the team", "Edit for clarity and SEO"],
    requirements: ["Excellent written English", "Samples of published work"],
    open: false,
  },
];

/** Only the roles that are currently open, in the order written above. */
export const JOBS: Job[] = ALL_JOBS.filter((job) => job.open);

/** Brand colour for each team. */
export const TEAM_COLORS: Record<Team, string> = {
  Design: "#FF4A2B",
  Engineering: "#2B44FF",
  Ecommerce: "#FF4A2B",
  Marketing: "#C8FA3C",
  Automation: "#1FE0BE",
  Content: "#2B44FF",
};

/** Event the roles list fires to pre-select a role in the application form. */
export const APPLY_EVENT = "nexo:apply-role";

/**
 * Where applications are sent. Paste a form endpoint here (for example a Formspree, Getform or
 * Basin URL, or your own API) to receive applications with the CV attached. Until it's set, the
 * form opens the visitor's email app with the details filled in, addressed to APPLY_EMAIL.
 */
export const APPLY_ENDPOINT = "";
export const APPLY_EMAIL = "careers@nexo.design";
