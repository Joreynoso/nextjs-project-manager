// import breadcrumb
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
}
    from '@/components/ui/breadcrumb';

import { Input } from '@/components/ui/input';

// import actions
import { getProjects } from '@/actions/projects';
import { getAllUsers } from '@/actions/users';

// import components
import ProjectsList from '@/components/projects/ProjectsList';
import ProjectDialog from '@/components/projects/ProjectDialog';

export default async function ProjectsPage() {

    // obtener proyectos desde sv-actions
    const projects = await getProjects()

    // obtener usuarios desde sv-actions
    const users = await getAllUsers()

    // render return    
    return (
        <div className='w-full min-h-[calc(100vh-4rem)] mx-auto flex flex-col py-5 pb-10 max-w-7xl'>

            {/* breadcrumb */}
            <Breadcrumb className='mb-5'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Proyectos</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Page Header: Title, Description */}
            <div className='flex flex-col gap-y-2 mb-5'>
                <p className='text-base text-muted-foreground leading-relaxed'>
                    Crear un nuevo proyecto es sencillo y rápido. Solo necesitas proporcionar un nombre y una descripción para comenzar.
                </p>
            </div>

            {/* Actions: Search and Add Project */}
            <div className='w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8'>
                <Input
                    placeholder="Buscar proyecto..."
                    className='w-full'
                />

                {/* Boton para agregar nuevo proyecto, debe ser un client component */}

                <ProjectDialog users={users}/>
            </div>

            {/* lista de proyectos */}
            {projects.length === 0 ? (
                <div className='w-full h-full flex items-center justify-center'>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        Oops! parece que aún no has creado tu primer proyecto o tampoco formas parte de ninguno.
                    </p>
                </div>
            ) : (
                <ProjectsList projects={projects} />
            )}
        </div>
    )
}