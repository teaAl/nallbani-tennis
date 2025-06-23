import { scrollIntoView } from "@/utils/scrollToView";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const requestMembership = (router: AppRouterInstance) => {
  //   const router = useRouter();
  router.push("/services", { scroll: true });
  router.prefetch("/services");
  setTimeout(() => {
    scrollIntoView("membership-form");
  }, 300);
};
