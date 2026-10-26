// Court slot helpers shared by admin and the public site.

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function toHHmm(minutes: number) {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** ["18:00","19:00","20:00","21:00"] → "18:00–22:00"; gaps become comma-separated ranges. */
export function hoursToRanges(startHours: string[], slotMinutes = 60): string {
  if (startHours.length === 0) return "Mbyllur";
  const sorted = [...startHours].map(toMinutes).sort((a, b) => a - b);
  const parts: string[] = [];
  let start = sorted[0]!;
  let prev = sorted[0]!;
  for (let i = 1; i <= sorted.length; i++) {
    if (i < sorted.length && sorted[i] === prev + slotMinutes) {
      prev = sorted[i]!;
      continue;
    }
    parts.push(`${toHHmm(start)}–${toHHmm(prev + slotMinutes)}`);
    if (i < sorted.length) {
      start = sorted[i]!;
      prev = sorted[i]!;
    }
  }
  return parts.join(", ");
}
