import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import auth from "@/lib/auth"

/**
 * PATCH /api/tasks/[taskId]
 * Actualiza una tarea específica
 */
export async function PATCH(req: Request, context: { params: Promise<{ taskId: string }> }) {
    try {
        const { taskId } = await context.params
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

        // Actualizar la tarea
        const updatedTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                status: body.status,
            },
        })

        return NextResponse.json({
            message: "Tarea actualizada exitosamente",
            task: updatedTask
        })
    } catch (error) {
        console.error("Error al actualizar una tarea", error)
        return NextResponse.json(
            { error: "Error al actualizar tarea" },
            { status: 500 }
        )
    }
}
