import Image from "next/image";
import { formatDateSq, WEEKDAYS, WEEKDAYS_SHORT } from "@/lib/dates";
import { formatMoney, LEVEL_LABELS } from "@/lib/utils";
import { WhatsAppIcon } from "./whatsapp-icon";

export const PRICE_UNIT_LABELS: Record<string, string> = {
  PER_HOUR: "Lekë / orë",
  PER_SESSION: "Lekë / seancë",
  PER_MONTH: "Lekë / muaj",
  PER_PACKAGE: "Lekë / paketë",
};

function Chip({ children, tone = "lime" }: { children: React.ReactNode; tone?: "lime" | "warm" | "muted" }) {
  const cls = tone === "lime" ? "bg-lime-soft text-lime-ink" : tone === "warm" ? "bg-warning-soft text-warning" : "bg-sunken text-ink-muted";
  return <span className={`inline-flex h-7 items-center rounded-full px-2.5 text-xs font-semibold tracking-wider uppercase ${cls}`}>{children}</span>;
}

function AskButton({ href }: { href: string | null }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener" className="inline-flex h-11 items-center gap-2 rounded-lg bg-navy px-4 font-semibold text-on-navy">
      <WhatsAppIcon className="size-4" /> Pyet
    </a>
  );
}

function Price({ amount, unit }: { amount: number | string | null; unit: string }) {
  if (amount === null) return null;
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="display text-3xl text-lime-ink tabular-nums">{formatMoney(amount)}</span>
      <span className="text-sm text-ink-muted">{unit}</span>
    </span>
  );
}

export type GroupCardData = {
  name: string;
  level: string | null;
  ageMin: number | null;
  ageMax: number | null;
  weekdays: number[];
  startTime: string;
  endTime: string;
  endDate: string | null;
  monthlyPrice: string | null;
  capacity: number | null;
  memberCount: number;
  courtName: string | null;
  description: string | null;
  photoUrl: string | null;
};

export function GroupCard({ g, askHref }: { g: GroupCardData; askHref: string | null }) {
  const free = g.capacity !== null ? Math.max(0, g.capacity - g.memberCount) : null;
  const days = g.weekdays.length
    ? g.weekdays.length <= 2
      ? g.weekdays.map((d) => WEEKDAYS[d]).join(" dhe ")
      : g.weekdays.map((d) => WEEKDAYS_SHORT[d]).join(", ")
    : null;
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border bg-card">
      {g.photoUrl && (
        <Image src={g.photoUrl} alt="" width={640} height={360} className="aspect-[16/9] w-full object-cover" />
      )}
      <div className="flex grow flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Chip>{[g.level && LEVEL_LABELS[g.level], g.ageMin !== null || g.ageMax !== null ? `${g.ageMin ?? ""}–${g.ageMax ?? ""} vjeç` : null].filter(Boolean).join(" · ") || "Grup"}</Chip>
          {free !== null && (free > 0 ? <Chip tone="warm">{free} vende</Chip> : <Chip tone="muted">Plot</Chip>)}
        </div>
        <h3 className="font-display text-3xl leading-8 font-bold">{g.name}</h3>
        {days && (
          <p className="font-semibold">
            <span className="capitalize">{days}</span>, {g.startTime}–{g.endTime}
          </p>
        )}
        <p className="text-sm text-ink-muted">
          {[g.courtName, g.endDate ? `deri më ${formatDateSq(g.endDate)}` : null].filter(Boolean).join(" · ")}
        </p>
        {g.description && <p className="text-ink-muted">{g.description}</p>}
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <Price amount={g.monthlyPrice} unit="Lekë / muaj" />
          <AskButton href={askHref} />
        </div>
      </div>
    </article>
  );
}

export type OfferingCardData = {
  title: string;
  kind: string | null;
  description: string | null;
  price: string | null;
  priceUnit: string;
};

export function OfferingCard({ o, askHref }: { o: OfferingCardData; askHref: string | null }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border bg-card p-5">
      {o.kind && (
        <div>
          <Chip>{o.kind}</Chip>
        </div>
      )}
      <h3 className="font-display text-3xl leading-8 font-bold">{o.title}</h3>
      {o.description && <p className="text-ink-muted">{o.description}</p>}
      <div className="mt-auto flex items-end justify-between gap-3 pt-2">
        <Price amount={o.price} unit={PRICE_UNIT_LABELS[o.priceUnit] ?? "Lekë"} />
        <AskButton href={askHref} />
      </div>
    </article>
  );
}

export type ActivityCardData = {
  title: string;
  category: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  place: string | null;
  price: string | null;
  guestCoachName: string | null;
  guestCoachBio: string | null;
  capacity: number | null;
  photoUrl: string | null;
};

export function ActivityCard({ a, askHref, past }: { a: ActivityCardData; askHref: string | null; past?: boolean }) {
  const when = a.endDate && a.endDate !== a.startDate ? `${formatDateSq(a.startDate)} – ${formatDateSq(a.endDate)}` : formatDateSq(a.startDate, { weekday: true });
  return (
    <article className={`flex flex-col overflow-hidden rounded-2xl border bg-card ${past ? "opacity-70" : ""}`}>
      {a.photoUrl && <Image src={a.photoUrl} alt="" width={640} height={360} className="aspect-[16/9] w-full object-cover" />}
      <div className="flex grow flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          <Chip>{a.category}</Chip>
          {a.guestCoachName && <Chip tone="warm">Trajner i ftuar</Chip>}
        </div>
        <h3 className="font-display text-3xl leading-8 font-bold">{a.title}</h3>
        <p className="font-semibold capitalize">
          {when}
          {a.startTime && <span className="normal-case">, {a.startTime}{a.endTime ? `–${a.endTime}` : ""}</span>}
        </p>
        {a.place && <p className="text-sm text-ink-muted">{a.place}</p>}
        {a.description && <p className="text-ink-muted">{a.description}</p>}
        {a.guestCoachName && (
          <p className="text-sm">
            <span className="font-semibold">{a.guestCoachName}</span>
            {a.guestCoachBio && <span className="text-ink-muted"> · {a.guestCoachBio}</span>}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          {a.price !== null ? <Price amount={a.price} unit="Lekë / person" /> : <span className="font-semibold text-lime-ink">Falas</span>}
          {!past && <AskButton href={askHref} />}
        </div>
      </div>
    </article>
  );
}
