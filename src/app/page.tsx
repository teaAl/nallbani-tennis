'use client';
import { useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import SubHome from "@/components/common/subhome";
import HeroSection from "@/components/common/heroSection";
import WideSection from "@/components/common/wideSection";
import ServicesSection from "@/components/common/servicesSection";

const NewHome = () => {
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
                            Book your tennis session today
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