import { Booking } from "@/interfaces/booking.interface";
import { Modal } from "@/components/ui/modal";
import React from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "lucide-react";

const ViewBookersModal = ({
  isOpen,
  onClose,
  bookings,
  selectedBookingId,
  getUserName,
  getUserEmail,
  getUserPhone,
}: {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  selectedBookingId: string | null;
  getUserName: (userId: string) => string;
  getUserEmail: (userId: string) => string;
  getUserPhone: (userId: string) => string;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4  text-olive">Previous Bookers</h2>
      <div className="flex flex-col gap-3">
        {bookings.map((booking) => (
          <>
            {booking.bookerType === "MEMBER" ? (
              <div
                key={booking.id}
                className="flex flex-row gap-2 justify-between border-b border-b-olive/10 p-2"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-olive font-poppins">
                    {getUserName(booking.userId ?? "")}
                  </span>
                  <span className="text-xs  px-2 py-0.5 rounded bg-pear text-green-800 w-max">
                    member
                  </span>
                </div>

                <div>
                  <div className="flex flex-col gap-3">
                    <span className="text-xs text-gray-500 flex flex-row gap-0.5 items-center">
                      <EnvelopeIcon className="w-3 h-3 mr-1" />

                      {getUserEmail(booking.userId ?? "")}
                    </span>
                    <span className="text-xs text-gray-500 flex flex-row gap-0.5 items-center">
                      <PhoneIcon className="w-3 h-3 mr-1" />

                      {getUserPhone(booking.userId ?? "")}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-2 justify-between border-b border-b-olive/10 p-2">
                <div className="flex flex-col gap-2 border-r pr-4 border-r-pear/30">
                  <span className="text-orange-400 font-poppins">
                    {booking.guestName}
                  </span>
                  <span className="text-xs  px-2 py-0.5 rounded bg-orange-400/70 text-white w-max">
                    guest
                  </span>
                </div>

                <div>
                  <div className="flex flex-col gap-3">
                    <span className="text-xs text-gray-500 flex flex-row gap-0.5 items-center">
                      <EnvelopeIcon className="w-3 h-3 mr-1" />
                      {booking.guestEmail}
                    </span>
                    <span className="text-xs text-gray-500 flex flex-row gap-0.5 items-center">
                      <PhoneIcon className="w-3 h-3 mr-1" />

                      {booking.guestPhone}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
        <button
          onClick={onClose}
          className="bg-foreground/70 text-white px-4 py-2 rounded cursor-pointer"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewBookersModal;
