import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
      : 'http://localhost:3000/api/auth',
})

export const { signIn, signOut, signUp, useSession, getAccessToken } = authClient