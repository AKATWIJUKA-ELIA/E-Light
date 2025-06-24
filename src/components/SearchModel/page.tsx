import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { BiSearch } from 'react-icons/bi';
import { Oval } from 'react-loader-spinner';
import {useData} from  '../../app/DataContext';


interface SearchModel {
  onClose: () => void;
  Focused:boolean
  searchTerm: string;
}


const SearchModel: React.FC<SearchModel> = ({ onClose,searchTerm,Focused  }) => {
        const { data } = useData();
        const [filteredProducts, setFilteredProducts] = useState(data.Products.product || []);

         useEffect(() => {
                        const results = data.Products.product?.filter((product) =>
                                product.product_cartegory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.product_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                        if(results && results.length>0){
                                setFilteredProducts(results);
                        }else
                        setFilteredProducts([]);}, [searchTerm, data.Products.product]);

        if (!Focused) return null;

       
  return (
        <div className="  fade-in fixed md:ml-[10%] z-40 inset-0 backdrop-blur-lg shadow-lg shadow-gray-400 flex rounded-3xl md:w-[70%] h-[50%] mt-[38%] md:mt-[7%]   overflow-auto overflow-x-hidden bg-slate-100 dark:bg-dark dark:shadow-gray-800 " onMouseLeave={onClose} >                  
                     
        <div className=" mx-auto px-5  fade-in w-full gap-4"  > 
                        <div className='flex'>
                                <h1 className='font-bold'>
                                        Related Searches
                                </h1>
                        </div>
                <div className='flex flex-col w-full '>
                {filteredProducts && filteredProducts.length>0 ? (
                        filteredProducts.map((product) => (
                                <Link key={product._id} href={`/category/${encodeURIComponent(String(product.product_cartegory))}`} onClick={onClose}  className='flex gap-2' >
                        <div className="flex cursor-pointer w-full rounded-lg mr-2 p-2  slider slide--fast hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                                <h1 className=" flex  animated main">
                                <span id="main" className="animated current">
                                {product.product_name }
                                </span>
                                </h1>
                                <BiSearch className='flex  mt-2 text-2xl md:ml-[80%]'/>
                        </div>
                        </Link>
                        ))
                        ) : (
                                <div className="flex gap-4 h-full">
                                        <Oval
                                        visible={true}
                                        height="40"
                                        width="40"
                                        color="#0000FF"
                                        secondaryColor="#FFD700"
                                        ariaLabel="oval-loading"
                                />
                                Loading . . .
                                </div>
                        // <div className="vertical-line ml-2 fade-in"><h1 className='text-black dark:text-white' >  Sorry!!!, we could&apos;nt find any results for your search. . .</h1></div>

                        )}
                </div>


                </div>
       </div>
      
  );
};

export default SearchModel;