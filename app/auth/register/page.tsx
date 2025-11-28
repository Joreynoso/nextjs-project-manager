'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import { toast } from 'sonner'

export default function RegisterPage() {
    // default states
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // instance of router
    const router = useRouter()

    // function to handle the form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if (password !== confirmPassword) {
            setError('The passwords doest no match')
            setLoading(false)
            return
        }
        try {

            const result = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: '/dashboard'
            })

            if (result.error?.message) {
                setError(result.error.message)
                toast.error(result.error.message)
                setLoading(false)
                return
            }

            console.log(result)
            toast.success('Registro exitoso')
            router.push('/auth/login')

        } catch (error) {
            console.log(error)
            setError('Algo salio mal')
            toast.error('Algo salio mal')
        } finally {
            setLoading(false)
        }
    }

    // render return
    return (
        <div className="flex flex-col mt-20 items-center justify-center font-sans bg-background">

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-md bg-card border border-border p-6 rounded-lg shadow-sm'>
                <div className='mb-6'>
                    <h2 className='text-xl font-semibold mb-2 tracking-tight'>Registrate con better-auth</h2>
                    <p className='text-sm text-muted-foreground tracking-tight'>Ingresa tus datos para registrarte</p>
                </div>

                <Label htmlFor="name" className='font-semibold'>Nombre</Label>
                <Input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                {/* email input */}
                <Label htmlFor="email" className='font-semibold'>Correo</Label>
                <Input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='new-password'
                />

                {/* password input */}
                <Label htmlFor="password" className='font-semibold'>Contraseña</Label>
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='new-password'
                />

                {/* confirm password input */}
                <Label htmlFor="confirmPassword" className='font-semibold'>Confirmar Contraseña</Label>
                <Input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete='new-password'
                />

                <hr className="my-2" />

                {/* button */}
                <Button type="submit">{loading ? 'Registrando...' : 'Registrarse'}</Button>
                <Button type="button" variant={'outline'}>{loading ? 'Registrando...' : 'Registrarse con Google'}</Button>
                <Button type="button" variant={'outline'}>{loading ? 'Registrando...' : 'Registrarse con Github'}</Button>
                <Link href='/auth/login' className='text-muted-foreground text-center text-sm mt-2 hover:text-primary transition-colors'>¿Ya tienes una cuenta?. Inicia sesión</Link>

                <hr className='my-2' />
            </form>
        </div>
    )
}