import "../../globals.css";
import type React from "react";
import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOpts";
import { redirect } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Nallbani Tennis",
  description: "Elevate your game with us",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <html lang={locale}>
      <body className={`${poppins.variable} ${nunito.variable} antialiased`}>
        <NextIntlClientProvider /*messages={messages}*/>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-y-auto p-6 bg-pana">
                {children}
              </main>
              <Toaster />
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
