export const LoadingSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10" />
                        <div className="flex-1 space-y-3">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded col-span-2" />
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded col-span-1" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}