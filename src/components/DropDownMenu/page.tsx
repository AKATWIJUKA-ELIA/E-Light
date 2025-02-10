import React, { Children } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import football from "../../public/images/nav/sports/football.jpg";
import Image from "next/image";
import { BiX } from 'react-icons/bi';
import { useEffect, useState } from "react";
import Link from "next/link";


interface DropDownMenuProps {
  isvisible: boolean;
  onClose: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ isvisible, onClose,  }) => {
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
                              <div className=" cursor-pointer mr-2 my-5 slider slide--fast">
                                    
                                    <Link href="">
                                          <h1   className='animated font-bold main '  > <span id='main' className='animated current href=""'>Students Life</span></h1> 
                                    </Link>
                              </div>
                              <div className=" cursor-pointer mr-2 my-5  slider slide--slow ">
                                    <h1  className='animated font-bold ' ><span id='payments' className='animated'>Sports</span></h1> 
                              
                              </div>
                              <div className=" cursor-pointer mr-2 my-5  slider slide--slower">
                                    <h1  className='animated font-bold ' >  <span id='why_bugema' className='animated'>Clubs & Associations</span></h1> 
                              </div>
                              <div className=" cursor-pointer mr-2 my-5 slider slide--slowest ">
                                    <h1  className='animated font-bold '> <span className='animated' id='contact'>Student Leadership</span></h1> 
                              </div>                
                              
                        </div>
                  
                </div>
                  
        </div>
      </>
      
  );
};

export default DropDownMenu;