import type { Article } from "./types";

const article: Article = {
  slug: "why-your-website-loads-slow",
  title: "Why your website loads slow, and how to fix it",
  excerpt: "Images, fonts, scripts and hosting: the usual suspects, and what each one costs you in lost visitors.",
  topic: "website",
  author: { name: "Rahul K.", role: "Tech lead, Nexo" },
  date: "2026-11-07",
  tags: ["Speed", "Core Web Vitals", "SEO"],
  body: [
    { type: "p", text: "Every extra second your site takes to load, more visitors leave before they see anything. The good news: most slow sites have the same handful of causes, and most are quick to fix." },
    { type: "h2", text: "1. Images that are too big" },
    { type: "p", text: "A 4 MB photo straight from a phone is the most common culprit. Resize images to the size they're shown at and use modern formats like WebP. This alone often halves load time." },
    { type: "h2", text: "2. Too many scripts" },
    { type: "p", text: "Chat widgets, trackers, pop-ups and plugins all add up. List every script on your site and remove anything you don't actively use." },
    { type: "h2", text: "3. Heavy fonts" },
    { type: "p", text: "Loading five weights of three fonts is common and slow. Two font files are usually enough." },
    { type: "h2", text: "4. Cheap hosting" },
    { type: "p", text: "Shared hosting far from your customers adds delay to every request. A good host with servers in India, plus a CDN, makes a visible difference." },
    { type: "tip", title: "Check yours now", text: "Run your site through Google PageSpeed Insights. Aim for a **Largest Contentful Paint under 2.5 seconds** on mobile." },
    { type: "stats", items: [{ value: "1.2s", label: "Our average load time" }, { value: "−60%", label: "Typical image weight saved" }, { value: "90+", label: "Target speed score" }] },
  ],
};

export default article;
