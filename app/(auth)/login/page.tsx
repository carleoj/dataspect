'use client'

import { Suspense, useActionState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { login } from './actions'

function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined)
  const next = useSearchParams().get('next') ?? ''

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />

      {state?.error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Link href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="text-center">
        <span className="inline-grid h-12 w-32 place-content-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-900 mx-auto">
          Logo
        </span>
        <h1 className="mt-4 text-xl font-semibold tracking-tight text-gray-900">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-600">Please enter your details to sign in.</p>
      </div>

      <Suspense>
        <LoginForm />
      </Suspense>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign up
        </Link>
      </p>
    </div>
  )
}