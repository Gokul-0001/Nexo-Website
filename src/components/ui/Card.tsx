import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
export default function Card({ children, className, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) { return <div className={cn("rounded-[22px] border border-ink/8 bg-paper-2", className)} {...props}>{children}</div>; }
