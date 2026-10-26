"use client";

import { useActionState } from "react";
import { CheckboxCard, Field, FormSection, MoneyField, Row, SelectField, TextareaField } from "@/components/admin/fields";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { DeleteForm } from "@/components/admin/delete-form";
import { deleteOffering, saveOffering } from "./actions";

export const PRICE_UNITS: Record<string, string> = {
  PER_HOUR: "Lekë / orë",
  PER_SESSION: "Lekë / seancë",
  PER_MONTH: "Lekë / muaj",
  PER_PACKAGE: "Lekë / paketë",
};

export type OfferingFormValues = {
  id: string;
  title: string;
  kind: string | null;
  description: string | null;
  price: string | null;
  priceUnit: string;
  sortOrder: number;
  published: boolean;
};

export function OfferingForm({ offering }: { offering?: OfferingFormValues }) {
  const [state, action] = useActionState<FormState, FormData>(saveOffering, {});

  return (
    <div className="flex flex-col gap-4">
      <form action={action} className="flex flex-col gap-4">
        {offering && <input type="hidden" name="id" value={offering.id} />}
        <FormSection>
          <Field label="Titulli" name="title" required defaultValue={offering?.title} placeholder="p.sh. Mësim privat" />
          <Field label="Etiketa (opsionale)" name="kind" defaultValue={offering?.kind ?? ""} placeholder="p.sh. 1 me 1, Paketë, Provë falas" hint="Shfaqet si etiketë e vogël mbi kartë." />
          <Row>
            <MoneyField label="Çmimi" name="price" unit="Lekë" defaultValue={offering?.price} />
            <SelectField
              label="Për"
              name="priceUnit"
              defaultValue={offering?.priceUnit ?? "PER_HOUR"}
              options={Object.entries(PRICE_UNITS).map(([value, label]) => ({ value, label: label.replace("Lekë / ", "") }))}
            />
          </Row>
          <TextareaField label="Përshkrimi" name="description" defaultValue={offering?.description ?? ""} placeholder="Sa zgjat, çfarë përfshin, për kë është." />
          <Field label="Renditja" name="sortOrder" type="number" inputMode="numeric" defaultValue={offering?.sortOrder ?? 0} hint="Numër më i vogël = më lart në listë." />
          <CheckboxCard name="published" title="E publikuar në faqe" defaultChecked={offering?.published ?? false} />
        </FormSection>
        <FormMessage state={state} />
        <SubmitButton>{offering ? "Ruaj ndryshimet" : "Krijo kursin"}</SubmitButton>
      </form>
      {offering && <DeleteForm action={deleteOffering} id={offering.id} label="Fshi kursin" confirmText={`Të fshihet "${offering.title}"?`} />}
    </div>
  );
}
