import Link from 'next/link'
import Image from 'next/image'
import { MdAddShoppingCart } from "react-icons/md";
import ProductSkeleton from '../ProductsSkeleton/page'
import useAddToCart  from '../../hooks/useAddToCart';
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
       interface HeroCardProps {
        product: Product;
      }

const HeroCard = ({ product }: HeroCardProps) => {
        
         const addToCart = useAddToCart()
        const truncateString = (text: string, maxLength: number): string => {
                return text.length > maxLength ? text.slice(0, maxLength) + " . . ." : text;
              };
  return (
    <div>
         { product?(
                <div
                key={product._id}
                className="bg-transparent flex flex-col rounded-md shadow-m overflow-hidden shadow-xl hover:bg-yellow-100 border hover:border-dark ransition-transform duration-500"
              >
                {/* Product Image */}
                <Link href={`/product/${product._id}`} className="w-full">
                  <div className="relative w-full h-48 flex items-center justify-center bg-transparent   transition-transform duration-200 hover:scale-105">
                    <Image
                      src={Array.isArray(product.product_image) && product.product_image.length > 0 
                        ? product.product_image[0] 
                        : product.product_image}
                      alt={product.product_name}
                      width={900}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              
                {/* Product Details */}
                <div className="p-4 flex flex-col gap-2 ">
                  {/* Product Name */}
                
                  <h2 className=" flex text-lg font-semibold text-gray-900">
                    <Link href={`/product/${product._id}`} className="hover:underline">
                      {product.product_name}
                    </Link>
                  </h2>
                  
                  <MdAddShoppingCart  className='ml-auto text-gold -mt-8 text-2xl hover:cursor-pointer  font-bold' onClick={()=>addToCart(product)} />
              
                  {/* Product Description */}
                  <p className="text-gray-600 text-sm">{truncateString(product.product_description, 30)}</p>
              
                  {/* Footer (Price & Date) */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-500 mt-2">
                    <span className="font-semibold md:text-lg text-dark">Shs: {product.product_price? Number(product.product_price).toFixed(2):"loading.."}</span>
                    <time dateTime={new Date(product._creationTime).toISOString()}>
                      {new Date(product._creationTime).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>
              
                ):(
                        <ProductSkeleton/>
                )
                }
    </div>
  )
}

export default HeroCard