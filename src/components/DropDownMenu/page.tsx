import React, {  useState } from 'react';
import Link from "next/link";
import { BiX } from 'react-icons/bi';
import useGetCategories from '@/hooks/useGetCategories';
import useGetRelatedProducts from '@/hooks/useGetRelated';
import Image from 'next/image';
import { Oval } from 'react-loader-spinner';

interface DropDownMenuProps {
  isvisible: boolean;
  onClose: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ isvisible, onClose,  }) => {
        const [category,setCategory] = useState("")
        const {data:cartegories} = useGetCategories()
        const {data:related} = useGetRelatedProducts(category)
        // console.log("related",related)

// useEffect(()=>{
        
// })
const HandleChange =(cart:string)=>{
        setCategory(cart)
}
      if (!isvisible) return null;

  return (
      <>
        
        <div className="  fade-in  fixed z-40 inset-0 backdrop-blur-lg shadow-lg flex  w-[100%] h-[60%] mt-[7%]   overflow-auto overflow-x-hidden bg-white" id="wrapper" onMouseLeave={onClose} >                  
                     
                     <div id="programs">
   
                           <div className='flex '>
                                 <button 
                                       style={{
                                       borderRadius: '50%',
                                       width: '30px',
                                       height: '30px',
                                       backgroundColor: 'black',
                                       borderColor:'black',
                                       color: 'white',
                                       fontSize: '20px',
                                       textAlign: 'center',
                                       lineHeight: '30px',
                                       position: 'absolute',
                                       right: '70px',
                                       top: '20px',
                                       }}
                                       onClick={onClose}>
                                       <span className="text-white text-xl"><BiX className='text-3xl'/></span>
                                 </button>
   
                           </div> 
   
                           <div  className='flex h-full' id="Categories">

                                <div className="ml-12   h-90 overflow-y-auto  "  > 
                                        {cartegories? (cartegories.map(({_id, cartegory}) =>
                                                <div key={_id} className=" cursor-pointer mr-2  p-2 slider slide--fast hover:bg-gray-100 rounded-lg ">
                                                
                                                <Link href={`/category/${cartegory}`}  onMouseOver={()=>{HandleChange(cartegory)}} onClick={onClose}>
                                                <h1   className='animated  main '  > <span id='main' className='animated current   '>{cartegory}</span></h1> 
                                                </Link>
                                                </div>
                                        )):(<div className="vertical-line ml-2  fade-in "  > Loading . . .  </div>)}
                                
                                
                                </div>
                                <div className='grid grid-cols-2 md:grid-cols-7 p-2 gap-2'>
                                        {!related ? (
                                        <div className="col-span-full flex justify-center items-center h-40">
                                        <Oval
                                                visible={true}
                                                height="40"
                                                width="40"
                                                color="#0000FF"
                                                secondaryColor="#ddd"
                                                ariaLabel="oval-loading"
                                        />
                                        </div>
                                                ) : related.length === 0 ? (
                                                <div className="col-span-full text-center text-gray-500">No results found.</div>
                                                ) : (
                                                related.map((product) => (
                                                <Link key={product._id} href={`/product/${product._id}`} className="w-full">
                                                        <div className='flex flex-col justify-center'>
                                                        <div className="relative w-full h-16 gap-3 flex items-center justify-center bg-transparent transition-transform duration-200 hover:scale-105">
                                                        <Image
                                                        src={
                                                                Array.isArray(product.product_image) && product.product_image.length > 0
                                                                ? product.product_image[0]
                                                                : product.product_image
                                                        }
                                                        alt={product.product_name}
                                                        width={900}
                                                        height={500}
                                                        className="w-full h-full object-cover rounded-lg"
                                                        />
                                                        </div>
                                                        <div className='justify-center text-center'>
                                                        <h1 className='text-sm'>{product.product_name}</h1>
                                                        </div>
                                                        </div>
                                                </Link>
                                                ))
                                                )}
                                                </div>


                        </div>  
                     
                     </div>
                     
               </div>
      </>
      
  );
};

export default DropDownMenu;