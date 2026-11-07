"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import Sidebar from "../../components/sidebar";
import { DashboardHeader } from "../../components/header";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const loadUser = useAuthStore((state) => state.loadUser);

  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);

  // Verify authentication.
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Redirect unauthenticated users.
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Fetch dashboard user information.
  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchUser();
    }
  }, [isAuthenticated, user, fetchUser]);

  // Handle browser back-forward cache.
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  // Prevent dashboard rendering before authentication is verified.
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Hidden checkbox for mobile drawer toggle */}
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content shell */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <Suspense
          fallback={<div className="h-16 border-b border-gray-200 bg-white" />}
        >
          <DashboardHeader />
        </Suspense>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
