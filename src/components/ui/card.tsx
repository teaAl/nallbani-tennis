'use client';
import { useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import { CheckBadgeIcon, ExclamationTriangleIcon, TrophyIcon, UserIcon } from "@heroicons/react/24/outline";
import ActionButton from "./actionbtn";

const Card = ({
    title,
    button,
    list,
    type
}: {
    title: string,
    button: ActionButtonProps
    list: { title: string, whichIcon: "greenAllowed" | "grayDisabled" }[],
    type: "member" | "guest"
}) => {
    const isMember = type === "member";

    const iconRef = useRef<HTMLDivElement | null>(null);
    const isIconVisible = useIsVisible(iconRef);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const isTitleVisible = useIsVisible(titleRef);
    const listRef = useRef<HTMLDivElement | null>(null);
    const isListVisible = useIsVisible(listRef);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const isButtonVisible = useIsVisible(buttonRef);

    return (
        <>
            <div className={`h-full rounded-2xl shadow-2xl md:p-8 p-6 flex flex-col justify-between gap-8 items-center w-96
            ${isMember ? "bg-[linear-gradient(to_right,rgba(205,220,59,0.8),rgba(205,220,59,0.2)),url('../public/images/membershipcards.svg')] bg-no-repeat bg-right-bottom" : "bg-[linear-gradient(to_right,rgba(30,41,57,1),rgba(205,220,59,0.3)),url('../public/images/court3.png')] bg-no-repeat bg-right-bottom"}`}>
                {/* Symbol at the top */}
                <div className={`flex justify-center items-center w-12 h-12 rounded-full
                    ${isMember ? "bg-gray-900" : "bg-foreground/20"}
                    ${isIconVisible ? "animate-fade-down animate-once animate-ease-in delay-500" : "opacity-0"}`}
                    ref={iconRef}>
                    {isMember ? <TrophyIcon className="w-8 h-8 text-pear" /> : <UserIcon className="w-8 h-8 text-[#afafaf]" />}
                </div>
                {/* Card Title */}
                <h4 className={`${isMember ? "text-gray-900" : "text-[#afafaf]"} 
                    text-center font-poppins text-xl font-bold
                    ${isTitleVisible ? "animate-fade-down animate-once animate-ease-in delay-500" : "opacity-0"}`}
                    ref={titleRef}
                >
                    {title}
                </h4>
                {/* Card List */}
                <div className={`flex flex-col gap-3
                        ${isListVisible ? "animate-fade-up animate-once animate-ease-in delay-300" : "opacity-0"}`}
                    ref={listRef}>
                    {list.map((item, index) => (
                        <div key={index} className="flex flex-row gap-4 items-center">
                            {item.whichIcon === "greenAllowed" ?
                                <CheckBadgeIcon className={`w-6 h-6 ${isMember ? "text-gray-900" : "text-[#afafaf]"}`} />
                                :
                                <ExclamationTriangleIcon className="w-6 h-6 text-gray-500" />
                            }
                            <p className={`${isMember ? "text-gray-900" : "text-[#afafaf]"} text-sm font-semibold font-poppins`}>{item.title}</p>
                        </div>
                    ))}
                </div>
                {/* Card Button */}
                <div className={`flex justify-center w-2/3
                    ${isButtonVisible ? "animate-fade-up animate-once animate-ease-in delay-300" : "opacity-0"}`}
                    ref={buttonRef}>
                    <ActionButton {...button} />
                </div>
            </div>
        </>
    );
}

export default Card;