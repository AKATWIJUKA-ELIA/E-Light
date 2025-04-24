import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
        product_cartegory: string;
         product_condition: string;
         product_description: string;
         product_image: string;
         product_name: string;
         product_owner_id: string;
         product_price: string;
         _creationTime: number;
         _id: string;
       }

const FisrtHero = () => {
        const carousel = Autoplay({ delay: 10000})
        const carousel1 = Autoplay({ delay: 15000})
        const carousel2 = Autoplay({ delay: 20000})
        const carousel3 = Autoplay({ delay: 16000})
                const [products, setproducts] = useState<Product[]>([]);
                        const product = useQuery(api.products.getProducts)
                        
                        useEffect(() => {
                                if (product) {
                                    setproducts(product)
                                }
                        }, );

        
  return (
        <div className='bg-gradient-to-r from-indigo-100 via-purple-100 to-gold mb-10 ' >
<div>
<h1 className='font-bold'>Categories</h1>
</div>
<div className=' hidden md:grid grid-cols-1 md:grid-cols-1'>
<Carousel opts={{align: "start",loop: true,}} plugins={[carousel]} className="  w-full">
        <CarouselContent className=''>
  {products.map((product, index) => (
    <CarouselItem key={index} className='basis-[300px] shrink-0'>
      <div className="p-1">
        <Card className="h-auto bg-transparent">
          <Link href={`/category/${product.product_cartegory}`} >
          <CardContent className="relative  bg-transparent flex items-center justify-center p-6 h-64 overflow-hidden rounded-lg">
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
              {product.product_cartegory}
            </div>
          </CardContent>
          </Link>
        </Card>
      </div>
    </CarouselItem>
  ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>


</div>
        </div>
  )
}

export default FisrtHero