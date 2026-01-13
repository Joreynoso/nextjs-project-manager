'use client'

// import tooltip
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,

} from "@/components/ui/tooltip"

// import dropdown menu
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

// otros imports
import { deleteProject } from '@/actions/projects'
import { Button } from '../ui/button'
import { EllipsisVertical, Calendar } from 'lucide-react'
import { formatDateString } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getInitials } from '@/lib/utils'
import { ProjectWithMembers } from '@/types/projects'
import { toast } from 'sonner'
import { useProjectsDialog } from '@/app/projects/context/ProjectContext'
import Link from 'next/link'
import { useState } from 'react'
import ProjectDialogDelete from './ProjectDialogDelete'

export default function ProjectCard({ project }: { project: ProjectWithMembers }) {

    // Estado para abrir el dialog de eliminación
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    // Usar el contexto para abrir el dialog de edición
    const { openEditDialog } = useProjectsDialog()

    // Handle delete project
    const handleDeleteProject = async () => {
        setIsDeleting(true)
        try {
                const result = await deleteProject(project.id)
                if (result.success) {
                    toast.success('Proyecto eliminado correctamente')
                } else {
                    toast.error(result.error)
                }
            } catch (error) {
                toast.error('Ocurrió un error inesperado al intentar eliminar el proyecto')
            }
        setIsDeleting(false)
    }

    // render return
    return (
        <div className='bg-linear-to-br from-card via-card to-muted/20 border-border/50 text-card-foreground border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20'>

            {/* Header: Tag, Fecha y Acciones */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex flex-col gap-2">
                    <Badge variant="default" className="w-fit">
                        {project.tag}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDateString(project.createdAt)}</span>
                    </div>
                </div>

                {/* Dropdown de acciones */}
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                            className="cursor-pointer"
                        >
                            <Link href={`/projects/${project.id}`}>Ver proyecto</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => openEditDialog(project)}
                            className="cursor-pointer"
                        >
                            Editar proyecto
                        </DropdownMenuItem>

                        {/* Deberia ejecutar un dialog con Aceptar y Cancelar */}
                        <DropdownMenuItem
                            onClick={() => setOpenDeleteDialog(true)}
                            className="cursor-pointer"
                        >
                            Eliminar proyecto
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <ProjectDialogDelete
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDeleteProject}
                isDeleting={isDeleting}
            />

            {/* Título y descripción */}
            <div className='mb-6 space-y-2'>
                <h2 className='text-2xl font-semibold tracking-tight leading-tight'>
                    {project.name}
                </h2>
                <p className='text-sm text-muted-foreground leading-relaxed line-clamp-2'>
                    {project.description || 'Sin descripción'}
                </p>
            </div>

            {/* Divider */}
            <div className="border-t my-6" />

            {/* Sección de miembros */}
            <div className='space-y-4'>
                {/* Owner */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Avatar className='h-10 w-10 shrink-0'>
                            <AvatarImage src={project.creator.image ?? undefined} />
                            <AvatarFallback className="text-xs font-medium">
                                {getInitials(project.creator.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col min-w-0 flex-1">
                            <p className='text-sm font-semibold truncate'>
                                {project.creator.name}
                            </p>
                            <p className='text-xs text-muted-foreground truncate'>
                                {project.creator.email}
                            </p>
                        </div>
                    </div>
                    <Badge variant="default" className="ml-2 shrink-0">
                        Owner
                    </Badge>
                </div>

                {/* Members - Avatares apilados */}
                {project.members.length > 0 && (
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            {project.members.slice(0, 4).map((member, index) => (
                                <Tooltip key={member.user.id}>
                                    <TooltipTrigger asChild>
                                        <Avatar className='h-9 w-9 ring-2 ring-background transition-transform hover:scale-110 hover:z-10 cursor-pointer'>
                                            <AvatarImage src={member.user.image ?? undefined} />
                                            <AvatarFallback className="text-xs">
                                                {getInitials(member.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p className="text-xs font-medium">{member.user.name}</p>
                                        <p className="text-xs">{member.user.email}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}

                            {project.members.length > 4 && (
                                <div className='h-9 w-9 rounded-full bg-muted ring-2 ring-background flex items-center justify-center text-xs font-semibold'>
                                    +{project.members.length - 4}
                                </div>
                            )}
                        </div>

                        <Badge variant="secondary" className="ml-2 shrink-0">
                            {project.members.length} {project.members.length === 1 ? 'Member' : 'Members'}
                        </Badge>
                    </div>
                )}
            </div>
        </div>
    )
}