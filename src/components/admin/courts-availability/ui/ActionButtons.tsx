import { BookmarkCheck, Eye, TrashIcon, Users2 } from "lucide-react";
import React from "react";

const ActionButtons = ({
  slot,
  setIsDeleteModalOpen,
  setIsBookModalOpen,
  setIsViewBookersModalOpen,
}: {
  slot: any;
  setIsDeleteModalOpen: (open: boolean) => void;
  setIsBookModalOpen: (open: boolean) => void;
  setIsViewBookersModalOpen: (open: boolean) => void;
}) => {
  return (
    <div className="flex flex-row gap-2 border-t-3 border-t-foreground/5 pt-4 w-full justify-between">
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className="text-white text-xs flex flex-row gap-2 items-center bg-red-500/30 px-4 py-2 rounded-md hover:bg-red-500/70 transition-all duration-300 cursor-pointer"
        disabled={
          slot.bookingState === "CONFIRMED" || slot.bookingState === "CANCELED"
        }
        hidden={slot.bookingState === "CONFIRMED"}
        title={
          slot.bookingState === "CONFIRMED"
            ? "Cannot delete a confirmed slot"
            : slot.bookingState === "CANCELED"
            ? "Slot is already canceled"
            : ""
        }
      >
        <TrashIcon className="w-3 h-3" />
        Delete
      </button>
      <button
        onClick={() => setIsBookModalOpen(true)}
        className="enabled:text-white text-xs flex flex-row gap-2 items-center enabled:bg-pear/50 px-4 py-2 rounded-md enabled:hover:bg-pear/70 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-foreground/30 disabled:text-foreground"
        disabled={slot.bookingState !== "PENDING"}
        hidden={slot.bookingState !== "PENDING"}
        title={
          slot.bookingState === "CONFIRMED"
            ? "Slot is already booked"
            : slot.bookingState === "CANCELED"
            ? "Cannot book a canceled slot"
            : ""
        }
      >
        <BookmarkCheck className="w-3 h-3" />
        Choose to approve
      </button>
      <button
        onClick={() => setIsViewBookersModalOpen(true)}
        className="text-xs flex flex-row gap-2 items-center px-4 py-2 rounded-md transition-all duration-300 cursor-pointer bg-foreground/30 hover:bg-foreground/40 text-foreground"
        disabled={slot.bookingState === "PENDING"}
        hidden={slot.bookingState === "PENDING"}
        title={
          slot.bookingState === "CONFIRMED"
            ? "Slot is already booked"
            : slot.bookingState === "CANCELED"
            ? "Cannot book a canceled slot"
            : ""
        }
      >
        <Eye className="w-3 h-3" />
        View previous bookers
      </button>
    </div>
  );
};

export default ActionButtons;
