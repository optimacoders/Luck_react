import React from 'react'
import { ImQuotesRight } from "react-icons/im";
import { FaStar } from "react-icons/fa";

function ReviewCard() {
    return (
        <div className=' border shadow-lg p-4 rounded-md relative'>
            <section className=' flex gap-2 my-1'>
                <div className=' w-7 h-7 rounded-full bg-gray-500'></div>
                <div>
                    <p className=' font-medium'>User Name</p>
                    <section className=' flex gap-2'>
                        <FaStar size={15} className=' text-gold_dark' />
                        <FaStar size={15} className=' text-gold_dark' />
                        <FaStar size={15} className=' text-gold_dark' />
                        <FaStar size={15} className=' text-gold_dark' />
                        <FaStar size={15} className=' text-gold_dark' />
                    </section>
                </div>
            </section>
            <p>Great experience with seller, we communicated about sizing. Perfect size, lovely top, quality craftsmanship.</p>
            <section className=' absolute right-3 top-3'>
                <ImQuotesRight size={20} className=' text-gold_dark' />
            </section>
        </div>
    )
}

export default ReviewCard