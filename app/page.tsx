'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from '@/lib/auth-client'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="flex min-h-screen items-center justify-between">

          {/* Texto */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-none">
                Bienvenido
                <br />
                a la Jungla
                <br />
                <span className="text-primary">Colaborativa</span>
              </h1>

              <p className="max-w-md text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Crea, colabora, comparte, cada proyecto que tengas muchas ganas de hacer la concha bien puta de la lora.
              </p>
            </div>

            <Link href={!session ? '/auth/login' : '/projects'}>
              <Button size="lg" className="text-lg flex items-center gap-2">
                Crear mi primer proyecto
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Imagen */}
          <div className="hidden lg:block relative w-1/2 min-h-[calc(100vh-4rem)] border border-border rounded-3xl overflow-hidden">
            <Image
              src="/images/img_1.jpg"
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
