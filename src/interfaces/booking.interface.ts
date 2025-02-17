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

type Hours = "08:00" | "09:00" | "10:00" | "11:00" | "12:00" | "13:00" | "14:00" | "15:00" | "16:00" | "17:00" | "18:00" | "19:00" | "20:00" | "21:00";