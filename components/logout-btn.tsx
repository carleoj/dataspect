'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';

export function LogoutButton() {
  const router = useRouter();
  const logoutStore = useAuthStore((state) => state.logout);

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: async () => {
      await logoutStore();
    },
    onSuccess: () => {
      router.push('/login'); 
    },
    onError: (err: any) => {
      console.error('Logout failed:', err);
      router.push('/login');
    },
  });

  return (
    <button
      type="button"
      onClick={() => logoutMutation()}
      disabled={isPending}
      className="rounded-md border border-gray-200 bg-rose-700 text-white px-4 py-2 text-sm font-medium  shadow-xs hover:bg-rose-800 transition cursor-pointer disabled:opacity-50"
    >
      {isPending ? 'Signing out...' : 'Sign out'}
    </button>
  );
}