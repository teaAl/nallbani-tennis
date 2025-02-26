"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useGlobalState } from "@/context/globalStateContext";

export default function BookingLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { loadStateFromLocalStorage, clearBookingState } = useGlobalState();
    const isFirstRender = useRef(true);

    // Handle initial state loading - only runs once
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            if (pathname === "/book") {
                loadStateFromLocalStorage(pathname);
            }
        }

        // Cleanup function that runs when unmounting or route changes
        return () => {
            if (pathname !== "/book") {
                clearBookingState();
            }
        };
    }, []); // Empty dependency array - only run on mount and unmount

    // This effect handles route changes after initial render
    useEffect(() => {
        // Skip the first render since we already handled it
        if (!isFirstRender.current) {
            if (pathname !== "/book") {
                clearBookingState();
            }
        }
    }, [pathname, clearBookingState]);

    return <>{children}</>;
}