"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const QUESTIONS = [
  ["How quickly will you reply?", "Within one working day, Monday to Friday. A founder reads every brief and responds with a useful next step.", BRAND.cobalt],
  ["What is a typical budget?", "Most engagements sit between 25K and 120K EUR. We recommend a focused scope after understanding the work.", BRAND.ember],
  ["Can you sign an NDA?", "Yes. Send it before sharing sensitive details and we will review it before the project conversation begins.", BRAND.mint],
  ["Do you work remotely?", "Yes. We work worldwide from studio bases in Lisbon and Berlin, with regular working sessions throughout.", BRAND.lime],
  ["Who will work on the project?", "Senior designers, engineers and motion specialists work directly with you. There is no account-management layer.", BRAND.cobalt],
  ["Can you work with our team?", "Absolutely. We join existing product, marketing and engineering teams whenever the brief needs an embedded partner.", BRAND.ember],
  ["What do you need to get started?", "A rough brief, your deadline, an investment range and the people who need to be involved are enough to begin.", BRAND.mint],
  ["Do you offer ongoing support?", "Yes. We can continue after launch with optimisation, new releases and long-term product support.", BRAND.lime],
] as const;

export default function ContactFAQ() {
  const root = useRef<HTMLElement | null>(null);
  const intro = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(0);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-faq-card]", element);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 78%",
          end: "bottom 38%",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });
      timeline.fromTo(intro.current, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0);
      cards.forEach((card, index) => {
        timeline.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? -48 : 48, y: 28 },
          { opacity: 1, x: 0, y: 0, duration: 0.34, ease: "power2.out" },
          0.12 + index * 0.12,
        );
      });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="faq" className="relative z-10 py-[14vh] sm:py-[18vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/12 pb-4"><span className="text-mono-9 tracking-[0.22em] text-ink/40 uppercase">Questions / Answers</span><span className="text-mono-9 tracking-[0.22em] text-ink/40 uppercase">Eight useful answers</span></div>
        <div ref={intro} className="mx-auto mt-12 max-w-[670px] text-center"><span className="eyebrow block text-ink/40">Before we begin</span><h2 className="display mt-5 text-h2 leading-[0.9]">THE DETAILS,<br /><span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(98deg, ${BRAND.cobalt}, ${BRAND.mint} 45%, ${BRAND.ember})`, backgroundSize: "220% 100%", animation: "kroma-gradient-pan 12s linear infinite" }}>MADE CLEAR.</span></h2><p className="mx-auto mt-6 max-w-[43ch] text-[14px] leading-[1.65] text-ink/60 sm:text-[15px]">Everything teams usually need to know before they send a brief.</p></div>
          <div className="mt-14 grid gap-4 pb-12 sm:grid-cols-2 sm:gap-5">
            {QUESTIONS.map(([question, answer, color], index) => {
              const expanded = open === index;
              return <article key={question} data-faq-card className={`group relative overflow-hidden rounded-[22px] border border-ink/12 bg-paper/70 shadow-[0_22px_52px_-42px_rgba(14,15,20,0.45)] transition-transform duration-500 hover:-translate-y-2 ${index % 2 ? "sm:mt-12" : ""}`}><span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: color }} /><button type="button" onClick={() => setOpen(expanded ? -1 : index)} aria-expanded={expanded} className="w-full p-6 text-left sm:p-7"><span className="flex items-start justify-between gap-5"><span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: `${color}1f` }}><i className="h-2 w-2 rounded-full" style={{ background: color }} /></span><span className="grid h-9 w-9 place-items-center rounded-full border border-ink/12 text-[21px] leading-none transition-transform duration-500" style={{ color, transform: expanded ? "rotate(45deg)" : "rotate(0deg)" }}>+</span></span><h3 className="display mt-7 text-[clamp(1.25rem,2.3vw,1.75rem)] leading-[0.95]">{question}</h3></button><div className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ gridTemplateRows: expanded ? "1fr" : "0fr", opacity: expanded ? 1 : 0 }}><div className="overflow-hidden"><p className="px-6 pb-3 text-[13px] leading-[1.65] text-ink/60 sm:px-7">{answer}</p><span className="mx-6 mb-7 flex items-center gap-2 text-mono-9 tracking-[0.16em] text-ink/40 uppercase sm:mx-7">Nexo answers <i className="h-px w-6 bg-ink/20" /></span></div></div></article>;
            })}
          </div>
      </div>
    </section>
  );
}
