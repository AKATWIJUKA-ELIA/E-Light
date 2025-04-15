import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';

const FisrtHero = () => {

        const Images: string[] = [
                '/images/001_LandCruiser250.jpg',
                '/images/002_LandCruiser250.jpg',
                '/images/004_LandCruiser250 (1).jpg',
                '/images/007_LandCruiser250FE.jpg',
                "/images/008_LandCruiser250FE.jpg"
        ]

        
  return (
        <div className='bg-pink-200 rounded-lg mt-32 ' >
                <Carousel opts={{
        align: "start",
        loop: true,
        
        
      }} className="  w-[90%] ml-[5%]  ">
      <CarouselContent>
        {Images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className='h-auto' >
                <CardContent className="flex   items-center justify-center p-6 h-64" >
                  <Image src={img} height={100} width={450} content='fill' alt='first'></Image>
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

export default FisrtHero