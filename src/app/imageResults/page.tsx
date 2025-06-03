"use client"
import React, { useState }  from 'react'
import { useFile } from '../FileContext'
import Categories from '@/components/Category/page'
import useGenerateImageEmbeddings from '@/hooks/useGenerateImageEmbeddings'
import { useRouter } from 'next/navigation'; 

const ImageResults =  () => {
        const { file } = useFile();
        const [data,setData] = useState([])
        const {EmbedImage} = useGenerateImageEmbeddings()
        const router = useRouter()
        if (file.length<0) {
            return (
                router.push("/")
            );
        }
        const Embeds = async(files:File[]) =>{
                const embeds = await EmbedImage(files);
                setData(embeds.data||[])
        }
        
        return (
            <div className='mt-36' >
                <button className='flex' onClick={()=>Embeds(file)}>Show data </button>
                data is : {data}
                <Categories relatedProducts={[]} category=''/>
            </div>
        );
}

export default ImageResults