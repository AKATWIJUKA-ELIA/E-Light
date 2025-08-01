import Link from 'next/link'
import Image from 'next/image'
import { MdAddShoppingCart } from "react-icons/md";
import ProductSkeleton from '../ProductsSkeleton/page'
import useAddToCart  from '../../hooks/useAddToCart';
import { useEffect, useState } from 'react';
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
       interface HeroCardProps {
        product: Product | null;
      }

const HeroCard = ({ product }: HeroCardProps) => {
        

         const addToCart = useAddToCart()
         const [productData, setProductData] = useState<Product | null>(product)
        const truncateString = (text: string, maxLength: number): string => {
                return text.length > maxLength ? text.slice(0, maxLength) + ".." : text;
              };
              useEffect(() => {
                if (product) {
                        setProductData(product)
                }
              }, [product])

  return (
        <div  >
        {productData  ? (
          <div
            key={productData._id}
            className=" flex flex-col  rounded-3xl  overflow-hidden shadow-xl  border
               hover:scale-[103%]    transition-transform duration-500   dark:hover:bg-gray-900 dark:border-black "
          >

           
            {/* Product Image */}
            <Link href={`/product/${productData._id}`} className="w-full flex rounded-lg">
              <div className="relative rounded-lg w-full h-48 flex items-center justify-center bg-transparent transition-transform duration-200 p-4">
                <Image
                  src={
                     Array.isArray(productData.product_image)
                      ? (productData.product_image.length > 0 ? productData.product_image[0] : "")
                      : productData.product_image
                  }
                  alt={productData.product_name}
                  width={900}
                  height={500}
                  className="w-full h-full object-cover p- rounded-3xl  hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
      
            {/* Product Details */}
            <div className="px-4  flex flex-col gap-2">
              {/* Product Name */}
              <h2 className="flex text-lg font-semibold text-gray-900 dark:text-white">
                <Link href={`/product/${productData._id}`} className="hover:underline">
                  {truncateString(productData.product_name, 18)}
                </Link>
              </h2>
      
              {/* Add to Cart Icon */}
              <MdAddShoppingCart
                className="ml-auto text-gold -mt-8 text-2xl hover:cursor-pointer font-bold dark:text-yellow-400"
                onClick={() => addToCart(productData)}
              />
      
              {/* Product Description */}
              <p className="text-gray-600 text-sm dark:text-gray-300">
                {truncateString(productData.product_description, 20)}
              </p>
      
              {/* Footer (Price & Date) */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-500 mt-2 dark:text-gray-400">
                <span className="font-semibold md:text-lg text-dark dark:text-gray-100">
                  Shs: {productData.product_price ? Number(productData.product_price).toFixed(2) : "loading.."}
                </span>
                {/* <time dateTime={new Date(productData._creationTime).toISOString()}>
                  {new Date(productData._creationTime).toLocaleDateString()}
                </time> */}
              </div>
            </div>

          </div>
        ) : (
                <ProductSkeleton/>
        )}
      </div>
  )
}

export default HeroCard