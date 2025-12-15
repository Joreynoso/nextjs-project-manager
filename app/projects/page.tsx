export default function ProjectsPage() {

    // render return
    return(
        <div className='w-full min-h-[calc(100vh-4rem)] mx-auto flex flex-col py-8 px-5'>
            <h1 className='text-2xl font-bold mb-0'>Proyectos</h1>
            <p className='text-base text-foreground/70'>Gestiona tus proyectos aquí</p>

            {/* lista de proyectos */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className='card w-full p-4'>
                    <h2 className='text-lg font-semibold mb-2'>Proyecto 1</h2>
                    <p className='text-base text-foreground/70'>Descripción del proyecto 1</p>
                </div>
            </div>
        </div>
    )
}