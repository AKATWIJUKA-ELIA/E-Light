"use client";
import React from 'react'
import DataTable  from "@/sudoComponents/DataTable"
import useGetAllProducts from "@/hooks/useGetAllProducts";

const Approved = () => {
        const { data: products, } = useGetAllProducts();
        const newProducts = products?.filter(product => product.approved)
  return (
    <div className='mt-20' >
        <div className=" px-4 " id="Approved" >
                <DataTable status='Approved' products={newProducts ?? [] } />
              </div>
        </div>
  )
}

export default Approved