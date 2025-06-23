import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { scrollIntoView } from "./scrollToView";

export const requestMembership = (router: AppRouterInstance) => {
  router.push("/services", { scroll: true });
  router.prefetch("/services");
  setTimeout(() => {
    scrollIntoView("membership-form");
  }, 300);
};

// DOES not work when on login page.
