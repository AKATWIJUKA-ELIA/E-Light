'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { BsList } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { CiShoppingCart } from "react-icons/ci";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import DropDownMenu from '../DropDownMenu/page';
import Link from 'next/link';
const Header = () => {

        const [Hovered,setHovered] = useState(false)
        const HandleDropDownMenu=()=>{
                setHovered(true)
        }

        const showDropDownMenu=()=>{
                setHovered(true)
        }
        const close=()=>{
                setHovered(false)
        }
  return (
    <div className='bg-white text-black gap-1 flex flex-col   border border-gray-300 py-3'>
        <div className='flex w-[100%] gap-24 ' >
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
                        <div className='flex hover:cursor-pointer gap-1' ><CiShoppingCart className='text-2xl font-bold  flex' /> <h1 className='flex font-bold'>Cart</h1> </div>
                </div>
        </div>
        

        <div className='flex ml-5 gap-5' >
                <div className='flex rounded-full   p-1 bg-gray-100 hover:cursor-pointer hover:bg-gray-100 gap-2 '   onMouseOver={showDropDownMenu} > <BsList className=' font-bold text-2xl ' /> <h1 className='flex'>All Categories</h1><RiArrowDropDownLine className='text-2xl' /> </div>
                <div className='flex rounded-full   p-1   hover:cursor-pointer hover:bg-gray-100' >
                        <Link href="/post" >Posts an Item</Link>
                </div>

        </div>

        <DropDownMenu isvisible={Hovered} onClose={() => setHovered(false)} />
    </div>
  )
}

export default Header