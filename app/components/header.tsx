// components/dashboard/header.tsx
'use client';

import { usePathname } from 'next/navigation';

export function DashboardHeader() {
  const pathname = usePathname();

  // Determine title and associated form/action based on route
  const isSettings = pathname === '/dashboard/settings';
  const title = isSettings ? 'Settings' : 'Dashboard Overview';

  return (
    <header className="h-16 shrink-0 border-b border-gray-200 bg-white flex items-center px-6 justify-between">
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

        <span className="text-sm font-semibold text-gray-900">{title}</span>
      </div>

      {/* Dynamic Action Button: Submit button for settings, Link for overview */}
      {isSettings ? (
        <button
          type="submit"
          form="account-settings-form"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Save changes
        </button>
      ) : (
        <a
          href="#"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          New report
        </a>
      )}
    </header>
  );
}