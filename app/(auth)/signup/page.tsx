// app/(auth)/signup/page.tsx
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="text-center">
        <span className="inline-grid h-12 w-32 place-content-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-900 mx-auto">
          Logo
        </span>
        <h1 className="mt-4 text-xl font-semibold tracking-tight text-gray-900">Create an account</h1>
        <p className="mt-1 text-sm text-gray-600">Get started with your dashboard today.</p>
      </div>

      <form className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            type="text"
            id="name"
            required
            placeholder="Priya Natarajan"
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="you@example.com"
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="••••••••"
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </p>
    </div>
  );
}