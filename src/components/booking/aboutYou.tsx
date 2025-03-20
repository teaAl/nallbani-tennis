import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useGlobalState } from "@/context/globalStateContext";

const AboutYou = () => {
    const { nextStep, experience, setExperience } = useGlobalState();
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState(3);

    const experienceOptions = ["never", "0-3 months", "3-6 months", "6-12 months", "12+ months"];

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        const totalScrollableHeight = scrollHeight - clientHeight;
        const scrollFraction = scrollTop / totalScrollableHeight;
        const newIndex = Math.round(scrollFraction * (experienceOptions.length - 1));
        setSelectedExperience(newIndex);
        console.log(experienceOptions[newIndex]);
    };

    const handleExperienceSelection = (index: number) => {
        console.log('experience > ', experienceOptions[index]);
        // setExperience(experienceOptions[index]);
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-row justify-between items-center gap-6">

                <p className="font-nunito text-foreground text-lg">
                    Have you ever taken tennis lessons?
                </p>

                <div className={`${experience !== null ? 'h-20' : 'h-10'} snap-y snap-mandatory overflow-y-scroll no-scrollbar items-center justify-center`} onScroll={(e) => handleScroll(e)}>
                    {experienceOptions.map((option, index) => (
                        <div key={index} className="snap-always text-center snap-center">
                            <button
                                className={`${selectedExperience === index ? 'text-pear/100 scale-110' : 'text-olive/70'} p-2 transition-all duration-300`}
                                onClick={() => nextStep()}
                            >
                                {option}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <p className="font-nunito text-sm text-pear/90 inline-flex gap-2 items-center border-t-2 border-pear/10 py-4">
                <InformationCircleIcon className="w-4 h-4" />
                We request these details to better suit your lesson
            </p>
            <div
                className={`${!isFormValid ? "opacity-0 -z-50" : "opacity-100 z-50"
                    } flex flex-row justify-around align-middle items-center duration-300 transition-all`}>
                <div className={`cursor-pointer`}>
                    <button
                        className="bg-transparent text-pear justify-items-center p-4 rounded-full scale-95 animate-bounce duration-300 transition-all hover:scale-100"
                        onClick={nextStep}>
                        Proceed
                        <ChevronDoubleDownIcon className="w-10 h-10" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutYou;

/*
TODO: 
level of experience - 0-3muaj, 3-6, 6-12, 12+ muaj gjithmone
geneder - f/m
age - 12-14, 14-16, 16-18, 18-25, 25+
*/