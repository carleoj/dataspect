'use client';

import { useState } from 'react';

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  autoComplete: 'current-password' | 'new-password';
  minLength?: number;
  hint?: string;
}

export function PasswordField({ id, name, label, autoComplete, minLength, hint }: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1">
        <input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          autoComplete={autoComplete}
          minLength={minLength}
          required
          className="w-full rounded-md border-gray-200 pr-16 text-sm text-gray-900 shadow-xs"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-pressed={show}
          className="absolute inset-y-0 right-0 px-3 text-xs font-medium text-gray-600 hover:text-gray-900"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}