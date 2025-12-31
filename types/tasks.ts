// types/prisma.ts
import { Prisma, User } from '@prisma/client'

export type Task = {
    id: string
    title: string
    description: string | null  // ← Nullable
    completed: boolean
    projectId: string
    createdAt: Date
    updatedAt: Date
    assignedTo: string | null   // ← Nullable
    assignee: User | null       // ← Nullable
    status: string
}

export type ProjectWithTasks = Prisma.ProjectGetPayload<{
    include: {
        creator: true,
        tasks: true,
        members: {
            include: { user: true }
        }
    }
}>