import React from 'react'

function NewArrivals() {
    return (
        <div className=' px-3 md:px-20 my-3 flex flex-col justify-center items-center'>
            <h1 className=' text-center font-bold text-3xl'>NEW ARRIVALS</h1>
            <p className=' text-center font-medium'>Shop our Latest collections to celebrate in Style</p>
            <div className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-5 my-5 md:px-36">
                <div className="bg-gold_medium aspect-square">
                    <img src="https://i.etsystatic.com/18612088/r/il/f91d73/6008214232/il_1588xN.6008214232_6vy0.jpg" className="w-full h-auto aspect-square " />
                </div>
                <div className="bg-gold_medium aspect-square">
                    <img src="https://i.etsystatic.com/18612088/r/il/f91d73/6008214232/il_1588xN.6008214232_6vy0.jpg" className="w-full h-auto aspect-square " />
                </div>
                <div className="bg-gold_medium aspect-square">
                    <img src="https://i.etsystatic.com/18612088/r/il/f91d73/6008214232/il_1588xN.6008214232_6vy0.jpg" className="w-full h-auto aspect-square " />
                </div>
                <div className="bg-gold_medium aspect-square ">
                    <img src="https://i.etsystatic.com/18612088/r/il/f91d73/6008214232/il_1588xN.6008214232_6vy0.jpg" className="w-full h-auto aspect-square " />
                </div>
                <div className="row-span-2 col-span-2 bg-gold_medium aspect-square ">
                    <img src="https://i.etsystatic.com/18612088/r/il/f91d73/6008214232/il_1588xN.6008214232_6vy0.jpg" className="w-full h-auto aspect-square " />
                </div>
                <div className="bg-gold_medium aspect-square">
                    <img src="https://i.etsystatic.com/18612088/r/il/f91d73/6008214232/il_1588xN.6008214232_6vy0.jpg" className="w-full h-auto aspect-square " />
                </div>
            </div>
            <button className=' text-center bg-gold_medium text-white px-4 py-[5px]'>Shop Now</button>
        </div>
    )
}

export default NewArrivals