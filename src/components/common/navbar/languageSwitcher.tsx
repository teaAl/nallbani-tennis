'use client';

import { usePathname, useRouter } from "next/navigation";
import EnIcon from "../../../../public/icons/en";
import AlIcon from "../../../../public/icons/al";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/globalStateContext";

const LanguageSwitcher = () => {
    // const { language, setLanguage } = useGlobalState();
    const pathName = usePathname();
    const router = useRouter();

    const [showDropdown, setShowDropdown] = useState(false);
    const [language, setLanguage] = useState("en");

    const changeLocale = (locale: 'en' | 'al') => {
        document.cookie = `NEXT_LOCALE=${locale}; path=/;`;
        setLanguage(locale);
        router.refresh();
    }

    const handleLanguageMobile = () => {
        if (language === "en") {
            setLanguage("al");
            document.cookie = `NEXT_LOCALE=al; path=/;`;
        }
        else {
            setLanguage("en");
            document.cookie = `NEXT_LOCALE=en; path=/;`;
        }
        router.refresh();
    }

    useEffect(() => {
        const cookieLocale = document.cookie.split('; ').find(row =>
            row.startsWith('NEXT_LOCALE'))?.split('=')[1];
        if (cookieLocale) {
            setLanguage(cookieLocale);
        } else {
            setLanguage("al");
        }
    }, []);

    return (
        <>
            <div className="hidden md:flex flex-row gap-2 items-center cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => setShowDropdown(!showDropdown)}>
                {language === "en" ? <EnIcon size="25" /> :
                    <AlIcon size="25" />
                }
                <span className="text-foreground uppercase">{language}</span>
            </div>
            <div className={`${showDropdown ? 'absolute top-12 right-1.5 z-50' : 'hidden'} bg-gray-900 rounded-md gap-2 `}>
                <ul className="flex flex-col">
                    {language === "en" ?
                        <li className="flex flex-row gap-2 items-center cursor-pointer transition-all duration-300 hover:bg-foreground/20 p-2 rounded-t-md" onClick={() => { changeLocale("al"), setShowDropdown(false) }}>
                            <AlIcon size="25" />
                            <span className="text-foreground">AL</span>
                        </li> :
                        <li className="flex flex-row gap-2 items-center cursor-pointer transition-all duration-300 hover:bg-foreground/20 p-2 rounded-b-md" onClick={() => { changeLocale("en"), setShowDropdown(false) }}>
                            <EnIcon size="25" />
                            <span className="text-foreground">EN</span>
                        </li>
                    }
                </ul>
            </div>

            <div className="md:hidden flex flex-row gap-2 items-center cursor-pointer" onClick={() => handleLanguageMobile()}>
                {language === "en" ? <EnIcon size="30" /> :
                    <AlIcon size="30" />
                }
                <span className="text-foreground uppercase text-lg">{language}</span>
            </div>
        </>
    )
}

export default LanguageSwitcher;