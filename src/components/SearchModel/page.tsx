import React from 'react';
import Link from "next/link";
import { BiSearch } from 'react-icons/bi';

interface Product {
        _id: string;
        product_name: string;
        product_cartegory: string;
        // Add other fields as needed
      }

interface SearchModel {
  onClose: () => void;
  products:Product[];
}


const SearchModel: React.FC<SearchModel> = ({ onClose,products  }) => {

  return (
      <>
        
                <div className="  fade-in fixed ml-[10%] z-40 inset-0 backdrop-blur-lg shadow-lg shadow-gray-400 flex rounded-3xl w-[70%] h-[50%] mt-[7%]   overflow-auto overflow-x-hidden bg-slate-100" id="wrapper" onMouseLeave={onClose} >                  
                     
                <div className=" mx-auto px-5  fade-in w-full gap-4"  > 
                                <div className='flex'>
                                        <h1 className='font-bold'>
                                                Related Searches
                                        </h1>
                                </div>
                        <div className='flex flex-col w-full '>
                        {products ? (
                                products.map((product) => (
                                <div
                                key={product._id}
                                className="flex cursor-pointer w-full rounded-lg mr-2 p-2 slider slide--fast hover:bg-gray-200"
                                >
                                <Link href={`/category/${encodeURIComponent(String(product.product_cartegory))}`}  className='flex gap-2' onClick={onClose}>
                                <BiSearch className='flex  mt-2'/>
                                        <h1 className=" flex  animated main">
                                        <span id="main" className="animated current">
                                        {product.product_cartegory}
                                        </span>
                                        </h1>
                                </Link>
                                </div>
                                ))
                                ) : (
                                <div className="vertical-line ml-2 fade-in">Loading . . .</div>
                                )}
                        </div>


                        </div>
               </div>
      </>
      
  );
};

export default SearchModel;