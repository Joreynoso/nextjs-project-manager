'use client'

import type { Task } from '@/types/tasks'
import { formatDateString } from '@/lib/utils'
import { Calendar } from 'lucide-react'

export default function TaskCard({ task }: { task: Task }) {
    return (
        <div className='bg-card text-card-foreground border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20 mb-3'>

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
                <p className='text-sm text-muted-foreground leading-relaxed line-clamp-2'>
                    {task.description || 'Sin descripción'}
                </p>
            </div>

        </div>
    )
}