"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import WorkHero from "./sections/WorkHero";
import WorkIndex from "./sections/WorkIndex";
import WorkCTA from "./sections/WorkCTA";

/**
 * Work index page — every project is a story; the page is the table
 * of contents. Same editorial language as Home Work section.
 */
export default function WorkPage() {
  return (
    <PageContainer>
      <Header />
      <main className="relative">
        <WorkHero />
        <WorkIndex />
        <WorkCTA />
      </main>
      <Footer />
    </PageContainer>
  );
}