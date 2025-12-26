import { Member } from '@/types/user';

export default function UsersAvatars({ members }: { members?: Member[] }) {

    // render return
    return (
        <>
        <div className='w-full h-12 bg-card flex items-center justify-between px-5 rounded-lg'>
            <p>lista de miembros</p>
        </div>
        </>
    )
}
