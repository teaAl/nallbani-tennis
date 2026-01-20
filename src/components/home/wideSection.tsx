'use client';

import { useRef } from "react";
import ActionButton from "../ui/actionbtn";
import { useIsVisible } from "@/utils/useIsVisible";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const WideSection = () => {
    const t = useTranslations('HomePage.WideSection');
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const isTitleVisible = useIsVisible(titleRef);
    const isParagraphVisible = useIsVisible(paragraphRef);
    const isButtonVisible = useIsVisible(buttonRef);
    const router = useRouter();

    return (
        <div className="w-full h-full text-gray-30 flex flex-col gap-8 justify-center items-center p-6 md:p-10 shadow-2xl bg-[linear-gradient(to_right,rgba(16,24,40,0.9),rgba(16,24,40,0.9)),url('/images/parallax-4.jpg')] bg-fixed bg-bottom bg-no-repeat">
            <div className="flex flex-col gap-4 md:w-4/6">
                <h4
                    className={`text-left text-foreground font-nunito text-2xl 
                        ${isTitleVisible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
                    ref={titleRef}>
                    {t('title.pt1')}
                    <span className="text-pear">{t('title.body')}</span>
                    {t('and')}
                    <span className="text-pear">{t('title.mind')}</span>.
                </h4>
                <p className={`text-left text-foreground font-nunito text-sm
                    ${isParagraphVisible ? "animate-fade-up animate-once animate-ease-linear" : "opacity-0"}`}
                    ref={paragraphRef}>
                    {t('text.pt1')}
                    <span className="text-pear">{t('text.discipline')}</span>,
                    <span className="text-pear"> {t('text.focus')}</span>,
                    {t('and')}
                    <span className="text-pear">{t('text.perseverance')} </span>
                    {t('text.pt2')}
                    <span className="text-pear">{t('text.commitment')}</span>,
                    {t('text.because')}
                    <span className="text-pear">{t('text.growth')}</span>
                    {t('text.pt3')}
                    <span className="text-pear">{t('text.mastery')}</span>,
                    {t('and')}
                    <span className="text-pear">{t('text.constistencty')}</span>,
                    {t('text.pt4')}
                    <span className="text-pear">{t('text.passion')}</span>.
                    {t('text.pt5')}
                    <span className="text-pear">{t('text.tennis')}</span>
                    {t('text.pt6')}
                </p>
            </div>
            <div className={`w-max ${isButtonVisible ? "animate-fade-up animate-once animate-ease-linear delay-500" : 'opacity-0'}`} ref={buttonRef}>
                <ActionButton text={t('button')} variant="primary" size="md" onClick={() => router.push("/about")}/>
            </div>
        </div>
    )
};

export default WideSection;