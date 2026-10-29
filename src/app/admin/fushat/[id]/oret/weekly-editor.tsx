"use client";

import { useState } from "react";
import { useActionForm } from "@/components/admin/use-action-form";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { HourGrid } from "@/components/admin/hour-grid";
import { hoursToRanges } from "@/lib/courts";
import { WEEKDAYS, WEEKDAYS_MON_FIRST } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { saveWeeklyHours } from "../../actions";

const SHORT: Record<number, string> = { 1: "H", 2: "M", 3: "Më", 4: "E", 5: "P", 6: "Sh", 0: "D" };

export function WeeklyEditor({ courtId, initial }: { courtId: string; initial: Record<number, string[]> }) {
  const { state, onSubmit, pending } = useActionForm<FormState>(saveWeeklyHours, {});
  const [week, setWeek] = useState<Record<number, string[]>>(initial);
  const [day, setDay] = useState(1);
  const setDayHours = (d: number, hours: string[]) => setWeek((w) => ({ ...w, [d]: hours }));

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="courtId" value={courtId} />
      {WEEKDAYS_MON_FIRST.flatMap((d) => (week[d] ?? []).map((h) => <input key={`${d}-${h}`} type="hidden" name={`hours_${d}`} value={h} />))}

      <div className="grid grid-cols-7 gap-1.5">
        {WEEKDAYS_MON_FIRST.map((d) => {
          const n = week[d]?.length ?? 0;
          const on = day === d;
          return (
            <button
              key={d}
              type="button"
              aria-pressed={on}
              aria-label={`${WEEKDAYS[d]}, ${n ? `${n} orë` : "mbyllur"}`}
              onClick={() => setDay(d)}
              className={cn(
                "flex h-14 flex-col items-center justify-center rounded-lg border-[1.5px]",
                on ? "border-navy bg-navy text-on-navy" : "border-line-strong bg-card text-ink",
              )}
            >
              <span className="text-sm font-semibold">{SHORT[d]}</span>
              <span className="text-[11px] opacity-80">{n ? `${n} orë` : "–"}</span>
            </button>
          );
        })}
      </div>

      <section className="flex flex-col gap-3 rounded-xl border bg-card p-4">
        <h2 className="font-display text-2xl font-bold capitalize">{WEEKDAYS[day]}</h2>
        <HourGrid name={`_ignored_${day}`} value={week[day] ?? []} onChange={(h) => setDayHours(day, h)} />
      </section>

      <section className="flex flex-col gap-2">
        <span className="eyebrow">Kopjo orët e kësaj dite te</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setWeek((w) => ({ ...w, 1: w[day] ?? [], 2: w[day] ?? [], 3: w[day] ?? [], 4: w[day] ?? [], 5: w[day] ?? [] }))}
            className="h-11 rounded-lg border-[1.5px] border-line-strong bg-card text-[15px] font-semibold"
          >
            Hënë – Premte
          </button>
          <button
            type="button"
            onClick={() => setWeek(() => Object.fromEntries([0, 1, 2, 3, 4, 5, 6].map((d) => [d, week[day] ?? []])))}
            className="h-11 rounded-lg border-[1.5px] border-line-strong bg-card text-[15px] font-semibold"
          >
            Gjithë javën
          </button>
        </div>
      </section>

      <section className="rounded-lg bg-sunken p-3.5">
        <span className="eyebrow text-ink-muted">Si do të duket në faqe</span>
        <dl className="mt-1.5">
          {WEEKDAYS_MON_FIRST.map((d) => (
            <div key={d} className="flex justify-between gap-3 text-sm leading-6">
              <dt className="text-ink-muted capitalize">{WEEKDAYS[d]}</dt>
              <dd className="font-semibold tabular-nums">{hoursToRanges(week[d] ?? [])}</dd>
            </div>
          ))}
        </dl>
      </section>

      <FormMessage state={state} />
      <SubmitButton pending={pending}>Ruaj orët e javës</SubmitButton>
    </form>
  );
}
