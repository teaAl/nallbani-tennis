// "use client";

import GeneralBanner from "@/components/common/generalBanner";
import { Card, CardContent } from "@/components/ui/memberCard";
import { DaysOfWeek } from "@/interfaces/daysOfWeek.interface";
// import { useEffect, useState } from "react";
import { Calendar, Calendar1Icon, Clock4Icon, InfoIcon } from "lucide-react";
import HowItWorks from "@/components/admin/bookings/howItWorks";
import Availabilities from "../../../components/admin/bookings/availabilities";
import { useAuthStore } from "@/stores/authStore";
import { redirect } from "next/navigation";

const Book = () => {
  redirect("/");
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedDay, setSelectedDay] = useState<DaysOfWeek>(DaysOfWeek.MONDAY);
  const [daysWithAvailability, setDaysWithAvailability] = useState<
    DaysOfWeek[]
  >([]);

  const userEmail = user?.email;

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

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
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
    console.log("is Authenticated:", isAuthenticated);
    console.log("User:", user);
  }, []);

  useEffect(() => {
    fetchAvailabilityByDay(selectedDay);
    console.log("Selected day:", selectedDay);
    console.log("Availability data:", availabilityData);
    setSelectedAvailability(availabilityData[selectedDay][0]?.id);
    console.log("Selected availability:", selectedAvailability);
  }, [selectedDay]);

  const handleBookCourt = async () => {
    if (!isAuthenticated) {
      try {
        setLoading(true);
        const response = await fetch("/api/bookings/guest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookerType: "GUEST",
            courtAvailabilityId: selectedAvailability,
            guestEmail: email,
            guestName: name,
            guestPhone: phone,
            needsEquipment: needEquipment,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to book court");
        }
        const bookingData = await response.json();
        console.log("Booking successful:", bookingData);

        console.log("Booking court with data:", {
          selectedAvailability,
          name,
          email,
          phone,
          needEquipment,
        });
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("Failed to book court")
        );
        console.error("Error booking court:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await fetch("/api/bookings/member", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookerType: "MEMBER",
            courtAvailabilityId: selectedAvailability,
            userId: user?.id,
            // guestEmail: email,
            // guestName: name,
            // guestPhone: phone,
            // needsEquipment: needEquipment,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to book court");
        }
        const bookingData = await response.json();
        console.log("Booking successful:", bookingData);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("Failed to book court")
        );
        console.error("Error booking court:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <GeneralBanner title={"Book a court"} />

      <div className="col-span-4 flex flex-col gap-20 w-full h-full items-center justify-around md:bg-gray-900/90 md:bg-blend-overlay md:bg-cover md:bg-bottom md:bg-no-repeat md:bg-[url(/images/tennisbg.png)] bg-fixed">
        <HowItWorks />

        <div className=" flex flex-row justify-between /items-center gap-8 w-full max-w-5xl">
          {/* Court availability to book */}
          <Availabilities
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            daysWithAvailability={daysWithAvailability}
            availabilityData={availabilityData}
            selectedAvailability={selectedAvailability as string}
            setSelectedAvailability={setSelectedAvailability}
          />
          {/* Court booking confirmation */}
          <div className="relative flex flex-col gap-6">
            <h3 className="text-gray-900 bg-pear font-semibold md:text-xl text-lg text-center font-poppins w-max px-1">
              Complete Your Booking
            </h3>
            <Card
              className={`shadow-md backdrop-blur-sm bg-transparent border-l border-l-pear/10 h-full`}
            >
              <CardContent className="h-full">
                <div className="flex flex-col min-h-full justify-between">
                  <div>
                    {isAuthenticated ? (
                      <p className="text-foreground/70 font-poppins font-light text-sm">
                        {/* You are logged in as{" "}
                        <span className="text-foreground font-semibold">
                          {session?.user?.email || "Guest"}
                        </span> */}
                        <input
                          type="text"
                          placeholder={user?.email || "Name"}
                          className="border border-pear rounded-md p-2 mb-4 w-full focus:outline-pear placeholder:text-foreground/30"
                          value={user?.email || ""}
                          // onChange={(e) => setName(e.target.value)}
                          readOnly
                        />
                        {/*TODO: add more data to user session - phone, name*/}
                      </p>
                    ) : (
                      <>
                        <input
                          type="text"
                          placeholder="Name"
                          className="border border-pear rounded-md p-2 mb-4 w-full focus:outline-pear placeholder:text-foreground/30"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          className="border border-pear rounded-md p-2 mb-4 w-full focus:outline-pear placeholder:text-foreground/30"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Phone Number"
                          className="border border-pear rounded-md p-2 mb-4 w-full focus:outline-pear placeholder:text-foreground/30"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
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
                      </>
                    )}

                    <div className="flex flex-col gap-2 bg-gray-800/30 p-2 rounded-md mt-2 text-foreground/70 font-poppins font-light text-sm">
                      <div className="flex flex-row justify-between border-b border-b-pear/20 pb-2">
                        <p className="flex items-center gap-2 text-sm font-semibold text-pear/60">
                          {
                            availabilityData[selectedDay].find(
                              (availability) =>
                                availability.id === selectedAvailability
                            )?.court?.name
                          }
                          {" - "}
                          {
                            availabilityData[selectedDay].find(
                              (availability) =>
                                availability.id === selectedAvailability
                            )?.court?.type
                          }
                        </p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p className="flex items-center gap-2 text-xs font-light">
                          <Calendar1Icon className="inline h-3.5 w-3.5" />
                          <span className="">
                            {
                              availabilityData[selectedDay].find(
                                (availability) =>
                                  availability.id === selectedAvailability
                              )?.dayOfWeek
                            }
                          </span>
                        </p>
                        <p className="flex items-center gap-2 text-xs font-light">
                          <Clock4Icon className="inline h-5.5 w-3.5" />
                          <span className="">
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
                    </div>
                  </div>
                  <div className="border-t border-t-pear/5 w-full flex flex-row justify-between items-center pt-2">
                    <span className="text-foreground">Total</span>
                    <div>
                      <span className="text-foreground font-semibold">
                        {
                          availabilityData[selectedDay].find(
                            (availability) =>
                              availability.id === selectedAvailability
                          )?.price
                        }{" "}
                        ALL
                      </span>
                      {/* <span className="text-foreground font-medium">10 €</span> */}
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-pear text-gray-900 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 w-full"
                      onClick={handleBookCourt}
                      disabled={!selectedAvailability || loading}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Blur the card if no availability */}
            {!selectedAvailability && (
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                <div className="text-center p-6">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-pear" />
                  <h3 className="text-lg font-semibold mb-2 text-pear">
                    Select a Court First
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Please choose an available court and time slot from the left
                    to continue with your booking.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-pear/10 backdrop-blur-sm  rounded-md p-4 flex flex-row gap-2 items-center justify-center w-full max-w-7xl">
          <InfoIcon className="w-4 h-4 text-pear/70" />
          <p className="text-pear/70 font-poppins font-light text-sm">
            Due to high demand for tennis court bookings, your request will be
            marked as pending. You will be notified once it is accepted or
            rejected.
          </p>
        </div>
      </div>
    </>
  );
};

export default Book;

/*
TODO:
- Add a loading state while fetching availability data, error handling, and a success message after booking.
- Filter only pending bookings and maybe show the number of bookers for that availability. (Create a method)
- create journey for booking a court (member or guest)
- State managment is a must before modulating the booking component
- Redirect to thank you page after booking
- send whapp message to the user with booking details (id) after approval 
- send whapp message to the user if booking is rejected and suggest to book another availability
*/
