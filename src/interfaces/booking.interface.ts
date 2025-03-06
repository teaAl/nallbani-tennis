interface Booking {
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

type Status = "approved" | "pending" | "rejected";

type BookingType = "exploratory" | "serious" | null;

type BookedHour = Hours[];

type Hours = "18:30" | "19:30" | "20:30" | "21:30";