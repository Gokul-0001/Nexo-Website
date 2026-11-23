import type { Article } from "./types";

const article: Article = {
  slug: "tally-whatsapp-invoice-automation",
  title: "Invoices on autopilot with Tally and WhatsApp",
  excerpt: "How a retail chain saved 32 hours a week by connecting the tools it already used.",
  topic: "automation",
  author: { name: "Kavya R.", role: "Automation engineer, Nexo" },
  date: "2026-11-11",
  tags: ["Tally", "WhatsApp", "Workflows"],
  body: [
    { type: "p", text: "Every new order used to mean the same routine: copy the details into Tally, create the invoice, then message the customer by hand. On a busy day it took three people. Here's how we automated it in two weeks." },
    { type: "stats", items: [{ value: "32 hrs", label: "Saved every week" }, { value: "9,800", label: "Orders a month" }, { value: "0", label: "Missed invoices" }] },
    { type: "h2", text: "The workflow" },
    { type: "list", ordered: true, items: ["A new order arrives in the online store", "A GST invoice is created in Tally with the right ledger and tax", "The customer gets a WhatsApp confirmation with the invoice", "Stock is updated, and the owner is alerted when an item runs low"] },
    { type: "h2", text: "What it needed" },
    { type: "p", text: "No new software for the team to learn. We connected the store, Tally and the WhatsApp Business API with a small middleware service that handles retries if anything is briefly offline." },
    { type: "tip", title: "Start small", text: "Automate the one task your team repeats most often first. Prove it works, then add the next step." },
    { type: "h2", text: "Where it can go wrong" },
    { type: "p", text: "Mismatched product names between the store and Tally were the biggest early issue. A one-time clean-up of item codes fixed it, and the workflow now flags anything it can't match instead of guessing." },
    { type: "quote", text: "The team went from typing invoices all day to handling the orders that actually need a person.", by: "Kavya R." },
  ],
};

export default article;
