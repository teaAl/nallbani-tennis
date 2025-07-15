import { create } from "zustand";
import { DaysOfWeek } from "@/interfaces/daysOfWeek.interface";

interface CourtAvailabilityState {
  availabilityData: Record<DaysOfWeek, any[]>;
  allAvailabilities: any[];
  loading: boolean;
  error: string | null;
  selectedAvailability: string | null;
  fetchAvailabilityByDay: (day: DaysOfWeek) => Promise<void>;
  fetchAllAvailabilities: () => Promise<void>;
  addAvailability: (slotData: any) => Promise<void>;
  deleteAvailability: (id: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedAvailability: (id: string) => void;
  approveBookingForAvailability: (
    courtAvailabilityId: string,
    approvedBookingId: string
  ) => Promise<void>;
}

const initialAvailability: Record<DaysOfWeek, any[]> = {
  [DaysOfWeek.MONDAY]: [],
  [DaysOfWeek.TUESDAY]: [],
  [DaysOfWeek.WEDNESDAY]: [],
  [DaysOfWeek.THURSDAY]: [],
  [DaysOfWeek.FRIDAY]: [],
  [DaysOfWeek.SATURDAY]: [],
  [DaysOfWeek.SUNDAY]: [],
};

export const useCourtAvailabilityStore = create<CourtAvailabilityState>()(
  (set, get) => ({
    availabilityData: initialAvailability,
    allAvailabilities: [],
    loading: false,
    error: null,
    selectedAvailability: null,
    fetchAvailabilityByDay: async (day) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(
          `/api/court-availability?dayOfWeek=${day}`
        );
        if (!response.ok) throw new Error("Failed to fetch availability");
        const data = await response.json();
        set({
          availabilityData: { ...get().availabilityData, [day]: data },
          loading: false,
        });
      } catch (e: any) {
        set({ error: e.message, loading: false });
      }
    },
    fetchAllAvailabilities: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/court-availability`);
        if (!response.ok) throw new Error("Failed to fetch all availabilities");
        const data = await response.json();
        set({ allAvailabilities: data, loading: false });
      } catch (e: any) {
        set({ error: e.message, loading: false });
      }
    },
    addAvailability: async (slotData) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch("/api/court-availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slotData),
        });
        if (!response.ok) throw new Error("Failed to add availability");
        const data = await response.json();
        // Refresh the day's availability
        await get().fetchAvailabilityByDay(slotData.dayOfWeek);
        set({ loading: false });
      } catch (e: any) {
        set({ error: e.message, loading: false });
      }
    },
    deleteAvailability: async (id) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/court-availability/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete availability");
        // Find the day and refresh
        const day = Object.keys(get().availabilityData).find((d) =>
          get().availabilityData[d as DaysOfWeek].some((slot) => slot.id === id)
        ) as DaysOfWeek;
        if (day) {
          await get().fetchAvailabilityByDay(day);
        }
        set({ loading: false });
      } catch (e: any) {
        set({ error: e.message, loading: false });
      }
    },
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setSelectedAvailability: (id) => set({ selectedAvailability: id }),
    approveBookingForAvailability: async (
      courtAvailabilityId,
      approvedBookingId
    ) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch("/api/bookings/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courtAvailabilityId, approvedBookingId }),
        });
        if (!response.ok) throw new Error("Failed to approve booking");
        // Find the day and refresh
        const day = Object.keys(get().availabilityData).find((d) =>
          get().availabilityData[d as DaysOfWeek].some(
            (slot) => slot.id === courtAvailabilityId
          )
        ) as DaysOfWeek;
        if (day) {
          await get().fetchAvailabilityByDay(day);
        }
        set({ loading: false });
      } catch (e: any) {
        set({ error: e.message, loading: false });
      }
    },
  })
);
