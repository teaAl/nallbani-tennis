import { z } from "zod";

export const createBookingSchema = z.object({
    bookingType: z.enum(["exploratory", "serious" ]),
    recurring: z.boolean(),
    individual: z.boolean(),
    experienceLvl: z.enum(["Beginner", "Novice", "Intermediate", "Advanced", "Professional"]),
    group: z.object({
        isGroup: z.boolean(),
        groupSize: z.string(),
        hasGroup: z.boolean(),
    }),
    needEquipment: z.boolean(),
    schedule: z.array(
        z.object({
        date: z.string(),
        hour: z.enum(["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]),
        })
    ),
    bookingStatus: z.enum(["approved", "pending", "rejected"]),
    contactInfo: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
    }),
});