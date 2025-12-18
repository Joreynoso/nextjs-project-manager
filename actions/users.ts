'use server'

import auth from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

// obtener lista de proyectos
export async function getAllUsers() {

    const user = await auth.api.getSession({
        headers: await headers()
    })

    if (!user?.user?.id) {
        throw new Error('No autenticado')
    }

    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return users
}
