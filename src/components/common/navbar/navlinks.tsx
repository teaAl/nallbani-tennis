'use client';

import { useTranslations } from "next-intl";

export const useNavigationLinks = () => {
    const t = useTranslations("NavigationMenu");

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
};