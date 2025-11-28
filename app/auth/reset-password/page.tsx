'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    // obtener el token de la url
    const searchParams = useSearchParams()
    const token: string | null = searchParams.get('token')

    // instanciar router
    const router = useRouter()

    // funcion para restablecer la contrseña
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        console.log('handle submitting..', password, passwordConfirmation)

        if (!password || !passwordConfirmation) {
            toast.error('Por favor ingresa una contraseña')
            setLoading(false)
            return
        }

        if (password !== passwordConfirmation) {
            toast.error('Las contraseñas no coinciden')
            setLoading(false)
            return
        }

        if(!token){
            toast.error('Token no encontrado')
            setLoading(false)
            return
        }

        try {
            const result = await authClient.resetPassword({
                newPassword: password,
                token: token
            })

            console.log('result', result)
            toast.success('Contraseña restablecida correctamente')
            router.push('/auth/login')
            setLoading(false)
        } catch (error) {
            console.log('error', error)
            toast.error('Error al restablecer la contraseña')
            setLoading(false)
        }
    }

    // funcion para mostrar u ocultar la contaseña
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    // funcion para mostrar u ocultar la contaseña de confirmacion
    const handleShowPasswordConfirmation = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation)
    }

    // render return
    return (
        <div className='w-full flex items-center justify-center mt-20 bg-background'>
            <div className='w-full max-w-md bg-card border border-border p-6 rounded-lg shadow-sm'>
                {/* titles */}
                <h2 className='text-2xl font-semibold mb-4'>Cambiar contraseña</h2>

                <p className='text-sm text-muted-foreground mb-6 leading-relaxed'>
                    Cambia tu contraseña, elige un nueva contraseña y confirma.
                </p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    {/* password input */}
                    <Label className='font-semibold'>Nueva contraseña</Label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='new-password'
                            className="pr-10" // Add padding to the right for the icon
                        />
                        {showPassword ? (
                            <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer" onClick={handleShowPassword} />
                        ) : (
                            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer" onClick={handleShowPassword} />
                        )}
                    </div>

                    {/* confirm password input */}
                    <Label className='font-semibold'>Confirmar contraseña</Label>
                    <div className="relative">
                        <Input
                            type={showPasswordConfirmation ? "text" : "password"}
                            placeholder="Confirmar contraseña"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            autoComplete='new-password'
                            className="pr-10" // Add padding to the right for the icon
                        />
                        {showPasswordConfirmation ? (
                            <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer" onClick={handleShowPasswordConfirmation} />
                        ) : (
                            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer" onClick={handleShowPasswordConfirmation} />
                        )}
                    </div>

                    {/* call to action button */}
                    <Button type='submit' className='w-full p-2' disabled={loading}>{loading ? 'Actualizando...' : 'Cambiar contraseña'}</Button>
                </form>
            </div>
        </div>
    )
}