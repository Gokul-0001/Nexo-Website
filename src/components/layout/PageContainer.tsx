import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative min-h-screen bg-paper text-ink", className)}>{children}</div>;
}
