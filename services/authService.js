import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export async function signUpUser(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName, 
      },
    },
  })

  if (error) throw new Error(error.message)
  return data
}