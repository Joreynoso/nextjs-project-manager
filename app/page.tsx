'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, FolderKanban, SquareCheckBig, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from '@/lib/auth-client'
import { motion } from 'framer-motion'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen">

      {/* section 1 */}
      <div className="container mx-auto">
        <div className="flex flex-col min-h-screen items-center justify-between py-16">

          {/* Texto */}
          <motion.div
            // transición de izquierda a derecha
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-none">
                Bienvenido
                a la Jungla
                <br />
                <span className="text-primary">Colaborativa</span>
              </h1>

              <p className="max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Crea, colabora y comparte tus proyectos en un espacio diseñado para potenciar tu creatividad y el trabajo en equipo.
              </p>
            </div>

            <Link href={!session ? '/auth/login' : '/projects'}>
              <Button size="lg" className="text-lg flex items-center gap-2 mb-10">
                Crear mi primer proyecto
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Imagen */}
          <motion.div
            // transición desde derecha a izquierda
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block relative w-full min-h-[calc(50vh)] border border-border rounded-3xl overflow-hidden">
            <Image
              src="/images/img_home.jpg"
              alt="Explorador en la jungla colaborativa"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* section 2 */}
      <div className="container mx-auto">
        <div className="flex min-h-screen items-center justify-between">

          {/* Texto */}
          <motion.div
            // transición de izquierda a derecha
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-none">
                Todo tu <br />equipo,  en <br /> <span className="text-primary">un solo lugar</span>
              </h1>

              <p className="max-w-md text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Organiza tareas, define flujos de trabajo y mantené cada proyecto bajo control.
                Visualizá avances en tiempo real y convertí ideas en resultados concretos, sin fricción ni desorden.
              </p>
            </div>

            <Link href={!session ? '/auth/login' : '/projects'}>
              <Button size="lg" className="text-lg flex items-center gap-2">
                Crear mi primer proyecto
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Imagen */}
          <motion.div
            // transición desde derecha a izquierda
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block relative w-1/2 min-h-[calc(75vh)] border border-border rounded-3xl overflow-hidden">
            <Image
              src="/images/img_1.jpg"
              alt="Explorador en la jungla colaborativa"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* section 3 */}
      <div className='container mx-auto'>
        <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4'>

          {/* card 1 - gestion de proyectos */}
          <div className='bg-card p-8 rounded-2xl text-center flex flex-col justify-center items-center'>
            <div className='aspect-square w-12 h-12 mx-aut bg-muted rounded-full flex justify-center items-center mb-6'>
              <FolderKanban className='w-6 h-6 text-primary' />
            </div>
            <h2 className='text-lg font-semibold mb-2'>Gestión de proyectos</h2>
            <p className='text-muted-foreground'>Creá y organizá proyectos en un solo lugar, con estructura clara,
              objetivos definidos y control total desde el inicio</p>
          </div>

          {/* card 2 - Miembros y roles */}
          <div className='bg-card p-8 rounded-2xl text-center flex flex-col justify-center items-center'>
            <div className='aspect-square w-12 h-12 mx-aut bg-muted rounded-full flex justify-center items-center mb-6'>
              <User className='w-6 h-6 text-primary' />
            </div>
            <h2 className='text-lg font-semibold mb-2'>Miembros y roles</h2>
            <p className='text-muted-foreground'>Organiza y gestiona los miembros de tu equipo, asignando roles y permisos
              para que cada uno tenga acceso a las herramientas y funcionalidades que necesita</p>
          </div>

          {/* card 3 - Gestión de tareas */}
          <div className='bg-card p-8 rounded-2xl text-center flex flex-col justify-center items-center'>

            <div className='aspect-square w-12 h-12 mx-aut bg-muted rounded-full flex justify-center items-center mb-6'>
              <SquareCheckBig className='w-6 h-6 text-primary' />
            </div>

            <h2 className='text-lg font-semibold mb-2'>Gestión de tareas</h2>
            <p className='text-muted-foreground'>Organiza y gestiona los miembros de tu equipo, asignando roles y permisos
              para que cada uno tenga acceso a las herramientas y funcionalidades que necesita</p>
          </div>

          {/* card 4 - Seguimiento de progreso */}
          <div className='bg-card p-8 rounded-2xl text-center flex flex-col justify-center items-center'>

            <div className='aspect-square w-12 h-12 mx-aut bg-muted rounded-full flex justify-center items-center mb-6'>
              <SquareCheckBig className='w-6 h-6 text-primary' />
            </div>

            <h2 className='text-lg font-semibold mb-2'>Seguimiento de progreso</h2>
            <p className='text-muted-foreground'>Visualizá el estado de cada tarea y proyecto en tiempo real,
              detectando bloqueos y avances sin esfuerzo.</p>
          </div>

          {/* card 4 - Seguimiento de progreso */}
          <div className='bg-card p-8 rounded-2xl text-center flex flex-col justify-center items-center'>

            <div className='aspect-square w-12 h-12 mx-aut bg-muted rounded-full flex justify-center items-center mb-6'>
              <SquareCheckBig className='w-6 h-6 text-primary' />
            </div>

            <h2 className='text-lg font-semibold mb-2'>Seguimiento de progreso</h2>
            <p className='text-muted-foreground'>Visualizá el estado de cada tarea y proyecto en tiempo real,
              detectando bloqueos y avances sin esfuerzo.</p>
          </div>

          {/* card 4 - Seguimiento de progreso */}
          <div className='bg-card p-8 rounded-2xl text-center flex flex-col justify-center items-center'>

            <div className='aspect-square w-12 h-12 mx-aut bg-muted rounded-full flex justify-center items-center mb-6'>
              <SquareCheckBig className='w-6 h-6 text-primary' />
            </div>

            <h2 className='text-lg font-semibold mb-2'>Seguimiento de progreso</h2>
            <p className='text-muted-foreground'>Visualizá el estado de cada tarea y proyecto en tiempo real,
              detectando bloqueos y avances sin esfuerzo.</p>
          </div>

        </div>
      </div>

    </div>
  )
} 
