import React, { Children } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import football from "../../public/images/nav/sports/football.jpg";
import Image from "next/image";
import { BiX } from 'react-icons/bi';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api'


interface DropDownMenuProps {
  isvisible: boolean;
  onClose: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ isvisible, onClose,  }) => {

        const cartegories = useQuery(api.cartegories.getCartegories);


      if (!isvisible) return null;
const handleclose = (e: { target: { id: string; }; })=>{
      
      if( e.target.id === 'wrapper ') onClose();
      document.querySelector('.active')?.classList.remove('active');
      
}

  return (
      <>
        

        <div className="  fade-in fixed z-40 inset-0 backdrop-blur-sm flex ml-[1%] mt-[7%] w-[20%] h-[60%] mt-[10%] border border-black rounded-lg overflow-auto overflow-x-hidden bg-white" id="wrapper" onMouseLeave={onClose} >                  
                     
                <div id="Categories">

                        <div className="vertical-line ml-2  fade-in "  > 
                                {cartegories? (cartegories.map(({_id, cartegory}) =>
                                <div key={_id} className=" cursor-pointer mr-2 my-5 slider slide--fast">
                                    
                                <Link href="">
                                      <h1   className='animated font-bold main '  > <span id='main' className='animated current href=""'>{cartegory}</span></h1> 
                                </Link>
                          </div>
                                )):(<div className="vertical-line ml-2  fade-in "  > Loading . . .  </div>)}
                              
                              
                        </div>
                  
                </div>
                  
        </div>
      </>
      
  );
};

export default DropDownMenu;