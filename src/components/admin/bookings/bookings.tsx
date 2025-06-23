"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsList from "./list";

const Bookings = () => {
  return (
    <>
      <Tabs defaultValue="MEMBER">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="MEMBER">Members</TabsTrigger>
          <TabsTrigger value="GUEST">Guests</TabsTrigger>
        </TabsList>
        <TabsContent value="MEMBER">
          <div className="mt-4">
            <p>Members bookings</p>
            <BookingsList filter="MEMBER" />
          </div>
        </TabsContent>
        <TabsContent value="GUEST">
          <div className="mt-4">
            <p className="">Guests bookings</p>
            <BookingsList filter="GUEST" />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Bookings;
