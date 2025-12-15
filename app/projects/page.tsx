import ProjectsList from '@/components/projects/ProjectsList';

export default function ProjectsPage() {

    // render return
    return (
        <div className='w-full min-h-[calc(100vh-4rem)] mx-auto flex flex-col py-8 px-5'>
            <div className='flex flex-col mb-6'>
                <p className='text-base text-muted-foreground'>Gestiona tus proyectos aquí</p>
            </div>

            {/* lista de proyectos */}
            <ProjectsList />
        </div>
    )
}