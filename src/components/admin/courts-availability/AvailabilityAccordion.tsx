import { Accordion } from "@/components/ui/accordation";
import { AvailabilityAccordionItem } from "./AvailabilityAccordionItem";
import { Booking } from "@/interfaces/booking.interface";
import { UserNT } from "@/interfaces/usernt.interface";

export function AvailabilityAccordion({
  slots,
  bookings,
  members,
  onDelete,
}: {
  slots: any[];
  bookings: Booking[];
  members: UserNT[];
  onDelete: (id: string) => void;
}) {
  return (
    <Accordion type="multiple" className="flex flex-col gap-4">
      {slots.map((slot) => (
        <div
          key={slot.id}
          className=" shadow-sm hover:shadow-md transition-shadow  rounded-lg /border-l-3 /border-l-pear "
        >
          <AvailabilityAccordionItem
            key={slot.id}
            slot={slot}
            bookings={bookings.filter((b) => b.courtAvailabilityId === slot.id)}
            members={members}
            onDelete={onDelete}
          />
        </div>
      ))}
    </Accordion>
  );
}
