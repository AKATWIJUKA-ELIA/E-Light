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
import Link from 'next/link';

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

const MainHero = () => {
        const carousel1 = Autoplay({ delay: 9000})
        const carousel = Autoplay({ delay: 10000})
        const images = [
                {
                name:"Heror",
                src:"/images/Heror.png",
                overlay:"April Sales Here 😊 "
                },
                {
                        name:"Hero1",
                        src:"/images/Hero.jpg",
                        overlay:"Grab April Discounts While Offers Last😁🤗"
                },
                {
                        name:"Heror",
                        src:"/images/Hero3.jpg",
                        overlay:"Different Categories For Grabs😂😮"
                },
            

        ]
                const [products, setproducts] = useState<Product[]>([]);
                        const product = useQuery(api.products.getProducts)
                        
                        useEffect(() => {
                                if (product) {
                                    setproducts(product)
                                }
                        }, );

        
  return (
        <div className= ' bg-pink-200   mt-32 grid grid-cols-1  '  >

        <Carousel opts={{align: "start",loop: true}} plugins={[carousel1]} className="h-full">
        <CarouselContent className='h-full'>
  {images.map((image, index) => (
    <CarouselItem key={index} className="h-full">
      <div className="h-full  ">
        <Card className="h-auto bg-transparent w-full">
          <CardContent className="relative  bg-transparent flex  items-center justify-center  h-80 overflow-hidden w-full">
            {/* Image */}
        
            <Image
              src={image.src}
        //       height={100}
        //       width={450}
              alt={image.name}
             fill
             className='object-cover w-full h-full  '
            />
            <div className="absolute top-7 md:left-16 flex items-center justify-center bg-black/40 text-white text-3xl font-semibold p-4">
              {image.overlay}
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

        <Carousel opts={{align: "start",loop: true}} plugins={[carousel]} className="absolute w-[60%] md:w-[65%] md:left-16  mt-40 md:mt-36  flex items-center justify-center bg-black/40 text-white text-xl font-semibold md:p-2">
        <CarouselContent className=''>
  {products.map((product, index) => (
    <CarouselItem key={index} className=" basis-[200px] md:basis-[300px] shrink-0">
      <div className="p-1">
        <Card className="h-auto bg-transparent w-full">
          <CardContent className="relative  bg-transparent flex rounded-lg items-center justify-center p-6 h-36 overflow-hidden w-full">
            {/* Image */}
            <Link href={`/category/${product.product_cartegory}`} >
            <Image
              src={product.product_image}
        //       height={100}
        //       width={450}
              alt={product.product_name}
             fill
             className='object-cover w-full h-full rounded-lg '
            />
            

            {/* Text Overlay */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 text-white text-xl font-semibold p-4">
              {product.product_name}
            </div>
            </Link>
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
  )
}

export default MainHero