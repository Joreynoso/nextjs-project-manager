'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/auth-client'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            console.log('submitting form...')
            await signUp({
                email,
                password,
            })
        } catch (error) {
            console.log(error)
            setError('Algo salio mal')
        } finally {
            setLoading(false)
        }
    }

    // renderizar el formulario de registro
    return (
        <div className="flex flex-col min-h-screen items-center justify-center font-sans dark:bg-black">
            <h2 className='text-2xl font-bold mb-6'>Registrate con <span className='text-blue-500'>better-auth</span></h2>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-md bg-zinc-50 p-6 rounded-lg shadow-md'>
                <Label htmlFor="email">Correo</Label>
                <Input type="email" placeholder="Correo" />
                <Label htmlFor="password">Contraseña</Label>
                <Input type="password" placeholder="Contraseña" />
                <Button type="submit">Registrarse</Button>
            </form>
        </div>
    )
}