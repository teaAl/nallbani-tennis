import { useState } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordation";
import { Booking } from "@/interfaces/booking.interface";
import { UserNT } from "@/interfaces/usernt.interface";
import { useCourtAvailabilityStore } from "@/stores/courtAvailabilityStore";
import SlotHeader from "./ui/SlotHeader";
import ApprovedBookerCard from "./ui/ApprovedBookerCard";
import BookingsTable from "./ui/BookingsTable";
import ActionButtons from "./ui/ActionButtons";
import DeleteModal from "./ui/DeleteModal";
import ApproveModal from "./ui/ApproveModal";
import ViewBookersModal from "./ui/ViewBookers";

export function AvailabilityAccordionItem({
  slot,
  bookings,
  members,
  onDelete,
}: {
  slot: any;
  bookings: Booking[];
  members: UserNT[];
  onDelete: (id: string) => void;
}) {
  const [filter, setFilter] = useState<"MEMBER" | "GUEST">("MEMBER");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isViewBookersModalOpen, setIsViewBookersModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [isApproving, setIsApproving] = useState(false);
  const { approveBookingForAvailability, error } = useCourtAvailabilityStore();

  // Helper functions
  const getUserName = (userId: string) => {
    const user = members.find((m) => m.id === userId);
    return user ? user.name : userId;
  };
  const getUserEmail = (userId: string) => {
    const user = members.find((m) => m.id === userId);
    return user ? user.email : userId;
  };
  const getUserPhone = (userId: string) => {
    const user = members.find((m) => m.id === userId);
    return user ? user.phoneNumber : userId;
  };

  // Approve booking handler
  const handleApprove = async () => {
    if (!selectedBookingId) return;
    setIsApproving(true);
    try {
      await approveBookingForAvailability(slot.id, selectedBookingId);
      setIsBookModalOpen(false);
      setSelectedBookingId(null);
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <AccordionItem
      key={slot.id}
      value={slot.id}
      className={`bg-white/5 border-b border-l-4 border-r-3 ${
        slot.bookingState === "CANCELED" && "opacity-60 line-through"
      } ${
        slot.bookingState === "CONFIRMED" &&
        "border-l-pear border-r-pear/10 border-b-pear/3"
      }
      ${
        slot.bookingState === "PENDING" &&
        "border-l-orange-400/70 border-r-orange-400/10 border-b-orange-400/3"
      }`}
    >
      <AccordionTrigger
        value={slot.id}
        chevronColor={`${slot.bookingState === "PENDING" && "text-orange-300"}
         ${slot.bookingState === "CONFIRMED" && "text-pear"}`}
      >
        <SlotHeader slot={slot} bookingsCount={bookings.length} />
      </AccordionTrigger>
      <AccordionContent value={slot.id}>
        <div className="p-4">
          {slot.bookingState === "CONFIRMED" ? (
            (() => {
              const approvedBooking = bookings.find(
                (b) => b.status === "CONFIRMED"
              );
              if (!approvedBooking)
                return (
                  <p className="text-gray-500">No approved booking found.</p>
                );
              return (
                <ApprovedBookerCard
                  booking={approvedBooking}
                  members={members}
                />
              );
            })()
          ) : (
            <BookingsTable
              bookings={bookings}
              members={members}
              filter={filter}
              setFilter={setFilter}
              getUserName={getUserName}
              getUserEmail={getUserEmail}
              getUserPhone={getUserPhone}
            />
          )}
        </div>
        <ActionButtons
          slot={slot}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setIsBookModalOpen={setIsBookModalOpen}
          setIsViewBookersModalOpen={setIsViewBookersModalOpen}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => onDelete(slot.id)}
        />
        <ApproveModal
          isOpen={isBookModalOpen}
          onClose={() => setIsBookModalOpen(false)}
          bookings={bookings}
          selectedBookingId={selectedBookingId}
          setSelectedBookingId={setSelectedBookingId}
          isApproving={isApproving}
          onApprove={handleApprove}
          error={error}
          getUserName={getUserName}
        />
        <ViewBookersModal
          isOpen={isViewBookersModalOpen}
          onClose={() => setIsViewBookersModalOpen(false)}
          bookings={bookings}
          selectedBookingId={selectedBookingId}
          // setSelectedBookingId={setSelectedBookingId}
          // isApproving={isApproving}
          // onApprove={handleApprove}
          // error={error}
          getUserName={getUserName}
          getUserEmail={getUserEmail}
          getUserPhone={getUserPhone}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
