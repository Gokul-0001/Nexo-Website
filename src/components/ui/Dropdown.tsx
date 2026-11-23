"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/brand";

export type Option = { id: string; label: string; hint?: string; color?: string };

/** Brand-styled dropdown: a labelled pill that opens a floating list. Closes on pick, outside click or Esc. */
export default function Dropdown({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Option[] }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);
  const current = options.find((option) => option.id === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => { if (!box.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div ref={box} data-tool className={`relative w-full sm:w-auto sm:min-w-[200px] sm:flex-1 lg:flex-none ${open ? "z-40" : "z-10"}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-[16px] border px-4 py-2.5 text-left backdrop-blur-sm transition-[background-color,border-color,color] duration-300"
        style={{ background: open ? BRAND.ink : "rgba(255,255,255,0.8)", borderColor: open ? BRAND.ink : "rgba(14,15,20,0.12)", color: open ? BRAND.paper : BRAND.ink }}
      >
        {current.color && <i className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: current.color }} />}
        <span className="min-w-0 flex-1">
          <span className="block text-mono-9 tracking-[0.16em] uppercase opacity-50">{label}</span>
          <span className="mt-0.5 block truncate text-[14px] font-semibold">{current.label}</span>
        </span>
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 transition-transform duration-300" style={{ rotate: open ? "180deg" : "0deg" }} fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
      </button>

      {open && (
        <ul role="listbox" aria-label={label} className="dd-menu absolute left-0 right-0 top-[calc(100%+8px)] min-w-[220px] overflow-hidden rounded-[18px] border border-ink/10 bg-paper p-1.5 shadow-[0_30px_60px_-24px_rgba(14,15,20,0.45)]">
          {options.map((option) => {
            const on = option.id === value;
            return (
              <li key={option.id} role="option" aria-selected={on}>
                <button
                  type="button"
                  onClick={() => { onChange(option.id); setOpen(false); }}
                  className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition-colors duration-200 hover:bg-ink/[0.05]"
                  style={{ background: on ? "rgba(14,15,20,0.06)" : undefined }}
                >
                  <i className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: option.color ?? (on ? BRAND.ink : "rgba(14,15,20,0.15)") }} />
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[13.5px] ${on ? "font-semibold text-ink" : "text-ink/75"}`}>{option.label}</span>
                    {option.hint && <span className="block text-[11.5px] text-ink/45">{option.hint}</span>}
                  </span>
                  {on && <span className="text-[13px] font-bold text-ink">✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** Menu open animation — add `${DROPDOWN_CSS}` to the <style> of any section that uses Dropdown. */
export const DROPDOWN_CSS = `@keyframes dd-menu { from { opacity: 0; transform: translateY(-6px) scale(0.98); } to { opacity: 1; transform: none; } } .dd-menu { animation: dd-menu 0.25s cubic-bezier(0.16,1,0.3,1); transform-origin: top; } @media (prefers-reduced-motion: reduce) { .dd-menu { animation: none; } }`;
