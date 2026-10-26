"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CalendarDays, Users, PenLine, LayoutGrid, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/admin", label: "Sot", icon: CalendarDays },
  { href: "/admin/nxenesit", label: "Nxënësit", icon: Users },
  { href: "/admin/permbajtja", label: "Përmbajtja", icon: PenLine },
  { href: "/admin/fushat", label: "Fushat", icon: LayoutGrid },
  { href: "/admin/me-shume", label: "Më shumë", icon: MoreHorizontal },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav({ name, roleLabel }: { name: string; roleLabel: string }) {
  const pathname = usePathname();

  return (
    <>
      {/* Phone: bottom tab bar */}
      <nav
        aria-label="Paneli"
        className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t bg-card px-1 pt-1.5 pb-[max(10px,env(safe-area-inset-bottom))] md:hidden"
      >
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-w-0 flex-col items-center gap-1 rounded-lg px-0.5 pt-2 pb-1.5 text-[12px] leading-[14px] font-semibold",
                active ? "bg-lime-soft text-ink" : "text-ink-muted",
              )}
            >
              <Icon className={cn("size-6", active && "text-lime-ink")} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Tablet and up: left sidebar */}
      <aside className="hidden md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:gap-6 md:border-r md:bg-navy md:p-5 md:text-on-navy">
        <div className="flex flex-col gap-3">
          <Image src="/images/logo-nt.png" alt="Tennis Nallbani" width={160} height={48} className="h-10 w-auto self-start" />
          <div>
            <p className="font-semibold leading-tight">{name}</p>
            <p className="text-sm text-on-navy-muted">{roleLabel}</p>
          </div>
        </div>
        <nav aria-label="Paneli" className="flex flex-col gap-1">
          {TABS.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 font-semibold",
                  active ? "bg-lime text-ink" : "text-on-navy-muted hover:bg-navy-dark hover:text-on-navy",
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
