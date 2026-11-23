import type { Article } from "./types";

const article: Article = {
  slug: "cut-ad-cost-without-losing-leads",
  title: "Five ways to cut your ad cost without losing leads",
  excerpt: "The audience, creative and landing page fixes we make on every campaign before raising a budget.",
  topic: "marketing",
  author: { name: "Arjun M.", role: "Growth lead, Nexo" },
  date: "2026-11-14",
  tags: ["Meta Ads", "Google Ads", "Leads"],
  body: [
    { type: "p", text: "Rising ad costs are rarely an ad problem. More often the audience is too broad, the creative is tired, or the page people land on asks for too much before it earns any trust. Here are the five fixes we make first, in order." },
    { type: "h2", text: "1. Fix the landing page first" },
    { type: "p", text: "A faster page with **one clear action** did more for our clients than any targeting trick. Cut the form to the fields you actually use, and put proof (reviews, results, logos) above the fold." },
    { type: "h2", text: "2. Narrow the audience" },
    { type: "p", text: "Broad audiences look cheap per click and expensive per lead. Start with the people most likely to buy: past visitors, lookalikes of customers, and tight locations for local businesses." },
    { type: "h2", text: "3. Refresh creative every two weeks" },
    { type: "p", text: "When the same people see the same ad, costs climb. Rotate three or four creatives and retire the weakest one every fortnight." },
    { type: "tip", title: "Quick test", text: "If frequency is above 3 and click-through is falling, your creative is tired, not your audience." },
    { type: "h2", text: "4. Follow up within five minutes" },
    { type: "p", text: "Leads cool fast. An instant WhatsApp reply with the brochure or price list turns far more enquiries into conversations than a call the next day." },
    { type: "h2", text: "5. Only then, raise the budget" },
    { type: "p", text: "Once cost per lead is stable for two weeks, increase spend gradually, around 20% at a time, so the platform can keep finding the right people." },
    { type: "stats", items: [{ value: "−48%", label: "Cost per lead" }, { value: "2×", label: "Lead-to-call rate" }, { value: "2 weeks", label: "To see results" }] },
  ],
};

export default article;
