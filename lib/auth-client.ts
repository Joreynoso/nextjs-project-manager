import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // Usa URL relativa - funcionará en cualquier dominio
    baseURL: '/api/auth',
})

export const { signIn, signOut, signUp, useSession, getAccessToken } = authClient