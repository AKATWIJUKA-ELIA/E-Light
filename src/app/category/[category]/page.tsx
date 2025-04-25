"use client"
import React, { use } from 'react'
import useGetRelatedProducts from '@/hooks/useGetRelated'
import HeroCard from '@/components/HeroCards/page'
import { Input } from '@/components/ui/input'
import ProductsNotFound from '@/components/NoProductsFound/page'
interface PageProps {
        params: Promise<{ category: string }>
      }
const Category = ({params}:PageProps) => {
        const { category } = use(params);
        const { data: relatedProducts } = useGetRelatedProducts(decodeURIComponent(category));
  return (
        <div className=' mt-36 md:mt-32' >
                {
                        (relatedProducts ?? []).length > 0 ? (<div className='flex flex-col ' >
                        <div className='flex flex-col gap-4'>
                                <div className='flex w-[60%]'>
                                <Input placeholder='Search' />
                                </div>
                                <div className='flex'>
                                        <h1 className='text-dark ' >Best Match for &ldquo;<span className='font-bold' >{decodeURIComponent(category)}</span>&ldquo;</h1>
                                </div>
                        </div>

               
                
                <div className='grid grid-cols-2 md:grid-cols-5 p-2 gap-2'>
                {relatedProducts?.map((product?) => (
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

export default Category