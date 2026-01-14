import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
   return (
      <div className='w-full min-h-[calc(100vh-4rem)] mx-auto flex flex-col py-5 pb-10 max-w-7xl'>
         {/* Replicar el Header/Breadcrumb con skeletons */}
         <div className="mb-5 flex flex-col gap-y-2">
            <Skeleton className="h-5 w-32 bg-secondary" /> {/* Breadcrumb fake */}
         </div>

         <div className='w-full flex flex-col sm:flex-row gap-4 mb-4'>
            <Skeleton className='w-full h-[125px] bg-secondary rounded-xl'>
            </Skeleton>

            <Skeleton className='w-full h-[125px] bg-secondary rounded-xl'>
            </Skeleton>
         </div>

         {/* Grid de skeletons simulando tarjetas */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
               <Skeleton key={i} className="h-[700px] w-full rounded-xl bg-secondary" />
            ))}
         </div>
      </div>
   )
}