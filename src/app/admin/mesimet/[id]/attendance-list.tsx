"use client";

import { useOptimistic, useTransition } from "react";
import { Check, X } from "lucide-react";
import { cn, initials } from "@/lib/utils";
import { setAttendance } from "./actions";

type Status = "PRESENT" | "ABSENT" | null;
export type AttendanceRow = { userId: string; name: string; status: Status };

export function AttendanceList({ lessonId, rows }: { lessonId: string; rows: AttendanceRow[] }) {
  const [optimistic, apply] = useOptimistic(rows, (state, next: { userId: string; status: Status }) =>
    state.map((r) => (r.userId === next.userId ? { ...r, status: next.status } : r)),
  );
  const [pending, startTransition] = useTransition();

  const set = (userId: string, status: Status) =>
    startTransition(async () => {
      apply({ userId, status });
      await setAttendance({ lessonId, userId, status: status ?? "CLEAR" });
    });

  const present = optimistic.filter((r) => r.status === "PRESENT").length;

  return (
    <div className="flex flex-col gap-2" aria-busy={pending}>
      <p className="text-sm text-ink-muted">
        <b className="font-semibold text-ink">{present}</b> nga {optimistic.length} prezent
      </p>
      {optimistic.map((r) => (
        <div key={r.userId} className="flex items-center gap-3 rounded-xl border bg-card py-2 pr-2 pl-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime-soft text-sm font-bold text-lime-ink">{initials(r.name)}</span>
          <span className="min-w-0 grow truncate font-semibold">{r.name}</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              aria-pressed={r.status === "PRESENT"}
              aria-label={`${r.name}: prezent`}
              onClick={() => set(r.userId, r.status === "PRESENT" ? null : "PRESENT")}
              className={cn("flex size-11 items-center justify-center rounded-lg border-[1.5px]", r.status === "PRESENT" ? "border-success bg-success text-white" : "border-line-strong text-ink-muted")}
            >
              <Check className="size-5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              aria-pressed={r.status === "ABSENT"}
              aria-label={`${r.name}: mungon`}
              onClick={() => set(r.userId, r.status === "ABSENT" ? null : "ABSENT")}
              className={cn("flex size-11 items-center justify-center rounded-lg border-[1.5px]", r.status === "ABSENT" ? "border-danger bg-danger text-white" : "border-line-strong text-ink-muted")}
            >
              <X className="size-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
