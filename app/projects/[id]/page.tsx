// import breacumb
import { getProjectById } from '@/actions/projects'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbLink
}
    from '@/components/ui/breadcrumb'

type Props = {
    params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: Props) {

    const { id } = await params

    // fetch project
    const project = await getProjectById(id)

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
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Proyecto</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Page Header: Title, Description */}
            <div className='flex flex-col gap-y-2 mb-5'>
                <p className='text-base text-muted-foreground leading-relaxed'>
                    Detalles del proyecto y su titulo, deberia ir aqui.
                </p>
            </div>

            {/* Page Content */}
            <div className='bg-card p-5 rounded-lg card flex flex-col gap-y-5'>

                <p>{project?.name}</p>
                <p>{project?.description}</p>
                <p>{project?.tag}</p>
                <p>{project?.deadline?.toDateString()}</p>

                {project?.members.map((member) => (
                    <p key={member.id}>{member.user.name}</p>
                ))}
            </div>

            {/* lista de tareas del proyecto deberia ir aqui */}

        </div>
    )
}