import React, { useState } from "react";
import { Oval } from 'react-loader-spinner'
import useAddToCart from '../../hooks/useAddToCart';
import { Card, CardContent } from "@/components/ui/card"
import useGetUserById from "@/hooks/useGetUserById"
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
        const { user } = useGetUserById(product?.product_owner_id)
        console.log("User is ",user)
        const UserEmail = user?.email||""
        const UserName = user?.username|| ""
        const PhoneNumber = user?.phoneNumber|| ""



  return (
    <div className="flex flex-col lg:flex-row gap-2 bg-white mt-5 shadow-md overflow-hidden p-4 dark:bg-dark ">
      <ProductReview productId={product._id} productName={product.product_name} />
    </div>
  );
};

export default ProductReviews;
