import React from "react";
import Image from "next/image";
import { Oval } from 'react-loader-spinner'
import useAddToCart  from '../../hooks/useAddToCart';

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
        const HandleAddToCart = useAddToCart()

  return (
    <div className="flex gap-20 bg-white rounded-lg border border-black mt-5 h-screen shadow-md overflow-hidden p-4">
      {/* Product Image */}
      <div className="flex flex-col  w-[60%] bg-slate-50 h-[80%] border shadow-md rounded-lg">
      <div  className="flex mx-auto rounded-lg  mt-10 h-[70%] w-[70%] ">
        <Image
          src={product.product_image[0]}
          alt={product.product_name}
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-lg hover:opacity-90 transition"
        />
      </div>
      {/* Small Images */}
     
                   <div className="flex mt-5 mx-auto   w-[70%]">
                        <div className="flex   gap-3 border border-blue-600 rounded-lg  h-[100%] w-[15%]">
                   {product? (product.product_image?.map((item: string) => (
                   <Image
                   key={item} 
                       src={item}
                       alt={product.product_name}
                       width={300}
                       height={300}
                       className="w-full h-full object-cover rounded-lg hover:opacity-90 transition"
                     />
                ))):(
                        <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        />
                )}
                   </div>
                   </div>
        
 
      </div>

      {/* Product Details */}
      <div className=" p-4 flex flex-col w-[40%] bg-white h-[80%] border shadow-md rounded-lg ">
       <div className=" ml-20 h-[10%]  w-[80%] " >
       <h2 className="text-3xl text-center  font-semibold text-gray-900">
        {product.product_name}
        </h2>
       </div>

       <div className="flex ">
          <div className="bg-black text-white px-4 py-2 rounded-lg transition">
          <span className="text-xl font-bold ">Shs : {product.product_price}</span>
          </div>
        </div>
        
        <div className="flex mt-4" >
        <h1 className="" >
                <span className="text-gray-600 font-bold" >Description :</span> {product.product_description}
        </h1>
        </div>
        
        <div className="flex mt-4">          
          <button onClick={()=>HandleAddToCart(product)} className="bg-blue-600 text-white mx-auto w-[80%]  px-4 py-2 rounded-3xl hover:bg-blue-700 hover:cursor-pointer transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
