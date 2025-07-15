"use client";

import { useEffect, useState } from "react";
import { DaysOfWeek, TimesOfDay } from "@/interfaces/daysOfWeek.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/memberCard";
import { useCourtStore } from "@/stores/courtStore";
import { useCourtAvailabilityStore } from "@/stores/courtAvailabilityStore";
import { useBookingStore } from "@/stores/bookingStore";
import { useMemberStore } from "@/stores/memberStore";
import AddSlotModal from "./ui/AddSlotModal";
import DayTabs from "./ui/DayTabs";
import SlotList from "./ui/SlotList";

export function CourtScheduler() {
  const [selectedDay, setSelectedDay] = useState<DaysOfWeek>(DaysOfWeek.MONDAY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);

  const { courts, fetchCourts } = useCourtStore();
  const {
    availabilityData,
    fetchAvailabilityByDay,
    deleteAvailability,
    fetchAllAvailabilities,
  } = useCourtAvailabilityStore();
  const { members, fetchMembers } = useMemberStore();
  const { bookings, fetchBookings } = useBookingStore();

  const days = [
    { value: DaysOfWeek.MONDAY, label: "Monday" },
    { value: DaysOfWeek.TUESDAY, label: "Tuesday" },
    { value: DaysOfWeek.WEDNESDAY, label: "Wednesday" },
    { value: DaysOfWeek.THURSDAY, label: "Thursday" },
    { value: DaysOfWeek.FRIDAY, label: "Friday" },
    { value: DaysOfWeek.SATURDAY, label: "Saturday" },
    { value: DaysOfWeek.SUNDAY, label: "Sunday" },
  ];

  useEffect(() => {
    fetchCourts();
  }, [fetchCourts]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    if (courts.length > 0 && !selectedCourt) {
      setSelectedCourt(courts[0]?.id);
    }
  }, [courts, selectedCourt]);

  useEffect(() => {
    fetchAvailabilityByDay(selectedDay);
  }, [selectedDay, fetchAvailabilityByDay]);

  useEffect(() => {
    fetchAllAvailabilities();
  }, [fetchAllAvailabilities]);

  const handleDeleteAvailability = async (id: string) => {
    await deleteAvailability(id);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          className="bg-pear hover:bg-pear/70 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Add Time Slot
        </Button>
      </div>
      <AddSlotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDay={selectedDay}
      />
      <Card>
        <CardContent className="pt-6 space-y-4">
          <DayTabs
            days={days}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
          <SlotList
            slots={availabilityData[selectedDay] || []}
            bookings={bookings}
            members={members}
            onDelete={handleDeleteAvailability}
          />
        </CardContent>
      </Card>
    </>
  );
}
