'use client'

import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'


interface NewTaskCardProps {
    onCancel: () => void
    onSave: (data: { title: string; description: string }) => void
}

export function NewTaskCard({ onCancel, onSave }: NewTaskCardProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSave = () => {
        if (!title.trim()) {
            toast.error('El titulo es obligatorio')
            return
        }

        onSave({ title, description })
        setTitle('')
        setDescription('')
        toast.success('Tarea guardada exitosamente')
    }

    return (
        <Card className='border border-dashed border-primary mt-5 rounded-lg'>
            <CardContent className='space-y-3'>
                <Input
                    placeholder='Título de la tarea...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />

                <Textarea
                    placeholder='Descripción (opcional)...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
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
                        onClick={handleSave}
                    >
                        Guardar
                    </Button>

                </div>
            </CardContent>
        </Card>
    )
}