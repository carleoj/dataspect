// components/dashboard/header.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogoutButton } from './logout-btn';

// 1. Define the subpage route architecture
interface SubPageTab {
  name: string;
  href: string;
}

interface RouteConfig {
  title: string;
  tabs?: SubPageTab[];
  action?: {
    label: string;
    href?: string;
    formId?: string;
  };
}

// 2. Map paths to their respective layouts and internal tabs
const ROUTE_MAP: Record<string, RouteConfig> = {
  '/dashboard/settings': {
    title: 'Settings',
    action: { label: 'Save changes', formId: 'account-settings-form' },
  },
  '/dashboard/datasets': {
    title: 'Datasets',
    action: { label: 'Upload file', href: '/dashboard/datasets/upload' },
  },
  // Catch-all mapping fallback for core Analysis pages
  '/dashboard/analysis': {
    title: 'Dataset Analysis',
    tabs: [
      { name: 'Statistical Overview', href: '/dashboard/analysis' },
      { name: 'Schema & Quality', href: '/dashboard/analysis/schema' },
      { name: 'Missing Values', href: '/dashboard/analysis/missing' },
    ],
    action: { label: 'New dataset', href: '#' },
  },
};

export function DashboardHeader() {
  const pathname = usePathname();

  // Find match by exact path, or fallback to the parent layout configuration
  const currentKey = Object.keys(ROUTE_MAP).find(
    (key) => pathname === key || pathname.startsWith(key + '/')
  ) || '/dashboard';

  const currentRoute = ROUTE_MAP[currentKey];

  return (
    <div className="flex flex-col border-b border-gray-200 bg-white shrink-0">
      {/* Top Header Row */}
      <header className="h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Menu Button */}
          <label
            htmlFor="sidebar-toggle"
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-600"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <h1 className="text-xl font-bold text-gray-900 tracking-tight">{currentRoute.title}</h1>
        </div>

        {/* Right Action Buttons Container */}
        <div className="flex items-center gap-3">
          {/* Dynamic Action Trigger Button */}
          {currentRoute.action && (
            currentRoute.action.formId ? (
              <button
                type="submit"
                form={currentRoute.action.formId}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
              >
                {currentRoute.action.label}
              </button>
            ) : (
              <Link
                href={currentRoute.action.href || '#'}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                {currentRoute.action.label}
              </Link>
            )
          )}

          {/* Sign Out Button */}
          {/* <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 transition cursor-pointer"
            >
              Sign out
            </button>
          </form> */}
          <LogoutButton />
        </div>
      </header>

      {/* Subpage Sub-Navigation Tabs Row (Only mounts if tabs exist for route) */}
      {currentRoute.tabs && (
        <nav className="flex px-6 gap-6 border-t border-gray-100 h-11 items-center">
          {currentRoute.tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`text-xs xl:text-sm font-medium h-full flex items-center border-b-2 px-1 transition-colors relative top-[1px] ${
                  isActive
                    ? 'border-gray-900 text-gray-900 font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
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