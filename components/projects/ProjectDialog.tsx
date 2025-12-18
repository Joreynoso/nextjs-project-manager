'use client' // ← IMPORTANTE: Agregar esto al inicio

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

// Importar tu formulario
import ProjectForm from './ProjectForm'

export default function ProjectDialog({ users }: { users: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-full sm:w-auto'>
                    <Plus className='mr-2 h-4 w-4' />
                    Agregar nuevo proyecto
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar nuevo proyecto</DialogTitle>
                    <DialogDescription>
                        Ingrese los datos del nuevo proyecto
                    </DialogDescription>
                </DialogHeader>

                {/* 👇 AQUÍ VA TU FORMULARIO 👇 */}
                <ProjectForm onSubmit={() => { }} users={users} />
            </DialogContent>
        </Dialog>
    )
}