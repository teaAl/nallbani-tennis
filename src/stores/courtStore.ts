import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Court } from "@/interfaces/court.interface";
import { addCourtApi } from "@/services/api/addCourt";

interface CourtState {
  courts: Court[];
  loading: boolean;
  error: string | null;
  fetchCourts: () => Promise<void>;
  addCourt: (court: {
    name: string;
    type: string;
    indoor: boolean;
  }) => Promise<void>;
  updateCourt: (court: Court) => void;
  removeCourt: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCourtStore = create<CourtState>()(
  devtools(
    persist(
      (set, get) => ({
        courts: [],
        loading: false,
        error: null,
        fetchCourts: async () => {
          set({ loading: true, error: null });
          try {
            const res = await fetch("/api/courts");
            if (!res.ok) throw new Error("Failed to fetch courts");
            const data = await res.json();
            set({ courts: data.courts, loading: false });
          } catch (e: any) {
            set({ error: e.message, loading: false });
          }
        },
        addCourt: async (courtData) => {
          set({ loading: true, error: null });
          try {
            await addCourtApi(courtData);
            await get().fetchCourts();
            set({ loading: false });
          } catch (e: any) {
            set({ error: e.message, loading: false });
          }
        },
        updateCourt: (court) =>
          set({
            courts: get().courts.map((c) => (c.id === court.id ? court : c)),
          }),
        removeCourt: (id) =>
          set({ courts: get().courts.filter((c) => c.id !== id) }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
      }),
      {
        name: "court-storage",
      }
    )
  )
);
