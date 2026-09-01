import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("w-full border-b border-ink/15 bg-transparent py-3 text-ink outline-none transition-colors focus:border-ink", className)} {...props} />;
}
