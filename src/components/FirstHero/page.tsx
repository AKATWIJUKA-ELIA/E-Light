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
        <div className='bg-pink-300 ' >
        <Carousel className="w-full ml-[40%] max-w-xs">
                <CarouselContent className=''  >
                        {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                        <div className="p-1">
                        <Card>
                                <CardContent className="flex aspect-square items-center border border-black rounded-lg justify-center p-6">
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