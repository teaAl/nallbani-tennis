"use client";

import { useActionState, useState } from "react";
import { CheckboxCard, Field, FormSection, MoneyField, Row, SelectField, TextareaField } from "@/components/admin/fields";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { PhotoField } from "@/components/admin/photo-field";
import { DeleteForm } from "@/components/admin/delete-form";
import { cn } from "@/lib/utils";
import { deleteActivity, saveActivity } from "./actions";

export type ActivityFormValues = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  place: string | null;
  courtId: string | null;
  price: string | null;
  guestCoachName: string | null;
  guestCoachBio: string | null;
  capacity: number | null;
  published: boolean;
  photoUrl: string | null;
};

export function ActivityForm({
  activity,
  courts,
  categories,
}: {
  activity?: ActivityFormValues;
  courts: { id: string; name: string }[];
  /** categories used before, offered as quick picks */
  categories: string[];
}) {
  const [state, action] = useActionState<FormState, FormData>(saveActivity, {});
  const [category, setCategory] = useState(activity?.category ?? "");
  const quick = [...new Set(["Yoga", "Pilates", "Trajner i ftuar", "Kamp", "Turne", ...categories])];

  return (
    <div className="flex flex-col gap-4">
      <form action={action} className="flex flex-col gap-4">
        {activity && <input type="hidden" name="id" value={activity.id} />}

        <FormSection>
          <Field label="Titulli" name="title" required defaultValue={activity?.title} placeholder="p.sh. Yoga në fushë" />
          <div className="flex flex-col gap-2">
            <Field
              label="Kategoria"
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="p.sh. Yoga, Kamp, Turne"
            />
            <div className="flex flex-wrap gap-1.5">
              {quick.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "h-8 rounded-full border px-3 text-sm font-medium",
                    category === c ? "border-lime bg-lime text-ink" : "border-line-strong bg-card",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <span className="text-xs text-ink-muted">Shkruani çfarëdo ose zgjidhni një nga të mëparshmet.</span>
          </div>
        </FormSection>

        <FormSection title="Kur dhe ku">
          <Row>
            <Field label="Data" name="startDate" type="date" required defaultValue={activity?.startDate} />
            <Field label="Deri më (opsionale)" name="endDate" type="date" defaultValue={activity?.endDate ?? ""} />
          </Row>
          <Row>
            <Field label="Nga ora" name="startTime" type="time" defaultValue={activity?.startTime ?? ""} />
            <Field label="Deri në orën" name="endTime" type="time" defaultValue={activity?.endTime ?? ""} />
          </Row>
          <Row>
            <SelectField
              label="Fusha"
              name="courtId"
              defaultValue={activity?.courtId ?? ""}
              options={[{ value: "", label: "Jo në fushë" }, ...courts.map((c) => ({ value: c.id, label: c.name }))]}
              hint="Zë orët e fushës atë ditë."
            />
            <Field label="Vendi (tekst)" name="place" defaultValue={activity?.place ?? ""} placeholder="p.sh. Salla, Parku" />
          </Row>
          <Row>
            <MoneyField label="Çmimi" name="price" unit="Lekë / person" defaultValue={activity?.price} hint="Bosh = falas." />
            <Field label="Vende gjithsej" name="capacity" type="number" inputMode="numeric" min={1} max={500} defaultValue={activity?.capacity ?? ""} />
          </Row>
        </FormSection>

        <FormSection title="Trajneri i ftuar (opsionale)">
          <Field label="Emri" name="guestCoachName" defaultValue={activity?.guestCoachName ?? ""} placeholder="p.sh. Era Kola" />
          <Field label="Një rresht për të" name="guestCoachBio" defaultValue={activity?.guestCoachBio ?? ""} placeholder="p.sh. Instruktore e certifikuar yoga" />
        </FormSection>

        <FormSection title="Për faqen">
          <TextareaField
            label="Përshkrimi"
            name="description"
            defaultValue={activity?.description ?? ""}
            placeholder="Çfarë do të bëni, çfarë duhet të sjellin, për kë është."
          />
          <PhotoField currentUrl={activity?.photoUrl} />
          <CheckboxCard
            name="published"
            title="Publiko në faqe"
            description="Shfaqet te Aktivitetet dhe në Ballinë derisa të kalojë data."
            defaultChecked={activity?.published ?? false}
          />
        </FormSection>

        <FormMessage state={state} />
        <SubmitButton>{activity ? "Ruaj ndryshimet" : "Krijo aktivitetin"}</SubmitButton>
      </form>

      {activity && (
        <DeleteForm action={deleteActivity} id={activity.id} label="Fshi aktivitetin" confirmText={`Të fshihet "${activity.title}"?`} />
      )}
    </div>
  );
}
