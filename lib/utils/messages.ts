// lib/api/messages.ts
import { messageSchema } from '@/lib/validations/messages'
import { toast } from 'sonner'

/**
 * Obtiene mensajes de un proyecto
 * @param projectId - ID del proyecto
 * @param sinceId - ID del último mensaje (para polling incremental)
 */
export async function getMessages(projectId: string, sinceId?: string) {

    console.log('1. getting messages... from lib', projectId)

    const url = sinceId 
        ? `/api/projects/${projectId}/messages?since=${sinceId}`
        : `/api/projects/${projectId}/messages`


    console.log('2. url', url)
    const response = await fetch(url)

    console.log('3. response', response)

    if (!response.ok) {
        throw new Error('Error al obtener mensajes')
    }

    console.log('4. response ok')

    const data = await response.json()

    console.log('5. data', data)
    return data
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