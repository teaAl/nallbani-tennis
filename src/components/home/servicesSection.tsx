'use client';

import { useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import Image from "next/image";
import tennisgirl from "../../../public/images/tennisgirl.png";
import ListElement from "../ui/servicesListElement";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const ServicesSection = () => {
    const t = useTranslations('HomePage.ServicesSection');
    const subHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const isSubHeadingVisible = useIsVisible(subHeadingRef);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const isTitleVisible = useIsVisible(titleRef);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const isParagraphVisible = useIsVisible(paragraphRef);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const isButtonVisible = useIsVisible(buttonRef);
    const mobileButtonRef = useRef<HTMLButtonElement | null>(null);
    const isMobileButtonVisible = useIsVisible(mobileButtonRef);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const isImageVisible = useIsVisible(imageRef);
    const router = useRouter();

    return (
        <div className="md:w-4/5 w-full md:p-4 p-6 grid md:grid-cols-3 mx-auto md:gap-0 gap-8 ">
            <div className="flex flex-col gap-4 justify-between">
                <span className={`md:text-base text-sm uppercase text-foreground font-light font-poppins
                    ${isSubHeadingVisible ? "animate-fade-down animate-once animate-ease-linear delay-300" : "opacity-0"}`}
                    ref={subHeadingRef}>
                    {t('subTitle')}
                </span>
                <h3 className={`text-pear md:text-5xl text-3xl font-poppins font-medium
                    ${isTitleVisible ? "animate-fade-up animate-once animate-ease-linear delay-500" : "opacity-0"}`}
                    ref={titleRef}>
                    {t('title')}
                </h3>
                <p className={`text-foreground font-poppins
                    ${isParagraphVisible ? "animate-fade-right animate-once animate-ease-linear delay-700" : "opacity-0"}`}
                    ref={paragraphRef}>
                    {t('text')}
                </p>
                <button className={`text-pear w-max hidden md:block
                    ${isButtonVisible ? "animate-fade-right animate-once animate-ease-linear delay-900" : "opacity-0"}`}
                    ref={buttonRef} onClick={() => router.push("/services")} >
                    {t('button')} {' >'}
                </button>
            </div>
            <div className="flex flex-col gap-4 md:justify-between md:pl-8">
                <Image src={tennisgirl} alt="" className={`shadow-[30px_25px_0px_0px_#1e2939] -z-10 mx-auto
                    ${isImageVisible ? "animate-fade-up animate-once animate-ease-in delay-500" : 'opacity-0'}`} ref={imageRef} />
            </div>
            <div className="flex flex-col md:justify-around md:pt-0 pt-4 gap-4">
                <div className="flex flex-row justify-between items-center">
                    <ListElement mainColor="#B3404A" accentColor="#F4B2B0" ballSize={38} pricetagSize={25} title={t('ListElement1.title')} subTitle={t('ListElement1.subTitle')} price="8000 AL" />
                </div>
                <div className="flex flex-row justify-between items-center">
                    <ListElement mainColor="#FFC61B" accentColor="#FEE187" ballSize={38} pricetagSize={25} title={t('ListElement2.title')} subTitle={t('ListElement2.subTitle')} price="8000 AL" />
                </div>
                <div className="flex flex-row justify-between items-center">
                    <ListElement mainColor="#16A34A" accentColor="#CBDC3B" ballSize={39} pricetagSize={25} title={t('ListElement3.title')} subTitle={t('ListElement3.subTitle')} price="8000 AL" />
                </div>
            </div>
            <div className="w-full md:hidden flex justify-center">
                <button className={`text-pear w-max 
                    ${isMobileButtonVisible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`} ref={mobileButtonRef} onClick={() => router.push("/services")}>
                    {t('button')} {' >'}
                </button>
            </div>
        </div>
    )
};

export default ServicesSection;