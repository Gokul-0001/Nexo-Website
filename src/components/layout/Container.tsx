import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
export default function Container({ children, className, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) { return <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8", className)} {...props}>{children}</div>; }
