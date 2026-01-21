'use client'

import { useState, useEffect } from 'react'
import ChatButton from './ChatButton'
import ChatSidebar from './ChatSidebar'
import { Message } from '@/types/messages'
import { toast } from 'sonner'

type ProjectChatWrapperProps = {
    projectName: string
    projectId: string
}

// obtener los mensajes del proyecto
async function getMessages(id: string) {
    const response = await fetch(`/api/projects/${id}/messages`)
    const data = await response.json()
    console.log('Mensajes del proyecto...', data)

    if (data.error) {
        throw new Error(data.error)
    }

    return data || []
}

export default function ProjectChatWrapper({ projectName, projectId }: ProjectChatWrapperProps) {
    const [isChatOpen, setIsChatOpen] = useState(false)

    // guardar los mensajes del proyecto
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

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
            />
        </>
    )
}
