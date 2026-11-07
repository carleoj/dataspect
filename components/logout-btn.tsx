"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

export function LogoutButton() {
  const router = useRouter();
  const logoutStore = useAuthStore((state) => state.logout);

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: async () => {
      await logoutStore();
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (err: any) => {
      console.error("Logout failed:", err);
      router.replace("/login");
    },
  });

  return (
    <button
      type="button"
      onClick={() => logoutMutation()}
      disabled={isPending}
      aria-busy={isPending}
      className="relative flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-rose-700 px-4 py-2 text-sm font-medium text-white shadow-xs transition hover:bg-rose-800 disabled:cursor-wait disabled:hover:bg-rose-700"
    >
      <span
        className={`flex items-center gap-2 ${isPending ? "invisible" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </svg>
        Log out
      </span>

      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden="true"
          />
          <span className="sr-only">Logging out</span>
        </span>
      )}
    </button>
  );
}
