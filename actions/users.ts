'use server'

import auth from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// obtener lista de proyectos
export async function getAllUsers() {

    const user = await auth.api.getSession({
        headers: await headers()
    })

    // Defensa adicional: por si el middleware falla o es bypasseado
    if (!user?.user?.id) {
        redirect('/login')
    }

    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return users
}
