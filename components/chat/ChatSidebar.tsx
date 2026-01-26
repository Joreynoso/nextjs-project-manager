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
import { toast } from 'sonner'

// user
import { redirect } from 'next/navigation'
import type { User } from '@/types/user'
import { useSession } from '@/lib/auth-client'

// validaciones
import { messageSchema } from '@/lib/validations/messages'

type ChatSidebarProps = {
    isOpen: boolean
    onClose: () => void
    projectId: string
    projectName: string
    messages: Message[]
    isLoading: boolean
    onHandleSendMessage: (message: string) => void
}

export default function ChatSidebar({ isOpen, onClose, projectId, projectName, messages, isLoading, onHandleSendMessage }: ChatSidebarProps) {
    const [inputValue, setInputValue] = useState('')

    // obtener el usuario logueado
    const { data: session } = useSession()

    if (!session) {
        redirect('/auth/login')
    }

    const { user }: { user: User } = session

    const currentUserEmail = user.email

    // enviar mensaje
    const handleSubmit = async (e: React.FormEvent) => {
        console.log('1. entrando a la función')
        e.preventDefault()

        try {
            // verificar que el proyecto exista
            if (!projectId) {
                toast.error('El proyecto no existe')
                return
            }

            // verificar que el mensaje no este vacio
            if (!inputValue) {
                toast.error('El mensaje no puede estar vacio')
                return
            }

            // si todo está bien validar con zod
            const result = messageSchema.safeParse({ content: inputValue })
            console.log('2. validacion zod', result)

            if (!result.success) {
                toast.error('El mensaje no es valido')
                return
            }

            console.log('3. creando el mensaje')
            // crear el nuevo mensaje con la funcion onHandleSendMessage
            onHandleSendMessage(result.data.content)
            console.log('4. mensaje creado', result.data.content)

            // si el mensaje se creo correctamente, limpiar el input
            setInputValue('')

        } catch (error) {
            toast.error('Error al crear el mensaje')
        }
    }

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
                        {/* Deberia poder diferenciar con un color distinto los mensajes del usuario que está actualmente logueado */}
                        <ScrollArea className="flex-1 overflow-y-auto p-4">
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
                                                className={`flex gap-3 ${currentUserEmail === message.user.email ? 'flex-row-reverse' : 'flex-row'}`}
                                            >
                                                {/* Avatar */}
                                                <Avatar className="h-9 w-9 shrink-0">
                                                    <AvatarImage src={message.user.image ?? undefined} />
                                                    <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                                                        {message.user.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>

                                                {/* Message Content */}
                                                <div className={`flex flex-col gap-1 max-w-[75%] ${currentUserEmail === message.user.email ? 'items-end' : 'items-start'}`}>
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
                                                    {/* Cambiar color de la burbuja si el email coincide con el del usuario logueado */}
                                                    {/* y que aparezca a la derecha */}
                                                    {currentUserEmail === message.user.email ? (
                                                        <div className="rounded-2xl px-4 py-2.5 bg-secondary text-dark dark:text-white rounded-tr-sm">
                                                            <p className="text-sm leading-relaxed wrap-break-word">
                                                                {message.content}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="rounded-2xl px-4 py-2.5 bg-muted text-foreground rounded-tl-sm">
                                                            <p className="text-sm leading-relaxed wrap-break-word">
                                                                {message.content}
                                                            </p>
                                                        </div>
                                                    )}
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
                                    placeholder="Escribe un mensaje..."
                                    className="flex-1"
                                />
                                <Button
                                    onClick={handleSubmit}
                                    size="icon"
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
