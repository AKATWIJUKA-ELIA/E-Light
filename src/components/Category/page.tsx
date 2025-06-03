"use client"
import React from 'react'
import HeroCard from '@/components/HeroCards/page'
import ProductsNotFound from '@/components/NoProductsFound/page'
import { Id } from '../../../convex/_generated/dataModel'
interface RelatedProduct {
    _id: Id<"products">;
    _creationTime: number;
    product_embeddings?: number[] | undefined;
    product_cartegory: string;
    product_condition: string;
    product_description: string;
    product_image: string[];
    product_name: string;
    product_owner_id: string;
    product_price: string;
    approved: boolean;
}
interface PageProps {
    relatedProducts: RelatedProduct[];
    category: string;
}
const Categories = ({relatedProducts,category}:PageProps) => {
        
  return (
        <div className=' mt-36 md:mt-32 z-40 inset-0' >
                {
                        (relatedProducts ?? []).length > 0 ? (<div className='flex flex-col ' >
                        <div className='flex flex-col gap-4 mt-5'>
                                <div className='flex'>
                                        <h1 className='text-dark dark:text-white ' >Best Match for &ldquo;<span className='font-bold' >{decodeURIComponent(category)}</span>&ldquo;</h1>
                                </div>
                        </div>

                <div className='grid grid-cols-2 md:grid-cols-5 p-2 gap-2'>
                {relatedProducts?.map((product) => (
                <HeroCard key={product._id} product={product} />
                ))}
        </div>
        </div>):(
                <div className='mt-10  flex'>
                <ProductsNotFound category={category} />
        </div>
        )}
        </div>
  )
}

export default Categories