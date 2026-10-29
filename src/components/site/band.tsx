import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { MarkedHeading } from "./mark";

/**
 * A full-width band with its own ground, so consecutive sections read as separate.
 * `data-ball-stop` marks it as a floor for the scrolling tennis ball (home page).
 */
export function Band({ children, className, ...rest }: React.ComponentProps<"section">) {
  return (
    <section data-ball-stop className={cn("py-16 md:py-20", className)} {...rest}>
      <Reveal className="mx-auto flex max-w-6xl flex-col gap-8 px-4">{children}</Reveal>
    </section>
  );
}

/** Eyebrow + display heading + optional intro, used at the top of each band. */
export function BandHead({ eyebrow, title, text, onNavy, children }: { eyebrow?: string; title: string; text?: string; onNavy?: boolean; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className={cn("eyebrow", onNavy ? "text-lime" : "text-lime-ink")}>{eyebrow}</p>}
        <h2 className="display mt-2 text-4xl md:text-5xl">{title}</h2>
        {text && <p className={cn("mt-2 max-w-[52ch]", onNavy ? "text-on-navy-muted" : "text-ink-muted")}>{text}</p>}
      </div>
      {children}
    </div>
  );
}

/** The page opener on the inner pages: eyebrow, underlined h1 and a short intro on the cream ground. */
export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section data-ball-stop className="bg-surface">
      <header className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pt-12 pb-12 md:pt-16 md:pb-16">
        <p className="hero-item eyebrow text-lime-ink" style={{ "--i": 0 } as React.CSSProperties}>
          {eyebrow}
        </p>
        <MarkedHeading text={title} className="hero-item display text-5xl md:text-7xl" style={{ "--i": 1 } as React.CSSProperties} delay={500} />
        <p className="hero-item max-w-[48ch] text-lg text-ink-muted" style={{ "--i": 2 } as React.CSSProperties}>
          {text}
        </p>
      </header>
    </section>
  );
}
