'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
}
from "@/components/ui/dialog"

import ProjectForm from './ProjectForm'
import { useProjectsDialog } from '@/app/projects/context/ProjectContext'

export default function ProjectDialog({ users }: { users: any }) {
    // ← Usar el contexto en vez de estado local
    const { isDialogOpen, currentProject, closeDialog } = useProjectsDialog()

    // ← Decidir el título según el modo
    const title = currentProject ? 'Editar proyecto' : 'Agregar nuevo proyecto'
    const description = currentProject 
        ? 'Modifica los datos del proyecto' 
        : 'Ingrese los datos del nuevo proyecto'

    return (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            {/* Ya NO necesitas DialogTrigger aquí, lo abrirás desde otros lados */}
            
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                {/* Pasar el proyecto al formulario */}
                <ProjectForm 
                    users={users} 
                    onCancel={closeDialog}
                    project={currentProject} // ← puede ser null o un proyecto
                />
            </DialogContent>
        </Dialog>
    )
}