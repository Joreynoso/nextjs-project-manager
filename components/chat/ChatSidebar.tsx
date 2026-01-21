'use client'

import { X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// import avatar
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ChatSkeleton from './ChatSkeleton'

// import types
import { Message } from '@/types/messages'

type ChatSidebarProps = {
    isOpen: boolean
    onClose: () => void
    projectName: string
    messages: Message[]
    isLoading: boolean
}


export default function ChatSidebar({ isOpen, onClose, projectName, messages, isLoading }: ChatSidebarProps) {
    const [inputValue, setInputValue] = useState('')

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 h-full w-full sm:w-[500px] bg-background border-r border-border z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border w-full">
                            <div>
                                <h2 className="text-lg font-semibold">Chat del Proyecto</h2>
                                <p className="text-sm text-muted-foreground truncate w-full">
                                    {projectName}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                aria-label="Cerrar chat"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>


                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4">
                            {isLoading ? (
                                <ChatSkeleton />
                            ) : (
                                <div className="space-y-6">
                                    {messages.length === 0 ? (
                                        <div className="text-center text-muted-foreground py-8">
                                            <p>No hay mensajes aún</p>
                                            <p className="text-sm">Sé el primero en escribir</p>
                                        </div>
                                    ) : (
                                        messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className="flex gap-3 flex-row"
                                            >
                                                {/* Avatar */}
                                                <Avatar className="h-9 w-9 shrink-0">
                                                    <AvatarImage src={message.user.image ?? undefined} />
                                                    <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                                                        {message.user.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>

                                                {/* Message Content */}
                                                <div className="flex flex-col gap-1 max-w-[75%] items-start">
                                                    {/* Nombre y timestamp */}
                                                    <div className="flex items-center gap-2 px-1 flex-row">
                                                        <span className="text-xs font-semibold text-foreground">
                                                            {message.user.email}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(message.createdAt).toLocaleTimeString('es-ES', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>

                                                    {/* Message bubble */}
                                                    <div className="rounded-2xl px-4 py-2.5 bg-muted text-foreground rounded-tl-sm">
                                                        <p className="text-sm leading-relaxed wrap-break-word">
                                                            {message.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </ScrollArea>

                        {/* Input */}
                        <div className="p-4 border-t border-border">
                            <div className="flex gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    // onKeyPress={handleKeyPress}
                                    placeholder="Escribe un mensaje..."
                                    className="flex-1"
                                />
                                <Button
                                    // onClick={handleSendMessage}
                                    size="icon"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
