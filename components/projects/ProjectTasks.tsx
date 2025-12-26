'use client'

import type { Task } from '@/types/tasks'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { PlusIcon } from 'lucide-react'

interface ProjectTasksProps {
    tasks?: Task[]  // ← Agregar ?
}

// tener en cuenta que taskts puede venir vacio
export default function ProjectTasks({ tasks = [] }: ProjectTasksProps) {

    // renderizar tareas
    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>

            {/* tareas pendientes */}
            <div className='bg-muted w-full min-h-[600px] rounded-lg p-5 mb-4'>

                {/* titulo, cantidad de tareas y boton de crear tarea */}
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-base font-semibold'>Tareas Pendientes</p>
                        <Badge className='h-6 w-6 text-xs rounded-full flex justify-center items-center'>{tasks.length}</Badge>
                    </div>

                    {/* agregar una nueva tarea  */}
                    <Button variant='secondary' size='icon' className='h-6 w-6 rounded-full cursor-pointer'>
                        <PlusIcon className='w-4 h-4' />
                    </Button>
                </div>
            </div>

            {/* tareas en progreso */}
            <div className='bg-muted w-full min-h-[600px] rounded-lg p-5 mb-4'>

                {/* titulo, cantidad de tareas y boton de crear tarea */}
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-base font-semibold'>En progreso</p>
                        <Badge className='h-6 w-6 text-xs rounded-full flex justify-center items-center'>{tasks.length}</Badge>
                    </div>
                </div>
            </div>

            {/* tareas completadas */}
            <div className='bg-muted w-full min-h-[600px] rounded-lg p-5 mb-4'>

                {/* titulo, cantidad de tareas y boton de crear tarea */}
                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-base font-semibold'>Completadas</p>
                        <Badge className='h-6 w-6 text-xs rounded-full flex justify-center items-center'>{tasks.length}</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}
