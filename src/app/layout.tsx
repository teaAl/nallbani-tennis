import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
import Footer from "@/components/common/footer";
import NavigationNew from "@/components/common/navigationMenu";
import { GlobalStateProvider } from "@/context/globalStateContext";
import BookingLayout from "@/layouts/bookingLayout";
import React from "react";

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


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <GlobalStateProvider>
                <BookingLayout>
                    <html lang="en">
                        <body className={`${poppins.variable} ${nunito.variable} antialiased`}>
                            <main className="flex flex-col min-h-screen h-full w-full overflow-x-hidden">

                                {/* <div className="absolute top-0 md:flex w-full"> */}
                                <NavigationNew />
                                {/* </div> */}
                                <div className="flex-grow overflow-auto h-screen flex flex-col gap-10">
                                    {children}
                                    <div className="w-full  z-30">
                                        <Footer />
                                    </div>
                                </div>
                            </main>
                        </body>
                    </html>
                </BookingLayout>
            </GlobalStateProvider>
        </>
    );
};

export default Layout;