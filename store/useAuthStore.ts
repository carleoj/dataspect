import { create } from 'zustand';
import { authService, Credentials, RegisterData } from '@/services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    const data = await authService.login(credentials);
    localStorage.setItem('auth_token', data.token);
    set({ user: data.user, isAuthenticated: true });
  },

  register: async (registerData) => {
    const data = await authService.register(registerData);
    localStorage.setItem('auth_token', data.token);
    set({ user: data.user, isAuthenticated: true });
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem('auth_token');
      set({ user: null, isAuthenticated: false });
    }
  },

  loadUser: async () => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('auth_token');
    if (!token) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const user = await authService.fetchUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('auth_token');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));