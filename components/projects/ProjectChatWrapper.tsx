'use client'

import { useState, useEffect } from 'react'
import ChatButton from '../chat/ChatButton'
import ChatSidebar from '../chat/ChatSidebar'

type Message = {
    id: string
    content: string
    userId: string
    projectId: string
    createdAt: Date
}

type ProjectChatWrapperProps = {
    projectName: string
    projectId: string
}

// obtener los mensajes del proyecto
async function getMessages(id: string) {
    const response = await fetch(`/api/projects/${id}/messages`)
    const data = await response.json()
    console.log('Mensajes del proyecto...', data)
    return data.messages
}

export default function ProjectChatWrapper({ projectName, projectId }: ProjectChatWrapperProps) {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isChatOpen) {
            setIsLoading(true)
            getMessages(projectId)
                .then((data) => {
                    setMessages(data || [])
                })
                .catch((error) => {
                    console.error('Error al cargar mensajes:', error)
                    setMessages([])
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
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
                isLoading={isLoading}
            />
        </>
    )
}
