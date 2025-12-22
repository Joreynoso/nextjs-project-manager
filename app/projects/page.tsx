// import breadcrumb
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
}
    from '@/components/ui/breadcrumb'

// import actions
import { getProjects } from '@/actions/projects'
import { getAllUsers } from '@/actions/users'

// import client component
import ProjectsClient from './ProjectsClient'

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

            {/* Todo el contenido client con el Provider */}
            <ProjectsClient users={users} projects={projects} />
        </div>
    )
}