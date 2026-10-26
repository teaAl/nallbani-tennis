"use client";

import { useState } from "react";
import { useActionForm } from "@/components/admin/use-action-form";
import { CheckboxCard, Field, FormSection, Row, SelectField } from "@/components/admin/fields";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { DeleteForm } from "@/components/admin/delete-form";
import { deleteBooking, saveBooking } from "./actions";

export type BookingFormValues = {
  id: string;
  courtId: string;
  date: string;
  startTime: string;
  hours: number;
  name: string;
  phone: string | null;
  price: string | null;
  paid: boolean;
  notes: string | null;
};

export type CourtOption = { id: string; name: string; guestHourly: number | null };

const HOURS = [
  { value: "1", label: "1 orë" },
  { value: "1.5", label: "1,5 orë" },
  { value: "2", label: "2 orë" },
  { value: "3", label: "3 orë" },
];

export function BookingForm({
  booking,
  courts,
  defaults,
}: {
  booking?: BookingFormValues;
  courts: CourtOption[];
  defaults: { date: string; courtId?: string };
}) {
  const { state, onSubmit, pending } = useActionForm<FormState>(saveBooking, {});
  const [courtId, setCourtId] = useState(booking?.courtId ?? defaults.courtId ?? courts[0]?.id ?? "");
  const [hours, setHours] = useState(String(booking?.hours ?? 1));
  const [price, setPrice] = useState(booking?.price ?? "");
  const [touched, setTouched] = useState(!!booking);

  const court = courts.find((c) => c.id === courtId);
  const suggested = court?.guestHourly ? Math.round(court.guestHourly * Number(hours)) : null;
  const shownPrice = touched ? price : suggested !== null ? String(suggested) : "";
  const showForce = !!state.error && state.error.startsWith("Mbivendoset");

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {booking && <input type="hidden" name="id" value={booking.id} />}
        <FormSection>
          <Row>
            <SelectField label="Fusha" name="courtId" value={courtId} onChange={(e) => setCourtId(e.target.value)} options={courts.map((c) => ({ value: c.id, label: c.name }))} />
            <Field label="Data" name="date" type="date" required defaultValue={booking?.date ?? defaults.date} />
          </Row>
          <Row>
            <Field label="Ora e fillimit" name="startTime" type="time" required step={1800} defaultValue={booking?.startTime ?? "18:00"} />
            <SelectField label="Kohëzgjatja" name="hours" value={hours} onChange={(e) => setHours(e.target.value)} options={HOURS} />
          </Row>
        </FormSection>

        <FormSection title="Kush">
          <Field label="Emri" name="name" required defaultValue={booking?.name} placeholder="p.sh. Arben Hoxha" />
          <Field label="Telefoni" name="phone" type="tel" defaultValue={booking?.phone ?? ""} placeholder="+355 6…" />
        </FormSection>

        <FormSection title="Pagesa">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="price" className="text-sm font-medium">
              Çmimi
            </label>
            <div className="flex h-12 items-center overflow-hidden rounded-md border border-input bg-card shadow-xs">
              <input
                id="price"
                name="price"
                type="text"
                inputMode="numeric"
                value={shownPrice}
                onChange={(e) => {
                  setTouched(true);
                  setPrice(e.target.value);
                }}
                className="h-full min-w-0 grow bg-transparent px-3 text-base tabular-nums outline-none"
              />
              <span className="flex h-full items-center border-l px-3 text-sm whitespace-nowrap text-ink-muted">Lekë</span>
            </div>
            {!touched && suggested !== null && <span className="text-xs text-ink-muted">Llogaritur nga çmimi i fushës. Ndryshojeni nëse keni rënë dakord ndryshe.</span>}
          </div>
          <CheckboxCard name="paid" title="E paguar" description="Hiqe derisa të paguajë." defaultChecked={booking?.paid ?? false} />
          <Field label="Shënim" name="notes" defaultValue={booking?.notes ?? ""} placeholder="p.sh. do raketa, vjen me 3 veta" maxLength={300} />
        </FormSection>

        <FormMessage state={state} />
        {showForce && <CheckboxCard name="force" title="Ruaje gjithsesi" description="E di që mbivendoset." />}
        <SubmitButton pending={pending}>{booking ? "Ruaj ndryshimet" : "Shëno rezervimin"}</SubmitButton>
      </form>
      {booking && <DeleteForm action={deleteBooking} id={booking.id} label="Fshi rezervimin" confirmText={`Të fshihet rezervimi i ${booking.name}?`} />}
    </div>
  );
}
