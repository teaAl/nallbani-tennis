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
import { Bars3Icon, UserCircleIcon, Bars2Icon } from "@heroicons/react/24/outline";
import FacebookLogo from "@/public/icons/fblogo";
import InstagramLogo from "@/public/icons/instalogo";
import LinkedinLogo from "@/public/icons/linkedinlogo";
import YoutubeLogo from "@/public/icons/youtubelogo";
import { useGlobalState } from "@/context/globalStateContext";
import WhatsappIcon from "@/public/icons/whatsappIcon";

const links = [
    {
        id: 1,
        link: "/",
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
    {
        id: 5,
        link: "/pricing",
        name: "Pricing",
    },
];

const NavigationNew = () => {
    const pathName = usePathname();
    const { hamburgerMenuOpen, setHamburgerMenuOpen } = useGlobalState();
    const [user, setUser] = useState<"admin" | "member" | "guest" | null>(null);
    const [language, setLanguage] = useState<"en" | "al" | null>('en');
    const [showDropdown, setShowDropdown] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const isNavVisible = useIsVisible(navRef);
    // const [showhamburgerMenu, setShowHamburgerMenu] = useState(false);

    useEffect(() => {
        setUser("admin");
    }, [user]);

    // Prevent scrolling when the hamburger menu is open
    useEffect(() => {
        if (hamburgerMenuOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [hamburgerMenuOpen]);

    const handleLanguageMobile = () => {
        if (language === "en") {
            setLanguage("al");
        }
        else {
            setLanguage("en");
        }
    }

    return (
        <>
            {/* DESKTOP MENU */}
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
                    <ActionButton text="Become a member" variant="secondary" size="md" />
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

            {/* MOBILE MENU */}
            <div className="md:hidden absolute top-10  w-max bg-gradient-to-tl from-pear to-gray-800 rounded-r-2xl px-2 flex flex-col gap-4 py-2 justify-between items-center z-50 shadow-2xl">
                <Bars3Icon className="w-7 h-7 text-gray-900/80" onClick={() => setHamburgerMenuOpen(true)} />
            </div>
            <div className={`${hamburgerMenuOpen ? "absolute top-0 left-0 w-full h-screen bg-gray-900/95 z-50 overflow-hidden animate-fade-right animate-once animate-ease-in" : "w-0 opacity-0 -z-50 animate-fade-left animate-once animate-ease-in"}`}>
                <div className={`absolute top-0 left-0 w-3/4 h-screen bg-linear-to-br from-gray-800 to-gray-900 shadow-2xl items-center ${hamburgerMenuOpen ? "flex flex-col justify-between gap-10 p-6" : "gap-0 p-0 opacity-0"}`}>
                    <div className="flex flex-col w-full gap-10">
                        <div className="flex flex-row justify-between w-full items-center">
                            <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={() => handleLanguageMobile()}>
                                {language === "en" ? <EnIcon size="30" /> :
                                    <AlIcon size="30" />
                                }
                                <span className="text-foreground uppercase text-lg">{language}</span>
                            </div>
                            <button
                                className="text-foreground text-3xl font-bold cursor-pointer"
                                onClick={() => setHamburgerMenuOpen(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <nav className="flex flex-col w-full">
                            {links.map((link) => {
                                const isActive = pathName === link.link;
                                return (
                                    <Link key={link.id} href={link.link} className={`w-full p-4 border-l tracking-wider text-2xl ${isActive ? 'text-pear font-medium  border-l-pear' : 'text-foreground font-light border-l-pear/20 '}`}>
                                        <span
                                            className={`uppercase text-lg transition-all duration-300 cursor-pointer font-poppins w-full
                                    hover:text-pear`}
                                            onClick={() => setHamburgerMenuOpen(false)}
                                        >
                                            {link.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="flex flex-col w-full gap-14">
                        <div className="flex flex-row gap-2 items-center justify-start bg-gradient-to-r from-foreground/30 to-pear/40 w-max py-2 px-4 rounded-r-3xl">
                            <WhatsappIcon size="25" fill="#cddc3b" />
                            <span className=" text-foreground text-lg font-poppins">Chat on Whatsapp</span>
                        </div>
                        <div className="flex justify-start">
                            <Image src={logonb} width={150} height={150} alt="" className="" />
                        </div>
                        <div className="flex justify-start">
                            <ActionButton text="Become a member" variant="secondary" size="md" />
                        </div>


                        <div className="w-full">
                            <div className="flex flex-row gap-4 items-center pb-2">
                                <FacebookLogo size={30} />
                                <InstagramLogo size="30" />
                                <LinkedinLogo size="30" />
                                <YoutubeLogo size="30" />
                            </div>
                            <p className="text-pear text-right text-lg font-poppins uppercase text-nowrap border-t border-t-pear/40 w-full tracking-widest font-light">follow us
                            </p>
                        </div>
                    </div>
                    {/* LANGUAGE SELECTION DROPDOWN */}
                    {showDropdown && (
                        <div className="absolute top-20 bg-gray-800 rounded-md p-2">
                            <ul className="flex flex-col">
                                <li
                                    className="flex flex-row gap-2 items-center cursor-pointer transition-all duration-300 hover:bg-foreground/20 p-2 rounded-t-md"
                                    onClick={() => (setLanguage("al"), setShowDropdown(false))}
                                >
                                    <AlIcon size="25" />
                                    <span className="text-foreground">AL</span>
                                </li>
                                <li
                                    className="flex flex-row gap-2 items-center cursor-pointer transition-all duration-300 hover:bg-foreground/20 p-2 rounded-b-md"
                                    onClick={() => (setLanguage("en"), setShowDropdown(false))}
                                >
                                    <EnIcon size="25" />
                                    <span className="text-foreground">EN</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};

export default NavigationNew;

/*
TODO:
- Nav menu for mobile
*/