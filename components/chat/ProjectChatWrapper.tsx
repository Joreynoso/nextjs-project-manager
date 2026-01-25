'use client'

import { useState, useEffect } from 'react'
import ChatButton from './ChatButton'
import ChatSidebar from './ChatSidebar'
import { Message } from '@/types/messages'
import { toast } from 'sonner'
import { useSession } from '@/lib/auth-client'

type ProjectChatWrapperProps = {
    projectName: string
    projectId: string
}

// import apis
import { getMessages, createMessage } from '@/lib/utils/messages'

export default function ProjectChatWrapper({ projectName, projectId }: ProjectChatWrapperProps) {
    // estados
    const { data: session } = useSession()
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // carga inicial
    useEffect(() => {
        if (!isChatOpen) return

        const loadMessages = async () => {
            setIsLoading(true)
            try {
                const data = await getMessages(projectId)
                setMessages(data)
            } catch (error) {
                toast.error('Error al cargar mensajes:')
                setMessages([])
            } finally {
                setIsLoading(false)
            }
        }

        loadMessages()
    }, [isChatOpen, projectId])

    // polling cada 3 segundos para verificar nuevos mensajes
    useEffect(() => {
        if (!isChatOpen || messages.length === 0) return

        const interval = setInterval(async () => {
            // Obtener el ID del último mensaje
            const lastMessageId = messages[messages.length - 1]?.id

            if (!lastMessageId) return

            try {
                // Traer solo mensajes nuevos
                const newMessages = await getMessages(projectId, lastMessageId)

                if (newMessages.length > 0) {
                    // Agregar los nuevos al final
                    setMessages(prev => [...prev, ...newMessages])
                }
            } catch (error) {
                console.error('Error en polling:', error)
            }
        }, 3000) // 3 segundos

        // Limpiar intervalo cuando se cierra el chat o cambia el proyecto
        return () => clearInterval(interval)
    }, [isChatOpen, projectId, messages])

    // función optimistic para enviar un mensaje
    const handleSendMessage = async (content: string) => {
        if (!session?.user) {
            toast.error('Debes iniciar sesión para enviar mensajes')
            return
        }

        const currentUser = session.user

        // 1. Crear mensaje temporal (optimistic)
        const tempMessage: Message = {
            id: `temp-${Date.now()}`,
            content,
            userId: currentUser.id,
            projectId: projectId,
            createdAt: new Date(),
            user: {
                ...currentUser,
                image: currentUser.image || null
            }
        }

        // 2. Agregar inmediatamente a la UI
        setMessages(prev => [...prev, tempMessage])

        // 3. Enviar al servidor
        try {
            const newMessage = await createMessage(content, projectId)

            if (newMessage) {
                // 4. Reemplazar el temporal con el mensaje real del servidor
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === tempMessage.id ? newMessage : msg
                    )
                )
            }
        } catch (error) {
            // 5. Si falla, remover el mensaje temporal
            setMessages(prev =>
                prev.filter(msg => msg.id !== tempMessage.id)
            )
            toast.error('Error al enviar mensaje')
        }
    }

    return (
        <>
            <ChatButton
                isOpen={isChatOpen}
                onClick={() => setIsChatOpen(!isChatOpen)}
            />
            <ChatSidebar
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                messages={messages}
                projectName={projectName}
                projectId={projectId}
                isLoading={isLoading}
                onHandleSendMessage={handleSendMessage}
            />
        </>
    )
}
