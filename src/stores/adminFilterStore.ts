import { create } from "zustand";

interface AdminFilterState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAdminFilterStore = create<AdminFilterState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
