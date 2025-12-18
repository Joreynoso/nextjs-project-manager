'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'sonner'
import { useState } from 'react'
import { X } from 'lucide-react'
import { createProject } from '@/actions/projects'
import { create } from 'domain'

type formProject = {
    users: any
    onCancel: () => void
}

export default function ProjectForm({ users, onCancel }: formProject) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        tag: '',
        description: '',
        members: [] as string[]
    })

    // Estado para forzar el reset del select
    const [selectKey, setSelectKey] = useState(0)

    // Agregar miembro
    const handleAddMember = (userId: string) => {
        if (!formData.members.includes(userId)) {
            setFormData({
                ...formData,
                members: [...formData.members, userId]
            })
            // Forzar reset del select cambiando la key
            setSelectKey(prev => prev + 1)
        }
    }

    // Remover miembro
    const handleRemoveMember = (userId: string) => {
        setFormData({
            ...formData,
            members: formData.members.filter(id => id !== userId)
        })
    }

    // Obtener usuario por ID
    const getUserById = (userId: string) => {
        return users.find((user: any) => user.id === userId)
    }

    // Usuarios disponibles (no seleccionados)
    const availableUsers = users.filter((user: any) => !formData.members.includes(user.id))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await createProject(formData)
            if(!result){
                toast.error('Error al crear el proyecto')
                return
            }
            toast.success('Proyecto creado exitosamente')
            onCancel()
        } catch (error) {
            toast.error('Error al crear el proyecto')
        } finally {
            setLoading(false)
        }
    }

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
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            {/* etiqueta */}
            <div className='flex flex-col gap-2'>
                <Label htmlFor="tag" className='font-semibold'>Etiqueta</Label>
                <Input
                    id="tag"
                    name="tag"
                    type="text"
                    placeholder="Ej. Diseño, Desarrollo, Marketing"
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                />
            </div>

            {/* descripción */}
            <div className='flex flex-col gap-2'>
                <Label htmlFor="description" className='font-semibold'>Descripción del proyecto</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe tu proyecto..."
                    className='min-h-[200px]'
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            {/* Miembros */}
            <div className='flex flex-col gap-2'>
                <Label htmlFor="members" className='font-semibold'>
                    Miembros ({formData.members.length})
                </Label>

                <Select
                    key={selectKey} // forzar reset de default
                    onValueChange={handleAddMember}
                    disabled={availableUsers.length === 0}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar miembros" />
                    </SelectTrigger>
                    <SelectContent>
                        {users
                            .filter((user: any) => !formData.members.includes(user.id))
                            .map((user: any) => (
                                <SelectItem key={user.id} value={user.id}>
                                    {user.name}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>

                {/* Lista de miembros agregados */}
                {formData.members.length > 0 && (
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {formData.members.map((memberId) => {
                            const user = getUserById(memberId)
                            return (
                                <div
                                    key={memberId}
                                    className='flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md'
                                >
                                    <span className='text-sm'>{user?.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveMember(memberId)}
                                        className='hover:bg-destructive/20 rounded-full p-0.5'
                                    >
                                        <X className='h-3 w-3' />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* acciones */}
            <div className='flex gap-4 justify-end mt-4'>
                <Button 
                disabled={loading}
                type="button" 
                variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button 
                type="submit"
                disabled={loading}
                >
                    { loading ? 'Guardando...' : 'Guardar' }
                </Button>
            </div>
        </form>
    )
}