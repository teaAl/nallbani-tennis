import { CheckCircle, Clock, XCircle, Flag } from "lucide-react";
import React from "react";

function getStateUI(state: string) {
  switch (state) {
    case "CONFIRMED":
      return {
        color: "bg-pear text-green-800",
        icon: <CheckCircle className="w-4 h-4 mr-1" />,
        label: "Booked",
        tooltip: "This slot is booked and confirmed.",
      };
    case "PENDING":
      return {
        color: "bg-orange-400/70 text-white",
        icon: <Clock className="w-4 h-4 mr-1" />,
        label: "Pending",
        tooltip: "This slot is open for booking.",
      };
    case "CANCELED":
      return {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-4 h-4 mr-1" />,
        label: "Canceled",
        tooltip: "This slot has been canceled.",
      };
    case "COMPLETED":
      return {
        color: "bg- text-gray-800",
        icon: <Flag className="w-4 h-4 mr-1" />,
        label: "Completed",
        tooltip: "This slot is completed.",
      };
    default:
      return {
        color: "bg-gray-100 text-gray-800",
        icon: null,
        label: state,
        tooltip: "",
      };
  }
}

const SlotHeader = ({
  slot,
  bookingsCount,
}: {
  slot: any;
  bookingsCount: number;
}) => {
  const stateUI = getStateUI(slot.bookingState);
  return (
    <div className="flex items-center justify-between px-4 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`font-nunito text-lg font-semibold
              ${slot.bookingState === "CONFIRMED" && "text-pear"}
              ${slot.bookingState === "PENDING" && "text-orange-300"}`}
          >
            {slot.court?.name}
          </span>
          <span className="ml-2 text-xs text-gray-400 bg-pear/10 px-2 py-0.5 rounded">
            {slot.court?.type}
          </span>
          <span
            className={`flex items-center px-2 py-0.5 rounded text-xs font-bold ${stateUI.color} ml-2`}
            title={stateUI.tooltip}
          >
            {stateUI.icon}
            {stateUI.label}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <div className="text-sm text-gray-500 flex flex-row gap-2 items-center">
            {slot.startTime} - {slot.endTime}
          </div>
          <span>|</span>
          <div className="flex flex-row gap-2 items-center ml-2 text-xs text-gray-400 bg-pear/10 px-2 py-0.5 rounded">
            {slot.price}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span
          className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full
            ${slot.bookingState === "CONFIRMED" && "bg-pear/80 text-green-800"}
            ${
              slot.bookingState === "PENDING" && "bg-orange-400/80 text-white"
            }`}
        >
          {bookingsCount}
        </span>
      </div>
    </div>
  );
};

export default SlotHeader;
