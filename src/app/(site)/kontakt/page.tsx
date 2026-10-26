import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getSiteSettings, telLink, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { MarkedHeading } from "@/components/site/mark";

export const metadata: Metadata = {
  title: "Kontakt dhe rreth nesh",
  description: "Ku na gjeni, orari i hapjes, telefoni dhe WhatsApp i klubit të tenisit.",
};

export default async function ContactPage() {
  const s = await getSiteSettings();
  const waHref = whatsappLink(s.whatsapp, "Përshëndetje!");
  const telHref = telLink(s.phone);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-12">
      <header className="flex flex-col gap-3">
        <p className="eyebrow text-lime-ink">Na gjeni</p>
        <MarkedHeading text="Kontakt" className="display text-5xl md:text-7xl" />
      </header>

      <div className="grid gap-6 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:items-start">
        <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 md:sticky md:top-24">
          {s.phone && (
            <p className="flex items-center gap-3">
              <Phone className="size-5 shrink-0 text-lime-ink" aria-hidden="true" />
              {telHref ? <a href={telHref} className="font-semibold">{s.phone}</a> : <span className="font-semibold">{s.phone}</span>}
            </p>
          )}
          {s.email && (
            <p className="flex items-center gap-3">
              <Mail className="size-5 shrink-0 text-lime-ink" aria-hidden="true" />
              <a href={`mailto:${s.email}`} className="font-semibold">{s.email}</a>
            </p>
          )}
          {s.address && (
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-lime-ink" aria-hidden="true" />
              {s.mapUrl ? (
                <a href={s.mapUrl} target="_blank" rel="noopener" className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:text-lime-ink">
                  {s.address}
                </a>
              ) : (
                <span className="font-semibold">{s.address}</span>
              )}
            </p>
          )}
          {s.openingHoursText && (
            <p className="flex items-center gap-3">
              <Clock className="size-5 shrink-0 text-lime-ink" aria-hidden="true" />
              <span className="font-semibold">{s.openingHoursText}</span>
            </p>
          )}
          {waHref && (
            <a href={waHref} target="_blank" rel="noopener" className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-lime font-semibold text-ink">
              <WhatsAppIcon className="size-5" /> Na shkruani në WhatsApp
            </a>
          )}
        </section>

        {(s.aboutText || s.coachName) && (
          <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 md:p-8">
            <h2 className="display text-3xl">Rreth nesh</h2>
            {s.aboutText && <p className="max-w-[68ch] whitespace-pre-line text-ink-muted">{s.aboutText}</p>}
            {s.coachName && (
              <div className="flex items-start gap-4 border-t pt-4">
                {s.coachPhotoUrl && <Image src={s.coachPhotoUrl} alt={s.coachName} width={96} height={96} className="size-20 shrink-0 rounded-full object-cover" />}
                <div>
                  <p className="eyebrow text-ink-muted">Trajneri</p>
                  <p className="font-display text-2xl font-bold">{s.coachName}</p>
                  {s.coachBio && <p className="mt-2 max-w-[68ch] whitespace-pre-line text-ink-muted">{s.coachBio}</p>}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
