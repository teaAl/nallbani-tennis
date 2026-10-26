"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  pendingText = "Po ruhet…",
  className,
  variant,
  pending: pendingProp,
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  /** pass this when the form submits through useActionForm; otherwise useFormStatus is used */
  pending?: boolean;
}) {
  const status = useFormStatus();
  const pending = pendingProp ?? status.pending;
  return (
    <Button
      type="submit"
      variant={variant}
      disabled={pending}
      className={cn("h-12 text-base font-semibold", !variant && "bg-lime text-ink hover:bg-lime/90", className)}
    >
      {pending ? pendingText : children}
    </Button>
  );
}
