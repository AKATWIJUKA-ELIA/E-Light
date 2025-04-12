'use client'
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import { BsList } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { CiShoppingCart } from "react-icons/ci";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import DropDownMenu from '../DropDownMenu/page';
import Link from 'next/link';
import { useAppSelector } from '@/hooks';

const Header = () => {
        const cartitem = useAppSelector(state => state.cart.items);
        const Cart = cartitem?.reduce((total, item) => total + (item.quantity || 0), 0)
        const [Hovered,setHovered] = useState(false)
        const [sticky, setSticky] = useState(false);
        const showDropDownMenu=()=>{
                setHovered(true)
        }
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
    <div className={`header fixed  top-0 left-0 z-40 flex flex-col py-3 w-full  bg-white text-black gap-1
            ${sticky ? " bg-dark !fixed !z-[9999] ! bg-opacity-100 shadow-sticky backdrop-blur-lg fade-in !transition dark:! dark:!bg-opacity-100": "absolute" }`
      }>
        <div className='flex w-[100%] gap-18 ' >
                <div className='flex gap-12 w-[60%]' >
                        <div className='flex rounded-md ml-5'>
                                <Link href="/">
                                <Image className='rounded-md h-10' src="/images/Logo.png" alt='logo' width='200' height="100">
                                </Image>
                                </Link>
                        </div>

                        <div className='flex w-[100%] p-auto '>
                                <input type="text" className=' flex p-5 h-10 rounded-full border border-3 border-gray-300 w-[100%] ' placeholder='Search '  />
                        </div>
                </div>

                <div className='flex gap-8'>
                        <div className='flex hover:cursor-pointer' > <h1>Download the Elight App</h1></div>
                        <div className='flex hover:cursor-pointer' >EN /UG.</div>
                        <div className='flex hover:cursor-pointer gap-1 py-1 ' >
                                <SignedIn>
                                <UserButton showName />
                                </SignedIn> 
                                <SignedOut>
                                <VscAccount className='text-2xl flex' /> 
                                <SignInButton mode='modal' />
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
                                <h1 className="font-bold">Cart</h1>
                        </Link>
                </div>
        </div>
        

        <div className='flex ml-5 gap-5' >
                <div className='flex rounded-full   p-1 bg-gray-100 hover:cursor-pointer hover:bg-gray-100 gap-2 '   onMouseOver={showDropDownMenu} > <BsList className=' font-bold text-2xl ' /> <h1 className='flex'>All Categories</h1><RiArrowDropDownLine className='text-2xl' /> </div>
                <div className='flex rounded-full   p-1   hover:cursor-pointer hover:bg-gray-100' >
                        <Link href="/post" >Sell Something?</Link>
                </div>

        </div>

        <DropDownMenu isvisible={Hovered} onClose={() => setHovered(false)} />
    </div>
  )
}

export default Header