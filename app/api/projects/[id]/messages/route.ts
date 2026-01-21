import { NextResponse } from "next/server"
import auth from "@/lib/auth"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"
import { messageSchema } from "@/lib/validations/messages"

/**
 * GET /api/projects/[id]/messages
 * Obtiene los mensajes de un proyecto específico
 */
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        // obtener el id del proyecto
        const { id } = await context.params

        // obtener la sesion del usuario
        const session = await auth.api.getSession({
            headers: await headers()
        })

        // obtener el id del usuario
        const userId = session?.user?.id

        // verificar que el usuario este autenticado
        if (!userId) {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            )
        }

        // buscar proyecto por id
        const project = await prisma.project.findFirst({
            where: {
                id,
                members: {
                    some: { userId }
                }
            }
        })

        // verificar que el proyecto exista
        if (!project) {
            return NextResponse.json(
                { error: "Proyecto no encontrado" },
                { status: 404 }
            )
        }

        // buscar los mensajes del proyecto
        // traer solo los ultimos 50 mensajes
        const messages = await prisma.message.findMany({
            where: {
                projectId: id
            },
            take: 50,
            orderBy: {
                createdAt: "asc"
            },
            include: {
                user: true
            }
        })

        // retornar los mensajes
        return NextResponse.json(messages || [])
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Error al obtener los mensajes" },
            { status: 500 }
        )
    }
}

/**
 * POST /api/projects/[id]/messages
 * Crea un nuevo mensaje en un proyecto específico
 */
export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params

        const session = await auth.api.getSession({
            headers: await headers()
        })

        const userId = session?.user?.id

        if (!userId) {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            )
        }

        // Verificar acceso al proyecto
        const project = await prisma.project.findFirst({
            where: {
                id,
                members: {
                    some: { userId }
                }
            }
        })

        if (!project) {
            return NextResponse.json(
                { error: "Proyecto no encontrado" },
                { status: 404 }
            )
        }

        // Obtener y validar datos
        const body = await req.json()
        const validation = messageSchema.safeParse(body)

        // Si la validación falla, retornar errores
        if (!validation.success) {
            return NextResponse.json(
                validation.error.issues.map(issue => issue.message),
                { status: 400 }
            )
        }

        // Datos validados
        const { content } = validation.data

        // Crear mensaje
        const message = await prisma.message.create({
            data: {
                content,
                projectId: id,
                userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        email: true
                    }
                }
            }
        })

        return NextResponse.json(message)

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Error al crear el mensaje" },
            { status: 500 }
        )
    }
}