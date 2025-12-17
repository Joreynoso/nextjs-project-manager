// imports
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getProjects } from '@/actions/projects';

// import components
import ProjectsList from '@/components/projects/ProjectsList';

// main component
export default async function ProjectsPage() {

    // obtener proyectos desde sv-actions
    const projects = await getProjects()

    // render return    
    return (
        <div className='w-full min-h-[calc(100vh-4rem)] mx-auto flex flex-col py-5 pb-10 max-w-7xl'>

            {/* breadcrumb */}
            <Breadcrumb className='mb-6'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Page Header: Title, Description */}
            <div className='flex flex-col gap-y-2 mb-6'>
                <p className='text-base text-muted-foreground leading-relaxed'>
                    Administra todos tus proyectos desde aquí. Crea nuevos, edita los existentes y organiza tu trabajo de manera eficiente.
                </p>
            </div>

            {/* Actions: Search and Add Project */}
            <div className='w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8'>
                <Input
                    placeholder="Buscar proyecto..."
                    className='w-full'
                />
                <Button className='w-full sm:w-auto'>
                    <Plus className='mr-2 h-4 w-4' />
                    Agregar nuevo proyecto
                </Button>
            </div>

            {/* lista de proyectos */}
            {projects.length === 0 ? (
                <div className='w-full h-full flex items-center justify-center'>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        Oops! parece que aún no has creado tu primer proyecto o tampoco formas parte de ninguno.
                    </p>
                </div>
            ) : (
                <ProjectsList projects={projects}/>
            )}
        </div>
    )
}