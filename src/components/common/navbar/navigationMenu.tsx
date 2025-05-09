"use client";

import { useEffect, useState, useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import logonb from "../../../../public/images/logo-nt.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ActionButton from "../../ui/actionbtn";
import { Bars3Icon } from "@heroicons/react/24/outline";
import FacebookLogo from "../../../../public/icons/fblogo";
import InstagramLogo from "../../../../public/icons/instalogo";
import LinkedinLogo from "../../../../public/icons/linkedinlogo";
import YoutubeLogo from "../../../../public/icons/youtubelogo";
import { useGlobalState } from "@/context/globalStateContext";
import WhatsappIcon from "../../../../public/icons/whatsappIcon";
import { useNavigationLinks } from "@/components/common/navbar/navlinks";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./languageSwitcher";
import { Session } from "next-auth";
import { User2, UserCircle, UserCircle2Icon } from "lucide-react";
import { useUser } from "@/services/hooks/getUser";
import { scrollIntoView } from "@/utils/scrollToView";

const NavigationMenu = ({ session }: { session: null | Session }) => {
  const router = useRouter();
  const type: "member" | "guest" | "admin" =
    session !== null ? "member" : "guest";
  const t = useTranslations("NavigationMenu");
  const ft = useTranslations("Footer");
  const pathName = usePathname();
  const navigationLinks = useNavigationLinks({ type });
  const { hamburgerMenuOpen, setHamburgerMenuOpen } = useGlobalState();
  const navRef = useRef<HTMLDivElement | null>(null);
  const isNavVisible = useIsVisible(navRef);

  const id = session?.user.id;
  const { user, loading, error } = useUser(id as string);

  console.log("user on navmenu > ", user);

  const becomeMemberHandler = () => {
    router.push("/services", { scroll: true });
    router.prefetch("/services");
    setTimeout(() => {
      scrollIntoView("membership-form");
    }, 300);
  };

  // Prevent scrolling when the hamburger menu is open
  useEffect(() => {
    if (hamburgerMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [hamburgerMenuOpen]);

  return (
    <>
      {/* DESKTOP MENU */}
      <div
        className={`hidden md:flex flex-row justify-between items-center px-4 py-2 w-full relative z-20
                ${session !== null ? "bg-gray-800" : "bg-gray-900"}
                ${
                  isNavVisible
                    ? "animate-fade animate-once animate-ease-in"
                    : "opacity-90"
                }`}
        ref={navRef}
      >
        <Image src={logonb} width={70} height={70} alt="" />
        <div className="flex flex-row gap-10">
          {navigationLinks.map((link) => {
            const isActive = pathName === link.link;
            return (
              <Link key={link.id} href={link.link}>
                <span
                  className={`uppercase transition-all duration-300 cursor-pointer font-poppins
                                ${
                                  isActive
                                    ? "text-pear border-b border-b-pear font-normal"
                                    : "text-foreground font-light"
                                }
                                hover:text-pear`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-row gap-10">
          {session === null ? (
            <ActionButton
              text={t("becomeMember")}
              variant="secondary"
              size="md"
              onClick={() => becomeMemberHandler()}
            />
          ) : (
            <button
              className="flex flex-row gap-3 items-end justify-center cursor-pointer text-foreground/80 hover:text-pear transition-colors"
              onClick={() => router.push("/profile")}
            >
              {/* TODO: create a tennis icon placeholder female and male if no avatar available. */}
              {user?.avatar ? (
                <Image
                  src={`/images/avatars/${user.avatar}.jpg`}
                  width={35}
                  height={35}
                  className="rounded-full border border-pear"
                  alt={""}
                />
              ) : (
                <UserCircle2Icon className="w-7 h-7" />
              )}
              <span className="font-nunito text-base text-pear font-bold ">
                {user?.name}
              </span>
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden absolute top-10  w-max bg-gradient-to-tl from-pear to-gray-800 rounded-r-2xl px-2 flex flex-col gap-4 py-2 justify-between items-center z-50 shadow-2xl">
        <Bars3Icon
          className="w-7 h-7 text-gray-900/80"
          onClick={() => setHamburgerMenuOpen(true)}
        />
      </div>
      <div
        className={`${
          hamburgerMenuOpen
            ? "absolute top-0 left-0 w-full h-screen bg-gray-900/95 z-50 overflow-hidden animate-fade-right animate-once animate-ease-in"
            : "w-0 opacity-0 -z-50 animate-fade-left animate-once animate-ease-in"
        }`}
      >
        <div
          className={`absolute top-0 left-0 w-3/4 h-screen bg-linear-to-br from-gray-800 to-gray-900 shadow-2xl items-center ${
            hamburgerMenuOpen
              ? "flex flex-col justify-between gap-10 p-6"
              : "gap-0 p-0 opacity-0"
          }`}
        >
          <div className="flex flex-col w-full gap-10">
            <div className="flex flex-row justify-between w-full items-center">
              <LanguageSwitcher />
              <button
                className="text-foreground text-3xl font-bold cursor-pointer"
                onClick={() => setHamburgerMenuOpen(false)}
              >
                &times;
              </button>
            </div>

            <nav className="flex flex-col w-full">
              {navigationLinks.map((link) => {
                const isActive = pathName === link.link;
                return (
                  <Link
                    key={link.id}
                    href={link.link}
                    className={`w-full p-4 border-l tracking-wider text-2xl ${
                      isActive
                        ? "text-pear font-medium  border-l-pear"
                        : "text-foreground font-light border-l-pear/20 "
                    }`}
                  >
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
              <span className=" text-foreground text-lg font-poppins">
                {ft("chatwhap")}
              </span>
            </div>
            <div className="flex justify-start">
              <Image
                src={logonb}
                width={150}
                height={150}
                alt=""
                className=""
              />
            </div>
            <div className="flex justify-start">
              <ActionButton
                text={t("becomeMember")}
                variant="secondary"
                size="md"
                onClick={() => {
                  becomeMemberHandler();
                  setHamburgerMenuOpen(false);
                }}
              />
            </div>

            <div className="w-full">
              <div className="flex flex-row gap-4 items-center pb-2">
                <FacebookLogo size={30} />
                <InstagramLogo size="30" />
                <LinkedinLogo size="30" />
                <YoutubeLogo size="30" />
              </div>
              <p className="text-pear text-right text-lg font-poppins uppercase text-nowrap border-t border-t-pear/40 w-full tracking-widest font-light">
                {ft("followUs")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;
