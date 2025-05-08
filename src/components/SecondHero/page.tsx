import React, { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import '../../../public/styles/styles.css'
import HeroCard from '../HeroCards/page'
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
const SecondHero = () => {
        const carousel = Autoplay({ delay: 5000}) // 3s delay, keep playing after user interaction
        const carousel1 = Autoplay({ delay: 3300})
        const carousel2 = Autoplay({ delay: 4000})
        const carousel3 = Autoplay({ delay: 6000})

        const [products, setproducts] = useState<Product[]>([]);
                const product = useQuery(api.products.getProducts)
                
                useEffect(() => {
                        if (product) {
                            setproducts(product)
                        }
                        //   console.log("data is ",products)
                }, [product]);

                
  return (

<div className='flex flex-col dark:bg-black ' >

      <div className='flex justify-center ' >
        <h1 className='hidden md:flex text-3xl font-bold mt-10 text-gray-900 dark:text-gold'>
                Sponsored <span className='text-gold dark:text-white ' >  Products</span>
        </h1>
        </div>  

 <div className="hidden md:flex  items-center justify-center   bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100  p-10 px-10 gap-3 dark:bg-gray-900 dark:bg-none   ">

 <div className="flex flex-col justify-center gap-8 border border-gray-200 shadow-lg  hover:bg-white transition-colors duration-[10000ms] ease-in-out p-20 w-[50%] max-w-6xl  dark:hover:bg-gray-800 dark:border-gray-600 ">

{/* Carousels Wrapper */}
<div className="flex flex-col gap-3 ">
    <div className='flex justify-center -mt-3 '>
        <h1 className='font-bold text-2xl  ' ><span className='text-gold'>Daily</span> Deals</h1>
    </div>
 <div className=' flex  gap-4  justify-center  w-full '>
          {/* Carousel 1 */}
  <div className="flex-1 min-w-0 flex justify-center  ">
    <Carousel opts={{ align: "center", loop: true }} plugins={[carousel]} className="w-full ">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product._id} >
            <div className="p-1">
            <HeroCard key={product._id} product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>

        {/* Carousel 4 */}
 <div className="flex-1 min-w-0 flex justify-center  ">
    <Carousel opts={{ align: "center", loop: true }} plugins={[carousel1]} className="w-full">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product._id} >
            <div className="p-1">
            <HeroCard key={product._id} product={product} />
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

<div className="flex flex-col justify-center gap-8 border border-gray-100 shadow-lg  hover:bg-white transition-colors duration-[10000ms] ease-in-out p-20  w-[50%] max-w-6xl  dark:hover:bg-gray-800 dark:border-gray-600 ">

{/* Carousels Wrapper */}
<div className="flex flex-col gap-3">

<div className='flex justify-center -mt-3 '>
        <h1 className='font-bold text-2xl  ' >Best <span className='text-gold'>Sellers</span></h1>
    </div>

<div className='flex gap-4  justify-center  w-full'>
          {/* Carousel 1 */}
  <div className="flex-1 min-w-0 flex justify-center ">
    <Carousel opts={{ align: "center", loop: true }} plugins={[carousel2]} className="w-full">
    <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product._id} >
            <div className="p-1">
            <HeroCard key={product._id} product={product} />
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
    <Carousel opts={{ align: "center", loop: true }} plugins={[carousel3]}  className="w-full">
    <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product._id} >
            <div className="p-1">
            <HeroCard key={product._id} product={product} />
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

 </div>

{/* Mobile Section */}
 <div className=" flex md:hidden  items-center justify-center bg-gray-50 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100  ">

<div className="flex flex-col justify-center gap-2 border border-gray-200 shadow-lg  hover:bg-gray-200 transition-colors duration-[10000ms] ease-in-out p-2 w-full">

{/* Carousels Wrapper */}
<div className="flex flex-col gap-3 ">
   <div className='flex justify-center -mt-3 '>
       <h1 className='font-bold text-2xl  ' ><span className='text-gold'>Daily</span> Deals</h1>
   </div>
<div className=' flex  gap-4  justify-center  w-full '>
         {/* Carousel 1 */}
 <div className="flex-1 min-w-0 flex justify-center  ">
   <Carousel opts={{ align: "center", loop: true }} plugins={[carousel]} className="w-full ">
     <CarouselContent>
       {products.map((product) => (
         <CarouselItem key={product._id} className='basis-[250px] shrink-0'>
           <div className="p-1">
           <HeroCard key={product._id} product={product} />
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

</div>

</div>

  )
}

export default SecondHero