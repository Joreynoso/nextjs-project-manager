'use client'

import type { Task } from '@/types/tasks'

interface ProjectTasksProps {
    tasks: Task[]
}

export default function ProjectTasks({ tasks }: ProjectTasksProps) {

    // renderizar tareas
    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5'>
            
            {/* lista de tareas pendientes */}
            <div className='w-full mb-5 col-span-2'>
                <p className='text-base font-semibold mb-2'>Tareas Pendientes</p>
                <div className='flex flex-col gap-y-2'>
                    {tasks.map((task) => (
                        <div key={task.id} className='flex items-center justify-between gap-x-2'>
                            <p className='text-sm'>{task.title}</p>
                            <p className='text-xs text-muted-foreground'>{task.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* lista de tareas pendientes */}
            <div className='w-full mb-5'>
                <p className='text-base font-semibold mb-2'>Tareas Pendientes</p>
                <div className='flex flex-col gap-y-2'>
                    {tasks.map((task) => (
                        <div key={task.id} className='flex items-center justify-between gap-x-2'>
                            <p className='text-sm'>{task.title}</p>
                            <p className='text-xs text-muted-foreground'>{task.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* lista de tareas pendientes */}
            <div className='w-full mb-5'>
                <p className='text-base font-semibold mb-2'>Tareas Pendientes</p>
                <div className='flex flex-col gap-y-2'>
                    {tasks.map((task) => (
                        <div key={task.id} className='flex items-center justify-between gap-x-2'>
                            <p className='text-sm'>{task.title}</p>
                            <p className='text-xs text-muted-foreground'>{task.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
