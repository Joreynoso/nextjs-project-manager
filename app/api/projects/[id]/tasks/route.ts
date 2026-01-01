import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import auth from "@/lib/auth"

/**
 * POST /api/projects/[id]/tasks
 * Crea una nueva tarea para un proyecto específico
 */
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // es el id de la ruta projects/[id]/tasks
    const { id } = await context.params
    const session = await auth.api.getSession({
      headers: req.headers
    })

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const body = await req.json()

    const newTask = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        projectId: id,
      }
    })

    return NextResponse.json({ message: "Tarea creada exitosamente", newTask })
  } catch (error) {
    console.error("Error al crear una nueva tarea", error)
    return NextResponse.json(
      { error: "Error al crear tarea" },
      { status: 500 }
    )
  }
}


/**
 * GET /api/projects/[id]/tasks
 * Trae todas las tareas de un proyecto específico
 */
export async function GET(req: Request, context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const session = await auth.api.getSession({
      headers: req.headers
    })

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId: id,
      }
    })

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Error al obtener las tareas", error)
    return NextResponse.json(
      { error: "Error al obtener tareas" },
      { status: 500 }
    )
  }
}