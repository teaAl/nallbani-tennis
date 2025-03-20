'use client';
import { useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import BegginerBallIcon from "@/public/icons/beginnerBall";
import PricetagIcon from "@/public/icons/pricetag";

const ListElement = ({ mainColor, accentColor, ballSize, pricetagSize, title, subTitle, price }: {
    mainColor: string,
    accentColor: string,
    ballSize: string | number,
    pricetagSize: string | number,
    title: string,
    subTitle: string,
    price: string
}) => {

    const ballRef = useRef<HTMLDivElement | null>(null);
    const isBallVisible = useIsVisible(ballRef);
    const subTitleRef = useRef<HTMLDivElement | null>(null);
    const isSubTitleVisible = useIsVisible(subTitleRef);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const isTitleVisible = useIsVisible(titleRef);
    const priceRef = useRef<HTMLDivElement | null>(null);
    const isPriceVisible = useIsVisible(priceRef);
    const pricetagRef = useRef<HTMLDivElement | null>(null);
    const isPricetagVisible = useIsVisible(pricetagRef);

    return (
        <>
            <div className="flex flex-row gap-4 items-center">
                <div className={`${isBallVisible ? "animate-fade-down animate-once animate-ease-linear" : 'opacity-0'}`} ref={ballRef}>
                    <BegginerBallIcon mainColor={mainColor} highlight={accentColor} size={ballSize} />
                </div>
                <div className="flex flex-col gap-4">
                    <span className={`text-foreground text-xs font-light 
                        ${isSubTitleVisible ? "animate-fade-down animate-once animate-ease-linear" : "opacity-0"}`}
                        ref={subTitleRef}>
                        {subTitle}
                    </span>
                    <span className={`uppercase text-foreground font-light font-poppins text-2xl
                        ${isTitleVisible ? "animate-fade-up animate-once animate-ease-linear" : "opacity-0"}`}
                        ref={titleRef}>
                        {title}
                    </span>
                </div>
            </div>
            <div className="flex flex-row gap-2 items-start">
                <span className={`text-sm font-poppins font-semibold backdrop-blur-2xl px-2 py-1
                    ${isPriceVisible ? "animate-fade-right animate-once animate-ease-linear" : 'opacity-0'}`}
                    ref={priceRef}
                    style={{
                        backgroundColor: mainColor,
                        color: accentColor,
                        boxShadow: `20px 10px 0px 0px ${accentColor}85`
                    }}>{price}</span>
                <div className={`-rotate-45 ${isPriceVisible ? "animate-fade-left animate-once animate-ease-linear" : 'opacity-0'}`} ref={priceRef}>
                    <PricetagIcon size={pricetagSize} mainColor={mainColor} accent={accentColor} />
                </div>
            </div>
        </>
    )
}

export default ListElement;