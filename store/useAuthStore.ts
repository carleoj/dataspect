import { create } from "zustand";
import { authService, Credentials, RegisterData } from "@/services/authService";
import { useUserStore } from "@/store/useUserStore";

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
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }

    try {
      const data = await authService.login(credentials);

      localStorage.setItem("auth_token", data.token);

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      useUserStore.getState().setUser(data.user);
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      useUserStore.getState().clearUser();
      throw error;
    }
  },

  register: async (registerData) => {
    const data = await authService.register(registerData);

    localStorage.setItem("auth_token", data.token);

    set({
      user: data.user,
      isAuthenticated: true,
      isLoading: false,
    });

    useUserStore.getState().setUser(data.user);
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("auth_token");

      if (typeof window !== "undefined") {
        sessionStorage.setItem("just_logged_out", "true");
      }

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      useUserStore.getState().clearUser();
    }
  },

  loadUser: async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("auth_token");

    if (!token || token === "undefined" || token === "null") {
      localStorage.removeItem("auth_token");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      useUserStore.getState().clearUser();
      return;
    }

    try {
      const response = await authService.fetchUser();
      const user = response.data ?? response;

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      useUserStore.getState().setUser(user);
    } catch {
      localStorage.removeItem("auth_token");

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      useUserStore.getState().clearUser();
    }
  },
}));
