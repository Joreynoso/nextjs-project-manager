'use server'

import auth from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

// obtener lista de tareas
export async function addTask() {

    const user = await auth.api.getSession({
        headers: await headers()
    })

    if (!user?.user?.id) {
        throw new Error('No autenticado')
    }

    console.log('user autenticado, tiene permisos, puede proseguir')
}