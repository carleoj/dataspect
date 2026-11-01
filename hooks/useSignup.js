import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

async function signupUser({ email, password, fullName }) {
  try {
    const { data } = await axios.post('/api/auth/signup', {
      email,
      password,
      fullName,
    })
    return data
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Something went wrong'
    throw new Error(errorMessage)
  }
}

export function useSignup() {
  return useMutation({
    mutationFn: signupUser,
  })
}