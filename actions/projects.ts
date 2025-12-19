'use server'

import auth from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CreateProjectInput } from '@/types/projects'
import console from 'console'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

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
export async function createProject(data: CreateProjectInput) {
    const user = await auth.api.getSession({
        headers: await headers()
    })

    if (!user?.user?.id) {
        throw new Error('No autenticado')
    }

    const newProject = await prisma.project.create({
        data: {
            name: data.name,
            description: data.description,
            tag: data.tag,
            deadline: data.deadline,
            creator: {
                connect: {
                    id: user.user.id
                }
            },
            members: {
                create: data.members.map((memberId) => ({
                    userId: memberId
                }))
            }
        }
    })

    revalidatePath('/projects')
    return newProject
}

// eliminar un proyecto
export async function deleteProject(projectId: string) {

    const user = await auth.api.getSession({
        headers: await headers()
    })

    if (!user?.user?.id) {
        throw new Error('No autenticado')
    }

    console.log('usuario registrado', user)

    // Obtener el proyecto con el createdBy
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { createdBy: true }
    })

    console.log('proyecto a eliminar', project)

    if (!project) {
        throw new Error("Proyecto no encontrado")
    }

    console.log('usuario registrado', user)

    // Verificar que el usuario actual es el creador
    if (project.createdBy !== user.user.id) {
        return {
            success: false,
            error: 'Solo el creador puede eliminar este proyecto',
            code: 'FORBIDDEN'
        }
    }

    // Eliminar el proyecto
    await prisma.project.delete({
        where: { id: projectId }
    })

    revalidatePath("/projects")

    return {
        success: true,
        message: 'Proyecto eliminado correctamente'
    }
}
