'use client';

import { useEffect, useState, useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import logonb from "../../public/images/logo-nt.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ActionButton from "../ui/actionbtn";
import EnIcon from "@/public/icons/en";
import AlIcon from "@/public/icons/al";

const links = [
    {
        id: 1,
        link: "/new-home",
        name: "Home",
    },
    {
        id: 2,
        link: "/about",
        name: "About Us",
    },
    {
        id: 3,
        link: "/services",
        name: "Services",
    },
    // {
    //     id: 4,
    //     link: "/how-it-works",
    //     name: "How it works",
    // },
    {
        id: 5,
        link: "/pricing",
        name: "Pricing",
    },
];

const NavigationNew = () => {
    const pathName = usePathname();
    const [user, setUser] = useState<"admin" | "member" | "guest" | null>(null);
    const [language, setLanguage] = useState<"en" | "al" | null>('en');
    const [showDropdown, setShowDropdown] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const isNavVisible = useIsVisible(navRef);

    useEffect(() => {
        setUser("admin");
    }, [user]);

    return (
        <>
            <div className={`hidden md:flex flex-row justify-between items-center px-4 py-2 w-full bg-gray-900 relative z-20
                ${isNavVisible ? "animate-fade animate-once animate-ease-in" : "opacity-90"}`}
                ref={navRef}
            >
                <Image src={logonb} width={70} height={70} alt="" />
                <div className="flex flex-row gap-10">
                    {links.map((link) => {
                        const isActive = pathName === link.link;
                        return (
                            <Link key={link.id} href={link.link}>
                                <span
                                    className={`uppercase transition-all duration-300 cursor-pointer font-poppins
                                ${isActive ? 'text-pear border-b border-b-pear font-normal' : 'text-foreground font-light'}
                                hover:text-pear`}
                                >
                                    {link.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex flex-row gap-5">
                    <ActionButton text="Become a member" />
                    <div className="flex flex-row gap-2 items-center cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => setShowDropdown(!showDropdown)}>
                        {language === "en" ? <EnIcon size="25" /> :
                            <AlIcon size="25" />
                        }
                        <span className="text-foreground uppercase">{language}</span>
                    </div>
                </div>
            </div>
            <div className={`${showDropdown ? 'absolute top-12 right-1.5 z-50' : 'hidden'} bg-gray-900 rounded-md gap-2`}>
                <ul className="flex flex-col">
                    <li className="flex flex-row gap-2 items-center cursor-pointer transition-all duration-300 hover:bg-foreground/20 p-2 rounded-t-md" onClick={() => (setLanguage("al"), setShowDropdown(false))}>
                        <AlIcon size="25" />
                        <span className="text-foreground">AL</span>
                    </li>
                    <li className="flex flex-row gap-2 items-center cursor-pointer transition-all duration-300 hover:bg-foreground/20 p-2 rounded-b-md" onClick={() => (setLanguage("en"), setShowDropdown(false))}>
                        <EnIcon size="25" />
                        <span className="text-foreground">EN</span>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default NavigationNew;

/*
TODO:
- Nav menu for mobile
*/