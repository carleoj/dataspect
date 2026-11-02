import { api } from '@/lib/axios';

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterData extends Credentials {
  name: string;
}

export const authService = {
  async register(data: RegisterData) {
    const response = await api.post('/register', data);
    return response.data; // Returns { message, user, token }
  },

  async login(credentials: Credentials) {
    const response = await api.post('/login', credentials);
    return response.data; // Returns { message, user, token }
  },

  async logout() {
    const response = await api.post('/logout');
    return response.data;
  },

  async fetchUser() {
    const response = await api.get('/user');
    return response.data; // Returns the user resource object
  },
};