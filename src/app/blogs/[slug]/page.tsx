import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/blog/ArticlePage";
import { ARTICLES, getArticle } from "@/data/articles";

/** Every article gets its own page at /blogs/<slug>. */
export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: `${article.title} — The Nexo Journal`, description: article.excerpt };
}

export default async function BlogArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getArticle(slug)) notFound();
  return <ArticlePage slug={slug} />;
}
