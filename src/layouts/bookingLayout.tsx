"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useBookingStore } from "@/stores/bookingStore";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { clearBookingState } = useBookingStore();
  const isFirstRender = useRef(true);

  // Cleanup booking state when leaving /book
  useEffect(() => {
    if (!isFirstRender.current && pathname !== "/book") {
      clearBookingState();
    }
    isFirstRender.current = false;
  }, [pathname, clearBookingState]);

  return <>{children}</>;
}
