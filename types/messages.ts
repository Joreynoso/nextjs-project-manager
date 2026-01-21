
export type Message = {
    id: string
    content: string
    userId: string
    projectId: string
    createdAt: Date
    user: {
        id: string
        name: string
        email: string
        image: string | null
    }
}