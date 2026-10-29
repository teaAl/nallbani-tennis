import { Megaphone } from "lucide-react";

export function AnnouncementBanner({ items }: { items: { id: string; text: string }[] }) {
  if (items.length === 0) return null;
  return (
    <div className="bg-lime text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2 text-sm font-medium">
        {items.map((a) => (
          <p key={a.id} className="flex items-start gap-2">
            <Megaphone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{a.text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
