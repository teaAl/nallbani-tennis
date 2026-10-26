import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { CourtForm } from "../court-form";

export const metadata: Metadata = { title: "Fushë e re" };

export default function NewCourtPage() {
  return (
    <>
      <PageHeader eyebrow="Fushat" title="Fushë e re" back={{ href: "/admin/fushat", label: "Kthehu" }} />
      <main className="p-4">
        <CourtForm />
      </main>
    </>
  );
}
