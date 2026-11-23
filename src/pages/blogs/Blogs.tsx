"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import BlogsHero from "./sections/BlogsHero";
import BlogsFeatured from "./sections/BlogsFeatured";
import BlogsTopics from "./sections/BlogsTopics";
import BlogsPosts from "./sections/BlogsPosts";
import BlogsCTA from "./sections/BlogsCTA";

/**
 * Blogs page — being rebuilt section by section. Built so far: header (The Nexo Journal), featured story, browse by topic, all articles, final CTA.
 */
export default function BlogsPage() {
  return (
    <PageContainer>
      <Header />
      <main className="relative">
        <BlogsHero />
        <BlogsFeatured />
        <BlogsTopics />
        <BlogsPosts />
        <BlogsCTA />
      </main>
      <Footer />
    </PageContainer>
  );
}