'use client';

import { useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import Card from "../ui/card";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const SubHome = () => {
    const router = useRouter();
    const t = useTranslations('HomePage.Subhero');
    const card1Ref = useRef<HTMLHeadingElement | null>(null);
    const card2Ref = useRef<HTMLHeadingElement | null>(null);
    const isCard1Visible = useIsVisible(card1Ref);
    const isCard2Visible = useIsVisible(card2Ref);

    const membershipListItems: { title: string; whichIcon: "greenAllowed" | "grayDisabled" }[] = [
        {
            title: t("MemberCard.MembershipList.item1"),
            whichIcon: "greenAllowed",
        },
        {
            title: t("MemberCard.MembershipList.item2"),
            whichIcon: "greenAllowed",
        },
        {
            title: t("MemberCard.MembershipList.item3"),
            whichIcon: "greenAllowed",
        },
    ];

    const guestListItems: { title: string; whichIcon: "greenAllowed" | "grayDisabled" }[] = [
        {
            title: t("GuestCard.GuestList.item1"),
            whichIcon: "greenAllowed",
        },
        {
            title: t("GuestCard.GuestList.item2"),
            whichIcon: "grayDisabled",
        },
        {
            title: t("GuestCard.GuestList.item3"),
            whichIcon: "grayDisabled",
        },
    ];

    const becomeMember = () => {
        router.replace("/login");
        // btn text : session logged in ? "View your profile" : "Become a member"
    };

    const continueAsGuest = () => {
        router.replace("/login");
    };

    return (
        <>
            {/* Desktop View */}
            <div className="md:w-2/3 w-full h-full flex md:flex-row flex-col justify-around items-center mx-auto gap-8">
                <div className={`${isCard1Visible ? "animate-fade-up animate-once animate-ease-in delay-500" : "opacity-0"}`}
                    ref={card1Ref}>
                    <Card
                        title={t('MemberCard.title')}
                        button={{ text: t('MemberCard.button'), variant: "primary", size: "md", onClick: () => {router.replace("/login")} }}
                        list={membershipListItems}
                        type="member"
                    />
                </div>
                <div className={`${isCard2Visible ? "animate-fade-up animate-once animate-ease-in delay-400" : "opacity-0"}`}
                    ref={card2Ref}>
                    <Card
                        title={t('GuestCard.title')}
                        button={{ text: t('GuestCard.button'), variant: "primary", size: "md" }}
                        list={guestListItems}
                        type="guest"
                    />
                </div>
            </div>
        </>
    );
};

export default SubHome;