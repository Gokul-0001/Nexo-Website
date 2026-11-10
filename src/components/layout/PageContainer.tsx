import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import WebGLBackground from "@/components/background/WebGLBackground";

/**
 * Shared page chrome used by every route.
 *
 * Mounts the shared `WebGLBackground` once at the top so the same ambient
 * background experience is present on every page. The background sits at
 * `fixed inset-0 z-0 pointer-events-none`, so it never intercepts clicks
 * and every page element stacks cleanly above it.
 */
export default function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative min-h-screen bg-paper text-ink", className)}>
      <WebGLBackground />
      {children}
    </div>
  );
}