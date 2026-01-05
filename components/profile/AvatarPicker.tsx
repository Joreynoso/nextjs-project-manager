'use client '

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import type { User } from '@/types/user'
import { listOfAvataras } from '@/lib/utils'
import { authClient } from '@/lib/auth-client'

export default function AvatarPicker() {

    const { data: session } = useSession()

    if (!session) {
        redirect('/auth/login')
    }

    const { user }: { user: User } = session

    // verificar current avatar image
    const currentAvatar = listOfAvataras.find((avatar) => avatar.src === user.image)

    // render return
    return (
        <div className='w-full sm:max-w-[60%] mx-auto flex flex-wrap gap-4 justify-center items-center py-4'>
            {listOfAvataras.map((avatar) => {
                const isSelected = avatar.src === user.image

                return (
                    <Avatar
                        key={avatar.id}
                        className={`w-24 h-24 cursor-pointer rounded-full border-2 transition-all duration-300 ${isSelected
                                ? 'border-primary ring-4 ring-primary/30 scale-105'
                                : 'border-muted hover:border-primary/50'
                            }`}
                        onClick={() => authClient.updateUser({ image: avatar.src })}
                    >
                        <AvatarImage src={avatar.src} />
                        <AvatarFallback>{avatar.fallback}</AvatarFallback>
                    </Avatar>
                )
            })}
        </div>
    )
}
