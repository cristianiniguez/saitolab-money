'use server'

import { auth } from '@/lib/auth'

export const signIn = async (body: { email: string; password: string }) => {
  await auth.api.signInEmail({ body })
}

export const signUp = async (body: { email: string; password: string; name: string }) => {
  await auth.api.signUpEmail({ body })
}
