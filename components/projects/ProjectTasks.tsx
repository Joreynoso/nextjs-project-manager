'use client'

import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { PlusIcon } from 'lucide-react'
import { NewTaskCard } from '../tasks/NewTask'
import { useState } from 'react'
import TaskCard from '../tasks/TaskCard'
import { useRouter } from 'next/navigation'
import type { Task } from '@/types/tasks'

interface ProjectTasksProps {
    projectId: string
    projectName: string
    tasks?: Task[]  // ← Agregar ?
}

// tener en cuenta que taskts puede venir vacio
export default function ProjectTasks({ projectId, projectName, tasks = [] }: ProjectTasksProps) {

    // estado para mostrar el formulario de nueva tarea
    const [showNewTask, setShowNewTask] = useState(false)

    // estado para mostrar el formulario de nueva tarea
    const [localTasks, setLocalTasks] = useState<Task[]>(tasks)

    const router = useRouter()

    const handleSaveTask = async (newTask: Task) => {
        // Actualización optimista (inmediata)
        setLocalTasks([...localTasks, newTask])
        setShowNewTask(false)

        // Revalidar en segundo plano para estar seguro
        router.refresh()
    }

    // filtrar por tipo de estado
    const pendingTasks = tasks.filter(task => task.status === 'pending')
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress')
    const doneTasks = tasks.filter(task => task.status === 'completed')

    // renderizar tareas
    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>

            {/* tareas pendientes */}
            <div className='w-full bg-muted h-auto sm:min-h-[750px] rounded-lg p-3'>

                {/* titulo, cantidad de tareas y boton de crear tarea */}
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-base font-semibold'>Tareas Pendientes</p>
                        <Badge className='h-6 w-6 text-xs rounded-full flex justify-center items-center'>{pendingTasks.length}</Badge>
                    </div>

                    {/* agregar una nueva tarea  */}
                    <Button
                        onClick={() => setShowNewTask(true)}
                        variant='secondary' size='icon' className='h-6 w-6 rounded-full cursor-pointer'>
                        <PlusIcon className='w-4 h-4' />
                    </Button>
                </div>

                {/* formulario de nueva tarea */}
                {showNewTask && (
                    <NewTaskCard
                        projectId={projectId}
                        projectName={projectName}
                        onCancel={() => setShowNewTask(false)}
                        onSave={handleSaveTask}
                    />
                )}

                {/* lista de tareas pendientes */}
                <div className='w-full mt-5'>
                    {pendingTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task} />
                    ))}
                </div>
            </div>

            {/* tareas en progreso */}
            <div className='bg-muted w-full h-auto sm:min-h-[750px] rounded-lg p-3'>

                {/* titulo, cantidad de tareas y boton de crear tarea */}
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-base font-semibold'>En progreso</p>
                        <Badge className='h-6 w-6 text-xs rounded-full flex justify-center items-center'>{inProgressTasks.length}</Badge>
                    </div>
                </div>

                {/* lista de tareas en progreso */}
                <div className='w-full mt-5'>
                    {inProgressTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task} />
                    ))}
                </div>
            </div>

            {/* tareas completadas */}
            <div className='bg-muted w-full h-auto sm:min-h-[750px] rounded-lg p-3'>

                {/* titulo, cantidad de tareas y boton de crear tarea */}
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-base font-semibold'>Completadas</p>
                        <Badge className='h-6 w-6 text-xs roun  ded-full flex justify-center items-center'>{doneTasks.length}</Badge>
                    </div>
                </div>

                {/* lista de tareas completadas */}
                <div className='w-full mt-5'>
                    {doneTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task} />
                    ))}
                </div>
            </div>
        </div>
    )
}
