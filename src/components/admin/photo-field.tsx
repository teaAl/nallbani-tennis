"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { Label } from "@/components/ui/label";

/** Picks a photo from the phone; the server action reads it from the `photo` field. */
export function PhotoField({ currentUrl, label = "Fotoja" }: { currentUrl?: string | null; label?: string }) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [removed, setRemoved] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="photo">{label}</Label>
      <div className="flex items-center gap-3">
        {preview && !removed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="size-20 shrink-0 rounded-lg object-cover" />
        ) : (
          <span className="flex size-20 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-dashed border-line-strong bg-sunken text-ink-muted">
            <ImagePlus className="size-6" />
          </span>
        )}
        <div className="flex flex-col gap-2">
          <label className="inline-flex h-11 cursor-pointer items-center rounded-lg border-[1.5px] border-line-strong bg-card px-4 text-[15px] font-semibold">
            {preview && !removed ? "Ndrysho foton" : "Zgjidh një foto"}
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setRemoved(false);
                }
              }}
            />
          </label>
          {currentUrl && !removed && (
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <input type="checkbox" name="removePhoto" className="size-4 accent-lime-ink" onChange={(e) => setRemoved(e.target.checked)} />
              Hiqe foton
            </label>
          )}
        </div>
      </div>
      <span className="text-xs text-ink-muted">JPG, PNG ose WebP deri në 5 MB.</span>
    </div>
  );
}
