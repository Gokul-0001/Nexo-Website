"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import CareersHero from "./sections/CareersHero";
import CareersOpen from "./sections/CareersOpen";
import CareersHow from "./sections/CareersHow";
import CareersCTA from "./sections/CareersCTA";

/**
 * Careers — open applications, the studio rhythm and what working
 * here actually looks like.
 */
export default function CareersPage() {
  return (
    <PageContainer>
      <Header />
      <main className="relative">
        <CareersHero />
        <CareersOpen />
        <CareersHow />
        <CareersCTA />
      </main>
      <Footer />
    </PageContainer>
  );
}