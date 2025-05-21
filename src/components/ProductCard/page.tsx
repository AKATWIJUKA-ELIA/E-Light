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

const ProductCard: React.FC<ProductProps> = ({ product }) => {
        const carousel = Autoplay({ delay: 10000})
        const[Copied,setCopied] = useState(false)
        const { user } = useGetUserById(product?.product_owner_id)
        console.log("User is ",user)
        const UserEmail = user?.email||""
        const UserName = user?.username|| ""
        const PhoneNumber = user?.phoneNumber|| ""
  const HandleAddToCart = useAddToCart();

  const handleCopy = (link:string) => {
        if (typeof window === "undefined"){
                return
        }
                navigator.clipboard.writeText(link);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              
                
      };
      const handleShare = (link: string,name:string) => {
        if (navigator.share) {
          navigator
            .share({
              title: `"Check out  ${name} on ShopCheap!`,
              text: "Hey, take a look at this:",
              url: link,
            })
            .then(() => console.log("Shared successfully"))
            .catch((error) => console.error("Error sharing", error));
        } else {
                handleCopy(link)
                alert("Sharing not supported on this device. Try copying the link instead.");
        }
      };

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white mt-5 shadow-md overflow-hidden p-4 dark:bg-dark ">
      
      {/* Product Image */}
      <div className="flex flex-col w-full lg:w-3/5 bg-slate-50 shadow-md rounded-lg p-4 dark:bg-gray-900">
        <div className="mx-auto rounded-lg h-64 sm:h-72 md:h-80 w-full relative overflow-hidden">
        <Carousel opts={{align: "start",loop: true,}} plugins={[carousel]} className="  w-full">
        <CarouselContent className=''>
  {product.product_image.map((image, index) => (
    <CarouselItem key={index}>
      <div className="p-1">
        <Card className="h-auto bg-transparent">
          <CardContent className="relative  bg-transparent flex items-center justify-center p-6 h-64 overflow-hidden rounded-lg">
            {/* Image */}
            <Image
              src={image}
        //       height={100}
        //       width={450}
              alt={product.product_name}
             fill
             className='object-cover w-full h-full'
            />

            {/* Text Overlay */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 text-white text-xl font-semibold p-4">
              {product.product_name}
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
        </div>

        {/* Small Images */}
        <div className="flex mt-5 gap-3 mx-auto overflow-x-auto w-full">
          {product ? (
            product.product_image?.map((item: string) => (
              <div key={item} className="min-w-[80px] h-[80px] border border-blue-600 rounded-lg overflow-hidden">
                <Image
                  src={item}
                  alt={product.product_name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ))
          ) : (
            <Oval
              visible={true}
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="oval-loading"
            />
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col w-full lg:w-2/5 bg-white shadow-md rounded-lg p-4 space-y-4 dark:bg-gray-700">
        <h2 className="text-2xl text-center font-semibold text-gray-900">
          {product.product_name}
        </h2>

        <div className="bg-dark text-white px-4 py-2 rounded-lg text-center">
          <span className="text-xl font-bold">Shs: {product.product_price}</span>
        </div>

        <div>
          <h1 className="text-gray-600 font-bold dark:text-black ">Product Details:</h1>
          <p className="text-sm text-gray-800 dark:text-white ">{product.product_description}</p>
        </div>

        <div className="flex  space-x-2">
                <button
          onClick={() => HandleAddToCart(product)}
          className="bg-blue-600 text-white w-full px-4 py-2 rounded-3xl hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={() => handleShare(`https://shopcheap.vercel.app/product/${product._id}`,`${product.product_name}`)}
          className="bg-gold text-white w-full px-4 py-2 rounded-3xl hover:bg-yellow-700 transition"
        >
          {Copied?"Link copied successfully":"Share "}
        </button>
        </div>
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

export default ProductCard;
