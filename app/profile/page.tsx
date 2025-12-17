'use client'

import { Button } from '@/components/ui/button'
import { LockKeyhole, MailCheck } from 'lucide-react'
import { toast } from 'sonner'
import DateFormatter from '@/lib/dateformatter'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import type { User } from '@/types/user'
import { useSession } from '@/lib/auth-client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'


export default function ProfilePage() {

    const { data: session } = useSession()

    if (!session) {
        redirect('/auth/login')
    }

    const { user }: { user: User } = session

    const handleEmailValidation = async () => {
        const result = await authClient.sendVerificationEmail({
            email: user.email,
            callbackURL: "/"   // o a donde quieras redirigir tras verificar
        })

        if (result.error) {
            console.log(result.error)
            toast.error(result.error.message || 'Error al validar el email')
        } else {
            toast.success('Email enviado correctamente, verifica tu casilla de correo')
        }
    }

    return (
        <div className='w-full min-h-[calc(100vh-4rem)] mx-auto flex flex-col py-5'>
            <Breadcrumb className='mb-5'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Mi Perfil</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex flex-col mb-5'>
                <p className='text-base text-muted-foreground leading-relaxed'>
                    Administra tu información personal y seguridad.
                </p>
            </div>

            <div className='max-w-md w-full flex flex-col gap-4 bg-card border border-border p-6 rounded-lg shadow-sm'>

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
                        <Button variant={'secondary'} className=' mt-4 w-full cursor-pointer' type='submit'>
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
