"use client";

import { useActionForm } from "@/components/admin/use-action-form";
import { Field, Row } from "@/components/admin/fields";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { addAnnouncement } from "./actions";

export function AddAnnouncementForm() {
  const { state, onSubmit, pending } = useActionForm<FormState>(addAnnouncement, {});
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <Field label="Teksti" name="text" required maxLength={200} placeholder="p.sh. Fushat mbyllen më 1 nëntor për mirëmbajtje." />
      <Row>
        <Field label="Nga data (opsionale)" name="startsAt" type="date" />
        <Field label="Deri më (opsionale)" name="endsAt" type="date" />
      </Row>
      <FormMessage state={state} />
      <SubmitButton pending={pending} variant="outline" className="self-start border-2 border-navy bg-card text-ink hover:bg-sunken">
        Shto njoftimin
      </SubmitButton>
    </form>
  );
}
