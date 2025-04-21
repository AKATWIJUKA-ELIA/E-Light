'use client'
import React, { useState, useEffect } from 'react'
import HeroCard from '../HeroCards/page'
import useGetApprovedProducts from '@/hooks/useGetApprovedProducts'

interface Product {
  approved: boolean;
  product_category: string;
  product_condition: string;
  product_description: string;
  product_image: string;
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
      setProducts(productsData)
    }
  }, )

  return (
    <div className='grid grid-cols-2 md:grid-cols-5 p-2 gap-2'>
      {products.map((product) => (
        <HeroCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Main
