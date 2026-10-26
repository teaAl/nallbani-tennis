import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { NAV } from "./nav";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./whatsapp-icon";

export function SiteFooter({
  clubName,
  phone,
  address,
  mapUrl,
  openingHoursText,
  waHref,
  telHref,
  instagram,
  facebook,
}: {
  clubName: string;
  phone: string | null;
  address: string | null;
  mapUrl: string | null;
  openingHoursText: string | null;
  waHref: string | null;
  telHref: string | null;
  instagram: string | null;
  facebook: string | null;
}) {
  return (
    <footer className="mt-16 bg-navy text-on-navy">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Image src="/images/logo-nt.png" alt={clubName} width={160} height={48} className="h-10 w-auto self-start" />
          {address &&
            (mapUrl ? (
              <a href={mapUrl} target="_blank" rel="noopener" className="inline-flex items-start gap-2 text-on-navy-muted hover:text-on-navy">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span className="underline decoration-on-navy-muted/50 underline-offset-4">{address}</span>
              </a>
            ) : (
              <p className="inline-flex items-start gap-2 text-on-navy-muted">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {address}
              </p>
            ))}
          {openingHoursText && <p className="text-on-navy-muted">{openingHoursText}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <p className="eyebrow text-on-navy-muted">Faqet</p>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="self-start font-semibold text-on-navy hover:text-lime">
              {n.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <p className="eyebrow text-on-navy-muted">Kontakt</p>
          {telHref && (
            <a href={telHref} className="self-start font-semibold hover:text-lime">
              {phone}
            </a>
          )}
          {waHref && (
            <a href={waHref} target="_blank" rel="noopener" className="inline-flex h-11 items-center gap-2 self-start rounded-lg bg-lime px-4 font-semibold text-ink hover:bg-lime/90">
              <WhatsAppIcon className="size-5" /> Na shkruani në WhatsApp
            </a>
          )}
          {(instagram || facebook) && (
            <div className="flex gap-2">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener" aria-label="Instagram" className="flex size-11 items-center justify-center rounded-lg border-[1.5px] border-on-navy-muted/60 text-on-navy hover:border-lime hover:text-lime">
                  <InstagramIcon className="size-5" />
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener" aria-label="Facebook" className="flex size-11 items-center justify-center rounded-lg border-[1.5px] border-on-navy-muted/60 text-on-navy hover:border-lime hover:text-lime">
                  <FacebookIcon className="size-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-navy-dark">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-on-navy-muted">
          © {new Date().getFullYear()} {clubName}. English? Your browser can translate this page.
        </div>
      </div>
    </footer>
  );
}
