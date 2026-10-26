import Image from "next/image";
import Link from "next/link";
import { NAV } from "./nav";
import { WhatsAppIcon } from "./whatsapp-icon";

export function SiteFooter({
  clubName,
  phone,
  address,
  openingHoursText,
  waHref,
  telHref,
  instagram,
  facebook,
}: {
  clubName: string;
  phone: string | null;
  address: string | null;
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
          {address && <p className="text-on-navy-muted">{address}</p>}
          {openingHoursText && <p className="text-on-navy-muted">{openingHoursText}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <p className="eyebrow text-on-navy-muted">Faqet</p>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="font-semibold text-on-navy hover:underline">
              {n.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <p className="eyebrow text-on-navy-muted">Kontakt</p>
          {telHref && (
            <a href={telHref} className="font-semibold hover:underline">
              {phone}
            </a>
          )}
          {waHref && (
            <a href={waHref} target="_blank" rel="noopener" className="inline-flex h-11 items-center gap-2 self-start rounded-lg bg-lime px-4 font-semibold text-ink">
              <WhatsAppIcon className="size-5" /> Na shkruani në WhatsApp
            </a>
          )}
          <div className="flex gap-4 text-sm">
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener" className="text-on-navy-muted hover:text-on-navy">
                Instagram
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener" className="text-on-navy-muted hover:text-on-navy">
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-navy-dark">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-on-navy-muted">
          <span>
            © {new Date().getFullYear()} {clubName}. English? Your browser can translate this page.
          </span>
          <Link href="/hyr" className="underline-offset-4 hover:underline">
            Hyrja për stafin
          </Link>
        </div>
      </div>
    </footer>
  );
}
