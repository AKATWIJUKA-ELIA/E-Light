import React, { useEffect, useState } from 'react';
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
import useGetSponsored from '@/hooks/useGetSponsored';
import { Oval } from 'react-loader-spinner';
import { Id } from '../../../convex/_generated/dataModel';

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
  _id: Id<"products">;
}


const MainHero = () => {
  const carousel1 = Autoplay({ delay: 9000 });
  const carousel = Autoplay({ delay: 10000 });
  const [products, setproducts] = useState<Product[]>([]);
  const { sponsored: sponsored } = useGetSponsored();

  const images = [
                {
                name:"Heror",
                src:"https://cheery-cod-687.convex.cloud/api/storage/115cc2cd-79c0-4b3c-bb84-86df5f76e138",
                overlay:"Mid Year Sales Here 😊 "
                },
                {
                        name:"Hero1",
                        src:"https://cheery-cod-687.convex.cloud/api/storage/55199998-af85-4493-af98-d8c3aff3d8dd",
                        overlay:"Grab May Discounts While Offers Last😁🤗"
                },
                
        ]
                        
useEffect(() => {
  if (sponsored && sponsored.length > 0) {
    setproducts(sponsored.filter((item): item is Product => item !== null && item.product_sponsorship?.type==="platinum"),);
  }
}, [sponsored]);
        
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
        {/* <CarouselPrevious />
        <CarouselNext /> */}
        </Carousel>

        {products && products.length > 0 ? (
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
                src={product.product_image[0] ?? ""}
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
        ):(
                <Carousel opts={{align: "start",loop: true}} plugins={[carousel]} className="absolute w-[60%] md:w-[65%] md:left-16  mt-40 md:mt-36  flex items-center justify-center bg-black/40 text-white text-xl font-semibold md:p-2">
        <CarouselContent className=''>
  {Array.from({ length: 7 }).map((_, idx) => (
    <CarouselItem key={idx} className=" basis-[200px] md:basis-[300px] shrink-0">
      <div className="p-1">
        <Card className="h-auto bg-transparent w-full">
          <CardContent className="relative  bg-blue-500 animate-pulse  flex rounded-lg items-center justify-center  h-36 overflow-hidden w-full">
              <div className="flex  opacity-95 w-[100%] h-[100%] items-center justify-center">
                        <div className="flex"><h1 className='text-sm md:text-2xl text-dark  '>Sh</h1></div>
                        <div className="flex">
                                <Oval
                                        visible={true}
                                        height="30"
                                        width="30"
                                        color="#0000FF"
                                        secondaryColor="#FFD700"
                                        ariaLabel="oval-loading"
                                        />
                        </div>
                                        <div className="flex text-sm md:text-2xl text-dark  ">p<span className="text-gold">Cheap</span>.  .  .</div>
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
        )}
 
        </div>
  )
}

export default MainHero