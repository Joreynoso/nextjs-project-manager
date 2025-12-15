import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'

export default function ProjectsList() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className='bg-card text-card-foreground border border-border w-full p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200'>

                {/* etiqueta del proyecto y fecha */}
                <div className="flex items-center justify-between mb-4">
                    <Badge variant="default" className="text-sm">Proyecto</Badge>
                    <span className="text-sm text-muted-foreground">15/12/2025</span>
                </div>

                {/* nombre del proyecto y descripción */}
                <div className='w-full mb-8'>
                    <h2 className='text-xl font-semibold mb-2'>Plataforma de E-learning</h2>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                        Proyecto de desarrollo de una plataforma de e-learning para la empresa ABC.
                    </p>
                </div>

                {/* miembros */}
                <div className='w-full flex flex-col gap-5 mb-8'>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            {/* Avatar del propietario */}
                            <Avatar className='w-10 h-10'>
                                <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png" alt="Owner" />
                                <AvatarFallback className="bg-primary/10 text-primary flex items-center justify-center w-full h-full text-xs font-medium">JD</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                                <p className='text-sm font-medium leading-none'>Jhon Doe</p>
                                <p className='text-xs text-muted-foreground'>jhon.doe@gmail.com</p>
                            </div>
                        </div>
                        <Badge variant="default" className="text-xs">Owner</Badge>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            {/* Avatar del miembro */}
                            <Avatar className='w-10 h-10'>
                                <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png" alt="Member" />
                                <AvatarFallback className="bg-primary/10 text-primary flex items-center justify-center w-full h-full text-xs font-medium">JD</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className='text-sm font-medium leading-none'>Jhon Doe</p>
                                <p className='text-xs text-muted-foreground'>jhon.doe@gmail.com</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">Member</Badge>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            {/* Avatar del miembro */}
                            <Avatar className='w-10 h-10'>
                                <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png" alt="Member" />
                                <AvatarFallback className="bg-primary/10 text-primary flex items-center justify-center w-full h-full text-xs font-medium">JD</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className='text-sm font-medium leading-none'>Jhon Doe</p>
                                <p className='text-xs text-muted-foreground'>jhon.doe@gmail.com</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">Member</Badge>
                    </div>
                </div>

                {/* call to action */}
                <div className='w-full flex justify-end'>
                    <Button className='w-full sm:w-auto rounded-full px-6' variant="default">
                        Ver proyecto
                    </Button>
                </div>
            </div>
        </div>
    )
}