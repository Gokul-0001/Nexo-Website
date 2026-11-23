import type { Article } from "./types";

const article: Article = {
  slug: "upi-vs-cash-on-delivery",
  title: "UPI or cash on delivery: what sells more?",
  excerpt: "Prepaid orders ship cheaper and return less. Here's how to nudge buyers to pay upfront without losing sales.",
  topic: "ecommerce",
  author: { name: "Priya S.", role: "Ecommerce lead, Nexo" },
  date: "2026-10-28",
  tags: ["Payments", "UPI", "Checkout"],
  body: [
    { type: "p", text: "Cash on delivery still matters in India, especially for first-time buyers. But COD orders are returned far more often, and each failed delivery costs you shipping both ways." },
    { type: "stats", items: [{ value: "62%", label: "Prepaid after changes" }, { value: "−35%", label: "Returns" }, { value: "1 month", label: "Time taken" }] },
    { type: "h2", text: "How one store moved to prepaid" },
    { type: "list", ordered: true, items: ["Put UPI first at checkout, with one-tap app buttons", "Offered a small prepaid discount instead of charging a COD fee", "Sent a WhatsApp confirmation for COD orders before shipping", "Kept COD available, so no buyer was turned away"] },
    { type: "tip", title: "Don't remove COD", text: "Removing it entirely usually costs more sales than it saves. Make prepaid the easier, better choice instead." },
    { type: "p", text: "The result was a store where most orders are paid upfront, fewer parcels come back, and cash flow is far more predictable." },
  ],
};

export default article;
