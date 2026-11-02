// app/dashboard/layout.tsx

"use client"

import { ReactNode, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import { DashboardHeader } from '../../components/header';
import { useUserStore } from '@/store/useUserStore';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Hidden checkbox for mobile drawer toggle */}
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content shell */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <DashboardHeader />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}