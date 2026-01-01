import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import auth from '@/lib/auth'

/**
 * GET /api/projects
 * Obtiene todos los proyectos
 */
export async function GET(request: Request) {
    try {
        
        // verificar si el usuario esta autenticado
        const session = await auth.api.getSession({
            headers: request.headers
        })

        // retornar error de autorización
        // !session?.user?.id es para verificar si el usuario esta autenticado
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            )
        }

        // Buscar proyectos donde soy miembro
        const projects = await prisma.project.findMany({
            where: {
                members: {
                    some: {
                        userId: session.user.id
                    }
                }
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        tasks: true,
                        messages: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        // retornar respuesta
        return NextResponse.json(projects)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Error al obtener los proyectos' }, { status: 500 })
    }
}

/**
 * POST /api/projects
 * Crea un nuevo proyecto
 */
export async function POST(request: Request) {
    try {
        // verificar si el usuario esta autenticado 
        const session = await auth.api.getSession({
            headers: request.headers
        });

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            )
        }

        // Obtener datos del body
        const body = await request.json()
        console.log('datos del body', body)
        const { name, description, tag, deadline, memberIds = [] } = body

        // Validaciones
        if (!name || name.trim().length === 0) {
            return NextResponse.json(
                { error: "El nombre es requerido" },
                { status: 400 }
            )
        }

        if (!tag) {
            return NextResponse.json(
                { error: "El tag es requerido" },
                { status: 400 }
            )
        }

        const validTags = ["Research", "Design", "Development"]
        if (!validTags.includes(tag)) {
            return NextResponse.json(
                { error: "Tag inválido" },
                { status: 400 }
            )
        }

        // Crear el proyecto
        const project = await prisma.project.create({
            data: {
                name: name.trim(),
                description: description?.trim() || null,
                tag,
                deadline: deadline ? new Date(deadline) : null,
                createdBy: session.user.id,
                members: {
                    create: [
                        // Siempre agregar al creador
                        { userId: session.user.id },
                        // Agregar otros miembros (sin duplicar)
                        ...memberIds
                            .filter((id: string) => id !== session.user.id)
                            .map((id: string) => ({ userId: id }))
                    ]
                }
            },
            include: {
                creator: {
                    select: {
                        name: true,
                        email: true,
                        image: true
                    }
                },
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        console.error("Error creating project:", error)
        return NextResponse.json(
            { error: "Error al crear proyecto" },
            { status: 500 }
        )
    }
}