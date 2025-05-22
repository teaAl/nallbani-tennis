"use client";

import GeneralBanner from "@/components/common/generalBanner";
import { Card, CardContent } from "@/components/ui/memberCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DaysOfWeek } from "@/interfaces/daysOfWeek.interface";
import { useEffect, useState } from "react";
import { Clock4Icon, HouseIcon, TreesIcon } from "lucide-react";

const Book = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedDay, setSelectedDay] = useState<DaysOfWeek>(DaysOfWeek.MONDAY);
  const [daysWithAvailability, setDaysWithAvailability] = useState<
    DaysOfWeek[]
  >([]);

  const [selectedAvailability, setSelectedAvailability] = useState<
    string | null
  >(null);

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

  const [needEquipment, setNeedEquipment] = useState<boolean>(false);

  const fetchAllAvailability = async () => {
    setLoading(true);
    try {
      const allDaysData = await Promise.all(
        Object.values(DaysOfWeek).map(async (day) => {
          const response = await fetch(
            `/api/court-availability?dayOfWeek=${day}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch availability for ${day}`);
          }
          const data = await response.json();
          return { day, data };
        })
      );

      // Update days with availability
      const daysWithData = allDaysData
        .filter(({ data }) => data.length > 0)
        .map(({ day }) => day);
      setDaysWithAvailability(daysWithData);

      console.log("Days with availability:", daysWithData);

      // Set initial selected day to the first day with availability
      if (
        daysWithData.length > 0 &&
        !daysWithAvailability.includes(selectedDay)
      ) {
        setSelectedDay(daysWithData[0]);
      }
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
    fetchAllAvailability();
  }, []);

  useEffect(() => {
    fetchAvailabilityByDay(selectedDay);
    console.log("Selected day:", selectedDay);
    console.log("Availability data:", availabilityData);
    setSelectedAvailability(availabilityData[selectedDay][0]?.id);
    console.log("Selected availability:", selectedAvailability);
  }, [selectedDay]);

  return (
    <>
      <GeneralBanner title={"Book a court"} />
      <div className="col-span-4 flex w-full h-full items-center justify-around md:bg-gray-900/90 md:bg-blend-overlay md:bg-cover md:bg-bottom md:bg-no-repeat md:bg-[url(/images/tennisbg.png)]">
        <div className=" flex flex-row justify-between /items-center gap-8 w-full max-w-4xl">
          {/* Court availability to book */}
          <div className="flex flex-col gap-4 w-full">
            <h3>Available Courts</h3>
            <Tabs
              defaultValue={selectedDay}
              onValueChange={(value) => setSelectedDay(value as DaysOfWeek)}
            >
              <TabsList>
                {daysWithAvailability.map((day) => (
                  <TabsTrigger
                    key={day}
                    value={day}
                    className="text-foreground/70 hover:text-foreground font-poppins font-light"
                  >
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {availabilityData[selectedDay].map((availability, index) => (
              <div key={index} className="w-full relative">
                <input
                  type="radio"
                  id={availability.id}
                  value={availability.id}
                  name="courtBooking"
                  checked={selectedAvailability === availability.id}
                  onChange={() => setSelectedAvailability(availability.id)}
                  className="peer absolute opacity-0 w-full h-full cursor-pointer"
                />
                <label
                  htmlFor={availability.id}
                  className="flex items-center justify-between p-3 rounded-md border border-pear/5 shadow-md backdrop-blur-sm
                     cursor-pointer transition-all duration-200
                     peer-checked:border-pear peer-checked:bg-pear/5
                     hover:border-pear/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-foreground">
                        {availability.court?.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            availability.court?.type === "GRASS"
                              ? "bg-pear/10 text-pear"
                              : availability.court?.type === "HARD"
                              ? "bg-[#FFC61B]/10 text-[#FFC61B]"
                              : "bg-[#b3404a]/10 text-[#b3404a]"
                          }`}
                        >
                          {availability.court?.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="text-sm text-foreground/70 font-poppins gap-1 font-light flex flex-row items-center">
                        <Clock4Icon className="h-3 w-3 inline-flex mr-1" />
                        {availability.startTime} - {availability.endTime}
                      </span>
                      <span className="text-xs text-foreground/50 font-poppins gap-1 font-light flex flex-row items-center">
                        {availability.court?.indoor ? (
                          <HouseIcon className="w-3 h-3 " />
                        ) : (
                          <TreesIcon className="w-3 h-3" />
                        )}
                        {availability.court?.indoor ? "Indoor" : "Outdoor"}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 border-pear relative
                      ${
                        selectedAvailability === availability.id
                          ? "border-pear"
                          : "border-pear/50"
                      } transition-all duration-200`}
                    >
                      <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full
                        ${
                          selectedAvailability === availability.id
                            ? "bg-pear scale-100"
                            : "bg-pear scale-0"
                        } transition-transform duration-200`}
                      />
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
          {/* Court booking confirmation */}
          <div className="flex flex-col gap-4 w-full">
            <h3>Booking Details</h3>
            <Card className="shadow-md backdrop-blur-sm bg-transparent border-l border-l-pear/10">
              <CardContent>
                <div className="flex flex-col gap-2">
                  <h4 className="text-foreground/70 font-poppins font-light">
                    Complete your booking
                  </h4>
                  <div>
                    <p>Booking as a guest</p>
                  </div>
                  <div>
                    <p>
                      <span className="text-foreground font-medium">
                        {
                          availabilityData[selectedDay].find(
                            (availability) =>
                              availability.id === selectedAvailability
                          )?.court?.name
                        }
                      </span>
                    </p>
                    <p>
                      <span className="text-foreground font-medium">
                        {
                          availabilityData[selectedDay].find(
                            (availability) =>
                              availability.id === selectedAvailability
                          )?.startTime
                        }{" "}
                        -{" "}
                        {
                          availabilityData[selectedDay].find(
                            (availability) =>
                              availability.id === selectedAvailability
                          )?.endTime
                        }
                      </span>
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="border border-pear rounded-md p-2 mb-4 w-full focus:outline-pear placeholder:text-foreground/30"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="border border-pear rounded-md p-2 mb-4 w-full focus:outline-pear placeholder:text-foreground/30"
                      required
                    />

                    <div className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        id="customCheckbox"
                        className="peer sr-only"
                        checked={needEquipment}
                        onChange={(e) => setNeedEquipment(e.target.checked)}
                      />
                      <label
                        htmlFor="customCheckbox"
                        className="flex items-center cursor-pointer"
                      >
                        <div
                          className={`
                            w-4 h-4 border-2 border-pear/50 rounded
                            flex items-center justify-center
                            ${needEquipment ? "border-pear bg-pear/5" : ""}
                            transition-all duration-200
                            hover:border-pear
                          `}
                        >
                          <svg
                            className={`
                              w-2.5 h-2.5 text-pear
                              ${needEquipment ? "opacity-100" : "opacity-0"}
                              transition-opacity duration-200
                            `}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="ml-2 text-sm text-foreground/70">
                          I need equipment (rackets, balls)
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="border-t border-t-pear/5 w-full flex flex-row justify-between items-center pt-2">
                    <div>Total Price:</div>
                    <div>
                      {/* <span className="text-foreground font-medium">
                          {
                            availabilityData[selectedDay].find(
                              (availability) =>
                                availability.id === selectedAvailability
                            )?.price
                          }{" "}
                          €
                        </span> */}
                      <span className="text-foreground font-medium">10 €</span>
                    </div>
                  </div>
                  <div>
                    <button className="bg-pear text-gray-900 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 w-full">
                      Book Now
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
