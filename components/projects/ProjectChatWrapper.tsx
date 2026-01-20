'use client'

import { useState } from 'react'
import ChatButton from './ChatButton'
import ChatSidebar from './ChatSidebar'

type ProjectChatWrapperProps = {
    projectName: string
}

export default function ProjectChatWrapper({ projectName }: ProjectChatWrapperProps) {
    const [isChatOpen, setIsChatOpen] = useState(false)

    return (
        <>
            <ChatButton
                isOpen={isChatOpen}
                onClick={() => setIsChatOpen(!isChatOpen)}
            />
            <ChatSidebar
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                projectName={projectName}
            />
        </>
    )
}
