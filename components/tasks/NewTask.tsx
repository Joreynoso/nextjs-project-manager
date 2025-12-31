'use client'

import { useState, KeyboardEvent } from 'react'
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

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title.trim()) {
            toast.error('El titulo es obligatorio')
            return
        }

        if (!description.trim()) {
            toast.error('La descripción es obligatoria')
            return
        }

        onSave({ title, description })
        setTitle('')
        setDescription('')
        toast.success('Tarea guardada exitosamente')
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