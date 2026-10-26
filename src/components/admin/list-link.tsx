import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function ListLink({
  href,
  title,
  meta,
  badge,
  leading,
}: {
  href: string;
  title: string;
  meta?: string;
  badge?: React.ReactNode;
  leading?: React.ReactNode;
}) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-xl border bg-card px-3.5 py-3 text-ink">
      {leading}
      <span className="flex min-w-0 grow flex-col">
        <span className="font-semibold">{title}</span>
        {meta && <span className="truncate text-sm text-ink-muted">{meta}</span>}
      </span>
      {badge}
      <ChevronRight className="size-5 shrink-0 text-line-strong" />
    </Link>
  );
}

export function StatusBadge({ kind, children }: { kind: "success" | "warning" | "muted" | "danger"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase",
        kind === "success" && "bg-success-soft text-success",
        kind === "warning" && "bg-warning-soft text-warning",
        kind === "muted" && "bg-sunken text-ink-muted",
        kind === "danger" && "bg-danger-soft text-danger",
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({ title, text }: { title: string; text?: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 text-center">
      <p className="font-semibold">{title}</p>
      {text && <p className="mt-1 text-sm text-ink-muted">{text}</p>}
    </div>
  );
}

/** Floating "add" button above the tab bar on phones. */
export function Fab({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="fixed right-4 bottom-[92px] z-10 flex h-13 items-center gap-2 rounded-full bg-lime py-3 pr-5 pl-4 font-semibold text-ink shadow-[0_1px_2px_rgba(15,31,61,0.06),0_6px_20px_rgba(15,31,61,0.18)] md:absolute md:right-6 md:bottom-6"
    >
      <Plus className="size-5" strokeWidth={2.5} />
      {label}
    </Link>
  );
}
