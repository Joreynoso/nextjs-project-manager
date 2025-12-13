'use client'
import { Button } from '@/components/ui/button'
import { useSession } from '@/lib/auth-client'
import { LockKeyhole, MailCheck } from 'lucide-react'
import type { User } from '@/types/user'

import DateFormatter from '@/lib/dateformatter'
import Link from 'next/link'

import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export default function ProfilePage() {

    const { data: session } = useSession()

    // si no hay session, redirige a login
    if (!session) {
        return null
    }

    const { user }: { user: User } = session

    // funcion para validar el email
    const handleEmailValidation = async () => {
        const result =await authClient.sendVerificationEmail({
            email: user.email,
            callbackURL: "/"   // o a donde quieras redirigir tras verificar
        })

        if(result.error){
            console.log(result.error)
            toast.error(result.error.message || 'Error al validar el email')
        }else{
            toast.success('Email enviado correctamente, verifica tu casilla de correo')
        }
    }

    return (
        <div className='flex flex-col mt-20 items-center justify-center font-sans bg-background'>
            <div className='flex flex-col gap-4 w-full max-w-md bg-card border border-border p-6 rounded-lg shadow-sm'>

                <div>
                    <h2 className='text-xl font-semibold mb-2 tracking-tight'>Perfil</h2>
                    <p className='text-sm text-muted-foreground tracking-tight'>Información del usuario</p>
                </div>

                <hr className='my-2' />

                <div className='flex flex-col gap-2'>
                    <Item label="Nombre" value={user.name} />
                    <Item label="Correo" value={user.email} />
                    <Item label="Creado" value={DateFormatter(user.createdAt)} />
                    <Item label="Actualizado" value={DateFormatter(user.updatedAt)} />
                    <Item label="Verificado" value={user.emailVerified ? 'Sí' : 'No'} />
                    <Item label="Role" value={user.role} />

                    {!user.emailVerified && (
                        <Button className='mt-4 w-full cursor-pointer' onClick={handleEmailValidation}>
                            <MailCheck className='mr-2 h-4 w-4' />
                            Validar Email
                        </Button>
                    )}

                    {/* botón de olvide mi contraseña */}
                    <Link href='/auth/forgot-password'>
                        <Button variant={'secondary'} className='mt-4 w-full cursor-pointer' type='submit'>
                            <LockKeyhole className='mr-2 h-4 w-4' />
                            Olvide mi contraseña
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

function Item({ label, value }: { label: string; value: string | undefined }) {
    return (
        <div className='flex gap-3 items-center py-1'>
            <span className='text-sm text-muted-foreground'>{label}:</span>
            <span className='text-sm font-medium'>{value || 'N/A'}</span>
        </div>
    )
}
