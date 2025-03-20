import Footer from "@/components/common/footer";
import HeroSection from "@/components/common/heroSection";
import HomeBanner from "@/components/common/homeBanner";
import NavigationNew from "@/components/common/navigationNew";
import SubHome from "@/components/common/subhome";
import React from "react";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main className="flex flex-col min-h-screen h-full">
                <NavigationNew />
                <div className="flex-grow overflow-auto h-screen flex flex-col gap-10">
                    {children}
                    <div className="w-full  z-30">
                        <Footer />
                    </div>
                </div>
            </main>
        </>
    );
};

export default Layout;