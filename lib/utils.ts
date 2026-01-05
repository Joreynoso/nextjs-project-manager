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

// lista de avatares 
export const listOfAvataras = [
    {
        id: 1,
        src: '/avatars/avatar_1.jpg',
        fallback: 'CN'
    },
    {
        id: 2,
        src: '/avatars/avatar_2.jpg',
        fallback: 'CN'
    },
    {
        id: 3,
        src: '/avatars/avatar_3.jpg',
        fallback: 'CN'
    },
    {
        id: 4,
        src: '/avatars/avatar_4.jpg',
        fallback: 'CN'
    },
    {
        id: 5,
        src: '/avatars/avatar_5.jpg',
        fallback: 'CN'
    },
    {
        id: 6,
        src: '/avatars/avatar_6.jpg',
        fallback: 'CN'
    },
]