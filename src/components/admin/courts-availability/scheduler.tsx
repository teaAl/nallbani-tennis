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

  const [availabilityData, setAvailabilityData] = useState<
    Record<DaysOfWeek, any[]>
  >({
    [DaysOfWeek.MONDAY]: [],
    [DaysOfWeek.TUESDAY]: [],
    [DaysOfWeek.WEDNESDAY]: [],
    [DaysOfWeek.THURSDAY]: [],
    [DaysOfWeek.FRIDAY]: [],
    [DaysOfWeek.SATURDAY]: [],
    [DaysOfWeek.SUNDAY]: [],
  });

  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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
    const fetchCourts = async () => {
      try {
        setLoading(true);
        const respoonse = await fetch("/api/courts");
        if (!respoonse.ok) {
          throw new Error("Failed to fetch courts");
        }
        const data = await respoonse.json();
        const courts = data.courts;
        setCourts(courts);
        console.log("courts > ", courts);
        setSelectedCourt(courts[0]?.id);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch courts")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCourts();
  }, []);

  const fetchAvailabilityByDay = async (day: DaysOfWeek) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/court-availability?dayOfWeek=${day}`);
      if (!response.ok) {
        throw new Error("Failed to fetch availability");
      }
      const data = await response.json();
      setAvailabilityData((prev) => ({
        ...prev,
        [day]: data,
      }));
      console.log("Fetched availability data:", data);
      // return data;
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("Failed to fetch availability")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailabilityByDay(selectedDay);
  }, [selectedDay]);

  const handleAddCourtAvailability = async () => {
    try {
      const response = await fetch("/api/court-availability", {
        method: "POST",
        body: JSON.stringify({
          courtId: selectedCourt,
          dayOfWeek: selectedDay,
          startTime: startTime,
          endTime: endTime,
        }),
      });
      if (!response.ok) {
        throw new Error(
          "Failed to add court availability" + (await response.json())
        );
      }
      const data = await response.json();
      console.log("Court availability added successfully:", data);
    } catch (error) {
      console.error("Error adding court availability:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteAvailability = async (id: string) => {
    try {
      console.log("Deleting availability with ID:", id);
      const response = await fetch(`/api/court-availability/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete availability");
      }

      // Update the state to remove the deleted slot
      setAvailabilityData((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((day) => {
          updated[day as DaysOfWeek] = updated[day as DaysOfWeek].filter(
            (slot) => slot.id !== id
          );
        });
        return updated;
      });
    } catch (error) {
      console.error("Error deleting availability:", error);
    }
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
            {error && (
              <div className="text-center py-8">
                <span className="text-red-500">{error.message}</span>
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

                {availabilityData[day.value]?.length > 0 ? (
                  <div className="space-y-3">
                    {availabilityData[day.value].map((slot) => (
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
                    No available time slots for {day.label}. Add some time slots
                    for members to book.
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
          >
            Add Court Availability
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
              handleDeleteAvailability(selectedAvailability!);
              setDeleteCourtModalOpen(false);
            }}
          >
            Delete Court Availability
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
*/
