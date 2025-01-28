import React from 'react'
import Image from 'next/image'
import { BsList } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { CiShoppingCart } from "react-icons/ci";
const Header = () => {
  return (
    <div className='bg-white text-black gap-2 flex flex-col   border py-3'>
        <div className='flex w-[100%] gap-24 ' >
                <div className='flex gap-12 w-[60%]' >
                        <div className='flex rounded-md ml-5'>
                                <Image className='rounded-md h-10' src="/images/Logo.png" alt='logo' width='200' height="100">
                                </Image>
                        </div>

                        <div className='flex w-[100%] p-auto '>
                                <input type="text" className=' flex p-5 h-10 rounded-full border border-3 border-gray-300 w-[100%] ' placeholder='Search '  />
                        </div>
                </div>

                <div className='flex gap-8'>
                        <div className='flex hover:cursor-pointer' > <h1>Download the Elight App</h1></div>
                        <div className='flex hover:cursor-pointer' >EN /UG.</div>
                        <div className='flex hover:cursor-pointer gap-1 ' ><VscAccount className='text-2xl flex' /> <h1 className='flex'>Hi-<span className='font-bold'> Elia</span></h1> </div>
                        <div className='flex hover:cursor-pointer gap-1' ><CiShoppingCart className='text-2xl font-bold flex' /> <h1 className='flex font-bold'>Cart</h1> </div>
                </div>
        </div>

        <div className='flex ml-5 gap-5' >
                <div className='flex rounded-full   p-1 bg-gray-100 hover:cursor-pointer hover:bg-gray-100 gap-2 ' > <BsList className=' font-bold text-2xl ' /> <h1 className='flex'>All Categories</h1><RiArrowDropDownLine className='text-2xl' /> </div>
                <div className='flex rounded-full   p-1   hover:cursor-pointer hover:bg-gray-100' ><h1 >Electronics</h1></div>
                <div className='flex rounded-full   p-1   hover:cursor-pointer hover:bg-gray-100' ><h1>Furniture</h1></div>
                <div className='flex rounded-full   p-1   hover:cursor-pointer hover:bg-gray-100' ><h1>Health & Beauty</h1></div>
                <div className='flex rounded-full   p-1   hover:cursor-pointer hover:bg-gray-100' ><h1>Accessories</h1></div>
                <div className='flex rounded-full   p-1   hover:cursor-pointer hover:bg-gray-100' ><h1>Properties</h1></div>
                <div className='flex rounded-full   p-1   hover:cursor-pointer hover:bg-gray-100' ><h1>Arts & Crafts</h1></div>
                <div className='flex rounded-full   p-1  hover:cursor-pointer hover:bg-gray-100 ' ><h1>Home Utilities</h1></div>
                <div className='flex rounded-full   p-1  hover:cursor-pointer hover:bg-gray-100 ' ><h1>Computers</h1></div>
                <div className='flex rounded-full   p-1  hover:cursor-pointer hover:bg-gray-100 ' ><h1>Phones</h1></div>
                <div className='flex rounded-full   p-1  hover:cursor-pointer hover:bg-gray-100 ' ><h1>Kids Section</h1></div>
                <div className='flex rounded-full   p-1  hover:cursor-pointer hover:bg-gray-100 ' ><h1>Gadgets</h1></div>

        </div>

    </div>
  )
}

export default Header