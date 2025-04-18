import React from "react";
import Image from "next/image";
import { Oval } from 'react-loader-spinner'
import useAddToCart from '../../hooks/useAddToCart';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


interface ProductProps {
  product: {
    _id: string;
    product_name: string;
    product_image: string[];
    product_price: number;
    product_description: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
        const carousel = Autoplay({ delay: 10000})
  const HandleAddToCart = useAddToCart();

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white mt-5 shadow-md overflow-hidden p-4">
      
      {/* Product Image */}
      <div className="flex flex-col w-full lg:w-3/5 bg-slate-50 shadow-md rounded-lg p-4">
        <div className="mx-auto rounded-lg h-64 sm:h-72 md:h-80 w-full relative overflow-hidden">
        <Carousel opts={{align: "start",loop: true,}} plugins={[carousel]} className="  w-full">
        <CarouselContent className=''>
  {product.product_image.map((image, index) => (
    <CarouselItem key={index}>
      <div className="p-1">
        <Card className="h-auto bg-transparent">
          <CardContent className="relative  bg-transparent flex items-center justify-center p-6 h-64 overflow-hidden rounded-lg">
            {/* Image */}
            <Image
              src={image}
        //       height={100}
        //       width={450}
              alt={product.product_name}
             fill
             className='object-cover w-full h-full'
            />

            {/* Text Overlay */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 text-white text-xl font-semibold p-4">
              {product.product_name}
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
        </div>

        {/* Small Images */}
        <div className="flex mt-5 gap-3 mx-auto overflow-x-auto w-full">
          {product ? (
            product.product_image?.map((item: string) => (
              <div key={item} className="min-w-[80px] h-[80px] border border-blue-600 rounded-lg overflow-hidden">
                <Image
                  src={item}
                  alt={product.product_name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ))
          ) : (
            <Oval
              visible={true}
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="oval-loading"
            />
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col w-full lg:w-2/5 bg-white shadow-md rounded-lg p-4 space-y-4">
        <h2 className="text-2xl text-center font-semibold text-gray-900">
          {product.product_name}
        </h2>

        <div className="bg-black text-white px-4 py-2 rounded-lg text-center">
          <span className="text-xl font-bold">Shs: {product.product_price}</span>
        </div>

        <div>
          <h1 className="text-gray-600 font-bold">Product Details:</h1>
          <p className="text-sm text-gray-800">{product.product_description}</p>
        </div>

        <div className="flex  space-x-2">
                <button
          onClick={() => HandleAddToCart(product)}
          className="bg-blue-600 text-white w-full px-4 py-2 rounded-3xl hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={() => HandleAddToCart(product)}
          className="bg-blue-600 text-white w-full px-4 py-2 rounded-3xl hover:bg-blue-700 transition"
        >
          Share this Product
        </button></div>
      </div>
    </div>
  );
};

export default ProductCard;
