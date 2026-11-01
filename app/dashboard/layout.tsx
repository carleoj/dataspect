// app/dashboard/layout.tsx
import Sidebar from '../components/sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Hidden checkbox for mobile drawer toggle */}
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content shell */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
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

            <span className="text-sm font-semibold text-gray-900">Dashboard Overview</span>
          </div>

          {/* Global Header Actions (e.g. New report button) */}
          <a
            href="#"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            New report
          </a>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}