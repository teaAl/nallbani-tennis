// Photo uploads to Vercel Blob. Needs BLOB_READ_WRITE_TOKEN (set by the Blob store in Vercel).
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export function blobConfigured() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export type PhotoResult = { url: string } | { error: string } | null;

/**
 * Reads the `photo` file field. Returns null when no file was chosen,
 * { url } after a successful upload, or { error } with a message for the form.
 */
export async function uploadPhotoField(formData: FormData, folder: string, field = "photo"): Promise<PhotoResult> {
  const file = formData.get(field);
  if (!(file instanceof File) || file.size === 0) return null;
  if (!blobConfigured()) return { error: "Ngarkimi i fotove nuk është aktivizuar ende (mungon BLOB_READ_WRITE_TOKEN)." };
  if (!ALLOWED.has(file.type)) return { error: "Fotoja duhet të jetë JPG, PNG ose WebP." };
  if (file.size > MAX_BYTES) return { error: "Fotoja është më e madhe se 5 MB." };

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : file.type === "image/gif" ? "gif" : "jpg";
  const blob = await put(`${folder}/${Date.now()}.${ext}`, file, { access: "public", addRandomSuffix: true });
  await prisma.mediaAsset.create({ data: { url: blob.url, pathname: blob.pathname, kind: folder } });
  return { url: blob.url };
}

/** Best-effort delete of a photo we uploaded earlier. Never throws. */
export async function deletePhoto(url: string | null | undefined) {
  if (!url || !blobConfigured()) return;
  try {
    await del(url);
    await prisma.mediaAsset.deleteMany({ where: { url } });
  } catch {
    /* ignore */
  }
}
