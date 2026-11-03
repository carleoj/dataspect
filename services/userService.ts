import { api } from "@/lib/axios";
import type { PasswordChangePayload } from "@/types/user";

export async function changePassword(
  payload: PasswordChangePayload,
): Promise<void> {
  await api.put("/user/password", payload);
}
