import { AvailabilityAccordion } from "../AvailabilityAccordion";
import React from "react";

const SlotList = ({ slots, bookings, members, onDelete }: any) => {
  return (
    <AvailabilityAccordion
      slots={slots}
      bookings={bookings}
      members={members}
      onDelete={onDelete}
    />
  );
};

export default SlotList;
