"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import { Marquee } from "@/components/animations/Marquee";
import TransitionBand from "./sections/TransitionBand";
import FluidBreak from "./sections/FluidBreak";
import CTA from "./sections/CTA";
import Hero from "./sections/Hero";
import Services from "./sections/ServicesSection";
import About from "./sections/AboutSection";
import Work from "./sections/WorkSection";
import Process from "./sections/Process";
import Testimonials from "./sections/Testimonials";
import HomeRuntime from "./sections/HomeRuntime";

/** Home is intentionally a composition of discrete sections. */
export default function Home() {
  return <PageContainer><HomeRuntime /><Header /><main className="relative"><Hero /><Testimonials /><TransitionBand text={["WHAT WE CREATE", "SIX DISCIPLINES"]} tone="cobalt" /><Services /><div className="relative z-10 my-[6vh] border-y border-ink/10 bg-ink py-4"><Marquee items={["WEB DEVELOPMENT", "APP DEVELOPMENT", "UI / UX DESIGN", "BRANDING", "DIGITAL EXPERIENCES", "AI SOLUTIONS"]} duration={38} itemClassName="display text-[clamp(1rem,2.6vw,1.7rem)] text-paper/85" /></div><Work /><TransitionBand text={["HOW WE BUILD", "FIVE MOVEMENTS"]} tone="ember" flip /><Process /><About /><div className="relative z-20 py-[4vh]"><Marquee items={["HELLO@NEXO.DESIGN", "LET'S BUILD SOMETHING", "PORTFOLIO 2026", "AVAILABLE Q3"]} duration={30} itemClassName="display text-[clamp(1.25rem,3.3vw,2.1rem)] text-ink/70" /></div><FluidBreak /><CTA /></main><Footer /></PageContainer>;
}
