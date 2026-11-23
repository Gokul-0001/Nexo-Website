import type { Article } from "./types";

const article: Article = {
  slug: "shopify-store-cost-india",
  title: "What a Shopify store really costs in India",
  excerpt: "Platform fees, apps, payment gateways and design, broken down line by line for first-time sellers.",
  topic: "ecommerce",
  author: { name: "Priya S.", role: "Ecommerce lead, Nexo" },
  date: "2026-11-18",
  tags: ["Shopify", "Pricing", "D2C"],
  body: [
    { type: "p", text: "Most founders budget for the theme and forget everything around it. The real cost of an online store sits in the **apps, the payment gateway, shipping and the small fixes after launch**. We looked at forty stores we've built for Indian brands to see where the money actually goes." },
    { type: "stats", items: [{ value: "₹1.5L+", label: "Typical year-one budget" }, { value: "40", label: "Stores reviewed" }, { value: "3", label: "Things never to cut" }] },
    { type: "h2", text: "The fixed costs" },
    { type: "p", text: "Shopify's plan is the easy part. The Basic plan covers most new stores, and you can move up once order volume justifies it. Add a domain and a professional email and your fixed monthly cost is predictable." },
    { type: "list", items: ["Shopify plan: billed monthly or yearly", "Domain and business email", "A premium theme, or a custom design if your brand needs it"] },
    { type: "h2", text: "The costs people forget" },
    { type: "p", text: "Apps are where budgets quietly leak. Reviews, wishlists, upsells, subscriptions: each one is a small monthly fee, and together they often cost more than the plan itself. They also slow the store down." },
    { type: "tip", title: "Our rule of thumb", text: "Start with **no more than five apps**. Add one only when you can name the problem it solves and how you'll measure it." },
    { type: "p", text: "Payment gateways charge a percentage of each order, and cash on delivery brings its own costs in failed deliveries and returns. Factor both into your margins from day one." },
    { type: "h2", text: "Where to spend instead" },
    { type: "p", text: "The stores that grew fastest spent less on apps and more on the moments where buyers decide." },
    { type: "list", ordered: true, items: ["**Speed**: a store that loads in under two seconds sells more", "**Checkout**: UPI first, as few fields as possible", "**Product pages**: real photos, sizes and clear delivery dates"] },
    { type: "quote", text: "Spend less on apps and more on product pages, checkout and speed. That's where the sale is won.", by: "Priya S." },
    { type: "h2", text: "A realistic first-year budget" },
    { type: "p", text: "For most new D2C brands, a well-built store with a custom look, the essential apps and a year of running costs starts from around ₹1.5 lakh. Bigger catalogues, custom features and integrations with tools like Tally add to that, but the principle stays the same: put your money where the buyer decides." },
  ],
};

export default article;
