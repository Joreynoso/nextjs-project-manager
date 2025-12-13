import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)] items-center justify-center font-sans bg-background">
      <Badge variant="outline" className='mb-4'>Autenticación con better auth</Badge>
      <h1 className='max-w-5xl text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-8 leading-[1.1]'>
        <span className="text-primary">Better-Auth</span> Autenticación rápida y segura
      </h1>

      <p className='max-w-2xl text-center text-base sm:text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed font-medium'>
        Registrate para probar el sistema de autenticación con better auth, ingresa tus datos y crea tu cuenta
      </p>

      <div className='flex flex-col sm:flex-row gap-4'>
        {/* registarse */}
        <Button variant="default" size="lg" className="text-base font-semibold min-w-[160px]">
          <Link href="/auth/register">Registrate</Link>
        </Button>

        {/* iniciar sesión */}
        <Button variant="secondary" size="lg" className="text-base font-semibold min-w-[160px]">
          <Link href="/auth/login">Iniciar sesión</Link>
        </Button>
      </div>
    </div>
  )
}
