'use client'

import type { Task } from '@/types/tasks'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { PlusIcon } from 'lucide-react'
import { formatDateString } from '@/lib/utils'
import { NewTaskCard } from '../tasks/NewTask'
import { useState } from 'react'
import TaskCard from '../tasks/TaskCard'

interface ProjectTasksProps {
    id?: string
    tasks?: Task[]  // ← Agregar ?
}

// tener en cuenta que taskts puede venir vacio
export default function ProjectTasks({ id, tasks = [] }: ProjectTasksProps) {

    const [showNewTask, setShowNewTask] = useState(false)

    const handleSaveTask = (data: { title: string; description: string }) => {
        console.log('Nueva tarea:', data)
        // Aquí haremos el POST a la API (siguiente paso)
        setShowNewTask(false)
    }

    // filtrar por tipo de estado
    const pendingTasks = tasks.filter(task => task.status === 'pending')
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress')
    const doneTasks = tasks.filter(task => task.status === 'done')

    // renderizar tareas
    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>

            {/* tareas pendientes */}
            <div className='bg-muted w-full min-h-[600px] rounded-lg p-5 mb-4'>

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
                        onCancel={() => setShowNewTask(false)}
                        onSave={handleSaveTask}
                    />
                )}

                {/* lista de tareas pendientes */}
                <div className='w-full mt-5'>
                    {pendingTasks.map(task => (
                        <>
                            <TaskCard
                                task={task} />
                        </>
                    ))}
                </div>
            </div>

            {/* tareas en progreso */}
            <div className='bg-muted w-full min-h-[600px] rounded-lg p-5 mb-4'>

                {/* titulo, cantidad de tareas y boton de crear tarea */}
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-base font-semibold'>En progreso</p>
                        <Badge className='h-6 w-6 text-xs rounded-full flex justify-center items-center'>{inProgressTasks.length}</Badge>
                    </div>
                </div>
            </div>

            {/* tareas completadas */}
            <div className='bg-muted w-full min-h-[600px] rounded-lg p-5 mb-4'>

                {/* titulo, cantidad de tareas y boton de crear tarea */}
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-base font-semibold'>Completadas</p>
                        <Badge className='h-6 w-6 text-xs rounded-full flex justify-center items-center'>{doneTasks.length}</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}
