'use server'

import auth from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CreateProjectInput } from '@/types/projects'
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