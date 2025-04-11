"use client";

import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { Toaster } from "@/components/ui/toaster";

export default function AdminPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 ">
          <AdminDashboard />
        </main>
        <Toaster />
      </div>
    </div>
  );
}
