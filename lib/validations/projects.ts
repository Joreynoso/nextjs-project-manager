import { z } from 'zod'

// reglas de validación para projects
export const projectSchema = z.object({
    name: z
        .string()
        .min(6, 'El nombre debe tener al menos 6 caracteres')
        .max(100, 'El nombre no puede tener más de 100 caracteres'),

    description: z
        .string()
        .max(500, 'La descripción no puede tener más de 500 caracteres')
        .optional(), 

    tag: z
        .string()
        .min(3, 'La etiqueta debe tener al menos 3 caracteres')
        .max(50, 'La etiqueta no puede tener más de 50 caracteres'),
    
    members: z
        .array(z.string())
        .min(1, 'Debe haber al menos 1 miembro')
        // NO uses .default([]) si requieres mínimo 1
});

export type ProjectSchema = z.infer<typeof projectSchema>