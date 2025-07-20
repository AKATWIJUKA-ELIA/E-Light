"use client"
import React  from 'react'
import { usePathname } from 'next/navigation';
import { Footer } from '../Footer/page';
const ConditionalFooter = () => {
        const pathname = usePathname()
        if(pathname.includes("profile") || pathname.includes("admin")){
                        return null
                }
  return (
    <Footer/>
  )
}

export default ConditionalFooter