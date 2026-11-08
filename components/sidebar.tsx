// components/Sidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { useDatasetStore } from "../store/useDatasetsStore";

const closeSidebar = () => {
  const toggle = document.getElementById(
    "sidebar-toggle",
  ) as HTMLInputElement | null;
  if (toggle) toggle.checked = false;
};

type NavItem = { name: string; href: string; icon: React.ReactNode };

const navItems: NavItem[] = [
  {
    name: "Analysis",
    href: "/dashboard/analysis",
    icon: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 9h2v9h-2v-9zm4-4h2v13h-2V7z"
        />
      </svg>
    ),
  },
  {
    name: "Datasets",
    href: "/dashboard/datasets",
    icon: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
        />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setPendingHref(null);
  }
  const current = pendingHref ?? pathname;
  useEffect(() => {
    closeSidebar();
  }, [pathname]);
  const user = useUserStore((state) => state.user);
  const selectedId = useDatasetStore((s) => s.selectedId);
  const renderItem = (item: NavItem) => {
    const isActive =
      current === item.href || current.startsWith(item.href + "/");
    const href =
      item.href === "/dashboard/analysis" && selectedId
        ? `${item.href}?dataset=${selectedId}`
        : item.href;

    return (
      <li key={item.href}>
        <Link
          href={href}
          onClick={() => {
            closeSidebar();
            setPendingHref(item.href);
          }}
          aria-current={isActive ? "page" : undefined}
          className={`flex items-center gap-4 rounded-lg px-4 py-2.5 text-sm font-medium ${
  isActive
    ? "bg-[linear-gradient(180deg,#64748b_0%,#334155_100%)] text-white shadow-[0_1px_2px_rgba(51,65,85,0.4)] hover:brightness-95"
    : "text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
}`}
        >
          {item.icon}
          {item.name}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      <label
        htmlFor="sidebar-toggle"
        aria-hidden="true"
        className="fixed inset-0 z-30 hidden bg-gray-900/50 peer-checked:block lg:hidden"
      />

      {/* Sidebar Container */}
      <div
        id="dashboard-sidebar"
        className="fixed inset-y-0 start-0 z-40 flex w-64 -translate-x-full flex-col justify-between overflow-y-auto border-e border-gray-200 bg-white transition-transform duration-300 peer-checked:translate-x-0 lg:static lg:shrink-0 lg:translate-x-0 max-lg:rtl:translate-x-full"
      >
        <div className="p-4">
          <div className="flex items-center rounded-full gap-3 px-2">
            <Image
              src="/logo-navy-dark.svg"
              alt=""
              width={44}
              height={44}
              priority
            />

            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-tight text-gray-900">
                DataSpect
              </p>

              <p className="truncate text-xs text-gray-500">
                {user?.name ?? "Loading user..."}
              </p>
            </div>
          </div>
          <nav aria-label="Dashboard" className="mt-4">
  <ul className="space-y-2">
    {navItems.filter((item) => item.name !== "Help").map(renderItem)}
  </ul>
  <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4">
    {navItems.filter((item) => item.name === "Help").map(renderItem)}
  </ul>
</nav>
        </div>

        {/* User Profile Footer */}
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center gap-3 bg-white p-4 hover:bg-gray-50 transition-colors"
          >
            <Image
              src="/user-pfp.png"
              alt="DataSpect Logo"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <p className="text-xs text-gray-900 leading-snug">
              <strong className="block font-medium">{user?.name}</strong>
              <span className="text-gray-500">{user?.email}</span>
            </p>
          </a>
        </div>
      </div>
    </>
  );
}
