'use client';

import { useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import Card from "../ui/card";

const SubHome = () => {
    const card1Ref = useRef<HTMLHeadingElement | null>(null);
    const card2Ref = useRef<HTMLHeadingElement | null>(null);
    const isCard1Visible = useIsVisible(card1Ref);
    const isCard2Visible = useIsVisible(card2Ref);

    const membershipListItems: { title: string, whichIcon: "greenAllowed" | "grayDisabled" }[] = [
        {
            title: "Individual or in-group training",
            whichIcon: "greenAllowed"
        },
        {
            title: "Tailored course plan and progress tracking",
            whichIcon: "greenAllowed",
        },
        {
            title: "Priority on bookings and discounts",
            whichIcon: "greenAllowed",
        },
    ];
    const guestListItems: { title: string, whichIcon: "greenAllowed" | "grayDisabled" }[] = [
        {
            title: "Book a lesson or a court",
            whichIcon: "greenAllowed",
        },
        {
            title: "No progress tracking",
            whichIcon: "grayDisabled" as "grayDisabled",
        },
        {
            title: "No discount and low priority on bookings",
            whichIcon: "grayDisabled",
        },
    ];

    return (
        <>
            {/* Desktop View */}
            <div className="md:w-2/3 w-full h-full flex md:flex-row flex-col justify-around items-center mx-auto gap-8">
                <div className={`${isCard1Visible ? "animate-fade-up animate-once animate-ease-in delay-500" : "opacity-0"}`}
                    ref={card1Ref}>
                    <Card
                        title="Become a Member"
                        // buttonText="Join Now"
                        button={{ text: "Join Now", variant: "primary", size: "md" }}
                        list={membershipListItems}
                        type="member"
                    />
                </div>
                <div className={`${isCard2Visible ? "animate-fade-up animate-once animate-ease-in delay-400" : "opacity-0"}`}
                    ref={card2Ref}>
                    <Card
                        title="Continue as Guest"
                        // buttonText="Explore"
                        button={{ text: "Explore", variant: "primary", size: "md" }}
                        list={guestListItems}
                        type="guest"
                    />
                </div>
            </div>
            {/* Mobile View */}
            {/* <div className="flex flex-col gap-4 md:hidden justify-center items-center mx-auto">
                <Card
                    title="Become a Member"
                    buttonText="Join Now"
                    list={guestListItems}
                    type="member"
                />

                <Card
                    title="Continue as Guest"
                    buttonText="Explore"
                    list={guestListItems}
                    type="guest"
                />
            </div> */}
        </>
    );
};

export default SubHome;