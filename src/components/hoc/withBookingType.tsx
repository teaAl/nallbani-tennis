// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { scrollIntoView } from "@/utils/scrollToView";

// const withBookingType = (WrappedComponent: React.ComponentType) => {
//     return (props: any) => {
//         const { lessonType, clearBookingState } = useGlobalState();
//         const router = useRouter();
//         const pathName = usePathname();

//         useEffect(() => {
//             if (pathName === "/book") {
//             } else {
//                 // localStorage.removeItem("bookingState");
//                 clearBookingState();
//             }

//             const handleRouteChange = (url: string) => {
//                 if (!url.startsWith("/book")) {
//                     localStorage.removeItem("bookingState");
//                 }
//             }

//             return () => {
//                 // If component unmounts and we're not on /book, clear state
//                 if (pathName !== "/book") {
//                     localStorage.removeItem("bookingState");
//                 }
//             };
//         }, [pathName]);

//         useEffect(() => {
//             if (!lessonType) {
//                 router.push("/#start-booking", { scroll: true });
//                 setTimeout(() => {
//                     scrollIntoView("start-booking");
//                 }, 300);
//             } else {
//                 router.push("/book");
//             }
//         }, [lessonType, router]);

//         if (!lessonType) {
//             return null; // Render nothing while redirecting
//         }

//         return <WrappedComponent {...props} />;
//     };
// };

// export default withBookingType;
// /*
// TODO:
// 1. Find a better solution for redirecting to start-booking section
// */
