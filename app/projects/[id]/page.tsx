import { getProjectById } from '@/actions/projects'
import ProjectTasks from '@/components/projects/ProjectTasks'
import ProjectChatWrapper from '@/components/projects/ProjectChatWrapper'

// import breacumb
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbLink
}
    from '@/components/ui/breadcrumb'
import { getInitials } from '@/lib/utils'

// import tooltip
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,

} from "@/components/ui/tooltip"

import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
    params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: Props) {

    const { id } = await params

    // fetch project
    const project = await getProjectById(id)

    // extraer el owner
    const owner = project?.creator || null

    // extraer los miembros
    const members = project?.members || []

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

            <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>

                {/* Card de Descripción */}
                <div className='lg:col-span-2 bg-linear-to-br from-card via-card to-muted/20 border border-border/50 rounded-xl p-5'>
                    <h1 className='text-xl font-bold text-foreground mb-2'>{project?.name}</h1>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                        {project?.description || 'Sin descripción disponible'}
                    </p>
                </div>

                {/* Card de Team */}
                <div className='bg-linear-to-br from-card via-card to-muted/20 border border-border/50 rounded-xl p-5'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-sm font-semibold text-foreground'>Equipo</h2>
                        <Badge variant="secondary" className='text-xs'>
                            {members.length + 1}
                        </Badge>
                    </div>

                    {/* Avatares */}
                    <div className='flex flex-wrap gap-2'>
                        {/* Owner */}
                        {owner && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Avatar className='h-11 w-11 ring-2 ring-primary cursor-pointer hover:scale-110 transition-all'>
                                        <AvatarImage src={owner.image ?? undefined} />
                                        <AvatarFallback className="text-xs font-bold bg-primary text-primary-foreground">
                                            {getInitials(owner.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{owner.name}</p>
                                    <p>Owner</p>
                                </TooltipContent>
                            </Tooltip>
                        )}

                        {/* Members */}
                        {members.map((member) => (
                            <Tooltip key={member.user.id}>
                                <TooltipTrigger asChild>
                                    <Avatar className='h-11 w-11 ring-2 ring-background cursor-pointer hover:scale-110 hover:ring-primary/30 transition-all'>
                                        <AvatarImage src={member.user.image ?? undefined} />
                                        <AvatarFallback className="text-xs font-medium bg-muted">
                                            {getInitials(member.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{member.user.name}</p>
                                    <p>{member.user.email}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </div>

            </div>

            {/* lista de tareas del proyecto deberia ir aqui */}
            <ProjectTasks projectId={id} projectName={project?.name ?? ''} tasks={project?.tasks ?? []} />

            {/* Chat del proyecto */}
            <ProjectChatWrapper projectName={project?.name ?? 'Proyecto'} />
        </div>
    )
}