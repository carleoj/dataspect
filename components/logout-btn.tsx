// client/components/logout-button.tsx
'use client';

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      // Attempt to sign out on the server/Supabase
      await supabase.auth.signOut();
    } catch (err) {
      // Catch any network or session-sync errors silently so they don't break flow
      console.warn('Sign out network warning:', err);
    } finally {
      // ALWAYS redirect, even if Supabase threw a network error
      window.location.href = '/login';
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isLoading}
      className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
    >
      {isLoading ? 'Signing out...' : 'Sign out'}
    </button>
  );
}