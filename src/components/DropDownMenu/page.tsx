import React from 'react';
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api'
import { BiX } from 'react-icons/bi';


interface DropDownMenuProps {
  isvisible: boolean;
  onClose: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ isvisible, onClose,  }) => {

        const cartegories = useQuery(api.cartegories.getCartegories);


      if (!isvisible) return null;

  return (
      <>
        
        <div className="  fade-in fixed z-40 inset-0 backdrop-blur-lg flex  w-[100%] h-[60%] mt-[7%]   overflow-auto overflow-x-hidden bg-white" id="wrapper" onMouseLeave={onClose} >                  
                     
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
   
                           <div id="Categories">

                                <div className="vertical-line ml-12  fade-in "  > 
                                        {cartegories? (cartegories.map(({_id, cartegory}) =>
                                                <div key={_id} className=" cursor-pointer mr-2  p-2 slider slide--fast hover:bg-gray-100 ">
                                                
                                                <Link href={`/category/${cartegory}`} onClick={onClose}>
                                                <h1   className='animated  main '  > <span id='main' className='animated current   '>{cartegory}</span></h1> 
                                                </Link>
                                                </div>
                                        )):(<div className="vertical-line ml-2  fade-in "  > Loading . . .  </div>)}
                                
                                
                                </div>

                        </div>  
                     
                     </div>
                     
               </div>
      </>
      
  );
};

export default DropDownMenu;