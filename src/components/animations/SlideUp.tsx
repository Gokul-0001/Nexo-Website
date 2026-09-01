"use client";
import type { ReactNode } from "react";
import { Reveal } from "./TextReveal";
export default function SlideUp({ children, className }: { children: ReactNode; className?: string }) { return <Reveal className={className}>{children}</Reveal>; }
