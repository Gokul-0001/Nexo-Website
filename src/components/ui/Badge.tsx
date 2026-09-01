import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
export default function Badge({ children, className, ...props }: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) { return <span className={cn("rounded-full px-3 py-1.5 font-mono text-[9px] tracking-[0.14em] uppercase", className)} {...props}>{children}</span>; }
