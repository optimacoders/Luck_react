import React from 'react'
import noData from '../assets/nodata.png'
import { useNavigate } from 'react-router-dom'

function Nodata() {
    const navigate = useNavigate()
    return (
        <div className=' flex flex-col justify-center items-center h-full w-full'>
            <img src={noData} alt='no data image' className=' w-60 h-44 ' />
            <p className=' font-medium'>No Data Found.</p>
            <p className=' text-xs text-gray-600'>Search for different products.</p>
            <button onClick={() => { navigate("/products") }} className=' text-sm bg-gold_dark text-white px-4 py-[4px] rounded-md my-3'>Shop Now</button>
        </div>
    )
}

export default Nodata