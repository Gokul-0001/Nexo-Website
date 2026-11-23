"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type Faq = {
  category: string;
  question: string;
  answer: string[];
  link: { label: string; href: string };
  color: string;
  icon: string;
};

const QUESTIONS: Faq[] = [
  {
    category: "Process", question: "How quickly will you reply?",
    answer: ["Within one working day, Monday to Friday (IST).", "A founder reads every enquiry and replies with a clear next step."],
    link: { label: "Send a brief", href: "#enquiry" }, color: BRAND.cobalt,
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  },
  {
    category: "Pricing", question: "What does a project typically cost?",
    // PLACEHOLDER range — confirm real figures before launch.
    answer: ["It depends on scope. Most projects range from ₹1.5 lakh to ₹25 lakh.", "You always get a fixed, written quote once we understand your goals."],
    link: { label: "Get a quote", href: "#enquiry" }, color: BRAND.ember,
    icon: "M7 5h10M7 9h10M7 5c5 0 5 8 0 8l7 6",
  },
  {
    category: "Services", question: "Which services do you offer?",
    answer: ["Website development, ecommerce, app development, digital marketing and automation.", "One senior team delivers them separately or together."],
    link: { label: "See services", href: "/services" }, color: BRAND.mint,
    icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  },
  {
    category: "Process", question: "How long does a project take?",
    answer: ["A focused website can go live quickly; apps, stores and automations take a little longer.", "Your proposal includes a clear timeline with milestones."],
    link: { label: "How we work", href: "/about" }, color: BRAND.lime,
    icon: "M4 6h16v14H4zM4 10h16M9 3v5M15 3v5",
  },
  {
    category: "Working together", question: "Do you work with clients outside India?",
    answer: ["Yes. We work with businesses across India and worldwide.", "Expect regular calls, shared updates and visible progress every week."],
    link: { label: "Talk to us", href: "#enquiry" }, color: BRAND.cobalt,
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  },
  {
    category: "Trust", question: "Can you sign an NDA?",
    answer: ["Yes. Share your NDA before sending sensitive details.", "We review and sign it before the project conversation begins."],
    link: { label: "Email your NDA", href: "mailto:studio@nexo.design" }, color: BRAND.ember,
    icon: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3ZM8.5 12l2.5 2.5 4.5-5",
  },
  {
    category: "Support", question: "Do you handle hosting and maintenance?",
    answer: ["Yes. We set up hosting, domains and security for you.", "After launch we keep your site, store or app updated, backed up and monitored."],
    link: { label: "Ongoing support", href: "/services" }, color: BRAND.mint,
    icon: "M4 5h16v6H4zM4 13h16v6H4zM8 8h.01M8 16h.01",
  },
  {
    category: "Getting started", question: "What do you need to get started?",
    answer: ["A short brief, your goals, a rough budget and timeline, and the people involved.", "We take it from there with a free first call."],
    link: { label: "Start a project", href: "#enquiry" }, color: BRAND.lime,
    icon: "M3 11.5 21 3l-8.5 18-2.2-7.3L3 11.5Z",
  },
];

