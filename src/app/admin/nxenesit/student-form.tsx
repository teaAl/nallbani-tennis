"use client";

import { useActionForm } from "@/components/admin/use-action-form";
import { Label } from "@/components/ui/label";
import { CheckboxCard, Field, FormSection, MoneyField, Row, SelectField, TextareaField } from "@/components/admin/fields";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { DeleteForm } from "@/components/admin/delete-form";
import { deleteStudent, saveStudent } from "./actions";

export type StudentFormValues = {
  id: string;
  name: string;
  phone: string | null;
  dateOfBirth: string | null;
  level: string | null;
  parentName: string | null;
  parentPhone: string | null;
  monthlyFee: string | null;
  notes: string | null;
  active: boolean;
  groupIds: string[];
};

export function StudentForm({ student, groups }: { student?: StudentFormValues; groups: { id: string; name: string }[] }) {
  const { state, onSubmit, pending } = useActionForm<FormState>(saveStudent, {});

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {student && <input type="hidden" name="id" value={student.id} />}

        <FormSection>
          <Field label="Emri dhe mbiemri" name="name" required defaultValue={student?.name} autoComplete="off" />
          <Row>
            <Field label="Telefoni" name="phone" type="tel" defaultValue={student?.phone ?? ""} placeholder="+355 6…" />
            <Field label="Datëlindja" name="dateOfBirth" type="date" defaultValue={student?.dateOfBirth ?? ""} />
          </Row>
          <SelectField
            label="Niveli"
            name="level"
            defaultValue={student?.level ?? ""}
            options={[
              { value: "", label: "Pa nivel" },
              { value: "BEGINNER", label: "Fillestar" },
              { value: "INTERMEDIATE", label: "Mesatar" },
              { value: "ADVANCED", label: "Avancuar" },
            ]}
          />
        </FormSection>

        <FormSection title="Prindi (për fëmijët)">
          <Row>
            <Field label="Emri i prindit" name="parentName" defaultValue={student?.parentName ?? ""} />
            <Field label="Telefoni i prindit" name="parentPhone" type="tel" defaultValue={student?.parentPhone ?? ""} placeholder="+355 6…" />
          </Row>
        </FormSection>

        <FormSection title="Grupet dhe pagesa">
          <div className="flex flex-col gap-2">
            <Label>Grupet</Label>
            {groups.length === 0 ? (
              <p className="text-sm text-ink-muted">Ende nuk ka grupe. Krijoni një te Përmbajtja → Grupet.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {groups.map((g) => (
                  <label key={g.id} className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card px-3 py-2.5">
                    <input type="checkbox" name="groups" value={g.id} defaultChecked={student?.groupIds.includes(g.id)} className="size-5 accent-lime-ink" />
                    <span className="font-medium">{g.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <MoneyField label="Tarifa mujore" name="monthlyFee" unit="Lekë / muaj" defaultValue={student?.monthlyFee} hint="Bosh nëse nuk paguan mujore (p.sh. mësime private)." />
        </FormSection>

        <FormSection>
          <TextareaField label="Shënime" name="notes" defaultValue={student?.notes ?? ""} placeholder="Alergji, preferenca, çfarëdo që duhet mbajtur mend." />
          <CheckboxCard name="active" title="Nxënës aktiv" description="Hiqe kur largohet nga klubi; historiku ruhet." defaultChecked={student?.active ?? true} />
        </FormSection>

        <FormMessage state={state} />
        <SubmitButton pending={pending}>{student ? "Ruaj ndryshimet" : "Regjistro nxënësin"}</SubmitButton>
      </form>

      {student && (
        <DeleteForm
          action={deleteStudent}
          id={student.id}
          label="Fshi nxënësin"
          confirmText={`Të fshihet ${student.name} bashkë me pagesat, prezencën dhe shënimet? Nëse thjesht është larguar, hiqni "Nxënës aktiv" në vend të fshirjes.`}
        />
      )}
    </div>
  );
}
