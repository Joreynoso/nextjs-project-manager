'use client'

import type { Task } from '@/types/tasks'
import { formatDateString } from '@/lib/utils'
import { Calendar, Check, CircleDashed, EllipsisVertical, Loader } from 'lucide-react'

// import dropdown menu
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function TaskCard({ task }: { task: Task }) {

    const router = useRouter()

    // cambiar el estado de la tarea y actulizar optimistamente
    const handleStatusChange = async (newStatus: 'pending' | 'in_progress' | 'completed') => {
        try {
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            })
            if (!response.ok) {
                throw new Error('Error al actualizar')
            }
            // Mostrar mensaje de éxito
            toast.success('Tarea actualizada')

            // Refrescar la página para ver los cambios
            router.refresh()
        } catch (error) {
            toast.error('Error al actualizar la tarea')
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                toast.error('Error al eliminar')
            }
            toast.success('Tarea eliminada')
            router.refresh()
        } catch (error) {
            toast.error('Error al eliminar la tarea')
        }
    }

    return (
        <motion.div
            // Aparece desde abajo y sube
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='relative bg-card text-card-foreground border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20 mb-3'>

            {/* Dropdown menu de estados - Posicionado arriba a la derecha */}
            <div className="absolute top-2 right-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange('pending')} className="flex justify-between">
                            <span>Marcar como pendiente</span>
                            <CircleDashed className="h-4 w-4 ml-2" />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange('in_progress')} className="flex justify-between">
                            <span>Marcar como en progreso</span>
                            <Loader className="h-4 w-4 ml-2" />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange('completed')} className="flex justify-between">
                            <span>Marcar como completada</span>
                            <Check className="h-4 w-4 ml-2" />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteTask(task.id)}>
                            Borrar tarea
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Header: Fecha */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                <Calendar className="h-3 w-3" />
                <span>{formatDateString(task.createdAt)}</span>
            </div>

            {/* Título y descripción */}
            <div className='space-y-2'>
                <h3 className='text-lg font-semibold tracking-tight leading-tight'>
                    {task.title}
                </h3>
                <p className='text-sm text-muted-foreground leading-relaxed line-clamp-3'>
                    {task.description || 'Sin descripción'}
                </p>
            </div>

        </motion.div>
    )
}