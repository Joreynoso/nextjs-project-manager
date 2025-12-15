import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import auth from '@/lib/auth'

export async function GET(request: Request) {
    try {
        // verificar si el usuario esta autenticado 
        const session = await auth.api.getSession({
            headers: request.headers
        })

        // retornar error de autorización
        // !session?.user?.id es para verificar si el usuario esta autenticado
        // !session la diferencia es que si no hay sesion retorna null
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            )
        }

        // recuperar todos los proyectos
        const projects = await prisma.project.findMany({
            where: {
                creator: {
                    id: session.user.id
                }
            },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        // retornar respuesta o [] si no hay proyectos
        if (!projects) {
            return NextResponse.json(
                { error: "No hay proyectos" },
                { status: 404 }
            )
        }

        // retornar respuesta
        return NextResponse.json(projects)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Error al obtener los proyectos' }, { status: 500 })
    }
}