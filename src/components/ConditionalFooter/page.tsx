"use client"
import React  from 'react'
import { usePathname } from 'next/navigation';
import { Footer } from '../Footer/page';
const ConditionalFooter = () => {
        const pathname = usePathname()
        if(pathname === "/profile"){
                        return null
                }
  return (
    <Footer/>
  )
}

export default ConditionalFooter