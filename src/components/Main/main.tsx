'use client'
import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { FaOpencart } from "react-icons/fa6";
import ProductSkeleton from '../ProductsSkeleton/page'
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
        
        const [products, setproducts] = useState<Product[]>([]);
        const product = useQuery(api.products.getProducts)
        
        useEffect(() => {
                if (product) {
                    setproducts(product)
                }
                  console.log("data is ",products)
        }, [products]);
        console.log("Url is",products[1])

        const truncateString = (text: string, maxLength: number): string => {
                return text.length > maxLength ? text.slice(0, maxLength) + " . . ." : text;
              };
        
              
        
  return (
    <div className='bg-blue-100 flex  grid grid-cols-5 p-2 gap-2  '>
        
        {products? (products.map((data, index) => 
        <div
        key={index}
        className="bg-white flex flex-col rounded-lg shadow-md overflow-hidden "
      >
        {/* Product Image */}
        <Link href={`/product/${data._id}`} className="w-full">
          <div className="relative w-full h-64 flex items-center justify-center bg-gray-100 transition-transform duration-200 hover:scale-105">
            <Image
              src={data.product_image}
              alt={data.product_name}
              width={900}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      
        {/* Product Details */}
        <div className="p-4 flex flex-col gap-2">
          {/* Product Name */}
        
          <h2 className=" flex text-lg font-semibold text-gray-900">
            <Link href={`/product/${data._id}`} className="hover:underline">
              {data.product_name}
            </Link>
          </h2>
          
          <FaOpencart  className='ml-auto -mt-8 text-2xl hover:cursor-pointer font-bold' />
      
          {/* Product Description */}
          <p className="text-gray-600 text-sm">{truncateString(data.product_description, 30)}</p>
      
          {/* Footer (Price & Date) */}
          <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
            <span className="font-semibold text-lg text-black">Shs: {data.product_price? Number(data.product_price).toFixed(2):"loading.."}</span>
            <time dateTime={new Date(data._creationTime).toISOString()}>
              {new Date(data._creationTime).toLocaleDateString()}
            </time>
          </div>
        </div>
      </div>
      
        )):(
                <ProductSkeleton/>
        )}
        
    </div>
  )
}

export default Main