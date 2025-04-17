import React, { useEffect, useState } from 'react';
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';

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

const MainHero = () => {
        const carousel = Autoplay({ delay: 10000})

                const [products, setproducts] = useState<Product[]>([]);
                        const product = useQuery(api.products.getProducts)
                        
                        useEffect(() => {
                                if (product) {
                                    setproducts(product)
                                }
                                  console.log("data is ",products)
                        }, );

        
  return (
        <div className='bg-pink-200  grid grid-cols-2  mt-32 ' >

        <div className='grid grid-cols-2 h  '>
        <Carousel opts={{align: "start",loop: true,}} plugins={[carousel]} className=" ">
        <CarouselContent className=''>
  {products.map((product, index) => (
    <CarouselItem key={index}>
      <div className="p-1">
        <Card className="h-auto bg-transparent w-full">
          <CardContent className="relative  bg-transparent flex items-center justify-center p-6 h-48 overflow-hidden w-full">
            {/* Image */}
            <Image
              src={product.product_image}
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

        <div className='flex'>
                BEST ON DISCOUNTS
        </div>

        </div>
  )
}

export default MainHero