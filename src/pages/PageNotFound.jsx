import React from 'react'
// import logo from "../Assets/logo.png";
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate()
    return (
        <div className=' w-[100svw] h-[100svh] flex flex-col justify-center items-center gap-2 relative p-2 md:p-0'>
            <img src={""} alt="logo" className=" absolute left-5 top-5" width={100} />
            <h1 className=' text-gold_dark text-[40px] font-semibold'>We lost this page</h1>
            <p className=' text-gray-600 font-medium text-center'>We searched high and low but couldn't find what you're looking for. Let's find a better place for you to go.</p>
            <button onClick={() => navigate("/")} className=' hover:bg-gold_dark hover:text-white bg-gray-100 border px-4 py-[6px] rounded font-medium text-gray-500 text-sm'>Go To Home</button>
        </div>
    )
}

export default PageNotFound