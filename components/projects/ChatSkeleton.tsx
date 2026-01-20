import { Skeleton } from "@/components/ui/skeleton"

export default function ChatSkeleton() {
    return (
        <div className="flex flex-col gap-6 p-4">
            {/* Skeleton Message 1 - Sistema */}
            <div className="flex gap-3">
                <Skeleton className="h-9 w-9 rounded-full shrink-0 bg-secondary" />
                <div className="flex flex-col gap-1 max-w-[75%]">
                    <div className="flex items-center gap-2 px-1">
                        <Skeleton className="h-3 w-16 bg-secondary" />
                        <Skeleton className="h-3 w-12 bg-secondary" />
                    </div>
                    <Skeleton className="h-20 w-64 rounded-2xl rounded-tl-sm bg-secondary" />
                </div>
            </div>

            {/* Skeleton Message 2 - Usuario */}
            <div className="flex gap-3 flex-row-reverse">
                <Skeleton className="h-9 w-9 rounded-full shrink-0 bg-secondary" />
                <div className="flex flex-col gap-1 max-w-[75%] items-end">
                    <div className="flex items-center gap-2 px-1 flex-row-reverse">
                        <Skeleton className="h-3 w-12 bg-secondary" />
                        <Skeleton className="h-3 w-12 bg-secondary" />
                    </div>
                    <Skeleton className="h-16 w-48 rounded-2xl rounded-tr-sm bg-secondary" />
                </div>
            </div>

            {/* Skeleton Message 3 - Sistema */}
            <div className="flex gap-3">
                <Skeleton className="h-9 w-9 rounded-full shrink-0 bg-secondary" />
                <div className="flex flex-col gap-1 max-w-[75%]">
                    <div className="flex items-center gap-2 px-1">
                        <Skeleton className="h-3 w-16 bg-secondary" />
                        <Skeleton className="h-3 w-12 bg-secondary" />
                    </div>
                    <Skeleton className="h-12 w-56 rounded-2xl rounded-tl-sm bg-secondary" />
                </div>
            </div>
        </div>
    )
}
