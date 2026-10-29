"use client";

import { useState } from "react";
import { useActionForm } from "@/components/admin/use-action-form";
import { Label } from "@/components/ui/label";
import { Field, FormSection, SelectField } from "@/components/admin/fields";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { HourGrid } from "@/components/admin/hour-grid";
import { DeleteForm } from "@/components/admin/delete-form";
import { hoursToRanges } from "@/lib/courts";
import { WEEKDAYS, weekdayOf } from "@/lib/dates";
import { deleteException, saveException } from "./actions";

export type ExceptionFormValues = {
  id: string;
  courtId: string;
  date: string;
  startHours: string[];
  reason: string | null;
};

export type CourtOption = { id: string; name: string; weekly: Record<number, string[]> };

export function ExceptionForm({
  exception,
  courts,
  defaultDate,
}: {
  exception?: ExceptionFormValues;
  courts: CourtOption[];
  defaultDate: string;
}) {
  const { state, onSubmit, pending } = useActionForm<FormState>(saveException, {});
  const [courtId, setCourtId] = useState(exception?.courtId ?? courts[0]?.id ?? "");
  const [date, setDate] = useState(exception?.date ?? defaultDate);
  const [closed, setClosed] = useState(exception ? exception.startHours.length === 0 : false);
  // A new exception starts from the day's usual hours, so the coach only removes or adds a few.
  const [hours, setHours] = useState<string[]>(
    () => exception?.startHours ?? courts[0]?.weekly[weekdayOf(defaultDate)] ?? [],
  );

  const weekday = /^\d{4}-\d{2}-\d{2}$/.test(date) ? weekdayOf(date) : null;
  const court = courts.find((c) => c.id === courtId);
  const usual = court && weekday !== null ? (court.weekly[weekday] ?? []) : null;

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {exception && <input type="hidden" name="id" value={exception.id} />}
        <FormSection>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Data" name="date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
            <SelectField
              label="Fusha"
              name="courtId"
              value={courtId}
              onChange={(e) => setCourtId(e.target.value)}
              options={[
                ...courts.map((c) => ({ value: c.id, label: c.name })),
                ...(exception ? [] : [{ value: "all", label: "Të gjitha fushat" }]),
              ]}
            />
          </div>
          {weekday !== null && (
            <div className="rounded-lg bg-lime-soft px-3 py-2 text-sm">
              <b className="font-semibold capitalize">{WEEKDAYS[weekday]}.</b>{" "}
              {courtId === "all"
                ? "Vlen për të gjitha fushat aktive."
                : usual
                  ? `Zakonisht ${court?.name} ${usual.length ? `është e lirë ${hoursToRanges(usual)}` : "është e mbyllur"} këtë ditë.`
                  : ""}{" "}
              Orët më poshtë vlejnë vetëm për këtë datë.
            </div>
          )}
        </FormSection>

        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border bg-card px-3.5 py-3">
          <span className="flex flex-col gap-0.5">
            <span className="font-semibold">Mbyllur gjithë ditën</span>
            <span className="text-sm text-ink-muted">Asnjë orë nuk shfaqet në faqe këtë datë.</span>
          </span>
          <input type="checkbox" name="closed" checked={closed} onChange={(e) => setClosed(e.target.checked)} className="size-6 shrink-0 accent-lime-ink" />
        </label>

        <FormSection title="Orët e lira këtë datë">
          <HourGrid name="startHours" value={hours} onChange={setHours} disabled={closed} />
          {usual && !closed && (
            <button
              type="button"
              onClick={() => setHours(usual)}
              className="self-start text-sm font-semibold text-lime-ink underline underline-offset-4"
            >
              Rikthe orët e zakonshme
            </button>
          )}
        </FormSection>

        <FormSection>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reason">Arsyeja (shfaqet në faqe)</Label>
            <input
              id="reason"
              name="reason"
              defaultValue={exception?.reason ?? ""}
              maxLength={120}
              placeholder="p.sh. Turne, mirëmbajtje, festë"
              className="h-12 rounded-md border border-input bg-card px-3 text-base shadow-xs"
            />
            <span className="text-xs text-ink-muted">Opsionale. Vizitorët e shohin si shënim te orët e asaj dite.</span>
          </div>
        </FormSection>

        <FormMessage state={state} />
        <SubmitButton pending={pending}>{exception ? "Ruaj ndryshimet" : "Ruaj për këtë datë"}</SubmitButton>
      </form>
      {exception && <DeleteForm action={deleteException} id={exception.id} label="Fshi përjashtimin" confirmText="Të fshihet ky përjashtim? Kthehen orët e javës." />}
    </div>
  );
}
