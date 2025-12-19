"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    
    // Verificar si el navegador soporta View Transition API
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(newTheme)
      })
    } else {
      // Fallback para navegadores que no soportan la API
      setTheme(newTheme)
    }
  }

  return (
    <DropdownMenu>
      <Button variant="secondary" size="icon" onClick={toggleTheme} className="w-full md:w-[35px]">
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenu>
  )
}