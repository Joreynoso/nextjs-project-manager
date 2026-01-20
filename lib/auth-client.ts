import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // Usa la URL absoluta desde las variables de entorno
    baseURL: process.env.NEXT_PUBLIC_APP_URL + '/api/auth',
})

export const { signIn, signOut, signUp, useSession, getAccessToken } = authClient