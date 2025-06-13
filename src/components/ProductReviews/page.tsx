import React, { useState } from "react";
import { Oval } from 'react-loader-spinner'
import { ProductReview } from "@/components/Product/product-reviews"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import Autoplay from "embla-carousel-autoplay"


interface ProductProps {
  product: {
    _id: string;
    product_name: string;
    product_image: string[];
    product_price: string;
    product_description: string;
    product_owner_id:string
  };
}

const ProductReviews: React.FC<ProductProps> = ({ product }) => {

  return (
    <div className="flex flex-col lg:flex-row gap-2 bg-white mt-5 shadow-md overflow-hidden p-4 dark:bg-dark ">
      <ProductReview productId={product._id} productName={product.product_name} />
    </div>
  );
};

export default ProductReviews;
