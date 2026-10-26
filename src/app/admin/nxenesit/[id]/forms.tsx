"use client";

import { useActionForm } from "@/components/admin/use-action-form";
import { Field, MoneyField, Row, TextareaField } from "@/components/admin/fields";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { addNote, addPayment } from "../actions";

export function PaymentForm({ studentId, today, defaultAmount }: { studentId: string; today: string; defaultAmount: string | null }) {
  const { state, onSubmit, pending } = useActionForm<FormState>(addPayment, {});
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input type="hidden" name="studentId" value={studentId} />
      <Row>
        <MoneyField label="Shuma" name="amount" unit="Lekë" defaultValue={defaultAmount} />
        <Field label="Data" name="date" type="date" required defaultValue={today} />
      </Row>
      <Field label="Shënim (opsionale)" name="note" placeholder="p.sh. cash, tetori" maxLength={120} />
      <FormMessage state={state} />
      <SubmitButton pending={pending} variant="outline" className="self-start border-2 border-navy bg-card text-ink hover:bg-sunken">
        Shëno pagesë
      </SubmitButton>
    </form>
  );
}

export function NoteForm({ studentId }: { studentId: string }) {
  const { state, onSubmit, pending } = useActionForm<FormState>(addNote, {});
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input type="hidden" name="studentId" value={studentId} />
      <TextareaField label="Shënim i ri" name="body" rows={2} required placeholder="p.sh. Të punojë më shumë me këmbët para goditjes së pasme." />
      <FormMessage state={state} />
      <SubmitButton pending={pending} variant="outline" className="self-start border-2 border-navy bg-card text-ink hover:bg-sunken">
        Ruaj shënimin
      </SubmitButton>
    </form>
  );
}
