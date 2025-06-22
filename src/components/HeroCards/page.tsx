import Link from 'next/link'
import Image from 'next/image'
import { MdAddShoppingCart } from "react-icons/md";
import ProductSkeleton from '../ProductsSkeleton/page'
import useAddToCart  from '../../hooks/useAddToCart';
import { useEffect, useState } from 'react';
// import { AiTwotoneLike,AiTwotoneDislike  } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
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
         _id: string;
       }
       interface HeroCardProps {
        product: Product | null;
      }

const HeroCard = ({ product }: HeroCardProps) => {
        // console.log("product", product)
         const addToCart = useAddToCart()
         const [productData, setProductData] = useState<Product | null>(product)
        const truncateString = (text: string, maxLength: number): string => {
                return text.length > maxLength ? text.slice(0, maxLength) + " . . ." : text;
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
            className="bg-transparent flex flex-col rounded-md shadow-m overflow-hidden shadow-xl hover:bg-yellow-100 border  transition-transform duration-500   dark:hover:bg-gray-900 dark:border-black"
          >

                <div className="fixed z-50 items-center justify-between p-4">
                  <div className="flex items-">
                    <CiBookmark className="text-3xl bg-gray-500 rounded-md  text-green-500 hover:text-gray-700 cursor-pointer" />
                    share
                  </div>
                </div>
            {/* Product Image */}
            <Link href={`/product/${productData._id}`} className="w-full">
              <div className="relative w-full h-48 flex items-center justify-center bg-transparent transition-transform duration-200 hover:scale-105">
                <Image
                  src={
                     Array.isArray(productData.product_image)
                      ? (productData.product_image.length > 0 ? productData.product_image[0] : "")
                      : productData.product_image
                  }
                  alt={productData.product_name}
                  width={900}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
      
            {/* Product Details */}
            <div className="p-4 flex flex-col gap-2">
              {/* Product Name */}
              <h2 className="flex text-lg font-semibold text-gray-900 dark:text-white">
                <Link href={`/product/${productData._id}`} className="hover:underline">
                  {productData.product_name}
                </Link>
              </h2>
      
              {/* Add to Cart Icon */}
              <MdAddShoppingCart
                className="ml-auto text-gold -mt-8 text-2xl hover:cursor-pointer font-bold dark:text-yellow-400"
                onClick={() => addToCart(productData)}
              />
      
              {/* Product Description */}
              <p className="text-gray-600 text-sm dark:text-gray-300">
                {truncateString(productData.product_description, 30)}
              </p>
      
              {/* Footer (Price & Date) */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-500 mt-2 dark:text-gray-400">
                <span className="font-semibold md:text-lg text-dark dark:text-gray-100">
                  Shs: {productData.product_price ? Number(productData.product_price).toFixed(2) : "loading.."}
                </span>
                <time dateTime={new Date(productData._creationTime).toISOString()}>
                  {new Date(productData._creationTime).toLocaleDateString()}
                </time>
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