import React from 'react'
import { ImQuotesRight } from "react-icons/im";
import { FaStar } from "react-icons/fa";

function ReviewCard({ data }) {
    return (
        <div className=' border shadow-lg p-4 rounded-md relative'>
            <section className=' flex gap-2 my-1'>
                <div className=' w-7 h-7 rounded-full bg-gray-500'></div>
                <div>
                    <p className=' font-medium'>{data?.userId?.name}</p>
                    <section className=' flex gap-2'>
                        {Array.from({ length: data?.rating }).map((_, index) => (
                            <FaStar key={index} size={15} className='text-gold_dark' />
                        ))}
                    </section>
                </div>
            </section>
            <p>{data?.comment}</p>
            <p>{data?.desc}</p>
            <section className=' absolute right-3 top-3'>
                <ImQuotesRight size={20} className=' text-gold_dark' />
            </section>
        </div>
    )
}

export default ReviewCard