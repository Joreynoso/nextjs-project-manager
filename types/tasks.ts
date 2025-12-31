// types/prisma.ts
import { Prisma, User } from '@prisma/client'

export type Task = {
    id: string
    title: string
    description: string | null  // ← Nullable
    projectId: string
    createdAt: Date
    updatedAt: Date
    assignedTo: string | null   // ← Nullable
    assignee: User | null       // ← Nullable
    status: 'pending' | 'in_progress' | 'completed'
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