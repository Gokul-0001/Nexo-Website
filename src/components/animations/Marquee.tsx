import { BRAND } from "@/lib/brand";

export function Marquee({
  items,
  duration = 34,
  className = "",
  itemClassName = "",
  reverse = false,
}: {
  items: string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
  reverse?: boolean;
}) {
  const row = (
    <span className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t, i) => (
        <span key={i} className={`flex items-center gap-10 ${itemClassName}`}>
          {t}
          <i className="h-1.5 w-1.5 rotate-45" style={{ background: BRAND.ember }} />
        </span>
      ))}
    </span>
  );

  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div
        className="anim-marquee flex w-max group-hover:[animation-play-state:paused]"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}