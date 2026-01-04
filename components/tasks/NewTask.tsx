'use client'

import { useState, KeyboardEvent, useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'
import type { Task } from '@/types/tasks'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

// fetch para obtener una descripción con GROQ
async function generateDescription(projectName: string, taskName: string) {
    const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectName, taskName })
    })
    if (!response.ok) {
        toast.error('Error al generar la descripción')
        return
    }
    return response.json()
}

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
    projectName: string
    onCancel: () => void
    onSave: (task: Task) => void
}

export function NewTaskCard({ projectId, projectName, onCancel, onSave }: NewTaskCardProps) {

    // estados
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [generating, setGenerating] = useState(false)
    const [loading, setLoading] = useState(false)
    const [generatedText, setGeneratedText] = useState('') // Texto completo de la IA
    const [displayedText, setDisplayedText] = useState('') // Texto que se va mostrando

    // Efecto para animar el texto tipo "typing"
    useEffect(() => {
        if (!generatedText) return

        let index = 0
        setDisplayedText('')

        const interval = setInterval(() => {
            if (index < generatedText.length) {
                setDisplayedText(generatedText.slice(0, index + 1))
                index++
            } else {
                clearInterval(interval)
                setDescription(generatedText) // Al terminar, actualiza la descripción final
                setGeneratedText('') // Limpia el texto generado
                setDisplayedText('') // Limpia el texto mostrado
            }
        }, 20) // Velocidad de escritura (20ms por carácter)

        return () => clearInterval(interval)
    }, [generatedText])

    // funciones
    const handleGenerateDescription = async () => {
        if (!title.trim()) {
            toast.error('Primero escribe un título para la tarea')
            return
        }

        setGenerating(true)
        setDescription('') // Limpia la descripción actual
        setDisplayedText('') // Limpia el texto mostrado
        try {
            const data = await generateDescription(projectName, title)
            if (data?.success) {
                setGeneratedText(data.description) // Inicia la animación
            }
        } catch (error) {
            toast.error('Error al generar la descripción')
        } finally {
            setGenerating(false)
        }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title.trim()) {
            toast.error('El título es obligatorio')
            return
        }

        if (!description.trim()) {
            toast.error('La descripción es obligatoria')
            return
        }

        setLoading(true)
        try {
            const task = await createTask({ title, description, projectId })
            onSave(task)
            setTitle('')
            setDescription('')
            setDisplayedText('')
            toast.success('Tarea guardada exitosamente')
        } catch (error) {
            toast.error('Error al guardar la tarea')
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Escape') {
            onCancel()
        }
    }

    // render return
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card
                className='border border-dashed border-primary mt-5 rounded-lg'>
                <CardContent>
                    <form onSubmit={handleSave} className='space-y-3' onKeyDown={handleKeyDown}>
                        <Input
                            placeholder='Título de la tarea...'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                            required
                        />

                        <div className='relative'>
                            <Textarea
                                placeholder='Descripción (opcional)...'
                                value={displayedText || description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                required
                                className='pr-12'
                                disabled={generating || !!displayedText}
                            />

                            <Button
                                type='button'
                                size='icon'
                                variant='ghost'
                                onClick={handleGenerateDescription}
                                disabled={!title.trim() || generating || !!displayedText}
                                className='absolute bottom-2 right-2 h-8 w-8 z-10'
                                title='Generar descripción con IA'
                            >
                                <Sparkles className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
                            </Button>
                        </div>

                        <div className='flex gap-2 justify-end'>

                            {/* cancelar */}
                            <Button
                                size='sm'
                                variant='outline'
                                onClick={onCancel}
                                type='button'
                            >
                                Cancelar
                            </Button>

                            {/* guardar */}
                            <Button
                                size='sm'
                                type='submit'
                                disabled={loading || generating || !!displayedText}
                            >
                                {loading ? 'Guardando...' : 'Guardar'}
                            </Button>

                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}