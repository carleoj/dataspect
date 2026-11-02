// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    name: 'Analysis',
    href: '/dashboard/analysis',
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 9h2v9h-2v-9zm4-4h2v13h-2V7z" />
      </svg>
    ),
  },
  {
    name: 'Datasets',
    href: '/dashboard/datasets',
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

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
          <span className="grid h-12 w-32 place-content-center rounded-lg bg-gray-100 text-sm font-semibold tracking-tight text-gray-900">
            DataSpect
          </span>
          <nav aria-label="Dashboard" className="mt-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center gap-3 bg-white p-4 hover:bg-gray-50 transition-colors"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=1160"
              className="size-10 rounded-full object-cover"
            />
            <p className="text-xs text-gray-900 leading-snug">
              <strong className="block font-medium">Priya Natarajan</strong>
              <span className="text-gray-500">priya@dataspect.io</span>
            </p>
          </a>
        </div>
      </div>
    </>
  );
}