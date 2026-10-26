"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { NAV } from "./nav";
import { cn } from "@/lib/utils";

export function SiteHeader({ clubName, waHref }: { clubName: string; waHref: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-30 bg-navy text-on-navy">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" aria-label={`${clubName}, ballina`} className="flex items-center" onClick={() => setOpen(false)}>
          <Image src="/images/logo-nt.png" alt={clubName} width={160} height={48} className="h-10 w-auto" priority />
        </Link>
        <nav aria-label="Kryesore" className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active(n.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 font-semibold",
                active(n.href) ? "bg-navy-dark text-on-navy" : "text-on-navy-muted hover:text-on-navy",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="grow" />
        {waHref && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener"
            className="flex h-11 items-center gap-2 rounded-lg bg-lime px-3 font-semibold text-ink md:px-4"
          >
            <WhatsAppIcon className="size-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        )}
        <button
          type="button"
          aria-label={open ? "Mbyll menunë" : "Hap menunë"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-11 items-center justify-center rounded-lg border-[1.5px] border-on-navy-muted md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <nav aria-label="Kryesore" className="border-t border-navy-dark px-4 pt-2 pb-4 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              aria-current={active(n.href) ? "page" : undefined}
              className={cn("block rounded-lg px-3 py-3 text-lg font-semibold", active(n.href) ? "bg-navy-dark" : "text-on-navy-muted")}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
