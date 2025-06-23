export interface Booking {
  id: number;
  bookingType: BookingType;
  recurring: boolean;
  individual: boolean;
  group: {
    isGroup: boolean;
    groupSize: string;
    hasGroup: boolean;
  };
  needEquipment: boolean;
  schedule: {
    date: string;
    hour: Hours;
  }[];
  bookingStatus: Status;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export type Status = "approved" | "pending" | "rejected";

export type BookingType = "exploratory" | "serious" | null;

export type BookedHour = Hours[];

export type Hours = "18:30" | "19:30" | "20:30" | "21:30";
