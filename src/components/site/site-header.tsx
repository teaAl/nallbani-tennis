"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { Underline } from "./mark";
import { NAV } from "./nav";
import { cn } from "@/lib/utils";

export function SiteHeader({ clubName, waHref }: { clubName: string; waHref: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Lock the page behind the open menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 bg-navy text-on-navy">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" aria-label={`${clubName}, ballina`} onClick={() => setOpen(false)} className="relative z-50 flex items-center">
          <Image src="/images/logo-nt.png" alt={clubName} width={160} height={48} className="h-10 w-auto" priority />
        </Link>
        <nav aria-label="Kryesore" className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const isActive = active(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative px-3 py-2 font-semibold",
                  isActive ? "text-on-navy" : "text-on-navy-muted hover:text-on-navy",
                )}
              >
                {n.label}
                {isActive && <Underline className="right-3 left-3 w-auto" />}
              </Link>
            );
          })}
        </nav>
        <div className="grow" />
        {waHref && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener"
            aria-label="Na shkruani në WhatsApp"
            className="flex h-11 items-center gap-2 rounded-lg bg-lime px-3 font-semibold text-ink hover:bg-lime/90 md:px-4"
          >
            <WhatsAppIcon className="size-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        )}
        <button
          type="button"
          aria-label={open ? "Mbyll menunë" : "Hap menunë"}
          aria-expanded={open}
          aria-controls="menu-celular"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex size-11 items-center justify-center rounded-lg border-[1.5px] border-on-navy-muted hover:bg-navy-dark md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div id="menu-celular" className="menu-enter fixed inset-0 z-40 flex flex-col bg-navy text-on-navy md:hidden" role="dialog" aria-label="Menuja">
          <nav aria-label="Kryesore" className="flex grow flex-col items-center justify-center gap-7 px-6">
            {NAV.map((n, i) => {
              const isActive = active(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  style={{ "--i": i } as React.CSSProperties}
                  className={cn(
                    "menu-item display relative text-5xl",
                    isActive ? "text-on-navy" : "text-on-navy-muted hover:text-on-navy",
                  )}
                >
                  {n.label}
                  {isActive && <Underline className="-bottom-[0.22em]" delay={350} />}
                </Link>
              );
            })}
          </nav>
          <div className="menu-item flex flex-col items-center gap-3 px-6 pb-[max(28px,env(safe-area-inset-bottom))]" style={{ "--i": NAV.length } as React.CSSProperties}>
            {waHref && (
              <a href={waHref} target="_blank" rel="noopener" className="inline-flex h-13 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-lime text-lg font-semibold text-ink">
                <WhatsAppIcon className="size-5" /> Na shkruani në WhatsApp
              </a>
            )}
            <span className="text-sm text-on-navy-muted">{clubName}</span>
          </div>
        </div>
      )}
    </header>
  );
}
