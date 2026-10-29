import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { OfferingForm } from "../offering-form";

export const metadata: Metadata = { title: "Kurs i ri" };

export default function NewOfferingPage() {
  return (
    <>
      <PageHeader eyebrow="Përmbajtja · Kurset" title="Kurs i ri" back={{ href: "/admin/permbajtja/kurset", label: "Kthehu" }} />
      <main className="p-4">
        <OfferingForm />
      </main>
    </>
  );
}
