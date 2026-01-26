// lib/api/messages.ts
import { messageSchema } from '@/lib/validations/messages'
import { toast } from 'sonner'

/**
 * Obtiene mensajes de un proyecto
 * @param projectId - ID del proyecto
 * @param sinceId - ID del último mensaje (para polling incremental)
 */
export async function getMessages(projectId: string, sinceId?: string) {
    const url = sinceId 
        ? `/api/projects/${projectId}/messages?since=${sinceId}`
        : `/api/projects/${projectId}/messages`
    
    const response = await fetch(url)
    
    if (!response.ok) {
        throw new Error('Error al obtener mensajes')
    }
    
    return response.json()
}

/**
 * Crea un nuevo mensaje
 * @param content - Contenido del mensaje
 * @param projectId - ID del proyecto
 */
export async function createMessage(content: string, projectId: string) {
    // Validar antes de enviar
    const validation = messageSchema.safeParse({ content })
    
    // validar que el mensaje no este vacio del lado del servidor
    if (!validation.success) {
        toast.error(validation.error.issues[0].message)
        return null
    }
    
    const response = await fetch(`/api/projects/${projectId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
    })
    
    if (!response.ok) {
        const error = await response.json()
        toast.error(error || 'Error al crear mensaje')
        return null
    }
    
    return response.json()
}