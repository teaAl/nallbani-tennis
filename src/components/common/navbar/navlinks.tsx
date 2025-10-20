"use client";

import { useTranslations } from "next-intl";

export const useNavigationLinks = ({
  type,
}: {
  type: "member" | "guest" | "admin" | "default";
}) => {
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
          link: "/book",
          name: t("bookacourt"),
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
          link: "/book",
          name: t("bookacourt"),
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
        // {
        //   id: 5,
        //   link: "/book",
        //   name: t("bookacourt"),
        // },
      ];
  }
};
