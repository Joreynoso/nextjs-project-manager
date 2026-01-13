import { FolderKanban, User, SquareCheckBig, TrendingUp, MessageSquare, Sparkles } from 'lucide-react'

export const features = [
    {
        id: 1,
        icon: FolderKanban,
        title: 'Gestión de proyectos',
        description: 'Creá y organizá proyectos en un solo lugar, con estructura clara, objetivos definidos y control total desde el inicio'
    },
    {
        id: 2,
        icon: User,
        title: 'Miembros y roles',
        description: 'Organiza y gestiona los miembros de tu equipo, asignando roles y permisos para que cada uno tenga acceso a las herramientas y funcionalidades que necesita'
    },
    {
        id: 3,
        icon: SquareCheckBig,
        title: 'Gestión de tareas',
        description: 'Organiza y gestiona los miembros de tu equipo, asignando roles y permisos para que cada uno tenga acceso a las herramientas y funcionalidades que necesita'
    },
    {
        id: 4,
        icon: TrendingUp,
        title: 'Seguimiento de progreso',
        description: 'Visualizá el estado de cada tarea y proyecto en tiempo real, detectando bloqueos y avances sin esfuerzo.'
    },
    {
        id: 5,
        icon: MessageSquare,
        title: 'Colaboración en tiempo real',
        description: 'Compartí ideas, asigná tareas y colaborá en tiempo real, manteniendo la comunicación fluida y el progreso constante.'
    },
    {
        id: 6,
        icon: Sparkles,
        title: 'Asistencia con IA (Grok)',
        description: 'Generá y mejorá descripciones de tareas con ayuda de IA para ahorrar tiempo y ganar claridad.'
    }
]


export default function CardsHome() {

    // render return
    return (
        <div className='container mx-auto mt-10 mb-20'>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                        <div
                            key={feature.id}
                            className='bg-linear-to-br from-card via-card to-muted/20 border border-border/50 p-8 rounded-2xl text-center flex flex-col justify-center items-center hover:bg-secondary transition-colors duration-300 ease-in-out'
                        >
                            <div className='aspect-square w-12 h-12 mx-auto bg-muted rounded-full flex justify-center items-center mb-6'>
                                <Icon className='w-6 h-6 text-primary' />
                            </div>
                            <h2 className='text-lg font-semibold mb-2'>{feature.title}</h2>
                            <p className='text-muted-foreground'>{feature.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}