'use client'

import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

type ChatButtonProps = {
    isOpen: boolean
    onClick: () => void
}

export default function ChatButton({ isOpen, onClick }: ChatButtonProps) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="fixed bottom-6 right-6 z-40"
            >
                <Button
                    onClick={onClick}
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
                >
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <MessageCircle className="h-6 w-6" />
                    )}
                </Button>
            </motion.div>
        </AnimatePresence>
    )
}
