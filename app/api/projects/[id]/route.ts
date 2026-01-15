import { NextResponse } from "next/server"
import auth from "@/lib/auth"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"

/**
 * GET /api/projects/[id]
 * Obtiene un proyecto específico
 */
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params  // ← Cambia esto

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

    const project = await prisma.project.findFirst({
      where: {
        id,  // ← Usa id directamente
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

    return NextResponse.json(project)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error al obtener el proyecto" },
      { status: 500 }
    )
  }
}