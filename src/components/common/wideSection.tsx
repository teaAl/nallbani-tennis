'use client';

import { useRef } from "react";
import ActionButton from "../ui/actionbtn";
import { useIsVisible } from "@/utils/useIsVisible";

const WideSection = () => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const isTitleVisible = useIsVisible(titleRef);
    const isParagraphVisible = useIsVisible(paragraphRef);
    const isButtonVisible = useIsVisible(buttonRef);

    return (
        <div className="w-full h-full text-gray-30 flex flex-col gap-8 justify-center items-center p-6 md:p-10 shadow-2xl bg-[linear-gradient(to_right,rgba(16,24,40,0.9),rgba(16,24,40,0.9)),url('../public/images/parallax-4.jpg')] bg-fixed bg-bottom bg-no-repeat">
            <div className="flex flex-col gap-4 md:w-4/6">
                <h4
                    className={`text-left text-foreground font-nunito text-2xl 
                        ${isTitleVisible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
                    ref={titleRef}>
                    Whether you're stepping onto the court for the first time or refining your skills, tennis challenges both <span className="text-pear">body</span> and <span className="text-pear">mind</span>.
                </h4>
                <p className={`text-left text-foreground font-nunito text-sm
                    ${isParagraphVisible ? "animate-fade-up animate-once animate-ease-linear" : "opacity-0"}`}
                    ref={paragraphRef}>
                    It's a sport that teaches <span className="text-pear">discipline</span>, <span className="text-pear">focus</span>, and <span className="text-pear">perseverance</span> — values that extend far beyond the court.
                    Even as a hobby, tennis asks for your <span className="text-pear">commitment</span>, because <span className="text-pear">growth</span> doesn't come without practice. Every session you book brings you one step closer
                    to <span className="text-pear">mastery</span>, and with <span className="text-pear">consistency</span>, this game can transform into a <span className="text-pear">lifelong passion</span>. So, why not take that first
                    step today? Whether you're just testing the waters or ready to go all in, <span className="text-pear">tennis</span> is waiting for you.
                </p>
            </div>
            <div className={`w-max ${isButtonVisible ? "animate-fade-up animate-once animate-ease-linear delay-500" : 'opacity-0'}`} ref={buttonRef}>
                <ActionButton text="Read more about us" variant="primary" size="md" />
            </div>
        </div>
    )
};

export default WideSection;