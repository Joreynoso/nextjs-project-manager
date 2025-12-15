import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function ProjectCard() {

    const members = [
        { name: "Jane Smith", avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png", fallback: "JS" },
        { name: "Mike Johnson", avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png", fallback: "MJ" },
        { name: "Sarah Williams", avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png", fallback: "SW" },
        { name: "Tom Brown", avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png", fallback: "TB" },
    ]

    const maxDisplayMembers = 3
    const displayMembers = members.slice(0, maxDisplayMembers)
    const remainingCount = members.length - maxDisplayMembers

    return (
        <div className='bg-card text-card-foreground border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'>
            {/* Encabezado: tipo de proyecto y fecha */}
            <div className="flex items-center justify-between mb-4">
                <Badge variant="default">Proyecto</Badge>
                <span className="text-sm text-muted-foreground">15/12/2025</span>
            </div>

            {/* Título y descripción */}
            <div className='mb-8'>
                <h2 className='text-xl font-semibold mb-2'>Plataforma de E-learning</h2>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                    Proyecto de desarrollo de una plataforma de e-learning para la empresa ABC.
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
                            <p className='text-sm font-medium'>Jhon Doe</p>
                            <p className='text-xs text-muted-foreground'>jhon.doe@gmail.com</p>
                        </div>
                    </div>
                    <Badge size="sm">Owner</Badge>
                </div>

                {/* Members - Avatares apilados */}
                <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {displayMembers.map((member, index) => (
                            <Avatar
                                key={index}
                                className='size-10 ring-2 ring-background transition-transform hover:scale-110 hover:z-10'
                            >
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.fallback}</AvatarFallback>
                            </Avatar>
                        ))}

                        {remainingCount > 0 && (
                            <div className='size-10 rounded-full bg-muted ring-2 ring-background flex items-center justify-center text-xs font-semibold'>
                                +{remainingCount}
                            </div>
                        )}
                    </div>
                    
                    <Badge variant="secondary" size="sm">
                        {members.length} {members.length === 1 ? 'Member' : 'Members'}
                    </Badge>
                </div>
            </div>
        </div>
    )
}