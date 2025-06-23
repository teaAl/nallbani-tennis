"use client";

import { useEffect, useState } from "react";
import { DaysOfWeek, TimesOfDay } from "@/interfaces/daysOfWeek.interface";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/memberCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2Icon, X } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { useCourtStore } from "@/stores/courtStore";
import { useCourtAvailabilityStore } from "@/stores/courtAvailabilityStore";

export function CourtScheduler() {
  const [selectedDay, setSelectedDay] = useState<DaysOfWeek>(DaysOfWeek.MONDAY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCourtModalOpen, setDeleteCourtModalOpen] =
    useState<boolean>(false);
  const [selectedAvailability, setSelectedAvailability] = useState<
    string | null
  >(null);
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<TimesOfDay>(TimesOfDay["08:00"]);
  const [endTime, setEndTime] = useState<TimesOfDay>(TimesOfDay["09:00"]);
  const [price, setPrice] = useState<number>(1000);

  const {
    courts,
    loading: courtsLoading,
    error: courtsError,
    fetchCourts,
  } = useCourtStore();
  const {
    availabilityData,
    loading: availabilityLoading,
    error: availabilityError,
    fetchAvailabilityByDay,
    addAvailability,
    deleteAvailability,
  } = useCourtAvailabilityStore();

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
    if (courts.length > 0 && !selectedCourt) {
      setSelectedCourt(courts[0]?.id);
    }
  }, [courts, selectedCourt]);

  useEffect(() => {
    fetchAvailabilityByDay(selectedDay);
  }, [selectedDay, fetchAvailabilityByDay]);

  const handleAddCourtAvailability = async () => {
    if (!selectedCourt) return;
    await addAvailability({
      courtId: selectedCourt,
      dayOfWeek: selectedDay,
      startTime,
      endTime,
      price: Number(price),
    });
    setIsModalOpen(false);
  };

  const handleDeleteAvailability = async (id: string) => {
    await deleteAvailability(id);
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <Tabs
            defaultValue={selectedDay}
            onValueChange={(value) => setSelectedDay(value as DaysOfWeek)}
          >
            <TabsList className="grid grid-cols-7">
              {days.map((day) => (
                <TabsTrigger key={day.value} value={day.value}>
                  {day.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Show loading state */}
            {/* {loading && (
              <div className="text-center py-8">
                <span className="text-gray-500">Loading availability...</span>
              </div>
            )} */}

            {/* Show error state */}
            {availabilityError && (
              <div className="text-center py-8">
                <span className="text-red-500">{availabilityError}</span>
              </div>
            )}

            {days.map((day) => (
              <TabsContent key={day.value} value={day.value} className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {day.label} Availability
                  </h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-pear hover:bg-pear/70 cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Time Slot
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Available Time Slot</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Court</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select court" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="court1">Court 1</SelectItem>
                              <SelectItem value="court2">Court 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Time</Label>
                            <Input type="time" />
                          </div>
                          <div className="space-y-2">
                            <Label>End Time</Label>
                            <Input type="time" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Repeat</Label>
                          <Select defaultValue="no">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="no">Do not repeat</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="custom">Custom...</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-lime-500 hover:bg-lime-600">
                            Add Time Slot
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {availabilityData[selectedDay]?.length > 0 ? (
                  <div className="space-y-3">
                    {availabilityData[selectedDay].map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md border"
                      >
                        <div>
                          <div className="font-medium">{slot.court?.name}</div>
                          <div className="text-sm text-gray-500">
                            {slot.startTime} - {slot.endTime}
                          </div>
                        </div>
                        <Trash2Icon
                          className="h-4 w-4 text-red-500 cursor-pointer hover:scale-110 transition-all duration-200"
                          onClick={() => {
                            setDeleteCourtModalOpen(true);
                            setSelectedAvailability(slot.id);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No available time slots for{" "}
                    {days.find((d) => d.value === selectedDay)?.label}. Add some
                    time slots for members to book.
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4  text-pear">
          Add a new court availability for booking
        </h2>

        {/* <form className="flex flex-col gap-1"> */}
        <div className="flex flex-row gap-4 justify-between">
          <div>
            <label className="text-foreground/70 text-sm font-poppins font-light">
              Select Court
            </label>
            <select
              value={selectedCourt || ""}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="w-full border rounded-md p-2 mb-4 border-pear focus:outline-pear"
            >
              {courts.map((court) => (
                <option key={court.id} value={court.id}>
                  {court.name} - {court.type}{" "}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-foreground/70 text-sm font-poppins font-light">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value as unknown as number)}
              className="border border-pear rounded-md p-2 mb-4 w-full focus:outline-pear placeholder:text-foreground/30"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-between">
          <div>
            <label className="text-foreground/70 text-sm font-poppins font-light">
              Start Time
            </label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value as TimesOfDay)}
              className="w-full border rounded-md p-2 mb-4 border-pear focus:outline-pear"
            >
              {Object.values(TimesOfDay).map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-foreground/70 text-sm font-poppins font-light">
              End Time
            </label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value as TimesOfDay)}
              className="w-full border rounded-md p-2 mb-4 border-pear focus:outline-pear"
            >
              {Object.values(TimesOfDay).map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <button
            className="bg-pear hover:bg-pear/80 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-200"
            onClick={handleAddCourtAvailability}
            disabled={availabilityLoading}
          >
            {availabilityLoading ? "Adding..." : "Add Court Availability"}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ml-2"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
        {/* </form> */}
      </Modal>
      <Modal
        isOpen={deleteCourtModalOpen}
        onClose={() => setDeleteCourtModalOpen(false)}
      >
        <h2 className="text-lg font-bold mb-4 text-red-500">
          Are you sure you want to delete this court availability?
        </h2>
        <div className="flex flex-row justify-center items-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-200"
            onClick={() => {
              if (selectedAvailability)
                handleDeleteAvailability(selectedAvailability);
              setDeleteCourtModalOpen(false);
            }}
            disabled={availabilityLoading}
          >
            {availabilityLoading ? "Deleting..." : "Delete Court Availability"}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ml-2"
            onClick={() => {
              setDeleteCourtModalOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}
/*
TODO: after adding a new court availability, fetch the updated data and update the state
TODO: add a loading state when adding a new court availability
TODO: add a success message after adding a new court availability
TODO: add percantage calcualtion for the court availability price for guests only (members have the discounted price)
TODO: manage the courts availability by filtering for the week we are in + add past bookings for admin to check
*/
