'use client';
import { useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import SubHome from "@/components/home/subhome";
import HeroSection from "@/components/home/heroSection";
import WideSection from "@/components/home/wideSection";
import ServicesSection from "@/components/home/servicesSection";
import { useTranslations } from "next-intl";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

const NewHome = () => {
    // const session = auth;
    // if (!session) {
    //     redirect('/login');
    // }

    const t = useTranslations('HomePage.Subhero');

    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const isTitleVisible = useIsVisible(titleRef);

    return (
        <>
            <div className="w-full h-auto flex flex-col">
                <HeroSection />
                <div className="flex flex-col gap-8">
                    <div className={`${isTitleVisible ? "animate-fade-left animate-once animate-ease-linear delay-500" : "opacity-0"}`} ref={titleRef}>
                        <h3 className={`text-gray-800 font-semibold md:text-2xl text-xl text-center font-poppins w-max mx-auto bg-pear px-4 -skew-x-12`}
                        >
                            {/* Book your tennis session today */}
                            {t('subheader')}
                        </h3>
                    </div>
                    <SubHome />
                </div>
            </div>
            <WideSection />
            <ServicesSection />
            {/* <Timetable /> */}
        </>
    );
};

export default NewHome;

/*
bg - gray - 900
text - gray-30
lghter text - gray-400
*/