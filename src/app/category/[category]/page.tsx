"use client"
import React, { use } from 'react'
import useGetRelatedProducts from '@/hooks/useGetRelated'
import Categories from '@/components/Category/page'
interface PageProps {
        params: Promise<{ category: string }>
      }
const Category = ({params}:PageProps) => {
        const { category } = use(params);
        const { data: relatedProducts } = useGetRelatedProducts(decodeURIComponent(category));
  return (
        <div className=' mt-36 md:mt-32' >
              <Categories category={category} relatedProducts={relatedProducts ||[]} />
        </div>
  )
}

export default Category