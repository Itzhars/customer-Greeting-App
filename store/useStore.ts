import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GreetingTemplate } from "@/types";
import { templateService } from "@/lib/services/templateService";
import { templates as staticTemplates } from "@/data/templates";

interface AppState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  username: string;
  avatarUrl: string | null;
  isPremium: boolean;
  templates: GreetingTemplate[];
  isLoadingTemplates: boolean;
  updateProfile: (data: { username?: string; avatarUrl?: string | null }) => void;
  setPremium: (status: boolean) => void;
  fetchTemplates: () => Promise<void>;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      username: "Guest User",
      avatarUrl: null,
      isPremium: false,
      templates: staticTemplates, // Initialize with static data
      isLoadingTemplates: false,
      updateProfile: (data) => set((state) => ({ ...state, ...data })),
      setPremium: (status) => set({ isPremium: status }),
      fetchTemplates: async () => {
        set({ isLoadingTemplates: true });
        try {
          const cloudTemplates = await templateService.getAllTemplates();
          set({ templates: cloudTemplates, isLoadingTemplates: false });
        } catch (error) {
          console.error("Failed to fetch templates:", error);
          set({ isLoadingTemplates: false });
        }
      },
    }),
    {
      name: "wishes-app-storage",
      partialize: (state) => ({
        // Only persist user-related state
        username: state.username,
        avatarUrl: state.avatarUrl,
        isPremium: state.isPremium,
      }),
    }
  )
);

