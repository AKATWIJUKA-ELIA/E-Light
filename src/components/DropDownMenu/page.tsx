import React from 'react';
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api'
import Image from 'next/image';
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
        
        <div className="  fade-in fixed z-40 inset-0 backdrop-blur-lg flex  w-[100%] h-[60%] mt-[8.4%]   overflow-auto overflow-x-hidden bg-white" id="wrapper" onMouseLeave={onClose} >                  
                     
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
                                                
                                                <Link href="">
                                                <h1   className='animated  main '  > <span id='main' className='animated current   '>{cartegory}</span></h1> 
                                                </Link>
                                                </div>
                                        )):(<div className="vertical-line ml-2  fade-in "  > Loading . . .  </div>)}
                                
                                
                                </div>

                        </div>  
                     
                     </div>
                     {/*###=============== A  C  C  O  M  M  O  D  A  T  I  O  N ================###*/}
                     <div className=" ml-[5%] my-12 items-center  fade-in-slow h-[60%] w-[20%] " id='courses' > 
                           <ul>
                           <li>
                                 <div className="mr-2 my-5  ">
                                 <Link href={'/studentlife'}>
                                 <h1  style={{ fontSize: '15px',cursor:"pointer", marginRight:'5px'}} onClick={onClose} className='schools text-black font-bold' > Students Life </h1> 
                                 </Link>
                                 </div>
                                 </li>
   
                                 <li>
                                 <div className="mr-2 my-5  ">
                                 
                                 <h1  style={{ fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold' > Culture </h1> 
                                 
                                 </div>
                                 </li>
                                 
                                 <li>
                                 <div className="mr-2 my-5 fade-in-slow  ">
                                 <Link href={'/religious/religious'}>
                                       <h1 onClick={onClose} style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold'>Religious Matters</h1> 
                                 </Link>
                                    </div>   
                                 <div className="mr-2 my-5 slider slide--slow ">
                                       <Link href={'/news'}>
                                             <h1 onClick={onClose} style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold'>News</h1>
                                       </Link>
                                 </div>
                                 </li>
                                 
                                 <li>
   
   
                                 <div className="mr-2 my-5 slider slide--fast ">
                                        
                                       <Link href={'/events'}>
                                             <h1  onClick={onClose}  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold'> Events</h1>
                                       </Link>
   
                                 </div>
                                 </li>
                                 
                           </ul>
                           
                     </div>
                     
   
   
                                 {/*###=============== S  P  O  R  T  S ================###*/}
   
                     <div className=" fade-in ml-24 my-24 hidden "  id='fees'> 
                           <ul className='ml-10 my-20'>
                                 <li>
                                 <div className="mr-2 my-5 ">
                                 <Link href="/sports/football">
                                   <h1  style={{ fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold'  > Football </h1> 
                                 </Link>
                                 </div>
                                 </li>
                                 <li>
                                 <div className="mr-2 my-5  ">
                                 <Link href="/sports/netball">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold' >Net ball</h1> 
                                 </Link>
                                 </div>
                                 </li>
                                 <li>
                                 <div className="mr-2 my-5  ">
                                 <Link href="/sports/volleyball">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold' > Volley </h1> 
                                 </Link>
                                 </div>
                                 </li>
                                 <li>
                                 <div className="mr-2 my-5  ">
                                 <Link href="/sports/woodball">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold' > Wood ball</h1>
                                 </Link>
                                 </div>
                                 </li>
   
                                 <li>
                                 <div className="mr-2 my-5  ">
                                 <Link href="/sports/basketball">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold' >Basket</h1> 
                                 </Link>
                                 </div>
                                 </li>
                                 <li>
                                 <div className="mr-2 my-5  ">
                                 <Link href="/sports/tabletenis">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold' >Table Tenis</h1> 
                                 </Link>
                                 </div>
                                 </li>
    
                           </ul>
                           
                           
                     </div>
   
                     
   
   
   
                     {/*###============== C  L  U  B  S    &    A  S  S  O  C  I  T  I  O  N  S==============###*/}
                     <div className=" fade-in ml-24 my-12 hidden " id='why_bugema-data'> 
                           <ul className='ml-10 my-20'>
                                 <li>
                                 <div className="mr-2 my-5 ">
                                 
                                 <h1  style={{ fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold' > IT Club </h1> 
                                 
                                 </div>
                                 </li>
                                 
                                 <li>
                                 <div className="mr-2 my-5  ">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold'>Food & Nutrition</h1> 
                                       
                                 </div>
                                 </li>
                                 <li>
                                 <div className="mr-2 my-5  ">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold' > BUNSA </h1> 
                                       
                                 </div>
                                 </li>
                                 
                                 <li>
                                 <div className="mr-2 my-5  ">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold'> International Associations</h1>
                                       
                                 </div>
                                 </li>
                                 
                                
                                 
                           </ul>
                           
                     </div>
   
                     
   
   
                                 
                     {/*###============== G  E  T    I N    T  O  U  C  H ==============###*/}
                     <div className=" fade-in ml-24 my-24 hidden "  id='get-in-touch'> 
                           <ul className='ml-10 my-20'>
                                 <li>
                                 <div className="mr-2 my-5 ">
                                 
                                 <h1  style={{ fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold' > Open Days </h1> 
                                 
                                 </div>
                                 </li>
                                 
                                 <li>
                                 <div className="mr-2 my-5  ">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold'>Applications</h1> 
                                       
                                 </div>
                                 </li>
                                 <li>
                                 <div className="mr-2 my-5  ">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold' > Maps and Directions </h1> 
                                       
                                 </div>
                                 </li>
                                 
                                 <li>
                                 <div className="mr-2 my-5  ">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold'> Campus Tours</h1>
                                       
                                 </div>
                                 </li>
                                 
                                 <li>
                                 <div className="mr-2 my-5  ">
                                       <h1  style={{fontSize: '15px',cursor:"pointer", marginRight:'5px'}} className='schools text-black font-bold'> All Events</h1> 
                                       
                                 </div>
                                 </li>
                                 
                                
                                 
                           </ul>
                           
                     </div>
   
                     <div className=' ml-20 vertical-line my-6 '>
                     </div>
   
                     {/* SCIENCE AND TECHNOLOGY COURSES */}
                     <div className='ml-10   '  id='IT'>
   
                                 {/* ###============= A C C O M M O D D A T I O N     M O R E =================### */}
                           <div className='' id='courses-more' >
                                 <div className=' ml-24 my-12 fade-in '>
                                             {/* <Image src={image} alt='img' width={350} height={450} className="-ml-5 slider slide--fast"/> */}
                                 </div>
                                 
                           </div>
   
   
                           
                           
                           {/* ###=============S P O R T S       M O R E =================### */}
                           <div className=' hidden  fade-in' id='fees-more'>
                                 <div id='foot' className=' ml-24 my-12 fade-in '>
                                             {/* <Image src={football} alt='img' width={350} height={450} className="-ml-5  "/> */}
                                 </div>
   
                                 <div id='basket' className='hidden ml-24 my-12 fade-in '>
                                             {/* <Image src={basket} alt='img' width={350} height={450} className="-ml-5  "/> */}
                                 </div>
   
                                 <div id='volley' className='hidden ml-24 my-12  fade-in '>
                                             {/* <Image src={volley2c} alt='img' width={350} height={450} className="-ml-5  "/> */}
                                 </div>
   
                                 <div id='net' className='hidden ml-24 my-12  fade-in '>
                                             {/* <Image src={netball} alt='img' width={350} height={450} className="-ml-5  "/> */}
                                 </div>
                                             {/* <Image src={woodball} alt="Woodball Image" width={350} height={450} className="-ml-5" /> */}
                                 <div id='wood' className='hidden ml-24 my-12  fade-in '>
                                             {/* <Image src={woodball} alt='img' width={350} height={450} className="-ml-5  "/> */}
                                 </div>
   
                                 <div id='table' className='hidden ml-24 my-12  fade-in '>
                                             {/* <Image src={volley2c} alt='img' width={350} height={450} className="-ml-5  "/> */}
                                 </div>
   
                                 {/* <h1  style={{fontSize: '19px',cursor:"pointer",height:"70px"}} className='new-arr change-on-hover2 text-black'> More on sports  <FaArrowRight className='new-arr'/></h1>
                                 <h1  style={{fontSize: '19px',cursor:"pointer",height:"70px"}} className='new-arr change-on-hover2 text-black'> how to join  <FaArrowRight className='new-arr'/></h1> */}
   
   
                                 
                           </div>
                           
                           
                           
                           {/* ###============= C L U B S    AND   A S S O C I A T  I O N S    M O R E =================### */}
                           <div className='hidden' id='why-bugema-more' >
                                 <div className=' ml-24 my-12 fade-in '>
                                             {/* <Image src={bucosa} alt='img' width={350} height={450} className="-ml-5 "/> */}
                                 </div>
                                 
                           </div>
                           
                           
   
                           {/* ###=============STUDENT LEADERSHIP      M O R E =================### */}
                           <div className=' hidden flex flex-col my-12  gap-2 fade-in' id='touch-more'>
                                 <div className=' ml-24 fade-in flex'>
                                             {/* <Image src={palm_girls} alt='img' width={350} height={450} className="ml-19 -mr-10  "/> */}
                                 </div>
                                 <div className="ml-24 flex  text-white  " >
                                       <div className='w-full bg-black slider slide--slow change-on-hover'>
                                       {/* <h1  style={{fontSize: '19px',cursor:"pointer",height:"90px"}} className='arrow3'> Talk to Us <FaArrowRight className='arrow3'/></h1> */}
                                       </div>
                                 </div>
                                 
                           </div>
                             
                     </div>
                     
               </div>
      </>
      
  );
};

export default DropDownMenu;