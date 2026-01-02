'use client'

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// icons
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import Image from 'next/image';


export default function LoginPage() {
    // default states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingGoogle, setLoadingGoogle] = useState(false)
    const [loadingGithub, setLoadingGithub] = useState(false)

    const router = useRouter()

    // function to handle the form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await authClient.signIn.email({
                email,
                password
            })

            if (result.error?.message) {
                setError(result.error.message)
                toast.error(result.error.message)
                setLoading(false)
                return
            }

            router.push("/profile"); // redirect to login page
            toast.success('Inicio de sesión exitoso')

        } catch (error) {
            setError('Algo salió mal')
            toast.error('Algo salió mal')
        } finally {
            setLoading(false)
        }
    }

    // funcion para iniciar sesión con Google
    const handleGoogleSignIn = async () => {
        setLoadingGoogle(true)
        try {
            const result = await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/projects',
                newUserCallbackURL: "/projects"
            })

            if (result.error?.message) {
                setError(result.error.message)
                toast.error(result.error.message)
                setLoadingGoogle(false)
                return
            }


        } catch (error) {
            setError('Algo salió mal')
            toast.error('Algo salió mal')
        } finally {
            setLoadingGoogle(false)
        }
    }

    // función para iniciar sesión con Github
    const handleGithubSignIn = async () => {
        setLoadingGithub(true)
        try {
            const result = await authClient.signIn.social({
                provider: 'github',
                callbackURL: '/profile',
                newUserCallbackURL: "/profile"
            })

            if (result.error?.message) {
                setError(result.error.message)
                toast.error(result.error.message)
                return
            }


        } catch (error) {
            setError('Algo salió mal')
            toast.error('Algo salió mal')
        } finally {
            setLoadingGithub(false)
        }
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto">
                <div className="flex min-h-screen items-center justify-between">

                    {/* Texto */}
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-md  rounded-lg shadow-sm'>
                        <div className='mb-6'>
                            <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold mb-2 tracking-tight'>Inicia sesión en Better <span className="text-primary">Jungle</span></h2>
                            <p className='text-sm sm:text-lg md:text-xl text-muted-foreground tracking-tight'>Completa el formulario y forma parte de la comunidad colaborativa más grande de Latam.</p>
                        </div>

                        {/* email input */}
                        <Label htmlFor="email" className='font-semibold' >Correo</Label>
                        <Input
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='email'
                            className='border border-border' />

                        {/* password input */}
                        <Label htmlFor="password" className='font-semibold'>Contraseña</Label>
                        <Input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='current-password'
                            className='border border-border' />

                        {/* button */}<hr className="my-2" />

                        <Button type="submit">{loading ? 'Iniciando sesión...' : 'Ingresar con email'}</Button>
                        <Button type="button" variant={'secondary'} onClick={handleGoogleSignIn}>{loadingGoogle ? 'Iniciando sesión...' : 'Inicia sesión con Google'}<FcGoogle /></Button>
                        <Button type="button" variant={'secondary'} onClick={handleGithubSignIn}>{loadingGithub ? 'Iniciando sesión...' : 'Inicia sesión con Github'}<FaGithub /></Button>
                        <Link href='/auth/register' className='text-muted-foreground text-center text-sm mt-2 hover:text-primary transition-colors tracking-tight'>
                            ¿No tienes una cuenta aún?. Registrate</Link>
                    </form>
                    {/* Imagen */}
                    <div className="hidden lg:block relative w-1/2 min-h-[calc(100vh-4rem)] border border-border rounded-3xl overflow-hidden">
                        <Image
                            src="/images/img_2.jpg"
                            alt="Explorador en la jungla colaborativa"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}