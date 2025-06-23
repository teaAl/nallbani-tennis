import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { UserNT } from "@/interfaces/usernt.interface";

interface AuthState {
  user: UserNT | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (user: UserNT) => void;
  logout: () => void;
  setUser: (user: UserNT) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        login: (user) =>
          set({ user, isAuthenticated: true, loading: false, error: null }),
        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          }),
        setUser: (user: UserNT) => set({ user }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
