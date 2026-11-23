import type { Article, Block } from "./types";
import shopifyStoreCost from "./shopify-store-cost-india";
import cutAdCost from "./cut-ad-cost-without-losing-leads";
import tallyWhatsapp from "./tally-whatsapp-invoice-automation";
import websiteSlow from "./why-your-website-loads-slow";
import aiAgents from "./where-ai-agents-save-time";
import websiteOrApp from "./website-or-app-first";
import upiVsCod from "./upi-vs-cash-on-delivery";
import seoChecklist from "./seo-checklist-new-website";

export type { Article, Block } from "./types";

/**
 * Every published article. To add one: copy _template.ts, fill it in, import it above and add it here.
 * Order doesn't matter — they're sorted newest first.
 */
const ALL: Article[] = [shopifyStoreCost, cutAdCost, tallyWhatsapp, websiteSlow, aiAgents, websiteOrApp, upiVsCod, seoChecklist];

export const ARTICLES: Article[] = [...ALL].sort((a, b) => b.date.localeCompare(a.date));

export const getArticle = (slug: string | undefined) => ARTICLES.find((article) => article.slug === slug);

const blockText = (block: Block): string => {
  switch (block.type) {
    case "list": return block.items.join(" ");
    case "stats": return block.items.map((item) => `${item.value} ${item.label}`).join(" ");
    case "image": return block.caption ?? "";
    case "tip": return `${block.title ?? ""} ${block.text}`;
    default: return block.text;
  }
};

/** Reading time worked out from the words in the article (about 200 words a minute). */
export const readingMinutes = (article: Article) => {
  const words = [article.title, article.excerpt, ...article.body.map(blockText)].join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200) + 1);
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2026-11-18" → "18 Nov 2026" (same on server and browser). */
export const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

/** Heading slug for "On this page" links. */
export const headingId = (text: string) => text.toLowerCase().replace(/\*\*/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
