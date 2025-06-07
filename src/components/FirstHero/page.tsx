import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
         product_image: string[];
         product_name: string;
         product_owner_id: string;
         product_price: string;
         _creationTime: number;
         _id: string;
       }
       interface Products {
        product: Product[] | [];
      }
const FisrtHero =  ({product}:Products) => {
        const carousel = Autoplay({ delay: 10000})
                const [products, setproducts] = useState<Product[]>([]);
                        
                        useEffect(() => {
                            if (product) {
                                setproducts(product);
                            }
                        }, [product]);

        
  return (
        <div className='md:bg-gradient-to-r from-indigo-100 via-purple-100 to-gold mb-10 ' >
<div>
<h1 className='hidden md:flex font-bold'>Categories</h1>
<h1 className='flex md:hidden font-bold'>More to like</h1>
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
              src={product.product_image[0] ?? "/placeholder.png"}
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