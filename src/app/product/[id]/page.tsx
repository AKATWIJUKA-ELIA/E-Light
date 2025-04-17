"use client"
import React, { use } from 'react'
import ProductCard from '@/components/ProductCard/page';
import { Oval } from 'react-loader-spinner'
import useGetProductById from '@/hooks/useGetProductById';
import useGetRelatedProducts from '@/hooks/useGetRelated';
import HeroCard from '@/components/HeroCards/page';

interface PageProps {
        params: Promise<{ id: string }>
      }

const Product = ({params}:PageProps) => {
        const { id } = use(params); 
        const { data: product } = useGetProductById(id); 
        const { data: relatedProducts } = useGetRelatedProducts(product?.product_cartegory);
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
    <div className='mt-32'>
        <ProductCard product={product} />
        <div className=''>
                <div className='ml-10 font-bold text-2xl'>
                        <h2>Related Products</h2>
                </div>
        <div className=' gap-2 grid grid-cols-2 md:grid-cols-5'>
        {relatedProducts? (relatedProducts.map((product, index) => (
                <HeroCard key={product._id} product={product} />
        ))):(
                <Oval
                visible={true}
                            height="40"
                            width="40"
                            color="#0000FF"
                            secondaryColor="#ddd"
                            ariaLabel="oval-loading"
                            wrapperClass=""
                />
        )}
        </div>
        </div>
    </div>
  )
}

export default Product