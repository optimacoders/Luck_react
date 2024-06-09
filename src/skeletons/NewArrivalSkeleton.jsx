import React from 'react'

function NewArrivalSkeleton() {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-5 my-5 md:px-36">
            <div className="bg-gray-300 animate-pulse aspect-square w-full min-w-[100px] md:min-w-[175px]"></div>
            <div className="bg-gray-300 animate-pulse aspect-square w-full"></div>
            <div className="bg-gray-300 animate-pulse aspect-square w-full"></div>
            <div className="bg-gray-300 animate-pulse aspect-square w-full"></div>
            <div className="row-span-2 col-span-2 bg-gray-300 animate-pulse aspect-square w-full"></div>
            <div className="bg-gray-300 animate-pulse aspect-square w-full"></div>
        </div>
    )
}

export default NewArrivalSkeleton