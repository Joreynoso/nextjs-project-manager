import { z } from 'zod'

// reglas de validación para projects
export const taskSchema = z.object({
    title: z
        .string()
        .min(5, 'El titulo de la tarea debe tener al menos 5 caracteres')
        .max(100, 'El titulo de la tarea no puede tener más de 100 caracteres'),

    description: z
        .string()
        .min(5, 'La descripción de la tarea debe tener al menos 5 caracteres')
        .max(150, 'La descripción de la tarea no puede tener más de 150 caracteres')
});

export type TaskSchema = z.infer<typeof taskSchema>
