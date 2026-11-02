import { create } from 'zustand';
import { authService } from '@/services/authService';
import type { User } from '@/types/user';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    if (get().loading) return;

    set({ loading: true, error: null });

    try {
      const response = await authService.fetchUser();

      set({
        user: response.data ?? response,
        loading: false,
      });
    } catch {
      set({
        user: null,
        error: 'Could not load user',
        loading: false,
      });
    }
  },

  clearUser: () => set({
    user: null,
    error: null,
    loading: false,
  }),
}));