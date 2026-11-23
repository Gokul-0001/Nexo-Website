import type { Article } from "./types";

/**
 * HOW TO ADD A NEW ARTICLE
 *
 * 1. Copy this file into the same folder and rename it (e.g. "google-business-profile.ts").
 * 2. Fill in the fields below. Put any images in /public/blog/ and reference them as "/blog/your-image.jpg".
 * 3. Open src/data/articles/index.ts, import your article and add it to the ARTICLES list.
 *
 * That's it — it appears in the blog grid, gets its own page at /blogs/<slug>, and its reading time
 * is worked out automatically from the length of the text.
 */
const article: Article = {
  slug: "your-article-address",
  title: "Your article title",
  excerpt: "One or two sentences that make people want to read it.",
  topic: "website",
  author: { name: "Your name", role: "Your role, Nexo" },
  date: "2026-12-01",
  // cover: "/blog/your-cover.jpg",
  tags: ["Tag one", "Tag two"],
  body: [
    { type: "p", text: "Opening paragraph." },
    { type: "h2", text: "First section" },
    { type: "p", text: "Section text with **bold** words." },
    { type: "list", items: ["Point one", "Point two"] },
    { type: "tip", title: "Quick tip", text: "Something practical." },
  ],
};

export default article;
