"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword, type FormState } from "./actions";

export function FormMessage({ state }: { state: FormState }) {
  if (state.error) {
    return (
      <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-sm font-medium text-danger">
        {state.error}
      </p>
    );
  }
  if (state.success) {
    return (
      <p role="status" className="rounded-lg bg-success-soft px-3 py-2 text-sm font-medium text-success">
        {state.success}
      </p>
    );
  }
  return null;
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changePassword, {});

  return (
    <form action={action} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="current">Fjalëkalimi aktual</Label>
        <Input id="current" name="current" type="password" autoComplete="current-password" required className="h-11" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="next">Fjalëkalimi i ri</Label>
        <Input id="next" name="next" type="password" autoComplete="new-password" minLength={8} required className="h-11" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirm">Përsërite fjalëkalimin e ri</Label>
        <Input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={8} required className="h-11" />
      </div>
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="h-11 self-start">
        {pending ? "Po ruhet…" : "Ndrysho fjalëkalimin"}
      </Button>
    </form>
  );
}
