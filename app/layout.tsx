
import { Bricolage_Grotesque, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '../components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/Footer';
import ScreenSizeHelper from "@/components/ScreenSizeHelper";

const fontSans = Bricolage_Grotesque({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontSerif = Bricolage_Grotesque({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
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
          <main className="flex-1 w-full flex flex-col mx-auto min-h-[calc(100vh-64px)] px-5 xl:px-0 max-w-7xl">
            {children}
          </main>

          {/* toast */}
          <Toaster position="top-center" />
          <Footer />
          <ScreenSizeHelper />
        </ThemeProvider>
      </body>
    </html>
  );
}