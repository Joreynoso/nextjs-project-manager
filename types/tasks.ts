// types/prisma.ts
import { Prisma, User } from '@prisma/client'

export type Task = {
    id: string
    title: string
    description: string
    completed: boolean
    projectId: string
    createdAt: Date
    updatedAt: Date
    assignedTo: string
    assignee: User
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

/**
 * 
 * 
 *  id          String   @id @default(cuid())
  title       String
  description String?  @db.Text
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  projectId String
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  assignedTo String?
  assignee   User?   @relation("AssignedTasks", fields: [assignedTo], references: [id], onDelete: SetNull)

  @@index([projectId])
  @@index([assignedTo])
 * 
*/