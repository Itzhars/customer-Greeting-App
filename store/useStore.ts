import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  username: string;
  avatarUrl: string | null;
  isPremium: boolean;
  updateProfile: (data: { username?: string; avatarUrl?: string | null }) => void;
  setPremium: (status: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      username: "Guest User",
      avatarUrl: null,
      isPremium: false,
      updateProfile: (data) => set((state) => ({ ...state, ...data })),
      setPremium: (status) => set({ isPremium: status }),
    }),
    {
      name: "wishes-app-storage",
    }
  )
);