export default function ContactFAQ() {
  const root = useRef<HTMLElement | null>(null);
  const intro = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(0);

  // Opening or closing a card changes the page height, so re-measure the scroll triggers.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 560);
    return () => window.clearTimeout(id);
  }, [open]);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-faq-card]", element);
      gsap.fromTo(intro.current, { opacity: 0, y: 34 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: intro.current, start: "top 88%", end: "top 58%", scrub: 0.65 } });
      // Each card scrubs in on its own, so every card is fully settled once it is on screen.
      cards.forEach((card) => {
        const index = Number(card.dataset.index);
        gsap.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? -48 : 48, y: 28 },
          { opacity: 1, x: 0, y: 0, ease: "none", scrollTrigger: { trigger: card, start: "top 96%", end: "top 70%", scrub: 0.65, invalidateOnRefresh: true } },
        );
      });

      // Each card's icon and colour sweep follow the scroll too.
      cards.forEach((card) => {
        gsap.fromTo(card.querySelector("[data-faq-icon]"), { rotate: -90, scale: 0.6 }, { rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top 92%", end: "top 62%", scrub: 0.6 } });
        gsap.fromTo(card.querySelector("[data-faq-sweep]"), { xPercent: -100 }, { xPercent: 100, ease: "none", scrollTrigger: { trigger: card, start: "top 90%", end: "top 45%", scrub: 0.6 } });
      });
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="faq" className="relative z-10 py-[14vh] sm:py-[18vh]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/12 pb-4"><span className="text-mono-9 tracking-[0.22em] text-ink/40 uppercase">Questions / Answers</span><span className="text-mono-9 tracking-[0.22em] text-ink/40 uppercase">Eight useful answers</span></div>
        <div ref={intro} className="mx-auto mt-12 max-w-[670px] text-center"><span className="eyebrow block text-ink/40">Before we begin</span><h2 className="display mt-5 text-h2 leading-[0.9]">THE DETAILS,<br /><span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(98deg, ${BRAND.cobalt}, ${BRAND.mint} 45%, ${BRAND.ember})`, backgroundSize: "220% 100%", animation: "kroma-gradient-pan 12s linear infinite" }}>MADE CLEAR.</span></h2><p className="mx-auto mt-6 max-w-[43ch] text-[14px] leading-[1.65] text-ink/60 sm:text-[15px]">Everything businesses usually ask before starting a website, app, store, campaign or automation with us.</p></div>
        <div className="mt-14 grid items-start gap-6 pb-12 sm:grid-cols-2 sm:gap-x-8 lg:gap-x-12">
          {[0, 1].map((column) => (
          <div key={column} className={`flex flex-col gap-6 max-sm:contents sm:gap-8 lg:gap-10 ${column ? "sm:mt-16" : ""}`}>
          {QUESTIONS.map((faq, index) => {
            if (index % 2 !== column) return null;
            const expanded = open === index;
            const onLight = faq.color === BRAND.lime || faq.color === BRAND.mint;
            return (
              <article
                key={faq.question}
                data-faq-card
                data-index={index}
                className={`group relative overflow-hidden rounded-[22px] border border-ink/12 bg-paper/70 shadow-[0_22px_52px_-42px_rgba(14,15,20,0.45)] backdrop-blur-sm transition-[translate,rotate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-40px_rgba(14,15,20,0.55)] ${index % 2 ? "hover:rotate-[0.6deg]" : "hover:rotate-[-0.6deg]"}`}
                style={{ borderColor: expanded ? `${faq.color}66` : undefined, order: index }}
              >
                {/* Colour bar: a stub that grows across when the card opens */}
                <span className="absolute inset-x-0 top-0 h-[3px] bg-ink/[0.06]" />
                <span className="absolute left-0 top-0 h-[3px] w-full origin-left transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ background: faq.color, scale: expanded ? "1 1" : "0.16 1" }} />
                {/* Scroll-scrubbed light sweep */}
                <span data-faq-sweep aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-60" style={{ background: `linear-gradient(100deg, transparent, ${faq.color}14, transparent)` }} />
                <span aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full blur-3xl transition-opacity duration-700" style={{ background: `${faq.color}26`, opacity: expanded ? 1 : 0 }} />

                <button type="button" onClick={() => setOpen(expanded ? -1 : index)} aria-expanded={expanded} className="relative flex w-full items-start gap-4 p-6 text-left sm:gap-5 sm:p-7">
                  <span data-faq-icon className="grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-500" style={{ background: expanded ? faq.color : `${faq.color}1f` }}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={expanded && !onLight ? BRAND.paper : BRAND.ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={faq.icon} /></svg>
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2 text-mono-9 tracking-[0.18em] text-ink/45 uppercase">
                      <i className="h-1.5 w-1.5 rounded-full" style={{ background: faq.color }} />
                      {faq.category}
                    </span>
                    <h3 className="display mt-2.5 text-[clamp(1.25rem,2.3vw,1.75rem)] leading-[0.95]">{faq.question}</h3>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[21px] leading-none transition-[rotate,background-color,color,border-color] duration-500" style={{ color: expanded ? (onLight ? BRAND.ink : BRAND.paper) : faq.color, background: expanded ? faq.color : "transparent", borderColor: expanded ? faq.color : "rgba(14,15,20,0.12)", rotate: expanded ? "45deg" : "0deg" }}>+</span>
                </button>

                <div className="relative grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ gridTemplateRows: expanded ? "1fr" : "0fr", opacity: expanded ? 1 : 0 }}>
                  <div className="overflow-hidden">
                    <div className="px-6 pb-7 sm:pl-[5.5rem] sm:pr-7">
                      {faq.answer.map((line, lineIndex) => (
                        <p
                          key={line}
                          className="text-[13.5px] leading-[1.65] text-ink/65 transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          style={{ opacity: expanded ? 1 : 0, translate: expanded ? "0 0" : "0 10px", transitionDelay: expanded ? `${150 + lineIndex * 110}ms` : "0ms" }}
                        >
                          {line}
                        </p>
                      ))}
                      <a
                        href={faq.link.href}
                        className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-mono-9 tracking-[0.16em] uppercase transition-[opacity,translate,background-color] duration-500 hover:bg-ink/[0.04]"
                        style={{ borderColor: `${faq.color}88`, color: BRAND.ink, opacity: expanded ? 1 : 0, translate: expanded ? "0 0" : "0 10px", transitionDelay: expanded ? `${150 + faq.answer.length * 110}ms` : "0ms" }}
                      >
                        <i className="h-1.5 w-1.5 rounded-full" style={{ background: faq.color }} />
                        {faq.link.label}
                        <span aria-hidden>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
