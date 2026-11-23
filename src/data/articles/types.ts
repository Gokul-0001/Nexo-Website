/**
 * Building blocks for an article body. Mix them in any order.
 *
 *   { type: "p", text: "A paragraph." }
 *   { type: "h2", text: "A section heading" }          ← also listed in "On this page"
 *   { type: "h3", text: "A smaller heading" }
 *   { type: "list", items: ["One", "Two"], ordered: true }
 *   { type: "quote", text: "Something worth quoting.", by: "Who said it" }
 *   { type: "image", src: "/blog/my-image.jpg", alt: "What it shows", caption: "Optional caption" }
 *   { type: "tip", title: "Quick tip", text: "A highlighted note." }
 *   { type: "stats", items: [{ value: "42%", label: "More orders" }] }
 *
 * Text can use **bold** for emphasis.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; by?: string }
  | { type: "image"; src?: string; alt?: string; caption?: string }
  | { type: "tip"; title?: string; text: string }
  | { type: "stats"; items: { value: string; label: string }[] };

export type Article = {
  /** Used in the address: /blogs/<slug>. Lowercase words joined by dashes, unique. */
  slug: string;
  title: string;
  /** One or two sentences shown on cards and under the title. */
  excerpt: string;
  /** One of the topic ids in src/data/blog.ts: website, ecommerce, apps, marketing, automation, ai. */
  topic: string;
  author: { name: string; role: string };
  /** Publish date as YYYY-MM-DD. Newest articles show first. */
  date: string;
  /** Cover image in /public (e.g. "/blog/shopify-cost.jpg"). Leave out to use an illustrated cover. */
  cover?: string;
  tags: string[];
  body: Block[];
};
