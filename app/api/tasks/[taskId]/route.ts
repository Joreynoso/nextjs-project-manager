import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import auth from "@/lib/auth"
import { taskStatusSchema, taskSchema } from "@/lib/validations/tasks"
import { z } from "zod"

/**
 * PATCH /api/tasks/[taskId]
 * Actualiza el estado de una tarea específica
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

        const validatedBody = taskStatusSchema.parse(body)

        // Actualizar la tarea
        const updatedTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                status: validatedBody.status,
            },
        })

        return NextResponse.json({
            message: "Tarea actualizada exitosamente",
            task: updatedTask
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const issues = error.issues;
            return NextResponse.json(
                { error: issues[0].message },
                { status: 400 }
            )
        }
        console.error("Error al actualizar el estado de una tarea", error)
        return NextResponse.json(
            { error: "Error al actualizar el estado de la tarea" },
            { status: 500 }
        )
    }
}

/**
 * PUT /api/tasks/[taskId]
 * Actualiza una tarea específica (title y description obligatorios)
 */
export async function PUT(req: Request, context: { params: Promise<{ taskId: string }> }) {
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

        // Usa taskSchema - ambos campos obligatorios
        const validatedBody = taskSchema.parse(body)

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                title: validatedBody.title,
                description: validatedBody.description,
                // el status permanece sin cambios
            },
        })

        return NextResponse.json({
            message: "Tarea actualizada exitosamente",
            task: updatedTask
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: "Error al actualizar la tarea" },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/tasks/[taskId]
 * Elimina una tarea específica
 */
export async function DELETE(req: Request, context: { params: Promise<{ taskId: string }> }) {
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

        // Eliminar la tarea
        const deletedTask = await prisma.task.delete({
            where: {
                id: taskId
            },
        })

        return NextResponse.json({
            message: "Tarea eliminada exitosamente",
            task: deletedTask
        })
    } catch (error) {
        console.error("Error al eliminar una tarea", error)
        return NextResponse.json(
            { error: "Error al eliminar tarea" },
            { status: 500 }
        )
    }
}

