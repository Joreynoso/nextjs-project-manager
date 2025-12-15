import ProjectsList from '@/components/projects/ProjectsList';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import auth from '@/lib/auth';

// fetch projects
async function getProjects() {
    const res = await fetch('http://localhost:3000/api/projects');
    const projects = await res.json();
    return projects;
}

export default async function ProjectsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        redirect("/auth/login")
    }

    // fetch projects
    const projects = await getProjects();

    console.log(projects);

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