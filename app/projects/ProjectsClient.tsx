'use client'

import ProjectDialog from '@/components/projects/ProjectDialog'
import ProjectsList from '@/components/projects/ProjectsList'
import ProjectEmpty from '@/components/projects/ProjectEmpty'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useProjectsDialog, ProjectsProvider } from '@/app/projects/context/ProjectContext'

// Componente interno que usa el contexto
function ProjectsContent({ users, projects }: { users: any, projects: any }) {
    const { openCreateDialog } = useProjectsDialog()

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">

                {/* Botón para crear nuevo proyecto */}
                <Button onClick={openCreateDialog} className='w-full sm:w-auto'>
                    <Plus className='mr-2 h-4 w-4' />
                    Agregar nuevo proyecto
                </Button>
            </div>

            {/* Lista de proyectos o estado vacío */}
            {projects.length > 0 ? (
                <ProjectsList projects={projects} />
            ) : (
                <ProjectEmpty />
            )}

            {/* Dialog único que se controla desde el contexto */}
            <ProjectDialog users={users} />
        </div>
    )
}

// Componente wrapper con el Provider
export default function ProjectsClient({ users, projects }: { users: any, projects: any }) {
    return (
        <ProjectsProvider>
            <ProjectsContent users={users} projects={projects} />
        </ProjectsProvider>
    )
}