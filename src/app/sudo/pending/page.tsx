"use client";
import React from 'react'
import DataTable from '@/sudoComponents/DataTable';
import useGetAllProducts from '@/hooks/useGetAllProducts';

const Pending = () => {
        const { data: products, } = useGetAllProducts();
        const newProducts = products?.filter(product => !product.approved)
    const finalProducts = newProducts?.map((product) => ({
        ...product,
        product_image: Array.isArray(product.product_image)
            ? product.product_image.filter((img): img is string => typeof img === 'string')
            : typeof product.product_image === 'string' ? [product.product_image] : []
    }));

  return (
    <div className='mt-20' >
        <div className=" px-4 " id="pending" >
                <DataTable status='Pending'  products={finalProducts ?? [] } />
              </div>
        </div>
  )
}

export default Pending