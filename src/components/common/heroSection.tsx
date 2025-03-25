'use client'

import { useRef } from "react";
import Image from "next/image";
import logonb from "../../public/images/logo-nt.png";
import { useIsVisible } from "@/utils/useIsVisible";

const HeroSection = () => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const logoMobileRef = useRef<HTMLImageElement | null>(null);
    const isTitleVisible = useIsVisible(titleRef);
    const isParagraphVisible = useIsVisible(paragraphRef);
    const isLogoMobileVisible = useIsVisible(logoMobileRef);

    return (
        <div className="w-full md:h-[calc(100vh-20rem)] h-[calc(100vh-30rem)] bg-[linear-gradient(to_bottom,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('../public/images/tennisbg.webp')] bg-cover /*bg-fixed*/ bg-center">
            <div className="flex flex-col w-full h-full justify-center items-center my-auto md:gap-8 gap-4 ">
                <Image src={logonb} width={200} height={200} alt="" ref={logoMobileRef} className={`md:hidden ${isLogoMobileVisible ? "animate-fade-down animate-once animate-ease-linear" : "opacity-0"}`} />
                <h1 className={`text-pear font-poppins font-bold md:text-6xl text-4xl
                    ${isTitleVisible ? "animate-fade-down animate-once animate-ease-linear" : "opacity-0"}`}
                    ref={titleRef}>
                    Nallbani Tennis
                </h1>
                <p className={`text-foreground font-nunito font-bold md:text-xl text-lg
                    ${isParagraphVisible ? "animate-fade-up animate-once animate-ease-linear" : "opacity-0"}`}
                    ref={paragraphRef}>
                    Elevate your <span className="text-pear underline">game</span> with us
                </p>
            </div>
        </div>
    );
};

export default HeroSection;
