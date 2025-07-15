import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { TimesOfDay, DaysOfWeek } from "@/interfaces/daysOfWeek.interface";
import { useCourtAvailabilityStore } from "@/stores/courtAvailabilityStore";
import { useCourtStore } from "@/stores/courtStore";

interface AddSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: DaysOfWeek;
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({
  isOpen,
  onClose,
  selectedDay,
}) => {
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<TimesOfDay>(TimesOfDay["08:00"]);
  const [endTime, setEndTime] = useState<TimesOfDay>(TimesOfDay["09:00"]);
  const [price, setPrice] = useState<number>(1000);

  const { courts } = useCourtStore();
  const { loading: availabilityLoading, addAvailability } =
    useCourtAvailabilityStore();

  const handleAddCourtAvailability = async () => {
    if (!selectedCourt) return;
    await addAvailability({
      courtId: selectedCourt,
      dayOfWeek: selectedDay,
      startTime,
      endTime,
      price: Number(price),
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      {/* </form> */}
    </Modal>
  );
};

export default AddSlotModal;
