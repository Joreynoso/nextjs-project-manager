// types/prisma.ts
import { Prisma } from '@prisma/client'

export type ProjectWithTasks = Prisma.ProjectGetPayload<{
    include: {
        creator: true,
        tasks: true,
        members: {
            include: { user: true }
        }
    }
}>