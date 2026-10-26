"use client";

import { useState } from "react";
import { hoursToRanges, toHHmm } from "@/lib/courts";
import { cn } from "@/lib/utils";

const PRESETS: { label: string; hours: string[] }[] = [
  { label: "Mëngjes 9–13", hours: ["09:00", "10:00", "11:00", "12:00"] },
  { label: "Pasdite 17–22", hours: ["17:00", "18:00", "19:00", "20:00", "21:00"] },
];

/**
 * Tap the one-hour slots a court can be reserved. Submits as repeated `name` fields.
 * `onChange` lets a parent (the weekly editor) keep several days in sync.
 */
export function HourGrid({
  name,
  value,
  defaultValue = [],
  onChange,
  firstHour = 7,
  lastHour = 22,
  disabled,
}: {
  name: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (hours: string[]) => void;
  firstHour?: number;
  lastHour?: number;
  disabled?: boolean;
}) {
  const [inner, setInner] = useState<string[]>(defaultValue);
  const hours = value ?? inner;
  const set = (next: string[]) => {
    const sorted = [...new Set(next)].sort();
    if (value === undefined) setInner(sorted);
    onChange?.(sorted);
  };
  const toggle = (h: string) => set(hours.includes(h) ? hours.filter((x) => x !== h) : [...hours, h]);

  const all: string[] = [];
  for (let h = firstHour; h <= lastHour; h++) all.push(toHHmm(h * 60));

  return (
    <div className={cn("flex flex-col gap-3", disabled && "pointer-events-none opacity-40")}>
      {hours.map((h) => (
        <input key={h} type="hidden" name={name} value={h} />
      ))}
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="text-ink-muted">{hours.length ? `${hours.length} orë` : "Asnjë orë"}</span>
        <span className="font-semibold tabular-nums">{hoursToRanges(hours)}</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {all.map((h) => {
          const on = hours.includes(h);
          return (
            <button
              key={h}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(h)}
              className={cn(
                "h-11 rounded-lg border-[1.5px] text-[15px] font-semibold tabular-nums",
                on ? "border-navy bg-navy text-on-navy" : "border-line-strong bg-card text-ink",
              )}
            >
              {h}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => set(p.hours)}
            className="h-9 rounded-lg border-[1.5px] border-line-strong bg-card px-3 text-sm font-semibold"
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => set([])}
          className="h-9 rounded-lg border-[1.5px] border-danger bg-card px-3 text-sm font-semibold text-danger"
        >
          Pastro
        </button>
      </div>
    </div>
  );
}
