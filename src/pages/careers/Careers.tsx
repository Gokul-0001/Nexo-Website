"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import CareersHero from "./sections/CareersHero";
import CareersRoles from "./sections/CareersRoles";
import CareersApply from "./sections/CareersApply";
import CareersInterlude from "./sections/CareersInterlude";
import CareersCTA from "./sections/CareersCTA";

/**
 * Careers page — being rebuilt section by section. Built so far: header (hanging whiteboard notice board), open roles, application form, split-flap interlude, CTA.
 * Roles are managed in src/data/jobs.ts.
 */
export default function CareersPage() {
  return (
    <PageContainer>
      <Header />
      <main className="relative">
        <CareersHero />
        <CareersRoles />
        <CareersApply />
        <CareersInterlude />
        <CareersCTA />
      </main>
      <Footer />
    </PageContainer>
  );
}