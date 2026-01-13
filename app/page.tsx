'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, FolderKanban, MessageSquare, Sparkles, SquareCheckBig, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from '@/lib/auth-client'
import { motion } from 'framer-motion'
import CardsHome from '@/components/home/CardsHome'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen">

      {/* section 1 */}
      <div className="container mx-auto mt-10">
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
            className="lg:block relative w-full min-h-[calc(50vh)] border border-border rounded-3xl overflow-hidden">
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
      <div className="container mx-auto my-10 lg:my-40">
        <div className="flex lg:flex min-h-[calc(70vh)] items-center justify-between">

          {/* Texto */}
          <motion.div
            // transición de izquierda a derecha
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight leading-none">
                Todo tu equipo en <br /> <span className="text-primary">un solo lugar</span>
              </h1>

              <p className="text-lg lg:max-w-lg sm:text-xl text-muted-foreground leading-relaxed">
                Organiza tareas, define flujos de trabajo y mantené cada proyecto bajo control.
                Visualizá avances en tiempo real y convertí ideas en resultados concretos, sin fricción ni desorden.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link href={!session ? '/auth/login' : '/projects'}>
                <Button size="lg" className="text-lg flex items-center gap-2">
                  Empezar ahora
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
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
      <CardsHome />

    </div>
  )
} 
