// types/prisma.ts
import { Prisma } from '@prisma/client'

export type ProjectWithCreator = Prisma.ProjectGetPayload<{
    include: { creator: true }
}>

export type ProjectWithDetails = Prisma.ProjectGetPayload<{
    include: {
        creator: true,
        tasks: true,
        members: {
            include: { user: true }
        }
    }
}>

export type UserWithProjects = Prisma.UserGetPayload<{
    include: { createdProjects: true }
}>

export type MemberWithUser = Prisma.ProjectMemberGetPayload<{
    include: { user: true }
}>

export type ProjectWithMembers = Prisma.ProjectGetPayload<{
    include: {
        creator: true,
        members: {
            include: { user: true }
        }
    }
}>