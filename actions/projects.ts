'use server'

import auth from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

// obtener lista de proyectos
export async function getProjects() {

    // verificar que el usuario este autenticado y tenga permisos
    const user = await auth.api.getSession({
        headers: await headers()
    })

    // mostrar lista de proyectos donde el usuario forme parte
    // o sea el creador, debe ver ambos
    const projects = await prisma.project.findMany({
        include: {
            creator: true,
            members: {
                include: {
                    user: true  // ← Incluir los datos del usuario de cada member
                }
            }
        },
        where: {
            OR: [
                { creator: { id: user?.user.id } },
                { members: { some: { userId: user?.user.id } } }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    
    return projects
}