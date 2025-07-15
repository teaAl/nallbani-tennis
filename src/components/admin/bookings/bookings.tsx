"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsList from "./list";
import { useBookingStore } from "@/stores/bookingStore";
import { useEffect } from "react";

const Bookings = () => {
  const { bookingTypeFilter, setBookingTypeFilter, fetchBookings, bookings } =
    useBookingStore();

  return (
    <Tabs
      value={bookingTypeFilter}
      defaultValue="MEMBER"
      onValueChange={(val) => setBookingTypeFilter(val as "MEMBER" | "GUEST")}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="MEMBER"
          onClick={() => setBookingTypeFilter("MEMBER")}
        >
          Members
        </TabsTrigger>
        <TabsTrigger
          value="GUEST"
          onClick={() => setBookingTypeFilter("GUEST")}
        >
          Guests
        </TabsTrigger>
      </TabsList>
      <TabsContent value="MEMBER">
        <div className="mt-4">
          <p>Members bookings</p>
          <BookingsList />
        </div>
      </TabsContent>
      <TabsContent value="GUEST">
        <div className="mt-4">
          <p className="">Guests bookings</p>
          <BookingsList />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Bookings;
