export interface Booking {
  id: string;
  createdAt: string; // DateTime as ISO string
  updatedAt: string; // DateTime as ISO string
  status: "PENDING" | "CONFIRMED" | "REJECTED";
  userId?: string;
  bookerType: "MEMBER" | "GUEST";
  courtAvailabilityId: string;
  guestEmail?: string;
  guestName?: string;
  guestPhone?: string;
  needsEquipment: boolean;
  // Relations (optional, can be expanded as needed)
  // courtAvailability?: any;
  // user?: any;
  // Court?: any[];
}

export type Status = "approved" | "pending" | "rejected";
export type BookingType = "MEMBER" | "GUEST";
export type BookedHour = Hours[];
export type Hours = "18:30" | "19:30" | "20:30" | "21:30";
