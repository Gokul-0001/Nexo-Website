"use client";
import type { ReactNode } from "react";
import { Reveal } from "./TextReveal";
export default function FadeIn({ children, className }: { children: ReactNode; className?: string }) { return <Reveal className={className} y={0}>{children}</Reveal>; }
