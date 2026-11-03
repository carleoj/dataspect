// components/dashboard/header.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { DatasetSelect } from "../app/dashboard/dataset-select";
import { LogoutButton } from "./logout-btn";

// 1. Define the subpage route architecture
interface SubPageTab {
  name: string;
  href: string;
}

interface RouteConfig {
  title: string;
  tabs?: SubPageTab[];
  datasetSelect?: boolean;
  action?: {
    label: string;
    href?: string;
    formId?: string;
  };
}

const ROUTE_MAP: Record<string, RouteConfig> = {
  "/dashboard/datasets": {
    title: "Datasets",
    action: { label: "Upload file", href: "/dashboard/datasets?upload=1" },
  },
  "/dashboard/analysis": {
    title: "Dataset Analysis",
    tabs: [
      { name: "Statistical Overview", href: "/dashboard/analysis" },
      { name: "Schema & Quality", href: "/dashboard/analysis/schema" },
      { name: "Missing Values", href: "/dashboard/analysis/missing" },
    ],
    datasetSelect: true,
  },
};

const FALLBACK: RouteConfig = { title: "Dashboard" };

export function DashboardHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dataset = searchParams.get("dataset");
  const qs = dataset ? `?dataset=${dataset}` : "";

  const currentKey = Object.keys(ROUTE_MAP)
    .filter((key) => pathname === key || pathname.startsWith(key + "/"))
    .sort((a, b) => b.length - a.length)[0];

  const currentRoute = (currentKey && ROUTE_MAP[currentKey]) || FALLBACK;

  return (
    <div className="flex flex-col border-b border-gray-200 bg-white shrink-0">
      {/* Top Header Row */}
      <header className="h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger Menu Button */}
          <label
            htmlFor="sidebar-toggle"
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-600"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <h1 className="text-sm sm:text-md md:text-xl font-bold text-gray-900 tracking-tight">
            {currentRoute.title}
          </h1>
        </div>

        {/* Right Action Buttons Container */}
        <div className="flex items-center gap-3">
          {/* Dynamic Action Trigger Button */}
          {currentRoute.datasetSelect && <DatasetSelect />}
          {currentRoute.action &&
            (currentRoute.action.formId ? (
              <button
                type="submit"
                form={currentRoute.action.formId}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
              >
                {currentRoute.action.label}
              </button>
            ) : (
              <Link
                href={currentRoute.action.href || "#"}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                {currentRoute.action.label}
              </Link>
            ))}

          <LogoutButton />
        </div>
      </header>

      {currentRoute.tabs && (
        <nav
          aria-label="Analysis sections"
          className="flex h-11 items-center gap-6 overflow-x-auto border-t border-gray-100 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {currentRoute.tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={`${tab.href}${qs}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative top-[1px] flex h-full shrink-0 items-center whitespace-nowrap border-b-2 px-1 text-xs font-medium transition-colors xl:text-sm ${
                  isActive
                    ? "border-gray-900 font-semibold text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
