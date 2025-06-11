import React, { useState } from "react";
import Image from "next/image";
import { Oval } from 'react-loader-spinner'
import useAddToCart from '../../hooks/useAddToCart';
import { Card, CardContent } from "@/components/ui/card"
import useGetUserById from "@/hooks/useGetUserById"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


interface ProductProps {
  product: {
    _id: string;
    product_name: string;
    product_image: string[];
    product_price: string;
    product_description: string;
    product_owner_id:string
  };
}

const ProductReviews: React.FC<ProductProps> = ({ product }) => {
        const carousel = Autoplay({ delay: 10000})
        const[Copied,setCopied] = useState(false)
        const { user } = useGetUserById(product?.product_owner_id)
        console.log("User is ",user)
        const UserEmail = user?.email||""
        const UserName = user?.username|| ""
        const PhoneNumber = user?.phoneNumber|| ""


  return (
    <div className="flex flex-col lg:flex-row gap-2 bg-white mt-5 shadow-md overflow-hidden p-4 dark:bg-dark ">

      {/* Product Details */}
      <div className="flex flex-col w-full lg:w-2/5  shadow-md rounded-lg p-4 space-y-4 dark:bg-gray-700">

        <div className="">
          <span className="text-4xl md:text-5xl font-bold">Ugx: {(parseFloat(product.product_price) || 0).toLocaleString()}</span>
          <span className="text-3xl font-semi-bold text-gray-500 line-through italic">Ugx: { parseFloat(product.product_price)*3}</span>
        </div>

        <div>
          <h1 className="text-gray-600 font-bold dark:text-black ">Product Details:</h1>
          <p className="text-sm text-gray-800 dark:text-white ">{product.product_description}</p>
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-2/5  shadow-md rounded-lg p-4 space-y-4 dark:bg-gray-700">
        <h2 className="text-3xl  font-semibold text-gray-900">
          {product.product_name}
        </h2>
                <div className=" flex flex-col md:flex space-x-2">
                <h1 className=" flex text-gray-600 font-bold">
                        Sellers Details : 
                </h1>
                <ul className="flex flex-col" >
                        <li>
                        <h1  > <span className="font-bold" > UserName </span> : {UserName}</h1>
                        </li>
                        <li>
                        <h1 > <span className="font-bold" > Phone Number : </span>  <a href={`tel:${PhoneNumber}`}>{PhoneNumber}</a>  </h1>
                        </li>
                        <li>
                        <h1   > <span className="font-bold" > Email : </span>  <a href={`mailto: ${UserEmail}`}>{UserEmail}</a></h1>
                        </li>
                </ul>
                

        </div>


      </div>
      
    </div>
  );
};

export default ProductReviews;
