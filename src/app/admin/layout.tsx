import type { Metadata } from "next";
import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/utils";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: { default: "Paneli", template: "%s · Paneli" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireStaff();

  return (
    <div className="min-h-dvh md:grid md:grid-cols-[240px_minmax(0,1fr)]">
      <AdminNav name={user.name} roleLabel={ROLE_LABELS[user.role] ?? user.role} />
      <div className="mx-auto w-full max-w-3xl pb-24 md:pb-8">
        {user.mustChangePassword && (
          <div className="bg-warning-soft px-4 py-2 text-sm text-warning">
            Keni një fjalëkalim të përkohshëm.{" "}
            <Link href="/admin/me-shume#fjalekalimi" className="font-semibold underline underline-offset-2">
              Ndryshojeni tani
            </Link>
            .
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
