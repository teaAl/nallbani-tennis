import Image from 'next/image';
import { useRef } from 'react';
import { useIsVisible } from '@/utils/useIsVisible';
import pose1 from "@/public/icons/pose1.svg";
import pose2 from "@/public/icons/pose2.svg";
import pose3 from "@/public/icons/pose3.svg";
import pose4 from "@/public/icons/pose4.svg";
import { useTranslations } from 'next-intl';

const MilestonesSection = () => {
    const t = useTranslations('AboutPage.Section2');

    const title2Ref = useRef<HTMLHeadingElement | null>(null);
    const isTitle2Visible = useIsVisible(title2Ref);

    const step1titleRef = useRef<HTMLHeadingElement | null>(null);
    const isStep1TitleVisible = useIsVisible(step1titleRef);
    const step1paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const isStep1ParagraphVisible = useIsVisible(step1paragraphRef);
    const step1ImageRef = useRef<HTMLImageElement | null>(null);
    const isStep1ImageVisible = useIsVisible(step1ImageRef);
    const step1PlaceholderRef = useRef<HTMLDivElement | null>(null);
    const isStep1PlaceholderVisible = useIsVisible(step1PlaceholderRef);

    const step2titleRef = useRef<HTMLHeadingElement | null>(null);
    const isStep2TitleVisible = useIsVisible(step2titleRef);
    const step2paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const isStep2ParagraphVisible = useIsVisible(step2paragraphRef);
    const step2ImageRef = useRef<HTMLImageElement | null>(null);
    const isStep2ImageVisible = useIsVisible(step2ImageRef);
    const step2PlaceholderRef = useRef<HTMLDivElement | null>(null);
    const isStep2PlaceholderVisible = useIsVisible(step2PlaceholderRef);

    const step3titleRef = useRef<HTMLHeadingElement | null>(null);
    const isStep3TitleVisible = useIsVisible(step3titleRef);
    const step3paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const isStep3ParagraphVisible = useIsVisible(step3paragraphRef);
    const step3ImageRef = useRef<HTMLImageElement | null>(null);
    const isStep3ImageVisible = useIsVisible(step3ImageRef);
    const step3PlaceholderRef = useRef<HTMLDivElement | null>(null);
    const isStep3PlaceholderVisible = useIsVisible(step3PlaceholderRef);

    const step4titleRef = useRef<HTMLHeadingElement | null>(null);
    const isStep4TitleVisible = useIsVisible(step4titleRef);
    const step4paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const isStep4ParagraphVisible = useIsVisible(step4paragraphRef);
    const step4ImageRef = useRef<HTMLImageElement | null>(null);
    const isStep4ImageVisible = useIsVisible(step4ImageRef);
    const step4PlaceholderRef = useRef<HTMLDivElement | null>(null);
    const isStep4PlaceholderVisible = useIsVisible(step4PlaceholderRef);

    return (
        <div className="bg-gray-900 text-foreground w-full bg-[linear-gradient(to_bottom,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('../public/images/stonesgray.svg')] bg-contain bg-right bg-no-repeat">
            <div className="flex flex-col gap-4 p-6">
                <div className="w-full flex flex-row justify-end">
                    <h3 className={`text-gray-900 bg-pear font-semibold md:text-2xl text-xl text-center font-poppins w-max
							${isTitle2Visible ? "animate-fade-left animate-once animate-ease-linear" : "opacity-0"}`}
                        ref={title2Ref}
                    >
                        {t('title')}
                    </h3>
                </div>
                <div className="/flex /flex-col /justify-between grid grid-cols-1 md:grid-cols-4 md:h-80 h-screen gap-10">
                    <div className="md:flex md:flex-col md:justify-end order-4 md:order-1">
                        <div className={`h-full bg-gray-800 shadow-2xl relative z-10
								${isStep4PlaceholderVisible ? "animate-fade animate-once animate-ease-linear delay-1000" : "opacity-0"}`}
                            ref={step4PlaceholderRef}
                        >
                            <Image src={pose4} alt="pose4" className={`absolute bottom-0 left-0
									${isStep4ImageVisible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
                                ref={step4ImageRef} />
                            <div className={`absolute bottom-0 -right-2 w-3/5 p-4 bg-gradient-to-r to-pear/30 from-gray-800
									${isStep4ParagraphVisible ? "animate-fade-left animate-once animate-ease-linear delay-500" : "opacity-0"}`}
                                ref={step4paragraphRef}
                            >
                                <div className="relative w-full flex flex-row justify-end">
                                    <span className={`absolute -top-12 text-pear font-poppins text-2xl
											${isStep4TitleVisible ? "animate-fade-down animate-once animate-ease-linear delay-700" : "opacity-0"}`}
                                        ref={step4titleRef}
                                    >
                                        2025
                                    </span>
                                </div>
                                <p className="font-poppins text-sm text-foreground">{t('p25')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end order-3 md:order-2">
                        <div className={`h-3/4 bg-gray-800 shadow-2xl relative
								${isStep3PlaceholderVisible ? "animate-fade animate-once animate-ease-linear delay-700" : "opacity-0"}`}
                            ref={step3PlaceholderRef}
                        >
                            <Image src={pose3} alt="pose3"
                                className={`absolute bottom-0 left-0
										${isStep3ImageVisible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
                                ref={step3ImageRef}
                            />
                            <div className={`absolute bottom-0 -right-2 w-3/5 p-4 bg-gradient-to-r to-pear/30 from-gray-800
									${isStep3ParagraphVisible ? "animate-fade-left animate-once animate-ease-linear delay-500" : "opacity-0"}`}
                                ref={step3paragraphRef}
                            >
                                <div className="relative w-full flex flex-row justify-end">
                                    <span className={`absolute -top-12 text-pear font-poppins text-2xl
											${isStep3TitleVisible ? "animate-fade-down animate-once animate-ease-linear delay-700" : "opacity-0"}`}
                                        ref={step3titleRef}
                                    >
                                        2024
                                    </span>
                                </div>
                                <p className="font-poppins text-sm text-foreground">{t('p24')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end order-2 md:order-3">
                        <div className={`h-1/2 bg-gray-800 shadow-2xl relative
								${isStep2PlaceholderVisible ? "animate-fade animate-once animate-ease-linear delay-500" : "opacity-0"}`}
                            ref={step2PlaceholderRef}
                        >
                            <Image src={pose2} alt="pose2"
                                className={`absolute bottom-0 left-0
										${isStep2ImageVisible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
                                ref={step2ImageRef}
                            />
                            <div className={`absolute bottom-0 -right-2 w-3/5 p-4 bg-gradient-to-r to-pear/30 from-gray-800
									${isStep2ParagraphVisible ? "animate-fade-left animate-once animate-ease-linear delay-500" : "opacity-0"}`}
                                ref={step2paragraphRef}
                            >
                                <div className="relative w-full flex flex-row justify-end">
                                    <span className={`absolute -top-12 text-pear font-poppins text-2xl
											${isStep2TitleVisible ? "animate-fade-down animate-once animate-ease-linear delay-700" : "opacity-0"}`}
                                        ref={step2titleRef}
                                    >
                                        2022
                                    </span>
                                </div>
                                <p className="font-poppins text-sm text-foreground">{t('p22')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end order-1 md:order-4">
                        <div className={`h-1/4 bg-gray-800 shadow-2xl relative
								${isStep1PlaceholderVisible ? "animate-fade animate-once animate-ease-linear" : "opacity-0"}`}
                            ref={step1PlaceholderRef}
                        >
                            <Image
                                src={pose1}
                                alt="pose1"
                                className={`absolute bottom-0 left-0
										${isStep1ImageVisible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
                                ref={step1ImageRef}
                            />

                            <div className={`absolute bottom-0 -right-2 w-3/5 p-4 bg-gradient-to-r to-pear/30 from-gray-800
									${isStep1ParagraphVisible ? "animate-fade-left animate-once animate-ease-linear delay-500" : "opacity-0"}`}
                                ref={step1paragraphRef}
                            >
                                <div className="relative w-full flex flex-row justify-end">
                                    <span className={`absolute -top-12 text-pear font-poppins text-2xl
											${isStep1TitleVisible ? "animate-fade-down animate-once animate-ease-linear delay-700" : "opacity-0"}`}
                                        ref={step1titleRef}
                                    >
                                        2017
                                    </span>
                                </div>
                                <p className="font-poppins text-sm text-foreground">{t('p17')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MilestonesSection;