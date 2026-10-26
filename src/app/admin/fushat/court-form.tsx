"use client";

import { useActionState } from "react";
import { CheckboxCard, Field, FormSection, MoneyField, Row, SelectField, TextareaField } from "@/components/admin/fields";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { DeleteForm } from "@/components/admin/delete-form";
import { deleteCourt, saveCourt } from "./actions";

export const SURFACES: Record<string, string> = { HARD: "E fortë", CLAY: "Baltë", GRASS: "Bar", CARPET: "Tapet" };

export type CourtFormValues = {
  id: string;
  name: string;
  surface: string;
  indoor: boolean;
  active: boolean;
  guestHourly: string | null;
  memberHourly: string | null;
  description: string | null;
  sortOrder: number;
  bundles: { hours: number; price: number }[];
};

export function CourtForm({ court }: { court?: CourtFormValues }) {
  const [state, action] = useActionState<FormState, FormData>(saveCourt, {});
  const b = (i: number) => court?.bundles[i];

  return (
    <div className="flex flex-col gap-4">
      <form action={action} className="flex flex-col gap-4">
        {court && <input type="hidden" name="id" value={court.id} />}
        <FormSection>
          <Field label="Emri" name="name" required defaultValue={court?.name} placeholder="p.sh. Fusha 1" />
          <Row>
            <SelectField
              label="Sipërfaqja"
              name="surface"
              defaultValue={court?.surface ?? "HARD"}
              options={Object.entries(SURFACES).map(([value, label]) => ({ value, label }))}
            />
            <Field label="Renditja" name="sortOrder" type="number" inputMode="numeric" defaultValue={court?.sortOrder ?? 0} />
          </Row>
          <TextareaField label="Një rresht për faqen" name="description" rows={2} defaultValue={court?.description ?? ""} placeholder="p.sh. Ndriçim natën, stola, ujë" />
          <CheckboxCard name="indoor" title="E mbuluar" description="Fushë e brendshme." defaultChecked={court?.indoor ?? false} />
          <CheckboxCard name="active" title="Aktive" description="Hiqe për ta fshehur nga faqja pa e fshirë." defaultChecked={court?.active ?? true} />
        </FormSection>

        <FormSection title="Çmimet">
          <Row>
            <MoneyField label="Për vizitorë" name="guestHourly" unit="Lekë / orë" defaultValue={court?.guestHourly} />
            <MoneyField label="Për nxënësit" name="memberHourly" unit="Lekë / orë" defaultValue={court?.memberHourly} />
          </Row>
          <p className="text-sm text-ink-muted">Paketa (opsionale): numri i orëve dhe çmimi gjithsej.</p>
          {[0, 1, 2].map((i) => (
            <Row key={i}>
              <Field label={`Paketa ${i + 1}: orë`} name={`bundle${i + 1}Hours`} type="number" inputMode="numeric" min={2} max={200} defaultValue={b(i)?.hours ?? ""} />
              <MoneyField label="Çmimi gjithsej" name={`bundle${i + 1}Price`} unit="Lekë" defaultValue={b(i)?.price ?? null} />
            </Row>
          ))}
        </FormSection>

        <FormMessage state={state} />
        <SubmitButton>{court ? "Ruaj ndryshimet" : "Krijo fushën"}</SubmitButton>
      </form>
      {court && (
        <DeleteForm action={deleteCourt} id={court.id} label="Fshi fushën" confirmText={`Të fshihet "${court.name}" bashkë me orët dhe rezervimet e saj?`} />
      )}
    </div>
  );
}
