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
//     <div className='flex  my-14  items-center justify-center bg-blue-100 ' >
        
//        <div className='flex flex-col  justify-center gap-8  bg-green-300' >
//        <div className='flex text-center  bg-black' ><h1 className='text-3xl font-bold ' >Quick Sales</h1></div>
//         <div className='flex gap-4  py-6  justify-center bg-blue-600' >

//                 <div className='flex justify-center  bg-blue-900  ' >
//                 <Carousel opts={{
//                         align: "center",
//                         loop: true,
                        
                        
//                 }} className="  w-[70%]">
//                 <CarouselContent>
//                         {Array.from({ length: 6 }).map((_, index) => (
//                         <CarouselItem key={index}>
//                         <div className="p-1">
//                         <Card className='h-auto' >
//                                 <CardContent className="flex  items-center justify-center p-6  h-64" >
//                                 <span className="text-4xl font-semibold">{index + 1}</span>
//                                 </CardContent>
//                         </Card>
//                         </div>
//                         </CarouselItem>
//                         ))}
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//                 </Carousel>

//                 </div>

//                 <div className='flex justify-center  bg-pink-900' >
//                 <Carousel opts={{
//                         align: "start",
//                         loop: true,
                        
                        
//                 }} className="  w-[70%] ">
//                 <CarouselContent>
//                         {Array.from({ length: 6 }).map((_, index) => (
//                         <CarouselItem key={index}>
//                         <div className="p-1">
//                         <Card className='h-auto' >
//                                 <CardContent className="flex  items-center justify-center p-6 h-64" >
//                                 <span className="text-4xl font-semibold">{index + 1}</span>
//                                 </CardContent>
//                         </Card>
//                         </div>
//                         </CarouselItem>
//                         ))}
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//                 </Carousel>
//                 </div >

//                 <div className='flex justify-center  bg-green-900 ' >
//                 <Carousel opts={{
//                         align: "center",
//                         loop: true,
                        
                        
//                 }} className="  w-[70%]">
//                 <CarouselContent >
//                         {Array.from({ length: 6 }).map((_, index) => (
//                         <CarouselItem key={index}  >
//                         <div className="p-1 bg-black ">
//                         <Card className='h-auto ' >
//                                 <CardContent className="flex   items-center justify-center p-6 h-64" >
//                                 <span className="text-4xl font-semibold">{index + 1}</span>
//                                 </CardContent>
//                         </Card>
//                         </div>
//                         </CarouselItem>
//                         ))}
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//                 </Carousel>
//                 </div >
      

//         </div>
//        </div>
//     </div>
<div className="flex  items-center justify-center bg-blue-200">
  <div className="flex flex-col justify-center gap-8  w-full max-w-6xl">
    {/* Title */}
    <div className="flex justify-center text-center p-4">
      <h1 className="text-3xl font-bold text-black">Sponsored</h1>
    </div>

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

      {/* Carousel 2 */}
      <div className="flex-1 min-w-0 flex justify-center ">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
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

      {/* Carousel 3 */}
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

            {/* Carousel 5 */}
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