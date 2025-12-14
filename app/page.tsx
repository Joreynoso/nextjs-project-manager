import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-10rem)] items-center justify-center font-sans bg-background">
      <Badge variant="outline" className='mb-4'>Gestión de Proyectos</Badge>
      <h1 className='max-w-5xl text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground mb-8 leading-[1.1]'>
        <span className="text-primary">ProjectFlow</span> Tu Gestor de Proyectos Definitivo
      </h1>

      <p className='max-w-2xl text-center text-base sm:text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed font-medium'>
        Organiza, colabora y entrega tus proyectos a tiempo con nuestra plataforma intuitiva y potente.
      </p>

      <div className='flex flex-col sm:flex-row gap-4'>
        {/* registarse */}
        <Button variant="default" size="lg" className="text-base font-medium min-w-[160px]">
          <Link href="/dashboard">Empezar Ahora</Link>
        </Button>

        {/* iniciar sesión */}
        <Button variant="secondary" size="lg" className="text-base font-medium min-w-[160px]">
          <Link href="/auth/login">Acceder</Link>
        </Button>
      </div>
    </div>
  )
}
