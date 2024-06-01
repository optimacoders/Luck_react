import React, { useEffect, useState } from 'react'
import { getRequest } from "../utils/Apihelpers"
import ProductCard from '../components/ProductCard';


function Favorites() {
    const [data, setdata] = useState()

    const getdata = async () => {
        const res = await getRequest(true, '/liked');
        if (res.status) {
            setdata(res.favourites)
        }
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <div className=' p-3'>
            <p className=' text-lg font-medium'>Your Favorites</p>
            <div className=' grid grid-cols-2 md:grid-cols-4'>
                {
                    data?.map((item) => {
                        return <div key={item._id}>
                            <ProductCard data={item.product} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Favorites