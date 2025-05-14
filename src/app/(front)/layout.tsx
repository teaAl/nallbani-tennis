import "../globals.css";
// import "../../globals.css";
import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
// import { notFound } from 'next/navigation';
import Footer from "@/components/common/footer";
import NavigationMenu from "@/components/common/navbar/navigationMenu";
import { GlobalStateProvider } from "@/context/globalStateContext";
import BookingLayout from "@/layouts/bookingLayout";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import AuthProvider from "@/context/authProvider";
import { authOptions } from "@/lib/authOpts";
import { getServerSession } from "next-auth";

// import nextI18NextConfig from "../../next-i18next.config.js";
// import { appWithTranslation } from "next-i18next";
// import type { AppProps } from "next/app";

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
  const session = await getServerSession(authOptions);
  console.log("session on rootlayout > ", session);
  const messages = getMessages();
  const locale = await getLocale();
  console.log("locale on rootlayout > ", locale);

  return (
    <>
      <GlobalStateProvider>
        <BookingLayout>
          <html lang={locale}>
            <body
              className={`${poppins.variable} ${nunito.variable} antialiased`}
            >
              <NextIntlClientProvider /*messages={messages}*/>
                <AuthProvider>
                  <main className="flex flex-col min-h-screen h-full w-full overflow-x-hidden">
                    <NavigationMenu session={session} />
                    <div className="flex-grow overflow-auto h-screen flex flex-col gap-10">
                      {children}
                      <div className="w-full  z-30">
                        <Footer />
                      </div>
                    </div>
                  </main>
                </AuthProvider>
              </NextIntlClientProvider>
            </body>
          </html>
        </BookingLayout>
      </GlobalStateProvider>
    </>
  );
}
