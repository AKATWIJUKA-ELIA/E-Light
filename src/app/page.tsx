"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useData } from "./DataContext";
import Loader from "@/components/Loader/loader";
import useGetSponsored from '@/hooks/useGetSponsored';


export default function Page() {
  const router = useRouter();
  const {data} = useData();
   const { sponsored: sponsored } = useGetSponsored();

  useEffect(() => {
    if (!data|| data.Products.product.length === 0 
        || data.Categories.categories.length === 0
        || !sponsored || sponsored.length === 0) {
      return
    }else{
        router.push("/home"); 
    }
    
  }, [data, router]);

  // Show loading state while redirecting
  return (
    <div className="relative flex  items-center justify-center bg-white/10 opacity-50 min-h-screen"
    style={{ backgroundImage: `url("images/wallp.jpg")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center' }}
    >
        <div className="absolute inset-0 bg-transparent bg-opacity-15 backdrop-blur-lg">
                <Loader />
        </div>
      
    </div>
  );
}
