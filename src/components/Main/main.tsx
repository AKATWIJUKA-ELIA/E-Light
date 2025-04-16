'use client'
import React, { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import HeroCard from '../HeroCards/page'

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
  const productsData = useQuery(api.products.getProducts)

  useEffect(() => {
    if (productsData) {
      setProducts(productsData)
    }
  }, [productsData])

  return (
    <div className='grid grid-cols-2 md:grid-cols-5 p-2 gap-2'>
      {products.map((product) => (
        <HeroCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Main
