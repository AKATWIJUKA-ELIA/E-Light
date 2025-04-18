'use client'
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import { Separator } from "@/components/ui/separator"
import { BsList } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { CiShoppingCart } from "react-icons/ci";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import DropDownMenu from '../DropDownMenu/page';
import Link from 'next/link';
import { useAppSelector } from '@/hooks';
import useGetCategories from '@/hooks/useGetCategories';
import useGetApprovedProducts from '@/hooks/useGetApprovedProducts';
import { Input } from '../ui/input';
import SearchModel from '../SearchModel/page';

const Header = () => {
        const cartitem = useAppSelector(state => state.cart.items);
        const Cart = cartitem?.reduce((total, item) => total + (item.quantity || 0), 0)
        const [Hovered,setHovered] = useState(false)
        const [sticky, setSticky] = useState(false);
        const { data: categories } = useGetCategories();
        const { data: products } = useGetApprovedProducts();
        const [Focused, setFocused] = useState(false)
        const [searchTerm, setSearchTerm] = useState('');
        const [filteredProducts, setFilteredProducts] = useState(products);
        
        const showDropDownMenu=()=>{
                setHovered(true)
        }
        const forceBlur = () => {
                document.getElementById("inputsearch")?.blur();
              };
        const HandleClose =()=>{
                setFocused(false)
                forceBlur()
        }
        useEffect(() => {
                const results = products?.filter((product) =>
                  product.product_cartegory.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredProducts(results);
              }, [searchTerm, products]);
        const handleStickyNavbar = () => {
                if (window.scrollY >= 100) {
                  setSticky(true);
                } else {
                  setSticky(false);
                }
              };
              useEffect(() => {
                window.addEventListener("scroll", handleStickyNavbar);
                return () => {
                  window.removeEventListener("scroll", handleStickyNavbar);
                };
              }, []); 
        //         flex    border border-gray-300 
  return (
    <>
    <div className={` fixed  top-0 left-0 z-40 flex flex-col py-3 w-full  bg-white text-black gap-1
            ${sticky ? "bg-transparent  !fixed !z-[9999] ! bg-opacity-100 shadow-sticky backdrop-blur-lg fade-in !transition ": "absolute" }`
      }>
        <div className='flex w-[100%] gap-18 ' >
                <div className='flex gap-12 w-[60%]' >
                        <div className='flex rounded-md ml-5'>
                                <Link href="/">
                                <Image className='rounded-md h-10' src="/images/Logo.png" alt='logo' width='200' height="100">
                                </Image>
                                </Link>
                        </div>

                        <div className='hidden md:flex w-[100%] p-auto '>
                                <Input value={searchTerm}
                                id='inputsearch'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                 onFocus={()=>{setFocused(true)}}
                                 onBlur={()=>{setFocused(false)}}
                                 type="text"
                                  className=' flex p-5 h-10 rounded-full border border-3 border-gray-300 w-[100%] ' 
                                  placeholder='Search '  />
                        </div>
                </div>

                <div className='flex gap-4 md:gap-8 ml-10 '>
                        <div className='flex gap-4  items-center ' >
                        <div className='flex hover:cursor-pointer' > <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">Mobile App</h1>
                        </div>
                        {/* <div className='flex hover:cursor-pointer ' >EN /UG.</div> */}
                        </div>
                        <div className="flex items-center gap-2 py-1 hover:cursor-pointer">
                        <SignedIn>
                        <div className="hidden lg:block">
                        <UserButton showName />
                        </div>

                        {/* For small screens */}
                        <div className="block lg:hidden">
                        <UserButton />
                        </div>
                        <Link href="/profile">
                        <button >
                        Dashboard
                        </button></Link>
                        </SignedIn>

                        <SignedOut>
                        <div className="flex items-center gap-1">
                        <VscAccount className="text-2xl" />
                        <SignInButton mode="modal" />
                        </div>
                        </SignedOut>
                        </div>
                        <Link href="/cart" className="flex items-center gap-2 relative group hover:cursor-pointer">
                                <div className="relative">
                                <CiShoppingCart className="text-2xl font-bold" />
                                {Cart ? (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {Cart}
                                </span>
                                ) : null}
                                </div>
                                <h1 className="font-bold hidden md:flex  ">Cart</h1>
                        </Link>
                </div>
        </div>
        <Separator/>
        
        <div className='flex md:hidden  w-[100%] p-auto '>
                                <input type="text" className=' flex p-5 h-10 rounded-full border border-3 border-gray-300 w-[100%] ' placeholder='Search '  />
        </div>
        <div className='flex ml-5  md:ml-32 ' >
                
        <div className='flex flex-nowrap ' >
                <div className='flex rounded-full   p-1 bg-gray-100 hover:cursor-pointer hover:bg-gray-100 gap-2 '   onMouseOver={showDropDownMenu} >
                         <BsList className=' font-bold text-2xl ' /> <h1 className='flex '>All Categories</h1>
                </div  >
                <div className='flex rounded-full   p-1   hover:cursor-pointer hover:bg-gray-100' >
                        <Link href="/post" >Sell Something?</Link>
                </div>
         </div>

         <div className='hidden md:flex   ml-5 gap-14 ' >
              { categories?.slice(0, 7)?.map((cartegory,index)=>
                <div key={index}  className=' rounded-xl   p-2   hover:cursor-pointer hover:bg-gray-100' >
                <Link href={`/category/${cartegory.cartegory}`} className='flex-nowrap' >{cartegory.cartegory}</Link>
                </div>
        )}
              </div>
              <div className=' flex md:hidden  grid-cols-3 ml-5 gap-14 ' >
              { categories?.slice(0, 1)?.map((cartegory,index)=>
                <div key={index} className=' rounded-3xl   p-1   hover:cursor-pointer hover:bg-gray-100' >
                <Link href={`/category/${cartegory.cartegory}`} >{cartegory.cartegory}</Link>
                </div>
        )}
              </div>

        </div>
       


    </div>
    <DropDownMenu isvisible={Hovered} onClose={() => setHovered(false)} />
    { Focused && searchTerm.length>1 ? (<SearchModel products={filteredProducts||[]} onClose={HandleClose} />):("")}
    </>
  )
}

export default Header