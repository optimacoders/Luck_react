import React from 'react'
import { IoBag } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import AuthHook from '../context/AuthContext';

function RelatedProductCard({ data }) {
    const navigate = useNavigate()
    const { currency } = AuthHook()

    return (
        <div onClick={() => { navigate(`/product/${data?._id}`); }}>
            <div className='relative'>
                <img src={data?.image ? data?.image[0] : "/placeholder-image.png"}
                    alt="Product Image"
                    style={{ mixBlendMode: 'multiply' }}
                    className="object-fill w-full aspect-square rounded-lg" />
                <section className='absolute top-0 right-0 bg-gold_medium rounded-tr-lg p-1'>
                    <IoIosHeartEmpty size={20} color='white' />
                </section>
            </div>
            <p className="w-[100%] text-sm font-semibold flex justify-start line-clamp-1 text-black mt-1">
                {data?.title}
            </p>
            <section className=' flex justify-between items-center'>
                <p className="font-bold">
                    {currency} {new Intl.NumberFormat().format(data?.selling_price)}
                </p>
                <span className=' text-white flex gap-1 items-center bg-gold_medium px-2 py-[1px] rounded-md'><IoBag size={15} color='white' /> +</span>
            </section>
        </div>
    )
}

export default RelatedProductCard