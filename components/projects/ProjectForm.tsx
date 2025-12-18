'use client' //

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

// import select
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ProjectFormProps {
    onSubmit?: (data: any) => void
    onCancel?: () => void // ← Agregar para cerrar el dialog
    users?: any
}

export default function ProjectForm({ onSubmit, onCancel, users }: ProjectFormProps) {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name'),
            tag: formData.get('tag'),
            description: formData.get('description'),
            // members lo manejaremos después
        }
        
        onSubmit?.(data)
    }

    // render return
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
            {/* nombre proyecto */}
            <div className='flex flex-col gap-2'>
                <Label htmlFor="name" className='font-semibold'>Nombre del proyecto</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ej. Proyecto de diseño"
                    required
                />
            </div>

            {/* agregar una etiqueta */}
            <div className='flex flex-col gap-2'>
                <Label htmlFor="tag" className='font-semibold'>Etiqueta</Label>
                <Input
                    id="tag"
                    name="tag"
                    type="text"
                    placeholder="Ej. Diseño, Desarrollo, Marketing"
                    required
                />
            </div>

            {/* descripción del proyecto */}
            <div className='flex flex-col gap-2'>
                <Label htmlFor="description" className='font-semibold'>Descripción del proyecto</Label>
                <Textarea 
                    id="description"
                    name="description"
                    placeholder="Describe tu proyecto..." 
                    className='min-h-[200px]' 
                />
            </div>

            {/* agregar miembros uno por uno */}
            <div className='flex flex-col gap-2'>
                <Label htmlFor="members" className='font-semibold'>Miembros</Label>
                <Select name="members">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar miembros" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map((user: any) => (
                            <SelectItem key={user.id} value={user.id}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* acciones */}
            <div className='flex gap-4 justify-end mt-4'>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit">
                    Guardar
                </Button>
            </div>
        </form>
    )
}