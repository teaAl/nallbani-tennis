import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const control = "h-12 text-base";

export function Field({
  label,
  name,
  hint,
  className,
  ...props
}: React.ComponentProps<typeof Input> & { label: string; name: string; hint?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} className={control} {...props} />
      {hint && <span className="text-xs text-ink-muted">{hint}</span>}
    </div>
  );
}

export function TextareaField({
  label,
  name,
  hint,
  className,
  ...props
}: React.ComponentProps<typeof Textarea> & { label: string; name: string; hint?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} name={name} className="text-base" rows={3} {...props} />
      {hint && <span className="text-xs text-ink-muted">{hint}</span>}
    </div>
  );
}

export function SelectField({
  label,
  name,
  hint,
  options,
  className,
  ...props
}: React.ComponentProps<"select"> & {
  label: string;
  name: string;
  hint?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        className="h-12 rounded-md border border-input bg-card px-3 text-base shadow-xs"
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <span className="text-xs text-ink-muted">{hint}</span>}
    </div>
  );
}

/** Amount in Lekë with a unit suffix. Accepts "9.000" or "9000". */
export function MoneyField({
  label,
  name,
  unit,
  hint,
  defaultValue,
  className,
}: {
  label: string;
  name: string;
  unit: string;
  hint?: string;
  defaultValue?: string | number | null;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={name}>{label}</Label>
      <div className="flex h-12 items-center overflow-hidden rounded-md border border-input bg-card shadow-xs">
        <input
          id={name}
          name={name}
          type="text"
          inputMode="numeric"
          defaultValue={defaultValue === null || defaultValue === undefined ? "" : String(defaultValue)}
          className="h-full min-w-0 grow bg-transparent px-3 text-base tabular-nums outline-none"
        />
        <span className="flex h-full items-center border-l px-3 text-sm text-ink-muted whitespace-nowrap">{unit}</span>
      </div>
      {hint && <span className="text-xs text-ink-muted">{hint}</span>}
    </div>
  );
}

export function CheckboxCard({
  name,
  title,
  description,
  defaultChecked,
}: {
  name: string;
  title: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border bg-card px-3.5 py-3">
      <span className="flex flex-col gap-0.5">
        <span className="font-semibold">{title}</span>
        {description && <span className="text-sm text-ink-muted">{description}</span>}
      </span>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="size-6 shrink-0 accent-lime-ink" />
    </label>
  );
}

export function FormSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border bg-card p-4">
      {title && <h2 className="eyebrow text-ink-muted">{title}</h2>}
      {children}
    </section>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}
