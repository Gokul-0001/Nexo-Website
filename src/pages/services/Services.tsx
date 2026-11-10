"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import ServicesHero from "./sections/ServicesHero";
import ServicesGrid from "./sections/ServicesGrid";
import ServicesApproach from "./sections/ServicesApproach";
import ServicesFAQ from "./sections/ServicesFAQ";
import ServicesCTA from "./sections/ServicesCTA";

/**
 * Services overview page — six disciplines, one team.
 *
 * Built from the same primitives as the Home Services section,
 * extended with an FAQ column + a final CTA panel.
 */
export default function ServicesPage() {
  return (
    <PageContainer>
      <Header />
      <main className="relative">
        <ServicesHero />
        <ServicesGrid />
        <ServicesApproach />
        <ServicesFAQ />
        <ServicesCTA />
      </main>
      <Footer />
    </PageContainer>
  );
}