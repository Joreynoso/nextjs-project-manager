'use client'

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // ocultar navbar en el dashboar, en esta vista
  const pathname = usePathname();
  const isNavbarOpen = pathname !== '/dashboard';
  const isFooterOpen = pathname !== '/dashboard';

  // render return
  return (
    <div>
      {/* Main Content */}
      {isNavbarOpen && <Navbar />}
      <main className="h-screen bg-background">
        {children}
      </main>
      {isFooterOpen && <Footer />}
    </div>
  );
}