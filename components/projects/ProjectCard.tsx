import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getInitials } from '@/lib/utils'
import { ProjectWithMembers } from '@/types/projects'

// toopTip
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ProjectCard({ project }: { project: ProjectWithMembers }) {

    return (
        <div className='bg-card text-card-foreground border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'>
            {/* Encabezado: tipo de proyecto y fecha */}
            <div className="flex items-center justify-between mb-4">
                <Badge variant="default">{project.tag}</Badge>
                <span className="text-sm text-muted-foreground">{project.createdAt.toDateString()}</span>
            </div>

            {/* Título y descripción */}
            <div className='mb-8'>
                <h2 className='text-xl font-semibold mb-2'>{project.name}</h2>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                    {project.description}
                </p>
            </div>

            {/* Sección de miembros */}
            <div className='flex flex-col gap-5 mb-8'>
                {/* Owner */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className='size-10'>
                            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png" alt="Owner" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <p className='text-sm font-medium'>{project.creator.name}</p>
                            <p className='text-xs text-muted-foreground'>{project.creator.email}</p>
                        </div>
                    </div>
                    <Badge>Owner</Badge>
                </div>

                {/* Members - Avatares apilados */}
                <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {project.members.map((member, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Avatar className='size-10 ring-2 ring-background transition-transform hover:scale-110 hover:z-10 cursor-pointer'>
                                        <AvatarImage src={member.user.image || ''} alt={member.user.name} />
                                        <AvatarFallback>{getInitials(member.user.name)}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{member.user.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}

                        {project.members.length > 0 && (
                            <div className='size-10 rounded-full bg-muted ring-2 ring-background flex items-center justify-center text-xs font-semibold'>
                                +{project.members.length}
                            </div>
                        )}
                    </div>

                    <Badge variant="secondary">
                        {project.members.length} {project.members.length === 1 ? 'Member' : 'Members'}
                    </Badge>
                </div>
            </div>
        </div>
    )
}