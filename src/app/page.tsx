import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const clubName = s?.clubName ?? "Tennis Nallbani";
  const waHref = s?.whatsapp ? `https://wa.me/${s.whatsapp.replace(/\D/g, "")}` : null;
  const telHref = s?.phone ? `tel:${s.phone.replace(/[^+\d]/g, "")}` : null;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="bg-navy text-on-navy">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Link href="/" aria-label={`${clubName}, ballina`} className="flex items-center">
            <Image src="/images/logo-nt.png" alt={clubName} width={160} height={48} className="h-10 w-auto" priority />
          </Link>
          <div className="grow" />
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener"
              aria-label="Shkruaj në WhatsApp"
              className="flex size-11 items-center justify-center rounded-lg bg-lime text-ink"
            >
              <MessageCircle className="size-5" />
            </a>
          )}
        </div>
      </header>

      <main className="grow">
        <section className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pt-12 pb-10 md:pt-20">
          {s?.tagline && <p className="eyebrow text-lime-ink">{s.tagline}</p>}
          <h1 className="display text-5xl md:text-7xl">{s?.heroTitle ?? clubName}</h1>
          {s?.heroText && <p className="max-w-[40ch] text-lg text-ink-muted">{s.heroText}</p>}
          <div className="mt-2 flex flex-wrap gap-3">
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-lime px-5 font-semibold text-ink"
              >
                <MessageCircle className="size-5" /> Na shkruani në WhatsApp
              </a>
            )}
            {telHref && (
              <a href={telHref} className="inline-flex h-12 items-center gap-2 rounded-lg border-2 border-navy px-5 font-semibold">
                <Phone className="size-5" /> {s?.phone}
              </a>
            )}
          </div>
        </section>

        {(s?.openingHoursText || s?.address) && (
          <section className="mx-auto grid max-w-6xl gap-3 px-4 pb-12 sm:grid-cols-2">
            {s.openingHoursText && (
              <div className="rounded-xl border bg-card p-4">
                <p className="eyebrow text-ink-muted">Orari</p>
                <p className="mt-1 font-semibold">{s.openingHoursText}</p>
              </div>
            )}
            {s.address && (
              <div className="rounded-xl border bg-card p-4">
                <p className="eyebrow text-ink-muted">Ku jemi</p>
                <p className="mt-1 font-semibold">{s.address}</p>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="bg-navy text-on-navy">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8">
          <Image src="/images/logo-nt.png" alt={clubName} width={160} height={48} className="h-10 w-auto self-start" />
          {(s?.phone || s?.address) && (
            <span className="font-semibold">{[s?.phone, s?.address].filter(Boolean).join(" · ")}</span>
          )}
          <p className="text-sm text-on-navy-muted">English? Your browser can translate this page.</p>
          <Link href="/hyr" className="text-xs text-on-navy-muted underline-offset-4 hover:underline">
            Hyrja për stafin
          </Link>
        </div>
      </footer>
    </div>
  );
}
