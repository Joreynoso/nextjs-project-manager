'use client' // ← IMPORTANTE: Agregar esto al inicio

// import dialog
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
}
    from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

// Importar tu formulario
import ProjectForm from './ProjectForm'
import { useState } from "react"

export default function ProjectDialog({ users }: { users: any }) {

    // estados
    const [onCancel, setOnCancel] = useState(false)

    // handle close
    const handleClose = () => {
        setOnCancel(!onCancel)
    }

    return (
        <Dialog open={onCancel} onOpenChange={handleClose}>
            <DialogTrigger asChild>
                <Button className='w-full sm:w-auto'>
                    <Plus className='mr-2 h-4 w-4' />
                    Agregar nuevo proyecto
                </Button>
            </DialogTrigger>

            {/* dialog content */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar nuevo proyecto</DialogTitle>
                    <DialogDescription>
                        Ingrese los datos del nuevo proyecto
                    </DialogDescription>
                </DialogHeader>

                {/* form */}
                <ProjectForm users={users} onCancel={handleClose} />
            </DialogContent>
        </Dialog>
    )
}