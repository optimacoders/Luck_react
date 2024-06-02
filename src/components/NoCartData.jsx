import React from 'react'
import cart from "../assets/nocart.png"
import { useNavigate } from 'react-router-dom'

function NoCartData() {
    const navigate = useNavigate()
    return (
        <div className=' flex flex-col justify-center items-center h-full w-full'>
            <img src={cart} alt='no data image' className=' w-60 h-44 ' />
            <p className=' font-medium'>Ohhh...  Your cart is empty.</p>
            <p className=' text-xs text-gray-600'>but it doesn't have to be.</p>
            <button onClick={() => { navigate("/products") }} className=' text-sm bg-gold_dark text-white px-4 py-[4px] rounded-md my-3 font-semibold'>Shop Now</button>
        </div>
    )
}

export default NoCartData