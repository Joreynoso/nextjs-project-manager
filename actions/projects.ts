'use server'

import auth from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

// obtener lista de proyectos
export async function getProjects() {

    const user = await auth.api.getSession({
        headers: await headers()
    })

    if (!user?.user?.id) {
        throw new Error('No autenticado')
    }

    const projects = await prisma.project.findMany({
        include: {
            creator: true,
            members: {
                include: {
                    user: true
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

// crear proyecto
export async function createProject(formData: FormData) {

    // verificar si el usuario esta autenticado 
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "No autorizado" },
            { status: 401 }
        )
    }

}