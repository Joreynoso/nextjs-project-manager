import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto">
        <div className="flex min-h-screen items-center justify-between gap-8 py-12">

          {/* Sección de texto */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-semibold  tracking-tight leading-none">
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

            <Button variant={'default'}  size={'lg'} className='text-lg'>
              Crear mi primer proyecto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Sección de imagen */}
          <div className="hidden lg:block w-1/2">
            <div className="relative">
              {/* Contenedor de la ilustración */}
              <div className="bg-card rounded-3xl shadow-2xl aspect-square max-w-lg mx-auto relative overflow-hidden">

                {/* Hojas decorativas de fondo */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
                </div>

                {/* Personaje central - Placeholder */}
                <div className="relative z-10 flex items-center justify-center h-full">
                  <Image
                    src="/images/img_1.jpg"
                    alt="Explorador en la jungla colaborativa"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    className="rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}