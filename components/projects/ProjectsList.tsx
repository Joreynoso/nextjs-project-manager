import ProjectCard from './ProjectCard'
import { ProjectWithMembers } from '@/types/projects'

export default function ProjectsList({ projects }: { projects: ProjectWithMembers[] }) {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}