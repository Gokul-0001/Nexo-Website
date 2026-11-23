import { BRAND } from "@/lib/brand";

export type BlogTopic = {
  id: string;
  name: string;
  accent: string;
  /** Shown on the topic tile. PLACEHOLDER — set to the real number of articles. */
  posts: number;
  description: string;
  latest: string;
  /** 24×24 stroke icon path. */
  icon: string;
};

/** PLACEHOLDER topics — update to match the blog. Tiles link to `#topic-<id>`, which filters the posts grid. */
export const BLOG_TOPICS: BlogTopic[] = [
  { id: "website", name: "Website", accent: BRAND.cobalt, posts: 24, description: "Design, speed, SEO and the pages that turn visitors into enquiries.", latest: "Why your website loads slow, and how to fix it", icon: "M3 5h18v14H3zM3 9h18M6.5 7h.01M9 7h.01" },
  { id: "ecommerce", name: "Ecommerce", accent: BRAND.ember, posts: 18, description: "Shopify, WooCommerce, checkout, payments and selling more online.", latest: "What a Shopify store really costs in India", icon: "M6 8h12l-1 12H7L6 8zM9 8V6a3 3 0 0 1 6 0v2" },
  { id: "apps", name: "Apps", accent: BRAND.mint, posts: 11, description: "Planning, building and launching apps people keep opening.", latest: "Website or app first? How to decide", icon: "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2" },
  { id: "marketing", name: "Marketing", accent: BRAND.lime, posts: 27, description: "Ads, reels, SEO and campaigns that bring in real customers.", latest: "Five ways to cut your ad cost without losing leads", icon: "M3 11v2l13 5V6L3 11zM16 9a3 3 0 0 1 0 6M6 14l1.5 5h3L9 15" },
  { id: "automation", name: "Automation", accent: BRAND.cobalt, posts: 14, description: "Workflows that move orders, leads and invoices on their own.", latest: "Invoices on autopilot with Tally and WhatsApp", icon: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" },
  { id: "ai", name: "AI", accent: BRAND.ember, posts: 9, description: "Practical AI for small businesses: agents, chatbots and content.", latest: "Where AI agents actually save time", icon: "M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" },
];
