import "../globals.css";
import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
import Footer from "@/components/common/footer";
import NavigationMenu from "@/components/common/navbar/navigationMenu";
import BookingLayout from "@/layouts/bookingLayout";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

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

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  console.log("locale on rootlayout > ", locale);

  return (
    <>
      <BookingLayout>
        <html lang={locale}>
          <body
            className={`${poppins.variable} ${nunito.variable} antialiased`}
          >
            <NextIntlClientProvider /*messages={messages}*/>
              <main className="flex flex-col min-h-screen h-full w-full overflow-x-hidden">
                <NavigationMenu />
                <div className="flex-grow overflow-auto h-screen flex flex-col gap-10">
                  {children}
                  <div className="w-full  z-30">
                    <Footer />
                  </div>
                </div>
              </main>
            </NextIntlClientProvider>
          </body>
        </html>
      </BookingLayout>
    </>
  );
}
