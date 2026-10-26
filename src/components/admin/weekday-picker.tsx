"use client";

import { useState } from "react";
import { WEEKDAYS, WEEKDAYS_MON_FIRST } from "@/lib/dates";
import { cn } from "@/lib/utils";

const SHORT: Record<number, string> = { 1: "H", 2: "M", 3: "Më", 4: "E", 5: "P", 6: "Sh", 0: "D" };

/** Toggle buttons for weekdays; submits as repeated `name` fields. */
export function WeekdayPicker({ name, defaultValue = [] }: { name: string; defaultValue?: number[] }) {
  const [days, setDays] = useState<number[]>(defaultValue);
  const toggle = (d: number) => setDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {days.map((d) => (
        <input key={d} type="hidden" name={name} value={d} />
      ))}
      {WEEKDAYS_MON_FIRST.map((d) => {
        const on = days.includes(d);
        return (
          <button
            key={d}
            type="button"
            aria-pressed={on}
            aria-label={WEEKDAYS[d]}
            onClick={() => toggle(d)}
            className={cn(
              "h-11 rounded-lg border-[1.5px] text-sm font-semibold",
              on ? "border-navy bg-navy text-on-navy" : "border-line-strong bg-card text-ink",
            )}
          >
            {SHORT[d]}
          </button>
        );
      })}
    </div>
  );
}
