"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "../forms";
import { createAccount, resetPassword, type FormState } from "./actions";

export function CreateAccountForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(createAccount, {});

  return (
    <form action={action} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Emri</Label>
        <Input id="name" name="name" required className="h-11" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="off" required className="h-11" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="role">Roli</Label>
        <select
          id="role"
          name="role"
          defaultValue="COACH"
          className="h-11 rounded-md border border-input bg-card px-3 text-base"
        >
          <option value="COACH">Trajner</option>
          <option value="ADMIN">Administrator</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Fjalëkalim i përkohshëm</Label>
        <Input id="password" name="password" type="text" autoComplete="off" minLength={8} required className="h-11" />
        <span className="text-xs text-ink-muted">Të paktën 8 karaktere. Personi do ta ndryshojë në hyrjen e parë.</span>
      </div>
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="h-11 self-start">
        {pending ? "Po krijohet…" : "Krijo llogarinë"}
      </Button>
    </form>
  );
}

export function ResetPasswordForm({ userId }: { userId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(resetPassword, {});

  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="id" value={userId} />
      <div className="flex gap-2">
        <Input
          name="password"
          type="text"
          autoComplete="off"
          minLength={8}
          required
          placeholder="Fjalëkalim i ri i përkohshëm"
          aria-label="Fjalëkalim i ri i përkohshëm"
          className="h-10"
        />
        <Button type="submit" variant="outline" disabled={pending} className="h-10 shrink-0">
          {pending ? "…" : "Rivendos"}
        </Button>
      </div>
      <FormMessage state={state} />
    </form>
  );
}
