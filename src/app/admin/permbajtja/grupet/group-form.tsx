"use client";

import { useActionForm } from "@/components/admin/use-action-form";
import { Label } from "@/components/ui/label";
import { CheckboxCard, Field, FormSection, MoneyField, Row, SelectField, TextareaField } from "@/components/admin/fields";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { WeekdayPicker } from "@/components/admin/weekday-picker";
import { PhotoField } from "@/components/admin/photo-field";
import { DeleteForm } from "@/components/admin/delete-form";
import { deleteGroup, saveGroup } from "./actions";

export type GroupFormValues = {
  id: string;
  name: string;
  level: string | null;
  ageMin: number | null;
  ageMax: number | null;
  weekdays: number[];
  startTime: string;
  endTime: string;
  startDate: string | null;
  endDate: string | null;
  monthlyPrice: string | null;
  capacity: number | null;
  courtId: string | null;
  description: string | null;
  published: boolean;
  photoUrl: string | null;
};

export function GroupForm({ group, courts }: { group?: GroupFormValues; courts: { id: string; name: string }[] }) {
  const { state, onSubmit, pending } = useActionForm<FormState>(saveGroup, {});

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {group && <input type="hidden" name="id" value={group.id} />}

        <FormSection>
          <Field label="Emri i grupit" name="name" required defaultValue={group?.name} placeholder="p.sh. Grupi i fëmijëve" />
          <Row>
            <Field label="Mosha nga" name="ageMin" type="number" inputMode="numeric" min={3} max={99} defaultValue={group?.ageMin ?? ""} />
            <Field label="Mosha deri" name="ageMax" type="number" inputMode="numeric" min={3} max={99} defaultValue={group?.ageMax ?? ""} />
          </Row>
          <SelectField
            label="Niveli"
            name="level"
            defaultValue={group?.level ?? ""}
            options={[
              { value: "", label: "Pa nivel" },
              { value: "BEGINNER", label: "Fillestar" },
              { value: "INTERMEDIATE", label: "Mesatar" },
              { value: "ADVANCED", label: "Avancuar" },
            ]}
          />
        </FormSection>

        <FormSection title="Orari">
          <div className="flex flex-col gap-1.5">
            <Label>Ditët</Label>
            <WeekdayPicker name="weekdays" defaultValue={group?.weekdays ?? []} />
          </div>
          <Row>
            <Field label="Nga ora" name="startTime" type="time" required defaultValue={group?.startTime ?? "17:00"} />
            <Field label="Deri në orën" name="endTime" type="time" required defaultValue={group?.endTime ?? "18:00"} />
          </Row>
          <Row>
            <SelectField
              label="Fusha"
              name="courtId"
              defaultValue={group?.courtId ?? ""}
              options={[{ value: "", label: "Pa fushë" }, ...courts.map((c) => ({ value: c.id, label: c.name }))]}
            />
            <Field label="Vende gjithsej" name="capacity" type="number" inputMode="numeric" min={1} max={100} defaultValue={group?.capacity ?? ""} />
          </Row>
          <Row>
            <Field label="Fillon më" name="startDate" type="date" defaultValue={group?.startDate ?? ""} />
            <Field label="Mbaron më" name="endDate" type="date" defaultValue={group?.endDate ?? ""} />
          </Row>
        </FormSection>

        <FormSection title="Për faqen">
          <MoneyField label="Çmimi mujor" name="monthlyPrice" unit="Lekë / muaj" defaultValue={group?.monthlyPrice} hint="Lëreni bosh nëse nuk doni ta shfaqni." />
          <TextareaField
            label="Përshkrimi"
            name="description"
            defaultValue={group?.description ?? ""}
            placeholder="Çfarë bëni, për kë është, çfarë duhet të sjellin."
            hint="Shfaqet te Kurset. 2–3 fjali mjaftojnë."
          />
          <PhotoField currentUrl={group?.photoUrl} />
          <CheckboxCard
            name="published"
            title="E publikuar në faqe"
            description="Hiqe për ta fshehur pa e fshirë grupin."
            defaultChecked={group?.published ?? false}
          />
        </FormSection>

        <FormMessage state={state} />
        <SubmitButton pending={pending}>{group ? "Ruaj ndryshimet" : "Krijo grupin"}</SubmitButton>
      </form>

      {group && (
        <DeleteForm
          action={deleteGroup}
          id={group.id}
          label="Fshi grupin"
          confirmText={`Të fshihet grupi "${group.name}"? Nxënësit mbeten, por humbasin këtë grup.`}
        />
      )}
    </div>
  );
}
