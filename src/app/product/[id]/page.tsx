"use client"
import React, { use } from 'react'
import ProductCard from '@/components/ProductCard/page';
import { Oval } from 'react-loader-spinner'
import useGetProductById from '@/hooks/useGetProductById';

interface PageProps {
        params: Promise<{ id: string }>
      }

const Product = ({params}:PageProps) => {
        const { id } = use(params); 
        const { data: product } = useGetProductById(id); 
  if (!product) {
    return  <Oval
                            visible={true}
                            height="80"
                            width="80"
                            color="#0000FF"
                            secondaryColor="#ddd"
                            ariaLabel="oval-loading"
                            wrapperStyle={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                            }}
                            wrapperClass=""
                            />
  }
  return (
    <div>
        <ProductCard product={product} />
    </div>
  )
}

export default Product