"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import ContactHero from "./sections/ContactHero";
import ProjectEnquiry from "./sections/ProjectEnquiry";
import ContactFAQ from "./sections/ContactFAQ";
import Connect from "./sections/Connect";
import FinalCTA from "./sections/FinalCTA";

/**
 * Contact page — completely new composition.
 *
 * Sequence:
 *   ContactHero → ProjectEnquiry
 *   Connect → ContactFAQ → FinalCTA
 *
 * Every section reuses the existing Home design language:
 * The contact-specific opening keeps the same motion and visual language as
 * the Home hero while making the "send a brief" journey immediately clear.
 */
export default function ContactPage() {
  return (
    <PageContainer>
      <Header />
      <main className="relative">
        <ContactHero />
        <ProjectEnquiry />
        <Connect />
        <ContactFAQ />
        <FinalCTA />
      </main>
      <Footer />
    </PageContainer>
  );
}
