"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import type { CourtAvailability } from "@/lib/availability";
import { toHHmm } from "@/lib/courts";
import { WEEKDAYS, WEEKDAYS_SHORT, formatDateSq, isoToDate } from "@/lib/dates";
import { cn, formatMoney } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

const ACC = ["të dielën", "të hënën", "të martën", "të mërkurën", "të enjten", "të premten", "të shtunën"];

const capFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function toMinutes(h: string) {
  const [hh, mm] = h.split(":").map(Number);
  return hh * 60 + mm;
}

export function SlotPicker({
  courts,
  todayIso,
  whatsapp,
  maxSlots = 3,
}: {
  courts: CourtAvailability[];
  todayIso: string;
  whatsapp: string | null;
  maxSlots?: number;
}) {
  const [courtIdx, setCourtIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [sel, setSel] = useState<string[]>([]);

  const court = courts[courtIdx];
  if (!court) return null;
  const day = court.days[dayIdx]!;
  const slot = court.slotMinutes;
  const free = day.offered.filter((h) => !day.taken.includes(h));

  const toggle = (h: string) => {
    setSel((cur) => {
      if (cur.length === 0) return [h];
      const mins = cur.map(toMinutes);
      const min = Math.min(...mins);
      const max = Math.max(...mins);
      const hm = toMinutes(h);
      if (cur.includes(h)) return hm === min || hm === max ? cur.filter((x) => x !== h) : [h];
      if (hm === max + slot && cur.length < maxSlots) return [...cur, h].sort();
      if (hm === min - slot && cur.length < maxSlots) return [h, ...cur].sort();
      return [h];
    });
  };

  const n = sel.length;
  let message = "";
  let price: number | null = null;
  if (n > 0) {
    const start = toMinutes(sel[0]!);
    const end = toMinutes(sel[n - 1]!) + slot;
    const hoursLabel = n * slot === 60 ? "1 orë" : `${(n * slot) / 60} orë`;
    message = `Përshëndetje! Dua të rezervoj ${court.name} ${ACC[isoToDate(day.date).getUTCDay()]} ${formatDateSq(day.date)}, ora ${toHHmm(start)}–${toHHmm(end)} (${hoursLabel}).`;
    price = court.guestHourly !== null ? Math.round((court.guestHourly * n * slot) / 60) : null;
  }
  const waHref = whatsapp && message ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}` : null;

  const chip = "h-11 rounded-lg border-[1.5px] text-[15px] font-semibold tabular-nums";

  return (
    <section className="flex min-w-0 flex-col gap-5 rounded-2xl border bg-card p-5 md:p-6">
      <div>
        <h2 className="display text-3xl md:text-4xl">Rezervoni në WhatsApp</h2>
        <p className="mt-1 text-sm text-ink-muted">Zgjidhni një orë të lirë dhe mesazhi shkruhet vetë. Klubi konfirmon brenda ditës.</p>
      </div>

      {courts.length > 1 && (
        <div className="flex flex-col gap-2">
          <span className="eyebrow">Fusha</span>
          <div className="grid grid-cols-2 gap-2">
            {courts.map((c, i) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={i === courtIdx}
                onClick={() => {
                  setCourtIdx(i);
                  setSel([]);
                }}
                className={cn(chip, i === courtIdx ? "border-navy bg-navy text-on-navy" : "border-line-strong bg-card")}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="eyebrow">Dita</span>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {court.days.map((d, i) => {
            const freeCount = d.offered.filter((h) => !d.taken.includes(h)).length;
            const wd = isoToDate(d.date).getUTCDay();
            const on = i === dayIdx;
            return (
              <button
                key={d.date}
                type="button"
                aria-pressed={on}
                aria-label={`${WEEKDAYS[wd]} ${formatDateSq(d.date)}, ${freeCount} orë të lira`}
                onClick={() => {
                  setDayIdx(i);
                  setSel([]);
                }}
                className={cn(
                  "flex h-[68px] w-[68px] shrink-0 flex-col items-center justify-center rounded-lg border-[1.5px]",
                  on ? "border-navy bg-navy text-on-navy" : "border-line-strong bg-card",
                )}
              >
                <span className="text-[11px] tracking-wider uppercase opacity-80">{d.date === todayIso ? "sot" : WEEKDAYS_SHORT[wd]}</span>
                <span className="font-display text-2xl leading-6 font-bold">{isoToDate(d.date).getUTCDate()}</span>
                <span className="text-[11px] opacity-80">{freeCount === 0 ? "plot" : `${freeCount} të lira`}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <span className="eyebrow">Orët e lira</span>
          <span className="text-sm text-ink-muted">{capFirst(formatDateSq(day.date, { weekday: true }))}</span>
        </div>
        {day.note && (
          <p className="flex items-start gap-2 rounded-lg bg-warning-soft px-3 py-2 text-sm text-warning">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {day.note}
          </p>
        )}
        {day.offered.length === 0 ? (
          <div className="rounded-lg bg-sunken p-4">
            <p className="font-semibold">Nuk ka orë të lira këtë ditë.</p>
            <p className="text-sm text-ink-muted">Provoni një ditë tjetër ose na shkruani për një orar jashtë listës.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-2">
              {day.offered.map((h) => {
                const taken = day.taken.includes(h);
                const on = sel.includes(h);
                return (
                  <button
                    key={h}
                    type="button"
                    disabled={taken}
                    aria-pressed={on}
                    aria-label={`${h}${taken ? ", e zënë" : on ? ", e zgjedhur" : ", e lirë"}`}
                    onClick={() => toggle(h)}
                    className={cn(
                      chip,
                      taken
                        ? "cursor-not-allowed border-line bg-sunken text-line-strong line-through"
                        : on
                          ? "border-navy bg-navy text-on-navy"
                          : "border-line-strong bg-card",
                    )}
                  >
                    {h}
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-ink-muted">
              {free.length === 0 ? "Të gjitha orët janë zënë këtë ditë." : `Prekni një orë. Prekni edhe orën pas saj për deri në ${maxSlots} orë radhazi.`}
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-1.5 rounded-lg bg-sunken p-3.5">
        <span className="eyebrow text-ink-muted">Mesazhi juaj</span>
        <p className="text-[15px]">{message || "Zgjidhni një orë të lirë më lart dhe mesazhi shkruhet këtu."}</p>
        {price !== null && (
          <div className="mt-1 flex items-baseline justify-between border-t pt-2">
            <span className="text-sm text-ink-muted">Çmimi orientues</span>
            <span className="display text-2xl text-lime-ink tabular-nums">
              {formatMoney(price)} <span className="font-sans text-sm font-normal text-ink-muted normal-case">Lekë</span>
            </span>
          </div>
        )}
      </div>

      {whatsapp ? (
        <a
          href={waHref ?? "#"}
          target="_blank"
          rel="noopener"
          aria-disabled={!waHref}
          className={cn(
            "flex h-13 items-center justify-center gap-2 rounded-lg text-lg font-semibold",
            waHref ? "bg-lime text-ink" : "pointer-events-none bg-line text-ink-muted",
          )}
        >
          <WhatsAppIcon className="size-5" /> Dërgo kërkesën në WhatsApp
        </a>
      ) : (
        <p className="text-center text-sm text-ink-muted">Numri i WhatsApp nuk është vendosur ende. Na telefononi.</p>
      )}
      <p className="text-center text-xs text-ink-muted">Hapet WhatsApp me mesazhin e gatshëm. Asgjë nuk dërgohet pa e shtypur ju.</p>
    </section>
  );
}
