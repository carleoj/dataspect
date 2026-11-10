import { api } from '@/lib/axios';
import type { User } from '@/types/user';

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterData extends Credentials {
  name: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export const INVALID_AUTH_RESPONSE_ERROR =
  "The authentication response did not include a valid token.";

function validateAuthResponse(data: unknown): AuthResponse {
  if (
    typeof data !== "object" ||
    data === null ||
    typeof (data as { token?: unknown }).token !== "string" ||
    !(data as { token: string }).token.trim() ||
    (data as { token: string }).token === "undefined"
  ) {
    throw new Error(INVALID_AUTH_RESPONSE_ERROR);
  }

  return data as AuthResponse;
}

export const authService = {
  async register(data: RegisterData) {
    const response = await api.post('/register', data);
    return validateAuthResponse(response.data);
  },

  async login(credentials: Credentials) {
    const response = await api.post('/login', credentials);
    return validateAuthResponse(response.data);
  },

  async logout() {
    const response = await api.post('/logout');
    return response.data;
  },

  async fetchUser() {
    const response = await api.get('/user');
    return response.data; 
  },
};