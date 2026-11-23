import { BRAND } from "@/lib/brand";
import { BLOG_TOPICS } from "@/data/blog";
import type { Article } from "@/data/articles";

export const topicOf = (id: string) => BLOG_TOPICS.find((topic) => topic.id === id) ?? BLOG_TOPICS[0];
export const onAccent = (color: string) => (color === BRAND.lime || color === BRAND.mint ? BRAND.ink : BRAND.paper);

/** An article's cover image, or an illustrated cover in its topic colour when no image is set. */
export default function ArticleCover({ article, seed = 0, className = "" }: { article: Article; seed?: number; className?: string }) {
  const topic = topicOf(article.topic);
  if (article.cover) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={article.cover} alt={article.title} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} style={{ background: `linear-gradient(${130 + seed * 25}deg, ${topic.accent}40, ${topic.accent}12 60%, ${BRAND.paper2})` }}>
      <span aria-hidden className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(14,15,20,0.08)_1px,transparent_1px)] [background-size:14px_14px]" />
      <span aria-hidden className="absolute -right-[10%] -top-[15%] aspect-square w-[45%] rounded-full blur-2xl" style={{ background: `${topic.accent}55` }} />
      <svg viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2" fill="none" stroke={BRAND.ink} strokeOpacity="0.8" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={topic.icon} />
      </svg>
    </div>
  );
}

/** Renders text with **bold** segments. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return <>{parts.map((part, i) => (part.startsWith("**") && part.endsWith("**") ? <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong> : part))}</>;
}
