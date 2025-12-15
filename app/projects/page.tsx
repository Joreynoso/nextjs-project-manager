import ProjectsList from '@/components/projects/ProjectsList';

export default function ProjectsPage() {

    // render return
    return (
        <div className='w-full min-h-[calc(100vh-4rem)] mx-auto flex flex-col px-5  py-10'>
            <div className='flex flex-col mb-10'>
                <p className='text-base text-muted-foreground leading-relaxed'>
                    Administra todos tus proyectos desde aquí. Crea nuevos, edita los existentes y organiza tu trabajo de manera eficiente.
                </p>
            </div>

            {/* lista de proyectos */}
            <ProjectsList />
        </div>
    )
}