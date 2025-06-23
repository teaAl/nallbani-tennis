import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DaysOfWeek } from "@/interfaces/daysOfWeek.interface";
import { Clock4Icon, HouseIcon, TreesIcon } from "lucide-react";

const Availabilities = ({
  selectedDay,
  setSelectedDay,
  daysWithAvailability,
  availabilityData,
  selectedAvailability,
  setSelectedAvailability,
}: {
  selectedDay: DaysOfWeek;
  setSelectedDay: (day: DaysOfWeek) => void;
  daysWithAvailability: DaysOfWeek[];
  availabilityData: Record<
    DaysOfWeek,
    {
      id: string;
      startTime: string;
      endTime: string;
      court?: { name: string; type: string; indoor?: boolean };
    }[]
  >;
  selectedAvailability: string;
  setSelectedAvailability: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-6">
        <h3 className="text-gray-900 bg-pear font-semibold md:text-xl text-lg text-center font-poppins w-max px-1">
          Available Courts to Book
        </h3>
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
      </div>
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
  );
};

export default Availabilities;
