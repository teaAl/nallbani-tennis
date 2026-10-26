"use client";

import { useActionForm } from "@/components/admin/use-action-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, type LoginState } from "./actions";

export function LoginForm({ next }: { next?: string }) {
  const { state, onSubmit, pending } = useActionForm<LoginState>(login, {});

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {next && <input type="hidden" name="next" value={next} />}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="username" required defaultValue={state.email} className="h-12 text-base" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Fjalëkalimi</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required className="h-12 text-base" />
      </div>
      {state.error && (
        <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-sm font-medium text-danger">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={pending} className="h-12 bg-lime text-base font-semibold text-ink hover:bg-lime/90">
        {pending ? "Po hyn…" : "Hyr"}
      </Button>
    </form>
  );
}
