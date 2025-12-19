import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string | undefined) {
  if (!name) return ''
  return name.slice(0, 2).toUpperCase()
}

export function formatDateString(dateString: string | Date) {
  const formattedDate = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateString))
  return formattedDate
}