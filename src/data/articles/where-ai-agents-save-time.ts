import type { Article } from "./types";

const article: Article = {
  slug: "where-ai-agents-save-time",
  title: "Where AI agents actually save time",
  excerpt: "Five jobs small teams can hand to AI today, and three they shouldn't hand over yet.",
  topic: "ai",
  author: { name: "Kavya R.", role: "Automation engineer, Nexo" },
  date: "2026-11-04",
  tags: ["AI agents", "Productivity"],
  body: [
    { type: "p", text: "AI agents are tools that can read, decide and act on simple tasks for you. For small businesses the value isn't in the hype, it's in the hours they give back each week." },
    { type: "h2", text: "Hand these over today" },
    { type: "list", items: ["**Answering common questions** on WhatsApp and your website, around the clock", "**Sorting enquiries** by urgency and sending them to the right person", "**Drafting replies** and follow-ups for your team to check and send", "**Summarising** long email threads, calls and documents", "**Writing first drafts** of product descriptions and social posts"] },
    { type: "h2", text: "Keep a person on these" },
    { type: "list", items: ["Pricing, refunds and anything involving money", "Sensitive or upset customers", "Final decisions on what gets published"] },
    { type: "tip", title: "How to start", text: "Pick one repetitive task, let the agent draft while a person approves, and measure the time saved for a month before expanding." },
    { type: "quote", text: "The best AI setups we've built don't replace anyone. They take away the copy-paste work so people can do the rest.", by: "Kavya R." },
  ],
};

export default article;
