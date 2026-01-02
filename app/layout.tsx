
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '../components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/Footer';
import ScreenSizeHelper from "@/components/ScreenSizeHelper";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const fontSerif = Bricolage_Grotesque({
  variable: "--font-bricolage-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const fontMono = Bricolage_Grotesque({
  variable: "--font-bricolage-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
        suppressHydrationWarning={false}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>

          {/* <Navbar /> */}

          {/* main crece para empujar el footer hacia abajo */}
          <main className="flex-1 w-full flex flex-col mx-auto min-h-[calc(100vh-64px)] px-5 xl:px-0 max-w-7xl">
            {children}
          </main>

          {/* toast */}
          <Toaster position="top-center" />
          {/* <Footer /> */}
          <ScreenSizeHelper />
        </ThemeProvider>
      </body>
    </html>
  );
}