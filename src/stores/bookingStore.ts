import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Booking } from "@/interfaces/booking.interface";

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  addBooking: (booking: Booking) => void;
  updateBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  optimisticAdd: (booking: Booking) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearBookingState: () => void;
}

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set, get) => ({
        bookings: [],
        loading: false,
        error: null,
        fetchBookings: async () => {
          set({ loading: true, error: null });
          try {
            const res = await fetch("/api/bookings");
            if (!res.ok) throw new Error("Failed to fetch bookings");
            const data = await res.json();
            set({ bookings: data, loading: false });
          } catch (e: any) {
            set({ error: e.message, loading: false });
          }
        },
        addBooking: (booking) =>
          set({ bookings: [...get().bookings, booking] }),
        updateBooking: (booking) =>
          set({
            bookings: get().bookings.map((b) =>
              b.id === booking.id ? booking : b
            ),
          }),
        removeBooking: (id: string) =>
          set({
            bookings: get().bookings.filter((b) => String(b.id) !== String(id)),
          }),
        optimisticAdd: (booking) =>
          set({ bookings: [booking, ...get().bookings] }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        clearBookingState: () =>
          set({ bookings: [], loading: false, error: null }),
      }),
      {
        name: "booking-storage",
      }
    )
  )
);
