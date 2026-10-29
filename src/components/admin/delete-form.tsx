"use client";

import { Button } from "@/components/ui/button";

/** A delete button that asks for confirmation before posting to the server action. */
export function DeleteForm({
  action,
  id,
  label,
  confirmText,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label: string;
  confirmText: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="outline" className="h-11 w-full border-[1.5px] border-danger font-semibold text-danger hover:bg-danger-soft hover:text-danger">
        {label}
      </Button>
    </form>
  );
}
