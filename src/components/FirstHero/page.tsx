import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const FisrtHero = () => {

        
  return (
        <div className='bg-pink-200  ' >
                <Carousel opts={{
        align: "start",
        loop: true,
        
        
      }} className="  w-[90%] ml-[5%]  ">
      <CarouselContent>
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className='h-auto' >
                <CardContent className="flex   items-center justify-center p-6 h-64" >
                  <span className="text-4xl font-semibold">{index + 1}</span>
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