"use client"
import { useQuery } from 'convex/react';
import React, { use } from 'react'
import { api } from '../../../../convex/_generated/api';
import ProductCard from '@/components/ProductCard/page';

interface PageProps {
        params: Promise<{ id: string }>
      }

const Product = ({params}:PageProps) => {
        const { id } = use(params); // Extract the job ID from params
  const product =  useQuery(api.products.getProduct, { id }); // Use the query with the provided ID
  if (!product) {
    return <h1>Loading Data...</h1>;
  }
  return (
    <div>
        <ProductCard product={product} />
    </div>
  )
}

export default Product