import { z } from 'zod'

export const messageSchema = z.object({
    content: z.string()
        .min(1, 'El mensaje no puede estar vacío')
        .max(150, 'El mensaje no puede tener más de 150 caracteres')
        .trim()
})

export type MessageSchema = z.infer<typeof messageSchema>
