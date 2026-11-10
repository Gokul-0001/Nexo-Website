"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import AboutHero from "./sections/AboutHero";
import AboutPointOfView from "./sections/AboutPointOfView";
import AboutProcess from "./sections/AboutProcess";
import AboutCapabilities from "./sections/AboutCapabilities";
import AboutProof from "./sections/AboutProof";
import AboutPrinciples from "./sections/AboutPrinciples";
import AboutCTA from "./sections/AboutCTA";

/**
 * About page — a focused introduction followed by Working with us.
 */
export default function AboutPage() {
  return (
    <PageContainer>
      <Header />
      <main className="relative">
        <AboutHero />
        <AboutPointOfView />
        <AboutProcess />
        <AboutCapabilities />
        <AboutProof />
        <AboutPrinciples />
        <AboutCTA />
      </main>
      <Footer />
    </PageContainer>
  );
}
