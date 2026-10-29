import { cn } from "@/lib/utils";

/** The hand-drawn lime stroke from the design, drawn in on first paint. */
export function Underline({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("pointer-events-none absolute right-0 bottom-0 left-0 h-[0.32em] w-full", className)}
    >
      <path
        d="M3 10 C 45 4, 125 3, 197 7"
        fill="none"
        stroke="var(--lime)"
        strokeWidth="6"
        strokeLinecap="round"
        pathLength="1"
        className="mark-draw"
        style={{ animationDelay: `${delay}ms` }}
      />
    </svg>
  );
}

/** A heading whose first word carries the lime underline. */
export function MarkedHeading({
  text,
  as: Tag = "h1",
  className,
  style,
  delay = 300,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const [first, ...rest] = text.trim().split(/\s+/);
  return (
    <Tag className={className} style={style}>
      <span className="relative inline-block">
        {first}
        <Underline className="translate-y-[0.1em]" delay={delay} />
      </span>
      {rest.length > 0 && ` ${rest.join(" ")}`}
    </Tag>
  );
}
