'use client';

import { useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import Image from "next/image";
import logonb from "../../public/images/logo-nt.png";
import PhoneIcon from "@/public/icons/phone";
import EnvelopeIcon from "@/public/icons/envelope";
import LocationIcon from "@/public/icons/location";
import FacebookLogo from "@/public/icons/fblogo";
import InstagramLogo from "@/public/icons/instalogo";
import LinkedinLogo from "@/public/icons/linkedinlogo";
import YoutubeLogo from "@/public/icons/youtubelogo";

const Footer = () => {
    const logoRef = useRef<HTMLImageElement | null>(null);
    const isLogoVisible = useIsVisible(logoRef);
    const logoRefMobile = useRef<HTMLImageElement | null>(null);
    const isMobileLogoVisible = useIsVisible(logoRefMobile);
    const logoTitle = useRef<HTMLDivElement | null>(null);
    const isLogoTitleVisible = useIsVisible(logoTitle);
    const contactTitle = useRef<HTMLDivElement | null>(null);
    const isContactTitleVisible = useIsVisible(contactTitle);
    const contactInfo = useRef<HTMLDivElement | null>(null);
    const isContactInfoVisible = useIsVisible(contactInfo);
    const socialsTitle = useRef<HTMLDivElement | null>(null);
    const isSocialsTitleVisible = useIsVisible(socialsTitle);
    const socialsRef = useRef<HTMLDivElement | null>(null);
    const isSocialsVisible = useIsVisible(socialsRef);
    const socialsMobileRef = useRef<HTMLDivElement | null>(null);
    const isSocialsMobileVisible = useIsVisible(socialsMobileRef);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const isButtonVisible = useIsVisible(buttonRef);
    const mobileBtn = useRef<HTMLButtonElement | null>(null);
    const isMobileBtnVisible = useIsVisible(mobileBtn);
    const lowerFooter = useRef<HTMLDivElement | null>(null);
    const isLowerFooterVisible = useIsVisible(lowerFooter);

    return (
        <footer className=" text-sm text-pear text-center bg-[linear-gradient(to_right,rgba(16,24,40,0.9),rgba(16,24,40,0.9)),url('../public/images/parallax-4.jpg')] bg-fixed bg-bottom bg-no-repeat">
            <div className="flex md:w-3/4 w-full flex-row flex-wrap justify-between gap-6 md:items-center items-start md:mx-auto md:p-10 p-6">
                <div className="flex flex-col gap-2 items-center md:w-max w-full">
                    <div className="hidden md:block">
                        <Image src={logonb} width={200} height={200} alt=""
                            className={`${isLogoVisible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
                            ref={logoRef}
                        />
                    </div>
                    <div className="md:hidden block">
                        <Image src={logonb} width={130} height={130} alt=""
                            className={`${isMobileLogoVisible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
                            ref={logoRefMobile}
                        />
                    </div>
                    <div className={`flex flex-col gap-0.5 items-center
                        ${isLogoTitleVisible ? "animate-fade animate-once animate-ease-linear delay-1000" : "opacity-0"}`}
                        ref={logoTitle}
                    >
                        <p className="font-poppins font-light text-lg tracking-widest">Nallbani <span className="text-white">Tennis</span></p>
                        <span>since 1934</span>
                    </div>
                </div>
                <button className={`block md:hidden w-full bg-white/10 text-pear py-2 px-4 rounded-md shadow-md font-bold cursor-pointer
                    ${isMobileBtnVisible ? "animate-fade animate-once animate-ease-linear delay-500" : "opacity-0"}`}
                    ref={mobileBtn}>
                    Become a member
                </button>
                <div className="flex flex-col gap-4 justify-around w-max">
                    <h5 className={`uppercase text-white md:border-b-2 border-b border-b-white/30 py-1 text-left font-bold md:text-lg text-base
                        ${isContactTitleVisible ? "animate-fade-down animate-once animate-ease-linear" : "opacity-0"}`}
                        ref={contactTitle}
                    >
                        contact us
                    </h5>
                    <div className={`flex flex-col gap-4
                        ${isContactInfoVisible ? "animate-fade-up animate-once animate-ease-linear" : "opacity-0"}`}
                        ref={contactInfo}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <EnvelopeIcon />
                            <span className="text-white">
                                nallbanitennis@gmail.com
                            </span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <LocationIcon />
                            <span className="text-white">
                                Universiteti i Sporteve, Tirane
                            </span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <PhoneIcon />
                            <span className="text-white">
                                +355 69 123 4567
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`md:hidden flex flex-col gap-7 justify-between items-end w-1/3 mb-2 mt-auto
                    ${isSocialsMobileVisible ? "animate-fade-up animate-once animate-ease-linear" : "opacity-0"}`}
                    ref={socialsMobileRef}
                >
                    <div className="flex flex-row gap-7 items-center justify-around">
                        <FacebookLogo size={35} />
                        <InstagramLogo size="35" />
                    </div>
                    <div className="flex flex-row gap-7 items-center justify-around">
                        <LinkedinLogo size="35" />
                        <YoutubeLogo size="35" />
                    </div>
                </div>
                <div className="hidden md:flex flex-col gap-6 justify-between md:w-max w-max">
                    <h5 className={`uppercase text-white md:border-b-2 border-b border-b-white/30 py-1 text-left font-bold md:text-lg text-base
                        ${isSocialsTitleVisible ? "animate-fade-down animate-once animate-ease-linear" : "opacity-0"}`}
                        ref={socialsTitle}
                    >
                        follow us
                    </h5>
                    <div className={`flex flex-row gap-2 items-center md:justify-around justify-around
                        ${isSocialsVisible ? "animate-fade-left animate-once animate-ease-linear delay-300" : "opacity-0"}`}
                        ref={socialsRef}
                    >
                        <FacebookLogo size={26} />
                        <InstagramLogo size="26" />
                        <LinkedinLogo size="26" />
                        <YoutubeLogo size="26" />
                    </div>
                    <div
                        className={`group ${isButtonVisible ? "animate-fade-left animate-once animate-ease-linear delay-700" : "opacity-0"}`}
                        ref={buttonRef}
                    >
                        <button
                            className={`md:block hidden w-full bg-white/10 text-pear py-2 px-4 rounded-md shadow-md font-bold cursor-pointer transition-all duration-300
                            group-hover:bg-pear group-hover:text-gray-900`}
                        >
                            Become a member
                        </button>
                    </div>
                </div>

            </div>
            <div className={`bg-gray-900 p-3 text-pear flex md:flex-row flex-col-reverse gap-2.5 justify-between items-center
                ${isLowerFooterVisible ? "animate-fade animate-once animate-ease-linear" : "opacity-0"}`}
                ref={lowerFooter}>
                <span className=" text-pear/90">
                    &copy; 2025 Nallbani Tennis. All rights reserved.
                </span>
                <div className="flex flex-row gap-2 md:gap-4 text-pear/90">
                    <span>
                        Terms & Conditions
                    </span>
                    <span>|</span>
                    <span>
                        Privacy Policy
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;