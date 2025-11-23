import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans dark:bg-black px-6">
      <h1 className='max-w-5xl text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-8 leading-[1.1]'>
        Primer proyecto con <span className="text-blue-600 dark:text-blue-500">Better-Auth</span>
      </h1>

      <p className='max-w-2xl text-center text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 mb-12 leading-relaxed font-medium'>
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
  );
}
