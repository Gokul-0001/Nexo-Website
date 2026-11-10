"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import BlogsHero from "./sections/BlogsHero";
import BlogsIndex from "./sections/BlogsIndex";
import BlogsCTA from "./sections/BlogsCTA";

/**
 * Blogs index page — founders' writing on craft, clients and
 * the build process.
 */
export default function BlogsPage() {
  return (
    <PageContainer>
      <Header />
      <main className="relative">
        <BlogsHero />
        <BlogsIndex />
        <BlogsCTA />
      </main>
      <Footer />
    </PageContainer>
  );
}