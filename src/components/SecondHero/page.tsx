import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const SecondHero = () => {
  return (

<div className="flex  items-center justify-center bg-slate-100 p-20 px-10 gap-3">

  <div className="flex flex-col justify-center gap-8 border  hover:border-gray-300 hover:rounded-md hover:bg-slate-200 p-20 w-[50%] max-w-6xl">

    {/* Carousels Wrapper */}
    <div className="flex gap-4  justify-center  w-full">
        
      {/* Carousel 1 */}
      <div className="flex-1 min-w-0 flex justify-center ">
        <Carousel opts={{ align: "center", loop: true }} className="w-full">
          <CarouselContent>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="h-auto">
                    <CardContent className="flex items-center justify-center p-6 h-64">
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

            {/* Carousel 4 */}
            <div className="flex-1 min-w-0 flex justify-center ">
        <Carousel opts={{ align: "center", loop: true }} className="w-full">
          <CarouselContent>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1 ">
                  <Card className="h-auto">
                    <CardContent className="flex items-center justify-center p-6 h-64">
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


    </div>
  </div>

  <div className="flex flex-col justify-center gap-8 border hover:border-gray-300 hover:rounded-md hover:bg-slate-200 p-20  w-[50%] max-w-6xl">

    {/* Carousels Wrapper */}
    <div className="flex gap-4  justify-center  w-full">

      {/* Carousel 1 */}
      <div className="flex-1 min-w-0 flex justify-center ">
        <Carousel opts={{ align: "center", loop: true }} className="w-full">
          <CarouselContent>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="h-auto">
                    <CardContent className="flex items-center justify-center p-6 h-64">
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

            {/* Carousel 4 */}
            <div className="flex-1 min-w-0 flex justify-center ">
        <Carousel opts={{ align: "center", loop: true }} className="w-full">
          <CarouselContent>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1 ">
                  <Card className="h-auto">
                    <CardContent className="flex items-center justify-center p-6 h-64">
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

    </div>
  </div>
</div>

  )
}

export default SecondHero