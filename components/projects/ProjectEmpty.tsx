import { FolderOpen, Plus } from 'lucide-react';

export default function ProjectEmpty() {

    // render return
    return (
        <div className='w-full bg-card rounded-xl border border-dashed border-muted-foreground/30 min-h-[280px] flex flex-col items-center justify-center gap-4 p-8'>
            <div className="rounded-full bg-secondary p-4">
                <FolderOpen className="h-10 w-10 text-muted-foreground/60" />
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                    No hay proyectos
                </h3>
                <p className='text-sm text-muted-foreground max-w-sm'>
                    Aún no has creado tu primer proyecto o no formas parte de ninguno.
                </p>
            </div>
        </div>
    )
}