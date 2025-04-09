'use client';

import { useTranslations } from "next-intl";

export const useNavigationLinks = ({type}: {type: 'member' | 'guest' | 'admin' }) => {
    const t = useTranslations("NavigationMenu");

    switch (type) {
        case "admin":
            return [
                {
                    id: 1,
                    link: "/",
                    name: t("home"),
                },
                {
                    id: 2,
                    link: "/about",
                    name: t("aboutUs"),
                },
                {
                    id: 3,
                    link: "/services",
                    name: t("services"),
                },
                {
                    id: 5,
                    link: "/pricing",
                    name: t("pricing"),
                },
            ];
        case "member":
            return [
                {
                    id: 1,
                    link: "/",
                    name: t("home"),
                },
                {
                    id: 2,
                    link: "/about",
                    name: t("aboutUs"),
                },
                {
                    id: 3,
                    link: "/services",
                    name: t("services"),
                },
                {
                    id: 6,
                    link: "/bring-a-friend",
                    // name: t("pricing"),
                    name: "bring a friend",
                },
            ];
        case "guest":
            return [
                {
                    id: 1,
                    link: "/",
                    name: t("home"),
                },
                {
                    id: 2,
                    link: "/about",
                    name: t("aboutUs"),
                },
                {
                    id: 3,
                    link: "/services",
                    name: t("services"),
                },
                {
                    id: 5,
                    link: "/pricing",
                    name: t("pricing"),
                },
            ];
        default:
            return [
                {
                    id: 1,
                    link: "/",
                    name: t("home"),
                },
                {
                    id: 2,
                    link: "/about",
                    name: t("aboutUs"),
                },
                {
                    id: 3,
                    link: "/services",
                    name: t("services"),
                },
                {
                    id: 5,
                    link: "/pricing",
                    name: t("pricing"),
                },
            ];
    }
};