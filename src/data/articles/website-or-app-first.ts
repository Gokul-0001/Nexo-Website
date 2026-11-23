import type { Article } from "./types";

const article: Article = {
  slug: "website-or-app-first",
  title: "Website or app first? How to decide",
  excerpt: "Start where your customers already are. A simple way to pick the right first step for your business.",
  topic: "apps",
  author: { name: "Rahul K.", role: "Tech lead, Nexo" },
  date: "2026-10-31",
  tags: ["Apps", "Planning"],
  body: [
    { type: "p", text: "It's one of the first questions new clients ask. The honest answer: for most businesses, a fast website comes first, and an app pays off once people come back again and again." },
    { type: "h2", text: "Start with a website if…" },
    { type: "list", items: ["People find you through Google or ads", "Customers buy or enquire once in a while", "You're still testing what your customers want"] },
    { type: "h2", text: "Go for an app when…" },
    { type: "list", items: ["Customers use you weekly or daily (bookings, orders, learning)", "You need phone features like notifications, camera or location", "You already have steady repeat customers"] },
    { type: "tip", title: "The middle path", text: "A progressive web app (PWA) installs from the browser, works offline and sends notifications, without the cost of two separate apps." },
    { type: "h2", text: "What it costs" },
    { type: "p", text: "A good business website is usually a fraction of the cost of a well-built app, and it's quicker to launch and change. Starting with the website also tells you exactly what your app should do later." },
  ],
};

export default article;
