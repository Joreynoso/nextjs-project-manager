'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import Link from 'next/link'

// icons
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import Image from 'next/image'

// motion
import { motion } from 'framer-motion'


export default function RegisterPage() {
    // default states
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingGoogle, setLoadingGoogle] = useState(false)
    const [loadingGithub, setLoadingGithub] = useState(false)

    // instance of router
    const router = useRouter()

    // function to handle the form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden')
            setLoading(false)
            return
        }

        if (!email || !password || !name) {
            toast.error('Todos los campos son obligatorios')
            setLoading(false)
            return
        }

        try {

            const result = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: '/profile'
            })

            if (result.error?.message) {
                toast.error(result.error.message)
                setLoading(false)
                return
            }

            console.log(result)
            toast.success('Registro exitoso')
            router.push('/profile')

        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
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
                callbackURL: '/profile',
                newUserCallbackURL: "/profile"
            })

            if (result.error?.message) {
                toast.error(result.error.message)
                return
            }

            router.push("/profile"); // redirect to login page
            toast.success('Inicio de sesión exitoso')

        } catch (error) {
            toast.error('Algo salió mal')
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
                callbackURL: '/projects',
                newUserCallbackURL: "/projects"
            })

            if (result.error?.message) {
                setError('Algo salio mal')
                toast.error('Algo salio mal')
                return
            }

            router.push("/profile"); // redirect to login page
            toast.success('Inicio de sesión exitoso')

        } catch (error) {
            setError('Algo salió mal')
            toast.error('Algo salió mal')
        } finally {
            setLoadingGithub(false)
        }
    }

    // render return
    return (
        <div className="min-h-screen">
            <div className="container mx-auto">
                <div className="flex min-h-screen items-center justify-between">

                    {/* Texto */}
                    <motion.div
                        // transición de izquierda a derecha
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-1/2 space-y-8">
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-lg rounded-lg'>
                            <div className='mb-6'>
                                <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 tracking-tight'>Registrate en Better <span className="text-primary">Jungle</span></h2>
                                <p className='text-base sm:text-lg md:text-xl text-muted-foreground tracking-tight'>Ingresa tus datos para registrarte y formar parte de la comunidad colaborativa más grande de Latam.</p>
                            </div>

                            <Label htmlFor="name" className='font-semibold'>Nombre</Label>
                            <Input
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='border border-border' />

                            {/* email input */}
                            <Label htmlFor="email" className='font-semibold'>Correo</Label>
                            <Input
                                type="email"
                                placeholder="Correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete='new-password'
                                className='border border-border'
                            />

                            {/* password input */}
                            <Label htmlFor="password" className='font-semibold'>Contraseña</Label>
                            <Input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete='new-password'
                                className='border border-border'
                            />

                            {/* confirm password input */}
                            <Label htmlFor="confirmPassword" className='font-semibold'>Confirmar Contraseña</Label>
                            <Input
                                type="password"
                                placeholder="Confirmar Contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete='new-password'
                                className='border border-border'
                            />

                            <hr className="my-2" />

                            {/* button */}
                            <Button type="submit">{loading ? 'Registrando...' : 'Registrarme con mi email'}</Button>
                            <Button type="button" variant={'secondary'} onClick={handleGoogleSignIn}>{loadingGoogle ? 'Registrando...' : 'Registrarme con Google'}<FcGoogle /></Button>
                            <Button type="button" variant={'secondary'} onClick={handleGithubSignIn}>{loadingGithub ? 'Registrando...' : 'Registrarme con Github'}<FaGithub /></Button>
                            <Link href='/auth/login' className='text-muted-foreground text-center text-sm mt-2 hover:text-primary transition-colors'>¿Ya tienes una cuenta?. Inicia sesión</Link>
                        </form>
                    </motion.div>

                    {/* Imagen */}
                    <motion.div
                        // transición de izquierda a derecha
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hidden lg:block relative w-1/2 min-h-[calc(75vh)] border border-border rounded-3xl overflow-hidden">
                        <Image
                            src="/images/img_3.jpg"
                            alt="Explorador en la jungla colaborativa"
                            fill
                            priority
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}