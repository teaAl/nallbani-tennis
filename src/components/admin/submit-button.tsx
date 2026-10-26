"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  pendingText = "Po ruhet…",
  className,
  variant,
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const { pending } = useFormStatus();
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
