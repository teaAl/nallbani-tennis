import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { UserNT } from "@/interfaces/usernt.interface";

interface MemberState {
  members: UserNT[];
  loading: boolean;
  error: string | null;
  fetchMembers: () => Promise<void>;
  addMember: (member: UserNT) => void;
  updateMember: (member: UserNT) => void;
  removeMember: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMemberStore = create<MemberState>()(
  devtools(
    persist(
      (set, get) => ({
        members: [],
        loading: false,
        error: null,
        fetchMembers: async () => {
          set({ loading: true, error: null });
          try {
            const res = await fetch("/api/users");
            if (!res.ok) throw new Error("Failed to fetch members");
            const data = await res.json();
            const membersArray = Array.isArray(data)
              ? data
              : Array.isArray(data.users)
              ? data.users
              : [];
            set({ members: membersArray, loading: false });
          } catch (e: any) {
            set({ error: e.message, loading: false });
          }
        },
        addMember: (member) => set({ members: [...get().members, member] }),
        updateMember: (member) =>
          set({
            members: get().members.map((m) =>
              m.id === member.id ? member : m
            ),
          }),
        removeMember: (id) =>
          set({ members: get().members.filter((m) => m.id !== id) }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
      }),
      {
        name: "member-storage",
      }
    )
  )
);
