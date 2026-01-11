'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Task } from "@/types/tasks"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { DialogDescription } from '@radix-ui/react-dialog'

type EditTaskDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    task: Task
}

export default function EditTaskDialog({ open, onOpenChange, task }: EditTaskDialogProps) {
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description || '')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // Resetea el formulario cuando cambia la tarea o se abre el diálogo
    useEffect(() => {
        if (open) {
            setTitle(task.title)
            setDescription(task.description || '')
        }
    }, [open, task])

    // Maneja el envío del formulario
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()

        // frontend validation
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
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description
                })
            })

            if (!response.ok) {
                throw new Error('Error al actualizar la tarea')
            }

            toast.success('Tarea actualizada correctamente')
            onOpenChange(false)
            router.refresh()
        } catch (error) {
            toast.error('Ocurrió un error al guardar los cambios')
        } finally {
            setLoading(false)
        }
    }

    // render return
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Tarea</DialogTitle>
                    <DialogDescription>
                        Edita la tarea para actualizarla
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSave} className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title" className="font-semibold">
                            Título
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Título de la tarea"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="font-semibold">
                            Descripción
                        </Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descripción de la tarea (opcional)"
                            rows={4}
                            className='min-h-[120px]'
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}