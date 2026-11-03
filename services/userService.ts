import { api } from "@/lib/axios";
import type { PasswordChangePayload, NameChangePayload } from "@/types/user";

export async function changePassword(
  payload: PasswordChangePayload,
): Promise<void> {
  await api.put("/user/password", payload);
}

export async function changeName(
  payload: NameChangePayload,
): Promise<void> {
  await api.put("/user/name", payload);
}