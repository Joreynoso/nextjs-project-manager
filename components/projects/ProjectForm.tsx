'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'sonner'
import { useState } from 'react'
import { X } from 'lucide-react'
import { createProject, updateProject } from '@/actions/projects'
import { ProjectWithMembers } from '@/types/projects'

type FormProjectProps = {
    users: any
    onCancel: () => void
    project?: ProjectWithMembers | null // ← Acepta ProjectWithMembers del contexto
}

export default function ProjectForm({ users, onCancel, project = null }: FormProjectProps) {
    const [loading, setLoading] = useState(false)

    // ← Extraer IDs de miembros si el proyecto tiene members como objetos
    const getMemberIds = () => {
        if (!project?.members) return []
        // Si members es un array de objetos con userId, extraer los IDs
        if (project.members.length > 0 && typeof project.members[0] === 'object') {
            return project.members.map((m: any) => m.userId)
        }
        // Si ya son strings, devolverlos tal cual
        return project.members as unknown as string[]
    }

    // ← Pre-llenar datos si existe proyecto
    const [formData, setFormData] = useState({
        name: project?.name || '',
        tag: project?.tag || '',
        description: project?.description || '',
        members: getMemberIds()
    })

    const [selectKey, setSelectKey] = useState(0)

    const handleAddMember = (userId: string) => {
        if (!formData.members.includes(userId)) {
            setFormData({
                ...formData,
                members: [...formData.members, userId]
            })
            setSelectKey(prev => prev + 1)
        }
    }

    const handleRemoveMember = (userId: string) => {
        setFormData({
            ...formData,
            members: formData.members.filter(id => id !== userId)
        })
    }

    const getUserById = (userId: string) => {
        return users.find((user: any) => user.id === userId)
    }

    const availableUsers = users.filter((user: any) => !formData.members.includes(user.id))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (project) {
                // ← MODO EDITAR
                const result = await updateProject(project.id, formData)
                if (!result) {
                    toast.error('Error al actualizar el proyecto')
                    return
                }
                toast.success('Proyecto actualizado exitosamente')
            } else {
                // ← MODO CREAR
                const result = await createProject(formData)
                if (!result) {
                    toast.error('Error al crear el proyecto')
                    return
                }
                toast.success('Proyecto creado exitosamente')
            }

            onCancel()
        } catch (error) {
            toast.error(project ? 'Error al actualizar el proyecto' : 'Error al crear el proyecto')
        } finally {
            setLoading(false)
        }
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
                    value={formData.name} // ← importante para pre-llenar
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
                    value={formData.tag} // ← importante para pre-llenar
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
                    value={formData.description} // ← importante para pre-llenar
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            {/* Miembros */}
            <div className='flex flex-col gap-2'>
                <Label htmlFor="members" className='font-semibold'>
                    Miembros ({formData.members.length})
                </Label>

                <Select
                    key={selectKey}
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
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : project ? 'Actualizar' : 'Crear'}
                </Button>
            </div>
        </form>
    )
}