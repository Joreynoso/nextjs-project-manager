'use client'

import Link from 'next/link';
import { Button } from './ui/button';
import { LogOut, Menu } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { useSession } from '@/lib/auth-client'
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    // defult states
    const [loading, setLoading] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()

    // instanciar pathname
    const pathname = usePathname()

    // obtener las dos primeras letras del nombre
    const getInitials = (name: string | undefined) => {
        if (!name) return ''
        return name.slice(0, 2).toUpperCase()
    }

    // toggle menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    // cerrar sesión
    const handleLogout = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/auth/login"); // redirect to login page
                    },
                },
            })


            toast.success('Sesión cerrada exitosamente')
        } catch (error) {
            console.log(error)
            toast.error('Algo salio mal')
        }
    }

    // useEffect para cerrar menu al cambiar de página
    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    return (
        <div className='w-full mx-auto border border-border'>
            <nav className="w-full max-w-7xl mx-auto flex justify-between items-center p-4 bg-outline">
                {/* logo section */}
                <Link href="/">
                    <h1 className='text-xl font-semibold tracking-tight'>Better-auth practice</h1>
                </Link>

                {/* buttons section on larger screens*/}
                <div className="hidden md:flex gap-2">

                    {/* botones de login y register */}
                    {!session && (
                        <>
                            <Button>
                                <Link href="/auth/login">Iniciar sesión</Link>
                            </Button>
                            <Button variant={'outline'}>
                                <Link href="/auth/register">Registrarse</Link>
                            </Button>
                        </>
                    )}

                    {/* botones de modo oscuro y claro */}
                    <ModeToggle />

                    {/* si existe session, renderiza el avatar */}
                    {session && (
                        <>
                            <Link href="/profile">
                                <Button variant="outline" size="icon">
                                    {getInitials(session.user.name)}
                                </Button>
                            </Link>

                            <Button onClick={handleLogout}
                                variant="outline"
                                size="icon"
                            >
                                {loading ? <LogOut className="animate-spin" /> : <LogOut />}
                            </Button>
                        </>
                    )}
                </div>

                {/* buttons section on smaller screens*/}
                <div className="md:hidden">
                    <Button variant="outline" size="icon" onClick={toggleMenu}>
                        <Menu className="h-4 w-4" />
                    </Button>
                </div>

                {/* dropdown menu */}
                {menuOpen && (
                    <div className='bg-card border border-border p-4 rounded-lg shadow-sm absolute top-16 right-4'>
                        <div className="flex flex-col gap-2">

                            {/* inicio */}
                            <Link href="/">
                                <Button
                                    variant="outline"
                                    className='w-full'>
                                    Inicio
                                </Button>
                            </Link>

                            {/* perfil */}
                            { session && (
                                <Link href="/profile">
                                <Button
                                    variant="outline"
                                    className='w-full'>
                                    Mi perfil
                                </Button>
                            </Link>
                            )}

                            {/* login */}
                            {!session && (
                                <Link href="/auth/login">
                                    <Button
                                        variant="outline"
                                        className='w-full'>
                                        Iniciar sesión
                                    </Button>
                                </Link>
                            )}

                            {/* registro */}
                            {!session && (
                                <Link href="/auth/register">
                                    <Button
                                        variant="outline"
                                        className='w-full'>
                                        Registrarse
                                    </Button>
                                </Link>
                            )}

                            {/* cerrar sesión */}
                            { session && (
                                <Button onClick={handleLogout}
                                    variant="outline"
                                    className='w-full'>
                                    Cerrar sesión
                                </Button>
                            )}

                            {/* theme toggle */}
                            <ModeToggle />
                        </div>
                    </div>
                )}

            </nav>
        </div>
    )
}