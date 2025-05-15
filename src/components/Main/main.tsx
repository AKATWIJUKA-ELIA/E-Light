'use client'
import React, { useState, useEffect } from 'react'
import HeroCard from '../HeroCards/page'
import useGetApprovedProducts from '@/hooks/useGetApprovedProducts'

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

const Main = () => {
  const [products, setProducts] = useState<Product[]>([])
  const {data:productsData} = useGetApprovedProducts()

useEffect(() => {
                            if (productsData) {
                                const mappedProducts = productsData.map((p: any) => ({
                                    ...p,
                                    product_image: Array.isArray(p.product_image)
                                        ? (p.product_image[0] ?? null)
                                        : p.product_image ?? null
                                }));
                                setProducts(mappedProducts);
                            }
                        }, [productsData]);

  return (
    <div className='grid grid-cols-2 md:grid-cols-5 p-2 gap-2 dark:bg-black '>
      {products.map((product) => (
        <HeroCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Main
