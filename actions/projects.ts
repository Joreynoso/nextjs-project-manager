'use server'

import auth from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CreateProjectInput } from '@/types/projects'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { projectSchema } from '@/lib/validations/projects'
import { notFound, redirect } from 'next/navigation'

// obtener lista de proyectos
export async function getProjects() {

    const user = await auth.api.getSession({
        headers: await headers()
    })

    // Defensa adicional: por si el middleware falla o es bypasseado
    if (!user?.user?.id) {
        redirect('/auth/login')
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

// obtener un proyecto por id
export async function getProjectById(id: string) {
    const user = await auth.api.getSession({
        headers: await headers()
    })

    // Defensa adicional: por si el middleware falla o es bypasseado
    if (!user?.user?.id) {
        redirect('/auth/login')
    }

    // proyectos con tareas incluidas, si es que las tiene
    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            creator: true,
            members: {
                include: {
                    user: true
                }
            },
            tasks: {
                include: {
                    assignee: true
                }
            }
        }
    })

    // Si el proyecto no existe, muestra 404
    if (!project) {
        notFound()
    }

    // CRÍTICO: Verificar que el usuario tiene acceso al proyecto
    const hasAccess =
        project.creator.id === user.user.id ||
        project.members.some(member => member.userId === user.user.id)

    if (!hasAccess) {
        redirect('/projects')
    }

    return project
}

// crear proyecto
export async function createProject(data: CreateProjectInput) {
    const user = await auth.api.getSession({
        headers: await headers()
    })

    if (!user?.user?.id) {
        throw new Error('No autenticado')
    }

    const validatedData = projectSchema.parse(data)

    const newProject = await prisma.project.create({
        data: {
            name: validatedData.name,
            description: validatedData.description,
            tag: validatedData.tag,
            creator: {
                connect: {
                    id: user.user.id
                }
            },
            members: {
                create: validatedData.members.map((memberId) => ({
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

// editar un proyecto
export async function updateProject(projectId: string, formData: any) {
    const user = await auth.api.getSession({
        headers: await headers()
    })

    if (!user?.user?.id) {
        throw new Error('No autenticado')
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { createdBy: true }
    })

    if (!project) {
        throw new Error("Proyecto no encontrado")
    }

    if (project.createdBy !== user.user.id) {
        return {
            success: false,
            error: 'Solo el creador puede editar este proyecto',
            code: '403'
        }
    }

    const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data: {
            name: formData.name,
            description: formData.description,
            tag: formData.tag,

            // Borra las relaciones actuales de este proyecto
            members: {
                deleteMany: {},
                create: formData.members.map((userId: string) => ({
                    userId: userId
                }))
            }
        }
    })

    revalidatePath('/projects')

    return {
        success: true,
        message: 'Proyecto actualizado correctamente',
        updatedProject
    }
}