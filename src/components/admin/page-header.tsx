import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  back,
  right,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  back?: { href: string; label: string };
  right?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="bg-navy px-4 pt-3 pb-4 text-on-navy md:rounded-b-2xl">
      <div className="flex items-center gap-2">
        {back && (
          <Link
            href={back.href}
            aria-label={back.label}
            className="-ml-2 flex size-10 items-center justify-center rounded-lg text-on-navy hover:bg-navy-dark"
          >
            <ChevronLeft className="size-6" />
          </Link>
        )}
        <div className="min-w-0">
          {eyebrow && <p className="eyebrow text-on-navy-muted">{eyebrow}</p>}
          <h1 className="display text-[26px] leading-7 md:text-3xl">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-on-navy-muted">{subtitle}</p>}
        </div>
        <div className="grow" />
        {right}
      </div>
      {children}
    </header>
  );
}
