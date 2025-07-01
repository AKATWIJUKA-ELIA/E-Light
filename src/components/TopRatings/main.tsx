'use client'
import React, { useState, useEffect } from 'react'
import HeroCard from '../HeroCards/page'
import ProductSkeleton from '../ProductsSkeleton/page';
import useGetTopRatings from '@/hooks/useGetTopRatings';

interface Product {
  approved: boolean;
  product_cartegory: string;
  product_condition: string;
  product_description: string;
  product_image: string[];
  product_name: string;
  product_owner_id: string;
  product_price: string;
  _creationTime: number;
  _id: string;
}


const Main =  () => {
        const { TopRatings:data } = useGetTopRatings();
  const [products, setProducts] = useState<Product[]>([])

useEffect(() => {
                            if (data && data.length>0 ) {
                                setProducts(data);
                            }
                        }, [data]);

  return (
    <div className=' dark:bg-black'>
        <h1 className='font-bold text-3xl text-center'>Top Rated Products</h1>
        <div className='grid grid-cols-2 md:grid-cols-5 p-2 gap-2 dark:bg-black '>
       
      {products&&products.length>0?( products.map((product) => (
        <HeroCard key={product._id} product={product} />
      ))):(
        Array.from({ length: 15 }).map((_, idx) => (
    <div key={idx}>
        <ProductSkeleton/>
    </div>
  ))
      )}
    </div>
    </div>
  )
}

export default Main
