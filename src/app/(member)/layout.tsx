import '../globals.css'
import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
import { GlobalStateProvider } from "@/context/globalStateContext";
import React from "react";
import NavigationMenu from '@/components/common/navbar/navigationMenu';
import Footer from '@/components/common/footer';
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from 'next-intl/server';
import AuthProvider from '@/context/authProvider';

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


export default async function Layout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    console.log('locale on rootlayout > ', locale);

    return (
        <>
            <GlobalStateProvider>
                <html lang={locale}>
                    <body className={`${poppins.variable} ${nunito.variable} antialiased`}>
                        <NextIntlClientProvider /*messages={messages}*/>
                        {/* <AuthProvider> */}
                            <main className="flex flex-col min-h-screen h-full w-full overflow-x-hidden">
                                {/* <h1 className="text-2xl font-bold bg-white">header</h1> */}
                                <div className="flex-grow overflow-auto h-screen flex flex-col gap-10">
                                <NavigationMenu />
                                    {children}
                                <Footer />
                                </div>
                                {/* <h1 className="text-2xl font-bold bg-white">footer</h1> */}
                            </main>
                        {/* </AuthProvider> */}
                        </NextIntlClientProvider>
                    </body>
                </html>
            </GlobalStateProvider>
        </>
    );
};