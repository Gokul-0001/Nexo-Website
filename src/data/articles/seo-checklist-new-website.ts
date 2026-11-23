import type { Article } from "./types";

const article: Article = {
  slug: "seo-checklist-new-website",
  title: "The SEO checklist for every new website",
  excerpt: "The things to get right before launch so Google can find, understand and trust your site.",
  topic: "website",
  author: { name: "Rahul K.", role: "Tech lead, Nexo" },
  date: "2026-10-21",
  tags: ["SEO", "Launch"],
  body: [
    { type: "p", text: "SEO isn't something to add later. A few decisions made before launch decide how easily Google can find and rank your site for years." },
    { type: "h2", text: "Before launch" },
    { type: "list", items: ["A clear title and description on every page", "One main heading (H1) per page that says what it's about", "Clean addresses like /services/website-design", "Images with descriptive alt text", "A sitemap submitted to Google Search Console"] },
    { type: "h2", text: "For local businesses" },
    { type: "list", items: ["A complete Google Business Profile", "Your name, address and phone the same everywhere", "Location pages for each city you serve"] },
    { type: "h2", text: "After launch" },
    { type: "p", text: "Watch Search Console for errors, keep the site fast, and publish useful content regularly. Rankings build over months, not days." },
    { type: "tip", title: "The one that matters most", text: "Write for your customers first. Pages that answer real questions clearly are the ones Google ranks." },
  ],
};

export default article;
