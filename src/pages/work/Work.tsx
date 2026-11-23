"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import WorkHero from "./sections/WorkHero";
import WorkClients from "./sections/WorkClients";
import WorkWebsite from "./sections/WorkWebsite";
import WorkStatement from "./sections/WorkStatement";
import WorkEcommerce from "./sections/WorkEcommerce";
import WorkWave from "./sections/WorkWave";
import WorkApp from "./sections/WorkApp";
import WorkImpact from "./sections/WorkImpact";
import WorkMarketing from "./sections/WorkMarketing";
import WorkWhyNexo from "./sections/WorkWhyNexo";
import WorkAutomation from "./sections/WorkAutomation";
import WorkCTA from "./sections/WorkCTA";

/**
 * Work page — one showcase per service, with connecting sections in between.
 * Built so far: header, client logos, Website Development work, ribbons interlude, Ecommerce work, wave interlude, App Development work, impact numbers, Digital Marketing work, The Nexo Way dial, Automation work, final CTA.
 */
export default function WorkPage() {
  return (
    <PageContainer>
      <Header />
      <main className="relative">
        <WorkHero />
        <WorkClients />
        <WorkWebsite />
        <WorkStatement />
        <WorkEcommerce />
        <WorkWave />
        <WorkApp />
        <WorkImpact />
        <WorkMarketing />
        <WorkWhyNexo />
        <WorkAutomation />
        <WorkCTA />
      </main>
      <Footer />
    </PageContainer>
  );
}
