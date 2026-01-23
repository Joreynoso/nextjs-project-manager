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

        // verificar que el proyecto exista y que el usuario pertenezca al proyecto 
        const project = await prisma.project.findFirst({
            where: {
                id,
                members: {
                    some: { userId }
                }
            }
        })

        // si el proyecto no existe o el usuario no pertenece al proyecto
        if (!project) {
            return NextResponse.json(
                { error: "Proyecto no encontrado" },
                { status: 404 }
            )
        }

        // soporte para polling
        const { searchParams } = new URL(req.url)
        const sinceId = searchParams.get('since') // ID del último mensaje que tiene el cliente

        // construir query dinámica
        const whereClause: any = { projectId: id }

        // si hay 'since', solo traer mensajes más nuevos
        if (sinceId) {
            whereClause.id = { gt: sinceId } // greater than
        }

        const messages = await prisma.message.findMany({
            where: whereClause,
            take: sinceId ? undefined : 50, // límite solo en carga inicial
            orderBy: {
                createdAt: "asc"
            },
            include: {
                user: true
            }
        })

        return NextResponse.json(messages)
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