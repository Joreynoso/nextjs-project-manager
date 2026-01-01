'use client'

import { useState, KeyboardEvent } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'
import type { Task } from '@/types/tasks'

// fetch post para crear una nueva tarea
async function createTask(data: { title: string; description: string; projectId: string }) {
    const response = await fetch(`/api/projects/${data.projectId}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error('Error al crear la tarea')
    }

    return response.json()
}

// type
type NewTaskCardProps = {
    projectId: string
    onCancel: () => void
    onSave: (task: Task) => void
}

export function NewTaskCard({ projectId, onCancel, onSave }: NewTaskCardProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title.trim()) {
            toast.error('El titulo es obligatorio')
            return
        }

        if (!description.trim()) {
            toast.error('La descripción es obligatoria')
            return
        }

        try {
            const task = await createTask({ title, description, projectId })
            onSave(task)
            setTitle('')
            setDescription('')
            toast.success('Tarea guardada exitosamente')
        } catch (error) {
            toast.error('Error al guardar la tarea')
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Escape') {
            onCancel()
        }
    }

    return (
        <Card className='border border-dashed border-primary mt-5 rounded-lg'>
            <CardContent>
                <form onSubmit={handleSave} className='space-y-3' onKeyDown={handleKeyDown}>
                    <Input
                        placeholder='Título de la tarea...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        required
                    />

                    <Textarea
                        placeholder='Descripción (opcional)...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        required
                    />

                    <div className='flex gap-2 justify-end'>

                        {/* cancelar */}
                        <Button
                            size='sm'
                            variant='outline'
                            onClick={onCancel}
                        >
                            Cancelar
                        </Button>

                        {/* guardar */}
                        <Button
                            size='sm'
                            type='submit'
                        >
                            Guardar
                        </Button>

                    </div>
                </form>
            </CardContent>
        </Card>
    )
}