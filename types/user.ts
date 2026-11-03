export interface User {
  id: number;
  name: string;
  email: string;
}

export interface PasswordChangePayload {
  password: string;
  password_confirmation: string;
}

export interface NameChangePayload {
  name: string;
}