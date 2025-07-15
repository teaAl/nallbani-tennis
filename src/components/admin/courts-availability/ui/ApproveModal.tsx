import { Booking } from "@/interfaces/booking.interface";
import { Modal } from "@/components/ui/modal";
import React from "react";

const ApproveModal = ({
  isOpen,
  onClose,
  bookings,
  selectedBookingId,
  setSelectedBookingId,
  isApproving,
  onApprove,
  error,
  getUserName,
}: {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  selectedBookingId: string | null;
  setSelectedBookingId: (id: string | null) => void;
  isApproving: boolean;
  onApprove: () => Promise<void>;
  error: string | null;
  getUserName: (userId: string) => string;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4  text-olive">
        Select a player for your booking
      </h2>
      <form>
        <div className="flex flex-col gap-3">
          {bookings.map((booking) => (
            <label
              key={booking.id}
              className="flex items-center gap-2 text-gray-600 text-sm font-semibold font-poppins cursor-pointer w-max"
            >
              <input
                type="radio"
                name="booking"
                value={booking.id}
                checked={selectedBookingId === booking.id}
                onChange={() => setSelectedBookingId(booking.id)}
                disabled={isApproving}
              />
              {booking.bookerType === "MEMBER"
                ? getUserName(booking.userId ?? "")
                : booking.guestName}{" "}
              -{" "}
              <span className="text-olive font-light">
                {booking.bookerType.toLowerCase()}{" "}
              </span>
            </label>
          ))}
        </div>
      </form>
      <div className="flex gap-2 mt-4">
        <button
          disabled={!selectedBookingId || isApproving}
          onClick={async (e) => {
            e.preventDefault();
            await onApprove();
          }}
          className="bg-olive px-4 py-2 rounded text-white disabled:opacity-60"
        >
          {isApproving ? "Approving..." : "Approve"}
        </button>
        <button
          onClick={onClose}
          className="bg-foreground/70 text-white px-4 py-2 rounded"
          disabled={isApproving}
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </Modal>
  );
};

export default ApproveModal;
