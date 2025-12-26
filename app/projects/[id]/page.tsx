// import breacumb
import { getProjectById } from '@/actions/projects'
import ProjectTasks from '@/components/projects/ProjectTasks'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbLink
}
    from '@/components/ui/breadcrumb'
import UsersAvatars from '@/components/users/UsersAvatars'

type Props = {
    params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: Props) {

    const { id } = await params

    // fetch project
    const project = await getProjectById(id)

    // extract user objects from project members
    const members = project?.members.map(member => member.user) || []

    // fetch tasks
    console.log('proyecto desde actions server', project)

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
                        <BreadcrumbLink href="/projects">Proyectos</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className='max-w-[150px] truncate'>{project?.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Page Header: Title, Description */}
            <div className='flex flex-col gap-y-2 mb-5'>
                <p className='text-base text-muted-foreground leading-relaxed'>
                    {project?.description}
                </p>
                {/* aqui debe ir la lista de miembros */}
            </div>

            {/* lista de tareas del proyecto deberia ir aqui */}
            <ProjectTasks tasks={project?.tasks} />

        </div>
    )
}