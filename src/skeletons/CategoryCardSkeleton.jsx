import React from 'react'

function CategoryCardSkeleton() {
    return (
        <div>
            <div className="flex flex-col items-center rounded-md gap-2 animate-pulse">
                <div className="w-20 h-20 aspect-square rounded-full relative overflow-hidden bg-gray-300"></div>
                <p className="w-16 h-4 bg-gray-300 rounded mt-2"></p>
            </div>
        </div>
    )
}

export default CategoryCardSkeleton