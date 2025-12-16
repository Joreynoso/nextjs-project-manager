'use client'

import { Montserrat, Merriweather, Source_Code_Pro, Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '../components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontSerif = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const fontMono = Source_Code_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Ocultar Navbar y Footer en todas las rutas que empiecen con /dashboard
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
        suppressHydrationWarning={false}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>

          <Navbar />

          {/* main crece para empujar el footer hacia abajo */}
          <main className={`flex-1 w-full flex flex-col mx-auto ${!isDashboard ? 'min-h-[calc(100vh-64px)] px-5 xl:px-0' : ''} max-w-7xl`}>
            {children}
          </main>

          {/* toast */}
          <Toaster position="top-center" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}