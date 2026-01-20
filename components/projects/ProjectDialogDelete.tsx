
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

type ProjectDialogDeleteProps = {
    onConfirm: () => Promise<void>
    open: boolean;
    isDeleting?: boolean
    onClose: () => void
}

export default function ProjectDialogDelete({ open, onConfirm, isDeleting, onClose }: ProjectDialogDeleteProps) {

    // prevenir que se cierre al hacer click fuera del dialog
    if (!open) return null;

    // render return
    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5'>
            <motion.div
                // efecto de aparecer suavemente
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className='bg-card border border-border p-6 rounded-lg shadow-lg'>
                <h2 className='text-lg font-semibold mb-4'>Eliminar proyecto</h2>
                <p className='mb-4'>¿Estás seguro de que quieres eliminar este proyecto?</p>
                <div className='flex justify-end gap-2'>
                    {/* cancelar */}
                    <Button
                        variant='outline'
                        onClick={onClose}
                        disabled={isDeleting}>
                        Cancelar
                    </Button>

                    {/* eliminar */}
                    <Button
                        onClick={() => { onConfirm() }}
                        disabled={isDeleting}>
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}