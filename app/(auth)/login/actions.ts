'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export type LoginState = { error?: string } | undefined

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '')

  if (!email || !password) {
    return { error: 'Please enter your email and password.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })


  if (error) {
  console.error('Supabase login error:', error)
  return { error: error.message }
    }

  revalidatePath('/', 'layout')

  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard/analysis'
  redirect(safeNext)
}